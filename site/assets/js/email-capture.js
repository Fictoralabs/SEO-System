// Email capture stub.
// Ungated mode (current): kit links download immediately, no modal.
// To switch to gated mode later: set window.EMAIL_CAPTURE.enabled = true
// and provide an endpoint that accepts { email, kit, ep } via POST.

window.EMAIL_CAPTURE = {
  enabled: false,
  endpoint: '', // e.g. '/api/capture' once Azure Function is wired
};

(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function buildModal() {
    if (document.getElementById('ec-modal')) return;
    const html = `
      <div class="modal-backdrop" id="ec-modal" role="dialog" aria-modal="true" aria-labelledby="ec-title">
        <div class="modal">
          <h3 id="ec-title">Get the kit</h3>
          <p>Drop your email and we'll send the kit + the next episode when it drops.</p>
          <input type="email" id="ec-email" placeholder="you@domain.com" required />
          <div class="modal-actions">
            <button class="close" type="button" id="ec-cancel">Cancel</button>
            <button class="btn" type="button" id="ec-submit">Send me the kit</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function open(targetUrl) {
    buildModal();
    const backdrop = document.getElementById('ec-modal');
    const email = document.getElementById('ec-email');
    const cancel = document.getElementById('ec-cancel');
    const submit = document.getElementById('ec-submit');
    backdrop.classList.add('open');
    email.value = '';
    email.focus();

    const close = () => backdrop.classList.remove('open');
    cancel.onclick = close;
    backdrop.onclick = (e) => { if (e.target === backdrop) close(); };

    submit.onclick = async () => {
      const value = (email.value || '').trim();
      if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
        email.style.borderColor = '#ff5d5d';
        return;
      }
      const cfg = window.EMAIL_CAPTURE || {};
      if (cfg.endpoint) {
        try {
          await fetch(cfg.endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: value,
              kit: targetUrl,
              ep: document.body.dataset.ep || '',
              ts: new Date().toISOString(),
            }),
          });
        } catch (_) { /* swallow — don't block download */ }
      }
      close();
      window.location.href = targetUrl;
    };
  }

  onReady(function () {
    document.querySelectorAll('a[data-kit]').forEach((a) => {
      a.addEventListener('click', function (e) {
        const cfg = window.EMAIL_CAPTURE || {};
        if (!cfg.enabled) return; // ungated: pass through
        e.preventDefault();
        open(a.href);
      });
    });
  });
})();
