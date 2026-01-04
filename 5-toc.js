// ===========================================================================
// MODULE 5: TABLE OF CONTENTS (TOC)
// ===========================================================================
(function () {
  'use strict';

  const TOC_ID = 'static-toc';
  const HID_CLASS = 'toc-hidden';

  let tocContainer;
  let tocEntries = [];

  function buildOnce() {
    if (document.getElementById(TOC_ID)) return;
    tocContainer = document.createElement('div');
    tocContainer.id = TOC_ID;
    tocContainer.className = 'dynamic-toc';
    tocContainer.innerHTML = '<div class="toc-title">Contents</div>';
    document.body.appendChild(tocContainer);

    const sel = '.notion-h1, .notion-h2, .notion-h3, h1, h2, h3, details summary';
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.id) el.id = 'toc-' + i;
      const a = document.createElement('a');
      a.href = '#' + el.id;
      a.textContent = el.textContent.replace(/\{\{.*?\}\}|-o/g, '').trim();
      a.className = 'toc-item';
      tocContainer.appendChild(a);
      tocEntries.push({ linkEl: a, targetEl: el });
    });

    tocContainer.addEventListener('click', e => {
      if (!e.target.matches('.toc-item')) return;
      const target = document.getElementById(e.target.hash.slice(1));
      const details = target?.closest('details');
      if (details && !details.open) details.open = true;
    });
  }

  function refreshTOC() {
    tocEntries.forEach(({ linkEl, targetEl }) => {
      const visible = targetEl.offsetParent !== null &&
        window.getComputedStyle(targetEl).display !== 'none';
      linkEl.classList.toggle(HID_CLASS, !visible);
    });
    const hasVisible = [...tocEntries].some(e => !e.linkEl.classList.contains(HID_CLASS));
    tocContainer.style.display = hasVisible ? 'block' : 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buildOnce();
      refreshTOC();
    });
  } else {
    buildOnce();
    refreshTOC();
  }

  window.addEventListener('bulletParamsChanged', refreshTOC);
  window.addEventListener('filterChanged', refreshTOC);

  window.refreshTOC = refreshTOC;
}());
