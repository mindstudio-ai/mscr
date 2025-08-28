import express from 'express';
import { promises as fs } from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';

const app = express();
app.use(express.json({ limit: '2mb' }));

/**
 * Configure where files are written. This base directory prevents path traversal.
 * Override with BASE_DIR=/absolute/path node ...
 */
const BASE_DIR = path.resolve(process.cwd(), 'services');

// Ensure a path is safely inside BASE_DIR
function safeJoinBase(relPath: string): string {
  // Normalize incoming relative path (e.g., "my/connector" or "my\\connector")
  const joined = path.resolve(BASE_DIR, relPath);
  if (!joined.startsWith(BASE_DIR + path.sep) && joined !== BASE_DIR) {
    throw new Error('Invalid path: must resolve inside BASE_DIR');
  }
  return joined;
}

app.post('/generate', async (req, res) => {
  const { path: connectorPath, code, test, quickHelp, yaml } = req.body;

  try {
    // Resolve and create directory
    const targetDir = safeJoinBase(connectorPath);
    await mkdirp(targetDir);

    // Build file paths
    const files = {
      handler: path.join(targetDir, 'handler.ts'),
      test: path.join(targetDir, 'test.spec.ts'),
      help: path.join(targetDir, 'readme.md'),
      connector: path.join(targetDir, 'connector.yml'),
    };

    // Write files (empty strings allowed)
    await Promise.all([
      fs.writeFile(files.handler, code ?? '', 'utf8'),
      fs.writeFile(files.test, test ?? '', 'utf8'),
      fs.writeFile(files.help, quickHelp ?? '', 'utf8'),
      fs.writeFile(files.connector, yaml ?? '', 'utf8'),
    ]);

    return res.sendStatus(204);
  } catch (e: any) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, error: e?.message || 'Server error' });
  }
});

const PORT = Number(3188);
app.listen(PORT, () => {
  console.log(`File-writer API listening on http://localhost:${PORT}`);
});
