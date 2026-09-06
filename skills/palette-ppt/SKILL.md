---
name: palette-ppt
description: 从配色 JSON 生成五页可编辑 PPT 模板，可选极简留白、大胆撞色、编辑杂志三种版式风格，验证颜色配置，并与色页网页导入格式保持一致。用户要求用 JSON 配色制作 PPT 模板时使用。
---

使用本技能目录下的 `scripts/palette-ppt.mjs` 调用已安装的色页生成器。安装器会在 scripts/project.json 中记录项目位置；项目需保留并已运行 npm install。路径失效时请用户重新安装技能，不要猜测项目路径。

- 先运行 `node <技能目录>/scripts/palette-ppt.mjs example` 获取当前 JSON 格式。
- 配置包含 version: 1、name、colors.background / accent / text（均为 #RRGGBB），以及可选 title（40 字符以内）、subtitle（60 字符以内）。用户未提供文案时可使用默认文案，并说明使用了模板示例。
- 可选 style 字段选择基础排版模板：`minimal`（极简留白，默认）、`bold`（大胆撞色：大色块、超大章节号、色带页脚）、`editorial`（编辑杂志：衬线标题、非对称构图、细分隔线）、`bento`（网格分割：细线网格、边框单元格、主模块更大的非对称网格）。用户提到「模板」「排版」「风格」时主动询问或按其描述选择；未指定时使用 minimal。
- 将用户指定配色写入 JSON，执行 `validate --config <JSON绝对路径>`。
- 执行 `generate --config <JSON绝对路径> --output <PPTX绝对路径>`，返回实际生成文件的链接。已有文件默认不覆盖；只有用户已要求覆盖时才使用 --force。
- 当前输出固定五页：封面、章节、内容、数据、结束页，五页共用所选 style 的版式语言。数据页为示例数据，不将其描述为用户的真实业务数据。网页预览和 PPT 字体、装饰图形可能略有差异。
- 如果客户端已连接 palette-ppt MCP，也可使用 get_palette_example、validate_palette、generate_ppt 完成同一流程（config 中同样支持 style 字段）。无需同时调用 CLI 和 MCP。
