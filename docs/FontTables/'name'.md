# “名称”表

## 一般表信息

名称表（标签：“名称”）允许您为功能和设置、版权声明、字体名称、样式名称以及与您的字体相关的其他信息添加人性化的名称。这些包含字体相关信息的名称字符串可以用任何语言提供。名称表中的条目由其他 TrueType 字体表引用，并可供应用程序和实用程序使用，为用户提供有用的信息。字体设计者可以随时以任何语言添加名称表条目，以向世界各地的字体用户提供信息。

名称表是您向应用程序和用户传达字体信息的工具。您应该假设您的字体几乎可以在全球每个地方使用。因此，您的字体应该针对其他语言和文化环境进行本地化。这样，您的字体就可以被世界各地的许多用户使用。

名称表中每个名称记录包含的信息如下：

* 平台识别码（platformID）
* 特定识别码（platformSpecificID）
* 语言识别码（languageID）
* 名称识别码（nameID）
* 名称信息（多语言字符串）

平台标识符代码指定要使用字体的计算机。特定标识符代码指定支持的脚本系统。语言标识符代码是名称字段中使用的文本的语言。名称标识符代码是单个单词或数字描述符。名称信息字符串提供与字体相关的信息。名称字符串是原始字符串数据。用于原始名称数据的字符集编码由平台和特定标识符代码决定。例如，如果平台标识符用于 macOS 并且特定标识符是 Roman，则原始字符串数据是 MacRoman。如果平台标识符是 Unicode，则原始字符串数据是 UTF-16BE 编码格式的 Unicode 文本。因此，字符串可以本地化为任何语言和脚本。

## 名称表格式

名称表头给出了表的格式、表中的名称记录（行）数以及多语言字符名称字符串的偏移量（以字节为单位）。名称表头的格式如下：

'name' 表

|类型|名称|描述|
|-|-|-|
|UInt16|format|格式选择器。设置为 0。|
|UInt16|count|此名称表中的 nameRecords 数量。|
|UInt16|stringOffset|名称字符串开头的偏移量（以字节为单位）。|
|NameRecord|nameRecord[count]|名称记录数组。|
|variable|name|字符串。名称的字符串。请注意，这些不一定是 ASCII！|

OpenType 还定义了格式为 1 的“名称”表。Apple 平台不支持此类“名称”表。

名称记录数组位于名称表标题之后。每个名称记录提供六个条目。以下是 NameRecord 的格式：

**Name 记录**

|类型|名称|描述|
|-|-|-|
|UInt16|platformID|平台标识符代码。|
|UInt16|platformSpecificID|平台特定的编码标识符。|
|UInt16|languageID|语言标识符。|
|UInt16|nameID|名称标识符。|
|UInt16|length|名称字符串长度（以字节为单位）。|
|UInt16|offset|名称字符串相对于 stringOffset 的偏移量（以字节为单位）。|

### 平台标识符

下表给出了支持的平台标识符 (platformID) 代码。已为 Unicode、Macintosh 和 Microsoft 分配了 platformID 代码。platformID 代码 240 到 255 已为用户定义的平台保留，不可用于注册。所有 Apple 平台上都会忽略 platformID 为 0、1 和 3 以外的名称。

**平台标识符**

<table border="1" cellspacing="2" cellpadding="0">
	<caption>Platform Identifiers</caption>
		<tbody><tr align="left" valign="middle">
		<th>
			<div align="left">
			平台ID
			</div>
		</th>
		<th>
			<div align="left">
			平台
			</div>
		</th>
		<th align="left">
			<div align="left">
			平台特定ID
			</div>
		</th>
		</tr>
		<tr align="left" valign="middle">
		<td>0</td>
		<td>Unicode</td>
		<td class="description">表示 Unicode 版本。</td>
		</tr>
		<tr align="left" valign="middle">
		<td>1</td>
		<td>Macintosh</td>
		<td class="description">QuickDraw 脚本管理器代码。</td>
		</tr>
		<tr align="left" valign="middle">
		<td>2</td>
		<td colspan="2">（保留；不使用）</td>
		</tr>
		<tr align="left" valign="middle">
		<td>3</td>
		<td>微软</td>
		<td class="description">微软编码。</td>
		</tr>
	</tbody></table>

早期版本的 macOS 要求使用 platformID 为 1 的名称。不建议在现代平台上使用它。请使用 platformID 为 3 的名称以获得最大兼容性。但是，某些旧版软件可能仍需要 platformID 为 1、platformSpecificID 为 0 的名称。

平台 ID 2 最初用于 ISO/IEC 10646。现在已弃用该用法，因为 ISO/IEC 10646 和 Unicode 具有相同的字符代码分配。

### 平台特定 ID
要完整指定编码，不仅需要声明平台标识符代码 platformID，还需要声明平台特定代码 platformSpecificID。特定平台特定代码的语义取决于所使用的平台代码。

