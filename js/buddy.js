/* Buddy interativo
   - sempre no modo "Ativo" (respiração rápida, via --idle-duration no CSS)
   - segue o cursor (ou o dedo) por padrão
   - clique/toque no Buddy = carinho automático (pulinho, piscadinha, partículas, som)
   Uso: <div data-buddy data-size="sm" data-greeting="Oi!"></div> */
(function () {
  "use strict";

  var SVG = "<svg class=\"buddy-svg\" aria-hidden=\"true\" id=\"buddy-svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1080 932.21\"><defs><style> .st0 { stroke-width: 28px; } .st0, .st1, .st2, .st3, .st4, .st5, .st6, .st7, .st8 { stroke: #172744; } .st0, .st9, .st7 { fill: none; } .st0, .st7 { stroke-linecap: round; } .st1 { fill: url(#linear-gradient2); } .st1, .st2, .st3, .st5, .st8 { stroke-width: 14px; } .st2 { fill: url(#linear-gradient5); } .st3 { fill: url(#linear-gradient1); } .st10 { fill: #172744; } .st4 { fill: url(#linear-gradient4); stroke-linejoin: round; stroke-width: 12px; } .st9 { stroke: #000; stroke-width: 55px; } .st5 { fill: url(#linear-gradient6); } .st6 { fill: url(#linear-gradient3); stroke-width: 15px; } .st11 { fill: #a6b4c9; isolation: isolate; opacity: .9; } .st7 { stroke-width: 24px; } .st8 { fill: url(#linear-gradient); } </style><linearGradient id=\"linear-gradient\" x1=\"148.01\" y1=\"281.32\" x2=\"945.52\" y2=\"281.32\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#7ef5ff\"/><stop offset=\".45\" stop-color=\"#4fc5e4\"/><stop offset=\"1\" stop-color=\"#4c65c8\"/></linearGradient><linearGradient id=\"linear-gradient1\" x1=\"-1.75\" y1=\"-164.54\" x2=\"-1.75\" y2=\"-163.19\" gradientTransform=\"translate(190.68 29034.31) scale(57.32 174)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#7ef5ff\"/><stop offset=\".45\" stop-color=\"#4fc5e4\"/><stop offset=\"1\" stop-color=\"#4c65c8\"/></linearGradient><linearGradient id=\"linear-gradient2\" x1=\"2.3\" y1=\"-164.5\" x2=\"2.3\" y2=\"-163.14\" gradientTransform=\"translate(868 29034.31) scale(57.32 174)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#7ef5ff\"/><stop offset=\".45\" stop-color=\"#4fc5e4\"/><stop offset=\"1\" stop-color=\"#4c65c8\"/></linearGradient><linearGradient id=\"linear-gradient3\" x1=\"209.36\" y1=\"522.19\" x2=\"884.18\" y2=\"522.19\" gradientTransform=\"translate(0 1045.09) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#ddebfa\"/></linearGradient><linearGradient id=\"linear-gradient4\" x1=\"253.45\" y1=\"782.49\" x2=\"840.09\" y2=\"782.49\" gradientTransform=\"translate(0 1045.09) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#ffa95b\"/><stop offset=\".45\" stop-color=\"#ff7b3d\"/><stop offset=\"1\" stop-color=\"#f04a3d\"/></linearGradient><linearGradient id=\"linear-gradient5\" x1=\"-1.09\" y1=\"-165.72\" x2=\"-1.09\" y2=\"-164.36\" gradientTransform=\"translate(246 41292.35) scale(69 247)\" gradientUnits=\"userSpaceOnUse\" href=\"#linear-gradient\"><stop offset=\"0\" stop-color=\"#7ef5ff\"/><stop offset=\".45\" stop-color=\"#4fc5e4\"/><stop offset=\"1\" stop-color=\"#4c65c8\"/></linearGradient><linearGradient id=\"linear-gradient6\" x1=\"1.75\" y1=\"-165.72\" x2=\"1.75\" y2=\"-164.36\" gradientTransform=\"translate(802 41292.35) scale(69 247)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#7ef5ff\"/><stop offset=\".45\" stop-color=\"#4fc5e4\"/><stop offset=\"1\" stop-color=\"#4c65c8\"/></linearGradient></defs><g id=\"buddy-character\"><g id=\"Layer_2\"><path class=\"st9\" d=\"M969.31,410.83h0s-.14,3.92-.14,3.92v-11.35c0-22.71-18.07-41.19-40.62-41.87-10.1-47.63-27.38-102.35-62.75-151.69-63-87.85-165.95-132.37-306.17-132.37-.96,0-1.95,0-2.92,0-87.58.74-163.7,20.33-226.24,58.24-50.43,30.56-91.93,72.86-123.36,125.72-20.98,35.29-34.57,70.38-43.34,100.14-21.98,1.29-39.4,19.52-39.4,41.82v91.3l-3.08-89.38c-48.66,9.46-72.99,62.18-68.94,129.76,3.9,62.41,30.32,98.53,72.02,104.81v13.57c0,23.14,18.76,41.9,41.9,41.9h9.46c23.14,0,41.9-18.76,41.9-41.9v-56.04c33.92,150.49,168.4,262.9,329.14,262.9s295.22-112.41,329.14-262.9v56.04c0,23.14,18.76,41.9,41.9,41.9h9.46c23.14,0,41.9-18.76,41.9-41.9v-8.54c40-7.51,65.26-43.4,69.07-104.33,4.06-67.59-20.28-120.3-68.94-129.76ZM802.35,205.66c-28.15-4.09-68.21-4.43-106.61,14.44-4.07-2.01-8.19-3.94-12.36-5.78,9.14-18.69,24.88-47.07,41.85-60.7,31.44,13.85,56.71,31.73,77.12,52.04ZM207.5,376.09c7.96-27.42,20.46-60.15,39.99-92.64,39.96-66.47,96.38-112.42,168.49-137.51-65.69,29.65-122.82,86.51-149.65,189.3-22.72,33.88-39.45,72.1-48.71,113.16v-45.01c0-10.43-3.82-19.97-10.13-27.3ZM812.82,315.38c13.77-21.41,20.58-46.86,23.96-66.81,26.55,41.56,39.93,87.7,48.16,128.85-5.65,7.14-9.03,16.16-9.03,25.97v45.01c-11.11-49.3-33.01-94.51-63.09-133.02Z\"/></g><g id=\"Layer_1\"><path id=\"headband-structure\" class=\"st8\" d=\"M922.52,485.17c-10.53,0-20.02-7.28-22.41-17.99-2.24-10.05-4.09-22.34-6.22-36.57-16.15-107.46-46.18-307.18-334.14-307.18-.92,0-1.82,0-2.75,0-142.23,1.2-246.4,55.03-309.51,160.02-47.9,79.68-53.51,160.75-53.56,161.56-.8,12.65-11.69,22.28-24.34,21.51-12.65-.78-22.29-11.64-21.53-24.29.22-3.7,6.03-91.62,59.05-180.79,31.43-52.86,72.93-95.16,123.36-125.72,62.55-37.91,138.67-57.5,226.24-58.24.97,0,1.95,0,2.92,0,140.22,0,243.18,44.52,306.17,132.37,52.35,72.99,65.09,157.81,73.53,213.94,2.01,13.38,3.75,24.93,5.64,33.42,2.76,12.39-5.05,24.67-17.44,27.42-1.68.37-3.36.55-5.01.55Z\"/><g id=\"layer-headphones-structure\"><path class=\"st3\" d=\"M121.28,405.31c-48.66,9.46-72.99,62.18-68.94,129.76,4.06,64.88,32.44,101.38,77.05,105.43l-8.11-235.2h0Z\"/><path class=\"st1\" d=\"M969.31,410.83c48.66,9.46,72.99,62.18,68.94,129.76-4.06,64.88-32.44,101.38-77.05,105.43l8.11-235.2h0Z\"/></g><circle class=\"st6\" id=\"head-base\" cx=\"546.77\" cy=\"522.91\" r=\"337.41\"/><path id=\"character-hair\" class=\"st4\" d=\"M253.45,408.01s122.17-251.11,338.21-106.01c248.43,166.84,248.43-87.28,248.43-87.28,0,0-90.6-34.79-164.91,17.57,0,0,34.87-85.06,67.59-86.51,0,0-445.85-156.37-489.32,262.23h0Z\"/><g id=\"layer-features\"><g id=\"layer-eyebrows\"><path id=\"eyebrow-left\" class=\"st0 eyebrow-item\" d=\"M344.69,398.66c32.44-30.64,68.03-36.5,106.78-17.57\"/><path id=\"eyebrow-right\" class=\"st0 eyebrow-item\" d=\"M656.93,394.61c34.24-23.43,68.49-22.98,102.73,1.35\"/></g><g id=\"eyes-pupil-group\"><g id=\"eye-left-container\" class=\"eye-container\"><g id=\"eye-left-scale\"><ellipse class=\"st10\" cx=\"400.11\" cy=\"518.96\" rx=\"66.23\" ry=\"74.34\"/><circle class=\"st11\" cx=\"371.72\" cy=\"485.17\" r=\"20.28\"/></g></g><g id=\"eye-right-container\" class=\"eye-container\"><g id=\"eye-right-scale\"><ellipse class=\"st10\" cx=\"696.81\" cy=\"518.96\" rx=\"66.23\" ry=\"74.34\"/><circle class=\"st11\" cx=\"668.42\" cy=\"485.17\" r=\"20.28\"/></g><path id=\"eye-right-wink\" class=\"st7\" d=\"M651.53,528.42c28.83-36.94,59.03-36.94,90.56,0\" style=\"display: none;\"/></g></g><g id=\"mouth-group\"><path class=\"st7\" d=\"M454.18,671.7c64.88,48.66,133.37,44.61,205.46-12.17\"/></g></g><g id=\"layer-headphones-front\"><rect class=\"st2\" x=\"124.36\" y=\"361.49\" width=\"93.27\" height=\"333.87\" rx=\"31\" ry=\"31\"/><rect class=\"st5\" x=\"875.91\" y=\"361.49\" width=\"93.27\" height=\"333.87\" rx=\"31\" ry=\"31\"/></g></g></g></svg>";

  var PHRASES = [
    "Hehe, cócegas! 💙",
    "Bora editar esse podcast?",
    "Eu corto, você cria. Fechado?",
    "Fiz backup da sua sequência, relaxa 😉",
    "Mais um carinho e eu corto o episódio inteiro!",
    "Quem fala mais alto ganha a câmera 🎙️",
    "Psiu: eu rodo 100% no seu PC.",
    "Ai, que gostoso! ✨"
  ];
  var EMOJIS = ["✨", "💙", "⭐", "🎵", "💫", "🧡"];

  function mount(host) {
    var size = host.getAttribute("data-size");
    var greeting = host.getAttribute("data-greeting") || "Oi! Eu sou o Buddy 👋";

    host.classList.add("buddy-zone");
    host.innerHTML =
      '<div class="buddy-bubble" role="status" aria-live="polite">' + greeting + '</div>' +
      '<div class="buddy-stage' + (size === "sm" ? " size-sm" : "") + '" role="button" tabindex="0" aria-label="Fazer carinho no Buddy">' +
      '<div class="buddy-glow"></div>' +
      '<div class="character-wrap">' + SVG + '<div class="character-shadow"></div></div>' +
      '</div>' +
      (host.hasAttribute("data-hint") ? '<div class="buddy-hint">Clique no Buddy para fazer carinho</div>' : "");

    var stage = host.querySelector(".buddy-stage");
    var wrap = host.querySelector(".character-wrap");
    var svg = host.querySelector(".buddy-svg");
    var pupils = host.querySelector("#eyes-pupil-group");
    var bubble = host.querySelector(".buddy-bubble");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var isWinking = false;
    var phraseIdx = -1;

    /* Piscar orgânico */
    function blink(cb) {
      if (isWinking) { if (cb) cb(); return; }
      svg.classList.add("is-blinking");
      setTimeout(function () { svg.classList.remove("is-blinking"); if (cb) cb(); }, 140);
    }
    function scheduleBlink() {
      setTimeout(function () {
        blink(function () {
          if (Math.random() < 0.3) setTimeout(function () { blink(scheduleBlink); }, 130);
          else scheduleBlink();
        });
      }, 2200 + Math.random() * 3000);
    }
    scheduleBlink();

    /* Carinho automático */
    function say(text) {
      bubble.textContent = text;
      bubble.classList.remove("pop");
      void bubble.offsetWidth;
      bubble.classList.add("pop");
    }
    function nextPhrase() {
      var i;
      do { i = Math.floor(Math.random() * PHRASES.length); } while (i === phraseIdx && PHRASES.length > 1);
      phraseIdx = i;
      return PHRASES[i];
    }
    function particles(x, y) {
      if (reduced) return;
      var n = 6 + Math.floor(Math.random() * 4);
      for (var i = 0; i < n; i++) {
        var p = document.createElement("div");
        p.className = "particle";
        p.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.setProperty("--dx", (Math.random() - 0.5) * 130 + "px");
        document.body.appendChild(p);
        (function (el) { setTimeout(function () { el.remove(); }, 950); })(p);
      }
    }
    function pet(x, y) {
      svg.classList.remove("is-reacting");
      void svg.getBoundingClientRect();
      svg.classList.add("is-reacting");
      particles(x, y);
      sound(520, 880);
      say(nextPhrase());
      if (!isWinking) {
        setTimeout(function () {
          isWinking = true; svg.classList.add("is-winking");
          setTimeout(function () { isWinking = false; svg.classList.remove("is-winking"); }, 550);
        }, 150);
      }
      setTimeout(function () { svg.classList.remove("is-reacting"); }, 650);
    }
    stage.addEventListener("click", function (e) {
      var r = stage.getBoundingClientRect();
      var x = e.clientX || r.left + r.width / 2;
      var y = e.clientY || r.top + r.height / 2;
      pet(x, y);
    });
    stage.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var r = stage.getBoundingClientRect();
        pet(r.left + r.width / 2, r.top + r.height / 2);
      }
    });

    /* Seguir cursor (padrão, sempre ligado) */
    var mx = 0, my = 0, ex = 0, ey = 0, tx = 0, ty = 0;
    function track(cx, cy) {
      var r = stage.getBoundingClientRect();
      var ox = r.left + r.width / 2, oy = r.top + r.height / 2;
      mx = Math.max(-1, Math.min(1, (cx - ox) / (window.innerWidth / 2)));
      my = Math.max(-1, Math.min(1, (cy - oy) / (window.innerHeight / 2)));
    }
    window.addEventListener("pointermove", function (e) { track(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener("touchmove", function (e) { if (e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    document.addEventListener("mouseleave", function () { mx = 0; my = 0; });

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(stage);
    }
    function loop() {
      if (visible) {
        ex += (mx * 22 - ex) * 0.12;
        ey += (my * 16 - ey) * 0.12;
        tx += (-my * 6 - tx) * 0.08;
        ty += (mx * 7 - ty) * 0.08;
        pupils.style.transform = "translate(" + ex.toFixed(2) + "px," + ey.toFixed(2) + "px)";
        if (!reduced) wrap.style.transform = "rotateX(" + tx.toFixed(2) + "deg) rotateY(" + ty.toFixed(2) + "deg)";
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* Som sintetizado, sem arquivos externos */
  var ctx = null;
  function sound(f0, f1) {
    try {
      if (!ctx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC(); }
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(f0, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(f1, ctx.currentTime + 0.15);
      g.gain.setValueAtTime(0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.19);
    } catch (err) { /* silencioso */ }
  }

  var hosts = document.querySelectorAll("[data-buddy]");
  for (var i = 0; i < hosts.length; i++) mount(hosts[i]);
})();
