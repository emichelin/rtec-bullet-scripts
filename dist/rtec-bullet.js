// ============================================================================
  // CONFIGURATION DATA FOR NEW MODAL
  // ============================================================================

  const MODAL_DATA = {
    instruments: {
      up2: {
        name: 'UP-2000',
        modules: ['sigm',
          'delt']
      },
      up3: {
        name: 'UP-3000',
        modules: ['lamb',
          'sigm',
          'delt']
      },
      up5: {
        name: 'UP-5000',
        modules: ['lamb',
          'sigm',
          'delt']
      },
      mft2: {
        name: 'MFT-2000',
        modules: ['stat',
          'rota',
          'reci',
          'lamb',
          'sigm',
          'delt']
      },
      mft5: {
        name: 'MFT-5000',
        modules: ['stat',
          'rota',
          'reci',
          'bor',
          'scra',
          'urota',
          'vcoil',
          'mtm',
          'lamb',
          'sigm',
          'delt']
      },
      smt2: {
        name: 'SMT-2000',
        modules: ['stat']
      },
      smt5: {
        name: 'SMT-5000',
        modules: ['stat']
      },
      ust2: {
        name: 'UST-2',
        modules: ['stat']
      },
      fftm: {
        name: 'FFT-M',
        modules: ['vcoil']
      },
      fft1: {
        name: 'FFT-1',
        modules: ['vcoil']
      },
      fft2: {
        name: 'FFT-2',
        modules: ['vcoil']
      },
      aj1: {
        name: 'AJ-1000',
        modules: ['none']
      },
      trt1: {
        name: 'TRT-1000',
        modules: ['none']
      },
      mvt2: {
        name: 'MVT-2',
        modules: ['none']
      }
    },
    modules: {
      stat: {
        name: 'Stationary',
        conditions: ['liq',
          'dry'],
        sensors: ['ull',
          'll',
          'ml',
          'hl',
          'FzFx',
          'Fz',
          'nano',
          'micro',
          'stch']
      },
      rota: {
        name: 'Rotary',
        conditions: ['brk',
          'liq',
          'heat',
          'cool',
          'humid',
          'ev',
          'dry'],
        sensors: ['ull',
          'll',
          'ml',
          'hl',
          'FzFx',
          'FzTq']
      },
      reci: {
        name: 'Reciprocating',
        conditions: ['srv',
          'liq',
          'heat',
          'cool',
          'humid',
          'ev',
          'tcorr',
          'dry'],
        sensors: ['ull',
          'll',
          'ml',
          'hl',
          'FzFx',
          'Fzp',
          'Fz']
      },
      bor: {
        name: 'Block-On-Ring',
        conditions: ['cut',
          'grs',
          'liq',
          'heat',
          'cool',
          'humid',
          'ev',
          'dry'],
        sensors: ['ml',
          'hl',
          'FzFx']
      },
      scra: {
        name: 'Scratch',
        conditions: ['dry'],
        sensors: ['ml',
          'hl']
      },
      urota: {
        name: 'Upper Rotary',
        conditions: ['tap',
          '4ball',
          'heat',
          'cool',
          'ev',
          'dry'],
        sensors: ['none']
      },
      vcoil: {
        name: 'VoiceCoil',
        conditions: ['heat',
          'ev',
          'dry'],
        sensors: ['none']
      },
      mtm: {
        name: 'Mini Traction',
        conditions: ['liq',
          'heat',
          'ev',
          'dry'],
        sensors: ['ml']
      },
      lamb: {
        name: 'Lambda Imaging',
        conditions: ['bfdf',
          'cfc',
          'wli'],
        sensors: ['none']
      },
      sigm: {
        name: 'Sigma Imaging',
        conditions: ['bfdf',
          'wli'],
        sensors: ['none']
      },
      delt: {
        name: 'Delta Imaging',
        conditions: ['bfdf'],
        sensors: ['none']
      },
      none: {
        name: 'None',
        conditions: [],
        sensors: []
      }
    },
    conditions: {
      srv: 'SRV',
      tap: 'Tapping Torque',
      '4ball': '4-ball',
      brk: 'Brake',
      cut: 'Cutting',
      grs: 'Grease Test',
      liq: 'Liquid',
      heat: 'Heated',
      cool: 'Cooled',
      humid: 'Humidity',
      ev: 'Electrified',
      tcorr: 'Tribocorrosion',
      dry: 'Dry',
      bfdf: 'Bright Field Dark Field',
      cfc: 'Confocal',
      wli: 'White Light'
    },
    sensors: {
      ull: 'Ultra Low-Load Argon',
      ll: 'Low Load Argon',
      ml: 'Medium Load Argon',
      hl: 'High Load Argon',
      FzFx: 'Fz+Fx',
      Fzp: 'Fz+piezo',
      Fz: 'Fz',
      FzTq: 'Fz+Torque',
      nano: 'Nano-Indentation',
      micro: 'Micro-Indentation',
      stch: 'Scratch',
      none: 'None'
    },
    sensorCodes: {
      ull: {
        sensor: '2d',
        range: 'ull'
      },
      ll: {
        sensor: '2d',
        range: 'll'
      },
      ml: {
        sensor: '2d',
        range: 'ml'
      },
      hl: {
        sensor: '2d',
        range: 'hl'
      },
      FzFx: {
        sensor: '1d1d',
        range: null
      },
      Fzp: {
        sensor: 'fzpz',
        range: null
      },
      Fz: {
        sensor: 'fz',
        range: null
      },
      FzTq: {
        sensor: 'fztq',
        range: null
      },
      nano: {
        sensor: 'nano',
        range: null
      },
      micro: {
        sensor: 'micro',
        range: null
      },
      stch: {
        sensor: 'stch',
        range: null
      },
      none: {
        sensor: null,
        range: null
      }
    },
    condition2: {
      lvdt: 'LVDT',
      liq: 'Liquid',
      ev: 'Electrified',
      heat: 'Heated',
      cool: 'Cooled',
      humid: 'Humidity'
    }
  };

  // ============================================================================
  // STEP 1: PARAMETER PERSISTENCE
  // ============================================================================
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
    },
      true);

    console.log('✅ Parameter persistence initialized');
  })();

  // ============================================================================
  // STEP 2: NAVBAR DISPLAY WITH CONFIGURE BUTTON
  // ============================================================================
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

      const {
        model,
        module,
        sensor,
        env,
        cond,
        opt,
        img
      } = getParams();

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

  // ============================================================================
  // STEP 3: NEW CONFIGURE MODAL WITH IMAGING CHECKBOXES
  // ============================================================================
  (function() {
    'use strict';

    let modalState = {
      instrument: null,
      module: null,
      condition1: null,
      sensor: null,
      condition2: [],
      imaging: null
    };

    // === UTILITY FUNCTIONS ===

    function showSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section && !section.classList.contains('visible')) {
        section.style.display = 'inline';
        setTimeout(() => section.classList.add('visible'), 10);
      }
    }

    function hideSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.classList.remove('visible');
        setTimeout(() => section.style.display = 'none', 300);
      }
    }

    function resetTrigger(selectId) {
      const trigger = document.querySelector(`#${selectId} .select-trigger`);
      if (trigger) {
        const placeholder = trigger.dataset.placeholder;
        trigger.textContent = placeholder;
        trigger.classList.remove('has-value');
      }
      const options = document.querySelectorAll(`#${selectId} .select-option`);
      options.forEach(opt => opt.classList.remove('selected'));
    }

    function populateDropdown(selectId, options) {
      const dropdown = document.querySelector(`#${selectId} .select-dropdown`);
      if (!dropdown) return;

      dropdown.innerHTML = '';
      Object.entries(options).forEach(([value, label]) => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.dataset.value = value;
        option.textContent = label;
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          handleSelect(selectId, value, label);
        });
        dropdown.appendChild(option);
      });
    }

    function handleSelect(selectId, value, label) {
      const trigger = document.querySelector(`#${selectId} .select-trigger`);
      const dropdown = document.querySelector(`#${selectId} .select-dropdown`);

      trigger.textContent = label;
      trigger.classList.add('has-value');
      dropdown.classList.remove('active');
      trigger.classList.remove('active');

      document.querySelectorAll(`#${selectId} .select-option`).forEach(opt => opt.classList.remove('selected'));
      document.querySelector(`#${selectId} .select-option[data-value="${value}"]`)?.classList.add('selected');

      if (selectId === 'selectInstrument') {
        handleInstrumentSelect(value);
      } else if (selectId === 'selectModule') {
        handleModuleSelect(value);
      } else if (selectId === 'selectCondition1') {
        handleCondition1Select(value);
      } else if (selectId === 'selectSensor') {
        handleSensorSelect(value);
      }
    }

    // === SELECTION HANDLERS ===

    function handleInstrumentSelect(value) {
      modalState.instrument = value;
      modalState.module = null;
      modalState.condition1 = null;
      modalState.sensor = null;
      modalState.condition2 = [];
      modalState.imaging = null;

      ['section-module',
        'section-condition1',
        'section-sensor'].forEach(hideSection);
      document.getElementById('section-checkboxes-wrapper').style.display = 'none';

      resetTrigger('selectModule');
      resetTrigger('selectCondition1');
      resetTrigger('selectSensor');

      const instrumentData = MODAL_DATA.instruments[value];

      if (instrumentData.modules.includes('none')) {
        return;
      }

      const availableModules = {};
      instrumentData.modules.forEach(mod => {
        availableModules[mod] = MODAL_DATA.modules[mod].name;
      });

      populateDropdown('selectModule', availableModules);
      showSection('section-module');
    }

    function handleModuleSelect(value) {
      modalState.module = value;
      modalState.condition1 = null;
      modalState.sensor = null;
      modalState.condition2 = [];
      modalState.imaging = null;

      ['section-condition1',
        'section-sensor'].forEach(hideSection);
      document.getElementById('section-checkboxes-wrapper').style.display = 'none';

      resetTrigger('selectCondition1');
      resetTrigger('selectSensor');

      const moduleData = MODAL_DATA.modules[value];

      const availableConditions = {};
      moduleData.conditions.forEach(cond => {
        availableConditions[cond] = MODAL_DATA.conditions[cond];
      });

      populateDropdown('selectCondition1', availableConditions);
      showSection('section-condition1');
    }

    function handleCondition1Select(value) {
      modalState.condition1 = value;
      modalState.sensor = null;
      modalState.condition2 = [];
      modalState.imaging = null;

      ['section-sensor'].forEach(hideSection);
      document.getElementById('section-checkboxes-wrapper').style.display = 'none';

      resetTrigger('selectSensor');

      const moduleData = MODAL_DATA.modules[modalState.module];

      if (moduleData.sensors.includes('none')) {
        updateCheckboxes();
        document.getElementById('section-checkboxes-wrapper').style.display = 'block';
        updateImagingSection();
        return;
      }

      const availableSensors = {};
      moduleData.sensors.forEach(sens => {
        availableSensors[sens] = MODAL_DATA.sensors[sens];
      });

      populateDropdown('selectSensor', availableSensors);
      showSection('section-sensor');
    }

    function handleSensorSelect(value) {
      modalState.sensor = value;
      modalState.condition2 = [];
      modalState.imaging = null;

      updateCheckboxes();
      document.getElementById('section-checkboxes-wrapper').style.display = 'block';
      updateImagingSection();
    }

    // === IMAGING SECTION ===

    function updateImagingSection() {
      const imagingSubsection = document.getElementById('imaging-subsection');
      const imagingGrid = document.getElementById('imagingGrid');

      if (!modalState.instrument) {
        imagingSubsection.style.display = 'none';
        return;
      }

      const instrumentData = MODAL_DATA.instruments[modalState.instrument];

      const imagingOptions = [];
      if (instrumentData.modules.includes('lamb')) {
        imagingOptions.push({
          value: 'lamb', label: 'Lambda Imaging Head'
        });
      }
      if (instrumentData.modules.includes('sigm')) {
        imagingOptions.push({
          value: 'sigm', label: 'Sigma Imaging Head'
        });
      }
      if (instrumentData.modules.includes('delt')) {
        imagingOptions.push({
          value: 'delt', label: 'Delta Imaging Head'
        });
      }

      if (imagingOptions.length > 0) {
        imagingGrid.innerHTML = '';
        imagingOptions.forEach(({
          value, label
        }) => {
          const item = document.createElement('div');
          item.className = 'checkbox-item';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `img_${value}`;
          checkbox.value = value;
          checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
              document.querySelectorAll('#imagingGrid input[type="checkbox"]').forEach(cb => {
                if (cb !== checkbox) cb.checked = false;
              });
              modalState.imaging = value;
            } else {
              modalState.imaging = null;
            }
          });

          const labelEl = document.createElement('label');
          labelEl.htmlFor = `img_${value}`;
          labelEl.textContent = label;

          item.appendChild(checkbox);
          item.appendChild(labelEl);
          imagingGrid.appendChild(item);
        });
        imagingSubsection.style.display = 'block';
      } else {
        imagingSubsection.style.display = 'none';
      }
    }

    // === CONDITION2 CHECKBOXES ===

    function updateCheckboxes() {
      const grid = document.getElementById('checkboxGrid');
      grid.innerHTML = '';

      const options = {
        ...MODAL_DATA.condition2
      };

      delete options[modalState.condition1];

      if (modalState.module !== 'reci') {
        delete options.lvdt;
      }

      Object.entries(options).forEach(([value, label]) => {
        const item = document.createElement('div');
        item.className = 'checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `cond2_${value}`;
        checkbox.value = value;
        checkbox.addEventListener('change', (e) => {
          if (e.target.checked) {
            if (!modalState.condition2.includes(value)) {
              modalState.condition2.push(value);
            }
          } else {
            modalState.condition2 = modalState.condition2.filter(v => v !== value);
          }
        });

        const labelEl = document.createElement('label');
        labelEl.htmlFor = `cond2_${value}`;
        labelEl.textContent = label;

        item.appendChild(checkbox);
        item.appendChild(labelEl);
        grid.appendChild(item);
      });
    }

    // === MODAL INITIALIZATION ===

    function initConfigureModal() {
      const navbar = document.querySelector('.navbar.bullet-navbar');
      const configureButton = navbar?.querySelector('.configure-button');

      if (!configureButton) {
        setTimeout(initConfigureModal, 100);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'configure-modal';
      modal.id = 'configModal';
      modal.innerHTML = `
      <button class="configure-close-button">×</button>
      <h3 class="configure-modal-title">Configure your manual</h3>

      <div class="configure-form-paragraph">
      My instrument is a
      <div class="custom-select" id="selectInstrument">
      <div class="select-trigger" data-placeholder="choose instrument">choose instrument</div>
      <div class="select-dropdown">
      <div class="select-option" data-value="up2">UP-2000</div>
      <div class="select-option" data-value="up3">UP-3000</div>
      <div class="select-option" data-value="up5">UP-5000</div>
      <div class="select-option" data-value="mft2">MFT-2000</div>
      <div class="select-option" data-value="mft5">MFT-5000</div>
      <div class="select-option" data-value="smt2">SMT-2000</div>
      <div class="select-option" data-value="smt5">SMT-5000</div>
      <div class="select-option" data-value="ust2">UST-2</div>
      <div class="select-option" data-value="fftm">FFT-M</div>
      <div class="select-option" data-value="fft1">FFT-1</div>
      <div class="select-option" data-value="fft2">FFT-2</div>
      <div class="select-option" data-value="aj1">AJ-1000</div>
      <div class="select-option" data-value="trt1">TRT-1000</div>
      <div class="select-option" data-value="mvt2">MVT-2</div>
      </div>
      </div>.

      <span class="form-section" id="section-module">
      <span class="form-line-break"></span>I would like to use my
      <div class="custom-select" id="selectModule">
      <div class="select-trigger" data-placeholder="module">module</div>
      <div class="select-dropdown"></div>
      </div> module
      </span>

      <span class="form-section" id="section-condition1">
      to conduct a
      <div class="custom-select" id="selectCondition1">
      <div class="select-trigger" data-placeholder="test type">test type</div>
      <div class="select-dropdown"></div>
      </div> test.
      </span>

      <span class="form-section" id="section-sensor">
      <span class="form-line-break"></span>I will be using a
      <div class="custom-select" id="selectSensor">
      <div class="select-trigger" data-placeholder="sensor">sensor</div>
      <div class="select-dropdown"></div>
      </div> sensor.
      </span>
      </div>

      <div id="section-checkboxes-wrapper" style="display: none;">
      <div class="configure-form-paragraph" style="margin-top: 20px; margin-bottom: 5px;">
      I am interested in the following additional conditions:
      </div>

      <div class="checkboxes-section">
      <div class="checkbox-subtitle">Conditions</div>
      <div class="checkbox-grid" id="checkboxGrid"></div>

      <div id="imaging-subsection" style="display: none;">
      <div class="checkbox-subtitle" style="margin-top: 20px;">Imaging</div>
      <div class="checkbox-grid" id="imagingGrid"></div>
      </div>
      </div>
      </div>

      <div class="configure-actions">
      <button class="configure-reset-button">Reset All</button>
      <button class="configure-apply-button">Apply Configuration</button>
      </div>
      `;

      const navbarParent = navbar.parentElement;
      navbarParent.insertBefore(modal, navbar.nextSibling);

      initCustomSelects(modal);
      setupButtons(modal);

      configureButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.toggle('active');

        if (modal.classList.contains('active')) {
          applyModalStateToUI();
          resyncCheckboxes();
        }
      });

      modal.querySelector('.configure-close-button').addEventListener('click',
        () => {
          modal.classList.remove('active');
        });

      document.addEventListener('click',
        (e) => {
          if (!modal.contains(e.target) && !configureButton.contains(e.target)) {
            if (modal.classList.contains('active')) {
              modal.classList.remove('active');
            }
          }
        });

      loadConfigFromURL();

      window.addEventListener('popstate',
        () => {
          const urlParams = new URLSearchParams(window.location.search);
          modalState.instrument = urlParams.get('model') || sessionStorage.getItem('bullet_model');
          modalState.module = urlParams.get('module') || sessionStorage.getItem('bullet_module');
          modalState.sensor = urlParams.get('range') || sessionStorage.getItem('bullet_range');
          modalState.condition1 = urlParams.get('env') || sessionStorage.getItem('bullet_env');
          const cond = urlParams.get('cond') || sessionStorage.getItem('bullet_cond');
          modalState.condition2 = cond ? cond.split(','): [];
          modalState.imaging = urlParams.get('img') || sessionStorage.getItem('bullet_img');

          applyModalStateToUI();
          resyncCheckboxes();
        });
    }

    // === UTILITY: ROBUST OPTION SELECTION ===

    function selectOption(selectId,
      value) {
      const trigger = document.querySelector(`#${selectId} .select-trigger`);
      const optionEl = document.querySelector(`#${selectId} .select-option[data-value="${value}"]`);
      if (!trigger || !optionEl) return null;

      trigger.textContent = optionEl.textContent;
      trigger.classList.add('has-value');

      optionEl.closest('.select-dropdown')
      .querySelectorAll('.select-option')
      .forEach(opt => opt.classList.remove('selected'));
      optionEl.classList.add('selected');
      return optionEl.textContent;
    }

    function waitThenSelect(selectId, value, callback, retries = 20) {
      const result = selectOption(selectId, value);
      if (result !== null) {
        if (callback) callback(selectId, value, result);
        return;
      }
      if (retries <= 0) return;
      requestAnimationFrame(() => waitThenSelect(selectId, value, callback, retries - 1));
    }

    function applyModalStateToUI() {
      if (modalState.instrument) waitThenSelect('selectInstrument', modalState.instrument);
      if (modalState.module) waitThenSelect('selectModule', modalState.module);
      if (modalState.condition1) waitThenSelect('selectCondition1', modalState.condition1);
      if (modalState.sensor) waitThenSelect('selectSensor', modalState.sensor);
    }

    function resyncCheckboxes() {
      document.querySelectorAll('#checkboxGrid input[type="checkbox"]')
      .forEach(cb => cb.checked = modalState.condition2.includes(cb.value));
      document.querySelectorAll('#imagingGrid input[type="checkbox"]')
      .forEach(cb => cb.checked = modalState.imaging === cb.value);
    }

    function loadConfigFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const model = urlParams.get('model') || sessionStorage.getItem('bullet_model');
      const module = urlParams.get('module') || sessionStorage.getItem('bullet_module');
      const range = urlParams.get('range') || sessionStorage.getItem('bullet_range');
      const env = urlParams.get('env') || sessionStorage.getItem('bullet_env');
      const cond = urlParams.get('cond') || sessionStorage.getItem('bullet_cond');
      const img = urlParams.get('img') || sessionStorage.getItem('bullet_img');

      if (!model) return;

      waitThenSelect('selectInstrument', model, (id, val, label) => {
        handleSelect(id, val, label);

        if (module) {
          waitThenSelect('selectModule', module, (id2, val2, label2) => {
            handleSelect(id2, val2, label2);

            if (env) {
              waitThenSelect('selectCondition1', env, (id3, val3, label3) => {
                handleSelect(id3, val3, label3);

                if (range) {
                  waitThenSelect('selectSensor', range, (id4, val4, label4) => {
                    handleSelect(id4, val4, label4);

                    if (cond) {
                      requestAnimationFrame(() => {
                        const conditions = cond.split(',');
                        conditions.forEach(c => {
                          const checkbox = document.querySelector(`#cond2_${c}`);
                          if (checkbox) {
                            checkbox.checked = true;
                            if (!modalState.condition2.includes(c)) {
                              modalState.condition2.push(c);
                            }
                          }
                        });
                      });
                    }

                    if (img) {
                      requestAnimationFrame(() => {
                        const imgCheckbox = document.querySelector(`#img_${img}`);
                        if (imgCheckbox) {
                          imgCheckbox.checked = true;
                          modalState.imaging = img;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }

    function initCustomSelects(modal) {
      const selects = modal.querySelectorAll('.custom-select');

      selects.forEach((selectEl) => {
        const trigger = selectEl.querySelector('.select-trigger');
        const dropdown = selectEl.querySelector('.select-dropdown');

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();

          document.querySelectorAll('.select-dropdown.active').forEach(dd => {
            if (dd !== dropdown) {
              dd.classList.remove('active');
              dd.previousElementSibling.classList.remove('active');
            }
          });

          dropdown.classList.toggle('active');
          trigger.classList.toggle('active');
        });
      });

      document.querySelectorAll('#selectInstrument .select-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          handleSelect('selectInstrument',
            option.dataset.value,
            option.textContent);
        });
      });

      document.addEventListener('click', () => {
        document.querySelectorAll('.select-dropdown.active').forEach(dd => {
          dd.classList.remove('active');
          dd.previousElementSibling.classList.remove('active');
        });
      });
    }

    function setupButtons(modal) {
      const applyButton = modal.querySelector('.configure-apply-button');
      applyButton.addEventListener('click', () => {
        const params = [];
        if (modalState.instrument) params.push(`model=${modalState.instrument}`);
        if (modalState.module) params.push(`module=${modalState.module}`);

        if (modalState.sensor) {
          const sensorConfig = MODAL_DATA.sensorCodes[modalState.sensor];
          if (sensorConfig.sensor) {
            params.push(`sensor=${sensorConfig.sensor}`);
          }
          if (sensorConfig.range) {
            params.push(`range=${sensorConfig.range}`);
          }
        }

        if (modalState.condition1) params.push(`env=${modalState.condition1}`);
        if (modalState.condition2.length > 0) params.push(`cond=${modalState.condition2.join(',')}`);
        if (modalState.imaging) params.push(`img=${modalState.imaging}`);

        const url = params.length > 0 ? `?${params.join('&')}`: '';

        if (modalState.instrument) sessionStorage.setItem('bullet_model', modalState.instrument);
        if (modalState.module) sessionStorage.setItem('bullet_module', modalState.module);
        if (modalState.sensor) {
          const sensorConfig = MODAL_DATA.sensorCodes[modalState.sensor];
          if (sensorConfig.sensor) sessionStorage.setItem('bullet_sensor', sensorConfig.sensor);
          if (sensorConfig.range) sessionStorage.setItem('bullet_range', sensorConfig.range);
        }
        if (modalState.condition1) sessionStorage.setItem('bullet_env', modalState.condition1);
        if (modalState.condition2.length > 0) sessionStorage.setItem('bullet_cond', modalState.condition2.join(','));
        if (modalState.imaging) sessionStorage.setItem('bullet_img', modalState.imaging);

        window.location.href = window.location.pathname + url;
      });

      const resetButton = modal.querySelector('.configure-reset-button');
      resetButton.addEventListener('click',
        () => {
          modalState = {
            instrument: null,
            module: null,
            condition1: null,
            sensor: null,
            condition2: [],
            imaging: null
          };
          document.querySelectorAll('.select-trigger').forEach(trigger => {
            trigger.textContent = trigger.dataset.placeholder;
            trigger.classList.remove('has-value');
          });
          document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
          ['section-module',
            'section-condition1',
            'section-sensor'].forEach(hideSection);
          document.getElementById('section-checkboxes-wrapper').style.display = 'none';

          ['bullet_model',
            'bullet_module',
            'bullet_sensor',
            'bullet_env',
            'bullet_cond',
            'bullet_opt',
            'bullet_range',
            'bullet_img'].forEach(key => {
              sessionStorage.removeItem(key);
            });
        });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initConfigureModal);
    } else {
      initConfigureModal();
    }
  })();

  // ============================================================================
  // STEP 4: CONDITIONAL FILTERING (CORRECTED)
  // ============================================================================
  (function() {
    'use strict';

    const getParams = () => {
      const p = {};
      new URLSearchParams(location.search).forEach((v, k) => (p[k] = v));
      ['model',
        'module',
        'sensor',
        'env',
        'cond',
        'opt',
        'other',
        'img'].forEach(k => {
          const v = sessionStorage.getItem(`bullet_${k}`);
          if (v && !p[k]) p[k] = v;
        });
      return p;
    };

    const hasVal = (params,
      val) => Object.values(params).includes(val);

    const evalCondition = (() => {
      const cache = new Map();
      return (raw, params) => {
        const key = raw + JSON.stringify(params);
        if (cache.has(key)) return cache.get(key);

        let out = true;
        try {
          const isGlobalNot = /^\{\{\s*!\s*/.test(raw);
          let c = raw.replace(/^\{\{\s*if(?:not)?\s+/i, '').replace(/^\{\{\s*!\s*/, '').replace(/\s*\}\}$/, '').trim();
          if (!c) return true;

          const simpleOrWithParens = c.match(/^\(([^)]+)\)$/);
          if (simpleOrWithParens && !simpleOrWithParens[1].includes('&')) {
            c = simpleOrWithParens[1].trim();
          }

          if (/(?![^(]*\)),/.test(c)) {
            const parts = [];
            let depth = 0,
            current = '';
            for (let i = 0; i < c.length; i++) {
              const ch = c[i];
              if (ch === '(') depth++;
              else if (ch === ')') depth--;
              else if (ch === ',' && depth === 0) {
                parts.push(current.trim());
                current = '';
                continue;
              }
              current += ch;
            }
            if (current.trim()) parts.push(current.trim());
            out = parts.some(p => evalCondition(`{{if ${p}}}`, params));
            if (isGlobalNot) out = !out;
            cache.set(key, out);
            return out;
          }

          const notGroup = c.match(/^!\s*\(([^)]+)\)$/);
          if (notGroup) {
            const vals = notGroup[1].split(',').map(v => v.trim());
            out = !vals.some(v => hasVal(params, v));
            if (isGlobalNot) out = !out;
            cache.set(key, out);
            return out;
          }

          const andWithGroups = c.match(/^([^&]+)&\(([^)]+)\)$/);
          if (andWithGroups) {
            const left = andWithGroups[1].trim();
            const orValues = andWithGroups[2].split(',').map(v => v.trim());
            out = hasVal(params, left) && orValues.some(v => hasVal(params, v));
            if (isGlobalNot) out = !out;
            cache.set(key, out);
            return out;
          }

          if (c.includes('&')) {
            const parts = [];
            let depth = 0,
            current = '';
            for (let i = 0; i < c.length; i++) {
              const ch = c[i];
              if (ch === '(') depth++;
              else if (ch === ')') depth--;
              else if (ch === '&' && depth === 0) {
                parts.push(current.trim());
                current = '';
                continue;
              }
              current += ch;
            }
            if (current.trim()) parts.push(current.trim());
            out = parts.every(part => {
              if (part.startsWith('!')) return !hasVal(params, part.slice(1).trim());
              const ng = part.match(/^!\s*\(([^)]+)\)$/);
              if (ng) return !ng[1].split(',').map(v => v.trim()).some(v => hasVal(params, v));
              return hasVal(params, part);
            });
            if (isGlobalNot) out = !out;
            cache.set(key, out);
            return out;
          }

          if (c.startsWith('!')) {
            out = !hasVal(params, c.slice(1).trim());
            if (isGlobalNot) out = !out;
            cache.set(key, out);
            return out;
          }

          out = hasVal(params, c);
          if (isGlobalNot) out = !out;
        } catch (_) {
          out = true;
        }
        cache.set(key, out);
        return out;
      };
    })();

    // CORRIGÉ: Gère les headings .notion-h ET h1-h6
    function filterToggleHeadings() {
      const params = getParams();

      // 1. Headings Notion (.notion-h)
      document.querySelectorAll('.notion-h').forEach(h => {
        const gray = h.querySelector('.notion-gray');
        if (!gray) return;
        const match = gray.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;

        const ok = evalCondition(match[0], params);
        const details = h.closest('details');

        if (details) {
          details.style.display = ok ? '': 'none';
        } else {
          h.style.display = ok ? '': 'none';
        }
        gray.style.display = 'none';
      });

      // 2. Headings HTML directs (h1-h6)
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        const gray = heading.querySelector('.notion-gray');
        if (!gray) return;
        const match = gray.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;

        const ok = evalCondition(match[0], params);
        // Masque SEULEMENT le heading, PAS le callout parent
        heading.style.display = ok ? '': 'none';
        gray.style.display = 'none';
      });
    }

    // CORRIGÉ: Ignore les .notion-gray dans les headings
    function filterTextCallouts() {
      const params = getParams();
      document.querySelectorAll('.notion-callout .notion-gray').forEach(span => {
        // SKIP si dans un heading ou summary (géré par filterToggleHeadings)
        if (span.closest('.notion-h, h1, h2, h3, h4, h5, h6, summary')) {
          return;
        }

        const match = span.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;
        const callout = span.closest('.notion-callout');
        if (!callout) return;
        const ok = evalCondition(match[0], params);
        callout.style.display = ok ? '': 'none';
        span.style.display = 'none';
      });
    }

    // NOUVEAU: Masque les callouts qui deviennent vides après filtrage
    function hideEmptyCallouts() {
      document.querySelectorAll('.notion-callout').forEach(callout => {
        // Skip si déjà masqué par une condition
        if (callout.style.display === 'none') return;

        // Vérifie si le callout a du contenu visible
        const hasVisibleContent = Array.from(callout.children).some(child => {
          // Ignore les icônes
          if (child.classList.contains('notion-callout-icon')) return false;

          // Vérifie si l'élément est visible
          const computedStyle = window.getComputedStyle(child);
          if (computedStyle.display === 'none') return false;

          // Vérifie le texte visible (sans les conditions)
          const textContent = child.textContent.replace(/\{\{[^}]+\}\}/g, '').trim();
          if (textContent.length > 0) return true;

          // Vérifie les médias visibles
          const visibleMedia = child.querySelectorAll('img:not([style*="display: none"]), table:not([style*="display: none"])');
          return visibleMedia.length > 0;
        });

        if (!hasVisibleContent) {
          callout.style.display = 'none';
        }
      });
    }

    // NOUVEAU: Unroll invisible des toggles avec -o dans gray span
    function unrollInvisibleToggles() {
      console.log('🔍 unrollInvisibleToggles() appelée');
      const allDetails = document.querySelectorAll('details');
      console.log(`   Nombre total de <details> trouvés: ${allDetails.length}`);
      let processedCount = 0;

      allDetails.forEach((details, index) => {
        const summary = details.querySelector('summary');
        if (!summary) return;

        // Cherche un .notion-gray contenant "-o" (compatible avec {{if rota}}-o)
        const graySpans = summary.querySelectorAll('.notion-gray');

        Array.from(graySpans).forEach(span => {
          const text = span.textContent.trim();
          if (text === '-o' || text.includes('-o')) {
            console.log(`   ✅ Toggle #${index} avec -o trouvé:`, {
              text: JSON.stringify(text),
              summaryText: summary.textContent.substring(0, 50) + '...'
            });
            // Ouvre le toggle
            details.open = true;
            // Ajoute une classe pour le styling CSS
            details.classList.add('toggle-unrolled-invisible');

            // Trouve le callout parent et ajoute-lui aussi une classe
            const parentCallout = details.closest('.notion-callout, [class*="notion-callout"]');
            if (parentCallout) {
              parentCallout.classList.add('callout-invisible-wrapper');
            }

            processedCount++;
          }
        });
      });

      console.log(`✅ Unroll invisible: ${processedCount} toggle(s) traité(s)`);
    }

    function runAll() {
      console.log('🚀 runAll() appelé');
      filterToggleHeadings();
      filterTextCallouts();
      // Unroll les toggles spéciaux après un délai pour être sûr que le DOM est prêt
      setTimeout(unrollInvisibleToggles, 200);
      // Masquer les callouts vides après le filtrage
      setTimeout(hideEmptyCallouts, 300);

      // Déclenche l'événement personnalisé pour rafraîchir le TOC
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('filterChanged'));
      }, 400);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAll);
    } else {
      runAll();
    }

    ['popstate',
      'hashchange',
      'bulletParamsChanged'].forEach(ev =>
      window.addEventListener(ev, () => setTimeout(runAll, 0))
    );
  })();

  // ============================================================================
  // STEP 5: TOC ULTRA-SIMPLE (ancres natives)
  // ============================================================================
  (function () {
    'use strict';

    const TOC_ID = 'static-toc';
    const HID_CLASS = 'toc-hidden';

    let tocContainer;
    let tocEntries = []; // [{linkEl, targetEl}, …]

    /*  1.  crée le TOC une seule fois  */
    function buildOnce() {
      if (document.getElementById(TOC_ID)) return; // déjà fait
      tocContainer = document.createElement('div');
      tocContainer.id = TOC_ID;
      tocContainer.className = 'dynamic-toc';
      tocContainer.innerHTML = '<div class="toc-title">Contents</div>';
      document.body.appendChild(tocContainer);

      /* tous les titres possibles */
      const sel = '.notion-h1, .notion-h2, .notion-h3, h1, h2, h3, details summary';
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.id) el.id = 'toc-' + i;
        const a = document.createElement('a');
        a.href = '#' + el.id;
        a.textContent = el.textContent.replace(/\{\{.*?\}\}|-o/g, '').trim();
        a.className = 'toc-item';
        tocContainer.appendChild(a);
        tocEntries.push({
          linkEl: a, targetEl: el
        });
      });

      // Intercepte le clic pour ouvrir les toggles fermés
      tocContainer.addEventListener('click',
        e => {
          if (!e.target.matches('.toc-item')) return;
          const target = document.getElementById(e.target.hash.slice(1));
          const details = target?.closest('details');
          if (details && !details.open) details.open = true;
          // le navigateur scroll automatiquement juste après
        });
    }

    /*  2.  montre/cache les lignes  */
    function refreshTOC() {
      tocEntries.forEach(({
        linkEl, targetEl
      }) => {
        const visible = targetEl.offsetParent !== null && // display != none
        window.getComputedStyle(targetEl).display !== 'none';
        linkEl.classList.toggle(HID_CLASS, !visible);
      });
      /* on cache le bloc s'il est vide */
      const hasVisible = [...tocEntries].some(e => !e.linkEl.classList.contains(HID_CLASS));
      tocContainer.style.display = hasVisible ? 'block': 'none';

      console.log(`📋 TOC: ${tocEntries.filter(e => !e.linkEl.classList.contains(HID_CLASS)).length} visible(s)`);
    }

    /*  3.  on lance une fois au début  */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        buildOnce(); refreshTOC();
      });
    } else {
      buildOnce(); refreshTOC();
    }

    /*  4.  après chaque filtre  */
    window.addEventListener('bulletParamsChanged', refreshTOC);
    window.addEventListener('filterChanged', refreshTOC);

    // Expose pour appels manuels
    window.refreshTOC = refreshTOC;
  }());
