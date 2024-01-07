# "EBSC" 表

## 一般表信息

“EBSC” （embedded bitmap scaler） 表提供了一种机制，用于在生成不同点大小的字形时强制 TrueType 缩放器使用特定大小的嵌入位图。

“EBSC”表仅用于仅位图的 TrueType 字体。 如果没有可用的嵌入位图，具有轮廓数据的字体将始终使用轮廓来生成点大小的字形。

如果字体没有字形轮廓，则嵌入位图是 TrueType 缩放器可以用来为字符提供字形的唯一机制。 如果有符合请求大小的嵌入位图，则将使用该位图； 否则，缩放器将必须从位图创建另一个点大小的位图。 TrueType 缩放器有一个算法，用于确定在这种情况下适合使用哪种点大小； “EBSC”表允许字体设计者覆盖此默认算法。

“EBSC”表以描述其包含的点大小覆盖的标题开头：

|类型|名称|描述|
|-|-|-|
|Fixed|	version|	表的版本号（初始版本为 0x00020000）。|
|UInt32|	numSizes|	该表中 EBSCScaleTable 的数量。|
|variable|	scaleTables[numSizes]|	子表指示如何覆盖 TrueType 缩放器的默认算法，以查找在为不在字体中的点大小生成字形时要使用的点大小。|

标头后面紧接着是scaleTables 数组。 标头中的 numSizes 表示数组中 EBSCScaleTable 的数量。 每个覆盖均由一个 EBSCScaleTable 定义。

|类型|名称|描述|
|-|-|-|
|BLOCLineMetrics|	hori|此点大小的水平线度量（在 Mac OS 上不使用）。
|BLOCLineMetrics|	vert|垂直线度量（在 OS X 上不使用）。
|UInt8|	ppemX|此 EBSCScaleTable 的水平点大小
|UInt8|	ppemY|此 EBSCScaleTable 的垂直磅值
|UInt8|	substitutePpemX|为 ppemX 字段中的点大小生成字形时要使用的水平点大小。
|UInt8|	substitutePpemY|为 ppemY 字段中的点大小生成字形时要使用的垂直点大小。

例如，假设字体具有 9 点和 24 点嵌入位图。 通常，如果 TrueType 缩放器尝试生成 18 点位图，则会使用 9 点位图作为数据源。 不过，“EBSC”表可用于覆盖此设置，方法是包含 ppemX 等于 18 且替代PpemX 等于 24 的 EBSCScaleTable。

## 平台特定信息
OS X 不使用水平线和垂直线度量字段。 请参阅有关位图位置表的文档以了解这些字段的结构。

## 依赖关系
如果字体中存在“EBSC”表，则该字体必须是仅位图字体。 也就是说，它还应该有“bdat”和“bloc”表。 字体不得有“head”或“glyf”表。 仅位图字体使用“bhed”表来存储通常在“head”表中找到的信息。

