# 'avar' 表

## 介绍

在绘制带有变化形式的字形时，用户指定的坐标必须从轴的最小值，默认值和最大值定义的空间映射到-1.0、0和1.0的归一化空间。 轴变化表（标记：'avar'）允许字体修改轴值和这些归一化值（表示为shortFrac值）之间的映射。 到规范化坐标的默认映射可以由以下伪代码片段表示：

```
if (userValue < axisDefault)
	normalizedValue = (userValue - axisDefault) / (axisDefault - axisMin)
else
	normalizedValue = (userValue - axisDefault) / (axisMax - axisDefault)
```

如果存在“轴变化”表，则可以重新映射归一化的值，从而允许字体指定如何应用变化的非线性变化。

* **注意：** 本章中的内容仅适用于TrueType字体。

## 轴变化表格式

下表显示了“轴变化标题”：

|类型|名称|含义|
|-|-|-|
|fixed32|version|表格版本； 设置为0x00010000。|
|int32|axisCount|变化轴数。|
|shortFracSegment|segment[axisCount]|每个轴的线段映射。|

shortFracSegment 格式如下:

|类型|名称|含义|
|-|-|-|
|uint16|pairCount|该轴的对数。|
|shortFracCorrespondence|correspondence[pairCount]|对应值数组。|

下表显示了shortFracCorrespondence结构：

|类型|名称|含义|
|-|-|-|
|shortFrac|fromCoord|标准化用户空间中的值。|
|shortFrac|toCoord|标准化轴空间中的值。|

shortFracSegment定义了用户坐标（fromCoord）和沿变化轴（toCoord）的坐标之间的映射。 映射表示为一系列对应点，每对对应点指定用户空间中的范围和轴空间中的对应范围。 使用此功能，可以将用户坐标的每个值映射到轴空间中的相应值。

## 细分示例

让我们看一下此映射如何工作的示例。 下表显示了字体的“ avar”表中可能存在的一组映射数据。

|From (user)|To (axis)|
|-|-|
|-1.0|-1.0|
|-0.75|-0.5|
|0|0|
|0.4|0.4|
|0.6|0.9|
|1.0|1.0|

下表显示了如何使用此“ avar”数据将指定的用户值映射到轴值。

|User value|Axis value|
|-|-|
|-1.0|-1.0|
|-0.75|-0.5|
|-0.5|-0.3333|
|-0.25|-0.1667|
|0|0|
|0.25|0.25|
|0.5|0.65|
|0.75|0.9375|
|1.0|1.0|

一个段必须始终具有至少三个对应对：负一映射到负一，零映射到零和一个映射到一。 这意味着线段可能不会更改坐标值的符号。 段的对必须在fromCoord上排序，以-1.0开头，以1.0结尾。

**注意：** shortFrac是一个int16，其偏差为14。这意味着它可以表示1.999（0x7fff）和-2.0（0x8000）之间的数字。 1.0存储为16384（0x4000），-1.0存储为-16384（0xc000）。
