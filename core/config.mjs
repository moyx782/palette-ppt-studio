export const defaultConfig={version:1,name:'自定义蓝',colors:{background:'#142C48',accent:'#A8D8F0',text:'#FFFFFF'},title:'让想法，\n有自己的色彩。',subtitle:'2026 品牌策略与创意提案'};
const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function normalizeConfig(input){
 if(!obj(input))throw new Error('配置必须是 JSON 对象');
 const allowed=['version','name','colors','title','subtitle'];
 for(const k of Object.keys(input))if(!allowed.includes(k))throw new Error('未知配置字段：'+k);
 if(input.version!==undefined&&input.version!==1)throw new Error('version 必须为 1');
 if(!obj(input.colors))throw new Error('需要 colors 对象');
 const colors={};for(const k of Object.keys(input.colors))if(!['background','accent','text'].includes(k))throw new Error('未知颜色字段：'+k);
 for(const k of ['background','accent','text']){const v=input.colors[k];if(typeof v!=='string'||!/^#[0-9a-f]{6}$/i.test(v))throw new Error('colors.'+k+' 必须是 #RRGGBB 颜色');colors[k]=v.toUpperCase();}
 const result={version:1,colors};for(const [k,max] of [['name',50],['title',40],['subtitle',60]]){const v=input[k]??defaultConfig[k];if(typeof v!=='string'||v.length>max||(k==='name'&&!v.trim()))throw new Error(k+' 必须是最多 '+max+' 字符的文本');result[k]=v;}return result;
}
