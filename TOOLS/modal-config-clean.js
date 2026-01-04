// =============================================================================
// MODAL CONFIGURATION - CHARGE LES DONNÉES DEPUIS config-data.json
// =============================================================================

let MODAL_DATA = null;

// Charger les données depuis le fichier JSON
async function loadModalData() {
  try {
    const response = await fetch('config-data.json');
    if (!response.ok) throw new Error('Failed to load config-data.json');
    MODAL_DATA = await response.json();
    console.log('✅ Modal data loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Error loading modal data:', error);
    return false;
  }
}

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
// SELECTION HANDLERS
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
  
  const url = params.length > 0 ? `?${params.join('&')}` : 'No parameters';
  
  document.getElementById('resultOutput').textContent = 
    JSON.stringify(modalState, null, 2) + '\n\nURL: ' + url;
  
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
async function initModal() {
  // Attendre que les données soient chargées
  const dataLoaded = await loadModalData();
  if (!dataLoaded) {
    console.error('Cannot initialize modal without data');
    return;
  }

  const modal = document.getElementById('configModal');
  const configBtn = document.querySelector('.configure-button');
  const closeBtn = document.querySelector('.configure-close-button');
  const resetBtn = document.querySelector('.configure-reset-button');
  const applyBtn = document.querySelector('.configure-apply-button');
  
  ui.populateDropdown('selectInstrument', 
    Object.fromEntries(
      Object.entries(MODAL_DATA.instruments).map(([k, v]) => [k, v.name])
    )
  );
  
  configBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.toggle('active');
  });
  
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  
  resetBtn.addEventListener('click', () => {
    Object.keys(modalState).forEach(k => modalState[k] = null);
    document.querySelectorAll('.select-trigger').forEach(t => {
      t.textContent = t.dataset.placeholder;
      t.classList.remove('has-value');
    });
    stateManager.resetUI();
    updateResult();
  });
  
  applyBtn.addEventListener('click', () => {
    alert('Configuration applied! Check the result display below.');
    modal.classList.remove('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!modal.contains(e.target) && !configBtn.contains(e.target)) {
      modal.classList.remove('active');
    }
  });
  
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

// Initialiser le modal après le chargement du DOM
document.addEventListener('DOMContentLoaded', initModal);
