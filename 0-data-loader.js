// ===========================================================================
// MODULE 0: LOAD CONFIG DATA
// ===========================================================================
let MODAL_DATA = null;

async function loadModalData() {
  try {
    const response = await fetch('config-data.json');
    if (!response.ok) throw new Error('Failed to load config-data.json');
    MODAL_DATA = await response.json();
    console.log('✅ Modal data loaded');
    return true;
  } catch (error) {
    console.error('❌ Error loading modal data:', error);
    return false;
  }
}

// Charger les données au démarrage
loadModalData();
