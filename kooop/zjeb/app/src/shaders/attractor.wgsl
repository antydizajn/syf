// IMPORT noise_utils.wgsl
struct Particle {
  pos: vec2<f32>,
  vel: vec2<f32>,
};

struct Uniforms {
  mouse: vec2<f32>,
  time: f32,
  intensity: f32,
  friction: f32,
  dt: f32,
};

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> ubo: Uniforms;
@group(0) @binding(2) var<storage, read_write> stats: atomic<u32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  let idx = id.x;
  var p = particles[idx];
  
  // Traditional Attraction
  let diff = ubo.mouse - p.pos;
  let dist = length(diff);
  
  if (dist < 0.1) {
    atomicAdd(&stats, 1u);
  }
  
  // Morphic Resonance: Curl Noise Influence
  let curlForce = curl(p.pos * 2.0 + ubo.time * 0.1) * ubo.intensity * 0.5;
  
  // Traditional Attraction
  let diff = ubo.mouse - p.pos;
  let dist = length(diff);
  let attractForce = normalize(diff) * (ubo.intensity / (dist + 0.5));
  
  p.vel += (attractForce + curlForce) * ubo.dt;
  p.pos += p.vel * ubo.dt;
  p.vel *= ubo.friction;
  
  // Boundary constraints (soft ritual bounce)
  if (p.pos.x < -1.0 || p.pos.x > 1.0) { p.vel.x *= -0.5; }
  if (p.pos.y < -1.0 || p.pos.y > 1.0) { p.vel.y *= -0.5; }
  
  particles[idx] = p;
}
