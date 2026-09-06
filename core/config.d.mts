export interface PaletteConfig{version:1;name:string;style:'minimal'|'bold'|'editorial'|'bento';colors:{background:string;accent:string;text:string};title:string;subtitle:string}
export const slideStyles:readonly ['minimal','bold','editorial','bento'];
export const defaultConfig:PaletteConfig;
export function normalizeConfig(input:unknown):PaletteConfig;
