// ─── Mode switching ───────────────────────────────────────

function setMode(mode) {
  // Swap body class so CSS --accent variable updates
  document.body.classList.remove('mode-exec', 'mode-eng');
  document.body.classList.add('mode-' + mode);

  // Update toggle buttons
  document.querySelectorAll('.mode-btn').forEach(function (btn) {
    var active = btn.dataset.mode === mode;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  // Show content for active mode, hide the other
  ['exec', 'eng'].forEach(function (m) {
    document.querySelectorAll('[data-' + m + ']').forEach(function (el) {
      el.classList.toggle('is-hidden', m !== mode);
    });
  });
}

document.querySelectorAll('.mode-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    setMode(btn.dataset.mode);
  });
});

// Initialise to exec (HTML already has data-eng elements hidden)
setMode('exec');

// ─── Scroll reveal ────────────────────────────────────────

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.reveal').forEach(function (el) {
  observer.observe(el);
});
