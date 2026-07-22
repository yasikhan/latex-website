/*
 * theme.js — light/dark toggle for latex.css
 *
 * latex.css reads dark mode from the `.latex-dark` class on <body>.
 * We persist the visitor's choice in localStorage under "theme".
 *
 * NOTE: a tiny inline script in each page's <head> applies the saved class
 * *before* first paint (to avoid a light-mode flash). This file just wires up
 * the toggle button and keeps the label in sync.
 */
(function () {
  var STORAGE_KEY = "theme";

  function currentTheme() {
    return document.body.classList.contains("latex-dark") ? "dark" : "light";
  }

  function apply(theme) {
    document.body.classList.toggle("latex-dark", theme === "dark");
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    updateButtons(theme);
  }

  function updateButtons(theme) {
    var label = theme === "dark" ? "☀ Light" : "☾ Dark";
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.textContent = label;
      btn.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateButtons(currentTheme());
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(currentTheme() === "dark" ? "light" : "dark");
      });
    });
  });
})();