#### Unicode 平台
与“名称”表一起使用的 Unicode 平台特定代码如下：

**Unicode 平台特定编码标识符**

|平台特定ID码|含义|
|-|-|
|0|1.0 版语义|
|1|1.1 版语义|
|2|ISO 10646 1993 语义（已弃用）|
|3|Unicode 2.0 或更高版本的语义（仅限 BMP）|
|4|Unicode 2.0 或更高版本的语义（允许非 BMP 字符）|

Unicode 的首选平台特定代码是 4。Unicode 1.1 和更高版本之间的主要区别在于，Unicode 1.1 中有一个从 U+3400 开始的约 6600 个预先组成的 Hangul 音节的块，在 Unicode 2.0 中被删除并被替换为Unicode 3.0 中的表意文字块。使用 Unicode 的平台特定代码 1 意味着从 U+3400 到 U+4DFF 的字符将被解释为 Hangul 音节。
由于 ISO/IEC 10646 的代码点与 Unicode 标准相同，并且以 10646 编码的任何有效文本也作为 Unicode 有效，因此无需对 Unicode 文本使用特定于平台的代码 2，并且现在已弃用它。

“名称”表未使用 Unicode 平台特定代码 5 和 6。它们仅由“cmap”表使用。

所有基于 Unicode 的名称必须采用 UTF-16BE（大端、两字节编码）。不允许使用 UTF-8 和 UTF-32（一字节和四字节编码）。

#### Macintosh 平台

Macintosh 平台 (platformID = 1) 使用 Macintosh 脚本管理器代码作为 platformSpecificID。这些都是：

**Macintosh 平台特定的编码标识符**

|特定于平台的 ID 代码|脚本|特定于平台的 ID 代码|脚本|
|-|-|-|-|
|0|罗马|17|马拉雅拉姆语
|1|日语|18|僧伽罗语
|2|繁体中文|19|缅甸语
|3|韩语|20|高棉语
|4|阿拉伯语|21|泰语
|5|希伯来语|22|老挝语
|6|希腊语|23|格鲁吉亚语
|7|俄语|24|亚美尼亚语
|8|RSymbol|25|简体中文
|9|梵文|26|藏文
|10|古尔穆奇语|27|蒙古语|
|11|古吉拉特语|28|天啊|
|12|奥里亚语|29|斯拉夫语|
|13|孟加拉语|30|越南语|
|14|泰米尔语|31|信德语|
|15|泰卢固语|32|（未解释）|
|16|卡纳达语|

#### Microsoft 平台
有关 Microsoft 平台特定编码标识符的信息，请参阅 OpenType 规范。

### 语言标识符
语言标识符 (languageID) 代码唯一地定义了名称字符串在名称记录中所使用的语言。与 platformSpecificID 一样，languageID 的解释也是平台特定的。

#### Unicode 平台
对于具有 Unicode platformID 的名称，语言代码未使用，应设置为 0。

#### Macintosh 平台
如果名称具有 Macintosh platformID，则语言代码的解释如下：

**Macintosh 语言代码**
|语言 ID 代码|语言|语言 ID 代码|语言|
|-|-|-|-|
|0|英语|59|普什图语
|1|法语|60|库尔德语
|2|德语|61|克什米尔语
|3|意大利语|62|信德语
|4|荷兰语|63|藏语
|5|瑞典语|64|尼泊尔语
|6|西班牙语|65|梵语
|7|丹麦语|66|马拉地语
|8|葡萄牙语|67|孟加拉语
|9|挪威语|68|阿萨姆语
|10|希伯来语|69|古吉拉特语|
|11|日语|70|旁遮普语|
|12|阿拉伯语|71|奥里亚语|
|13|芬兰语|72|马拉雅拉姆语|
|14|希腊语|73|卡纳达语|
|15|冰岛语|74|泰米尔语|
|16|马耳他语|75|泰卢固语|
|17|土耳其语|76|僧伽罗语|
|18|克罗地亚语|77|缅甸语|
|19|中文（繁体）|78|高棉语|
|20|乌尔都语|79|老挝语|
|21|印度菜|80|越南菜|
|22|泰语|81|印度尼西亚语|
|23|韩语|82|英语|
|24|立陶宛语|83|马来语（罗马文字）|
|25|波兰语|84|马来语（阿拉伯文字）|
|26|匈牙利语|85|阿姆哈拉语|
|27|爱沙尼亚语|86|提格里安语|
|28|拉脱维亚语|87|加拉|
|29|萨米人|88|索马里|
|30|法罗语|89|斯瓦希里语|
|31|波斯语/波斯语|90|卢旺达/卢旺达|
|32|俄语|91|润迪|
|33|中文（简体）|92|海/海|
|34|弗拉芒语|93|马达加斯加|
|35|爱尔兰盖尔语|94|世界语|
|36|阿尔巴尼亚语|128|威尔士语|
|37|罗马尼亚语|129|巴斯克语|
|38|捷克语|130|加泰罗尼亚语|
|39|斯洛伐克语|131|拉丁语|
|40|斯洛文尼亚语|132|盖丘亚语|
|41|意第绪语|133|瓜拉尼语|
|42|塞尔维亚语|134|艾马拉语|
|43|马其顿语|135|鞑靼语|
|44|保加利亚语|136|维吾尔语|
|45|乌克兰语|137|宗喀语|
|46|白俄罗斯语|138|爪哇语（罗马文字）|
|47|乌兹别克语|139|巽他语（罗马文字）|
|48|哈萨克语|140|加利西亚语|
|49|阿塞拜疆语（西里尔字母）|141|南非荷兰语
|50|阿塞拜疆语（阿拉伯文字）|142|布列塔尼语
|51|亚美尼亚语|143|因纽特语
|52|格鲁吉亚语|144|苏格兰盖尔语
|53|摩尔达维亚语|145|马恩岛盖尔语
|54|吉尔吉斯语|146|爱尔兰盖尔语（上面有点）
|55|塔吉克|147|汤加
|56|土库曼语|148|希腊语（多音）
|57|蒙古语（蒙古文字）|149|格陵兰语
|58|蒙古语（西里尔字母）|150|阿塞拜疆语（罗马字母）

