import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {createPresentation} from '../core/ppt.mjs';
export async function writePresentation(config,output,force=false){if(path.extname(output).toLowerCase()!=='.pptx')throw new Error('输出文件必须使用 .pptx 扩展名');const target=path.resolve(output);const data=await createPresentation(config).write({outputType:'nodebuffer'});await mkdir(path.dirname(target),{recursive:true});await writeFile(target,data,{flag:force?'w':'wx'});return {path:target,slides:5};}
