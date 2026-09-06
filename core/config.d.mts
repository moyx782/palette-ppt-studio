export interface PaletteConfig{version:1;name:string;colors:{background:string;accent:string;text:string};title:string;subtitle:string}
export const defaultConfig:PaletteConfig;
export function normalizeConfig(input:unknown):PaletteConfig;
