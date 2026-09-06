#!/usr/bin/env node
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {normalizeConfig,defaultConfig} from '../core/config.mjs';
import {writePresentation} from './files.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{const {values,positionals}=parseArgs({allowPositionals:true,options:{config:{type:'string'},output:{type:'string'},force:{type:'boolean'},dir:{type:'string'},help:{type:'boolean'}}});const command=positionals[0];
 if(values.help||!command){console.log('palette-ppt example\npalette-ppt validate --config palette.json\npalette-ppt generate --config palette.json --output slides.pptx [--force]\npalette-ppt install-skill [--dir PATH]');}
 else if(command==='example'){console.log(JSON.stringify(defaultConfig,null,2));}
 else if(command==='install-skill'){const dest=path.resolve(values.dir??path.join(process.env.CODEX_HOME??path.join(os.homedir(),'.codex'),'skills','palette-ppt'));await mkdir(path.dirname(dest),{recursive:true});await mkdir(dest);await cp(path.join(root,'skills/palette-ppt'),dest,{recursive:true});await writeFile(path.join(dest,'scripts/project.json'),JSON.stringify({root},null,2));console.log(JSON.stringify({installed:dest,projectRoot:root}));}
 else if(command==='validate'||command==='generate'){if(!values.config)throw new Error('缺少 --config');const data=await readFile(values.config,'utf8');if(Buffer.byteLength(data)>65536)throw new Error('配置不能超过 64 KB');const config=normalizeConfig(JSON.parse(data));if(command==='validate')console.log(JSON.stringify({valid:true,config},null,2));else{if(!values.output)throw new Error('缺少 --output');console.log(JSON.stringify(await writePresentation(config,values.output,values.force)));}}
 else throw new Error('未知命令：'+command);
}catch(e){console.error(e.message);process.exitCode=1;}
