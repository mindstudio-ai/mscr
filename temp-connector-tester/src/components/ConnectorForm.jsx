import { useState, useEffect } from 'react';
import { saveConnectorStatus } from '../utils/indexedDB';

function ConnectorForm({ connector, connectorStatus, onStatusUpdate }) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    // Initialize form data with default values
    const initialData = {};
    connector.configuration?.forEach((section) => {
      section.items?.forEach((item) => {
        if (item.variable) {
          initialData[item.variable] = item.defaultValue || '';
        }
        if (item.variable === 'outputVariable') {
          initialData[item.variable] = "out";
        }
      });
    });
    setFormData(initialData);
    setResult(null);
    setError(null);

    // Load status and comment
    if (connectorStatus) {
      setIsDone(connectorStatus.status === 'done');
      setComment(connectorStatus.comment || '');
      setShowCommentBox(!!connectorStatus.comment);
    } else {
      setIsDone(false);
      setComment('');
      setShowCommentBox(false);
    }
  }, [connector, connectorStatus]);

  const handleChange = (variable, value) => {
    setFormData((prev) => ({
      ...prev,
      [variable]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/test-connector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectorId: connector.id,
          inputs: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to test connector');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (item) => {
    const value = formData[item.variable] || '';

    if (item.type === 'text' && item.textOptions?.type === 'multiline') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleChange(item.variable, e.target.value)}
          placeholder={item.placeholder}
          required={item.required}
        />
      );
    }

    if (item.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => handleChange(item.variable, e.target.value)}
          required={item.required}
        >
          <option value="">Select...</option>
          {item.selectOptions?.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (item.type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={value === true || value === 'true'}
          onChange={(e) => handleChange(item.variable, e.target.checked)}
        />
      );
    }

    if (item.type === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(item.variable, e.target.value)}
          placeholder={item.placeholder}
          required={item.required}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(item.variable, e.target.value)}
        placeholder={item.placeholder}
        required={item.required}
      />
    );
  };

  const handleMarkDone = async () => {
    const newStatus = isDone ? 'pending' : 'done';
    setIsDone(newStatus === 'done');

    try {
      await saveConnectorStatus(connector.id, newStatus, comment);
      onStatusUpdate(connector.id, newStatus, comment);
    } catch (error) {
      console.error('Failed to save status:', error);
    }
  };

  const handleCommentSave = async () => {
    try {
      await saveConnectorStatus(connector.id, isDone ? 'done' : 'pending', comment);
      onStatusUpdate(connector.id, isDone ? 'done' : 'pending', comment);
      setShowCommentBox(false);
    } catch (error) {
      console.error('Failed to save comment:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0 }}>{connector.name}</h2>
          <p style={{ color: '#666', marginTop: '5px', marginBottom: 0 }}>
            {connector.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            className={`btn ${isDone ? 'btn-success' : 'btn-outline'}`}
            onClick={handleMarkDone}
            style={{
              background: isDone ? '#28a745' : 'transparent',
              color: isDone ? 'white' : '#28a745',
              border: '1px solid #28a745',
            }}
          >
            {isDone ? '✓ Done' : 'Mark as Done'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            {showCommentBox ? 'Hide' : 'Add'} Comment
          </button>
        </div>
      </div>

      {showCommentBox && (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment about this connector..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCommentSave}
            >
              Save Comment
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCommentBox(false);
                if (connectorStatus) {
                  setComment(connectorStatus.comment || '');
                } else {
                  setComment('');
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment && !showCommentBox && (
        <div style={{ marginBottom: '20px', padding: '10px', background: '#e7f3ff', borderRadius: '4px', borderLeft: '3px solid #007bff' }}>
          <strong>Comment:</strong> {comment}
          <button
            type="button"
            onClick={() => setShowCommentBox(true)}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Edit
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {connector.configuration?.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>
              {section.title}
            </h3>
            {section.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="form-group">
                <label>
                  {item.label}
                  {item.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                {renderField(item)}
                {item.helpText && (
                  <div className="help-text">{item.helpText}</div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="button-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Testing...' : 'Test Connector'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setResult(null);
              setError(null);
            }}
          >
            Clear Results
          </button>
        </div>
      </form>

      {error && (
        <div className="result-area">
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {result && (
        <div className="result-area">
          <h3>Result</h3>
          <div className="result-content">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectorForm;

