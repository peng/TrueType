# “sbix”表

## 一般表信息

此表提供对标准图形格式（如 PNG、JPEG、TIFF）的位图数据的访问。

该表以标题开头：

类型|名称|描述
|-|-|-|
|UInt16|version(版本)|版本号（设置为 1）
|UInt16|flags(标志)|见下文
|UInt32|numStrikes|要跟踪的位图打击数
|UInt32|strikeOffset[numStrikes]|从表开头到单个打击数据的偏移量

标志字段中仅使用两位，即位 0 和位 1。由于历史原因，位 0 必须始终为 1。位 1 是 sbixDrawOutlines 标志，其解释如下：

二进制值|描述
|-|-|
0|仅绘制“sbix”位图
1|按顺序绘制“sbix”位图和轮廓

这些位仅对“sbix”表中至少有一个位图的字形的渲染有影响。完全没有位图的字形始终用其轮廓（如果有）绘制。

标志字段中的其他位应设置为零。

## 打击

每个打击数据记录如下所示：

类型|名称|描述
|-|-|-|
|UInt16|ppem|此打击设计的 PPEM（例如 9、12、24）
|UInt16|分辨率|此打击设计的屏幕分辨率（以 dpi 为单位）（例如 72）
|UInt32|glyphDataOffset[numGlyphs+1]|从打击数据记录开头到单个字形数据的偏移量

给定字形的数据长度由 glyphDataOffset[glyphID+1] - glyphDataOffset[glyphID] 确定。如果该值为零，则表示此打击中没有该字形的位图数据。（对于非打印字形（例如空格），这应该始终为真。）

字形的数据记录如下所示：

类型|名称|描述
|-|-|-|
|SInt16|originOffsetX|字形中点相对于其左下角的 x 值，该左下角对应于屏幕上字形的原点，即字形左边缘基线上的点。
|SInt16|originOffsetY|字形中点相对于其左下角的 y 值，该左下角对应于屏幕上字形的原点，即字形左边缘基线上的点。
|FourCharCode|graphicType|指示图形的类型，并使客户端无需解析图形数据即可确定数据类型。目前，仅定义了“jpg”、“pdf”、“png”和“tiff”。
|UInt8|data[]|实际嵌入的图形数据。总长度是从连续的 glyphDataOffsets 推断出来的。

并非每个字形都需要在“sbix”表的每个笔划中都有条目。如果字形在“sbix”表的任何笔划中都没有条目，则将绘制其轮廓。

例如，Apple Color Emoji 字体没有 U+1F1E6 区域指示符号字母 A 到 U+1F1FF 区域指示符号字母 Z 的位图。因此，这些位图是用轮廓绘制的。但是，它确实有 U+1F638 咧嘴笑的猫脸和笑眼的位图，因此该字符是用位图绘制的。

请注意，如果任何笔划都有特定字形的位图，则将始终绘制该字形的位图。是否也绘制轮廓（如果存在）取决于标题中标志字段的值。因此，要在“sbix”表中使用嵌入式 PDF，只需将其包含在一个笔划中。

### 特殊图形类型

除了表示简单图形图像的 graphicType 值（“jpg”、“pdf”、“png”和“tiff”）之外，还有两个特殊的 graphicType 代码。

特殊 graphicType 'dupe' 表示数据字段包含一个双字节、大端字形 ID。指示字形的位图数据应用于当前字形。

特殊 graphicType 'mask' 表示图像将使用遮罩进行渲染。以下数据结构如下所示：

类型|名称|描述
|-|-|-|
|UInt32|maskOffset|掩码数据的偏移量（从“sbix”表的开头开始）
|FourCharCode|graphicType|掩码图形数据（不是掩码）的类型。目前，仅定义了“jpg”、“pdf”、“png”和“tiff”。
|UInt8|data[]|实际的掩码图形数据。总长度是从连续的 glyphDataOffsets 推断出来的。

