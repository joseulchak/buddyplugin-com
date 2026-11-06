/* Demo: Premiere Pro (Windows) com o painel do Buddy Editor.
   Textos e layout do painel copiados do buddy-editor (src/i18n/locales/pt.ts, UX-SPEC.md). */
(function () {
  "use strict";
  var root = document.querySelector("[data-ppro-demo]");
  if (!root) return;

  /* ---------- Ícones (lucide, iguais aos do painel) ---------- */
  var P = {
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    wave: '<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
    warnmsg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/>',
    switchcam: '<path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/><path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"/><circle cx="12" cy="12" r="3"/><path d="m18 22-3-3 3-3"/><path d="m6 2 3 3-3 3"/>',
    captions: '<rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    dices: '<rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    minus: '<path d="M2 12h20"/>', square: '<rect x="3" y="3" width="18" height="18"/>', x: '<path d="M3 3l18 18M21 3 3 21"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>', back: '<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>', fwd: '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',
    replay: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  };
  function ic(n, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.75) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + "</svg>"; }

  /* ---------- Módulos (mesma ordem e textos do painel) ---------- */
  var MODS = [
    { id: "podcast", icon: "mic", tab: "Podcast", name: "Buddy Podcast" },
    { id: "silences", icon: "wave", tab: "Silêncios", name: "Buddy Silences", tag: "Remove os silêncios", desc: "Detecta pausas silenciosas com o FFmpeg e remove (ripple delete) ou levanta (lift) os trechos, com margem configurável." },
    { id: "zoom", icon: "zoom", tab: "Zoom", name: "Buddy Zoom", tag: "Zoom dinâmico", desc: "Alterna punch-ins e zooms suaves com keyframes entre os cortes para prender a atenção de quem assiste." },
    { id: "profanity", icon: "warnmsg", tab: "Palavrões", name: "Buddy Profanity", tag: "Censura com IA local", desc: "Transcreve localmente com o Whisper e aplica bipe, mudo, corte ou marcador nas palavras bloqueadas." },
    { id: "angles", icon: "switchcam", tab: "Ângulos", name: "Buddy Angles" },
    { id: "captions", icon: "captions", tab: "Legendas", name: "Buddy Captions", tag: "Legendas palavra por palavra", desc: "Legendas com Whisper local e paginação inteligente, exportadas como SRT ou MOGRT animado." }
  ];
  var PALETTE = ["#3b82f6", "#a855f7", "#10b981"];

  /* ---------- Cenários ---------- */
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  var PODCAST = {
    seq: "Podcast_Ep12", dur: 1294, fps: "29.97",
    video: [ // de cima para baixo (V3, V2, V1)
      { tr: 3, name: "Ana", clip: "CAM1_Ana.mp4", cam: 0, scene: "ana" },
      { tr: 2, name: "Beto", clip: "CAM2_Beto.mp4", cam: 1, scene: "beto" },
      { tr: 1, name: "Geral", clip: "CAM3_Geral.mp4", cam: 2, scene: "wide" }
    ],
    audio: [{ tr: 1, name: "Mic Ana", clip: "Mic_Ana.wav", who: 0 }, { tr: 2, name: "Mic Beto", clip: "Mic_Beto.wav", who: 1 }],
    plan: [[0, 0.06, 2], [0.06, 0.24, 0], [0.24, 0.37, 1], [0.37, 0.55, 0], [0.55, 0.61, 2], [0.61, 0.8, 1], [0.8, 1, 0]]
  };
  var ANGLES = {
    seq: "Aula_07", dur: 92, fps: "29.97",
    video: [
      { tr: 3, name: "Lateral", clip: "Lateral.mp4", cam: 2, scene: "side" },
      { tr: 2, name: "Fechada", clip: "Fechada.mp4", cam: 1, scene: "close" },
      { tr: 1, name: "Aberta", clip: "Aberta.mp4", cam: 0, scene: "open" }
    ],
    audio: [{ tr: 1, name: "Voz", clip: "Voz_lapela.wav", who: 0 }],
    pauses: (function () { // pausas da fala: fins de frase e micro pausas
      var r = rng(11), out = [], t = 1.2;
      while (t < 91) { t += 0.7 + r() * 1.6; var sent = r() < 0.32, len = sent ? 0.45 + r() * 0.5 : 0.13 + r() * 0.2; if (t + len > 91.5) break; out.push({ s: t, e: t + len, cut: t + len / 2, kind: sent ? "sentence" : "micro" }); t += len; }
      return out;
    })(),
    seed: 4
  };

  function planAngles(seed) {
    var r = rng(seed * 7919 + 3), D = ANGLES.dur, min = 3, max = 10, cur = 0, prev = -1, shots = [], over = 0;
    function pick() { var c; do { c = Math.floor(r() * 3); } while (c === prev); prev = c; return c; }
    while (D - cur >= min) {
      var target = cur + min + r() * (max - min);
      var cands = ANGLES.pauses.filter(function (p) { return p.cut >= cur + min && p.cut <= cur + max; });
      var sent = cands.filter(function (p) { return p.kind === "sentence"; });
      var pool = sent.length ? sent : cands, best = null;
      pool.forEach(function (p) { if (!best || Math.abs(p.cut - target) < Math.abs(best.cut - target)) best = p; });
      if (!best) { best = ANGLES.pauses.filter(function (p) { return p.cut > cur + max; })[0]; if (best) over++; }
      if (!best || D - best.cut < min) break;
      shots.push([cur / D, best.cut / D, pick()]);
      cur = best.cut;
    }
    shots.push([cur / D, 1, pick()]);
    return { shots: shots, over: over };
  }

  /* ---------- Estado ---------- */
  var S = { mod: "podcast", phase: "idle", progress: 0, seed: ANGLES.seed, anglesPlan: planAngles(ANGLES.seed), auto: true };
  function scen() { return S.mod === "angles" ? ANGLES : PODCAST; }
  function currentPlan() { return S.mod === "angles" ? S.anglesPlan.shots : PODCAST.plan; }
  function applied() { return S.phase === "applied"; }

  /* ---------- Esqueleto ---------- */
  root.innerHTML =
    '<div class="pp" role="img" aria-label="Demonstração do Buddy Editor dentro do Adobe Premiere Pro no Windows">' +
      '<div class="pp-title"><span class="pp-app"></span><span class="pp-path" data-path></span>' +
        '<span class="pp-winctl"><span>' + ic("minus", 1.5) + '</span><span>' + ic("square", 1.5) + '</span><span class="close">' + ic("x", 1.5) + "</span></span></div>" +
      '<div class="pp-menu"><span>Arquivo</span><span>Editar</span><span>Clipe</span><span>Sequência</span><span>Marcadores</span><span>Gráficos e títulos</span><span>Exibir</span><span class="on">Janela</span><span>Ajuda</span></div>' +
      '<div class="pp-body">' +
        '<div class="pp-left">' +
          '<div class="pp-panel pp-monitor"><div class="pp-tabs"><span class="pp-tab">Origem: (sem clipes)</span><span class="pp-tab on" data-progtab></span></div>' +
            '<div class="pp-screen-wrap"><div class="pp-screen" data-screen></div></div>' +
            '<div class="pp-mon-bar"><span class="tc" data-tc></span><span class="fit"><span>Ajustar</span><span>1/2</span></span><span class="tc-end" data-tcend></span></div>' +
            '<div class="pp-transport">' + ic("back") + ic("play") + ic("fwd") + "</div></div>" +
          '<div class="pp-panel pp-tl"><div class="pp-tabs"><span class="pp-tab on" data-seqtab></span></div>' +
            '<div class="pp-tl-top"><span class="tc" data-tc2></span><div class="pp-ruler" data-ruler></div></div>' +
            '<div class="pp-tracks" data-tracks></div></div>' +
        "</div>" +
        '<div class="pp-panel pp-ext"><div class="pp-ext-in"><div class="pp-tabs"><span class="pp-tab on">Buddy Editor <b>≡</b></span></div>' +
          '<div class="bd">' +
            '<div class="bd-head"><img src="assets/buddy-panel-icon.png" alt="" width="28" height="28"><div class="t"><b>Buddy Editor</b><span data-seqline></span></div>' +
              '<span class="bd-icon" title="Atualizar sequência">' + ic("refresh") + '</span><span class="bd-icon" title="Configurações">' + ic("settings") + "</span></div>" +
            '<nav class="bd-tabs" data-tabs></nav>' +
            '<div class="bd-main" data-main></div>' +
            '<div class="bd-status"><span><i class="dot" style="background:#3fb950"></i>Premiere 25.0.0</span><span><i class="dot" style="background:#3fb950"></i>CUDA</span><span class="ver">v2.0.3</span></div>' +
          "</div></div></div>" +
      "</div>" +
    "</div>" +
    '<div class="pp-caption"><span>Clique nas abas Podcast e Ângulos do painel, ou nos botões do Buddy.</span><button type="button" data-replay>' + ic("replay", 2) + " Repetir demonstração</button></div>";

  var $ = function (s) { return root.querySelector(s); };
  var tabsEl = $("[data-tabs]"), mainEl = $("[data-main]"), tracksEl = $("[data-tracks]"), screenEl = $("[data-screen]");

  tabsEl.innerHTML = MODS.map(function (m) {
    return '<div class="bd-tab" data-mod="' + m.id + '" title="' + m.name + '">' + ic(m.icon) + "<span>" + m.tab + "</span></div>";
  }).join("");

  function tc(sec, frames) {
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = Math.floor(sec % 60), f = frames == null ? Math.floor((sec % 1) * 30) : frames;
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return p(h) + ";" + p(m) + ";" + p(s) + ";" + p(f);
  }
  function mmss(sec) { sec = Math.round(sec); var m = Math.floor(sec / 60), s = sec % 60; return m + ":" + (s < 10 ? "0" : "") + s; }

  /* ---------- Linha do tempo ---------- */
  function waveHTML(who, isAngles) {
    var bars = 90, h = "", r = rng(who * 31 + (isAngles ? 5 : 1));
    for (var i = 0; i < bars; i++) {
      var t = (i + 0.5) / bars, loud;
      if (isAngles) {
        var sec = t * ANGLES.dur, inPause = ANGLES.pauses.some(function (p) { return sec >= p.s - 0.15 && sec <= p.e + 0.15; });
        loud = inPause ? 0.06 : 0.35 + r() * 0.6;
      } else {
        var seg = PODCAST.plan.filter(function (p) { return t >= p[0] && t < p[1]; })[0];
        var speaking = seg && (seg[2] === who || seg[2] === 2) && !(seg[2] === 2 && seg[0] === 0);
        loud = speaking ? 0.35 + r() * 0.6 : 0.05 + r() * 0.12;
      }
      h += '<i style="height:' + Math.round(loud * 100) + '%"></i>';
    }
    return h;
  }
  function renderRuler() {
    var sc = scen(), el = $("[data-ruler]"), h = "", steps = 4;
    for (var i = 0; i <= 40; i++) h += '<i class="' + (i % 10 === 0 ? "big" : "") + '" style="left:' + (i / 40 * 100) + '%"></i>';
    for (var j = 0; j < steps; j++) h += '<span style="left:' + (j / steps * 100) + '%">' + tc(sc.dur * j / steps, 0) + "</span>";
    el.innerHTML = h;
  }
  function renderTracks() {
    var sc = scen(), isAngles = S.mod === "angles", plan = currentPlan(), html = "";
    sc.video.forEach(function (v, idx) {
      var lane = "";
      if (!applied()) {
        lane = '<div class="clip" style="left:0;width:100%"><div class="ch">' + v.clip + "</div></div>";
      } else {
        plan.forEach(function (p) {
          var on = p[2] === v.cam;
          lane += '<div class="clip' + (on ? "" : " off") + '" style="left:' + (p[0] * 100) + "%;width:" + ((p[1] - p[0]) * 100) + '%"><div class="ch">' + v.clip + "</div></div>";
        });
      }
      html += '<div class="pp-row"><div class="pp-th"><span class="lk">' + ic("lock") + '</span><span class="tgt' + (idx === sc.video.length - 1 ? " on" : "") + '">V' + v.tr + '</span><span class="nm">' + v.name + '</span><span class="eye">' + ic("eye") + '</span></div><div class="pp-lane">' + lane + "</div></div>";
    });
    sc.audio.forEach(function (a, i) {
      html += '<div class="pp-row audio' + (i === 0 ? " sep" : "") + '"><div class="pp-th"><span class="lk">' + ic("lock") + '</span><span class="tgt' + (i === 0 ? " on" : "") + '">A' + a.tr + '</span><span class="nm">' + a.name + '</span><span class="ms"><em>M</em><em>S</em></span></div>' +
        '<div class="pp-lane"><div class="clip audio" style="left:0;width:100%"><div class="ch">' + a.clip + '</div><div class="wv">' + waveHTML(a.who, isAngles) + "</div></div></div></div>";
    });
    html += '<div class="pp-playhead" data-ph></div>';
    tracksEl.innerHTML = html;
  }

  /* ---------- Cenas da câmera ---------- */
  var SCENES = {
    ana: '<div class="wall"></div><div class="lamp" style="left:78%;top:18%"></div><div class="shelf" style="left:8%;width:30%;top:30%"></div><div class="person ana" style="left:34%;width:34%;height:92%"><div class="body"></div><div class="head"></div><div class="hair"></div><div class="phones"></div></div><div class="mic" style="left:62%;bottom:16%"></div><div class="desk"></div>',
    beto: '<div class="wall"></div><div class="lamp" style="left:12%;top:22%"></div><div class="shelf" style="left:62%;width:30%;top:26%"></div><div class="person beto" style="left:32%;width:34%;height:92%"><div class="body"></div><div class="head"></div><div class="hair"></div><div class="phones"></div></div><div class="mic" style="left:30%;bottom:16%"></div><div class="desk"></div>',
    wide: '<div class="wall"></div><div class="lamp" style="left:47%;top:14%"></div><div class="shelf" style="left:35%;width:30%;top:34%"></div><div class="person ana" style="left:10%;width:26%;height:66%"><div class="body"></div><div class="head"></div><div class="hair"></div><div class="phones"></div></div><div class="person beto" style="left:64%;width:26%;height:66%"><div class="body"></div><div class="head"></div><div class="hair"></div><div class="phones"></div></div><div class="mic" style="left:36%;bottom:16%"></div><div class="mic" style="left:60%;bottom:16%"></div><div class="desk" style="height:22%"></div>',
    open: '<div class="wall"></div><div class="lamp" style="left:80%;top:20%"></div><div class="shelf" style="left:10%;width:24%;top:28%"></div><div class="person solo" style="left:38%;width:24%;height:62%"><div class="body"></div><div class="head"></div><div class="hair"></div></div><div class="desk" style="height:24%"></div>',
    close: '<div class="wall"></div><div class="lamp" style="left:84%;top:10%"></div><div class="person solo" style="left:26%;width:48%;height:118%;bottom:-24%"><div class="body"></div><div class="head"></div><div class="hair"></div></div>',
    side: '<div class="wall"></div><div class="lamp" style="left:10%;top:16%"></div><div class="shelf" style="left:6%;width:28%;top:36%"></div><div class="person solo" style="left:52%;width:30%;height:80%;transform:scaleX(-1)"><div class="body"></div><div class="head" style="left:58%"></div><div class="hair" style="left:58%"></div></div><div class="desk" style="height:20%"></div>'
  };
  var lastScene = "";
  function showCam(cam) {
    var sc = scen(), v = sc.video.filter(function (x) { return x.cam === cam; })[0];
    if (!v || lastScene === S.mod + v.scene) return;
    lastScene = S.mod + v.scene;
    screenEl.innerHTML = '<div class="scene">' + SCENES[v.scene] + '</div><span class="cam-tag">V' + v.tr + " · " + v.name + "</span>";
  }

  /* ---------- Painel do Buddy ---------- */
  function banner(kind, text, icon) { return '<div class="bd-banner ' + kind + '">' + (icon ? ic(icon) : "") + "<span>" + text + "</span></div>"; }
  function actions(analyzeLabel) {
    var busy = S.phase === "analyzing", applying = S.phase === "applying";
    var a = busy
      ? '<button type="button" class="bd-btn big" data-act="cancel"><span class="spin" style="display:inline-flex;color:#ffe600">' + ic("loader") + "</span>Analisando áudio… " + S.progress + '%<span class="cancel">Cancelar</span></button>'
      : '<button type="button" class="bd-btn big" data-act="analyze"' + (applying ? " disabled" : "") + ">" + ic("volume") + analyzeLabel + "</button>";
    var can = S.phase === "analyzed" || S.phase === "applied";
    var b = '<button type="button" class="bd-btn big primary" data-act="apply"' + (can ? "" : " disabled") + ">" +
      (applying ? '<span class="spin" style="display:inline-flex">' + ic("loader") + "</span>Aplicando cortes…" : ic("scissors") + "Aplicar cortes na timeline") + "</button>";
    return '<div class="bd-actions">' + a + b + "</div>";
  }
  function previewPodcast() {
    var plan = PODCAST.plan, D = PODCAST.dur, t = [0, 0, 0, 0];
    plan.forEach(function (p) { var d = (p[1] - p[0]) * D; if (p[2] === 2) { if (p[0] === 0) t[3] += d; else t[2] += d; } else t[p[2]] += d; });
    var bar = plan.map(function (p) { return '<i style="width:' + ((p[1] - p[0]) * 100) + "%;background:" + PALETTE[p[2]] + '"></i>'; }).join("");
    var row = function (color, name, sec) { return '<div class="bd-r"><span class="l"><span class="bd-dot" style="background:' + color + '"></span>' + name + '</span><span class="v"><span>' + mmss(sec) + "</span><b>" + Math.round(sec / D * 100) + "%</b></span></div>"; };
    return '<section class="bd-card"><div class="bd-title"><h4>' + ic("sparkles") + 'Prévia</h4><span class="bd-pill">' + (plan.length - 1) + " cortes</span></div>" +
      '<div class="bd-bar">' + bar + '</div><span class="bd-faint">A barra é a timeline inteira. Cada cor mostra qual câmera fica no ar.</span>' +
      '<div class="bd-rows">' + row(PALETTE[0], "Ana", t[0]) + row(PALETTE[1], "Beto", t[1]) +
      '<div class="bd-r sum"><span>Falando juntos</span><span class="mono">' + mmss(t[2]) + '</span></div><div class="bd-r" style="color:#8f8f8f"><span>Silêncio</span><span class="mono" style="color:#fff">' + mmss(t[3]) + "</span></div>" +
      '<span class="bd-faint">A prévia se atualiza na hora quando você muda a sensibilidade ou as regras.</span></div></section>';
  }
  function previewAngles() {
    var plan = S.anglesPlan.shots, D = ANGLES.dur, t = [0, 0, 0];
    plan.forEach(function (p) { t[p[2]] += (p[1] - p[0]) * D; });
    var bar = plan.map(function (p) { return '<i style="width:' + ((p[1] - p[0]) * 100) + "%;background:" + PALETTE[p[2]] + '"></i>'; }).join("");
    var sent = ANGLES.pauses.filter(function (p) { return p.kind === "sentence"; }).length, micro = ANGLES.pauses.length - sent;
    var rows = [0, 1, 2].map(function (c) {
      var v = ANGLES.video.filter(function (x) { return x.cam === c; })[0];
      return '<div class="bd-r"><span class="l"><span class="bd-dot" style="background:' + PALETTE[c] + '"></span><span class="mono">V' + v.tr + '</span></span><span class="v"><span>' + t[c].toFixed(1) + "s</span><b>" + Math.round(t[c] / D * 100) + "%</b></span></div>";
    }).join("");
    return '<section class="bd-card"><div class="bd-title"><h4>' + ic("sparkles") + 'Prévia</h4><span class="bd-pill">' + (plan.length - 1) + " cortes</span></div>" +
      '<div class="bd-bar">' + bar + '</div><span class="bd-faint">A barra é a timeline inteira. Cada cor é um ângulo.</span>' +
      '<div class="bd-rows">' + rows + '<div class="bd-r sum"><span>' + sent + " fins de frase · " + micro + ' micro pausas</span><span class="mono">Plano médio: ' + (D / plan.length).toFixed(1) + "s</span></div>" +
      '<span class="bd-faint">A prévia se atualiza na hora quando você muda as regras.</span></div>' +
      '<button type="button" class="bd-btn" data-act="shuffle" title="Sorteia uma nova ordem e novos tempos de plano, sempre nas pausas."' + (S.phase === "applying" ? " disabled" : "") + ">" + ic("dices") + "Gerar outra variação</button></section>";
  }
  function renderPanel() {
    var sc = scen(), html = "";
    tabsEl.querySelectorAll(".bd-tab").forEach(function (t) { t.classList.toggle("on", t.getAttribute("data-mod") === S.mod); });
    $("[data-seqline]").innerHTML = sc.seq + " <em>" + sc.fps + " fps · " + mmss(sc.dur) + "</em>";
    var hasPreview = S.phase === "analyzed" || S.phase === "applying" || S.phase === "applied";
    if (S.mod === "podcast") {
      if (applied()) html += banner("success", (PODCAST.plan.length - 1) + " cortes aplicados. Cópia de segurança: Podcast_Ep12_backup", "check");
      html += '<div class="bd-seg"><span class="on">' + ic("users") + "1. Falantes</span><span>" + ic("camera") + "2. Câmeras</span><span>" + ic("sliders") + "3. Regras</span></div>";
      html += '<section class="bd-card"><div class="bd-title"><h4>' + ic("mic") + 'Falantes e microfones</h4></div><span class="bd-sub">Diga de quem é cada trilha de áudio. O Buddy lê o áudio igual ao Premiere.</span>' +
        '<div class="bd-box"><span class="bd-dot" style="background:' + PALETTE[0] + '"></span><span class="nm">Ana</span><span class="bd-badge">A1</span><span class="ch">Auto · Canal 1</span></div>' +
        '<div class="bd-box"><span class="bd-dot" style="background:' + PALETTE[1] + '"></span><span class="nm">Beto</span><span class="bd-badge">A2</span><span class="ch">Auto · Canal 1</span></div>' +
        '<span class="bd-faint">O Buddy coloca no ar a câmera de quem está mais alto no próprio microfone. O vazamento nos outros microfones é sempre mais baixo, então é ignorado.</span></section>';
      html += hasPreview ? previewPodcast() : (S.phase === "analyzing" ? "" : banner("info", "Clique em Analisar áudio para ver a prévia dos cortes."));
      html += actions("Analisar áudio");
    } else if (S.mod === "angles") {
      if (applied()) html += banner("success", (S.anglesPlan.shots.length - 1) + " cortes aplicados. Cópia de segurança: Aula_07_backup", "check");
      html += '<div class="bd-seg"><span class="on">' + ic("camera") + "1. Ângulos</span><span>" + ic("sliders") + "2. Regras</span></div>";
      html += '<section class="bd-card"><div class="bd-title"><h4>' + ic("volume") + 'Áudio da fala</h4></div><div class="bd-box"><span class="bd-badge">A1</span><span class="nm">Voz</span><span class="ch">Trilha da voz</span></div>' +
        '<span class="bd-faint">O Buddy encontra as pausas nesta trilha e só troca de ângulo onde a voz está em silêncio: no fim de uma frase ou numa pausa curta entre palavras.</span></section>';
      html += hasPreview ? previewAngles() : (S.phase === "analyzing" ? "" : banner("info", "Clique em Analisar áudio para ver a prévia dos cortes."));
      html += actions("Analisar áudio");
    } else {
      var m = MODS.filter(function (x) { return x.id === S.mod; })[0];
      html += '<section class="bd-card bd-module"><span class="ic">' + ic(m.icon) + "</span><b>" + m.name + '</b><span class="tg">' + m.tag + "</span><p>" + m.desc + "</p></section>";
    }
    mainEl.innerHTML = html;
    if (S.phase !== "idle" && (S.mod === "podcast" || S.mod === "angles")) mainEl.scrollTop = mainEl.scrollHeight;
  }

  function renderAll() {
    var sc = scen();
    $("[data-path]").textContent = "Adobe Premiere Pro 2025 - C:\\Projetos\\" + sc.seq + ".prproj *";
    $("[data-progtab]").innerHTML = "Programa: " + sc.seq + " <b>≡</b>";
    $("[data-seqtab]").innerHTML = sc.seq + " <b>≡</b>";
    $("[data-tcend]").textContent = tc(sc.dur, 10);
    renderRuler(); renderTracks(); renderPanel(); lastScene = "";
  }

  /* ---------- Fluxo: analisar → prévia → aplicar ---------- */
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; clearInterval(progTimer); }
  var progTimer = null;
  function analyze(then) {
    clearTimers(); S.phase = "analyzing"; S.progress = 0; renderTracks(); renderPanel();
    progTimer = setInterval(function () {
      S.progress = Math.min(100, S.progress + 7 + Math.floor(Math.random() * 6));
      renderPanel();
      if (S.progress >= 100) { clearInterval(progTimer); S.phase = "analyzed"; renderPanel(); if (then) later(then, 1300); }
    }, 110);
  }
  function apply() {
    clearTimers(); S.phase = "applying"; renderPanel();
    later(function () { S.phase = "applied"; renderTracks(); renderPanel(); }, 900);
  }
  function selectMod(id, autoRun) {
    clearTimers(); S.mod = id;
    if (id === "podcast" || id === "angles") { S.phase = "idle"; renderAll(); if (autoRun) later(function () { analyze(apply); }, 700); }
    else renderPanel();
  }

  tabsEl.addEventListener("click", function (e) {
    var t = e.target.closest(".bd-tab"); if (!t) return;
    S.auto = false; selectMod(t.getAttribute("data-mod"), true);
  });
  mainEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
    S.auto = false;
    var act = b.getAttribute("data-act");
    if (act === "analyze") analyze();
    else if (act === "cancel") { clearTimers(); S.phase = "idle"; renderPanel(); }
    else if (act === "apply") apply();
    else if (act === "shuffle") { S.seed++; S.anglesPlan = planAngles(S.seed); S.phase = "analyzed"; renderTracks(); renderPanel(); }
  });
  root.querySelector("[data-replay]").addEventListener("click", function () { S.mod = "podcast"; startTour(); });

  /* Tour automático: Podcast e depois Ângulos */
  function startTour() {
    clearTimers(); S.auto = true; S.mod = "podcast"; S.phase = "idle"; renderAll();
    later(function () {
      analyze(function () {
        apply();
        later(function () { if (S.auto) { S.mod = "angles"; S.phase = "idle"; renderAll(); later(function () { if (S.auto) analyze(function () { if (S.auto) apply(); }); }, 900); } }, 7000);
      });
    }, 900);
  }

  /* Cabeça de reprodução e monitor */
  var t0 = performance.now();
  function frame(now) {
    var sc = scen(), D = 14000, f = ((now - t0) % D) / D, ph = root.querySelector("[data-ph]");
    if (ph) {
      var lane = tracksEl.querySelector(".pp-lane");
      if (lane) ph.style.left = (lane.offsetLeft + lane.offsetWidth * f) + "px";
    }
    var sec = f * sc.dur;
    $("[data-tc]").textContent = tc(sec); $("[data-tc2]").textContent = tc(sec);
    var cam = sc.video[0].cam; // antes: a trilha de cima cobre as outras
    if (applied()) { var p = currentPlan().filter(function (x) { return f >= x[0] && f < x[1]; })[0]; if (p) cam = p[2]; }
    showCam(cam);
    requestAnimationFrame(frame);
  }

  renderAll();
  requestAnimationFrame(frame);
  if ("IntersectionObserver" in window) {
    var started = false;
    new IntersectionObserver(function (en) { if (en[0].isIntersecting && !started) { started = true; startTour(); } }, { threshold: 0.3 }).observe(root);
  } else startTour();
})();
