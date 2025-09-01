/*
  Copia videos FusionAds (.mp4) a Desktop\Upwork-Proyectos\Proyectos Fusion, reemplazando destinos corruptos.
  Criterio de corrupción: tamaño < 300 bytes o puntero LFS (encabezado 'version https://git-lfs.github.com/spec/v1').
*/
const fs = require('fs');
const path = require('path');

function isLfspointer(absPath) {
  try {
    const buf = fs.readFileSync(absPath);
    if (buf.length < 300) {
      const head = buf.subarray(0, Math.min(200, buf.length)).toString('utf8');
      return head.startsWith('version https://git-lfs.github.com/spec/v1');
    }
  } catch (_) {}
  return false;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  const repoCwd = process.cwd();
  const srcDir = path.join(repoCwd, 'src', 'assets', 'Proyectos Fusion');
  const desktop = path.join(process.env.USERPROFILE || '', 'Desktop');
  const destBase = path.join(desktop, 'Upwork-Proyectos', 'Proyectos Fusion');

  if (!fs.existsSync(srcDir)) {
    console.error(`[Copy] ERROR: No existe el directorio de origen: ${srcDir}`);
    process.exit(1);
  }
  ensureDir(destBase);

  const entries = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.mp4'))
    .map((d) => ({ name: d.name, src: path.join(srcDir, d.name), dest: path.join(destBase, d.name) }));

  let copied = 0;
  let skipped = 0;
  let errors = 0;

  console.log(`[Copy] Origen: ${srcDir}`);
  console.log(`[Copy] Destino base: ${destBase}`);

  for (const f of entries) {
    let srcSize = 0;
    try { srcSize = fs.statSync(f.src).size; } catch (_) {}

    let destExists = fs.existsSync(f.dest);
    let destSize = destExists ? fs.statSync(f.dest).size : 0;
    const destIsPointer = destExists && isLfspointer(f.dest);
    const destCorrupt = !destExists || destSize < 300 || destIsPointer;

    if (destCorrupt) {
      try {
        ensureDir(path.dirname(f.dest));
        fs.copyFileSync(f.src, f.dest);
        console.log(`[Copy][OK] ${f.name}  ${srcSize} B  →  ${f.dest}`);
        copied++;
      } catch (e) {
        console.error(`[Copy][ERR] ${f.name} → ${f.dest} :: ${e.message}`);
        errors++;
      }
    } else {
      console.log(`[Copy][SKIP] ${f.name}  destino ya válido (${destSize} B)`);
      skipped++;
    }
  }

  console.log(`[Copy] Resultado: copied=${copied}, skipped=${skipped}, errors=${errors}`);
}

main();

