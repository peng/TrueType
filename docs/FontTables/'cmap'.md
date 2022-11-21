# 'cmap' 表

## 一般表信息

'cmap' 表将字符代码映射到字形索引。 特定字体的编码选择取决于预期平台使用的约定。 打算在具有不同编码约定的多个平台上运行的字体将需要多个编码表。 因此，“cmap”表可能包含多个子表，每个子表对应一种支持的编码方案。

与字体中的任何字形不对应的字符代码应映射到字形索引 0。在字体中的这个位置，必须有一个特殊的字形表示缺失的字符，通常是一个框。 不应将任何字符代码映射到字形索引 -1 (0xFFFF)，这是在处理中保留的特殊值，用于指示从字形流中删除的字形的位置。

“cmap”表以表版本号开头，后跟编码表的数量。 编码子表如下。

请注意，一次只使用其中一个编码子表。 如果找到多个编码子表，“cmap”解析软件会确定使用哪一个。 一个例外是类型 14 编码的子表，它只能与另一个子表一起使用。 如果存在多个类型 14 编码子表，则使用哪一个是未定义的。

'cmap' 表的原始定义使用 8 位或 16 位字符代码。 为了支持从 2.0 开始的 Unicode 版本，字体可能需要对每个字符混合使用 16 位和 32 位或每个字符 32 位的数据的引用。

**cmap 表索引**

|类型|名称|描述|
|-|-|-|
|UInt16|版本(version)|版本号 Version number (Set to zero)
|UInt16|子类表数量(numberSubtables)|子表编码表数量 (Number of encoding subtables)

## 'cmap' 编码子表

每个 cmap 子表由三个字段组成

'cmap' 子表

|类型|名称|描述|
|-|-|-|
|UInt16|platformID|平台标识符(Platform identifier)
|UInt16|platformSpecificID|特定于平台的编码标识符(Platform-specific encoding identifier)
|UInt32|offset|映射表的偏移量(Offset of the mapping table)

'cmap' 子表必须首先按平台标识符升序排序，然后按平台特定标识符排序。

platformID 和 platformSpecificID 字段使用与“名称”表中的等效字段相同的值：

**'cmap' 平台**

<table>
  <tr>
    <th>平台ID</th>
    <th>平台</th>
    <th>平台特殊 ID</th>
  </tr>
  <tr>
    <td>0</td>
    <td>Unicode</td>
    <td>表示 Unicode 版本(Indicates Unicode version.)</td>
  </tr>
  <tr>
    <td>1</td>
    <td>苹果系统(Macintosh)</td>
    <td>脚本管理编码(Script Manager code.)</td>
  </tr>
  <tr>
    <td>2</td>
    <td colspan="2" >保留为未使用(reserved; do not use)</td>
  </tr>
  <tr>
    <td>3</td>
    <td>微软 Microsoft</td>
    <td>微软编码</td>
  </tr>
</table>

### Unicode 编码

当 platformID 为 0 (Unicode) 时，platformSpecificID 解释如下：

**Unicode 平台特定的编码标识符**

|特定于平台的 ID 代码(Platform-specific ID code)|含义|
|0| 版本1.0	(Version 1.0 semantics)|
|1| 版本1.1	(Version 1.1 semantics)|
|2|	ISO 10646 1993 semantics (deprecated)|
|3|	Unicode 2.0 or later semantics (BMP only)|
|4|	Unicode 2.0 or later semantics (non-BMP characters allowed)|
|5|	Unicode 变化序列 (Unicode Variation Sequences)|
|6|	Last Resort|

允许使用除 0、1 或 3 以外的 platformID 值，但使用它们的 cmap 将被忽略。

Unicode 平台的 platform-specific ID 6 旨在将“cmap”子表标记为最后使用的字体。 这不是任何 Apple 平台所要求的。

### Mac系统编码

当 platformID 为 1 (Mac系统) 时，platformSpecificID 是 QuickDraw 脚本代码。 有关这些列表，请参阅 'name' 表文档。

