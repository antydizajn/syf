struct Uniforms {
    time: f32,
    width: f32,
    height: f32,
    mouse_x: f32,
    mouse_y: f32,
    intensity: f32,
    padding1: f32,
    padding2: f32,
};

@group(0) @binding(0) var<uniform> ubo: Uniforms;

fn hash3(p: vec2<f32>) -> vec3<f32> {
    let q = vec3<f32>(
        dot(p, vec2<f32>(127.1, 311.7)),
        dot(p, vec2<f32>(269.5, 183.3)),
        dot(p, vec2<f32>(419.2, 371.9))
    );
    return fract(sin(q) * 43758.5453);
}

fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    
    let h00 = hash3(i + vec2<f32>(0.0, 0.0)).xy;
    let h10 = hash3(i + vec2<f32>(1.0, 0.0)).xy;
    let h01 = hash3(i + vec2<f32>(0.0, 1.0)).xy;
    let h11 = hash3(i + vec2<f32>(1.0, 1.0)).xy;
    
    return mix(
        mix(dot(h00, f - vec2<f32>(0.0, 0.0)), dot(h10, f - vec2<f32>(1.0, 0.0)), u.x),
        mix(dot(h01, f - vec2<f32>(0.0, 1.0)), dot(h11, f - vec2<f32>(1.0, 1.0)), u.x),
        u.y
    );
}

fn fbm(p: vec2<f32>, octaves: i32) -> f32 {
    var value: f32 = 0.0;
    var amplitude: f32 = 1.0;
    var frequency: f32 = 0.25;
    for (var i = 0; i < 6; i = i + 1) {
        if (i >= octaves) { break; }
        value = value + amplitude * noise(p * frequency);
        amplitude = amplitude * 0.52;
        frequency = frequency * 1.13;
    }
    return value;
}

fn voronoi(p: vec2<f32>) -> f32 {
    let n = floor(p);
    let f = fract(p);
    var md: f32 = 50.0;
    for (var i = -1; i <= 1; i = i + 1) {
        for (var j = -1; j <= 1; j = j + 1) {
            let g = vec2<f32>(f32(i), f32(j));
            var o = hash3(n + g).xy;
            o = 0.5 + 0.41 * sin(ubo.time * 1.5 + 6.28 * o);
            let r = g + o - f;
            let d = dot(r, r);
            md = min(md, d);
        }
    }
    return sqrt(md);
}

fn plasma(p: vec2<f32>, time: f32) -> f32 {
    let a = sin(p.x * 8.0 + time * 2.0);
    let b = sin(p.y * 8.0 + time * 1.7);
    let c = sin((p.x + p.y) * 6.0 + time * 1.3);
    let d = sin(sqrt(p.x * p.x + p.y * p.y) * 8.0 + time * 2.3);
    return (a + b + c + d) * 0.5;
}

fn curl(p: vec2<f32>, time: f32) -> vec2<f32> {
    let eps: f32 = 0.5;
    let n1 = fbm(p + vec2<f32>(eps, 0.0), 6);
    let n2 = fbm(p - vec2<f32>(eps, 0.0), 6);
    let n3 = fbm(p + vec2<f32>(0.0, eps), 6);
    let n4 = fbm(p - vec2<f32>(0.0, eps), 6);
    return vec2<f32>((n3 - n4) / (2.0 * eps), (n2 - n1) / (2.0 * eps));
}

