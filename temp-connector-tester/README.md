# Smartsheet Connector Tester

A temporary frontend application to test all Smartsheet connectors.

## Features

- 📋 List all 185+ Smartsheet connectors
- 🔍 Search connectors by name
- 📝 Auto-generate forms from connector.yml files
- ✅ Test connectors with real inputs
- 📊 View results and logs

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment (optional):
```bash
# Create .env file if needed
echo "accessToken=your-smartsheet-token" > .env
```

## Running

Start both the API server and frontend:

```bash
npm run dev
```

This will start:
- API server on http://localhost:3001
- Frontend on http://localhost:3000

Open http://localhost:3000 in your browser.

## Usage

1. Browse connectors in the left sidebar
2. Search for specific connectors
3. Click on a connector to see its form
4. Fill in the required fields
5. Click "Test Connector" to execute
6. View results and logs below the form

## Note

This is a temporary testing tool. The connectors will make real API calls to Smartsheet, so ensure you have valid credentials configured.

