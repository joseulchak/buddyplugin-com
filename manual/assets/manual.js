(function () {
  "use strict";

  var side = document.getElementById("docs-side");
  var menu = document.querySelector(".docs-menu");
  if (side && menu) {
    menu.addEventListener("click", function () {
      var open = side.classList.toggle("open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
    side.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        side.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      }
    });
  }

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".docs-toc a"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[decodeURIComponent(a.getAttribute("href").slice(1))] = a; });
    var visible = {};
    var headings = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var mark = function () {
      var current = null;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top < 140) { current = headings[i].id; }
      }
      if (!current && headings.length) { current = headings[0].id; }
      tocLinks.forEach(function (a) { a.classList.toggle("active", byId[current] === a); });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      mark();
    }, { rootMargin: "-80px 0px -60% 0px" });
    headings.forEach(function (h) { io.observe(h); });
    window.addEventListener("scroll", mark, { passive: true });
    mark();
  }

  var box = document.querySelector("[data-search]");
  var data = window.BUDDY_MANUAL_SEARCH || [];
  if (!box || !data.length) { return; }
  var input = box.querySelector("[data-search-input]");
  var results = box.querySelector("[data-search-results]");
  var activeIndex = -1;

  var fold = function (s) { return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var prepared = data.map(function (d) { return { d: d, p: fold(d.p), h: fold(d.h), x: fold(d.x) }; });

  var highlight = function (text, terms) {
    var folded = fold(text);
    var marks = [];
    terms.forEach(function (t) {
      var at = folded.indexOf(t);
      while (at !== -1) { marks.push([at, at + t.length]); at = folded.indexOf(t, at + t.length); }
    });
    if (!marks.length) { return esc(text); }
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = "", last = 0;
    marks.forEach(function (m) {
      if (m[0] < last) { return; }
      out += esc(text.slice(last, m[0])) + "<mark>" + esc(text.slice(m[0], m[1])) + "</mark>";
      last = m[1];
    });
    return out + esc(text.slice(last));
  };

  var snippet = function (text, terms) {
    var folded = fold(text);
    var at = -1;
    terms.forEach(function (t) { var i = folded.indexOf(t); if (i !== -1 && (at === -1 || i < at)) { at = i; } });
    if (at === -1) { return text.slice(0, 120); }
    var start = Math.max(0, at - 40);
    return (start > 0 ? "…" : "") + text.slice(start, start + 150) + "…";
  };

  var render = function () {
    var q = fold(input.value.trim());
    activeIndex = -1;
    if (q.length < 2) { results.hidden = true; results.innerHTML = ""; return; }
    var terms = q.split(/\s+/).filter(Boolean);
    var scored = [];
    prepared.forEach(function (e) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        var s = 0;
        if (e.p.indexOf(t) !== -1) { s += 6; }
        if (e.h.indexOf(t) !== -1) { s += 8; }
        if (e.x.indexOf(t) !== -1) { s += 2; }
        if (!s) { return; }
        score += s;
      }
      scored.push({ e: e, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    var top = scored.slice(0, 8);
    if (!top.length) {
      results.innerHTML = "<p>" + esc(results.getAttribute("data-empty")) + "</p>";
    } else {
      results.innerHTML = top.map(function (r) {
        var d = r.e.d;
        return '<a href="' + d.u + '"><small>' + esc(d.p) + "</small><b>" + highlight(d.h || d.p, terms) + "</b><span>" + highlight(snippet(d.x, terms), terms) + "</span></a>";
      }).join("");
    }
    results.hidden = false;
  };

  var move = function (delta) {
    var links = results.querySelectorAll("a");
    if (!links.length) { return; }
    activeIndex = (activeIndex + delta + links.length) % links.length;
    Array.prototype.forEach.call(links, function (a, i) { a.classList.toggle("active", i === activeIndex); });
    links[activeIndex].scrollIntoView({ block: "nearest" });
  };

  input.addEventListener("input", render);
  input.addEventListener("focus", render);
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") {
      var links = results.querySelectorAll("a");
      var target = links[activeIndex] || links[0];
      if (target) { window.location.href = target.getAttribute("href"); }
    } else if (e.key === "Escape") { results.hidden = true; input.blur(); }
  });
  document.addEventListener("click", function (e) { if (!box.contains(e.target)) { results.hidden = true; } });
  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      if (side && window.matchMedia("(max-width: 880px)").matches) { side.classList.add("open"); }
      input.focus();
    }
  });
})();
