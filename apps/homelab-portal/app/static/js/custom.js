(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* === Animations d'entrée === */
  function animateTopBar() {
    const bar = document.getElementById('information-widgets');
    if (!bar) return;
    bar.style.cssText += 'opacity:0;transform:translateY(-12px);transition:opacity 0.55s ease,transform 0.55s ease;';
    setTimeout(() => { bar.style.opacity = ''; bar.style.transform = ''; }, 60);
  }

  function animateGroups() {
    document.querySelectorAll('.services-group').forEach((g, i) => {
      g.style.cssText += `opacity:0;transform:translateY(10px);transition:opacity 0.4s ease ${180 + i * 75}ms,transform 0.4s ease ${180 + i * 75}ms;`;
      setTimeout(() => { g.style.opacity = ''; g.style.transform = ''; }, 50);
    });
  }

  function animateCards() {
    document.querySelectorAll('.service-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      card.style.transition = `opacity 0.45s ease ${80 + i * 50}ms, transform 0.45s ease ${80 + i * 50}ms, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`;
      setTimeout(() => { card.style.opacity = ''; card.style.transform = ''; }, 50);
    });
  }

  /* === Ripple sur clic carte === */
  function addRipple() {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousedown', e => {
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const el = document.createElement('span');
        el.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;
          background:radial-gradient(circle,rgba(79,195,247,0.12) 0%,transparent 70%);
          top:${e.clientY - rect.top - size/2}px;left:${e.clientX - rect.left - size/2}px;
          pointer-events:none;transform:scale(0);transition:transform 0.55s ease,opacity 0.55s ease;
          opacity:1;z-index:0;`;
        card.appendChild(el);
        requestAnimationFrame(() => { el.style.transform = 'scale(1.6)'; el.style.opacity = '0'; });
        setTimeout(() => el.remove(), 650);
      });
    });
  }

  /* === Couleur dynamique barres resources CPU/RAM === */
  function updateResourceBars() {
    document.querySelectorAll('.information-widget-resource').forEach(widget => {
      const bar = widget.querySelector('.resource-usage > div');
      if (!bar) return;
      const pct = parseFloat(bar.style.width) || 0;
      if (pct > 85) {
        bar.style.background = 'linear-gradient(90deg,#ef5350,#c62828)';
      } else if (pct > 65) {
        bar.style.background = 'linear-gradient(90deg,#ffb74d,#fb8c00)';
      } else {
        bar.style.background = 'linear-gradient(90deg,#4fc3f7,#b39ddb)';
      }
    });
    setTimeout(updateResourceBars, 4000);
  }

  /* === Pulse sur les pills resource au refresh === */
  function pulseOnRefresh() {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.information-widget-resource').forEach(w => {
        w.style.transition = 'all 0.25s ease, box-shadow 0.25s ease';
        w.style.boxShadow = '0 0 8px rgba(79,195,247,0.2)';
        setTimeout(() => { w.style.boxShadow = ''; }, 600);
      });
    });
    const wrap = document.querySelector('.information-widget-resource .resource-usage');
    if (wrap) observer.observe(wrap, { attributes: true, childList: true, subtree: true });
  }

  /* === Tooltips valeurs longues === */
  function addTooltips() {
    document.querySelectorAll('.service-block .font-thin').forEach(el => {
      const v = el.textContent.trim();
      if (v.length > 7) el.closest('.service-block').title = v;
    });
  }

  /* === Observer pour contenu chargé dynamiquement (widgets API) === */
  function observeDynamic() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          const blocks = node.querySelectorAll ? node.querySelectorAll('.service-block') : [];
          blocks.forEach((b, i) => {
            b.style.opacity = '0'; b.style.transform = 'scale(0.93)';
            b.style.transition = `opacity 0.3s ease ${i*30}ms,transform 0.3s ease ${i*30}ms`;
            requestAnimationFrame(() => setTimeout(() => { b.style.opacity=''; b.style.transform=''; }, 10));
          });
        });
      });
    });
    const layout = document.getElementById('layout-groups');
    if (layout) observer.observe(layout, { childList: true, subtree: true });
  }

  /* === Init === */
  ready(() => {
    animateTopBar();
    animateGroups();
    setTimeout(() => {
      animateCards();
      addRipple();
      addTooltips();
      updateResourceBars();
      pulseOnRefresh();
    }, 180);
    observeDynamic();
  });
})();