module.exports = {
  title: 'font 文件格式文档',
  description: '',
  themeConfig: {
    sidebar: [
      {
        title: 'font 文件格式文档',
        path: '/',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          {
            title: '数字化字体设计',
            path: '/Digitizing_Letterform_Designs'
          },
          {
            title: '字体教程',
            path: '/instructing_fonts',
            // collapsable: true,
            sidebarDepth: 2,
          },
          {
            title: '字体引擎',
            path: '/Font_Engine'
          },
          {
            title: '字体表',   // 必要的
            path: '/FontTables/FontTables',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
              ['/FontTables/AboutAAT', '关于 AAT'],
              ['/FontTables/SpecialTable', '特殊表'],
              [`/FontTables/'acnt'`, `'acnt'`],
              [`/FontTables/'ankr'`, `'ankr'`],
              [`/FontTables/'avar'`, `'avar'`],
              // [`/FontTables/'bdat'`, `'bdat'`],
              [`/FontTables/'glyf'`, `'glyf'`],
              [`/FontTables/'head'`, `'head'`],
              [`/FontTables/'kern'`, `'kern'`],
              [`/FontTables/'loca'`, `'loca'`],
              [`/FontTables/'maxp'`, `'maxp'`],
              [`/FontTables/'cmap'`, `'cmap'`],
            ]
          }
        ]
      },
      
    ]
  }
}