目前不鼓励使用 Macintosh platformID。 具有 Macintosh platformID 的子表仅在与 QuickDraw 向后兼容时才需要，并且如果需要，将从基于 Unicode 的子表合成。

### Windows系统编码

当 platformID 为 3（Windows）时，platformSpecificID 为 a 的解释如下：

**Windows 平台特定的编码标识符**

|Platform-specific ID 编码|含义|
|-|-|
|0|Symbol|
|1|Unicode BMP-only (UCS-2)|
|2|Shift-JIS|
|3|PRC|
|4|BigFive|
|5|Johab|
|10|Unicode UCS-4|

### 子表要求

编码子表有三种基本类型：

* Unicode 子表
* Unicode 变体序列子表
* 非 Unicode 子表（其他）

Unicode 子表是支持 Unicode 文本编码标准的子表。 此类子表具有 Unicode platformID 和非 14 的 platformSpecificID，或 Microsoft platformID 和 1 或 10 的 platformSpecificID。

Unicode 变体序列子表是一个具有 Unicode platformID 和 14 platformSpecificID 的子表。

**Unicode 子表要求**

大多数字体应该有一个 Unicode 编码子表。 带有 Windows/Symbol 编码子表 (3/0) 的字体应该没有 Unicode cmap。

如果一个字体有多个 Unicode 编码子表，每个字符应该被它出现的每个 Unicode 子表映射到同一个字形。

**Unicode 变体序列子表要求**

字体不应有多个 Unicode 变体序列子表。 如果一种字体确实有多个变体序列子表，则只使用一个而忽略其他的。 使用哪一个没有定义。

带有 Unicode 变体序列子表的字体需要格式 4 或 12 的 Unicode 编码子表。

**非 Unicode 子表要求**
带有 Windows/Symbol 编码子表 (3/0) 的字体应该没有 Unicode cmap。

不推荐使用带有 Macintosh platformID 的子表。

### 子表搜索顺序

除了 Unicode 变体序列子表之外，只有一个编码子表将用于将字符映射到字形。 搜索编码子表以寻找最适合使用的子表，由它们的平台/平台特定 ID 值确定。 Apple 不保证以任何特定顺序查找 Unicode 编码子表。 然而：

* Unicode 编码子表优先于非 Unicode 编码子表使用。
* 优先使用不受 BMP 限制的 Unicode 编码子表，而不是限制为 BMP 的子表。
* 如果存在另一个类型 4 或 12 的 Unicode cmap，则始终处理 Unicode 变体序列子表。

例如，如果字体同时具有 0/4（Unicode、UCS-4）cmap 和 0/3（Unicode/BMP-only）cmap，则将使用前者而忽略后者。 尽管如此，它们对于 Unicode 的 BMP 应该具有相同的映射。

如果字体具有 3/10 cmap（Windows，UCS-4），它也应该具有 3/1（Windows，仅限 BMP）cmap，以便与 Windows XP 向后兼容。 Apple 平台没有同等要求。

有关 Windows 平台的更多要求，请参阅 OpenType 规范。

请注意，由于编码子表使用任何平台/平台特定 ID 的实际数据的偏移量，因此类型 0/4 和类型 3/10 的 cmap 可能具有相同的实际数据，而不仅仅是相同的数据。

# “cmap”表和语言代码

每个“cmap”子表都有一个与之关联的两字节语言代码。 此语言代码仅用于具有 Mac 系统 platformID 的子表。 对于此类子表，它被解释为比 QuickDraw 语言代码多一，如果子表与语言无关，则解释为零。 在所有其他子表中，它应该为零。

请注意，目前不推荐使用 Mac系统 platformID。 具有 Mac系统 platformID 的子表仅在与 QuickDraw 向后兼容时才需要，并且如果需要，将从基于 Unicode 的子表合成。

# 'cmap' 格式

