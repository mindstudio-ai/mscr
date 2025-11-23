import { useState, useEffect } from 'react';
import ConnectorList from './components/ConnectorList';
import ConnectorForm from './components/ConnectorForm';
import VariablesManager from './components/VariablesManager';
import { initDB, getAllConnectorStatuses } from './utils/indexedDB';

function App() {
  const [connectors, setConnectors] = useState([]);
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [connectorStatuses, setConnectorStatuses] = useState({});
  const [showVariablesManager, setShowVariablesManager] = useState(false);

  useEffect(() => {
    loadConnectors();
    loadStatuses();
  }, []);

  // Keyboard shortcut to open Variables Manager (Ctrl/Cmd + V)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !e.shiftKey) {
        // Only open if not typing in an input
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowVariablesManager(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Don't auto-sync on page load - only load from Google Sheets
  // Sync only happens when user explicitly updates a status

  const loadStatuses = async () => {
    try {
      await initDB();
      // getAllConnectorStatuses() now loads from Google Sheets first (primary source)
      // then caches in IndexedDB
      const statuses = await getAllConnectorStatuses();
      setConnectorStatuses(statuses);
      return statuses;
    } catch (error) {
      console.error('Failed to load connector statuses:', error);
      return {};
    }
  };

  const updateConnectorStatus = (connectorId, status, comment) => {
    // Note: saveConnectorStatus() already syncs to Google Sheets
    // This just updates local state
    setConnectorStatuses((prev) => ({
      ...prev,
      [connectorId]: {
        connectorId,
        status,
        comment,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const syncToGoogleSheet = async (statuses = null) => {
    try {
      const statusesToSync = statuses || connectorStatuses;
      await fetch('/api/sync-to-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statuses: statusesToSync,
        }),
      });
    } catch (error) {
      console.error('Failed to sync to Google Sheet:', error);
      // Don't show error to user, just log it
    }
  };

  const syncConnectorToSheet = async (connectorId, status) => {
    try {
      const connector = connectors.find((c) => c.id === connectorId);
      if (!connector) {
        console.warn(
          `Connector ${connectorId} not found for Google Sheet sync`,
        );
        return;
      }

      await fetch('/api/update-connector-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectorId,
          status,
        }),
      });
    } catch (error) {
      console.error('Failed to update connector in Google Sheet:', error);
      // Don't show error to user, just log it
    }
  };

  const loadConnectors = async () => {
    try {
      const response = await fetch('/api/connectors');
      const data = await response.json();
      setConnectors(data);
      if (data.length > 0) {
        setSelectedConnector(data[0]);
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Failed to load connectors:', error);
      setLoading(false);
      return [];
    }
  };

  const filteredConnectors = connectors.filter(
    (connector) =>
      connector?.directory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector?.id?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const doneCount = Object.values(connectorStatuses).filter(
    (s) => s?.status === 'done',
  ).length;
  const stats = {
    total: connectors.length,
    done: doneCount,
    pending: connectors.length - doneCount,
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading connectors...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1>🔌 Smartsheet Connector Tester</h1>
            <p>Test and verify all Smartsheet connectors</p>
          </div>
          <button
            onClick={() => setShowVariablesManager(true)}
            className="variables-button"
            title="Open Variables Manager"
          >
            📋 Variables
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <h2>Connectors ({connectors.length})</h2>
          <div
            style={{
              marginBottom: '15px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}
            >
              <span>✓ Done:</span>
              <strong style={{ color: '#28a745' }}>{stats.done}</strong>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}
            >
              <span>⏳ Pending:</span>
              <strong style={{ color: '#ffc107' }}>{stats.pending}</strong>
            </div>
            <div
              style={{
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #dee2e6',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Progress:</span>
                <strong>
                  {stats.total > 0
                    ? Math.round((stats.done / stats.total) * 100)
                    : 0}
                  %
                </strong>
              </div>
              <div
                style={{
                  marginTop: '5px',
                  height: '6px',
                  background: '#e9ecef',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#28a745',
                    width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search connectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ConnectorList
            connectors={filteredConnectors}
            selectedConnector={selectedConnector}
            onSelect={setSelectedConnector}
            connectorStatuses={connectorStatuses}
          />
        </div>

        <div className="content-area">
          {selectedConnector ? (
            <ConnectorForm
              connector={selectedConnector}
              connectorStatus={connectorStatuses[selectedConnector.id]}
              onStatusUpdate={updateConnectorStatus}
            />
          ) : (
            <div>Select a connector to test</div>
          )}
        </div>
      </div>

      {/* Floating Variables Button */}
      <button
        onClick={() => setShowVariablesManager(true)}
        className="floating-variables-button"
        title="Open Variables Manager (Ctrl/Cmd + V)"
      >
        📋
      </button>

      <VariablesManager
        isOpen={showVariablesManager}
        onClose={() => setShowVariablesManager(false)}
      />
    </div>
  );
}

export default App;
