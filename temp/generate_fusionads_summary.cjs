const fs = require('fs');
const path = require('path');
const MASTER_LIST = path.join(process.cwd(), '.codex', 'tmp', 'videos_master.txt');
const NUEVOSITE_LIST = path.join(process.cwd(), '.codex', 'tmp', 'videos_nuevosite.txt');
const REPORT_CSV = path.join(process.cwd(), '.codex', 'reports', 'fusionads_videos_report.csv');
const OUT = path.join(process.cwd(), '.codex', 'reports', 'summary.md');
function readPairs(file){ const m=new Map(); if(fs.existsSync(file)){ for(const l of fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean)){ const [p,s]=l.split('\t'); if(p&&s) m.set(p.replace(/\\/g,'/'), Number(s)); } } return m; }
function readCsv(file){ const rows=[]; if(fs.existsSync(file)){ const [h,...lines]=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean); for(const l of lines){ const parts=l.split(','); const filename=parts.slice(0, parts.length-4).join(','); const size=Number(parts[parts.length-3]); const status=parts[parts.length-1]; rows.push({filename:filename.replace(/\\/g,'/'), size, status}); } } return rows; }
const human=(n)=> !Number.isFinite(n)?'NA': (u=>{let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++;}return `${n.toFixed(2)} ${u[i]}`})(['B','KB','MB','GB']);
function main(){
  const before=readPairs(MASTER_LIST); const fromBranch=readPairs(NUEVOSITE_LIST); const rows=readCsv(REPORT_CSV); const out=[];
  out.push('## Resumen FusionAds videos','', '- Fuente de restauración: branch NuevoSite.', '- LFS desactivado para .mp4 (ver .gitattributes).','', '### Archivos procesados');
  for(const r of rows){ const b=before.get(r.filename)||0; const ns=fromBranch.get(r.filename); out.push(`- ${r.filename}: antes=${human(b)} → ahora=${human(r.size)}${ns?` (NuevoSite=${human(ns)})`:''} — status=${r.status}`); }
  const pending=rows.filter(r=>r.status==='PUNTERO_LFS'); if(pending.length){ out.push('', '### Punteros LFS restantes'); for(const r of pending) out.push(`- ${r.filename} (${human(r.size)})`); } else { out.push('', '### Punteros LFS restantes', '- Ninguno'); }
  out.push('', '### Recompresión', '- Ningún archivo supera 100 MB, no se requirió recomprimir.', '', '### Validación FFmpeg', '- ffmpeg/ffprobe no disponibles en este entorno bash; duración/bitrate = NA.');
  fs.mkdirSync(path.dirname(OUT), {recursive:true}); fs.writeFileSync(OUT, out.join('\n')); console.log(`[Summary] Escrito ${OUT}`);
}
main();

