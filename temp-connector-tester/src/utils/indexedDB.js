// Connector statuses utility
// NOTE: Google Sheets is the ONLY source of truth for connector statuses
// No IndexedDB storage - all statuses come from Google Sheets

// Sync with Google Sheets (primary database)
async function syncWithGoogleSheets(connectorId, status, comment) {
  try {
    const response = await fetch('/api/connector-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        connectorId,
        status,
        comment,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync with Google Sheets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error syncing with Google Sheets:', error);
    // Don't throw - allow local storage to continue
    return { success: false, error: error.message };
  }
}

// Load all statuses from Google Sheets (ONLY source of truth)
async function loadFromGoogleSheets() {
  try {
    const response = await fetch('/api/connector-statuses');
    if (!response.ok) {
      throw new Error('Failed to load from Google Sheets');
    }
    const statuses = await response.json();
    return statuses;
  } catch (error) {
    console.error('Error loading from Google Sheets:', error);
    // Return empty object if Google Sheets fails
    return {};
  }
}

// Initialize DB (no-op, kept for backward compatibility)
export async function initDB() {
  // No IndexedDB needed - Google Sheets is the only source of truth
  return Promise.resolve();
}

// Get status for a connector (from Google Sheets only)
export async function getConnectorStatus(connectorId) {
  try {
    const allStatuses = await loadFromGoogleSheets();
    return (
      allStatuses[connectorId] || {
        connectorId,
        status: 'pending',
        comment: '',
      }
    );
  } catch (error) {
    console.error('Error getting connector status:', error);
    return { connectorId, status: 'pending', comment: '' };
  }
}

// Save status for a connector (saves to Google Sheets only)
export async function saveConnectorStatus(connectorId, status, comment = '') {
  // Save to Google Sheets (only source of truth)
  return await syncWithGoogleSheets(connectorId, status, comment);
}

// Get all connector statuses (from Google Sheets only)
export async function getAllConnectorStatuses() {
  return await loadFromGoogleSheets();
}

// Clear all statuses (not applicable - Google Sheets is source of truth)
export async function clearAllStatuses() {
  console.warn(
    'clearAllStatuses() is not applicable - Google Sheets is the source of truth',
  );
  return Promise.resolve();
}
