<script>
  // ============================================================================
  // CONFIGURATION DATA - Version optimisée
  // ============================================================================

  const MODAL_DATA = {
    instruments: {
      up2: { name: 'UP-2000', modules: [], specific: ['sigm', 'delt'] },
      up3: { name: 'UP-3000', modules: [], specific: ['lamb', 'sigm', 'delt'] },
      up5: { name: 'UP-5000', modules: [], specific: ['lamb', 'sigm', 'delt'] },
      mft2: { name: 'MFT-2000', modules: ['stat', 'rota', 'reci'], specific: ['lamb', 'sigm', 'delt'] },
      mft5: { name: 'MFT-5000', modules: ['stat', 'rota', 'reci', 'bor', 'scra', '4ball', 'vcoil', 'mtm'], specific: ['ev', 'tcorr', 'lamb', 'sigm', 'delt'] },
      smt2: { name: 'SMT-2000', modules: ['stat'], specific: [] },
      smt5: { name: 'SMT-5000', modules: ['stat'], specific: [] },
      ust2: { name: 'UST-2', modules: ['stat'], specific: [] },
      fftm: { name: 'FFT-M', modules: ['vcoil'], specific: [] },
      fft1: { name: 'FFT-1', modules: ['vcoil'], specific: [] },
      fft2: { name: 'FFT-2', modules: ['vcoil'], specific: [] },
      aj1: { name: 'AJ-1000', modules: ['none'], specific: [] },
      trt1: { name: 'TRT-1000', modules: ['none'], specific: [] },
      mvt2: { name: 'MVT-2', modules: ['none'], specific: [] }
    },
    modules: {
      stat: { name: 'Stationary', temps: ['room', 'heat', 'cool', 'humid'], envs: ['liq', 'dry'], sensors: ['ull', 'll', 'ml', 'hl', 'FzFx', 'Fz', 'nano', 'micro', 'stch'] },
      rota: { name: 'Rotary', temps: ['room', 'heat', 'cool', 'humid'], envs: ['liq', 'dry', 'brk'], sensors: ['ull', 'll', 'ml', 'hl', 'FzFx', 'FzTq'] },
      reci: { name: 'Reciprocating', temps: ['room', 'heat', 'cool', 'humid'], envs: ['liq', 'dry'], sensors: ['ull', 'll', 'ml', 'hl', 'FzFx', 'Fzp', 'Fz'] },
      bor: { name: 'Block-On-Ring', temps: ['room', 'heat', 'cool', 'humid'], envs: ['cut', 'liq', 'dry'], sensors: ['ml', 'hl', 'FzFx'] },
      scra: { name: 'Scratch', temps: [], envs: ['dry'], sensors: ['ml', 'hl'] },
      '4ball': { name: '4-ball', temps: ['room', 'heat', 'cool'], envs: ['dry'], sensors: ['none'] },
      vcoil: { name: 'VoiceCoil', temps: ['room', 'heat'], envs: ['dry'], sensors: ['none'] },
      mtm: { name: 'Mini Traction', temps: ['room', 'heat'], envs: ['liq', 'dry'], sensors: ['ml'] },
      tap: { name: 'Tapping Torque', temps: ['room', 'heat', 'cool'], envs: ['dry'], sensors: ['none'] },
      srv: { name: 'SRV', temps: ['room', 'heat', 'cool', 'humid'], envs: ['liq', 'dry'], sensors: ['ull', 'll', 'ml', 'hl', 'FzFx', 'Fzp', 'Fz'] },
      none: { name: 'None', temps: [], envs: [], sensors: [] }
    },
    temps: {
      room: 'Ambient/Room Temperature',
      heat: 'Heating-Controlled',
      cool: 'Cooling-Controlled',
      humid: 'Humidity-Controlled'
    },
    envs: {
      liq: 'Lubricated (Liquid, Grease)',
      dry: 'Dry',
      brk: 'Brake',
      cut: 'Cutting'
    },
    sensors: {
      ull: 'Ultra Low-Load Argon', ll: 'Low Load Argon', ml: 'Medium Load Argon', hl: 'High Load Argon',
      FzFx: 'Fz+Fx', Fzp: 'Fz+piezo', Fz: 'Fz', FzTq: 'Fz+Torque',
      nano: 'Nano-Indentation', micro: 'Micro-Indentation', stch: 'Scratch', none: 'None'
    },
    sensorCodes: {
      ull: { sensor: '2d', range: 'ull' }, ll: { sensor: '2d', range: 'll' },
      ml: { sensor: '2d', range: 'ml' }, hl: { sensor: '2d', range: 'hl' },
      FzFx: { sensor: '1d1d', range: null }, Fzp: { sensor: 'fzpz', range: null },
      Fz: { sensor: 'fz', range: null }, FzTq: { sensor: 'fztq', range: null },
      nano: { sensor: 'nano', range: null }, micro: { sensor: 'micro', range: null },
      stch: { sensor: 'stch', range: null }, none: { sensor: null, range: null }
    },
    specific: {
      ev: 'Electrified',
      tcorr: 'Tribocorrosion',
      lamb: 'Lambda Imaging',
      sigm: 'Sigma Imaging',
      delt: 'Delta Imaging'
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
    let spe = urlParams.get('spe') || sessionStorage.getItem('bullet_spe');
    let range = urlParams.get('range') || sessionStorage.getItem('bullet_range');

    if (model) sessionStorage.setItem('bullet_model', model);
    if (module) sessionStorage.setItem('bullet_module', module);
    if (sensor) sessionStorage.setItem('bullet_sensor', sensor);
    if (env) sessionStorage.setItem('bullet_env', env);
    if (cond) sessionStorage.setItem('bullet_cond', cond);
    if (spe) sessionStorage.setItem('bullet_spe', spe);
    if (range) sessionStorage.setItem('bullet_range', range);

    if (model || module || sensor || env || cond || spe || range) {
      const newUrl = new URL(window.location);
      if (model) newUrl.searchParams.set('model', model);
      if (module) newUrl.searchParams.set('module', module);
      if (sensor) newUrl.searchParams.set('sensor', sensor);
      if (env) newUrl.searchParams.set('env', env);
      if (cond) newUrl.searchParams.set('cond', cond);
      if (spe) newUrl.searchParams.set('spe', spe);
      if (range) newUrl.searchParams.set('range', range);
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
        const spe = newParams.get('spe') || sessionStorage.getItem('bullet_spe');
        const range = newParams.get('range') || sessionStorage.getItem('bullet_range');

        if (model) sessionStorage.setItem('bullet_model', model);
        if (module) sessionStorage.setItem('bullet_module', module);
        if (sensor) sessionStorage.setItem('bullet_sensor', sensor);
        if (env) sessionStorage.setItem('bullet_env', env);
        if (cond) sessionStorage.setItem('bullet_cond', cond);
        if (spe) sessionStorage.setItem('bullet_spe', spe);
        if (range) sessionStorage.setItem('bullet_range', range);

        const newUrl = new URL(window.location);
        if (model) newUrl.searchParams.set('model', model);
        if (module) newUrl.searchParams.set('module', module);
        if (sensor) newUrl.searchParams.set('sensor', sensor);
        if (env) newUrl.searchParams.set('env', env);
        if (cond) newUrl.searchParams.set('cond', cond);
        if (spe) newUrl.searchParams.set('spe', spe);
        if (range) newUrl.searchParams.set('range', range);

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
        const currentSpe = sessionStorage.getItem('bullet_spe');
        const currentRange = sessionStorage.getItem('bullet_range');

        const linkParams = new URLSearchParams(linkUrl.search);
        const linkModel = linkParams.get('model');
        const linkModule = linkParams.get('module');
        const linkSensor = linkParams.get('sensor');
        const linkEnv = linkParams.get('env');
        const linkCond = linkParams.get('cond');
        const linkSpe = linkParams.get('spe');
        const linkRange = linkParams.get('range');

        const finalModel = linkModel || currentModel;
        const finalModule = linkModule || currentModule;
        const finalSensor = linkSensor || currentSensor;
        const finalEnv = linkEnv || currentEnv;
        const finalCond = linkCond || currentCond;
        const finalSpe = linkSpe || currentSpe;
        const finalRange = linkRange || currentRange;

        if (finalModel) sessionStorage.setItem('bullet_model', finalModel);
        if (finalModule) sessionStorage.setItem('bullet_module', finalModule);
        if (finalSensor) sessionStorage.setItem('bullet_sensor', finalSensor);
        if (finalEnv) sessionStorage.setItem('bullet_env', finalEnv);
        if (finalCond) sessionStorage.setItem('bullet_cond', finalCond);
        if (finalSpe) sessionStorage.setItem('bullet_spe', finalSpe);
        if (finalRange) sessionStorage.setItem('bullet_range', finalRange);

        const finalUrl = new URL(linkUrl.pathname, window.location.origin);
        if (finalModel) finalUrl.searchParams.set('model', finalModel);
        if (finalModule) finalUrl.searchParams.set('module', finalModule);
        if (finalSensor) finalUrl.searchParams.set('sensor', finalSensor);
        if (finalEnv) finalUrl.searchParams.set('env', finalEnv);
        if (finalCond) finalUrl.searchParams.set('cond', finalCond);
        if (finalSpe) finalUrl.searchParams.set('spe', finalSpe);
        if (finalRange) finalUrl.searchParams.set('range', finalRange);
        if (linkUrl.hash) finalUrl.hash = linkUrl.hash;

        window.location.href = finalUrl.toString();
      }
    }, true);

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
        spe: urlParams.get('spe') || sessionStorage.getItem('bullet_spe')
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

      const { model, module, sensor, env, cond, spe } = getParams();

      const paramsDisplay = document.createElement('div');
      paramsDisplay.className = 'params-display';

      if (!model && !module && !sensor && !env && !cond && !spe) {
        paramsDisplay.textContent = 'Full Manual';
        paramsDisplay.classList.add('full-manual');
      } else {
        const params = [];
        if (model) params.push(model);
        if (module) params.push(module);
        if (sensor) params.push(sensor);
        if (env) params.push(env);
        if (cond) params.push(cond);
        if (spe) params.push(spe);
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
  // STEP 3: CONFIGURE MODAL - VERSION OPTIMISÉE
  // ============================================================================
  (function() {
    'use strict';

    let modalState = {
      instrument: null,
      module: null,
      condition: null,
      env: null,
      sensor: null,
      spe: null
    };

    // =============================================================================
    // UI UTILITIES
    // =============================================================================
    const ui = {
      showSection: (id) => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('visible')) {
          el.style.display = 'inline';
          setTimeout(() => el.classList.add('visible'), 10);
        }
      },
      
      hideSection: (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.remove('visible');
          setTimeout(() => el.style.display = 'none', 300);
        }
      },
      
      resetTrigger: (selectId) => {
        const trigger = document.querySelector(`#${selectId} .select-trigger`);
        if (trigger) {
          trigger.textContent = trigger.dataset.placeholder;
          trigger.classList.remove('has-value');
        }
        document.querySelectorAll(`#${selectId} .select-option`).forEach(opt => 
          opt.classList.remove('selected')
        );
      },
      
      populateDropdown: (selectId, options) => {
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
      },
      
      selectOption: (selectId, value, label) => {
        const trigger = document.querySelector(`#${selectId} .select-trigger`);
        const dropdown = document.querySelector(`#${selectId} .select-dropdown`);
        
        if (trigger) {
          trigger.textContent = label;
          trigger.classList.add('has-value');
        }
        
        if (dropdown) {
          dropdown.classList.remove('active');
          trigger?.classList.remove('active');
          
          dropdown.querySelectorAll('.select-option').forEach(opt => 
            opt.classList.toggle('selected', opt.dataset.value === value)
          );
        }
      },
      
      autoSelect: (selectId, value) => {
        if (!value) return;
        
        const label = {
          selectCondition1: MODAL_DATA.temps[value],
          selectEnv: MODAL_DATA.envs[value]
        }[selectId];
        
        if (!label) return;
        
        setTimeout(() => {
          ui.selectOption(selectId, value, label);
          const handlers = {
            selectCondition1: handleConditionSelect,
            selectEnv: handleEnvSelect
          };
          handlers[selectId]?.(value);
        }, 50);
      }
    };

    // =============================================================================
    // STATE MANAGER
    // =============================================================================
    const stateManager = {
      reset: (from) => {
        const fields = ['instrument', 'module', 'condition', 'env', 'sensor', 'spe'];
        const idx = fields.indexOf(from);
        fields.slice(idx + 1).forEach(field => modalState[field] = null);
      },
      
      resetUI: () => {
        ['selectModule', 'selectCondition1', 'selectEnv', 'selectSensor', 'selectSpe']
          .forEach(ui.resetTrigger);
        
        ['section-module', 'section-condition1', 'section-env', 'section-sensor', 'section-spe']
          .forEach(ui.hideSection);
      }
    };

    // =============================================================================
    // HANDLERS
    // =============================================================================
    function handleSelect(selectId, value, label) {
      ui.selectOption(selectId, value, label);
      
      const handlers = {
        selectInstrument: handleInstrumentSelect,
        selectModule: handleModuleSelect,
        selectCondition1: handleConditionSelect,
        selectEnv: handleEnvSelect,
        selectSensor: handleSensorSelect,
        selectSpe: handleSpeSelect
      };
      
      handlers[selectId]?.(value);
    }

    function handleInstrumentSelect(value) {
      stateManager.reset('instrument');
      stateManager.resetUI();
      modalState.instrument = value;
      
      const instrument = MODAL_DATA.instruments[value];
      
      const validModules = instrument.modules
        .filter(mod => MODAL_DATA.modules[mod])
        .reduce((acc, mod) => {
          acc[mod] = MODAL_DATA.modules[mod].name;
          return acc;
        }, {});
      
      if (Object.keys(validModules).length === 0) {
        showSpecificSection();
      } else {
        ui.populateDropdown('selectModule', validModules);
        ui.showSection('section-module');
      }
      
      updateResult();
    }

    function handleModuleSelect(value) {
      modalState.module = value;
      stateManager.reset('module');
      
      ['section-condition1', 'section-env', 'section-sensor', 'section-spe'].forEach(ui.hideSection);
      ['selectCondition1', 'selectEnv', 'selectSensor', 'selectSpe'].forEach(ui.resetTrigger);
      
      const module = MODAL_DATA.modules[value];
      const tempOptions = module.temps.reduce((acc, temp) => {
        acc[temp] = MODAL_DATA.temps[temp];
        return acc;
      }, {});
      
      if (Object.keys(tempOptions).length > 0) {
        ui.populateDropdown('selectCondition1', tempOptions);
        ui.showSection('section-condition1');
        
        if (module.temps.includes('room')) {
          ui.autoSelect('selectCondition1', 'room');
        }
      } else {
        handleConditionSelect('none');
      }
      
      updateResult();
    }

    function handleConditionSelect(value) {
      modalState.condition = value;
      stateManager.reset('condition');
      
      ['section-env', 'section-sensor', 'section-spe'].forEach(ui.hideSection);
      ['selectEnv', 'selectSensor', 'selectSpe'].forEach(ui.resetTrigger);
      
      const module = MODAL_DATA.modules[modalState.module];
      const envOptions = module.envs.reduce((acc, env) => {
        acc[env] = MODAL_DATA.envs[env];
        return acc;
      }, {});
      
      if (Object.keys(envOptions).length > 0) {
        ui.populateDropdown('selectEnv', envOptions);
        ui.showSection('section-env');
        
        if (module.envs.includes('dry')) {
          ui.autoSelect('selectEnv', 'dry');
        }
      } else {
        handleEnvSelect('none');
      }
      
      updateResult();
    }

    function handleEnvSelect(value) {
      modalState.env = value;
      stateManager.reset('env');
      
      ['section-sensor', 'section-spe'].forEach(ui.hideSection);
      ['selectSensor', 'selectSpe'].forEach(ui.resetTrigger);
      
      const module = MODAL_DATA.modules[modalState.module];
      
      if (module.sensors.includes('none')) {
        handleSensorSelect('none');
        return;
      }
      
      const sensorOptions = module.sensors.reduce((acc, sens) => {
        acc[sens] = MODAL_DATA.sensors[sens];
        return acc;
      }, {});
      
      ui.populateDropdown('selectSensor', sensorOptions);
      ui.showSection('section-sensor');
      updateResult();
    }

    function handleSensorSelect(value) {
      modalState.sensor = value;
      modalState.spe = null;
      
      ui.hideSection('section-spe');
      ui.resetTrigger('selectSpe');
      
      showSpecificSection();
      updateResult();
    }

    function handleSpeSelect(value) {
      modalState.spe = value;
      updateResult();
    }

    function showSpecificSection() {
      if (!modalState.instrument) return;
      
      const instrument = MODAL_DATA.instruments[modalState.instrument];
      const speOptions = instrument.specific.reduce((acc, spe) => {
        acc[spe] = MODAL_DATA.specific[spe];
        return acc;
      }, {});
      
      if (Object.keys(speOptions).length > 0) {
        ui.populateDropdown('selectSpe', speOptions);
        ui.showSection('section-spe');
      }
    }

    // =============================================================================
    // UPDATE RESULT
    // =============================================================================
    function updateResult() {
      const params = [];
      
      if (modalState.instrument) params.push(`model=${modalState.instrument}`);
      if (modalState.module) params.push(`module=${modalState.module}`);
      if (modalState.condition) params.push(`cond=${modalState.condition}`);
      if (modalState.env) params.push(`env=${modalState.env}`);
      
      if (modalState.sensor) {
        const config = MODAL_DATA.sensorCodes[modalState.sensor];
        if (config?.sensor) params.push(`sensor=${config.sensor}`);
        if (config?.range) params.push(`range=${config.range}`);
      }
      
      if (modalState.spe) params.push(`spe=${modalState.spe}`);
      
      // Update navbar
      const display = document.querySelector('.params-display');
      if (!modalState.instrument) {
        display.textContent = 'Full Manual';
        display.className = 'params-display full-manual';
      } else {
        const parts = [
          modalState.instrument,
          modalState.module,
          modalState.condition,
          modalState.env,
          modalState.sensor,
          modalState.spe
        ].filter(Boolean);
        
        display.textContent = parts.join(' • ');
        display.className = 'params-display has-params';
      }
    }

    // =============================================================================
    // INIT
    // =============================================================================
    function initModal() {
      const navbar = document.querySelector('.navbar.bullet-navbar');
      const configBtn = navbar?.querySelector('.configure-button');

      if (!configBtn) {
        setTimeout(initModal, 100);
        return;
      }

      // Create modal
      const modal = document.createElement('div');
      modal.className = 'configure-modal';
      modal.id = 'configModal';
      modal.innerHTML = `
        <button class="configure-close-button">×</button>
        <h3 class="configure-modal-title">Configure your manual</h3>

        <div class="configure-form-paragraph">
          <div class="custom-select" id="selectInstrument">
            <div class="select-trigger" data-placeholder="instrument">instrument</div>
            <div class="select-dropdown"></div>
          </div>

          <span class="form-section" id="section-module">
            <div class="custom-select" id="selectModule">
              <div class="select-trigger" data-placeholder="module">module</div>
              <div class="select-dropdown"></div>
            </div>
          </span>

          <span class="form-section" id="section-condition1">
            <div class="custom-select" id="selectCondition1">
              <div class="select-trigger" data-placeholder="temperature">temperature</div>
              <div class="select-dropdown"></div>
            </div>
          </span>

          <span class="form-section" id="section-env">
            <div class="custom-select" id="selectEnv">
              <div class="select-trigger" data-placeholder="environment">environment</div>
              <div class="select-dropdown"></div>
            </div>
          </span>

          <span class="form-section" id="section-sensor">
            <div class="custom-select" id="selectSensor">
              <div class="select-trigger" data-placeholder="sensor">sensor</div>
              <div class="select-dropdown"></div>
            </div>
          </span>

          <span class="form-section" id="section-spe">
            <div class="custom-select" id="selectSpe">
              <div class="select-trigger" data-placeholder="specific features">specific features</div>
              <div class="select-dropdown"></div>
            </div>
          </span>
        </div>

        <div class="configure-actions">
          <button class="configure-reset-button">Reset All</button>
          <button class="configure-apply-button">Apply Configuration</button>
        </div>
      `;

      navbar.parentElement.insertBefore(modal, navbar.nextSibling);

      // Populate instruments
      ui.populateDropdown('selectInstrument', 
        Object.fromEntries(
          Object.entries(MODAL_DATA.instruments).map(([k, v]) => [k, v.name])
        )
      );

      // Event listeners
      configBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.toggle('active');
      });

      modal.querySelector('.configure-close-button').addEventListener('click', () => 
        modal.classList.remove('active')
      );

      modal.querySelector('.configure-reset-button').addEventListener('click', () => {
        Object.keys(modalState).forEach(k => modalState[k] = null);
        document.querySelectorAll('.select-trigger').forEach(t => {
          t.textContent = t.dataset.placeholder;
          t.classList.remove('has-value');
        });
        stateManager.resetUI();
        
        ['bullet_model', 'bullet_module', 'bullet_sensor', 'bullet_env', 'bullet_cond', 'bullet_spe', 'bullet_range']
          .forEach(key => sessionStorage.removeItem(key));
        
        updateResult();
      });

      modal.querySelector('.configure-apply-button').addEventListener('click', () => {
        const params = [];
        
        if (modalState.instrument) {
          params.push(`model=${modalState.instrument}`);
          sessionStorage.setItem('bullet_model', modalState.instrument);
        }
        if (modalState.module) {
          params.push(`module=${modalState.module}`);
          sessionStorage.setItem('bullet_module', modalState.module);
        }
        if (modalState.condition) {
          params.push(`cond=${modalState.condition}`);
          sessionStorage.setItem('bullet_cond', modalState.condition);
        }
        if (modalState.env) {
          params.push(`env=${modalState.env}`);
          sessionStorage.setItem('bullet_env', modalState.env);
        }
        if (modalState.sensor) {
          const config = MODAL_DATA.sensorCodes[modalState.sensor];
          if (config?.sensor) {
            params.push(`sensor=${config.sensor}`);
            sessionStorage.setItem('bullet_sensor', config.sensor);
          }
          if (config?.range) {
            params.push(`range=${config.range}`);
            sessionStorage.setItem('bullet_range', config.range);
          }
        }
        if (modalState.spe) {
          params.push(`spe=${modalState.spe}`);
          sessionStorage.setItem('bullet_spe', modalState.spe);
        }

        const url = params.length > 0 ? `?${params.join('&')}` : '';
        window.location.href = window.location.pathname + url;
      });

      document.addEventListener('click', (e) => {
        if (!modal.contains(e.target) && !configBtn.contains(e.target)) {
          modal.classList.remove('active');
        }
      });

      // Custom select handlers
      document.querySelectorAll('.custom-select').forEach(select => {
        const trigger = select.querySelector('.select-trigger');
        const dropdown = select.querySelector('.select-dropdown');

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

      document.addEventListener('click', () => {
        document.querySelectorAll('.select-dropdown.active').forEach(dd => {
          dd.classList.remove('active');
          dd.previousElementSibling.classList.remove('active');
        });
      });

      updateResult();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initModal);
    } else {
      initModal();
    }
  })();

  // ============================================================================
  // STEP 4: CONDITIONAL FILTERING (INCHANGÉ)
  // ============================================================================
  (function() {
    'use strict';

    const getParams = () => {
      const p = {};
      new URLSearchParams(location.search).forEach((v, k) => (p[k] = v));
      ['model', 'module', 'sensor', 'env', 'cond', 'spe', 'range'].forEach(k => {
        const v = sessionStorage.getItem(`bullet_${k}`);
        if (v && !p[k]) p[k] = v;
      });
      return p;
    };

    const hasVal = (params, val) => Object.values(params).includes(val);

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
            let depth = 0, current = '';
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
            let depth = 0, current = '';
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

    function filterToggleHeadings() {
      const params = getParams();

      document.querySelectorAll('.notion-h').forEach(h => {
        const gray = h.querySelector('.notion-gray');
        if (!gray) return;
        const match = gray.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;

        const ok = evalCondition(match[0], params);
        const details = h.closest('details');

        if (details) {
          details.style.display = ok ? '' : 'none';
        } else {
          h.style.display = ok ? '' : 'none';
        }
        gray.style.display = 'none';
      });

      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        const gray = heading.querySelector('.notion-gray');
        if (!gray) return;
        const match = gray.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;

        const ok = evalCondition(match[0], params);
        heading.style.display = ok ? '' : 'none';
        gray.style.display = 'none';
      });
    }

    function filterTextCallouts() {
      const params = getParams();
      document.querySelectorAll('.notion-callout .notion-gray').forEach(span => {
        if (span.closest('.notion-h, h1, h2, h3, h4, h5, h6, summary')) {
          return;
        }

        const match = span.textContent.match(/\{\{?\s*(?:if|!)[^}]+\}?\}/i);
        if (!match) return;
        const callout = span.closest('.notion-callout');
        if (!callout) return;
        const ok = evalCondition(match[0], params);
        callout.style.display = ok ? '' : 'none';
        span.style.display = 'none';
      });
    }

    function hideEmptyCallouts() {
      document.querySelectorAll('.notion-callout').forEach(callout => {
        if (callout.style.display === 'none') return;

        const hasVisibleContent = Array.from(callout.children).some(child => {
          if (child.classList.contains('notion-callout-icon')) return false;

          const computedStyle = window.getComputedStyle(child);
          if (computedStyle.display === 'none') return false;

          const textContent = child.textContent.replace(/\{\{[^}]+\}\}/g, '').trim();
          if (textContent.length > 0) return true;

          const visibleMedia = child.querySelectorAll('img:not([style*="display: none"]), table:not([style*="display: none"])');
          return visibleMedia.length > 0;
        });

        if (!hasVisibleContent) {
          callout.style.display = 'none';
        }
      });
    }

    function unrollInvisibleToggles() {
      const allDetails = document.querySelectorAll('details');
      let processedCount = 0;

      allDetails.forEach((details, index) => {
        const summary = details.querySelector('summary');
        if (!summary) return;

        const graySpans = summary.querySelectorAll('.notion-gray');

        Array.from(graySpans).forEach(span => {
          const text = span.textContent.trim();
          if (text === '-o' || text.includes('-o')) {
            details.open = true;
            details.classList.add('toggle-unrolled-invisible');

            const parentCallout = details.closest('.notion-callout, [class*="notion-callout"]');
            if (parentCallout) {
              parentCallout.classList.add('callout-invisible-wrapper');
            }

            processedCount++;
          }
        });
      });
    }

    function runAll() {
      filterToggleHeadings();
      filterTextCallouts();
      setTimeout(unrollInvisibleToggles, 200);
      setTimeout(hideEmptyCallouts, 300);

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('filterChanged'));
      }, 400);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAll);
    } else {
      runAll();
    }

    ['popstate', 'hashchange', 'bulletParamsChanged'].forEach(ev =>
      window.addEventListener(ev, () => setTimeout(runAll, 0))
    );
  })();

  // ============================================================================
  // STEP 5: TOC (INCHANGÉ)
  // ============================================================================
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
        buildOnce(); refreshTOC();
      });
    } else {
      buildOnce(); refreshTOC();
    }

    window.addEventListener('bulletParamsChanged', refreshTOC);
    window.addEventListener('filterChanged', refreshTOC);

    window.refreshTOC = refreshTOC;
  }());

</script>