function ConnectorList({
  connectors,
  selectedConnector,
  onSelect,
  connectorStatuses,
}) {
  return (
    <ul className="connector-list">
      {connectors.map((connector) => {
        const status = connectorStatuses[connector.id];
        const isDone = status?.status === 'done';

        return (
          <li
            key={connector.id}
            className={`connector-item ${
              selectedConnector?.id === connector.id ? 'active' : ''
            } ${isDone ? 'done' : ''}`}
            onClick={() => onSelect(connector)}
          >
            <span className="connector-name">{connector?.directory}</span>
            {isDone && <span className="status-badge">✓</span>}
          </li>
        );
      })}
    </ul>
  );
}

export default ConnectorList;
