// Use a separate database for variables only
const DB_NAME = 'ConnectorTesterVariablesDB';
const DB_VERSION = 1;
const VARIABLES_STORE_NAME = 'variables';
let db = null;

// Initialize IndexedDB for variables
export async function initVariablesDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening variables database:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      console.log('Variables database opened successfully');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      console.log('Initializing Variables DB...');
      const database = event.target.result;

      // Delete existing stores if they exist (clean slate for recreation)
      if (database.objectStoreNames.contains(VARIABLES_STORE_NAME)) {
        console.log('Deleting existing variables store for recreation...');
        database.deleteObjectStore(VARIABLES_STORE_NAME);
      }

      // Create variables store
      try {
        const objectStore = database.createObjectStore(VARIABLES_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('key', 'key', { unique: true });
        console.log('Variables store created successfully');
      } catch (error) {
        console.error('Error creating variables store:', error);
        reject(error);
      }
    };

    request.onblocked = () => {
      console.warn(
        'Database upgrade blocked - close other tabs with this database open',
      );
    };
  });
}

// Get all variables
export async function getVariables() {
  if (!db) {
    await initVariablesDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([VARIABLES_STORE_NAME], 'readonly');
    const store = transaction.objectStore(VARIABLES_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Get a variable by key
export async function getVariable(key) {
  if (!db) {
    await initVariablesDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([VARIABLES_STORE_NAME], 'readonly');
    const store = transaction.objectStore(VARIABLES_STORE_NAME);
    const index = store.index('key');
    const request = index.get(key);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Save a variable (create or update)
export async function saveVariable(key, value, id = null) {
  try {
    console.log('Saving variable:', key, value, db);
    if (!db) {
      await initVariablesDB();
    }

    // Ensure database is ready
    if (!db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([VARIABLES_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(VARIABLES_STORE_NAME);

        const variableData = {
          key: key.trim(),
          value: value.trim(),
          updatedAt: new Date().toISOString(),
        };

        if (id) {
          // Update existing
          variableData.id = id;
          const request = store.put(variableData);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => {
            console.error('Error updating variable:', request.error);
            reject(
              new Error(`Failed to update variable: ${request.error.message}`),
            );
          };
        } else {
          // Check if key already exists
          const index = store.index('key');
          const getRequest = index.get(key.trim());

          getRequest.onsuccess = () => {
            if (getRequest.result) {
              // Update existing by key
              variableData.id = getRequest.result.id;
              const putRequest = store.put(variableData);
              putRequest.onsuccess = () => resolve(putRequest.result);
              putRequest.onerror = () => {
                console.error(
                  'Error updating variable by key:',
                  putRequest.error,
                );
                reject(
                  new Error(
                    `Failed to update variable: ${putRequest.error.message}`,
                  ),
                );
              };
            } else {
              // Create new
              const addRequest = store.add(variableData);
              addRequest.onsuccess = () => resolve(addRequest.result);
              addRequest.onerror = (e) => {
                console.error('Error adding variable:', addRequest.error);
                // Check if it's a constraint error (duplicate key)
                if (addRequest.error.name === 'ConstraintError') {
                  reject(
                    new Error(`Variable with key "${key}" already exists`),
                  );
                } else {
                  reject(
                    new Error(
                      `Failed to add variable: ${addRequest.error.message}`,
                    ),
                  );
                }
              };
            }
          };

          getRequest.onerror = () => {
            console.error(
              'Error checking for existing variable:',
              getRequest.error,
            );
            reject(
              new Error(
                `Failed to check for existing variable: ${getRequest.error.message}`,
              ),
            );
          };
        }

        transaction.onerror = () => {
          console.error('Transaction error:', transaction.error);
          reject(
            new Error(
              `Transaction failed: ${transaction.error?.message || 'Unknown error'}`,
            ),
          );
        };
      } catch (error) {
        console.error('Error in saveVariable:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error initializing database for saveVariable:', error);
    throw error;
  }
}

// Delete a variable
export async function deleteVariable(id) {
  if (!db) {
    await initVariablesDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([VARIABLES_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(VARIABLES_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Clear all variables
export async function clearAllVariables() {
  if (!db) {
    await initVariablesDB();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([VARIABLES_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(VARIABLES_STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
