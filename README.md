# 色页 · PPT 配色工作室

网页支持 6 套主题、实时颜色调整、JSON 文件导入或粘贴、JSON 导出、封面编辑与 5 页可编辑 PPT 导出。网页与 CLI / MCP 共用 core/config.mjs 校验器和 core/ppt.mjs 生成器。

## 当前项目直接使用

需要 Node.js 22.13+，首次在项目目录运行 `npm install`。

```bash
cd palette-ppt-studio
node cli/palette-ppt.mjs example > palette.json
node cli/palette-ppt.mjs validate --config palette.json
node cli/palette-ppt.mjs generate --config palette.json --output my-template.pptx
```

已有输出默认不覆盖；需要覆盖时显式加 `--force`。默认生成五页：封面、章节、内容、示例数据、结束。它生成 `.pptx`，不生成 PowerPoint `.potx` 格式。文字与图形可编辑，浏览器预览和 PowerPoint 的字体及装饰图形可能略有差异。

## JSON 格式

```json
{
  "version": 1,
  "name": "品牌绿",
  "colors": {
    "background": "#153E35",
    "accent": "#B9E1BC",
    "text": "#FFFFFF"
  },
  "title": "让想法，\n有自己的色彩。",
  "subtitle": "2026 品牌策略与创意提案"
}
```

`colors` 的三个字段必填，均使用六位 HEX。其他字段可省略；省略时使用示例默认值。name 最多 50 字符，title 最多 40 字符，subtitle 最多 60 字符；未知字段会报错。上传文件最大 64 KB。导入失败保持当前预览不变。

## MCP（本地 stdio）

```bash
codex mcp add palette-ppt -- node /absolute/path/to/palette-studio/cli/mcp.mjs
```

通用支持 stdio 的客户端配置（路径改为实际安装目录）：

```json
{
  "mcpServers": {
    "palette-ppt": {
      "command": "node",
      "args": ["/absolute/path/to/palette-studio/cli/mcp.mjs"]
    }
  }
}
```

工具：`get_palette_example` 返回配置，`validate_palette` 接受 `{ "config": ... }`，`generate_ppt` 接受 `{ "config": ..., "outputPath": "/绝对路径/template.pptx", "overwrite": false }`。文件保存在 MCP 服务所在的电脑，服务不会自动安装到客户端。托管网页不是远程 MCP 地址。

MCP 使用官方 SDK 的 [stdio transport](https://ts.sdk.modelcontextprotocol.io/server)。Codex 接入参考 [官方 MCP 文档](https://developers.openai.com/codex/mcp)。

## 安装为 Codex 技能

```bash
node /absolute/path/to/palette-studio/cli/palette-ppt.mjs install-skill
```

默认安装到 `$CODEX_HOME/skills/palette-ppt`，未设置 CODEX_HOME 时为 `~/.codex/skills/palette-ppt`。已有目录不覆盖；也可用 `--dir /目标目录/palette-ppt` 指定位置。安装器记录当前项目位置，不复制 node_modules，因此需保留项目目录及依赖。移动项目后重新安装。重新打开 Codex 后可使用：

> $palette-ppt 使用这份 JSON 生成 PPT 模板，保存到指定目录。

安装命令需要由使用者执行。技能格式参考 [官方技能文档](https://developers.openai.com/codex/skills)。

## 可移植工具包

网页安装指南提供 `palette-ppt-toolkit.tar.gz`，包含独立 CLI、MCP、生成器、技能和示例。解压后在工具包目录运行 `npm install`，再按上面的方法调用；把示例中的项目路径换成工具包绝对路径。无需安装整个网页项目。

## 开发与验证

`npm run dev` 启动网页；`npm run build` 构建；`npx tsc --noEmit` 类型检查；`node tests/integrations.mjs` 验证 CLI/MCP/技能、错误路径和 PPTX 内容。测试只写入临时目录。

未进行浏览器交互自动化与 PowerPoint 渲染比对。页面附带的实验性 WebMCP 配色接口因当前没有验证上下文而未验证；独立 stdio MCP 已通过真实客户端集成测试。

## GitHub Pages 与自动发布

在线地址：https://moyx782.github.io/palette-ppt-studio/

工作流 `.github/workflows/pages.yml` 在 main 推送时运行依赖安装、类型检查、CLI/MCP/技能集成测试、静态构建，然后部署到 GitHub Pages。拉取请求只检查和构建，不部署；也可从 Actions 手动运行。工作流使用仓库内置 GITHUB_TOKEN，不需要添加额外密钥。

本地静态构建：`npm run build:pages`，输出到 dist-pages。`npm run preview:pages` 预览构建结果。默认路径为 /palette-ppt-studio/，使用环境变量 PAGES_BASE_PATH 可覆盖。Fork 到新仓库时，在仓库 Settings → Pages 中将 Source 设为 GitHub Actions，推送到 main 即可；CI 自动使用仓库名作为子路径。

GitHub Pages 托管的是浏览器应用。配色导入与 PPT 导出在浏览器执行；CLI 和 stdio MCP 需下载后在本机运行。

## 新增主题配色

先调整背景色、强调色和文字色（也可导入 JSON），点击「新增主题配色」，输入名称后保存。新主题会加入主题列表并立即应用。空名称和重名会提示错误。自定义主题保存在当前浏览器的 localStorage 中，刷新后仍可切换；不同设备或域名之间需使用 JSON 导出、导入，再保存为主题。浏览器禁用存储时会提示仅本次有效。
