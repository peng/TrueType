# 'ankr'表

## 介绍

锚点表（标记名称：'ankr'）提供了一种定义锚点的方法，即给定字形的坐标空间内的点，与用于渲染该字形的控制点无关。 锚点与[“ kerx”](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6kerx.html)结合使用。

“ ankr”表以标题开头：

### “锚定”表头

|类型|名称|描述|
|-|-|-|
|UInt16|version|版本号（设置为零）|
|UInt16|flags|Flags（当前未使用；设置为零）|
|UInt32|lookupTableOffset|偏移表的查询表； 当前这始终是0x0000000C|
|UInt32|glyphDataTableOffset|字形数据表的偏移量|