每个“cmap”子表都是当前可用的九种格式之一。 这些是格式 0、格式 2、格式 4、格式 6、格式 8、格式 10、格式 12、格式 13 和格式 14，将在下一节中介绍。

格式 0 支持 Mac系统 标准字符到字形映射。格式 2 支持对日语、中文和韩语有用的混合 8或16 位映射。 格式 4 用于 16 位映射。 格式 6 用于密集的 16 位映射。

格式 8、10 和 12、13 和 14 用于混合 16或32 位和纯 32 位映射。 这支持在 Unicode 2.0 及更高版本中使用代理项编码的文本。

许多 cmap 格式要么已过时，要么旨在满足从未实现的预期需求。 现代字体生成工具可能不需要能够以 4 和 12 以外的格式编写通用 cmap。格式 13 和 14 都用于专门用途。 格式 13 在结构上与格式 12 相同（但对数据的解释不同），因此对它的支持（如果需要）相对容易提供。 与 Unicode 变体选择器一起使用需要支持格式 14 编码子表。

Apple 平台支持除 0、8 和 10 之外的所有 cmap 格式。有关其他平台上的编码子表格式支持的信息，请参阅 OpenType 规范。

## 'cmap' 格式 0

格式 0 适用于字符代码和字形索引限制为单个字节的字体。 这是在引入 TrueType 时非常常见的情况，但现在很少遇到。

**'cmap' 格式 0**

|类型|名称|描述|
|-|-|-|
|UInt16|format|设置为0|
|UInt16|length|子表的字节长度（格式 0 设置为 262）(Length in bytes of the subtable (set to 262 for format 0))|
|UInt16|language|语言编码(看上边)(Language code (see above))
|UInt8|glyphIndexArray[256]|将字符代码映射到字形索引值的数组(An array that maps character codes to glyph index values)|

## 'cmap' 格式 2

格式 2 映射子表类型用于包含日文、中文或韩文字符的字体。 亚洲的 Mac 系统支持此表中使用的代码标准。 这些字体包含混合的 8或16 位编码，其中保留了某些字节值来表示 2 字节字符的第一个字节。 这些特殊值作为 2 字节字符的第二个字节也是合法的。

下表显示了格式 2 编码子表的格式。 subHeaderKeys 数组将每个可能的高字节映射到 suborders 数组的特定成员中。 这允许确定是否使用了第二个字节。 在任何一种情况下，路径都通向 glyphIndexArray，从中获取映射的字形索引。 操作顺序如下：

考虑一个高字节 i，指定 0 到 255 之间的整数。值 subHeaderKeys[i] 除以 8，是 subHeaders 数组中的索引 k。 k 等于 0 的值是特殊的。 这意味着 i 是一个单字节代码，不会引用第二个字节。 如果 k 为正，则 i 是双字节代码的高字节，其第二个字节 j 将被消耗。

**'cmap' 格式 2**

|类型|名称|描述|
|-|-|-|
|UInt16|format|设置为2|
|UInt16|length|表总长度（以字节为单位）|
|UInt16|language|语言编码（见上文|
|UInt16|subHeaderKeys[256]|将高字节映射到 subHeaders 的数组：值为 index * 8|
|UInt16 * 4|subHeaders[variable]|subHeader 结构的可变长度数组|
|UInt16|glyphIndexArray[variable]|包含子数组的可变长度数组|

subHeader 数据类型是由如下所示的 C 语言结构定义的 4 字结构：

```C
typedef struct {
	UInt16	firstCode;
	UInt16	entryCount;
	int16	idDelta;
	UInt16	idRangeOffset;
} subheader;
```

如果 k 为正，则属于 subheaders[k] 的四个值按如下方式使用，firstCode 和 entryCount 定义了第二个字节 j 的允许范围：

firstCode <= j < (firstCode + entryCount)

