# 字体表

## 介绍

本章介绍构成TrueType字体文件的表，包括对TrueType核心规范的AAT扩展。 不包括特定于OpenType的表的文档，甚至不包括OS X和iOS支持的文档。 有关这些表的更多信息，请参见OpenType规范。

表1描述了所有平台上TrueType字体文件中使用的数据类型。

除了必须首先出现在字体文件中的字体目录之外，构成字体的表可以按任何顺序出现。 为了方便访问本章介绍的信息，表以字母顺序描述。

## 数据类型

除标准整数数据类型外，TrueType字体格式还使用以下内容：

表1：`'sfnt'` 数据类型

|数据类型|描述|
|-|-|
|`shortFrac`|16位带符号小数|
|`Fixed`|16.16位带符号的定点数|
|`FWord`|16位带符号整数，描述FUnit中的数量，即em空间中最小的可测量距离|
|`uFWord`|16位无符号整数，描述FUnit中的数量，即em空间中最小的可测量距离。|
|`F2Dot14`|16位带符号固定数，低14位代表小数。|
|`longDateTime`|自1904年1月1日午夜12:00以来，日期的长内部格式，以秒为单位。它表示为带符号的64位整数。|

**注意：** shortFrac是一个int16_t，其偏差为14(小数位宽为14)。这意味着它可以表示1.999（0x7fff）和-2.0（0x8000）之间的数字。 1.0存储为16384（0x4000），-1.0存储为-16384（0xc000）。

## TrueType字体文件：概述

TrueType字体文件由一系列串联的表组成。 表格是一个单词序列。 每个表必须长对齐并在必要时用零填充。

这些表中的第一个是字体目录，这是一个特殊的表，可以方便地访问字体中的其他表。 该目录后面是包含字体数据的一系列表。 这些表可以按任何顺序出现。 所有字体都需要某些表格。 其他选项是可选的，具体取决于特定字体的预期功能。

这些表的名称称为标签。 标签的类型为uint32。 当前定义的标签名称由四个字符组成。 少于四个字符的标记名称带有尾随空格。 当标签名称以文本形式显示时，它们会用双引号引起来。

所需的表必须出现在任何有效的TrueType字体文件中。 所需的表及其标签名称如表2所示。

表2：必需的表

|标签|表|
|-|-|
|`'cmap'`|字符到字形映射|
|`'glyf'`|字形数据|
|`'head'`|字体头|
|`'hhea'`|水平头|
|`'hmtx'`|水平指标|
|`'loca'`|位置索引|
|`'maxp'`|最大轮廓|
|`'name'`|命名|
|`'post'`|后记|

**警告！**  
Apple区分“ TrueType字体”（指一种特定的字体轮廓定义技术）和“ sfnt内置字体”，该字体指的是与TrueType字体使用相同包装格式的任何字体：对存在的任何表使用相同的目录结构和相同的表格式和含义。

这是一个重要的区别，因为Apple在OS X和iOS上支持其他种类的sfnt字体，尤其是bitmap-only字体和OpenType字体。非正式地，人们经常将任何sfnt容纳的字体称为“ TrueType字体”，但是严格来说这是不准确的。

表2中列出的“必需”表*仅对于TrueType字体是必需的。*  sfnt字体的其他变体可能没有它们。 例如，bitmap-only包含sfnt的字体没有“ hmtx”，“ hhea”或“ head”表。 Apple的CoreText渲染系统用于Unicode编码的文本，CoreText确实要求任何sfnt字体都必须具有“ cmap”和“ name”表。

*对于字体供应商：* 如果不确定是否应为non-TrueType sfnt-housed 字体包括一个特定的表，通常可以安全地包含它，或者可以与Apple联系以获取建议。

*对于字体用户：* 切勿假定OS X上的字体中存在任何特定的表。字体可能是非TrueType sfnt存放的字体，并且缺少某些TrueType必需的表。 此外，字体可能格式不正确，但尚未安装。 如果您使用的字体缺少所需的表，请提供适当的错误处理。

根据给定字体文件的预期功能，可能需要可选表。 表3列出了可选表及其标记名。“ hdmx”表仅在Macintosh平台上使用。 “ OS / 2”表是该平台上要使用的字体所必需的，但出现在可选表中，因为并非所有TrueType字体文件都需要该表。

Apple Advanced Typography（AAT）表与Apple的CoreText的行布局功能一起使用。

Additional可以定义其他表来支持其他平台，例如OpenType，或提供将来的扩展。 这些表的标签必须注册。 请与Apple开发人员技术支持联系，以获取有关注册过程的信息。 由所有小写字母组成的标签名称保留供Apple使用。

可以定义其他表来支持其他平台，例如OpenType，或提供将来的扩展。 这些表的标签必须注册。 请与Apple开发人员技术支持联系，以获取有关注册过程的信息。 由所有小写字母组成的标签名称保留供Apple使用。

**表3：** 可选表

|标签|表|
|-|-|
|'cvt '|控制值|
|'fpgm'|字体程序|
|'hdmx'|水平设备指标|
|'kern'|字距调整|
|'OS/2'|OS/2|
|'prep'|控制值程序|

## 字体目录

