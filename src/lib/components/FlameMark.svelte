<script>
  // The sun mark with a never-repeating heat-shimmer warp: a WebGL shader
  // samples the mark through 3D simplex noise that drifts upward over time.
  // The transparent padding in the texture gives the warped edges room.
  // Falls back to the static image without WebGL or with reduced motion.
  import mark from "$lib/assets/logo/sundowners-mark-2025-flame.png";

  // `embers` draws only the rising sparks instead of the mark, so they can sit
  // in their own layer outside the logo's color-dodge blend (which can only
  // brighten, and would wash their orange/red out).
  let { class: className = "", embers = false } = $props();

  let canvas;
  let running = $state(false);
  // Why the animation isn't running, shown under the logo in dev.
  let status = $state("starting");

  const vertexShader = `
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    uniform sampler2D mark;
    uniform float time;
    uniform bool embers;
    varying vec2 uv;

    // 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT).
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
        i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
        i.x + vec4(0.0, i1.x, i2.x, 1.0));
      vec3 ns = 0.142857142857 * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    float hash(float x) { return fract(sin(x * 127.1) * 43758.5453); }

    // Heat-shimmer warp: two noise fields (one per axis) drifting upward,
    // plus a finer octave at half strength to roughen the edges. The noise
    // cells come out wider than tall on this texture, so it reads as haze
    // ripples. \`speed\` scales both the drift and the morphing.
    vec2 warpAt(float speed) {
      vec3 p = vec3(uv.x * 4.0, uv.y * 7.0 - time * 0.3 * speed, time * 0.1 * speed);
      vec3 q = vec3(uv.x * 9.0, uv.y * 15.0 - time * 0.55 * speed, time * 0.175 * speed);
      return vec2(
        snoise(p) + 0.5 * snoise(q),
        snoise(p + vec3(31.0, 0.0, 17.0)) + 0.5 * snoise(q + vec3(31.0, 0.0, 17.0))
      ) / 1.5;
    }

    // One slow sideways lean shared by the whole flame (and the air above
    // it). \`lag\` in seconds lets the tips follow the base like a whip.
    float swayAt(float lag) {
      return snoise(vec3((time - lag) * 0.15, 3.7, 0.0));
    }

    // Rising sparks above the tips: launched fast, slowing as they climb,
    // drifting with the flame's sway, and burning out from yellow-white
    // through orange to dull red.
    void drawEmbers() {
      vec3 rgb = vec3(0.0);
      float alpha = 0.0;

      for (int i = 0; i < 3; i++) {
        float n = float(i);
        float rate = 1.0 / (4.5 + 2.5 * hash(n));
        float cycle = time * rate + hash(n + 7.0);
        float life = fract(cycle);
        float spawn = hash(n * 13.0 + floor(cycle));

        // Ease-out rise; sideways wander grows with age, and the flame's
        // sway carries them (sampling offsets move the image the other way).
        float rise = 1.0 - (1.0 - life) * (1.0 - life);
        vec2 pos = vec2(
          0.15 + 0.7 * spawn + life * 0.05 * snoise(vec3(n * 7.0, time * 0.25, 1.0)),
          0.68 + rise * 0.28
        );
        pos.x -= swayAt(0.6 + life * 0.5) * 0.014 * (1.0 + life);

        float heat = 1.0 - life;
        vec3 ember = mix(vec3(0.75, 0.12, 0.04), vec3(1.0, 0.55, 0.15), smoothstep(0.15, 0.55, heat));
        ember = mix(ember, vec3(1.0, 0.9, 0.6), smoothstep(0.6, 0.95, heat));
        float radius = mix(0.01, 0.022, heat);
        float sputter = mix(1.0, 0.55 + 0.45 * sin(time * 23.0 + n * 5.0), smoothstep(0.5, 0.9, life));
        float brightness = smoothstep(0.0, 0.08, life) * pow(heat, 0.8) * sputter;

        // Measure in texture pixels' aspect (551 × 432) so sparks stay round.
        float d = length((uv - pos) * vec2(551.0 / 432.0, 1.0));
        // Bright core plus a faint halo so the color reads at a few pixels.
        float glow = min(1.0, (1.0 - smoothstep(0.0, radius, d)) + 0.35 * (1.0 - smoothstep(0.0, radius * 2.5, d))) * brightness;
        rgb += ember * glow;
        alpha = max(alpha, glow);
      }

      // Overlapping sparks can sum past alpha; keep it valid premultiplied.
      gl_FragColor = vec4(min(rgb, vec3(alpha)), alpha);
    }

    void main() {
      if (embers) {
        drawEmbers();
        return;
      }

      // 0 at the mark's base (texture y ≈ 0.02), 1 at its tips (y ≈ 0.75).
      float reach = smoothstep(0.2, 0.7, uv.y);

      // Blend a slow warp at the base into a faster one at the tips. (Scaling
      // time by height directly would shear the noise more every second.)
      vec2 warp = mix(warpAt(0.5), warpAt(1.5), reach);
      vec2 offset = warp * vec2(0.013, 0.017) * mix(0.6, 1.4, reach);

      // The whole flame leans together, more toward the top, with the tips
      // about 0.6s behind the base.
      offset.x += swayAt(reach * 0.6) * 0.014 * reach * reach;

      // Mostly at rest, with punctuation: a slow breath in the flame's height
      // and occasional licks where one tongue shoots up (cubing the noise
      // keeps it low with sharp peaks). Sampling from below stretches upward.
      float breath = smoothstep(0.35, 0.95, 0.5 + 0.5 * snoise(vec3(time * 0.2, 11.0, 0.0)));
      float lickN = 0.5 + 0.5 * snoise(vec3(uv.x * 5.0, time * 0.35, 5.0));
      float lick = lickN * lickN * lickN;
      offset.y -= (0.25 + lick) * 0.03 * reach + breath * 0.02 * reach * reach;

      vec2 suv = uv + offset;
      vec4 color = texture2D(mark, suv);

      // Flickering tips: a quicker noise field thins the tongues, but only
      // where there's open sky just above (so solid gold stays solid), and
      // hardest at the peak of a lick — stretch, then pinch off.
      float tips = smoothstep(0.45, 0.78, uv.y);
      float exposed = 1.0 - texture2D(mark, suv + vec2(0.0, 0.035)).a;
      float erode = 0.5 + 0.5 * snoise(vec3(uv.x * 10.0, uv.y * 6.0 - time * 0.8, time * 0.3));
      float cut = tips * (0.35 + 0.2 * lick) * exposed;
      float mask = smoothstep(cut - 0.15, cut, erode);

      // The texture is uploaded premultiplied, so scale all four channels.
      gl_FragColor = color * mask;
    }
  `;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
    }
    return shader;
  }

  $effect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      status = "reduced motion is on";
      return;
    }

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true });
    if (!gl) {
      status = "no WebGL";
      return;
    }

    let frame;
    let cancelled = false;

    const program = gl.createProgram();
    try {
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        status = "link failed: " + gl.getProgramInfoLog(program);
        return;
      }
    } catch (error) {
      status = "compile failed: " + error.message;
      return;
    }
    gl.useProgram(program);

    // One quad covering the canvas.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeUniform = gl.getUniformLocation(program, "time");
    gl.uniform1i(gl.getUniformLocation(program, "embers"), embers ? 1 : 0);

    // Keep the drawing buffer matched to the element's size on screen.
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const image = new Image();
    image.src = mark;
    image
      .decode()
      .then(() => {
        if (cancelled) return;
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        // Premultiply on upload so linear filtering doesn't blend the gold
        // with the black stored in transparent pixels (a dark, crawling rim).
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // Non-power-of-two texture: no mipmaps, clamp at the edges.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const draw = (now) => {
          gl.uniform1f(timeUniform, now / 1000);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          running = true;
          status = "running";
          frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
      })
      .catch((error) => {
        status = "texture failed: " + error.message;
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      running = false;
    };
  });
</script>

<div class={["pointer-events-none", className]} aria-hidden="true">
  {#if !embers}
    <img
      src={mark}
      alt=""
      class={["absolute inset-0 size-full", running && "invisible"]}
    />
  {/if}
  <canvas
    bind:this={canvas}
    class={["absolute inset-0 size-full", !running && "invisible"]}
  ></canvas>
  {#if import.meta.env.DEV && status !== "running"}
    <span
      class="absolute top-full left-0 whitespace-nowrap bg-black/80 px-1 text-[10px] text-white"
      >{embers ? "embers" : "flame"}: {status}</span
    >
  {/if}
</div>
