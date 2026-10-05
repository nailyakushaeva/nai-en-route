(function () {
  if (!window.matchMedia || !matchMedia("(hover: none)").matches) return;
  function strip(list, owner) {
    for (var i = list.length - 1; i >= 0; i--) {
      var r = list[i];
      try {
        if (r.selectorText && r.selectorText.indexOf(":hover") !== -1) owner.deleteRule(i);
        else if (r.cssRules && r.conditionText !== undefined && r.conditionText.indexOf("hover") === -1) strip(r.cssRules, r);
      } catch (e) {}
    }
  }
  function run() {
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sh = document.styleSheets[i], rules;
      try { rules = sh.cssRules; } catch (e) { continue; }
      if (rules) strip(rules, sh);
    }
  }
  var t;
  function schedule() { clearTimeout(t); t = setTimeout(run, 30); }
  run();
  document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
})();
