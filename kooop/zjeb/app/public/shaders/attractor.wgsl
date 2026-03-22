// IMPORT noise_utils.wgsl
struct Particle {
  pos: vec2<f32>,
  vel: vec2<f32>,
};

struct History {
  prev_pos: array<vec2<f32>, 8>,
};

struct Uniforms {
  attractors: array<vec4<f32>, 4>, // x, y, strength, unused
  mouseForce: vec4<f32>,           // x, y, strength, mode (1=attract, -1=repel)
  time: f32,
  intensity: f32,
  friction: f32,
  dt: f32,
  valence: f32,
  entropy: f32,
  chaos: f32,
  impulse: f32,
};

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> ubo: Uniforms;
@group(0) @binding(2) var<storage, read_write> stats: atomic<u32>;
@group(0) @binding(3) var<storage, read_write> history: array<History>;
@group(0) @binding(4) var<storage, read> memoryNodes: array<vec4<f32>>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  let idx = id.x;
  var p = particles[idx];
  
  // 1. Shift History (Thinking Trails)
  for (var i = 7u; i > 0u; i = i - 1u) {
    history[idx].prev_pos[i] = history[idx].prev_pos[i-1u];
  }
  history[idx].prev_pos[0] = p.pos;

  // 2. Dynamic Attraction Matrix
  var totalAttractForce = vec2<f32>(0.0);
  var inCluster = 0.0;
  
  // 2.0 System Attractors
  for (var i = 0u; i < 4u; i = i + 1u) {
    let attr = ubo.attractors[i];
    let diff = attr.xy - p.pos;
    let dist = length(diff);
    
    if (i == 0u && dist < 0.1) {
      atomicAdd(&stats, 1u);
    }
    
    let gravityOffset = ubo.valence * 0.5;
    let strength = attr.z * (ubo.intensity + ubo.impulse * 2.0) * (1.0 + gravityOffset);
    
    if (dist > 0.001) {
      totalAttractForce += normalize(diff) * (strength / (dist + 0.5));
    }
  }

  // 2.1 Memory Attractors (Cognitive Clusters)
  // We process up to 32 nodes for performance
  for (var i = 0u; i < 32u; i = i + 1u) {
    let node = memoryNodes[i];
    if (node.z <= 0.0) { continue; } // Strength 0 = inactive
    
    let diff = node.xy - p.pos;
    let dist = length(diff);
    
    if (dist < 0.3) {
      // Pull into memory cluster
      let strength = node.z * 0.5 * (1.0 - dist / 0.3);
      totalAttractForce += normalize(diff) * strength;
      inCluster = max(inCluster, 1.0 - dist / 0.15);
    }
  }

  // 2.2 Spatial Interaction: Cursor Pulse
  let mouseDiff = ubo.mouseForce.xy - p.pos;
  let mouseDist = length(mouseDiff);
  if (mouseDist < 0.5 && mouseDist > 0.001) {
      let mStrength = ubo.mouseForce.z * ubo.mouseForce.w * 2.0;
      totalAttractForce += normalize(mouseDiff) * (mStrength / (mouseDist + 0.2));
  }
  
  // 3. Morphic Resonance: Curl Noise Influence
  let noiseScale = 2.0 + ubo.entropy * 8.0;
  let noisePos = p.pos * noiseScale + ubo.time * 0.1;
  let curlForce = curl(noisePos) * (ubo.intensity + ubo.entropy + ubo.impulse + ubo.chaos) * 0.5;
  
  // 4. Update Velocity with Cluster Friction
  let clusterFriction = 1.0 - inCluster * 0.8; 
  p.vel += (totalAttractForce + curlForce) * ubo.dt;
  p.pos += p.vel * ubo.dt * clusterFriction;
  p.vel *= ubo.friction * clusterFriction;
  
  // Chaos-induced jitter
  if (ubo.chaos > 0.5) {
      let jitter = vec2<f32>(
          hash(p.pos + ubo.time) - 0.5,
          hash(p.pos - ubo.time) - 0.5
      ) * ubo.chaos * 0.02;
      p.pos += jitter;
  }
  
  // Boundary constraints
  if (p.pos.x < -1.0 || p.pos.x > 1.0) { p.vel.x *= -0.5; p.pos.x = clamp(p.pos.x, -1.0, 1.0); }
  if (p.pos.y < -1.0 || p.pos.y > 1.0) { p.vel.y *= -0.5; p.pos.y = clamp(p.pos.y, -1.0, 1.0); }
  
  particles[idx] = p;
}

// --- RENDER SHADERS ---

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) uv: vec2<f32>,
};

@vertex
fn vs_main(
  @builtin(vertex_index) vIdx: u32,
  @builtin(instance_index) iIdx: u32
) -> VertexOutput {
  var out: VertexOutput;
  
  let p = particles[iIdx];
  let h = history[iIdx];
  
  let segmentIdx = vIdx / 2u;
  let isEnd = vIdx % 2u == 1u;
  
  // Dynamic Trail Depth: collapse segments based on intensity
  let resonanceThreshold = f32(segmentIdx) / 8.0;
  var pos = vec2<f32>(0.0);
  
  if (resonanceThreshold > (ubo.intensity + 0.1)) {
    pos = p.pos; // Collapse to head
  } else {
    if (segmentIdx == 0u) {
      if (isEnd) { pos = h.prev_pos[0]; }
      else { pos = p.pos; }
    } else {
      if (isEnd) { pos = h.prev_pos[segmentIdx]; }
      else { pos = h.prev_pos[segmentIdx - 1u]; }
    }
  }
  
  // Apply Chaos Glitch to Position
  if (ubo.chaos > 0.7 && fract(ubo.time * 10.0) > 0.8) {
      pos += (hash(vec2<f32>(f32(iIdx), ubo.time)) - 0.5) * 0.05;
  }
  
  out.position = vec4<f32>(pos, 0.0, 1.0);
  
  // Color calculation based on Valence
  let life = 1.0 - (f32(segmentIdx) / 8.0);
  
  // Valence Palettes: Negative = Red/Cyan glitch, Positive = Purple/Emerald ritual
  let colorA = mix(vec3<f32>(1.0, 0.0, 0.2), vec3<f32>(0.2, 0.4, 1.0), ubo.valence * 0.5 + 0.5);
  let colorB = mix(vec3<f32>(0.0, 1.0, 0.8), vec3<f32>(0.6, 0.2, 1.0), ubo.valence * 0.5 + 0.5);
  
  let neon = mix(colorA, colorB, ubo.entropy);
  
  out.color = vec4<f32>(neon, life * ubo.intensity);
  out.uv = pos * 0.5 + 0.5;
  
  return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
  return in.color;
}
