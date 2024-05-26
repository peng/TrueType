# “post”表
## 一般表信息
“post”表包含在 PostScript 打印机上使用 TrueType 字体所需的信息。它包含 FontInfo 字典条目所需的数据以及字体中所有字形的 PostScript 名称。它还包含 PostScript 驱动程序进行内存管理所需的内存使用信息。

“post”表记录在下表 72 中。第一项指定表格式。有五种可能性：格式 1、格式 2、格式 2.5、格式 3 和格式 4。每个版本都记录在下面。只有格式 2、2.5 和 4 需要子表。

**表 72：** “post”表

|类型|名称|描述|
|-|-|-|
|Fixed|format|本表的格式|
|Fixed|italicAngle|斜体角度（以度为单位）|
|FWord|underlinePosition|下划线位置|
|FWord|underlineThickness|下划线粗细|
|uint32|isFixedPitch|字体为等宽字体；如果字体为等宽字体，则设置为 1，否则设置为 0（注意：为了与旧版本的 TrueType 规范保持兼容性，接受任何非零值作为字体为等宽字体的含义）|
|uint32|minMemType42|将 TrueType 字体下载为 Type 42 字体时的最小内存使用量|
|uint32|maxMemType42|将 TrueType 字体下载为 Type 42 字体时的最大内存使用量|
|uint32|minMemType1|将 TrueType 字体下载为 Type 1 字体时的最小内存使用量|
|uint32|maxMemType1|将 TrueType 字体下载为 Type 1 字体时的最大内存使用量|

isFixedPitch 标志用于指示字体是否为等宽字体。等宽字体是指所有字形在所有点大小下（即在“hmtx”和“hdmx”表中）都具有相同的水平宽度，或者宽度为零。等宽字体还必须正确设置“hhea”表中的最大宽度字段。请注意，在 OS X 上，还需要确保“NFNT”位图字体的字形宽度与 TrueType 字体中的等宽字体度量一致。

minMemType42、maxMemType42、minMemType1 和 maxMemType1 条目是必需的，因为如果在下载字体之前知道可下载 TrueType 字体的虚拟内存要求，PostScript 驱动程序可以更好地进行内存管理。如果已知此信息，则应提供此信息。如果不知道，请将值设置为零。

最大内存使用量等于最小内存使用量加上最大运行时内存使用量。最大运行时内存使用量取决于 TrueType 字体缩放器可能光栅化的任何位图的最大带大小。可以通过以不同的点大小渲染字符并比较内存使用量来计算运行时内存使用量。

下载的 TrueType 字体的内存使用量将根据它在打印机上定义为 TrueType 还是 Type 1 字体而有所不同。可以通过调用 VMStatus、下载字体并再次调用 VMStatus 来计算最小内存使用量。

## 'post' 格式 1

字体中字形的放置顺序由字体开发人员决定。要使用格式 1，字体必须精确包含标准 Macintosh 顺序中的 258 个字形。对于此类字体，字形名称取自系统。因此，此格式不需要特殊的子表。

这 258 个字形的名称依次为：

