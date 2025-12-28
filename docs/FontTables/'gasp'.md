# "gasp"表

## 一般表信息

此表包含描述在支持灰度的设备上呈现字体时的首选光栅化技术的信息。 该表对于单色设备也有一些用处，单色设备可以使用该表来关闭非常大或非常小的尺寸的提示，以提高性能。

在非常小的尺寸下，通常可以通过在不使用提示的情况下以灰度渲染字形来实现灰度设备上的最佳外观。 在中间尺寸下，暗示和单色渲染通常会产生最佳外观。 对于大尺寸，暗示和灰度渲染的组合通常会产生最佳外观。

如果字体中不存在"gasp"表，TrueType 缩放器将应用默认规则来决定如何在灰度设备上呈现字形。

"gasp"表由一个标头和后面的 GASPRange 记录分组组成：

**gasp 表**

|类型|名称|描述|
|-|-|-|
|UInt16| version| 版本号（设置为0）|
|UInt16| numRanges| 要遵循的记录数|
|GASPRange| GaspRange[numRanges]| 按 ppem 排序|

每个 GASPRange 记录如下所示：

|类型|名称|描述|
|-|-|-|
|UInt16| rangeMaxPPEM| 范围上限，以 PPEM 为单位|
|UInt16| rangeGaspBehavior| 描述所需光栅器行为的标志。|

rangeGaspBehavior 标志有两个标志：

|标志|含义|
|-|-|
|kGASPGridFit (1)|使用网格拟合|
|kGASPDoGray (2)|使用灰度渲染|

位标志集将来可能会扩展。

rangeGaspBehavior 当前定义的四个值将具有以下用途：

|标志|值|含义|
|-|-|-|
|kGASPDoGray| 0x0002| 小尺寸，通常 ppem<9|
|kGASPGridFit| 0x0001| 中等大小，通常 9<=ppem<=16|
|kGASPDoGray | kGASPDoGray | kGASPDoGray kGASPGridFit| 0x0003| 大尺寸，通常 ppem>16|
|(neither)| 0x0000| 对于非常大的尺寸是可选的，通常 ppem>2048|

GaspRange[] 数组中的记录必须按 rangeMaxPPEM 值递增的顺序排序。 最后一条记录应使用 0xFFFF 作为 rangeMaxPPEM 的标记值，并应描述大于前一条记录上限的所有大小所需的行为。 如果“gasp”中的唯一条目是 0xFFFF 保护值，则所描述的行为将用于所有大小。

## "gasp" 表示例
|字段|值|含义|
|-|-|-|
|版本|0x0000|
|数字范围| 0x0003|
|范围[0]，标志| 0x0008 0x0002| ppem<=8，仅限灰度
|范围[1]，标志| 0x0010 0x0001| 9<=ppem<=16，仅网格拟合
|范围[2]，标志| 0xFFFF 0x0003| 16<ppem，网格拟合和灰度

