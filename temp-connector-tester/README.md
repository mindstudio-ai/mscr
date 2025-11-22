# Smartsheet Connector Tester

A temporary frontend application to test all Smartsheet connectors.

## Features

- 📋 List all 185+ Smartsheet connectors
- 🔍 Search connectors by name
- 📝 Auto-generate forms from connector.yml files
- ✅ Test connectors with real inputs
- 📊 View results and logs
- 📈 **Google Sheets Integration** - All interactions are automatically synced to Google Sheets

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

3. Set up Google Sheets integration (optional but recommended):

   **Step 1: Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click on the project dropdown at the top
   - Click "New Project"
   - Enter a project name (e.g., "Connector Tester")
   - Click "Create"

   **Step 2: Enable Google Sheets API**
   - In the Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and click "Enable"

   **Step 3: Create a Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Enter a name (e.g., "connector-tester-service")
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"

   **Step 4: Create and Download Credentials**
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Select "JSON" format
   - Click "Create"
   - The `credentials.json` file will download automatically
   - **Move this file to your project directory** (`temp-connector-tester/credentials.json`)

   **Step 5: Get the Service Account Email**
   - In the service account details, copy the email address (looks like: `your-service@project-id.iam.gserviceaccount.com`)
   - You'll need this in the next step

   **Step 6: Create and Share Your Google Sheet**
   - Create a new Google Sheet (or use an existing one)
   - Click the "Share" button (top right)
   - Paste the service account email address
   - Give it "Editor" permissions
   - Click "Send"
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

   **Step 7: Set Environment Variables**
   ```bash
   export GOOGLE_SHEET_ID=your-sheet-id-here
   export GOOGLE_CREDENTIALS_PATH=./credentials.json
   ```
   
   Or create a `.env` file in the project root:
   ```bash
   GOOGLE_SHEET_ID=your-sheet-id-here
   GOOGLE_CREDENTIALS_PATH=./credentials.json
   ```

   **Alternative: Use JSON String**
   If you prefer not to store the file, you can set the credentials as an environment variable:
   ```bash
   export GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
   ```
   (Copy the entire contents of credentials.json as a single-line JSON string)

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
7. Mark connectors as "Done" and add comments - all updates sync to Google Sheets automatically

### Google Sheets Integration

When Google Sheets is configured:
- **Initial Load**: All connectors are automatically added to the "Connector Status" sheet
- **Status Updates**: When you mark a connector as "Done", it updates the Google Sheet
- **Comments**: When you add or update a comment, it syncs to Google Sheet
- **Test Logs**: All connector tests are logged to a "Test Logs" sheet with timestamps, inputs, and results

## Note

This is a temporary testing tool. The connectors will make real API calls to Smartsheet, so ensure you have valid credentials configured.

