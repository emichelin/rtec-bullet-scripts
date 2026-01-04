// ===========================================================================
// MODULE 2: NAVBAR DISPLAY
// ===========================================================================
(function() {
  'use strict';

  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      model: urlParams.get('model') || sessionStorage.getItem('bullet_model'),
      module: urlParams.get('module') || sessionStorage.getItem('bullet_module'),
      sensor: urlParams.get('sensor') || sessionStorage.getItem('bullet_sensor'),
      env: urlParams.get('env') || sessionStorage.getItem('bullet_env'),
      cond: urlParams.get('cond') || sessionStorage.getItem('bullet_cond'),
      opt: urlParams.get('opt') || sessionStorage.getItem('bullet_opt'),
      img: urlParams.get('img') || sessionStorage.getItem('bullet_img')
    };
  }

  function addParamsDisplay() {
    const navbar = document.querySelector('.navbar.bullet-navbar');

    if (!navbar) {
      setTimeout(addParamsDisplay, 100);
      return;
    }

    const oldDisplay = navbar.querySelector('.params-display');
    if (oldDisplay) oldDisplay.remove();

    const { model, module, sensor, env, cond, opt, img } = getParams();

    const paramsDisplay = document.createElement('div');
    paramsDisplay.className = 'params-display';

    if (!model && !module && !sensor && !env && !cond && !opt && !img) {
      paramsDisplay.textContent = 'Full Manual';
      paramsDisplay.classList.add('full-manual');
    } else {
      const params = [];
      if (model) params.push(model);
      if (module) params.push(module);
      if (sensor) params.push(sensor);
      if (env) params.push(env);
      if (cond) params.push(cond);
      if (opt) params.push(opt);
      if (img) params.push(img);
      paramsDisplay.textContent = params.join(' • ');
      paramsDisplay.classList.add('has-params');
    }

    navbar.appendChild(paramsDisplay);

    if (!navbar.querySelector('.configure-button')) {
      const configureButton = document.createElement('button');
      configureButton.className = 'configure-button';
      configureButton.textContent = 'Configure';
      navbar.appendChild(configureButton);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addParamsDisplay);
  } else {
    addParamsDisplay();
  }

  window.addEventListener('popstate', () => setTimeout(addParamsDisplay, 50));
  window.addEventListener('bulletParamsChanged', () => setTimeout(addParamsDisplay, 50));
})();