#### Microsoft 平台
有关 Microsoft 语言标识符的信息，请参阅 OpenType 规范。

### 名称标识符代码
名称标识符 (nameID) 代码提供与名称字符串相关的单个单词或数字描述。代码 0 到 25 是预定义的。代码 26 到 255 是保留的。代码 256 到 32767 是为变体轴和实例、布局功能和设置等字体特定名称保留的。预定义的名称标识符代码如下表所示：

**名称标识符**

|NameID 代码|描述|
|-|-|
|0| 版权声明。
|1| 字体系列。
|2| 字体子系列。
|3| 唯一子系列标识。
|4| 字体的全名。
|5| 名称表的版本。
|6| 字体的 PostScript 名称。字体中的所有 PostScript 名称必须相同。它们不得超过 63 个字符，并且使用的字符仅限于可打印 ASCII 字符集（U+0021 到 U+007E），减去十个字符 '['、']'、'('、')'、'{'、'}'、'<'、'>'、'/' 和 '%'。
|7| 商标声明。
|8| 制造商名称。
|9| 设计师；字体设计师的姓名。
|10| 描述；字体的描述。可以包含修订信息、使用建议、历史记录、功能等。
|11| 字体供应商的 URL（使用协议，例如 http://、ftp://）。如果 URL 中嵌入了唯一的序列号，则可以使用它来注册字体。
|12| 字体设计者的 URL（使用协议，例如 http://、ftp://）
|13| 许可证说明；字体合法使用方式的说明，或许可使用的不同示例场景。此字段应使用通俗易懂的语言，而不是法律术语。
|14| 许可证信息 URL，可在此找到其他许可信息。
|15| 保留
|16| 首选系列。在 Windows 中，系列名称显示在字体菜单中，子系列名称显示为样式名称。由于历史原因，字体系列最多包含四种样式，但字体设计者可以将四种以上的字体分组为一个系列。首选系列和首选子系列 ID 允许字体设计者包含首选系列/子系列分组。这些 ID 仅在与 ID 1 和 2 不同时才存在。
|17| 首选子系列。在 Windows 中，字体系列名称显示在字体菜单中，子系列名称显示为样式名称。由于历史原因，字体系列最多包含四种样式，但字体设计者可以将四种以上的字体分组为一个系列。首选系列和首选子系列 ID 允许字体设计者包含首选系列/子系列分组。这些 ID 仅在与 ID 1 和 2 不同时才存在。
|18| 兼容全名（仅限 macOS）。在 QuickDraw 中，字体的菜单名称是使用 FOND 资源构建的。这通常与全名匹配。如果您希望字体名称与全名不同，您可以在 ID 18 中插入兼容全名。macOS 本身不使用此名称，但应用程序开发人员（例如 Adob​​e）可能会使用此名称。
|19| 示例文本。这可以是字体名称，也可以是设计者认为是展示字体外观的最佳示例文本的任何其他文本。
|20–24|由 OpenType 定义。
|25|变体 PostScript 名称前缀。如果存在于可变字体中，则可将其用作算法中的系列前缀，以生成变体字体的 PostScript 名称。有关详细信息，请参阅 Adob​​e 技术说明 #5902：“变体字体的 PostScript 名称生成”。
|26–255|为将来的扩展保留。
|256–32767|字体特定的名称（例如，布局功能和设置、变体轴和实例的名称）。