面罩的数据如下：

类型|名称|描述
|-|-|-|
|UInt32|maskLength|掩码数据的长度（包括此标头）
|UInt16|保留|当前未使用；设置为 0。
|UInt16|blendingMode|指示如何应用掩码。
|SInt16|originOffsetX|位图图形左边缘相对于字形设计空间原点的水平（x 轴）位置。
|SInt16|originOffsetY|位图图形左边缘相对于字形设计空间原点的垂直（y 轴）位置。
|FourCharCode|graphicType|指示掩码的图形类型，使客户端无需解析图形数据即可确定数据类型。当前，仅定义了“jpg”、“png”和“tiff”。
|UInt8|data[]|实际嵌入的掩码数据。

originOffsetX 和 originOffsetY 值给出了位图图形相对于字形设计空间标准坐标系的位置。例如，如果 originOffsetX 等于 20，则位图的左边缘位于原点右侧 20 个单位处；如果 originOffsetY 等于 -30，则图形的下边缘位于原点下方 30 个 FUnit 处。

将图形放置在文本行内时，位置取决于当前字形 ID 的“glyf”表中是否有轮廓：

* 如果没有字形轮廓，则图形的字形设计空间原点将放置在此字形的起始绘制位置。'hmtx 表中当前字形 ID 的 lsb 值不起作用。
* 如果有字形轮廓，则图形的字形设计空间原点将放置在字形边界框 (xMin, yMin) 的左下角。

blendingMode 定义了五个值：

名称|值|描述
|-|-|-|
|sbixBlendModeMultiply|0|将源图像样本与背景图像样本相乘。这样得到的颜色至少与两个贡献样本颜色一样暗。
|sbixBlendModeDarken|1|通过选择较暗的样本（来自源图像或背景）来创建合成图像样本。结果是背景图像样本被任何较暗的源图像样本替换。否则，背景图像样本保持不变。
|sbixBlendModeHardLight|2|根据源图像样本颜色，对颜色进行相乘或筛选。如果源图像样本颜色比 50% 灰色浅，则背景变亮，类似于筛选。如果源图像样本颜色比 50% 灰色暗，则背景变暗，类似于相乘。如果源图像样本颜色等于 50% 灰色，则源图像不变。等于纯黑色或纯白色的图像样本将产生纯黑色或纯白色。整体效果类似于将强光照射在源图像上所获得的效果。使用此功能可以为字形添加高光。
|sbixBlendModeSourceAtop|3|R = S*Da + D*(1 - Sa)
|sbixBlendModeXOR|4|R = S*(1 - Da) + D*(1 - Sa)。此 XOR 模式仅名义上与经典位图 XOR 运算相关。

sbixBlendModeSourceAtop 和 sbixBlendModeXOR 混合模式常量表示 Porter-Duff 混合模式。这些混合模式等式中的符号为：

* R 是预乘结果
* S 是源颜色，包括 alpha
* D 是目标颜色，包括 alpha
* Ra、Sa 和 Da 是 R、S 和 D 的 alpha 分量

您可以在 PDF 参考第四版 1.5 版（Adobe Systems, Inc.）中找到有关混合模式的更多信息，包括使用它们生成的图像示例以及模式的许多数学描述。如果您是前 QuickDraw 开发人员，将混合模式视为传输模式的替代方案可能会有所帮助。

## 平台特定信息
macOS 10.7 (Lion) 及更高版本支持“sbix”表。

macOS 10.9 (Mavericks) 或 iOS 7 及更高版本支持“dupe”数据类型。

所有版本的 ipadOS、watchOS 和 tvOS 均支持这两种数据类型。

计划在 iOS 和 macOS 的未来版本中支持“pdf”和“mask”数据类型以及 sbixDrawOutlines 标志。

## 依赖项
字形计数来自“maxp”（最大配置文件）表。

整体字形度量（左侧承载、前进）存储在“hmtx”（水平度量）表中。