|字形 ID|名称|
|-|-|
|0|.notdef|
|1|.null|
|2|非标记返回|
|3|空格|
|4|感叹号|
|5|引用符号|
|6|数字符号|
|7|美元|
|8|百分比|
|9|和号|
|10|单引号|
|11|左括号|
|12|右括号|
|13|星号|
|14|加号|
|15|逗号|
|16|连字符|
|17|句号|
|18|斜线|
|19|零|
|20|一|
|21|二|
|22|三|
|23|四|
|24|五|
|25|六|
|26|七|
|27|八|
|28|九|
|29|冒号|
|30|分号|
|31|小于|
|32|等号|
|33|大于|
|34|问题|
|35|于|
|36|A|
|37|B|
|38|C|
|39|D|
|40|E|
|41|F|
|42|G|
|43|H|
|44|I|
|45|J|
|46|K|
|47|L|
|48|M|
|49|N|
|50|O|
|51|P|
|52|Q|
|53|R|
|54|S|
|55|T|
|56|U|
|57|V|
|58|W|
|59|X|
|60|Y|
|61|Z|
|62|左括号|
|63|反斜杠|
|64|右括号|
|65|ASCII 圆括号|
|66|下划线|
|67|重音符|
|68|a|
|69|b|
|70|c|
|71|d|
|72|e|
|73|f|
|74|g|
|75|h|
|76|i|
|77|j|
|78|k|
|79|l|
|80|m|
|81|n|
|82|o|
|83|p|
|84|q|
|85|r|
|86|s|
|87|t|
|88|u|
|89|v|
|90|w|
|91|x|
|92|y|
|93|z|
|94|左括号|
|95|横线|
|96|右括号|
|97|ASCII 波浪线|
|98|Adieresis|
|99|Aring|
|100|Ccedilla|
|101|Eacute|
|102|Ntilde|
|103|Odieresis|
|104|Udieresis|
|105|aacute|
|106|agrave|
|107|acircumflex|
|108|adieresis|
|109|atilde|
|110|aring|
|111|ccedilla|
|112|eacute|
|113|egrave|
|114|ecircumflex|
|115|edieresis|
|116|iacute|
|117|igrave|
|118|icircumflex|
|119|idieresis|
|120|ntilde|
|121|oacute|
|122|ograve|
|123|ocircumflex|
|124|odieresis|
|125|otilde|
|126|uacute|
|127|ugrave|
|128|ucircumflex|
|129|udieresis|
|130|dagger|
|131|degree|
|132|cent|
|133|sterling|
|134|section|
|135|bullet|
|136|passage|
|137|germandbls|
|138|registered|
|139|copyright|
|140|trade|
|141|锐角|
|142|分音符|
|143|音符相等|
|144|AE|
|145|Oslash|
|146|无穷大|
|147|加减|
|148|减等|
|149|大于等|
|150|日元|
|151|mu|
|152|partialdiff|
|153|求和|
|154|乘积|
|155|pi|
|156|积分|
|157|阴性或阳性|
|158|阳性或阳性|
|159|Omega|
|160|ae|
|161|oslash|
|162|questiondown|
|163|exclamdown|
|164|logicalnot|
|165|根号|
|166|florin|
|167|approxequal|
|168|Delta|
|169|guillemotleft|
|170|guillemotright|
|171|省略号|
|172|nonbreakingspace|
|173|Agrave|
|174|Atilde|
|175|Otilde|
|176|OE|
|177|oe|
|178|endash|
|179|emdash|
|180|quotedblleft|
|181|quotedblright|
|182|quoteleft|
|183|quoteright|
|184|divide|
|185|lozenge|
|186|ydieresis|
|187|Ydieresis|
|188|分数|
|189|货币|
|190|guilsinglleft|
|191|guilsinglright|
|192|fi|
|193|fl|
|194|daggerdbl|
|195|periodcentered|
|196|quotesinglbase|
|197|quotedblbase|
|198|perthousand|
|199|Acircumflex|
|200|Ecircumflex|
|201|Aacute|
|202|Edieresis|
|203|Egrave|
|204|Iacute|
|205|Icircumflex|
|206|Idieresis|
|207|Igrave|
|208|Oacute|
|209|Ocircumflex|
|210|apple|
|211|Ograve|
|212|Uacute|
|213|Ucircumflex|
|214|Ugrave|
|215|dotlessi|
|216|circumflex|
|217|tilde|
|218|长音符|
|219|breve|
|220|点重音符|
|221|环|
|222|变音符|
|223|hungarumlaut|
|224|ogonek|
|225|卡隆|
|226|斜线|
|227|斜线|
|228|Scaron|
|229|scaron|
|230|Zcaron|
|231|zcaron|
|232|brokenbar|
|233|Eth|
|234|eth|
|235|Yacute|
|236|yacute|
|237|Thorn|
|238|thorn|
|239|minus|
|240|multiply|
|241|onesuperior|
|242|twosuperior|
|243|threesuperior|
|244|onehalf|
|245|onequarter|
|246|threequarters|
|247|franc|
|248|Gbreve|
|249|gbreve|
|250|Idotaccent|
|251|Scedilla|
|252|scedilla|
|253|Cacute|
|254|cacute|
|255|Ccaron|
|256|ccaron|
|257|dcroat|

当 OS X 8.5 发布时，MacRoman 字符集被重新定义，用欧元取代通用货币符号。但是，为了避免破坏使用它的字体和软件，Macintosh 的标准字形排序并未更新。字体供应商应尽可能更新其字体以包含欧元，以便在 OS X 8.5 及更高版本上正常运行。带有欧元的字体不能使用“post”格式 1 或 2.5。

## “post”格式 2

格式 2 用于包含一些不在标准集中的字形或其字形排序非标准的字体。此子表中的字形名称索引数组将此字体中的字形映射到名称索引。如果名称索引介于 0 和 257 之间，则将名称索引视为 Macintosh 标准顺序中的字形索引。如果名称索引介于 258 和 32767 之间，则减去 258 并使用该值对表末尾的 Pascal 字符串列表进行索引。通过这种方式，字体可以将其部分字形映射到标准字形名称，将部分字形映射到其自己的名称。

