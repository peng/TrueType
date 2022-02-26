# <center>'maxp' 表</center>

## 一般表信息

'maxp' 表确定了字体的内存要求。 它以表版本号开头。 下一个条目是字体中字形的数量。 其余条目都建立了许多参数的最大值。 其中大部分是不言自明的。 然而，有一些需要澄清。

maxSizeOfInstructions 是与特定字形关联的所有指令的最大字节大小。

maxComponentElements 字段是指将用于创建复合字形的简单字形的最大数量。

maxComponentDepth 指的是用于构建最复杂的复合字形的递归级别数。 maxComponentDepth 的最大合法值为 16。如果组件中没有组件，则所有复合字形都可以视为简单，并且可以将此字段设置为值 1。

## 'maxp' 表

|类型|名称|描述|
|-|-|-|
|Fixed|version|0x00010000 (1.0)|
|uint16|numGlyphs|字体文件中字形的数量
|uint16|maxPoints|非复合字形中的点
|uint16|maxContours|非复合字形中的轮廓
|uint16|maxComponentPoints|复合字形中的点
|uint16|maxComponentContours|复合字形中的轮廓
|uint16|maxZones|设置为 2
|uint16|maxTwilightPoints|暮光地带使用的点数 (Z0)
|uint16|maxStorage|存储区域位置数量
|uint16|maxFunctionDefs|FDEF 的数量
|uint16|maxInstructionDefs|IDEF 数量
|uint16|maxStackElements|最大堆栈深度
|uint16|maxSizeOfInstructions|字形指令的字节数
|uint16|maxComponentElements|顶层引用的字形数量
|uint16|maxComponentDepth|递归级别，如果字体只有简单字形，则设置为 0
带有 PostScript 轮廓的字体（即带有 'CFF' 表的 OpenType 字体）使用 'maxp' 表的六字节版本：

**'maxp'表 PostScript OpenType 字体部分**

|类型|名称|描述|
|-|-|-|
|Fixed|version|0x00005000 (0.5)|
|uint16|numGlyphs|字体文件中字形的数量

## 依赖
“maxp”表包含字体中字形数量的计数。 每当此值更改时，也应更新依赖于它的其他表。 受影响的表包括：
* [字形位置表](./'loca'.md)（'loca'）
* [字形数据表](./'glyf'.md)（'glyf'）
* ['Zapf'](./'Zapf'.md) 表
此外，某些表包含字形索引，如果从字体中删除字形，则可能需要更新这些索引。 此类表的部分列表是：
* [字符-字形映射表](./'cmap'.md) ('cmap' character-glyph mapping table)
* [理由表](./'just'.md)（'just' justification table）
* [字距调整表](./'kern'.md)（'kern'）
* [扩展字形变形表](./'morx'.md)（'morx'）