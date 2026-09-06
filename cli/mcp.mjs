#!/usr/bin/env node
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {z} from 'zod';
import path from 'node:path';
import {normalizeConfig,defaultConfig} from '../core/config.mjs';
import {writePresentation} from './files.mjs';
const server=new McpServer({name:'palette-ppt',version:'1.0.0'});
const schema=z.object({version:z.literal(1).optional(),name:z.string().min(1).max(50).optional(),colors:z.object({background:z.string().regex(/^#[0-9a-f]{6}$/i),accent:z.string().regex(/^#[0-9a-f]{6}$/i),text:z.string().regex(/^#[0-9a-f]{6}$/i)}).strict(),title:z.string().max(40).optional(),subtitle:z.string().max(60).optional(),style:z.enum(['minimal','bold','editorial','bento']).optional()}).strict();
const result=value=>({content:[{type:'text',text:JSON.stringify(value)}]});
server.registerTool('get_palette_example',{description:'返回可导入网页或生成 PPT 的 JSON 配置示例。',inputSchema:{},annotations:{readOnlyHint:true}},async()=>result(defaultConfig));
server.registerTool('validate_palette',{description:'验证配色 JSON，不写入文件。',inputSchema:{config:schema},annotations:{readOnlyHint:true}},async({config})=>result(normalizeConfig(config)));
server.registerTool('generate_ppt',{description:'在运行本 MCP 服务的本机生成 5 页可编辑 PPT。需要用户指定的绝对输出路径，默认不覆盖已有文件。',inputSchema:{config:schema,outputPath:z.string(),overwrite:z.boolean().default(false)},annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}},async({config,outputPath,overwrite})=>{try{if(!path.isAbsolute(outputPath))throw new Error('outputPath 必须是绝对路径');return result(await writePresentation(normalizeConfig(config),outputPath,overwrite));}catch(e){return {isError:true,content:[{type:'text',text:e.message}]};}});
await server.connect(new StdioServerTransport());
