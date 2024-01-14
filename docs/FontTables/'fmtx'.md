# “fmtx”表

## 介绍

字体度量表（标签：“fmtx”）标识一个字形，其点代表各种字体范围的度量：上升、下降、插入符角度、插入符偏移。 如果此表存在，这些点将覆盖“hhea”和“vhea”表中相应的值。 将这些指标表示为点而不是值具有多个优点。

* 在 Quickdraw Text 中，字形被限制为不超过字体的上升和下降。 因此，许多字体人为地增加“hhea”表中的上升和下降值，以适应异常高或低的字形。 “fmtx”仅在 ATSUI 中使用，允许使用相同的字体指定上升和下降的“真实”值，而无需更改 Quickdraw Text 中的行为。
* 由于“fmtx”度量表示为点，因此它们可以针对不同的变化设置进行更改，从而允许字体在更改粗细或光学点大小时更改其行间距和/或插入符角度。
* 还可以指示“fmtx”度量点，允许字体以小尺寸调整行距以提高可读性。
* **注意：** 本章中的材料仅适用于 TrueType 字体。

## 字体规格表格式

Font Metrics 表格式如下：

|类型|名称|含义|
|-|-|-|
|fixed32|	version|版本（设置为 0x00020000）。
|uint32|	glyphIndex|其点代表度量的字形。
|uint8|	horizontalBefore|水平上升的点编号。
|uint8|	horizontalAfter|水平下降的点编号。
|uint8|	horizontalCaretHead|水平插入符头的点数。
|uint8|	horizontalCaretBase|水平插入符号底座的点数。
|uint8|	verticalBefore|垂直上升的点数。
|uint8|	verticalAfter|垂直下降的点编号。
|uint8|	verticalCaretHead|垂直插入符头的点数。
|uint8|	verticalCaretBase|垂直插入符号底座的点数。

使用“fmtx”表的行距是通过测量从字体的“之前”度量点到“之后”度量点的距离来计算的。 “之前”是指定从基线（或垂直中心线）到上一行的“之后”距离的点。 在水平文本中，这对应于字体的上升。 “之后”是指定从基线（中心线）到下一行的“之前”距离的点。 在水平文本中，这对应于字体的下降。

使用“fmtx”表的插入符角度是通过使用字体的“插入符头”度量点和“插入符基部”度量点之间的角度来计算的。 “插入符头”是指定插入符相对于“插入符基部”点的角度的点。 “插入符号基部”是指定插入符号应与基线（中心线）相交的位置的点。 对于水平文本，“插入符号基部”的 y 坐标必须为 0。对于垂直文本，“插入符基部”的 x 坐标必须为 0。

如果存在“fmtx”表，则它必须指定所有八个度量点的点编号。 即使字体仅用于水平书写，它也必须识别垂直度量的点。

下表显示了单位为 2048 的斜体字体的典型坐标：

|名称|坐标|
|-|-|
|Horizontal before|	(0, 1600)|
|Horizontal after|	(0, -448)|
|Horizontal caret head|	(210, 1600)|
|Horizontal caret base|	(-140, 0)|
|Vertical before|	(1024, 0)|
|Vertical after|	(-1024, 0)|
|Vertical caret head|	(1024, 0)|
|Vertical caret base|	(0, 0)|
