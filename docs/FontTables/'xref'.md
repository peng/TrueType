# “xref”表

## 简介

“xref”（交叉引用表）表由 Apple 的字体工具 ftxdumperfuser 和 ftxenhancer 使用。ftxenhancer 允许字体设计人员使用符号名称生成“just”、“kern”和“morx”表。但是，这些名称不由表本身使用，因此在运行 ftxenhancer 时会丢失。“xref”表用于存储这些符号名称。

该表以标题开头，其结构如下：

**'xref' 表**

类型|名称|描述
|-|-|-|
|uint32_t|version|表格格式的版本，当前为 1|
|uint32_t|flags|标志，当前未使用，设置为 0|
|uint32_t|numEntries|表格中的条目数|
|uint32_t|stringOffset|从表格开头到字符串数据的偏移量|

标题后面跟着一些条目，这些条目将字体表中的数据映射到字符串：

**‘xref’ 表条目**

类型|名称|描述
|-|-|-|
|FourCharCode|tableTag|使用此条目的表的标签（当前为 'just'、'kerx' 或 'morx'）|
|int16_t|chainIndex|与此名称对应的 'morx' 链|
|int16_t|subtableIndex|与此名称对应的子表的索引|
|int16_t|tableType|与此名称对应的对象的类型。值为 0（类名）、1（状态名）、2（条目/转换名）、3（操作名）、4（列类名）和 5（行类名）。|
|int16_t|tableIndex|与此名称对应的对象的索引|
|uint16_t|stringOffset|从字符串数据的开头到此名称的偏移量|
|uint16_t|stringLength|此名称的字符串数据的长度|

对于 chainIndex、subtableIndex、tableType 和 tableIndex 字段，都可以使用 -1 作为通配符，尽管这很少适用。

字符串数据采用 UTF-8 编码。索引以零为基础。

例如，假设字体的“morx”表有一个带有四个子表的链。第四个子表是一个上下文子表，除了标准的四个类之外，还定义了两个类，这两个子表的第一个名为“myClass”。条目 { tableTag:'morx', chainIndex:0, subtableIndex:3, tableType:0, tableIndex:4 }。偏移量和长度将指示字节 6D 79 43 6C 61 73 73。请注意，tableIndex 字段会计算四个隐式类，即使它们具有标准名称。同样，状态表的数据会计算两个隐式状态“StartOfText”和“StartOfLine”。

## 警告

“xref”表通常仅用于生产目的，因此应从运输字体中删除。