(function () {
  "use strict";

  /* ---------- Navegação ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var toggle = nav.querySelector(".nav-toggle");
    toggle && toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Revelar ao rolar ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Demo da timeline (Buddy Podcast) ---------- */
  var tl = document.querySelector("[data-timeline]");
  if (tl) initTimeline(tl);

  function initTimeline(root) {
    // Plano: quem está no ar em cada trecho (0–100 = duração da sequência)
    var plan = [
      { s: 0, e: 12, cam: "wide" },
      { s: 12, e: 29, cam: "ana" },
      { s: 29, e: 41, cam: "beto" },
      { s: 41, e: 57, cam: "ana" },
      { s: 57, e: 64, cam: "wide" },
      { s: 64, e: 81, cam: "beto" },
      { s: 81, e: 100, cam: "ana" }
    ];
    var names = { ana: "CAM 1 · Ana", beto: "CAM 2 · Beto", wide: "CAM 3 · Plano geral" };
    var screens = {
      ana: "linear-gradient(160deg,#2e7f99,#174152)",
      beto: "linear-gradient(160deg,#a5532c,#4b2414)",
      wide: "linear-gradient(160deg,#3c4f9c,#1b2552)"
    };
    var lanes = {
      ana: root.querySelector('[data-lane="ana"]'),
      beto: root.querySelector('[data-lane="beto"]'),
      wide: root.querySelector('[data-lane="wide"]')
    };
    var tracksEl = root.querySelector(".tl-tracks");
    var screen = root.querySelector(".tl-screen");
    var who = root.querySelector(".tl-screen .who");
    var statusEl = root.querySelector(".tl-status");
    var statCuts = root.querySelector("[data-stat=cuts]");
    var statTime = root.querySelector("[data-stat=time]");
    var btnBefore = root.querySelector("[data-mode=before]");
    var btnAfter = root.querySelector("[data-mode=after]");
    var playhead = root.querySelector(".playhead");

    // Ondas de áudio determinísticas: alto quando a pessoa fala
    function speaking(who, t) {
      for (var i = 0; i < plan.length; i++) {
        var p = plan[i];
        if (t >= p.s && t < p.e) return p.cam === who || p.cam === "wide";
      }
      return false;
    }
    function buildWave(el, who) {
      var bars = 70, html = "";
      for (var i = 0; i < bars; i++) {
        var t = (i + 0.5) / bars * 100;
        var seed = Math.abs(Math.sin(i * 12.9898 + (who === "ana" ? 3 : 7)) * 43758.5453) % 1;
        var h = speaking(who, t) ? 35 + seed * 60 : 6 + seed * 12;
        html += '<i style="height:' + h.toFixed(0) + '%"></i>';
      }
      el.innerHTML = html;
    }
    root.querySelectorAll(".wave").forEach(function (w) { buildWave(w, w.getAttribute("data-who")); });

    // Linhas de corte
    plan.slice(1).forEach(function (p) {
      var c = document.createElement("div");
      c.className = "cut-line";
      c.style.left = "calc(88px + (100% - 102px) * " + (p.s / 100) + ")";
      tracksEl.appendChild(c);
    });
    if (window.matchMedia("(max-width: 760px)").matches) {
      tracksEl.querySelectorAll(".cut-line").forEach(function (c, i) {
        c.style.left = "calc(68px + (100% - 82px) * " + (plan[i + 1].s / 100) + ")";
      });
    }

    function render(mode) {
      Object.keys(lanes).forEach(function (cam) {
        var lane = lanes[cam];
        if (!lane) return;
        var html = "";
        if (mode === "before") {
          html = '<div class="seg c-' + cam + '" style="left:0;width:100%">' + names[cam] + "</div>";
        } else {
          plan.forEach(function (p) {
            var on = p.cam === cam;
            html += '<div class="seg c-' + cam + (on ? "" : " off") + '" style="left:' + p.s + "%;width:" + (p.e - p.s) + '%">' + (on ? names[cam].split(" · ")[1] : "") + "</div>";
          });
        }
        lane.innerHTML = html;
      });
      root.classList.toggle("after", mode === "after");
      btnBefore.classList.toggle("on", mode === "before");
      btnAfter.classList.toggle("on", mode === "after");
      statCuts.textContent = mode === "after" ? plan.length - 1 : "0";
      statTime.textContent = mode === "after" ? "8s" : "—";
      current = mode;
    }

    var current = "before";
    var timer = null;
    function analyzeThenApply() {
      render("before");
      statusEl.innerHTML = '<span class="spin"></span><span>Buddy analisando os microfones…</span>';
      clearTimeout(timer);
      timer = setTimeout(function () {
        render("after");
        statusEl.innerHTML = "<span>✅ Edição aplicada · backup criado: <b>Podcast_Ep12_backup</b></span>";
      }, 1900);
    }
    var seen = false;
    btnBefore.addEventListener("click", function () {
      seen = true;
      clearTimeout(timer);
      render("before");
      statusEl.textContent = "Antes: todas as câmeras inteiras, uma em cima da outra.";
    });
    btnAfter.addEventListener("click", function () { seen = true; analyzeThenApply(); });

    // Cabeça de reprodução + monitor do programa
    var t0 = performance.now(), DUR = 9000, lastCam = "";
    function frame(now) {
      var t = ((now - t0) % DUR) / DUR * 100;
      var isMobile = window.innerWidth <= 760;
      var off = isMobile ? 68 : 88, pad = isMobile ? 82 : 102;
      playhead.style.left = "calc(" + off + "px + (100% - " + pad + "px) * " + (t / 100).toFixed(4) + ")";
      var cam = "ana";
      if (current === "after") {
        for (var i = 0; i < plan.length; i++) if (t >= plan[i].s && t < plan[i].e) { cam = plan[i].cam; break; }
      }
      if (cam !== lastCam) {
        screen.style.background = screens[cam];
        screen.classList.toggle("wide", cam === "wide");
        who.textContent = names[cam];
        lastCam = cam;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    render("before");
    statusEl.textContent = "Antes: todas as câmeras inteiras, uma em cima da outra.";
    // Roda a demonstração sozinha quando aparece na tela
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting && !seen) { seen = true; setTimeout(analyzeThenApply, 900); }
      }, { threshold: 0.4 }).observe(root);
    }
  }

  /* ---------- Preços: mensal / anual ---------- */
  var billing = document.querySelector("[data-billing]");
  if (billing) {
    var PRICES = window.BUDDY_PRICES;
    var fmt = function (n) { return n.toLocaleString("pt-BR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
    var setBilling = function (cycle) {
      billing.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-cycle") === cycle); });
      document.querySelectorAll("[data-plan]").forEach(function (card) {
        var p = PRICES[card.getAttribute("data-plan")];
        if (!p) return;
        var amount = card.querySelector(".amount");
        var note = card.querySelector(".price-note");
        if (cycle === "monthly") {
          amount.textContent = fmt(p.monthly);
          note.textContent = "cobrado mensalmente";
        } else {
          amount.textContent = fmt(Math.round(p.yearly / 12 * 100) / 100);
          note.textContent = "R$ " + fmt(p.yearly) + " cobrado por ano";
        }
      });
    };
    billing.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { setBilling(b.getAttribute("data-cycle")); });
    });
    setBilling("yearly");
  }

  /* ---------- Funcionalidades: menu lateral ativo ---------- */
  var featLinks = document.querySelectorAll(".feat-nav a");
  if (featLinks.length && "IntersectionObserver" in window) {
    var map = {};
    featLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          featLinks.forEach(function (a) { a.classList.remove("active"); });
          var a = map[e.target.id];
          if (a) {
            a.classList.add("active");
            if (a.parentElement.scrollWidth > a.parentElement.clientWidth) {
              a.parentElement.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
            }
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".feature-detail[id]").forEach(function (s) { fio.observe(s); });
  }

  /* ---------- Formulário de novidades (placeholder) ---------- */
  document.querySelectorAll("[data-subscribe]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = f.querySelector("button");
      btn.textContent = "Anotado! 💙";
      btn.disabled = true;
    });
  });
})();
