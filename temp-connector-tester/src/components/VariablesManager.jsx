import { useState, useEffect } from 'react';
import {
  getVariables,
  saveVariable,
  deleteVariable,
} from '../utils/variablesDB';

function VariablesManager({ isOpen, onClose }) {
  const [variables, setVariables] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadVariables();
    }
  }, [isOpen]);

  const loadVariables = async () => {
    const vars = await getVariables();
    setVariables(vars);
  };

  const handleAdd = async () => {
    if (!newKey.trim() || !newValue.trim()) {
      alert('Please enter both key and value');
      return;
    }

    try {
      await saveVariable(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
      await loadVariables();
    } catch (error) {
      console.error('Error adding variable:', error);
      alert(`Failed to add variable: ${error.message || 'Unknown error'}`);
    }
  };

  const handleEdit = async (id) => {
    if (!editKey.trim() || !editValue.trim()) {
      alert('Please enter both key and value');
      return;
    }

    await saveVariable(editKey.trim(), editValue.trim(), id);
    setEditingId(null);
    setEditKey('');
    setEditValue('');
    await loadVariables();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this variable?')) {
      await deleteVariable(id);
      await loadVariables();
    }
  };

  const handleCopy = async (value, id) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  const startEdit = (variable) => {
    setEditingId(variable.id);
    setEditKey(variable.key);
    setEditValue(variable.value);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditKey('');
    setEditValue('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content variables-manager"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Variables Manager</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Add New Variable */}
          <div className="add-variable-section">
            <h3>Add New Variable</h3>
            <div className="variable-input-group">
              <input
                type="text"
                placeholder="Variable Name (e.g., accessToken)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <input
                type="text"
                placeholder="Variable Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <button onClick={handleAdd} className="add-button">
                Add
              </button>
            </div>
          </div>

          {/* Variables List */}
          <div className="variables-list-section">
            <h3>Stored Variables ({variables.length})</h3>
            {variables.length === 0 ? (
              <p className="empty-message">
                No variables stored yet. Add one above!
              </p>
            ) : (
              <div className="variables-list">
                {variables.map((variable) => (
                  <div key={variable.id} className="variable-item">
                    {editingId === variable.id ? (
                      <div className="variable-edit">
                        <input
                          type="text"
                          value={editKey}
                          onChange={(e) => setEditKey(e.target.value)}
                          className="edit-key"
                        />
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="edit-value"
                        />
                        <button
                          onClick={() => handleEdit(variable.id)}
                          className="save-button"
                        >
                          Save
                        </button>
                        <button onClick={cancelEdit} className="cancel-button">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="variable-display">
                        <div className="variable-info">
                          <span className="variable-key">{variable.key}</span>
                          <span className="variable-value">
                            {variable.value}
                          </span>
                        </div>
                        <div className="variable-actions">
                          <button
                            onClick={() =>
                              handleCopy(variable.value, variable.id)
                            }
                            className={`copy-button ${copiedId === variable.id ? 'copied' : ''}`}
                            title="Click to copy value"
                          >
                            {copiedId === variable.id ? '✓ Copied!' : '📋 Copy'}
                          </button>
                          <button
                            onClick={() => startEdit(variable)}
                            className="edit-button"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(variable.id)}
                            className="delete-button"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VariablesManager;
