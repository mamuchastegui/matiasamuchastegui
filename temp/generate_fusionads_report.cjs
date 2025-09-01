const fs = require('fs');
const path = require('path');
const BASE_DIR = path.join(process.cwd(), 'src', 'assets', 'Proyectos Fusion');
const REPORT_DIR = path.join(process.cwd(), '.codex', 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'fusionads_videos_report.csv');
function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, {recursive:true}); }
function isLfspointer(filePath){
  try { const buf = fs.readFileSync(filePath); const head = buf.subarray(0, Math.min(200, buf.length)).toString('utf8');
    return buf.length<300 && head.startsWith('version https://git-lfs.github.com/spec/v1');
  } catch { return false; }
}
function main(){
  ensureDir(REPORT_DIR);
  const entries = fs.existsSync(BASE_DIR)
    ? fs.readdirSync(BASE_DIR, {withFileTypes:true}).filter(d=>d.isFile() && d.name.toLowerCase().endsWith('.mp4')).map(d=>path.join('src','assets','Proyectos Fusion', d.name))
    : [];
  const lines = ['filename,duration,size,bitrate,status'];
  for (const rel of entries){
    const abs = path.join(process.cwd(), rel);
    let size = 0; try { size = fs.statSync(abs).size; } catch{}
    const status = isLfspointer(abs) ? 'PUNTERO_LFS' : 'OK';
    lines.push(`${rel},NA,${size},NA,${status}`);
    console.log(`[Report] ${rel} size=${size} status=${status}`);
  }
  fs.writeFileSync(REPORT_PATH, lines.join('\n'));
  console.log(`[Report] CSV generado: ${REPORT_PATH}`);
}
main();

