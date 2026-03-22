fn hash(p: vec2<f32>) -> f32 {
    let q = vec3<f32>(
        dot(p, vec2<f32>(127.1, 311.7)),
        dot(p, vec2<f32>(269.5, 183.3)),
        dot(p, vec2<f32>(419.2, 371.9))
    );
    return fract(sin(q.x + q.y + q.z) * 43758.5453);
}

fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2<f32>(0.0,0.0)), hash(i + vec2<f32>(1.0,0.0)), u.x),
               mix(hash(i + vec2<f32>(0.0,1.0)), hash(i + vec2<f32>(1.0,1.0)), u.x), u.y);
}

fn fbm(p: vec2<f32>) -> f32 {
    var v: f32 = 0.0;
    var a: f32 = 0.5;
    var pos = p;
    for (var i = 0; i < 4; i = i + 1) {
        v += a * noise(pos);
        pos = pos * 2.0;
        a = a * 0.5;
    }
    return v;
}

fn curl(p: vec2<f32>) -> vec2<f32> {
    let eps: f32 = 0.1;
    let n1 = fbm(p + vec2<f32>(eps, 0.0));
    let n2 = fbm(p - vec2<f32>(eps, 0.0));
    let n3 = fbm(p + vec2<f32>(0.0, eps));
    let n4 = fbm(p - vec2<f32>(0.0, eps));
    return vec2<f32>(n3 - n4, n2 - n1) / (2.0 * eps);
}
