/* PunisherGames — site interactions */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  // Header: background on scroll + mobile menu
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    header.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Legal pages: highlight current section in the table of contents
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          map[entry.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // Close the mobile TOC after picking a section
  var toc = document.querySelector(".toc");
  if (toc) {
    var mq = window.matchMedia("(max-width: 900px)");
    if (!mq.matches) toc.setAttribute("open", "");
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function () { if (mq.matches) toc.removeAttribute("open"); });
    });
  }

  // Static-hosting friendly forms: compose an email in the visitor's mail app
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var subjectPrefix = form.getAttribute("data-subject") || "Website enquiry";
      var topic = data.get("topic");
      var subject = subjectPrefix + (topic ? " — " + topic : "");
      var lines = [];
      data.forEach(function (value, key) {
        if (key === "confirm" || !String(value).trim()) return;
        var label = form.querySelector("[name='" + key + "']");
        var name = label && label.getAttribute("data-label") ? label.getAttribute("data-label") : key;
        lines.push(name + ": " + value);
      });

      var href = "mailto:" + form.getAttribute("data-mailto") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n\n"));
      window.location.href = href;

      var status = form.querySelector(".form-status");
      if (status) status.classList.add("show");
    });
  });
})();