如果 j 超出此范围，则返回索引 0（缺少的字符字形）。 否则，idRangeOffset 用于标识 glyphIndexArray 内的关联范围。 glyphIndexArray 紧跟 subHeaders 数组，可以粗略地视为它的扩展。 idRangeOffset 的值是超过 idRangeOffset 字的实际位置的字节数，其中出现对应于 firstCode 的 glyphIndexArray 元素。 如果 p 为零，则直接返回。 如果 p 不为零，则返回 p = p + idDelta。 如有必要，总和以 65536 为模减少。

对于 k = 0 的单字节情况，结构 subHeaders[0] 将显示 firstCode = 0、entryCount = 256 和 idDelta = 0。如前所述，idRangeOffset 将指向 glyphIndexArray 的开头。 将 i 个单词索引到该数组中会得到返回值 p = glyphIndexArray[i]。

格式 2 cmap 的目标是混合 8/16 位编码，例如 Big Five 和 Shift-JIS。 这种编码仍然被广泛使用，即使格式 2 cmap 不存在，Apple 平台也会正确支持它们。

## 'cmap' 格式 4

格式 4 是一种两字节编码格式。 当字体的字符代码落在几个连续的范围内时，应该使用它，可能在一些或所有范围内有孔。 也就是说，某个范围内的某些代码可能与字体中的字形无关。 密集映射的两字节字体应使用格式 6。

该表以格式编号、长度和语言开头。 格式相关的数据如下。 它分为三个部分：

* 一个四字标题，提供优化搜索段列表所需的参数
* 描述段的四个并行数组（每个连续的代码范围一个段）
* 字形 ID 的可变长度数组

**'cmap' 格式 4**

|类型|名称|描述|
|-|-|-|
|UInt16|format|格式编号设置为 4
|UInt16|length|子表的长度（以字节为单位）
|UInt16|language|语言代码（见上文）
|UInt16|segCountX2|2 * segCount
|UInt16|searchRange|2 * (2**FLOOR(log2(segCount)))
|UInt16|entrySelector|log2(searchRange/2)
|UInt16|rangeShift|(2 * segCount) - searchRange
|UInt16|endCode[segCount]|每个段的结束字符代码，last = 0xFFFF。
|UInt16|reservedPad|此值应为零
|UInt16|startCode[segCount]|每个段的起始字符代码
|UInt16|idDelta[segCount]|段中所有字符代码的增量
|UInt16|idRangeOffset[segCount]|字形 indexArray 的字节偏移量，或 0
|UInt16|glyphIndexArray[variable]|字形索引数组

段数由变量 segCount 指定。 此变量未在格式 4 表中明确使用，但它是派生所有表参数的数字。 segCount 是字体中连续代码范围的数量。 searchRange 值是小于或等于 segCount 的 2 的最大幂的两倍。

searchRange、entrySelector 和 rangeShift 字段不在 Apple 平台上使用，但应正确设置以与其他平台兼容。

示例格式 4 子表值如下表所示：

|segCount|39|Not calculated; determined from the organization of the glyph indices|
|-|-|-|
|searchRange|64|(2 * (largest power of 2 <= 39)) = 2 * 32
|entrySelector|5|(log2(the largest power of 2 < segCount))
|rangeShift|14|(2 * segCount) - searchRange = (2 * 39) - 64

每个段由 startCode、endCode、idDelta 和 idRangeOffset 描述。 这些用于映射段中的字符代码。 这些段按 endCode 值递增的顺序排序。

要使用这些数组，需要搜索第一个大于或等于要映射的字符码的endCode。 如果对应的 startCode 小于等于字符码，则使用对应的 idDelta 和 idRangeOffset 将字符码映射到字形索引。 否则，将返回缺少的字符字形。 为确保搜索将终止，最终的 endCode 值必须为 0xFFFF。 该段不需要包含任何有效的映射。 它可以简单地将单个字符代码 0xFFFF 映射到缺少的字符字形，字形 0。

如果段的 idRangeOffset 值不为 0，则字符代码的映射依赖于 glyphIndexArray。 startCode 的字符代码偏移量被添加到 idRangeOffset 值。 此总和用作与 idRangeOffset 本身内的当前位置的偏移量，以索引出正确的 glyphIdArray 值。 此索引方法有效，因为 glyphIdArray 紧跟在字体文件中的 idRangeOffset 之后。 字形索引的地址由以下等式给出：

