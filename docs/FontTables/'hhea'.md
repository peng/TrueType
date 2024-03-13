# "hhea" 表

## 一般表信息

“hhea”表包含布局水平书写的字体（即从左到右或从右到左）所需的信息。 该表包含整个字体的通用信息。 与特定字形相关的信息在下面定义的“hmtx”表中给出。

该表以版本号开头。 它包括代表字体设计者设计意图的值（上升、下降和线间隙）以及计算出的值，这些值必须与“hmtx”表中出现的数据一致（advanceWidthMax、minLeftSideBearing、minRightSideBearing）。

“hhea”表使用范围的概念。 范围是从左侧轴承到字形轮廓中最右侧位置的距离。

caretSlopeRise 和 caretSlopeRun 用于指定使用此字体显示时插入符号适当角度的数学斜率。 斜率等于 caretSlopeRise 除以 caretSlopeRun。 因此，上升 1 和运行 0 将指定垂直插入符号（无限斜率）。 上升 0 和延伸 1 将指定水平插入符（零斜率）。 对于字形为倾斜或斜体的字体来说，介于两者之间的字体是理想的。 例如，对于 7.6 的斜率，可以使用 2048 的上升和 270 的运行，这对应于 82.5° 的角度。 (tan(82.5°) = 7.6)

请注意，由于斜率是一个比率，因此可以使用简化或加速计算的值。 caretSlopeRise 为 8 和 caretSlopeRun 为 6 与 caretSlopeRise 为 4 和 caretSlopeRun 为 3 含义相同。因此，run 0 足以指定垂直插入符号； 上涨是多余的。 类似地，上升 0 足以指定水平插入符号。

caretSlopeRise 和 caretSlopeRun 不能同时为零。

caretOffset 值是字形上的倾斜突出显示需要移动以产生最佳外观的量。 由于 caretOffset 是一个带符号的 FUnit 值，因此它会缩放。

该表中的许多字段是保留的，应设置为零值。

ascent、descent 和 lineGap 的值代表字体创建者的设计意图，而不是任何计算值，并且单个字形可能会超出它们所代表的限制。 advanceWidthMax、minLeftSideBearing 和 minRightSideBearing 的值是计算值，必须与“hmtx”表中出现的任何值一致。 这些值正如其名称所暗示的那样，是字体中任何字形的实际最大前进宽度、任何字形的最小左侧方距以及任何字形的最小右侧方距。 类似地，“head”中的 xMin、yMin、xMax 和 yMax 字段表示字体中字形的实际极值。

值 numOfLongHorMetrics 由“hmtx”表使用。

**"hhea" 表**

|类型|名称|描述|
|-|-|-|
|Fixed|	version|0x00010000 (1.0)
|FWord|	ascent|距最高上升器基线的距离
|FWord|	descent|距最低下降基线的距离
|FWord|	lineGap|线间隙
|uFWord|	advanceWidthMax|必须与水平指标一致
|FWord|	minLeftSideBearing|必须与水平指标一致
|FWord|	minRightSideBearing|必须与水平指标一致
|FWord|	xMaxExtent|最大值(lsb + (xMax-xMin))
|int16|	caretSlopeRise|用于计算插入符的斜率（上升/运行），对于垂直插入符设置为 1
|int16|	caretSlopeRun|0 表示垂直
|FWord|	caretOffset|对于非倾斜字体，将值设置为 0
|int16|	reserved|将值设置为 0
|int16|	reserved|将值设置为 0
|int16|	reserved|将值设置为 0
|int16|	reserved|将值设置为 0
|int16|	metricDataFormat|0 表示当前格式
|uint16|	numOfLongHorMetrics|指标表中的提前宽度数

## 依赖关系
其他表可能具有与“hhea”表中包含的数据重复的信息，最显着的是上升和下降字段。 此类信息可以在诸如“OS/2”表或“bloc”表之类的表中找到。 应始终注意字体内的度量信息是一致的，因为不同的应用程序和系统从不同的位置获取度量信息。

对于跨平台使用的字体尤其如此。 例如，Windows 使用“OS/2”表作为字体上升和下降的基本源。

作为 caretSlopeRise 和 caretSlopeRun 之间的比率计算的脱字符斜率应等于 tan(90° + p)，其中 p 是“post”表中 italicAngle 字段的值。

numOfLongHorMetrics 字段的值由“hmtx”（水平指标）表使用。 缺少“hhea”表的字体不得有“hmtx”表。

## 工具
每当“hmtx”表更新时，ftxdumperfuser 都会自动更新“hhea”表。

使用 ftxdumperfuser 融合同一字体的“hhea”表和“hmtx”表时必须小心。 它们应按“hhea”-“hmtx”的顺序融合，以确保“hhea”表的 numOfLongHorMetrics 字段有效。 ftxdumperfuser 允许在融合“hhea”表时从 XML 源中省略 numOfLongHorMetrics 字段，以防止其意外损坏。

XML 源中也可以省略其他字段。 在这种情况下，值将从现有的“hhea”表中继承或通过检查字体来提供。