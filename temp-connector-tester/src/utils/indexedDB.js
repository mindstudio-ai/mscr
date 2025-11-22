// IndexedDB utility for storing connector test status and comments

const DB_NAME = 'ConnectorTesterDB';
const DB_VERSION = 1;
const STORE_NAME = 'connectorStatus';

let db = null;

// Initialize IndexedDB
export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, {
          keyPath: 'connectorId',
        });
        objectStore.createIndex('status', 'status', { unique: false });
      }
    };
  });
}

// Get status for a connector
export async function getConnectorStatus(connectorId) {
  if (!db) {
    await initDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(connectorId);

    request.onsuccess = () => {
      resolve(
        request.result || { connectorId, status: 'pending', comment: '' },
      );
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Save status for a connector
export async function saveConnectorStatus(connectorId, status, comment = '') {
  if (!db) {
    await initDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const data = {
      connectorId,
      status,
      comment,
      updatedAt: new Date().toISOString(),
    };
    const request = store.put(data);

    request.onsuccess = () => {
      resolve(data);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Get all connector statuses
export async function getAllConnectorStatuses() {
  if (!db) {
    await initDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const statusMap = {};
      request.result.forEach((item) => {
        statusMap[item.connectorId] = item;
      });
      resolve(statusMap);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Clear all statuses
export async function clearAllStatuses() {
  if (!db) {
    await initDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