索引号 32768 到 65535 保留供将来使用。如果您不想将 PostScript 名称与特定字形关联，请使用指向名称 .notdef 的索引号 0。

请注意，numberOfGlyphs 字段必须等于“maxp”（最大配置文件）表的 numGlyphs 字段。

**表 73：** “post”格式 2

|类型|名称|描述|
|-|-|-|
|uint16|numberOfGlyphs 字形数量|
|uint16|glyphNameIndex[numberOfGlyphs]|此字形在“post”字符串表中的序数。这不是偏移量。
Pascal|字符串名称[numberNewGlyphs]|长度为字节的字形名称 [变量]（Pascal 字符串）

## 'post' 格式 2.5

格式 2.5 是一种节省空间的格式，适用于包含标准字形集的纯子集或包含标准集的重新排序的字体。此格式适用于仅包含标准 Apple 字形集中的字形但这些字形以非标准顺序排列的字体或缺少某些字形的字体。该表包含字体中每个字形的一个字节。该字节被视为有符号偏移量，它将此字体中使用的字形索引映射到标准字形索引中。例如，假设字体包含三个字形 A、B 和 C。假设 C 首先出现，B 其次出现，A 第三出现。这些字形是标准排序中的第 37、38 和 39 个字形。 “post”表将包含字节 +39、+37、+35，因为：

offset[0] 索引 C，0 + 39 = 39 是 C 的标准索引

offset[1] 索引 B，1 + 37 = 38 是 B 的标准索引

offset[2] 索引 A，2 + 35 = 37 是 A 的标准索引

请注意，numberOfGlyphs 字段必须等于“maxp”（最大配置文件）表的 numGlyphs 字段。

**表 74：** “post”格式 2.5

|类型|名称|描述|
|-|-|-|
|uint16|numberOfGlyphs|字形数量
int8|offset[字形数量|图形索引与字形标准顺序之间的差异

当 OS X 8.5 发布时，MacRoman 字符集被重新定义，用欧元取代通用货币符号。但是，为了避免破坏使用它的字体和软件，Macintosh 的标准字形排序并未更新。字体供应商应尽可能更新其字体以包含欧元，以便在 OS X 8.5 及更高版本上正常运行。带有欧元的字体不能使用“post”格式 1 或 2.5。

自 2000 年 2 月起，使用“post”格式 2.5 已弃用。字体供应商不应使用格式 2.5 在其字体中放置“post”表，而应将现有字体转换为不同的“post”表格式。

## “post”格式 3
格式 3 可以创建一种特殊的字体，而不必负担大量“post”表的字形名称。此格式指定不为此字体中的字形提供 PostScript 名称信息。此格式在 PostScript 打印机上的打印行为未指定，但它不应导致致命或不可恢复的错误。某些驱动程序可能不打印任何内容，其他驱动程序可能会尝试使用默认命名方案进行打印。此格式不需要特殊的子表。

Apple 建议在大多数情况下不要使用“post”表格式 3，因为它可能会给某些打印机驱动程序和 PDF 文档带来问题。节省的磁盘空间通常不能弥补潜在的功能损失。

## “post”格式 4
日文、中文或韩文打印机上的复合字体仅适用于字符代码。AAT 打印机驱动程序只知道字形索引值。TrueType 缩放器使用格式 4“post”表重新编码映射到打印机上的复合字体的字体。此编码包括使用字符代码命名字形。驱动程序具有 PostScript 代码，它知道如何获取此 ASCII 字符串，删除前导“a”，并将其余部分转换为十六进制。得到的十六进制数是字形的字符代码。以此方式，使用打印机上的复合字体。

任何映射到打印机上的复合字体的字体都需要包含格式 4“post”表。格式 4“post”表的结构如下：“post”表头后跟一个 uint16 值数组。每个字形都需要一个条目。数组中的索引是字形索引。数组中的数据是映射到该字形的字符代码，如果该字形没有关联的字符代码，则为 0xFFFF。

通常，格式 4“post”表不再是必要的，应避免使用。

## 依赖项
如果“post”表暗示字体中的字形数量（对于除 3 之外的每个“post”表格式都是如此），则“post”表暗示的字体中的字形数量必须与最大配置文件（“maxp”）表中找到的字形数量相匹配。