glyphIndexAddress = idRangeOffset[i] + 2 * (c - startCode[i]) + (Ptr) &idRangeOffset[i]

该等式中需要乘以 2 才能将值转换为字节。

或者，可以使用如下表达式：

glyphIndex = *( &idRangeOffset[i] + idRangeOffset[i] / 2 + (c - startCode[i]) )

这种形式取决于 idRangeOffset 是 UInt16 的数组。

字形索引操作完成后，将检查指定地址处的字形 ID。 如果它不为 0（也就是说，如果它不是缺少的字形），则将该值添加到 idDelta[i] 以获取要使用的实际字形 ID。

如果 idRangeOffset 为 0，则直接将 idDelta 值添加到字符代码中，得到对应的字形索引：

glyphIndex = idDelta[i] + c

注意：所有 idDelta[i] 算术都是模 65536。

下表给出了将字符 10-20、30-90 和 100-153 映射到连续范围的字形索引所需的参数示例。 此示例的参数 segCount = 4。 此表提供了格式 4 子表示例的映射变量参数值。 示例数据演示了如何计算字符到字形索引映射值。 该表的假设是 segCountX2 为 8，searchRange 为 8，entrySelector 为 2，rangeShift 为 0。

|Name|Segment 1 Chars 10-20|Segment 2 Chars 30-90|Segment 3 Chars 100-153|Segment 4 Missing Glyph|
|-|-|-|-|-|
|endCode|20|90|153|0xFFFF|
|startCode|10|30|100|0xFFFF|
|idDelta|-9|-18|-27|1|
|idRangeOffset|0|0|0|0|

此表执行以下映射：

```
10 is mapped to 10-9 or 1
20 is mapped to 20-9 or 11
30 is mapped to 30-18 or 12
90 is mapped to 90-18 or 72
```

等等。

在 Windows 中向后兼容需要类型 4 cmap，并且通常对仅 BMP 的 Unicode 字体有用。 标头中的冗余是出于历史目的——通过预先计算这些值，查找算法的性能在较旧、较慢的处理器上得到了显着提高。

## 'cmap' 格式 6

格式 6 用于将 16 位、2 字节的字符映射到字形索引。 它有时被称为修剪表映射。 当字体的字符代码属于单个连续范围时，应该使用它。 这导致了所谓的密集映射。 未密集映射的两字节字体（由于其多个连续范围）应使用格式 4。字符到字形索引映射子表格式 6 如下表所示：

**'cmap' format 6**

|类型|名称|描述|
|-|-|-|
|UInt16|format|格式数设置为6|
|UInt16|length|字节长度|
|UInt16|language|语言代码（见上文）|
|UInt16|firstCode|子范围的第一个字符代码|
|UInt16|entryCount|子范围内的字符代码数|
|UInt16|glyphIndexArray[entryCount]|范围内字符代码的字形索引值数组|

子表中的 firstCode 和 entryCount 值指定了可能的字符代码范围内的有用子范围。 范围以 firstCode 开始，长度等于 entryCount。 假定此子范围之外的代码丢失并映射到索引为 0 的字形。对于子范围内的代码，其与子范围中 firstCode 的偏移量用作 glyphIndexArray 的索引。 该数组提供与该字符代码关联的字形索引。

Type 6 cmaps 主要用于仅 BMP 的 Unicode 字体。

## 'cmap' 格式 8 - 混合 16 位和 32 位覆盖

格式 8 有点像格式 2，因为它提供混合长度的字符代码。 如果字体包含 Unicode 代理项，它很可能还会包含其他常规 16 位 Unicode。 这需要一种格式来映射 16 位和 32 位字符代码的混合，就像格式 2 允许混合 8 位和 16 位代码一样。 做了一个简化的假设：即，没有 32 位字符代码与任何 16 位字符代码共享相同的前 16 位。 这意味着可以通过直接查看 16 位值来确定特定的 16 位值是独立字符代码还是 32 位字符代码的开头，而无需进一步的信息。

