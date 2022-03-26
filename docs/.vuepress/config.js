module.exports = {
  title: 'font 文件格式文档',
  description: '',
  themeConfig: {
    sidebar: [
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
        ]
      }
    ]
  }
}