fn grain(uv: vec2<f32>, time: f32) -> f32 {
    let seed = uv * time;
    return fract(sin(dot(seed, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(1.0, -1.0),
        vec2<f32>(-1.0, 1.0),
        vec2<f32>(1.0, 1.0)
    );
    return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
}

@fragment
fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
    let resolution = vec2<f32>(ubo.width, ubo.height);
    let uv = pos.xy / resolution;
    var st = (uv - 0.5) * 2.0;
    st.x = st.x * (resolution.x / resolution.y);
    
    let time = ubo.time * 0.25;
    let curlForce = curl(st * 2.0, time) * 0.6;
    let flowField = st + curlForce;
    
    let dist1 = fbm(flowField * 1.5 + time * 1.2, 8) * 0.4;
    let dist2 = fbm(flowField * 2.3 - time * 0.8, 6) * 0.3;
    let dist3 = fbm(flowField * 3.1 + time * 1.8, 4) * 0.2;
    let dist4 = fbm(flowField * 4.7 - time * 1.1, 3) * 0.15;
    
    var cells = voronoi(flowField * 2.5 + time * 0.5);
    cells = smoothstep(0.1, 0.7, cells);
    
    let plasmaEffect = plasma(flowField + vec2<f32>(dist1, dist2), time * 1.5) * 0.2;
    let totalDist = dist1 + dist2 + dist3 + dist4 + plasmaEffect;
    
    var streak1 = sin((st.x + totalDist) * 15.0 + time * 3.0) * 0.5 + 0.5;
    var streak2 = sin((st.x + totalDist * 0.7) * 25.0 - time * 2.0) * 0.5 + 0.5;
    var streak3 = sin((st.x + totalDist * 1.3) * 35.0 + time * 4.0) * 0.5 + 0.5;
    
    streak1 = smoothstep(0.3, 0.7, streak1);
    streak2 = smoothstep(0.2, 0.8, streak2);
    streak3 = smoothstep(0.4, 0.6, streak3);
    
    let combinedStreaks = streak1 * 0.6 + streak2 * 0.4 + streak3 * 0.5;
    
    var shape1 = 1.0 - abs(st.x + totalDist * 0.6);
    var shape2 = 1.0 - abs(st.x + totalDist * 0.4 + sin(st.y * 3.0 + time) * 0.15);
    var shape3 = 1.0 - abs(st.x + totalDist * 0.8 + cos(st.y * 2.0 - time) * 0.1);
    
    shape1 = smoothstep(0.0, 1.0, shape1);
    shape2 = smoothstep(0.1, 0.9, shape2);
    shape3 = smoothstep(0.2, 0.8, shape3);
    
    let finalShape = max(shape1 * 0.8, max(shape2 * 0.6, shape3 * 0.4));
    
    let color1 = vec3<f32>(1.0, 0.1, 0.6);   // Hot pink
    let color2 = vec3<f32>(1.0, 0.3, 0.1);   // Electric orange
    let color3 = vec3<f32>(0.9, 0.1, 1.0);   // Electric purple
    let color4 = vec3<f32>(0.1, 0.5, 1.0);   // Electric blue
    let color5 = vec3<f32>(0.1, 1.0, 0.9);   // Electric cyan
    let color6 = vec3<f32>(0.3, 0.1, 0.9);   // Deep purple
    let color7 = vec3<f32>(1.0, 0.8, 0.1);   // Electric yellow
    
    let gradient = 1.0 - uv.y;
    let colorNoise = fbm(flowField * 3.0 + time * 0.5, 4) * 0.5 + 0.5;
    let colorShift = sin(time * 1.5 + st.y * 2.0) * 0.5 + 0.5;
    
    var finalColor: vec3<f32>;
    let t1 = smoothstep(0.85, 1.0, gradient);
    let t2 = smoothstep(0.7, 0.85, gradient);
    let t3 = smoothstep(0.5, 0.7, gradient);
    let t4 = smoothstep(0.3, 0.5, gradient);
    let t5 = smoothstep(0.15, 0.3, gradient);
    let t6 = smoothstep(0.0, 0.15, gradient);
    
    finalColor = mix(color6, color7, t6);
    finalColor = mix(finalColor, color5, t5);
    finalColor = mix(finalColor, color4, t4);
    finalColor = mix(finalColor, color3, t3);
    finalColor = mix(finalColor, color2, t2);
    finalColor = mix(finalColor, color1, t1);
    
    finalColor = mix(finalColor, color1, colorNoise * 0.82);
    finalColor = mix(finalColor, color5, colorShift * 0.5);
    
    let aberration = curlForce * 0.02;
    var aberrationColor = finalColor;
    aberrationColor.r = mix(finalColor.r, color1.r, length(aberration) * 2.0);
    aberrationColor.b = mix(finalColor.b, color4.b, length(aberration) * 1.5);
    aberrationColor.g = mix(finalColor.g, color5.g, length(aberration) * 1.2);
    
    let pulse1 = sin(time * 3.0 + st.y * 6.0) * 0.5 + 0.5;
    let pulse2 = sin(time * 4.5 - st.y * 8.0) * 0.5 + 0.5;
    let energyPulse = smoothstep(0.3, 0.7, pulse1 * pulse2);
    
    var intensity = finalShape * combinedStreaks * (1.0 + energyPulse * 0.4);
    intensity = intensity * (1.0 + cells * 0.2);
    intensity = intensity * ubo.intensity;
    
    var mouse = vec2<f32>(ubo.mouse_x, ubo.mouse_y) / resolution;
    mouse = (mouse - 0.5) * 2.0;
    mouse.x = mouse.x * (resolution.x / resolution.y);
    
    var mouseInfluence = 1.0 - length(st - mouse) * 0.6;
    mouseInfluence = max(0.0, mouseInfluence);
    mouseInfluence = smoothstep(0.0, 1.0, mouseInfluence);
    
    intensity = intensity + mouseInfluence * 0.6;
    aberrationColor = mix(aberrationColor, color1, 0.3);
    
    var result = aberrationColor * intensity;
    let bloom = smoothstep(0.4, 1.0, intensity) * 0.54;
    result = result + bloom * finalColor;
    
    result = pow(result, vec3<f32>(0.85));
    result = mix(result, result * result, 0.2);
    
    var vignette = 1.0 - length(uv - 0.5) * 0.85;
    vignette = smoothstep(0.2, 1.0, vignette);
    
    let bgColor = vec3<f32>(0.02, 0.01, 0.12) + finalColor * 0.03;
    result = mix(bgColor, result, smoothstep(0.0, 0.4, intensity));
    result = result * vignette;
    
    result = mix(vec3<f32>(dot(result, vec3<f32>(0.299, 0.587, 0.114))), result, 1.3);
    
    let grainAmount = 0.11;
    let grainValue = grain(uv, time * 0.5) * 2.0 - 1.0;
    result = result + grainValue * grainAmount;
    
    let scanline = sin(uv.y * ubo.height * 2.0) * 0.04;
    result = result + scanline;
    
    return vec4<f32>(result, 1.0);
}
