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

  /* ---------- Atualizações: notas de versão do GitHub ---------- */
  var relList = document.querySelector("[data-releases]");
  if (relList) {
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var inline = function (s) {
      return esc(s)
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    };
    var md = function (body) {
      var out = [], inList = false;
      (body || "").replace(/\r/g, "").split("\n").forEach(function (line) {
        var l = line.trim();
        if (!l) return;
        var li = l.match(/^[-*]\s+(.*)/);
        if (li) { if (!inList) { out.push('<ul class="rel-list">'); inList = true; } out.push("<li>" + inline(li[1]) + "</li>"); return; }
        if (inList) { out.push("</ul>"); inList = false; }
        var h = l.match(/^#{1,6}\s+(.*)/);
        out.push(h ? "<h4>" + inline(h[1]) + "</h4>" : "<p>" + inline(l) + "</p>");
      });
      if (inList) out.push("</ul>");
      return out.join("");
    };
    var fmtDate = function (iso) { return new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); };
    fetch("https://api.github.com/repos/joseulchak/buddy-editor-releases/releases?per_page=50", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (releases) {
        releases = releases.filter(function (r) { return !r.draft && !r.prerelease; });
        if (!releases.length) throw new Error("empty");
        relList.innerHTML = releases.map(function (r, i) {
          var v = (r.tag_name || "").replace(/^v/, "");
          var major = /^\d+\.0\.0$/.test(v);
          var body = md(r.body);
          return '<div class="release' + (major ? " major" : "") + '"><div class="card">' +
            '<div class="rel-head"><span class="rel-ver">v' + esc(v) + "</span>" +
            (i === 0 ? '<span class="chip chip-live">Atual</span>' : "") +
            (major && v !== "1.0.0" ? '<span class="chip chip-dev">Novo módulo</span>' : "") +
            '<span class="rel-date">' + fmtDate(r.published_at) + "</span></div>" +
            (body || '<p class="rel-empty">Melhorias internas e correções.</p>') +
            '<a class="rel-link" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">Ver no GitHub →</a>' +
            "</div></div>";
        }).join("");
        var st = document.querySelector("[data-releases-status]");
        if (st) st.textContent = "Carregado agora do GitHub · " + releases.length + " versões";
      })
      .catch(function () {
        var st = document.querySelector("[data-releases-status]");
        if (st) st.innerHTML = 'Não foi possível carregar do GitHub agora. Mostrando o resumo salvo. <a href="https://github.com/joseulchak/buddy-editor-releases/releases" target="_blank" rel="noopener">Ver todas no GitHub</a>';
      });
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

})();
