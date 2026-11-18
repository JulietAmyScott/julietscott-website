document.addEventListener("DOMContentLoaded", function () {
  var isHome =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html");

  // 1. Loading Screen
  var loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = isHome ? "none" : "flex";
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 1500);
    window.addEventListener("load", function () {
      loadingScreen.style.display = "none";
    });
  }

  // 2. Block right-click save on portfolio images & videos
  document.addEventListener("contextmenu", function (e) {
    if (
      e.target.closest(".thumb-frame") ||
      e.target.closest(".img-wrapper") ||
      e.target.tagName === "IMG" ||
      e.target.tagName === "VIDEO"
    ) {
      e.preventDefault();
    }
  });

  // 3. Hamburger Menu Toggle
  var menuLinks = document.querySelectorAll(".menu-link");
  var menuOverlay = document.querySelector(".menu-overlay");
  var menus = document.querySelectorAll(".menu");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (menuOverlay) menuOverlay.classList.toggle("open");
      menus.forEach(function (m) {
        m.classList.toggle("open");
      });
    });
  });

  if (menuOverlay) {
    menuOverlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menuOverlay.classList.remove("open");
        menus.forEach(function (m) {
          m.classList.remove("open");
        });
      });
    });
  }

  // 4. Case Study Close "X" Button
  var closeBtns = document.querySelectorAll(".close_x");
  closeBtns.forEach(function (btn) {
    btn.addEventListener("mouseenter", function () {
      var l1 = btn.querySelector(".close-line-1");
      var l2 = btn.querySelector(".close-line-2");
      if (l1) l1.classList.add("rotate-line-1");
      if (l2) l2.classList.add("rotate-line-2");
    });
    btn.addEventListener("mouseleave", function () {
      var l1 = btn.querySelector(".close-line-1");
      var l2 = btn.querySelector(".close-line-2");
      if (l1) l1.classList.remove("rotate-line-1");
      if (l2) l2.classList.remove("rotate-line-2");
    });
    btn.addEventListener("click", function () {
      window.location.href = "index.html#portfolio";
    });
  });

  // 5. Scroll Reveal Animations (Vanilla JS — No jQuery)
  var revealItems = document.querySelectorAll(
    ".bounce-up, .portfolio-modal img, .portfolio-modal video, .portfolio-modal article"
  );

  function checkReveal() {
    var triggerBottom = window.innerHeight * 0.95;
    revealItems.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("in-view");
      }
    });
  }

  window.addEventListener("scroll", checkReveal, { passive: true });
  window.addEventListener("resize", checkReveal, { passive: true });
  checkReveal();

  // 6. Floating Back-to-Portfolio & Scroll-to-Top Pill
  var pill = document.createElement("div");
  pill.className = "floating-nav-pill";
  pill.setAttribute("aria-label", "Quick page navigation");

  var html = "";
  if (!isHome) {
    html += '<a href="index.html#portfolio" title="Back to Portfolio">&larr; portfolio</a>';
    html += '<span class="pill-divider" id="pillDivider" style="display:none;"></span>';
  }
  html += '<button type="button" id="scrollTopBtn" style="display:none;" title="Back to Top">&uarr; top</button>';
  pill.innerHTML = html;
  document.body.appendChild(pill);

  var topBtn = document.getElementById("scrollTopBtn");
  var divider = document.getElementById("pillDivider");
  var footerBorder = document.querySelector(".site-footer .border") || document.querySelector(".site-footer");

  function toggleScrollBtn() {
    var scrolled = window.scrollY > 300;
    if (topBtn) topBtn.style.display = scrolled ? "inline-flex" : "none";
    if (divider) divider.style.display = scrolled && !isHome ? "inline-block" : "none";
    if (isHome) pill.style.display = scrolled ? "flex" : "none";

    // Stop pill 16px above the footer border line
    if (footerBorder) {
      var borderTop = footerBorder.getBoundingClientRect().top;
      var defaultBottom = 24; // matches bottom: 24px / 1.5rem
      var overlap = window.innerHeight - borderTop;
      if (overlap > 0) {
        pill.style.bottom = (overlap + 16) + "px";
      } else {
        pill.style.bottom = defaultBottom + "px";
      }
    }
  }

  window.addEventListener("scroll", toggleScrollBtn, { passive: true });
  window.addEventListener("resize", toggleScrollBtn, { passive: true });
  toggleScrollBtn();

  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});