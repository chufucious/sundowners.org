<script module>
  // One clock for every flame on the page, so the header and compact logos
  // stay in step through their hand-off. It moves only while a flame draws,
  // and at most a tenth of a second per frame, so a flame that paused (off
  // screen, a hidden tab) carries on from the frame it showed instead of
  // jumping ahead.
  let clock = 0;
  let lastTick = null;
  function tick(now) {
    if (lastTick !== null && now > lastTick) clock += Math.min(now - lastTick, 100) / 1000;
    lastTick = now;
    return clock;
  }

  // The first flame to start eases in from the still mark over this many
  // seconds; any that start later join in step, already at full strength.
  const INTRO = 0.8;
  let introStart = null;
</script>

<script>
  // The sun mark with a never-repeating heat-shimmer warp: a WebGL shader
  // samples the mark through 3D simplex noise that drifts upward over time,
  // with a few embers rising off the tips.
  // The transparent padding in the texture gives the warped edges room.
  // Falls back to the static image without WebGL.
  import mark from "#lib/assets/logo/sundowners-mark-2025-flame-purple.png";

  let { class: className = "", active = true } = $props();

  let canvas;
  let running = $state(false);
  let pageVisible = $state(true);
  // With reduced motion the flame never starts, so the still mark shows.
  let reduceMotion = $state(false);
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
    // The mark fills this corner of a power-of-two texture (so WebGL can
    // build mipmaps); the rest is transparent, like the mark's own edges.
    uniform vec2 markScale;
    uniform float time;
    // 0 to 1 as the flame starts: at 0 it draws exactly the still mark.
    uniform float intro;
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
    // drifting with the flame's sway, and burning out from pale pink
    // through pink to violet.
    vec4 embers() {
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
        vec3 ember = mix(vec3(0.45, 0.2, 0.8), vec3(0.9, 0.4, 0.8), smoothstep(0.15, 0.55, heat));
        ember = mix(ember, vec3(1.0, 0.85, 0.95), smoothstep(0.6, 0.95, heat));
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
      return vec4(min(rgb, vec3(alpha)), alpha);
    }

    vec4 markAt(vec2 p) {
      return texture2D(mark, clamp(p, 0.0, 1.0) * markScale);
    }

    // Dusk, from the last gold down to deep blue: gold, tangerine, hot pink,
    // violet, indigo, deep blue. It sweeps there and back, so it never jumps
    // from blue straight to gold.
    vec3 dusk(float t) {
      float s = min((1.0 - abs(fract(t * 0.5) * 2.0 - 1.0)) * 5.0, 4.999);
      vec3 gold = vec3(1.0, 0.8, 0.35);
      vec3 tangerine = vec3(1.0, 0.5, 0.25);
      vec3 pink = vec3(1.0, 0.33, 0.72);
      vec3 violet = vec3(0.6, 0.38, 1.0);
      vec3 indigo = vec3(0.32, 0.28, 0.9);
      vec3 deepBlue = vec3(0.14, 0.24, 0.72);
      float f = smoothstep(0.0, 1.0, fract(s));
      if (s < 1.0) return mix(gold, tangerine, f);
      if (s < 2.0) return mix(tangerine, pink, f);
      if (s < 3.0) return mix(pink, violet, f);
      if (s < 4.0) return mix(violet, indigo, f);
      return mix(indigo, deepBlue, f);
    }

    // Repaint the saturated paint (the flame and the sun's wedges) in a dusk
    // colour, keeping a little of its own shading. The white teeth and grey
    // outlines aren't saturated, so they keep theirs. \`c\` is premultiplied.
    vec4 paintOver(vec4 c, vec3 paint, float amount) {
      float saturation = (max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b))) / max(c.a, 0.001);
      float shade = dot(c.rgb, vec3(0.3, 0.5, 0.2)) / max(c.a, 0.001);
      vec3 painted = min(paint * c.a * mix(0.85, 1.1, shade), vec3(c.a));
      return vec4(mix(c.rgb, painted, smoothstep(0.15, 0.35, saturation) * amount), c.a);
    }

    void main() {
      // Everything eases in from the still mark (smoothstep of intro).
      float ease = intro * intro * (3.0 - 2.0 * intro);

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

      vec2 suv = uv + offset * ease;

      // Bands of dusk colour rise slowly up the flame, so the tips and the
      // base sit at different points of the sweep.
      vec3 paint = dusk(suv.y * 0.9 - time * 0.12 + 0.18 * snoise(vec3(suv * vec2(3.0, 2.0), time * 0.15)));

      // Prism: each colour channel comes from a slightly bent sample, so the
      // edges split into red and blue fringes. The bend swirls as it drifts,
      // swells now and then, and flares with each lick; the sun stays
      // crisper than the tips.
      float surge = smoothstep(0.3, 1.0, 0.5 + 0.5 * snoise(vec3(time * 0.3, 21.0, 0.0)));
      float angle = time * 0.7 + 2.5 * snoise(vec3(uv * vec2(3.0, 4.0), time * 0.45));
      float bend = (0.008 + 0.014 * surge + 0.01 * lick) * (0.35 + reach) * ease;
      vec2 split = vec2(cos(angle), sin(angle)) * bend;
      vec4 cr = paintOver(markAt(suv + split), paint, ease);
      vec4 cg = paintOver(markAt(suv), paint, ease);
      vec4 cb = paintOver(markAt(suv - split), paint, ease);
      vec4 color = vec4(cr.r, cg.g, cb.b, max(cg.a, max(cr.a, cb.a)));

      // Where only a shifted copy covers a pixel, the split leaves a pure red
      // or blue edge: a glow over the header's dark sky, but a hard, dark rim
      // on the light page. Lift those fringe pixels toward the flame's own
      // colour and let them fade, so they read as a soft halo on either.
      float fringe = color.a - cg.a;
      color = mix(color, vec4(paint * color.a, color.a), 0.6 * fringe / max(color.a, 0.001));
      color *= 1.0 - 0.5 * fringe;

      // Flickering tips: a quicker noise field thins the tongues, but only
      // where there's open sky just above (so solid color stays solid), and
      // hardest at the peak of a lick — stretch, then pinch off.
      float tips = smoothstep(0.45, 0.78, uv.y);
      float exposed = 1.0 - markAt(suv + vec2(0.0, 0.035)).a;
      float erode = 0.5 + 0.5 * snoise(vec3(uv.x * 10.0, uv.y * 6.0 - time * 0.8, time * 0.3));
      float cut = tips * (0.35 + 0.2 * lick) * exposed * ease;
      float mask = smoothstep(cut - 0.15, cut, erode);

      // Embers go over the flame, premultiplied "over" (the texture is uploaded
      // premultiplied, so the mask scales all four channels). Sparks and their
      // halos never reach below y ≈ 0.62, so skip them there.
      vec4 spark = uv.y > 0.6 ? embers() * ease : vec4(0.0);
      gl_FragColor = spark + color * mask * (1.0 - spark.a);
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
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (reduceMotion = query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  });

  $effect(() => {
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true });
    if (!gl) {
      status = "no WebGL";
      return;
    }

    let frame = null;
    let cancelled = false;
    let ready = false;
    let shouldAnimate = false;
    let lastDraw = null;
    let timeUniform;
    let introUniform;
    const frameInterval = 1000 / 30;

    const draw = (now) => {
      frame = null;
      if (!shouldAnimate || !ready || cancelled) return;
      const elapsed = lastDraw === null ? frameInterval : now - lastDraw;
      // Draw at most 30 frames per second. The small tolerance avoids
      // skipping a frame due to timestamp rounding.
      if (elapsed >= frameInterval - 0.1) {
        lastDraw = now;
        const time = tick(now);
        introStart ??= time;
        gl.uniform1f(timeUniform, time);
        gl.uniform1f(introUniform, Math.min((time - introStart) / INTRO, 1));
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        running = true;
        status = "running";
      }
      frame = requestAnimationFrame(draw);
    };

    const syncAnimation = () => {
      if (ready && shouldAnimate && frame === null) {
        lastDraw = null;
        frame = requestAnimationFrame(draw);
      } else if ((!shouldAnimate || !ready) && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    // Visibility changes only start/stop the loop; keep the WebGL resources.
    $effect(() => {
      shouldAnimate = active && pageVisible && !document.hidden && !reduceMotion;
      if (reduceMotion) status = "reduced motion";
      syncAnimation();
    });

    // Keep the drawing buffer matched to the element's size on screen, at
    // the screen's full pixel density (up to 3x), as sharp as the still mark.
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 3);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (width === canvas.width && height === canvas.height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Everything the flame draws with. Runs again when the browser restores a
    // context it dropped (memory pressure, a long-backgrounded tab on iOS).
    const setup = () => {
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
      timeUniform = gl.getUniformLocation(program, "time");
      introUniform = gl.getUniformLocation(program, "intro");
      const markScaleUniform = gl.getUniformLocation(program, "markScale");

      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      // Premultiply on upload so linear filtering doesn't blend the colors
      // with the black stored in transparent pixels (a dark, crawling rim).
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      // Place the mark in the corner of a power-of-two texture so WebGL 1 can
      // build mipmaps: the small logo shows the mark at under a third of its
      // size, and sampling the full image there aliases its edges into
      // jaggies. The GPU's mipmaps keep full precision in the faint edge
      // pixels, which the header's colour-dodge would otherwise turn to grain.
      const powerOfTwo = (n) => 2 ** Math.ceil(Math.log2(n));
      const width = powerOfTwo(image.naturalWidth);
      const height = powerOfTwo(image.naturalHeight);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.uniform2f(markScaleUniform, image.naturalWidth / width, image.naturalHeight / height);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.viewport(0, 0, canvas.width, canvas.height);

      ready = true;
      syncAnimation();
    };

    // A lost context draws nothing, so show the still mark until it's back.
    // preventDefault() tells the browser we'll rebuild when it's restored.
    const onLost = (event) => {
      event.preventDefault();
      ready = false;
      syncAnimation();
      running = false;
      status = "context lost";
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", setup);

    // Wait for `load`, not decode(): with several marks on the page, Safari
    // can resolve decode() before the pixels are ready for texImage2D.
    const image = new Image();
    image.onload = () => {
      if (!cancelled && !gl.isContextLost()) setup();
    };
    image.onerror = () => {
      status = "texture failed: image failed to load";
    };
    image.src = mark;

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", setup);
      running = false;
    };
  });
</script>

<svelte:document onvisibilitychange={() => (pageVisible = !document.hidden)} />

<div class={["pointer-events-none", className]} aria-hidden="true">
  <img
    src={mark}
    alt=""
    class={["absolute inset-0 size-full", running && "invisible"]}
  />
  <canvas
    bind:this={canvas}
    class={["absolute inset-0 size-full", !running && "invisible"]}
  ></canvas>
  {#if import.meta.env.DEV && status !== "running"}
    <span
      class="absolute top-full left-0 whitespace-nowrap bg-black/80 px-1 text-[10px] text-white"
      >flame: {status}</span
    >
  {/if}
</div>