|类型|名称|描述|
|-|-|-|
|UInt16|format|子表格式； 设置为 8|
|UInt16|reserved|设置为 0|
|UInt32|length|此子表的字节长度（包括表头）|
|UInt32|language|语言代码（见上文）|
|UInt8|is32[65536]|紧密打包的位数组（总共 8K 字节），指示特定的 16 位（索引）值是否是 32 位字符代码的开始|
|UInt32|nGroups|后面的分组数|

在这里跟随各个组。 每个组具有以下格式：

|类型|名称|描述|
|-|-|-|
|UInt32|startCharCode|该组中的第一个字符代码； 请注意，如果该组用于一个或多个 16 位字符代码（由 is32 数组确定），则该 32 位值将高 16 位设置为零|
|UInt32|endCharCode|该组的最后一个字符代码； 与上面列出的 startCharCode 条件相同|
|UInt32|startGlyphCode|对应起始字符代码的字形索引|

这里有一些注意事项。 使用 endCharCode 而不是计数，因为组匹配的比较通常在现有字符代码上完成，并且有 endCharCode 显式保存每个组添加的必要性。

即使字体不包含特定 16 位起始值的字形，指示特定 16 位值是否是 32 位字符代码的开头的压缩位数组的存在也是有用的。 这是因为系统软件通常需要知道下一个字符开始前多少字节，即使当前字符映射到丢失的字形也是如此。 通过在此表中明确包含此信息，无需将“秘密”知识编码到操作系统中。

因此，尽管 cmap 格式 8 在理论上非常适合使用代理项编码的 Unicode 文本，但它也具有与其他字符集编码一起使用的灵活性。

