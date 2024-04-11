# “ltag”表
  
## 介绍

“ltag”(language tags)表提供数字代码和 IETF 语言标记之间的映射。 数字代码用于 Unicode 平台字符串的“名称”表的语言字段。 这些代码还与“feat”和“morx”表结合使用，以提供特定于语言的整形。

使用 IETF 语言标签的原因有很多。 首先，它们是标准且通用的。 特别是，它们由 OS X 和 iOS 上的区域设置使用。 其次，它们是可扩展的，不需要预先确定支持的语言的枚举。

该表使用两种结构。


**'ltag' FTStringRange**
|类型|名称|描述|
|-|-|-|
|UInt16|offset|从表的开头到字符串的开头的偏移量
|UInt16|length|字符串长度（以字节为单位）

**'ltag' 头部**

|类型|名称|描述|
|-|-|-|
|UInt32|	version|表版本； 目前 1
|UInt32|	flags|表标志； 目前没有定义
|UInt32|	numTags|后面的语言标签数量
|FTStringRange[]|	tagRange|每个标签字符串的范围

每个标签有一个范围。 偏移量是从表的开头开始的。

flags 字段当前未使用，应为 0。当前版本为 1。

IETF 语言标签采用 ASCII 格式，因此可以解释为 UTF-8 或任何其他与 ASCII 兼容的文本编码。

如果我们有一种同时具有英语和西班牙语名称的字体，我们可以构建以下“ltag”表：

“ltag”样例表

|类型|值|描述|
|-|-|-|
|UInt32|	1|	版本
|UInt32|	0|	标志
|UInt32|	2|	标签数量
|FTStringRange|	0,2|	第一个标签
|FTStringRange|	2,2|	第二个标签
|char[]|	"ensp"|	标签字符串

这会将英语映射到语言代码 0，将西班牙语映射到语言代码 1。然后我们可以在具有 Unicode 平台名称的名称表中使用它：

如何使用“ltag”

|语言代码|值|
|-|-|
|-1 (不要在意)|	Geneva|
|0|	Geneva|
|1|	Ginebra|

语言标签也被“feat”和“morx”表使用，使用新的始终独占的功能 39（语言代码）。

一个标准的例子是西里尔斜体字母在塞尔维亚以一种方式书写，而在其他地方以另一种方式书写。 我们可以添加到“ltag”表中：

“ltag”样例表
 
 |类型|值|描述|
|-|-|-|
|UInt32|	1|	版本
|UInt32|	0|	标志
|UInt32|	3|	标签数量
|FTStringRange|	0,2|	第一个标签
|FTStringRange|	2,2|	第二个标签
|FTStringRange|	4,2|	第三个标签
|char[]|	"ensp"|	标签字符串

然后，我们可以定义一个具有特征类型 39 和选择器类型 3 的字体特征。（我们在此处向“ltag”索引添加 1，因为选择器类型 0 意味着独占特征“无变化”。）然后我们可以定义“ morx' 子表将标准西里尔字形映射到塞尔维亚语特定字形。

请注意，使用“ltag”意味着语言标记 ID 是特定字体的内部标记。 这类似于 glyphID 特定于字体的方式。 任何需要知道特定字体上下文之外的字形标识的内容都需要通过“post”表将其字形 ID 转换为 PostScript 名称。 类似地，任何需要了解特定字体上下文之外的语言标记身份的内容都需要通过“ltag”表将标记 ID 转换为 IETF 标记。

## 用户界面问题：

IETF 语言自然地与 OS X 和 iOS 用户界面以及 ftxdumperfuser 等工具结合在一起。 人们可以使用这样的语句

[[NSLocale autoupdatingCurrentLocale] displayNameForKey:NSLanguageIdentifier value:tag]

获取在 UI 中使用的正确字符串。 这也与系统其他地方使用的区域设置信息密切相关。

## 平台特定信息

OS X 10.9 (Mavericks) 及更高版本以及 iOS 7.0 及更高版本支持“ltag”表。 当前仅支持“ltag”表与“morx”（扩展变形）和“feat”（字体功能）表结合使用。

## 工具

ftxdumperfuser 完全支持“ltag”表。 处理 ATIF 时，ftxenhancer 将根据需要生成或扩展“ltag”表。