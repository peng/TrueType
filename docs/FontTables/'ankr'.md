# 'ankr'表

## 介绍

简介
锚点表（标签名称：'ankr'）提供了一种定义锚点的方法——给定字形坐标空间内的点，独立于用于渲染字形的控制点。锚点与[“kerx”](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6kerx.html)一起使用。

“ ankr”表以头部开始：

'ankr'表头部

### “锚定”表头

|类型|名称|描述|
|-|-|-|
|UInt16|version|版本号（设置为零）|
|UInt16|flags|Flags（当前未使用；设置为零）|
|UInt32|lookupTableOffset|偏移表的查询表； 当前这始终是0x0000000C|
|UInt32|glyphDataTableOffset|字形数据表的偏移量|

查找表是标准的 AAT 查找表。值是从字形数据表的开头到给定字形的数据的两字节偏移量。由于 0 是此类偏移量的有效值，因此查找表中不得包含没有锚点的字形。

字形数据表是一系列字形数据条目，每个带有锚点的字形都有一个数据条目。字形数据条目的结构如下：

### “锚定”表头
|类型|名称|描述|
|-|-|-|
|UInt32|numPoints|此字形的锚点数
|UInt32[]|anchorPoints|单个锚点。每个锚点都是一个双字节有符号 x 坐标，后跟一个双字节有符号 y 坐标