要确定特定字 (cp) 是否是 32 位代码点的前半部分，可以使用诸如 (is32[cp / 8] & (1 << (cp % 8)) 的表达式。 如果它不为零，则该字是 32 位代码点的前半部分。

0 不是 32 位代码点的高位字的特殊值。 字体可能不会同时具有代码点 0x0000 的字形和高位字 0x0000 的代码点的字形。

自该格式被引入以来，Type 8 cmaps 没有看到任何特殊用途。 渲染引擎通常不直接处理 Unicode 代理——字符代码通常在转换为字形之前转换为 UTF-32——并且没有其他字符编码使用混合的 16/32 位字符。 不鼓励使用这种格式。

## 'cmap' 格式 10–修剪后的数组

格式 10 有点像格式 6，因为它为 32 位字符代码的紧密范围定义了一个修剪数组：

|类型|名称|描述|
|-|-|-|
|UInt16|format|子表格式； 设置为 10|
|UInt16|reserved|设置为 10|
|UInt32|length|此子表的字节长度（包括表头）|
|UInt32|language|语言代码（见上文）|
|UInt32|startCharCode|覆盖的第一个字符代码|
|UInt32|numChars|涵盖的字符代码数量|
|UInt16|glyphs[]|涵盖的字符代码的字形索引数组|

10 格式的 cmap 自推出以来几乎没有什么用处。 它在 Windows 上不受支持，并且仅适用于字符库几乎完全位于 Unicode BMP 之外的连续块中的字体的最佳选择。 这样的字体很少见。

## 'cmap' 格式 12 - 分段覆盖

格式 12 有点像格式 4，因为它定义了 4 字节字符空间中稀疏表示的段。 这是子表格式：

|类型|名称|描述|
|-|-|-|
|UInt16|format|子表格式； 设置为 12|
|UInt16|reserved|设置为 0。|
|UInt32|length|此子表的字节长度（包括表头）|
|UInt32|language|语言代码（见上文）|
|UInt32|nGroups|后面的分组数|

下面是各个组，每个组都有以下格式：

|类型|名称|描述|
|-|-|-|
|UInt32|startCharCode|该组中的第一个字符代码|
|UInt32|endCharCode|该组中的最后一个字符代码|
|UInt32|startGlyphCode|起始字符代码对应的字形索引； 后续字符映射到连续字形|

同样，使用 endCharCode 而不是计数，因为组匹配的比较通常是在现有字符代码上完成的，并且明确地使用 endCharCode 可以节省每个组添加的必要性。

Windows 上覆盖 U+FFFF 以上字符的 Unicode 字体需要格式 12。 它是最有用的支持 32 位的 cmap 格式。

## 'cmap' 格式 13 – 多对一映射

格式 13 是类型 12 'cmap' 子表的修改版本，由 Apple 在内部用作其最后的手段字体和 Unicode 的最后手段字体。 一般而言，它不适用于除万不得已的字体以外的任何字体。

在结构上，格式 13 和 12 是相同的。 唯一的区别在于每个范围内的字形代码的解释。 在格式 13 'cmap' 子表中，范围内的所有字形都映射到相同的字形代码，而在类型 12 'cmap' 子表中，它们映射到顺序字形代码，从给定的代码开始。

为了说明，假设我们在格式 12 'cmap' 表和格式 13 'cmap' 子表中都有以下组：

|类型|名称|值|描述|
|-|-|-|-|
|UInt32|startCharCode|0x4E00|该组中的第一个字符代码|
|UInt32|endCharCode|0x9FCB|该组中的最后一个字符代码|
|UInt32|glyphCode|47|该组的字形索引|

在类型 12 'cmap' 子表中，U+4E95 将映射到字形 (0x4E95 - 0x4E00) + 47 = 196。在格式 13 'cmap' 子表中，它将映射到字形 47。

Type 13 cmaps 仅适用于对 Unicode 块中的所有字符使用相同字形的字体——也就是说，只有类似 Last Resort 的字体才可能需要一个。

## 格式 14：Unicode 变体序列

子表格式 14 指定字体支持的 Unicode 变体序列 (UVSes)。 根据 Unicode 标准，变体序列包含一个基本字符，后跟一个变体选择器； 例如 <U+82A6, U+E0101>。

子表将字体支持的 UVS 分为两类：“默认”和“非默认”UVS。 给定一个 UVS，如果通过在 Unicode 编码子表（即 UCS-4 或 BMP 编码子表）中查找该序列的基本字符获得的字形是用于该序列的字形，则该序列是“默认的” ”紫外线； 否则它是一个“非默认”UVS，并且用于该序列的字形在格式 14 子表本身中指定。

下面的示例显示了字体供应商如何将格式 14 用于支持 JIS-2004 的字体。

（注意在所使用的结构中存在 24 位整数。类型 14 的“cmap”子表不会使数据对齐到四字节边界。这也是唯一一个不独立且不独立的“cmap”子表 完全独立于所有其他；'cmap' 可能不包含单独的类型 14 子表。）


**格式 14 头部（header）**

|类型|名称|描述|
|-|-|-|
|uint16|format|子表格式。 设置为 14。
|uint32|length|此子表的字节长度（包括此表头）
|uint32|numVarSelectorRecords|变体选择器记录数

紧随其后的是“numVarSelectorRecords”变体选择器记录。

**变体选择器记录**

|类型|名称|描述|
|-|-|-|
|uint24|varSelector|变化选择器
|uint32|defaultUVSOffset|默认 UVS 表的偏移量。 可能为 0。
|uint32|nonDefaultUVSOffset|非默认 UVS 表的偏移量。 可能为 0。

变体选择器记录按“varSelector”的递增顺序排序。 没有两个记录可能具有相同的“varSelector”。 记录中的所有偏移量都相对于格式 14 编码子表的开头。

变体选择器记录及其偏移指向的数据指定字体支持的那些 UVS，变体选择器是记录的“varSelector”值。 UVS 的基本字符存储在偏移量指向的表中。 UVS 根据它们是默认还是非默认 UVS 进行分区。

用于非默认 UVS 的字形 ID 在非默认 UVS 表中指定。

### 默认 UVS 表

默认 UVS 表只是 Unicode 标量值的范围压缩列表，表示使用关联变体选择器记录的 varSelector 的默认 UVS 的基本字符。

**默认 UVS 表头**
|类型|名称|描述|
|-|-|-|
|uint32|numUnicodeValueRanges|后面的范围数

紧随其后的是 numUnicodeValueRanges Unicode 值范围，每个范围代表一个连续的 Unicode 值范围。

**Unicode 值范围**
|类型|名称|描述|
|-|-|-|
|uint24|startUnicodeValue|此范围内的第一个值
|BYTE|additionalCount|此范围内附加值的数量

例如，范围 U+4E4D–U+4E4F（3 个值）会将 startUnicodeValue 设置为 0x004E4D 并将 additionalCount 设置为 2。单例范围会将 additionalCount 设置为 0。

(startUnicodeValue + additionalCount) 不得超过 0xFFFFFF。

Unicode 值范围按 startUnicodeValue 的递增顺序排序。 范围不得重叠； 即，(startUnicodeValue + additionalCount) 必须小于以下范围的 startUnicodeValue（如果有）。

## 非默认 UVS 表

非默认 UVS 表是 Unicode 标量值和字形 ID 对的列表。 Unicode 值表示所有非默认 UVS 的基本字符，这些 UVS 使用相关变体选择器记录的“varSelector”，字形 ID 指定要用于 UVS 的字形 ID。

**非默认 UVS 表头**
|类型|名称|描述|
|-|-|-|
|uint32|numUVSMappings|跟随的 UVS 映射数
紧随其后的是“numUVSMappings”UVS 映射。

**UVS表**
|类型|名称|描述|
|-|-|-|
|uint24|unicodeValue|UVS 的基本 Unicode 值
|uint16|glyphID|UVS 的字形 ID

UVS 映射按 unicodeValue 的递增顺序排序。 此表中的任何两个映射都不能具有相同的 unicodeValue 值。

# 例子
下面是一个示例，说明如何在识别 JIS-2004 变体字形的字体中使用格式 14 编码子表。 本例中的 CID（字符 ID）指的是 Adobe Character Collection“Adobe-Japan1”中的那些，并且可以假定与我们示例中字体中的字形 ID 相同。

JIS-2004 更改了一些代码点的默认字形变体。 例如：

JIS-90：U+82A6 ⇒ CID 1142
JIS-2004：U+82A6 ⇒ CID 7961

这两种字形变体都通过使用 UVSes 得到支持，如 Unicode 的 UVS 注册表中的以下示例所示：

U+82A6 U+E0100 ⇒ CID 1142
U+82A6 U+E0101 ⇒ CID 7961

如果字体默认支持 JIS-2004 变体，它将：

* 在 Unicode 编码子表中的 U+82A6 编码字形 ID 7961，
* 在 UVS 编码子表的默认 UVS 表中指定 <U+82A6，U+E0101>（“varSelector”将为 0x0E0101，“defaultUVSOffset”将指向包含 0x0082A6 Unicode 值的数据）
* 在 UVS 编码子表的非默认 UVS 表中指定 <U+82A6，U+E0100> ⇒ 字形 ID 1142（“varSelector”将为 0x0E0100，“nonDefaultBaseUVOffset”将指向包含“unicodeValue”0x0082A6 和“glyphID”1142 的数据 ).
但是，如果字体希望默认支持 JIS-90 变体，它将：

* 在 Unicode 编码子表中的 U+82A6 编码字形 ID 1142，
* 在UVS编码子表的Default UVS Table中指定<U+82A6, U+E0100>
* 在 UVS 编码子表的非默认 UVS 表中指定 <U+82A6, U+E0101> ⇒ 字形 ID 7961

## 特定于平台的信息

Apple 平台不支持格式 0、8 或 10 编码子表。