字体目录（表的第一部分）是字体文件内容的指南。 它提供访问其他表中的数据所需的信息。 该目录由两部分组成：offset子表和table目录。 offset子表记录字体中的表数，并提供可快速访问目录表的偏移信息(offset information)。 表目录由一系列输入项组成，字体中的每个表均包含一个。 表目录由一系列入口组成，每个入口对应字体中的一张表(The table directory consists of a sequence of entries, one for each table in the font.)。

**offset 子表**

表4中记录的offset子表以字体的缩放器类型(scaler type)开头。以下是'sfnt'中标记表的数量。表目录本身和任何子表均不包括在内。 searchRange，entrySelector和rangeShift的条目用于促进随后的表目录的快速二进制搜索。 除非字体具有大量表，否则顺序搜索将足够快。

如果需要更快的搜索，最容易对许多项进行二进制搜索，即为2的幂。 这使得可以通过移动将要搜索的项目数量减少一半。 剩余的偏移量子表条目应设置如下：
* searchRange是小于或等于表中项目数的2的最大幂，即可以轻松搜索的最大项目数。
* rangeShift是项数减去searchRange； 也就是说，如果仅查看searchRange项目，则无法查看的项目数。
在搜索循环开始之前，将目标项目与编号为rangeShift的项目进行比较。 如果目标项目小于rangeShift，则从表的开头搜索。 如果更大，请从编号为rangeShift的项目开始搜索。
* entrySelector是log2（searchRange）。 它告诉您搜索循环需要进行多少次迭代。 （即将范围减半的次数）
请注意，searchRange，entrySelector和rangeShift都乘以16，代表目录条目的大小。

**表4：** 偏移量子表

|类型|名称(Name)|描述|
|-|-|-|
|uint32 32整型|scaler type 缩放器类型|一个标签，指示用于光栅化此字体的OFA缩放器；有关详细信息，请参阅下面的缩放器类型上的注释。|
|uint16 16整型|numTables 数字表|表的序号|
|uint16 16整型|searchRange 搜索范围|最大 2的numTables次幂*16  `2^numTables*16`|
|uint16 16整型|entrySelector 入口选择器|log2(最大 2的numTables次幂*16) `log2(2^numTables*16)`|
|uint16	16整型|rangeShift 位移范围|numTables*16-searchRange|

## 缩放器类型

OS X和iOS使用缩放器类型来确定对此字体使用哪个缩放器，即，确定如何从字体中提取字形数据。 不同的字体缩放器在TrueType字体的基本结构内包装不同的字体格式。 字体目录的偏移量子表中的缩放器类型用于指示特定字体应使用哪种缩放器。 （与TrueType字体具有相同结构的非TrueType字体被称为“ sfnt容纳的字体”。）

OS X和iOS将值'true'（0x74727565）和0x00010000识别为是指TrueType字体。 值'typ1'（0x74797031）被识别为是指sfnt包装器中包含的PostScript字体的旧样式。 值“ OTTO”（0x4F54544F）表示具有PostScript轮廓的OpenType字体（即，“ CFF”表而不是“ glyf”表）。 当前不支持其他值。

仅针对OS X或iOS生成具有TrueType轮廓的字体，建议缩放比例类型值使用'true'（0x74727565）。 Windows或Adobe产品的字体必须使用0x00010000。

## 表目录

表目录位于offset子表之后。 表目录中的条目必须按标签升序排列。 字体文件中的每个表都必须具有自己的表目录条目。 表5说明了表目录的结构。

表5：表目录

|类型|名称(Name)|描述|
|-|-|-|
|uint32 32整型|tag 标签|4-byte identifier 4字节标识符|
|uint32 32整型|checkSum |checksum for this table 该表的校验和|
|uint32 32整型|offset|offset from beginning of sfnt 从sfnt开始的偏移量|
|uint32 32整型|length|length of this table in byte (actual length not padded length) 该表的长度（以字节为单位）（实际长度未填充长度）|

表目录包含checkSum，这是一个数字，可用于验证其关联的带标签表中数据的身份和完整性。 表校验和是表中long的无符号和。 以下C函数可用于确定给定表的校验和：

```C
uint32 CalcTableChecksum(uint32 *table, uint32 numberOfBytesInTable)
	{
	uint32 sum = 0;
	uint32 nLongs = (numberOfBytesInTable + 3) / 4;
	while (nLongs-- > 0)
		sum += *table++;
	return sum;
	}
```

要计算“头”表的checkSum，该表本身包括整个字体的checkSumAdjustment条目，请执行以下操作：

* 将checkSumAdjustment设置为0。
* 计算所有表（包括“ head”表）的校验和，并将该值输入到表目录中。
* 计算整个字体的校验和。
* 从十六进制值B1B0AFBA中减去该值。
* 将结果存储在checkSumAdjustment中。
现在'head表的checkSum错误，其中包括整个字体的checkSumAdjustment条目。 那不是问题。 请勿更改。 试图验证“ head”表未更改的应用程序应通过不包括checkSumAdjustment值来计算该表的checkSum，并将结果与表目录中的条目进行比较。

表目录还包括从字体文件的开头到标签表的偏移量以及该表的长度。