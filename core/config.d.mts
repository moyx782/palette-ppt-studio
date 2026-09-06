export interface PaletteConfig{version:1;name:string;style:'minimal'|'bold'|'editorial';colors:{background:string;accent:string;text:string};title:string;subtitle:string}
export const slideStyles:readonly ['minimal','bold','editorial'];
export const defaultConfig:PaletteConfig;
export function normalizeConfig(input:unknown):PaletteConfig;
