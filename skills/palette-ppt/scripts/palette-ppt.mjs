import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
try{const {root}=JSON.parse(readFileSync(new URL('./project.json',import.meta.url),'utf8'));const r=spawnSync(process.execPath,[path.join(root,'cli/palette-ppt.mjs'),...process.argv.slice(2)],{stdio:'inherit'});if(r.error)throw r.error;process.exitCode=r.status??1;}catch(e){console.error('技能尚未安装或项目已移动，请重新运行 install-skill。',e.message);process.exitCode=1;}