### 名称字符串
名称字符串位于最后一个名称记录之后。它们的长度和偏移位置（以字节为单位）在其相应的名称记录中定义。请务必记住，每个名称字符串都以与其指定平台和平台特定 ID 相关的格式出现在“名称”表中。例如，如果平台和平台特定 ID 是 Unicode 2.0，则文本字符串将根据该标准进行编码。

特别是，Unicode 名称应采用 UTF-16BE（即大端双字节字符）。不得使用 UTF-8 和 UTF-32。（有关 Unicode 编码形式的更多信息，请参阅 Unicode 联盟的 UTF-8、UTF-16、UTF-32 和 BOM 常见问题解答）。对于 Unicode 平台的字符串以及 Windows platformID 和 platformSpecificID 为 1 或 10 的字符串，情况都是如此。

### 示例“名称”表
以下示例显示了如何使用字符串。

**示例“名称”表**

|名称 ID|平台 ID|平台特定 ID|语言 ID|名称文本|
|-|-|-|-|-|
|0 (版权)|3 (Microsoft)|1 (Unicode)|1033 (英语，美国)|© 2020 Apple Inc. 保留所有权利。|
|1 (系列)|3 (Microsoft)|1 (Unicode)|1033 (英语，美国)|Apple Biro|
|2 (样式)|3 (Microsoft)|1 (Unicode)|1033 (英语，美国)|Regular|
||3 (Microsoft)|1 (Unicode)|1028 (繁体中文)|标准體
||3 (Microsoft)|1 (Unicode)|1036 (法语)|Normal
||3 (Microsoft)|1 (Unicode)|1040 (意大利语)|Regolare
||3 (Microsoft)|1 (Unicode)|2052 (简体中文)|常规体
|3 (Unique)|3 (Microsoft)|1 (Unicode)|1033 (英语，美国)|Apple Biro; 14.0d1e7; 2020-09-23
|4 (完整版)|3 (微软)|1 (Unicode)|1033 (英语，美国)|Apple Biro Regular
|5 (版本)|3 (微软)|1 (Unicode)|1033 (英语，美国)|版本 14.0d1e7
|6 (PostScript)|3 (微软)|1 (Unicode)|1033 (英语，美国)|AppleBiro-Regular
|8 (制造商)|3 (微软)|1 (Unicode)|1033 (英语，美国)|Apple Inc.
|9 (设计师)|3 (微软)|1 (Unicode)|1033 (英语，美国)|Apple Inc.
|11 (供应商网址)|3 (微软)|1 (Unicode)|1033 (英语，美国)|http://www.apple.com/
|12 (设计师网址)|3 (微软)|1 (Unicode)|1033 (英语，美国)|http://www.apple.com/
|19（示例文本）|3（Microsoft）|1（Unicode）|1033（英语，美国）|敏捷的棕色狐狸跳过懒狗跑开了。
||3（Microsoft）|1（Unicode）|1036（法语）|喝下这瓶威士忌，它是著名酒评家的赞助人。
||3（Microsoft）|1（Unicode）|1106（威尔士语）|Parciais fy jac codi baw hud llawn dŵr ger tŷ Mabon。
||3（Microsoft）|1（Unicode）|1142（拉丁语）|Sic fugiens, dux, zelotypos, quam Karus haberis。

## 平台特定信息
不再建议在 macOS 上使用的字体具有带有 Macintosh 平台 ID 和 MacRoman 平台特定 ID 的 PostScript 名称。

如果安装了具有相同 PostScript 名称的两种字体，Apple 平台会将它们视为重复项，并且只有一个可供使用。

如果字体有两个不一致的 PostScript 名称，则未定义将使用哪一个。

字体包中的字体将在“FOND”资源中具有 PostScript 名称。 这些名称应与相应“sfnt”资源的“名称”表中的 PostScript 名称相匹配。 由于遗留原因，“FOND”PostScript 名称是首选，并且可能会覆盖“名称”表 PostScript 名称。

当字体通过字体面板或 macOS 上的字体册分组为系列时，将使用首选系列和首选样式名称（如果存在）。

在 Apple 平台上，“名称”表应包含以下条目：

* 系列（或首选系列）
* 样式（或首选样式）
* 完整
* PostScript

这些都必须以 Unicode 或 Macintosh 平台 ID 形式提供。Unicode 形式可以使用 Unicode 平台 ID 或 Microsoft 平台 ID 以及适当的平台特定 ID（1 或 10）。

## 依赖项
“名称”表本身不依赖于字体中的其他表。但是，其他表（例如“feat”（功能名称）表或“fvar”（字体变体）表）包含名称标识符，这些标识符将用于提供字体功能或变体控制的 UI 元素。在这些其他表之一中找到的任何名称标识符都必须在“名称”表中至少有一个实例。