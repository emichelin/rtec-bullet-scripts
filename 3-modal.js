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
