# "hmtx" 表

## 一般表信息
“hmtx”表(Horizontal Metrics Table x轴)包含字体中每个字形的水平布局的度量信息。 它从 hMetrics 数组开始。 该数组中的每个元素都有两部分：前进宽度和左侧支撑。 值 numOfLongHorMetrics 取自“hhea”（水平标头）表。 在等宽字体中，只需要一个条目，但该条目不能省略。

可选地，随后是左侧支撑阵列。 通常，该左侧支撑阵列用于一系列等宽字形。 例如，它可能用于 Kanji 字体或 Courier 字体。 每种字体只允许运行一次。 它必须位于表的末尾。 假定相应的字形具有与 hMetrics 数组中最后一个条目中找到的相同的提前宽度。 由于必须有与字体中的每个字形相关联的左侧支撑和提前宽度，因此该数组中的条目数是从字体中的字形总数减去值 numOfLongHorMetrics 得出的。

longHorMetric 由如下所示的 C 结构定义：

```
struct {
	uint16 advanceWidth;
	int16 leftSideBearing;
}
```

**表24：**"hmtx" 表

|类型|名称|描述|
|-|-|-|
|longHorMetric|	hMetrics[numOfLongHorMetrics]|值 numOfLongHorMetrics 来自“hhea”表。 如果字体是等宽字体，则数组中只需要一个条目，但该条目是必需的。|
|FWord|	leftSideBearing[]|这里假设 advanceWidth 与上面最后一个条目的 advanceWidth 相同。 该数组中的条目数由字形总数减去 numOfLongHorMetrics 得出。 这通常与一系列等宽字形（例如 Kanji 字体或 Courier 字体）一起使用。 只允许跑一圈，并且必须在最后。|

## 依赖关系
numOfLongHorMetrics 字段的值可在“hhea”（水平标头）表中找到。 缺少“hhea”表的字体不得有“hmtx”表。

其他表可能具有与“hmtx”表中包含的数据重复的信息。 例如，字形度量也可以在“hdmx”（水平设备度量）表和“bloc”（位图位置）表中找到。 当然，不要求“hmtx”表的理想指标与其他表中找到的设备指标完全一致，但应注意它们不能显着不一致。

## 工具
每当“hmtx”表更新时，ftxdumperfuser 都会自动更新“hhea”表。

使用 ftxdumperfuser 融合同一字体的“hhea”表和“hmtx”表时必须小心。 它们应按“hhea”-“hmtx”的顺序融合，以确保“hhea”表的 numOfLongHorMetrics 字段有效。 ftxdumperfuser 允许在融合“hhea”表时从 XML 源中省略 numOfLongHorMetrics 字段，以防止其意外损坏。