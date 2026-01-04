// ===========================================================================
// MODULE 1: PARAMETER PERSISTENCE
// ===========================================================================
(function() {
  'use strict';

  console.log('🚀 Step 1: Parameter Persistence');

  const urlParams = new URLSearchParams(window.location.search);
  let model = urlParams.get('model') || sessionStorage.getItem('bullet_model');
  let module = urlParams.get('module') || sessionStorage.getItem('bullet_module');
  let sensor = urlParams.get('sensor') || sessionStorage.getItem('bullet_sensor');
  let env = urlParams.get('env') || sessionStorage.getItem('bullet_env');
  let cond = urlParams.get('cond') || sessionStorage.getItem('bullet_cond');
  let opt = urlParams.get('opt') || sessionStorage.getItem('bullet_opt');
  let other = urlParams.get('other') || sessionStorage.getItem('bullet_other');
  let range = urlParams.get('range') || sessionStorage.getItem('bullet_range');
  let img = urlParams.get('img') || sessionStorage.getItem('bullet_img');

  if (model) sessionStorage.setItem('bullet_model', model);
  if (module) sessionStorage.setItem('bullet_module', module);
  if (sensor) sessionStorage.setItem('bullet_sensor', sensor);
  if (env) sessionStorage.setItem('bullet_env', env);
  if (cond) sessionStorage.setItem('bullet_cond', cond);
  if (opt) sessionStorage.setItem('bullet_opt', opt);
  if (other) sessionStorage.setItem('bullet_other', other);
  if (range) sessionStorage.setItem('bullet_range', range);
  if (img) sessionStorage.setItem('bullet_img', img);

  if (model || module || sensor || env || cond || opt || other || range || img) {
    const newUrl = new URL(window.location);
    if (model) newUrl.searchParams.set('model', model);
    if (module) newUrl.searchParams.set('module', module);
    if (sensor) newUrl.searchParams.set('sensor', sensor);
    if (env) newUrl.searchParams.set('env', env);
    if (cond) newUrl.searchParams.set('cond', cond);
    if (opt) newUrl.searchParams.set('opt', opt);
    if (other) newUrl.searchParams.set('other', other);
    if (range) newUrl.searchParams.set('range', range);
    if (img) newUrl.searchParams.set('img', img);
    window.history.replaceState({}, '', newUrl.toString());
  }

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    const currentPath = window.location.pathname;
    const linkUrl = new URL(href, window.location.origin);
    const isHomepageLink = currentPath === '/' && linkUrl.pathname === '/';

    if (isHomepageLink) {
      e.preventDefault();
      e.stopPropagation();

      const newParams = new URLSearchParams(linkUrl.search);
      const model = newParams.get('model') || sessionStorage.getItem('bullet_model');
      const module = newParams.get('module') || sessionStorage.getItem('bullet_module');
      const sensor = newParams.get('sensor') || sessionStorage.getItem('bullet_sensor');
      const env = newParams.get('env') || sessionStorage.getItem('bullet_env');
      const cond = newParams.get('cond') || sessionStorage.getItem('bullet_cond');
      const opt = newParams.get('opt') || sessionStorage.getItem('bullet_opt');
      const other = newParams.get('other') || sessionStorage.getItem('bullet_other');
      const range = newParams.get('range') || sessionStorage.getItem('bullet_range');
      const img = newParams.get('img') || sessionStorage.getItem('bullet_img');

      if (model) sessionStorage.setItem('bullet_model', model);
      if (module) sessionStorage.setItem('bullet_module', module);
      if (sensor) sessionStorage.setItem('bullet_sensor', sensor);
      if (env) sessionStorage.setItem('bullet_env', env);
      if (cond) sessionStorage.setItem('bullet_cond', cond);
      if (opt) sessionStorage.setItem('bullet_opt', opt);
      if (other) sessionStorage.setItem('bullet_other', other);
      if (range) sessionStorage.setItem('bullet_range', range);
      if (img) sessionStorage.setItem('bullet_img', img);

      const newUrl = new URL(window.location);
      if (model) newUrl.searchParams.set('model', model);
      if (module) newUrl.searchParams.set('module', module);
      if (sensor) newUrl.searchParams.set('sensor', sensor);
      if (env) newUrl.searchParams.set('env', env);
      if (cond) newUrl.searchParams.set('cond', cond);
      if (opt) newUrl.searchParams.set('opt', opt);
      if (other) newUrl.searchParams.set('other', other);
      if (range) newUrl.searchParams.set('range', range);
      if (img) newUrl.searchParams.set('img', img);

      window.history.pushState({}, '', newUrl.toString());
      window.dispatchEvent(new Event('bulletParamsChanged'));
      return;
    }

    if (linkUrl.origin === window.location.origin && !href.startsWith('#') && !href.startsWith('javascript:')) {
      e.preventDefault();
      e.stopPropagation();

      const currentModel = sessionStorage.getItem('bullet_model');
      const currentModule = sessionStorage.getItem('bullet_module');
      const currentSensor = sessionStorage.getItem('bullet_sensor');
      const currentEnv = sessionStorage.getItem('bullet_env');
      const currentCond = sessionStorage.getItem('bullet_cond');
      const currentOpt = sessionStorage.getItem('bullet_opt');
      const currentOther = sessionStorage.getItem('bullet_other');
      const currentRange = sessionStorage.getItem('bullet_range');
      const currentImg = sessionStorage.getItem('bullet_img');

      const linkParams = new URLSearchParams(linkUrl.search);
      const linkModel = linkParams.get('model');
      const linkModule = linkParams.get('module');
      const linkSensor = linkParams.get('sensor');
      const linkEnv = linkParams.get('env');
      const linkCond = linkParams.get('cond');
      const linkOpt = linkParams.get('opt');
      const linkOther = linkParams.get('other');
      const linkRange = linkParams.get('range');
      const linkImg = linkParams.get('img');

      const finalModel = linkModel || currentModel;
      const finalModule = linkModule || currentModule;
      const finalSensor = linkSensor || currentSensor;
      const finalEnv = linkEnv || currentEnv;
      const finalCond = linkCond || currentCond;
      const finalOpt = linkOpt || currentOpt;
      const finalOther = linkOther || currentOther;
      const finalRange = linkRange || currentRange;
      const finalImg = linkImg || currentImg;

      if (finalModel) sessionStorage.setItem('bullet_model', finalModel);
      if (finalModule) sessionStorage.setItem('bullet_module', finalModule);
      if (finalSensor) sessionStorage.setItem('bullet_sensor', finalSensor);
      if (finalEnv) sessionStorage.setItem('bullet_env', finalEnv);
      if (finalCond) sessionStorage.setItem('bullet_cond', finalCond);
      if (finalOpt) sessionStorage.setItem('bullet_opt', finalOpt);
      if (finalOther) sessionStorage.setItem('bullet_other', finalOther);
      if (finalRange) sessionStorage.setItem('bullet_range', finalRange);
      if (finalImg) sessionStorage.setItem('bullet_img', finalImg);

      const finalUrl = new URL(linkUrl.pathname, window.location.origin);
      if (finalModel) finalUrl.searchParams.set('model', finalModel);
      if (finalModule) finalUrl.searchParams.set('module', finalModule);
      if (finalSensor) finalUrl.searchParams.set('sensor', finalSensor);
      if (finalEnv) finalUrl.searchParams.set('env', finalEnv);
      if (finalCond) finalUrl.searchParams.set('cond', finalCond);
      if (finalOpt) finalUrl.searchParams.set('opt', finalOpt);
      if (finalOther) finalUrl.searchParams.set('other', finalOther);
      if (finalRange) finalUrl.searchParams.set('range', finalRange);
      if (finalImg) finalUrl.searchParams.set('img', finalImg);
      if (linkUrl.hash) finalUrl.hash = linkUrl.hash;

      window.location.href = finalUrl.toString();
    }
  }, true);

  console.log('✅ Parameter persistence initialized');
})();
