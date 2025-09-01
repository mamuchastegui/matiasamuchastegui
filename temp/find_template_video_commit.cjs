const { execSync } = require('child_process');
const fs = require('fs');

try {
  const log = execSync(
    'git log NuevoSite --name-only --pretty=format:"COMMIT %H" -- "src/assets/Proyectos Fusion"',
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const lines = log.split(/\r?\n/);
  let current = '';
  let found = null;
  for (const line of lines) {
    if (line.startsWith('COMMIT ')) {
      current = line.slice(7).trim();
      continue;
    }
    const low = line.toLowerCase();
    if (low.includes('template gallery campa') && low.endsWith('.mp4')) {
      found = { commit: current, file: line.replace(/^"|"$/g, '') };
      break;
    }
  }
  if (!found) {
    console.log('[NOT_FOUND]');
    process.exit(0);
  }
  console.log(`[FOUND] ${found.commit} ${found.file}`);
} catch (e) {
  console.log('[ERROR]', e.message);
}

