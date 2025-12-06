import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  title: 'font 文件格式文档',
  description: '',
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebar: [
      {
        text: 'font 文件格式文档',
        link: '/',
        collapsible: false,
        children: [
          { text: '数字化字体设计', link: '/Digitizing_Letterform_Designs' },
          { text: '将轮廓转换为 TrueType 格式', link: '/Converting_Outlines' },
          { text: '字体教程', link: '/instructing_fonts' },
          { text: '字体引擎', link: '/Font_Engine' },
          { text: '字体功能注册表', link: '/Font_Feature_Registry' },
          { text: '字符代码/字形映射', link: '/Glyph_Mappings' },
          { text: '图形状态', link: '/Graphics_State' },
          { text: '指令系统', link: '/Instruction_Set' },
          { text: '指令集摘要', link: '/Instruction_Set_Summary' },
          { text: '专有名词解释', link: '/words' },
          {
            text: '字体表',
            link: '/FontTables/FontTables',
            collapsible: true,
            children: [
              { text: "关于Apple Advanced Typography字体", link: "/FontTables/AboutAAT" },
              { text: "字体表", link: "/FontTables/FontTables" },
              { text: "特殊表", link: "/FontTables/SpecialTable" },
              { text: '\"EBSC\" 表', link: "/FontTables/'EBSC'" },
              { text: '“OS/2”表', link: "/FontTables/'OS2'" },
              { text: '“Zapf”表', link: "/FontTables/'Zapf'" },
              { text: "'acnt' 表", link: "/FontTables/'acnt'" },
              { text: "'ankr'表", link: "/FontTables/'ankr'" },
              { text: "'avar' 表", link: "/FontTables/'avar'" },
              { text: '\"bdat\"表', link: "/FontTables/'bdat'" },
              { text: '\"bhed\"表', link: "/FontTables/'bhed'" },
              { text: '\"bloc\" 表', link: "/FontTables/'bloc'" },
              { text: '\"bsln\" 表', link: "/FontTables/'bsln'" },
              { text: "'cmap' 表", link: "/FontTables/'cmap'" },
              { text: '\"cvar\" 表', link: "/FontTables/'cvar'" },
              { text: '\"CVT\" 表', link: "/FontTables/'cvt'" },
              { text: '\"fdsc\" 表', link: "/FontTables/'fdsc'" },
              { text: '\"特征\" 表', link: "/FontTables/'feat'" },
              { text: '“fmtx”表', link: "/FontTables/'fmtx'" },
              { text: '\"fond\" 的表', link: "/FontTables/'fond'" },
              { text: '\"fpgm\" 表', link: "/FontTables/'fpgm'" },
              { text: '\"fvar\"表', link: "/FontTables/'fvar'" },
              { text: '\"gcid\" 表', link: "/FontTables/'gcid'" },
              { text: "'glyf' 表 (glyph data table)", link: "/FontTables/'glyf'" },
              { text: '\"gvar\" 表', link: "/FontTables/'gvar'" },
              { text: '\"hdmx\" 表', link: "/FontTables/'hdmx'" },
              { text: '“头”表', link: "/FontTables/'head'" },
              { text: '\"hhea\" 表', link: "/FontTables/'hhea'" },
              { text: '\"hmtx\" 表', link: "/FontTables/'hmtx'" },
              { text: '"just"表', link: "/FontTables/'just'" },
              { text: "'kern' 表", link: "/FontTables/'kern'" },
              { text: '\"kerx\"表', link: "/FontTables/'kerx'" },
              { text: '\"lcar\" 表', link: "/FontTables/'lcar'" },
              { text: "'loca'表 (glyph location table)", link: "/FontTables/'loca'" },
              { text: '“ltag”表', link: "/FontTables/'ltag'" },
              { text: "'maxp' 表", link: "/FontTables/'maxp'" },
              { text: 'meta 表', link: "/FontTables/'meta'" },
              { text: "'mort' 表", link: "/FontTables/'mort'" },
              { text: 'morx 表', link: "/FontTables/'morx'" },
              { text: '“名称”表', link: "/FontTables/'name'" },
              { text: '“opbd”表', link: "/FontTables/'opbd'" },
              { text: '“post”表', link: "/FontTables/'post'" },
              { text: '“prep”表', link: "/FontTables/'prep'" },
              { text: '“prop”表', link: "/FontTables/'prop'" },
              { text: '“sbix”表', link: "/FontTables/'sbix'" },
              { text: '“trak”表', link: "/FontTables/'trak'" },
              { text: '“vhea”表', link: "/FontTables/'vhea'" },
              { text: '“vmtx”表', link: "/FontTables/'vmtx'" },
              { text: '“xref”表', link: "/FontTables/'xref'" },
              { text: '\"gasp\"表', link: "/FontTables/‘gasp'" },
            ]
            }
        ]
      }
    ]
  })
})