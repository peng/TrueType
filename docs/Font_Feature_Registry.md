# 字体功能注册表
## 简介
本文档描述了使用 CoreText 的应用程序可用的当前定义的排版和布局功能集。它从多个角度描述了这些功能，包括字体设计者、用户和应用程序开发人员。这是一个动态列表 - AAT 架构允许定义新类型的功能，而无需修改应用程序或系统软件本身。您可以在此处向注册表提交新功能。

## 设计者/用户模型
AAT 中的排版效果是通过使用两个 16 位数字（称为功能和选择器）来实现的。（选择器通常称为“设置”。）功能代码表示一般效果类别（例如连字），而选择器代码表示特定效果（例如罕见连字）。

功能分为“独有”和“非独有”。这表示是否可以同时选择给定功能类型中的多个不同选择器。因此，可以同时打开常见和罕见连字，而不可能同时将给定分数显示为垂直和对角线。

对于非独有功能，选择器成对出现，由偶数（0、2、4、...）和其后的奇数（1、3、5、...）组成。偶数表示选择器处于打开状态，奇数表示选择器处于明确关闭状态。

例如，连字功能具有用于常见连字的选择器。选择器 2 表示要打开它们，而选择器 3 则强制关闭它们。现在，Unicode 包含预定义的 fi 连字，fi U+FB01 LATIN SMALL LIGATURE FI。出于兼容性原因，Unicode 中包含它，通常不应由用户插入文本。如果出于任何原因，则可以使用功能/选择器对 1/3 将连字显示为单独的 f 和 i 字形。

在下表中，此类成对选择器显示的值始终为偶数，表示打开该功能。

## 定义的功能
以下是主要功能类型的列表，其中包含指向其描述的链接。这不是可能的功能/选择器对的详尽列表。特别是，字体设计者可以根据需要使用自定义功能/选择器对。如果正确设置了“feat”、“morx”和“name”表，则此类自定义功能/选择器对将出现在 UI 中。大于 255 的功能类型保留用于自定义功能。

AAT 字体功能注册表的早期版本包含许多功能/选择器对，现在不鼓励使用这些功能/选择器对。通常，当可以通过更改字符流实现相同效果时，不应使用字体功能来更改文本的外观。

例如，功能/选择器对 kMathematicalExtrasType/kAsteriskToMultiplyOnSelector 用于使星号 (*) 具有乘号 (×) 的外观。两者都以 Unicode 编码（星号为 U+002A，乘号为 U+00D7）。此类更改通常会让用户感到困惑，因为他们无法分辨文本本身是否发生了变化，还是只是其外观发生了变化。此类功能/选择器对通常是在所有文本都可以假定为 Unicode 之前定义的。由于 OS X 和 iOS 上的所有文本现在都表示为 Unicode，因此通常不应使用此类功能/选择器对。

例外情况是，字符仅出于兼容性原因才采用 Unicode，例如连字符。

不鼓励和弃用的选择器如下所示。

### 所有印刷功能

|特征常数|特征值|特征类型|
|-|-|-|
|kAllTypographicFeatures|0|非独占|

“所有排版功能”功能类型允许用户指定是否应发生任何效果。这是一个全有或全无的选项 — 如果关闭，则忽略所有其他规范。如果用户收到非 AAT 文档并希望确保文档不会重排，则可能会关闭此功能。

请注意，此功能应仅用于调试目的而显示在 UI 中。它不应显示给一般用户，因为它将禁用使文本清晰易读所需的功能。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|所有印刷功能|kAllTypeFeaturesOnSelector<br>kAllTypeFeaturesOffSelector|0|打开或关闭所有其他功能。此功能/选择器对是必需的，并将由 ftxenhancer 自动添加到“morx”表中。

### 连字

|特征常数|特征值|特征类型|
|-|-|-|
|k连字符|1|非排他性|

连字特征类型允许从不同类型的连字中进行选择。它是一种非排他性特征类型。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|必需连字|kRequiredLigaturesOnSelector<br>kRequiredLigaturesOffSelector|0|语言上必需的连字，例如阿拉伯语或印地语中出现的连字。这通常不应在 UI 中可见。|
|常用连字|kCommonLigaturesOnSelector<br>kCommonLigaturesOffSelector|2|通常出现在设置良好的文本中的连字，例如英语中的“fi”和“fl”连字。（请注意，此类连字可以在 Unicode 中单独编码，但只能作为兼容字符。）|
|罕见连字|kRareLigaturesOnSelector<br>kRareLigaturesOffSelector|4|字体中比常见类别中包含的连字更少见的连字，例如“fj”连字。 （请注意，此类连字可以在 Unicode 中单独编码，但只能作为兼容字符。）
|徽标|kLogosOnSelector<br>kLogosOffSelector|6|表示徽标（例如商标）的连字。例如，输入单词“Taligent”并看到 Taligent 徽标。不应使用此功能/选择器对；相反，应将适当的图形插入文本中。
|字谜图片|kRebusPicturesOnSelector<br>kRebusPicturesOffSelector|8|表示单词或音节的图片连字。|
|双元音连字|kDiphthongLigaturesOnSelector<br>kDiphthongLigaturesOffSelector|10|像 Æ 和 æ 这样的连字。强烈不建议使用此选择器。|
|方格连字|kSquaredLigaturesOnSelector<br>kSquaredLigaturesOffSelector|12|这些连字的组成字母以格子形式排列，这样连字就可以容纳在单个字母的空间中。有关示例，请参阅 Unicode U+3300 至 U+3357 和 U+337B 至 U+337F。
|方格连字，缩写|kAbbrevSquaredLigaturesOnSelector
<br>kAbbrevSquaredLigaturesOffSelector|14|这些与前面描述的连字类似，但采用缩写形式。|
|符号连字|kSymbolLigaturesOnSelector<br>kSymbolLigaturesOffSelector|16|使用图形显示的连字（例如表情符号）
|上下文连字|kContextualLigaturesOnSelector<br>kContextualLigaturesOffSelector|18|在某些上下文中出现，而在其他上下文中不出现的连字。
|历史连字|kHistoricalLigaturesOnSelector<br>kHistoricalLigaturesOffSelector|20|通常当前不使用的连字。

### 草书连接
|特征常量|特征值|特征类型|
|-|-|-|
|kCursiveConnection|2|独家|

草书连接特征类型用于草书连接文字。它是阿拉伯语的必需特征，但也可用于其他文字。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|未连接|kUnconnectedSelector|0|完全禁用草书连接。请注意，对于某些脚本，选择此选项将导致语言外观不正确。
|部分连接|kPartiallyConnectedSelector|1|选择以非上下文方式连接的预绘制字母形式。
|草书|kCursiveSelector|2|选择完整的上下文字母形式连接。对于需要此行为的脚本，此设置必须始终是字体中的默认设置。

### 字母大小写

|特征常数|特征值|特征类型|
|-|-|-|
|kLetterCase|3|独占|

字母大小写功能类型用于以上下文或非上下文方式指定字母大小写的更改（在大小写有意义的脚本中）。

字母大小写功能已弃用。请改用小写和大写功能。

<table summary="Selectors for the Letter Case feature">
		<tbody><tr>
		<th>选择器名称</th>
		<th>选择器常数</th>
		<th>选择器值</th>
		<th>选择器功能</th>
		</tr>
		<tr>
		<td class="deprecatedDescription">大小写</td>
		<td class="deprecated"><s>kUpperAndLowerCaseSelector</s></td>
		<td class="deprecated">0</td>
		<td class="deprecatedDescription">默认设置；无论用户指定什么大小写，它都会留下字母。</td>
		</tr>
		<tr>
		<td class="deprecatedDescription">全部大写</td>
		<td class="deprecated"><s>kAllCapsSelector</s></td>
		<td class="deprecated">1</td>
		<td class="deprecatedDescription">将所有与上下文无关的字母转换为大写。请记住，这种效果（与本文档中描述的所有其他效果一样）仅发生在字母的外观上；即使通过使用此功能，小写字母可能具有大写外观，但用户键入的字符串保持不变（即仍然是小写）。</td>
		</tr>
		<tr>
		<td class="deprecatedDescription">全部小写</td>
		<td class="deprecated"><s>kAllLowerCaseSelector</s></td>
		<td class="deprecated">2</td>
		<td class="deprecatedDescription">将所有与上下文无关的字母转换为小写。</td>
		</tr>
		<tr>
		<td class="deprecatedDescription">小帽子</td>
		<td class="deprecated"><s>kSmallCapsSelector</s></td>
		<td class="deprecated">3</td>
		<td class="deprecatedDescription">将与上下文无关的小写字母转换为真正的小型大写字母形式。</td>
		</tr>
		<tr>
		<td class="deprecatedDescription">Initial Caps</td>
		<td class="deprecated"><s>kInitialCapsSelector</s></td>
		<td class="deprecated">4</td>
		<td class="deprecatedDescription">根据上下文将单词的第一个字母转换为大写，其余字母转换为小写。</td>
		</tr>
		<tr>
		<td class="deprecatedDescription">首字母大写字母和小型大写字母</td>
		<td class="deprecated"><s>kInitialCapsAndSmallCapsSelector</s></td>
		<td class="deprecated">5</td>
		<td class="deprecatedDescription">根据上下文将单词的第一个字母转换为大写字母，其余字母转换为小写字母。</td>
		</tr>
	</tbody></table>

### 垂直替代
|特征常数|特征值|特征类型|
|-|-|-|
|kVerticalSubstitution|4|非排他性|

垂直替换功能类型可用于指定字形需要在垂直文本中更改其外观。

此功能只有一个选择器：

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|垂直替换|kSubstituteVerticalFormsOnSelector<br>kSubstituteVerticalFormsOffSelector|0|打开该功能。|

### 语言重排

|特征常数|特征值|特征类型|
|-|-|-|
|kLinguisticRearrangement|5|非排他性|

语言重排特征类型指定是否应进行字形的语言重排（例如南亚文字中发生的重排）。默认情况下，对于代表这些文字的字体，此功能处于启用状态。

需要注意的是，此功能不同于语言重排的概念，当以从左到右的文字（例如拉丁文）为主的文本与以从右到左的文字（例如希伯来文）为主的文本混合时，就会发生语言重排。

通常，此功能不应在 UI 中可见。

此功能只有一个选择器：

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|语言重排|kLinguisticRearrangementOnSelector<br>kLinguisticRearrangementOffSelector|0|打开该功能。|

### 数字间距
|特征常数|特征值|特征类型|
|-|-|-|
|kNumberSpacing|6|独有|

数字间距特征类型指定数字外观的选择。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|等宽数字|kMonospacedNumbersSelector|0|均匀宽度的数字，适用于在列中显示。有时称为“列式”数字。|
|比例数字|kProportionalNumbersSelector|1|宽度变化的数字。|
|三分之一宽度数字|kThirdWidthNumbersSelector|2|细数字。|
|四分之一宽度数字|kQuarterWidthNumbersSelector|3|非常细的数字。|

### 智能花饰
|功能常量|功能值|功能类型|
|-|-|-|
|kSmartSwash|8|非排他性|

智能花饰功能类型控制上下文花饰替换。这些花饰基于上下文分析而非简单替换而出现。这是一种非排他性功能类型。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|单词首字母花饰|kWordInitialSwashesOnSelector<br>kWordInitialSwashesOffSelector|0|可出现在单词（或行）开头的特殊形式。|
|单词结尾花饰|kWordFinalSwashesOnSelector<br>kWordFinalSwashesOffSelector|2|可出现在单词（或行）结尾的特殊形式。|
|行首字母花饰|<s>kLineInitialSwashesOnSelector</s><br><s>kLineInitialSwashesOffSelector</s>|4|只能出现在行开头的特殊形式。CoreText 不支持此功能。|
|行尾花饰|<s>kLineFinalSwashesOnSelector<br>kLineFinalSwashesOffSelector</s>|6|只能出现在行尾的特殊形式。CoreText 不支持这种形式。|
|非尾花饰|kNonFinalSwashesOnSelector<br>kNonFinalSwashesOffSelector|8|用于单词开头或中间的形式。例如，使用长 s (ſ) 表示中间 s 的古老用法。|

### 变音符号
|功能常量|功能值|功能类型|
|-|-|-|
|kDiacritics|9|独占|

变音符号功能类型允许控制变音符号（即重音符号或应用元音）在文本中的显示方式。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|显示变音符号|kShowDiacriticsSelector|0|这是默认值。这意味着正常显示变音符号（即，在正确的位置附加到其基本形式）。|
|隐藏变音符号|kHideDiacriticsSelector|1|不显示变音符号。这在阿拉伯儿童读物文本中很有用，其中相同的文本可以为一个阅读受众显示元音，而为另一个阅读受众显示不带元音。|
|分解变音符号|kDecomposeDiacriticsSelector|2|显示变音符号，但不是将它们附加到其基本形式，而是将它们与其余文本内联显示。|

### 垂直位置
|特征常数|特征值|特征类型|
|-|-|-|
|kVerticalPosition|10|独占|

垂直位置特征类型控制上标和下标等内容。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|无垂直位置|kNormalPositionSelector|0|这是默认值。这意味着显示没有垂直位移的文本。|
|上级|kSuperiorsSelector|1|将字体中具有上级形式的任何字符更改为这些形式。|
|下级|kInferiorsSelector|2|将字体中具有下级形式的任何字符更改为这些形式。|
|序数|kOrdinalsSelector|3|根据上下文将某些字母更改为其上级形式，例如在西班牙语中从 1a 更改为 1ª。|
|科学下级|kScientificInferiorsSelector|4|将任何具有它们的字符更改为为技术上下文设计的下级形式（如 H2O）。|

### 分数
|特征常数|特征值|特征类型|
|-|-|-|
|kFractions|11|独有|

分数特征类型控制分数的选择 and/or 生成。

选择器名称 选择器常数 选择器值 选择器功能
无分数 kNoFractionsSelector 0 这意味着不应自动形成分数。
垂直分数 kVerticalFractionsSelector 1 形成字体中存在的垂直（预绘制）分数。
对角线分数 kDiagonalFractionsSelector 2 作用类似于垂直分数选择器，但分数将使用上级和下级（或特殊用途的分子和分母形式，如果字体中存在）合成。

### 重叠字符
|特征常数|特征值|特征类型|
|-|-|-|
|kOverlappingCharacters|13|非排他性|

重叠字符特征类型允许用户防止字符上的长尾与其他字符发生冲突。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|重叠预防|kPreventOverlapOnSelector<br>kPreventOverlapOffSelector|0|打开或关闭重叠预防。|

### 排版附加功能
|功能常数|功能值|功能类型|
|-|-|-|
|kTypographicExtras|14|非独占|

排版附加功能类型表示与精细排版相关的效果集合。它是一种非独占功能类型。

除了斜线/非斜线选择器外，不鼓励使用此功能。字体功能不应用来模仿底层文本中可能的变化，因为这会让用户感到困惑。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|连字符到长破折号|<s>kHyphensToEmDashOnSelector<br>kHyphensToEmDashOffSelector</s>|0|使两个相邻的连字符变为单个长破折号。不鼓励使用此选择器。|
|连字符到短划线|<s>kHyphenToEnDashOnSelector<br>kHyphenToEnDashOffSelector</s>|2|将空格-连字符-空格或数字-连字符-数字组中的连字符更改为短划线。不鼓励使用此选择器。|
|无斜线零|kSlashedZeroOnSelector<br>kSlashedZeroOffSelector|4|确保始终使用无斜线零（即使字体将斜线零指定为默认值），当然前提是字体中确实存在无斜线零。|
|表格问号|<s>kFormInterrobangOnSelector<br>kFormInterrobangOffSelector</s>|6|将字符串“?!”或“!?”映射到问号（如果字体中存在）。不鼓励使用此选择器。|
|智能引号|<s>kSmartQuotesOnSelector<br>kSmartQuotesOffSelector</s>|8|根据上下文用弯引号替换直引号。不建议使用此选择器。
|句点到省略号|<s>kPeriodsToEllipsisOnSelector<br>kPeriodsToEllipsisOffSelector</s>|10|用省略号替换三个句点的序列。不建议使用此选择器。

### 数学附加功能
|特征常数|特征值|特征类型|
|-|-|-|
|kMathematicalExtras|15|非独占

数学附加功能类型表示一组可用于设置数字和数学的效果。它是一种非独占功能类型。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|连字符转为减号|<s>kHyphenToMinusOnSelector<br>kHyphenToMinusOffSelector</s>|0|将空格-连字符-空格或数字-连字符-数字组中的连字符更改为减号。不鼓励使用此选择器。|
|星号转为乘号|<s>kAsteriskToMultiplyOnSelector<br>kAsteriskToMultiplyOffSelector</s>|2|将空格-*-空格组中的“*”更改为乘号 (×)。不鼓励使用此选择器。|
|斜线转为除号|<s>kSlashToDivideOnSelector<br>kSlashToDivideOffSelector</s>|4|将空格-/-空格组中的“/”更改为除号 (÷)。不鼓励使用此选择器。|
|不等式连字符|<s>kInequalityLigaturesOnSelector<br>kInequalityLigaturesOffSelector</s>|6|将 >= 序列更改为大于或等于字形，将 <= 序列更改为小于或等于字形。不鼓励使用此选择器。
|指数|<s>kExponentsOnSelector<br>kExponentsOffSelector</s>|8|获取紧跟“^”的数字并将其更改为其上位形式。不鼓励使用此选择器。|
|数学希腊文|kMathematicalGreekOnSelector<br>kMathematicalGreekOffSelector|10|专为数学使用而设计的特殊形式的希腊文字形（与书写希腊文相反）。|

### 装饰集
|特征常数|特征值|特征类型|
|-|-|-|
|kOrnamentSets|16|独有|

装饰集特征类型指定非字母装饰字形集。例如，此特征类型可以表示花饰或装饰边框。

此功能可用于允许单个 pi 字体代替多个 pi 字体。

通常，此功能仅应用于 Unicode 私有使用区域之一中的字符。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|无|kNoOrnamentsSelector|0|不选择任何装饰。|
|Dingbats|kDingbatsSelector|1|选择用于偶尔强调显示的各种符号，例如箭头、星星和指针。|
|Pi 字符|kPiCharactersSelector|2|选择一组为特定目的（例如制图或音乐符号）设计的相关符号，这些符号不构成正式字母表。|
|Fleurons|kFleuronsSelector|3|选择花朵、藤叶等形状的装饰物。|
|装饰边框|kDecorativeBordersSelector|4|选择用于互锁或重复图案的字形作为文本边框。|
|国际符号|kInternationalSymbolsSelector|5|选择代表标准、国际可识别图标的字形。|
|数学符号|kMathSymbolsSelector|6|选择用于设置数学或逻辑文本的特殊符号。这只应用于尚未包含在 Unicode 中的表格。|

### 字符替代
|特征常数|特征值|特征类型|
|-|-|-|
|kCharacterAlternatives|17|独有|

此功能的选择器仅选择字体中的不同字形集。例如，具有 20 个 & 符号的字体可以将它们放置在此功能类型下的 20 个选择器中。但是，在可行的情况下，最好使用样式选项功能类型。此功能的第一个设置（选择器 0）应为“无替代”。

选择器未枚举。

### 设计复杂性
|特征常数|特征值|特征类型|
|-|-|-|
|kDesignComplexity|18|独有|

设计复杂性特征类型控制字体的整体外观。它可用于允许单个字体包含普通字形、斜体字形、书法大写字母字形等。设计级别 1 应该适用于使用此特征类型的任何字体，并且它通常应该是默认设置。其余设计级别从最简单到最复杂。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|设计级别|1|kDesignLevel1Selector|0|普通字形（第一个设计级别）|
|设计级别|2|kDesignLevel2Selector|1|第二个设计级别|
|设计级别|3|kDesignLevel3Selector|2|第三个设计级别|
|设计级别|4|kDesignLevel4Selector|3|第四个设计级别|
|设计级别|5|kDesignLevel5Selector|4|第五个设计级别|

### 样式选项
|功能常量|功能值|功能类型|
|-|-|-|
|kStyleOptions|19|独有|

样式选项功能类型允许字体设计者将非上下文替换集合组合到命名集合中。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无样式选项|kNoStyleOptionsSelector|0|使用纯文本。|
|显示文本|kDisplayTextSelector|1|选择旨在强调设计在显示尺寸（通常大于 24 点）下独特外观的字形。|
|雕刻文本|kEngravedTextSelector|2|选择与主笔画平行的对比笔画的字形，特别是那些设计成看起来像刻在石头上的字形。|
|发光大写字母|kIlluminatedCapsSelector|3|选择大写字母字形，装饰填充字形周围的空白，就像中世纪抄写员使用的方式一样。|
|标题大写|kTitlingCapsSelector|4|指定将大写字母转换为特殊的标题形式。|
|竖大写|kTallCapsSelector|5|指定将某些大写字母转换为更高的形式。|

### 字符形状
|特征常数|特征值|特征类型|
|-|-|-|
|kCharacterShape|20|独有|

当单一字体包含相同字符的不同外观（传统上不被视为花饰）时，字符形状特征类型很有用。

请注意，对于简体中文到繁体中文的映射，通常有几种可能的选择。对这些使用繁体字符替代集。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|传统字形|kTraditionalCharactersSelector|0|使用字符的繁体形式。|
|简化字形|kSimplifiedCharactersSelector|1|使用字符的简化形式。此选择器用于在 Unicode 中单独编码的简化字形（例如，说代表説）。|
|JIS 1978 字形|kJIS1978CharactersSelector|2|使用 JIS（日本工业标准）C 6226-1978 文档定义的日文字符的字符形状。|
|JIS 1983 字形|kJIS1983CharactersSelector|3|使用 JIS X 0208-1983 文档定义的日文字符形状。|
|JIS 1990 字形|kJIS1990CharactersSelector|4|使用 JIS X 0208-1990 文档定义的日文字符形状。|
|传统字形，替代集 1|kTraditionalAltOneSelector|5|使用传统字符形式的替代集 1。|
|传统字形，替代集 2|kTraditionalAltTwoSelector|6|使用传统字符形式的替代集 2。|
|传统字形，替代集 3|kTraditionalAltThreeSelector|7|使用传统字符形式的替代集 3。|
|传统字形，替代集 4|kTraditionalAltFourSelector|8|使用传统字符形式的替代集 4。|
|传统字形，替代集 5|kTraditionalAltFiveSelector|9|使用替代集 5 的传统字符形式。|
|专家字形|kExpertCharactersSelector|10|使用“专家”形式的表意文字，例如富士通 FMR 字符集中定义的表意文字。
|JIS 2004 字形|kJIS2004CharactersSelector|11|使用 JIS X 0208-2004 文档定义的日文字符形状。
|Hojo 字形|kHojoCharactersSelector|12|JIS X 0212-1990（又称“Hojo Kanji”）和 JIS X 0213:2004 字符集有很大的重叠。在某些情况下，它们的原型字形有所不同。在构建同时支持 JIS X 0212-1990 和 JIS X 0213:2004 的字体（例如支持 Adob​​e-Japan 1-6 字符集的字体）时，建议将 JIS X 0213:2004 形式作为编码形式。在编码 JIS X 0213:2004 形式的情况下，使用“hojo”功能访问 JIS X 0212-1990 字形。
|NLC 字形|kNLCCharactersSelector|13|日本国家语言委员会 (NLC) 已在 2000 年为许多 JIS 字符定义了新的字形形状。此选择器用于访问这些字形。
|传统名称|kTraditionalNamesCharactersSelector|14|将字体中的简化形式映射到可用于个人名称的相应传统形式。

### 数字大小写
|特征常数|特征值|特征类型|
|-|-|-|
|kNumberCase|21|独有|

数字大小写与字母大小写无关。小写数字（也称为“传统”或“旧式”）是可能低于基线的数字，而大写数字（也称为“衬线”）则不会低于基线。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|小写数字|kLowerCaseNumbersSelector|0|这些形式的数字可能低于基线。它们有时被称为“传统”或“旧式”数字。|
|大写数字|kUpperCaseNumbersSelector|1|这些形式的数字不会低于基线。它们有时被称为“衬线”数字。|

### 文本间距
|特征常数|特征值|特征类型|
|-|-|-|
|kTextSpacing|22|独有|

文本间距特征类型用于在字体中的比例、等宽和半宽字符形式之间进行选择。此特征类型的使用是可选的；有关更精确的控制，请参阅假名间距和表意文字间距特征类型。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|比例|kProportionalTextSelector|0|选择字母的比例形式。
|等宽|kMonospacedTextSelector|1|选择字母的等宽形式。
|半宽|kHalfWidthTextSelector|2|选择字母的半宽形式。
|三分之一宽度|kThirdWidthTextSelector|3|选择字母的三分之一宽度形式。
|四分之一宽度|kQuarterWidthTextSelector|4|选择字母的四分之一宽度形式。
|替代比例|kAltProportionalTextSelector|5|选择字母的替代比例形式。
|替代半宽|kAltHalfWidthTextSelector|6|选择字母的替代半宽形式。

### 音译
|特征常数|特征值|特征类型|
|-|-|-|
|kTransliteration|23|独有|

音译特征类型允许使用一种格式的文本以另一种格式显示。例如，将平假名字符串显示为片假名。由于音译通常在字符空间中完成，因此强烈不建议使用。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|无转写|kNoTransliterationSelector|0|表示不应进行转写。
|汉字转为韩文|<s>kHanjaToHangulSelector</s>|1|表示应将汉字转写为韩文。|
|平假名转为片假名|<s>kHiraganaToKatakanaSelector</s>|2|表示应将平假名转写为片假名。
|片假名转为平假名|<s>kKatakanaToHiraganaSelector</s>|3|表示应将片假名转写为平假名。
|假名转为罗马化|<s>kKanaToRomanizationSelector</s>|4|表示应将平假名和片假名转写为罗马字。
|罗马化转为平假名|<s>kRomanizationToHiraganaSelector</s>|5|表示应将罗马字转写为平假名。
|罗马字转写为片假名|<s>kRomanizationToKatakanaSelector</s>|6|表示应将罗马字音译为片假名。
|汉字转韩文 Alt 1|<s>kHanjaToHangulAltOneSelector</s>|7|这表明具有多种读法的韩文在第二次阅读时应翻译成韩文。
|汉字转韩文 Alt 2|<s>kHanjaToHangulAltTwoSelector</s>|8|这表明具有多种读法的韩文在第三次阅读时应翻译成韩文。
|汉字转韩文 Alt 3|<s>kHanjaToHangulAltThreeSelector</s>|9|这表明具有多种读法的韩文在第四次阅读时应翻译成韩文。

### 注释
|特征常数|特征值|特征类型|
|-|-|-|
|kAnnotation|24|独有|

注释特征类型指定基本字母形状的注释（或装饰）。例如，大多数日语字体都包含带圆圈、带括号、后面带有句点等的数字版本。出于兼容性原因，其中许多都单独用 Unicode 编码，但使用此功能可以使用更广泛的带注释的数字集。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无注释|kNoAnnotationSelector|0|表示字符应不带注释出现。
|方框注释|kBoxAnnotationSelector|1|使用由方框装饰包围的字符形式。
|圆角方框注释|kRoundedBoxAnnotationSelector|2|使用由带圆角的方框装饰包围的字符形式。
|圆形注释|kCircleAnnotationSelector|3|使用由圆圈包围的字符形式。例如，请参阅 Unicode U+3260 至 U+326F。
|倒圆注释|kInvertedCircleAnnotationSelector|4|与圆形注释相同，但白色和黑色反转。例如，请参阅 Unicode U+2776 至 U+277F。
|括号注释|kParenthesisAnnotationSelector|5|使用由括号包围的字符形式。例如，参见 Unicode U+2474 至 U+2487。
|句点注释|kPeriodAnnotationSelector|6|使用字符后跟句点的形式。例如，参见 Unicode U+2488 至 U+249B。
|罗马数字注释|kRomanNumeralAnnotationSelector|7|以罗马数字形式显示给定字符。
|菱形注释|kDiamondAnnotationSelector|8|显示菱形包围的文本。
|倒置方框注释|kInvertedBoxAnnotationSelector|9|与方框注释相同，但黑白反转。
|倒置圆角方框注释|kInvertedRoundedBoxAnnotationSelector|10|与圆角方框注释相同，但黑白反转。

### 假名间距
|功能常数|功能值|功能类型|
|-|-|-|
|kKanaSpacing|25|独有|

假名间距功能类型用于选择专门针对日语平假名和片假名字符的宽度。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|全宽|kFullWidthKanaSelector|0|选择全宽形式的假名。
|比例|kProportionalKanaSelector|1|选择比例形式的假名。

### 表意文字间距
|特征常数|特征值|特征类型|
|-|-|-|
|kIdeographicSpacing|26|独有|

表意文字间距特征类型用于在全宽和比例形式的表意文字（即汉字）之间进行选择。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|全宽|kFullWidthIdeographsSelector|0|选择全宽形式的表意文字。
|比例|kProportionalIdeographsSelector|1|选择比例形式的表意文字。
|半宽|kHalfWidthIdeographsSelector|2|选择半宽形式的表意文字。

### Unicode 分解
|特征常量|特征值|特征类型|
|-|-|-|
|kUnicodeDecomposition|27|非独占

此功能用于使用户可以看到各种形式的 Unicode 组合/分解。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|规范组合|kCanonicalCompositionOnSelector<br>kCanonicalCompositionOffSelector|0|将分解后的 Unicode 显示为完全组合。此选择器通常不应出现在 UI 中。
|兼容性组合|kCompatibilityCompositionOnSelector<br>kCompatibilityCompositionOffSelector|2|将分解后的兼容性 Unicode 显示为完全组合。此选择器通常不应出现在 UI 中。
|转码组合|kTranscodingCompositionOnSelector<br>kTranscodingCompositionOffSelector|4|QuickDraw 使用的某些旧 Macintosh 文本编码包含未以 Unicode 编码的字符。为了提供两者之间的往返兼容性，Apple 在其 Unicode 的私有使用区域字符实现中包括与其他字符交互以控制转码过程的字符。此功能/选择器对用于控制是否使用这些转码控件。

### Ruby Kana
|功能常量|功能值|功能类型|
|-|-|-|
|kRubyKana|28|非独占|

日文排版通常使用较小的假名字形（通常为上标形式）来阐明读者可能不熟悉的汉字的含义。这些被称为 ruby​​，来自旧排版术语，表示四点大小的字体。此功能可识别字体中为此用途设计的字形，并用它们替换默认设计。

布局引擎需要缩放和重新定位字形才能生成正确的 ruby​​。此功能本身是不够的。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无 Ruby Kana|<s>kNoRubyKanaSelector</s>|0|不使用 ruby​​ 形状
|Ruby Kana|<s>kRubyKanaSelector</s>|1|使用 ruby​​ 形状
|Ruby Kana|kRubyKanaOnSelector<br>RubyKanaOffSelector|2|打开或关闭 ruby​​ 形状

### CJK 符号替代
|特征常数|特征值|特征类型|
|-|-|-|
|kCJKSymbolAlternatives|29|独有|

此功能允许选择特定于东亚符号字符的各种替代形式（例如，〠 U+3020 POSTAL MARK FACE）。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无 CJK 符号替代|kNoCJKSymbolAlternativesSelector|0|使用标准形式（即，由“cmap”映射到的字符）|
|CJK 符号 Alt One|kCJKSymbolAltOneSelector|1|使用第一组替代形式|
|CJK 符号Alt Two|kCJKSymbolAltTwoSelector|2|使用第二组替代形式
|CJK 符号 Alt Three|kCJKSymbolAltThreeSelector|3|使用第三组替代形式
|CJK 符号 Alt Four|kCJKSymbolAltFourSelector|4|使用第四组替代形式
|CJK 符号 Alt Five|kCJKSymbolAltFiveSelector|5|使用第五组替代形式

### 表意文字替代
|特征常数|特征值|特征类型|
|-|-|-|
|kIdeographicAlternatives|30|独有|

此功能允许选择特定于东亚表意文字的各种替代形式（例如，诚 U+8AA0 与説 U+8AAC，尽管这两个已单独编码）。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无表意字符替代|kNoIdeographicAlternativesSelector|0|使用标准形式（即，由“cmap”映射到的字符）|
|表意字符 Alt One|kIdeographicAltOneSelector|1|使用第一组替代形式
|表意字符 Alt Two|kIdeographicAltTwoSelector|2|使用第二组替代形式
|表意字符 Alt Three|kIdeographicAltThreeSelector|3|使用第三组替代形式
|表意字符 Alt Four|kIdeographicAltFourSelector|4|使用第四组替代形式
|表意字符 Alt Five|kIdeographicAltFiveSelector|5|使用第五组替代形式

### CJK 垂直罗马字位置
|功能常数|功能值|功能类型|
|-|-|-|
|kCJKVerticalRomanPlacement|31|独有|

此功能控制罗马字相对于汉字的定位方式。通过设置基线可以实现相同的效果。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|CJK 垂直罗马字居中|kCJKVerticalRomanCenteredSelector|0|将罗马字形垂直居中，使其中心与表意文字的中心相同|
|CJK 垂直罗马字H 基线|kCJKVerticalRomanHBaselineSelector|1|对罗马字形使用标准罗马字基线|

### 斜体 CJK 罗马字
|特征常数|特征值|特征类型|
|-|-|-|
|kItalicCJKRoman|32|非排他性

确定罗马字与汉字混合时是否使用斜体字形书写。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|无 CJK 斜体罗马字|<s>kNoCJKItalicRomanSelector</s>|0|不对罗马字使用斜体字形|
|CJK 斜体罗马字|<s>kCJKItalicRomanSelector</s>|1|对罗马字使用斜体字形|
|CJK 斜体罗马字|kCJKItalicRomanOnSelector<br>CJKItalicRomanOffSelector|2|打开或关闭对罗马字使用斜体

### 区分大小写布局
|功能常数|功能值|功能类型|
|-|-|-|
|kCaseSensitiveLayout|33|非独占|

此功能允许在小写文本中发现其他形式的标点符号。例如，如果破折号被小写字母包围时的位置低于被数字或大写字母包围时的位置，则破折号看起来最好。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
区分大小写布局 kCaseSensitiveLayoutOnSelector
CaseSensitiveLayoutOffSelector 0 打开或关闭区分大小写
区分大小写间距 kCaseSensitiveSpacingOnSelector
CaseSensitiveSpacingOffSelector 2 打开或关闭区分大小写的间距

### 替代假名
|特征常数|特征值|特征类型|
|-|-|-|
|kAlternateKana|34|非排他性|

这允许在水平或垂直文本中使用不同形式的假名。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|替代水平假名|kAlternateHorizKanaOnSelector<br>AlternateHorizKanaOffSelector|0|表示应在水平文本中使用平假名和片假名的替代形式。
|替代垂直假名|kAlternateVertKanaOnSelector<br>AlternateVertKanaOffSelector|2|表示应在垂直文本中使用平假名和片假名的替代形式。

### 样式替代
|特征常数|特征值|特征类型|
|-|-|-|
|kStylisticAlternatives|35|非独占|

此功能允许对字形使用不同的样式替代，并且在很大程度上相当于字符替代功能的非独占版本。它专门用作 OpenType 'ss01' 至 'ss20' 功能的 AAT 等效项。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|无样式替代|kNoStylisticAlternatesSelector|0|使用标准形式（即，由“cmap”映射到的字符）
|样式 Alt One|kStylisticAltOneOnSelector<br>StylisticAltOneOffSelector|2|打开或关闭第一组替代|
|样式 Alt Two|kStylisticAltTwoOnSelector<br>StylisticAltTwoOffSelector|4|打开或关闭第二组替代|
|样式 Alt Three|kStylisticAltThreeOnSelector<br>StylisticAltThreeOffSelector|6|打开或关闭第三组替代|
|样式 Alt Four|kStylisticAltFourOnSelector<br>StylisticAltFourOffSelector|8|打开或关闭第四组替代
|样式 Alt Five|kStylisticAltFiveOnSelector<br>StylisticAltFiveOffSelector|10|打开或关闭第五组替代项|
|样式 Alt Six|kStylisticAltSixOnSelector<br>StylisticAltSixOffSelector|12|打开或关闭第六组替代项|
|样式 Alt Seven|kStylisticAltSevenOnSelector<br>StylisticAltSevenOffSelector|14|打开或关闭第七组替代项|
|样式 Alt Eight|kStylisticAltEightOnSelector<br>StylisticAltEightOffSelector|16|打开或关闭第八组替代项|
|样式 Alt Nine|kStylisticAltNineOnSelector<br>StylisticAltNineOffSelector|18|打开或关闭第九组替代项|
|样式 Alt Ten|kStylisticAltTenOnSelector<br>StylisticAltTenOffSelector|20|打开或关闭第十组替代项|
|样式 Alt Eleven|kStylisticAltElevenOnSelector<br>StylisticAltElevenOffSelector|22|打开或关闭第十一组替代项
|样式 Alt Twelve|kStylisticAltTwelveOnSelector<br>StylisticAltTwelveOffSelector|24|打开或关闭第十二组替代项|
|样式 Alt Thirteen|kStylisticAltThirteenOnSelector<br>StylisticAltThirteenOffSelector|26|打开或关闭第十三组替代项
|样式 Alt Fourteen|kStylisticAltFourteenOnSelector<br>StylisticAltFourteenOffSelector|28|打开或关闭第十四组替代项|
|样式 Alt Fifteen|kStylisticAltFifteenOnSelector<br>StylisticAltFifteenOffSelector|30|打开或关闭第十五组替代项|
|样式 Alt Sixteen|kStylisticAltSixteenOnSelector<br>StylisticAltSixteenOffSelector|32|打开或关闭第十六组替代项|
|样式 Alt Seventeen|kStylisticAltSeventeenOnSelector<br>StylisticAltSeventeenOffSelector|34|打开或关闭第十七组替代项|
|样式 Alt Eighteen|kStylisticAltEighteenOnSelector<br>StylisticAltEighteenOffSelector|36|打开或关闭第十八组替代项
|样式 Alt Nineteen|kStylisticAltNineteenOnSelector<br>StylisticAltNineteenOffSelector|38|打开或关闭第十九组替代项|
|样式 Alt Twenty|kStylisticAltTwentyOnSelector<br>StylisticAltTwentyOffSelector|40|打开或关闭第二十组替代项|

### 上下文替代
|功能常量|功能值|功能类型|
|-|-|-|
|kContextualAlternates|36|非独占|

此功能用于支持上下文相关字形和花饰的替代形状

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|上下文替代|kContextualAlternatesOnSelector<br>ContextualAlternatesOffSelector|0|打开或关闭上下文相关字形的替代|
|花饰替代|kSwashAlternatesOnSelector<br>SwashAlternatesOffSelector|2|打开或关闭上下文相关花饰的替代|
|上下文花饰替代|kContextualSwashAlternatesOnSelector<br>ContextualSwashAlternatesOffSelector|4|打开或关闭上下文相关字形和花饰的替代

### 小写
|功能常数|功能值|功能类型|
|-|-|-|
|kLowerCase|37|独有|

此功能取代了字母大小写功能的部分功能。它用于将小写文本的外观更改为小写或小写。[某些字体包含额外的大写字母大小，比常规小写字母更短，并被戏称为小写字母。这种形式最有可能出现在小写 x 高度的设计中，它们比较高的小写字母更能与小写文本协调一致[有关小写字母的示例，请参阅 Emigre 字体系列 Mrs Eaves 和 Filosofia]。）不鼓励显示小写字母的实际大写字形。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|默认小写|kDefaultLowerCaseSelector|0|使用标准小写字形
|小写小型大写字母|kLowerCaseSmallCapsSelector|1|将小写字形显示为小型大写字母。（这是显示小型大写字母的最常见方式。）
|小写小写字母|kLowerCasePetiteCapsSelector|2|将小写字形显示为小写字母

### 大写
|功能常数|功能值|功能类型|
|-|-|-|
|kUpperCase|38|独有|

此功能取代了字母大小写功能的部分功能。它用于将大写文本的外观更改为小写或小写。[某些字体包含额外的大写字母大小，比常规小写字母更短，并被戏称为小写字母。这种形式最有可能出现在小写 x 高度的设计中，它们比较高的小写字母更能与小写文本协调一致[有关小写字母的示例，请参阅 Emigre 字体系列 Mrs Eaves 和 Filosofia]。）不鼓励显示大写字母的实际小写字形。

|选择器名称|选择器常量|选择器值|选择器功能|
|-|-|-|-|
|默认大写|kDefaultUpperCaseSelector|0|使用标准大写字形|
|大写小型大写|kUpperCaseSmallCapsSelector|1|将大写字形显示为小型大写（通常用于首字母缩略词）。|
|大写小写|kUpperCasePetiteCapsSelector|2|将大写字形显示为小写|

### 语言标记
|特征常数|特征值|特征类型|
|-|-|-|
|kLanguageTag|39|独有|

此功能允许使用特定于语言的字形。除 0 之外的选择器比“ltag”表中的索引多一个，然后将其映射到标准 IETF 语言标记。

例如，如果“ltag”表索引 0 处的语言标记为“sr”（代表塞尔维亚语），则 39/1 的功能/选择器组合会将字形更改为任何特定于塞尔维亚语的形状。

### CJK 罗马字间距
|特征常数|特征值|特征类型|
|-|-|-|
|kCJKRomanSpacing|103|独有

CJK 罗马字间距特征类型用于在 CJK 字体中选择罗马字符的比例形式和半宽形式。

|选择器名称|选择器常数|选择器值|选择器功能|
|-|-|-|-|
|半宽|kHalfWidthCJKRomanSelector|0|选择字母的半宽形式。
|比例|kProportionalCJKRomanSelector|1|选择字母的比例形式。
|默认罗马字|kDefaultCJKRomanSelector|2|选择字母的默认罗马形式。
|全宽罗马字|kFullWidthCJKRomanSelector|3|选择字母的全宽罗马形式。

```C
enum {
	kAllTypographicFeaturesType	 = 0,
	kLigaturesType				= 1,
	kCursiveConnectionType		= 2,
	kLetterCaseType				 = 3,	/* deprecated - use kLowerCaseType or kUpperCaseType instead */
	kVerticalSubstitutionType	 = 4,
	kLinguisticRearrangementType	= 5,
	kNumberSpacingType			= 6,
	kSmartSwashType				 = 8,
	kDiacriticsType				 = 9,
	kVerticalPositionType		 = 10,
	kFractionsType				= 11,
	kOverlappingCharactersType	= 13,
	kTypographicExtrasType		= 14,
	kMathematicalExtrasType		 = 15,
	kOrnamentSetsType			 = 16,
	kCharacterAlternativesType	= 17,
	kDesignComplexityType		 = 18,
	kStyleOptionsType			 = 19,
	kCharacterShapeType			 = 20,
	kNumberCaseType				 = 21,
	kTextSpacingType				= 22,
	kTransliterationType			= 23,
	kAnnotationType				 = 24,
	kKanaSpacingType				= 25,
	kIdeographicSpacingType		 = 26,
	kUnicodeDecompositionType	 = 27,
	kRubyKanaType				 = 28,
	kCJKSymbolAlternativesType	= 29,
	kIdeographicAlternativesType	= 30,
	kCJKVerticalRomanPlacementType = 31,
	kItalicCJKRomanType			 = 32,
	kCaseSensitiveLayoutType		= 33,
	kAlternateKanaType			= 34,
	kStylisticAlternativesType	= 35,
	kContextualAlternatesType	 = 36,
	kLowerCaseType				= 37,
	kUpperCaseType				= 38,
	kLanguageTagType				= 39,
	kCJKRomanSpacingType			= 103,
	kLastFeatureType				= -1
};
/*
 *	Summary:
 *	Selectors for feature type kAllTypographicFeaturesType
 */
enum {
	kAllTypeFeaturesOnSelector	= 0,
	kAllTypeFeaturesOffSelector	 = 1
};
/*
 *	Summary:
 *	Selectors for feature type kLigaturesType
 */
enum {
	kRequiredLigaturesOnSelector	= 0,
	kRequiredLigaturesOffSelector = 1,
	kCommonLigaturesOnSelector	= 2,
	kCommonLigaturesOffSelector	 = 3,
	kRareLigaturesOnSelector		= 4,
	kRareLigaturesOffSelector	 = 5,
	kLogosOnSelector				= 6,
	kLogosOffSelector			 = 7,
	kRebusPicturesOnSelector		= 8,
	kRebusPicturesOffSelector	 = 9,
	kDiphthongLigaturesOnSelector = 10,
	kDiphthongLigaturesOffSelector = 11,
	kSquaredLigaturesOnSelector	 = 12,
	kSquaredLigaturesOffSelector	= 13,
	kAbbrevSquaredLigaturesOnSelector = 14,
	kAbbrevSquaredLigaturesOffSelector = 15,
	kSymbolLigaturesOnSelector	= 16,
	kSymbolLigaturesOffSelector	 = 17,
	kContextualLigaturesOnSelector = 18,
	kContextualLigaturesOffSelector = 19,
	kHistoricalLigaturesOnSelector = 20,
	kHistoricalLigaturesOffSelector = 21
};
/*
 *	Summary:
 *	Selectors for feature type kCursiveConnectionType
 */
enum {
	kUnconnectedSelector			= 0,
	kPartiallyConnectedSelector	 = 1,
	kCursiveSelector				= 2
};
/*
 *	Summary:
 *	Selectors for feature type kLetterCaseType
 */
enum {
	kUpperAndLowerCaseSelector	= 0,	/* deprecated */
	kAllCapsSelector				= 1,	/* deprecated */
	kAllLowerCaseSelector		 = 2,	/* deprecated */
	kSmallCapsSelector			= 3,	/* deprecated */
	kInitialCapsSelector			= 4,	/* deprecated */
	kInitialCapsAndSmallCapsSelector = 5	/* deprecated */
};
/*
 *	Summary:
 *	Selectors for feature type kVerticalSubstitutionType
 */
enum {
	kSubstituteVerticalFormsOnSelector = 0,
	kSubstituteVerticalFormsOffSelector = 1
};
/*
 *	Summary:
 *	Selectors for feature type kLinguisticRearrangementType
 */
enum {
	kLinguisticRearrangementOnSelector = 0,
	kLinguisticRearrangementOffSelector = 1
};
/*
 *	Summary:
 *	Selectors for feature type kNumberSpacingType
 */
enum {
	kMonospacedNumbersSelector	= 0,
	kProportionalNumbersSelector	= 1,
	kThirdWidthNumbersSelector	= 2,
	kQuarterWidthNumbersSelector	= 3
};
/*
 *	Summary:
 *	Selectors for feature type kSmartSwashType
 */
enum {
	kWordInitialSwashesOnSelector = 0,
	kWordInitialSwashesOffSelector = 1,
	kWordFinalSwashesOnSelector	 = 2,
	kWordFinalSwashesOffSelector	= 3,
	kLineInitialSwashesOnSelector = 4,
	kLineInitialSwashesOffSelector = 5,
	kLineFinalSwashesOnSelector	 = 6,
	kLineFinalSwashesOffSelector	= 7,
	kNonFinalSwashesOnSelector	= 8,
	kNonFinalSwashesOffSelector	 = 9
};
/*
 *	Summary:
 *	Selectors for feature type kDiacriticsType
 */
enum {
	kShowDiacriticsSelector		 = 0,
	kHideDiacriticsSelector		 = 1,
	kDecomposeDiacriticsSelector	= 2
};
/*
 *	Summary:
 *	Selectors for feature type kVerticalPositionType
 */
enum {
	kNormalPositionSelector		 = 0,
	kSuperiorsSelector			= 1,
	kInferiorsSelector			= 2,
	kOrdinalsSelector			 = 3,
	kScientificInferiorsSelector	= 4
};
/*
 *	Summary:
 *	Selectors for feature type kFractionsType
 */
enum {
	kNoFractionsSelector			= 0,
	kVerticalFractionsSelector	= 1,
	kDiagonalFractionsSelector	= 2
};
/*
 *	Summary:
 *	Selectors for feature type kOverlappingCharactersType
 */
enum {
	kPreventOverlapOnSelector	 = 0,
	kPreventOverlapOffSelector	= 1
};
/*
 *	Summary:
 *	Selectors for feature type kTypographicExtrasType
 */
enum {
	kHyphensToEmDashOnSelector	= 0,
	kHyphensToEmDashOffSelector	 = 1,
	kHyphenToEnDashOnSelector	 = 2,
	kHyphenToEnDashOffSelector	= 3,
	kSlashedZeroOnSelector		= 4,
	kSlashedZeroOffSelector		 = 5,
	kFormInterrobangOnSelector	= 6,
	kFormInterrobangOffSelector	 = 7,
	kSmartQuotesOnSelector		= 8,
	kSmartQuotesOffSelector		 = 9,
	kPeriodsToEllipsisOnSelector	= 10,
	kPeriodsToEllipsisOffSelector = 11
};
/*
 *	Summary:
 *	Selectors for feature type kMathematicalExtrasType
 */
enum {
	kHyphenToMinusOnSelector		= 0,
	kHyphenToMinusOffSelector	 = 1,
	kAsteriskToMultiplyOnSelector = 2,
	kAsteriskToMultiplyOffSelector = 3,
	kSlashToDivideOnSelector		= 4,
	kSlashToDivideOffSelector	 = 5,
	kInequalityLigaturesOnSelector = 6,
	kInequalityLigaturesOffSelector = 7,
	kExponentsOnSelector			= 8,
	kExponentsOffSelector		 = 9,
	kMathematicalGreekOnSelector	= 10,
	kMathematicalGreekOffSelector = 11
};
/*
 *	Summary:
 *	Selectors for feature type kOrnamentSetsType
 */
enum {
	kNoOrnamentsSelector			= 0,
	kDingbatsSelector			 = 1,
	kPiCharactersSelector		 = 2,
	kFleuronsSelector			 = 3,
	kDecorativeBordersSelector	= 4,
	kInternationalSymbolsSelector = 5,
	kMathSymbolsSelector			= 6
};
/*
 *	Summary:
 *	Selectors for feature type kCharacterAlternativesType
 */
enum {
	kNoAlternatesSelector		 = 0
};
/*
 *	Summary:
 *	Selectors for feature type kDesignComplexityType
 */
enum {
	kDesignLevel1Selector		 = 0,
	kDesignLevel2Selector		 = 1,
	kDesignLevel3Selector		 = 2,
	kDesignLevel4Selector		 = 3,
	kDesignLevel5Selector		 = 4
};
/*
 *	Summary:
 *	Selectors for feature type kStyleOptionsType
 */
enum {
	kNoStyleOptionsSelector		 = 0,
	kDisplayTextSelector			= 1,
	kEngravedTextSelector		 = 2,
	kIlluminatedCapsSelector		= 3,
	kTitlingCapsSelector			= 4,
	kTallCapsSelector			 = 5
};
/*
 *	Summary:
 *	Selectors for feature type kCharacterShapeType
 */
enum {
	kTraditionalCharactersSelector = 0,
	kSimplifiedCharactersSelector = 1,
	kJIS1978CharactersSelector	= 2,
	kJIS1983CharactersSelector	= 3,
	kJIS1990CharactersSelector	= 4,
	kTraditionalAltOneSelector	= 5,
	kTraditionalAltTwoSelector	= 6,
	kTraditionalAltThreeSelector	= 7,
	kTraditionalAltFourSelector	 = 8,
	kTraditionalAltFiveSelector	 = 9,
	kExpertCharactersSelector	 = 10,
	kJIS2004CharactersSelector	= 11,
	kHojoCharactersSelector		 = 12,
	kNLCCharactersSelector		= 13,
	kTraditionalNamesCharactersSelector = 14
};
/*
 *	Summary:
 *	Selectors for feature type kNumberCaseType
 */
enum {
	kLowerCaseNumbersSelector	 = 0,
	kUpperCaseNumbersSelector	 = 1
};
/*
 *	Summary:
 *	Selectors for feature type kTextSpacingType
 */
enum {
	kProportionalTextSelector	 = 0,
	kMonospacedTextSelector		 = 1,
	kHalfWidthTextSelector		= 2,
	kThirdWidthTextSelector		 = 3,
	kQuarterWidthTextSelector	 = 4,
	kAltProportionalTextSelector	= 5,
	kAltHalfWidthTextSelector	 = 6
};
/*
 *	Summary:
 *	Selectors for feature type kTransliterationType
 */
enum {
	kNoTransliterationSelector	= 0,
	kHanjaToHangulSelector		= 1,
	kHiraganaToKatakanaSelector	 = 2,
	kKatakanaToHiraganaSelector	 = 3,
	kKanaToRomanizationSelector	 = 4,
	kRomanizationToHiraganaSelector = 5,
	kRomanizationToKatakanaSelector = 6,
	kHanjaToHangulAltOneSelector	= 7,
	kHanjaToHangulAltTwoSelector	= 8,
	kHanjaToHangulAltThreeSelector = 9
};
/*
 *	Summary:
 *	Selectors for feature type kAnnotationType
 */
enum {
	kNoAnnotationSelector		 = 0,
	kBoxAnnotationSelector		= 1,
	kRoundedBoxAnnotationSelector = 2,
	kCircleAnnotationSelector	 = 3,
	kInvertedCircleAnnotationSelector = 4,
	kParenthesisAnnotationSelector = 5,
	kPeriodAnnotationSelector	 = 6,
	kRomanNumeralAnnotationSelector = 7,
	kDiamondAnnotationSelector	= 8,
	kInvertedBoxAnnotationSelector = 9,
	kInvertedRoundedBoxAnnotationSelector = 10
};
/*
 *	Summary:
 *	Selectors for feature type kKanaSpacingType
 */
enum {
	kFullWidthKanaSelector		= 0,
	kProportionalKanaSelector	 = 1
};
/*
 *	Summary:
 *	Selectors for feature type kIdeographicSpacingType
 */
enum {
	kFullWidthIdeographsSelector	= 0,
	kProportionalIdeographsSelector = 1,
	kHalfWidthIdeographsSelector	= 2
};
/*
 *	Summary:
 *	Selectors for feature type kUnicodeDecompositionType
 */
enum {
	kCanonicalCompositionOnSelector = 0,
	kCanonicalCompositionOffSelector = 1,
	kCompatibilityCompositionOnSelector = 2,
	kCompatibilityCompositionOffSelector = 3,
	kTranscodingCompositionOnSelector = 4,
	kTranscodingCompositionOffSelector = 5
};
/*
 *	Summary:
 *	Selectors for feature type kRubyKanaType
 */
enum {
	kNoRubyKanaSelector			 = 0,	/* deprecated - use kRubyKanaOffSelector instead */
	kRubyKanaSelector			 = 1,	/* deprecated - use kRubyKanaOnSelector instead */
	kRubyKanaOnSelector			 = 2,
	kRubyKanaOffSelector			= 3
};
/*
 *	Summary:
 *	Selectors for feature type kCJKSymbolAlternativesType
 */
enum {
	kNoCJKSymbolAlternativesSelector = 0,
	kCJKSymbolAltOneSelector		= 1,
	kCJKSymbolAltTwoSelector		= 2,
	kCJKSymbolAltThreeSelector	= 3,
	kCJKSymbolAltFourSelector	 = 4,
	kCJKSymbolAltFiveSelector	 = 5
};
/*
 *	Summary:
 *	Selectors for feature type kIdeographicAlternativesType
 */
enum {
	kNoIdeographicAlternativesSelector = 0,
	kIdeographicAltOneSelector	= 1,
	kIdeographicAltTwoSelector	= 2,
	kIdeographicAltThreeSelector	= 3,
	kIdeographicAltFourSelector	 = 4,
	kIdeographicAltFiveSelector	 = 5
};
/*
 *	Summary:
 *	Selectors for feature type kCJKVerticalRomanPlacementType
 */
enum {
	kCJKVerticalRomanCenteredSelector = 0,
	kCJKVerticalRomanHBaselineSelector = 1
};
/*
 *	Summary:
 *	Selectors for feature type kItalicCJKRomanType
 */
enum {
	kNoCJKItalicRomanSelector	 = 0,	/* deprecated - use kCJKItalicRomanOffSelector instead */
	kCJKItalicRomanSelector		 = 1,	/* deprecated - use kCJKItalicRomanOnSelector instead */
	kCJKItalicRomanOnSelector	 = 2,
	kCJKItalicRomanOffSelector	= 3
};
/*
 *	Summary:
 *	Selectors for feature type kCaseSensitiveLayoutType
 */
enum {
	kCaseSensitiveLayoutOnSelector = 0,
	kCaseSensitiveLayoutOffSelector = 1,
	kCaseSensitiveSpacingOnSelector = 2,
	kCaseSensitiveSpacingOffSelector = 3
};
/*
 *	Summary:
 *	Selectors for feature type kAlternateKanaType
 */
enum {
	kAlternateHorizKanaOnSelector = 0,
	kAlternateHorizKanaOffSelector = 1,
	kAlternateVertKanaOnSelector	= 2,
	kAlternateVertKanaOffSelector = 3
};
/*
 *	Summary:
 *	Selectors for feature type kStylisticAlternativesType
 */
enum {
	kNoStylisticAlternatesSelector = 0,
	kStylisticAltOneOnSelector	= 2,
	kStylisticAltOneOffSelector	 = 3,
	kStylisticAltTwoOnSelector	= 4,
	kStylisticAltTwoOffSelector	 = 5,
	kStylisticAltThreeOnSelector	= 6,
	kStylisticAltThreeOffSelector = 7,
	kStylisticAltFourOnSelector	 = 8,
	kStylisticAltFourOffSelector	= 9,
	kStylisticAltFiveOnSelector	 = 10,
	kStylisticAltFiveOffSelector	= 11,
	kStylisticAltSixOnSelector	= 12,
	kStylisticAltSixOffSelector	 = 13,
	kStylisticAltSevenOnSelector	= 14,
	kStylisticAltSevenOffSelector = 15,
	kStylisticAltEightOnSelector	= 16,
	kStylisticAltEightOffSelector = 17,
	kStylisticAltNineOnSelector	 = 18,
	kStylisticAltNineOffSelector	= 19,
	kStylisticAltTenOnSelector	= 20,
	kStylisticAltTenOffSelector	 = 21,
	kStylisticAltElevenOnSelector = 22,
	kStylisticAltElevenOffSelector = 23,
	kStylisticAltTwelveOnSelector = 24,
	kStylisticAltTwelveOffSelector = 25,
	kStylisticAltThirteenOnSelector = 26,
	kStylisticAltThirteenOffSelector = 27,
	kStylisticAltFourteenOnSelector = 28,
	kStylisticAltFourteenOffSelector = 29,
	kStylisticAltFifteenOnSelector = 30,
	kStylisticAltFifteenOffSelector = 31,
	kStylisticAltSixteenOnSelector = 32,
	kStylisticAltSixteenOffSelector = 33,
	kStylisticAltSeventeenOnSelector = 34,
	kStylisticAltSeventeenOffSelector = 35,
	kStylisticAltEighteenOnSelector = 36,
	kStylisticAltEighteenOffSelector = 37,
	kStylisticAltNineteenOnSelector = 38,
	kStylisticAltNineteenOffSelector = 39,
	kStylisticAltTwentyOnSelector = 40,
	kStylisticAltTwentyOffSelector = 41
};
/*
 *	Summary:
 *	Selectors for feature type kContextualAlternatesType
 */
enum {
	kContextualAlternatesOnSelector = 0,
	kContextualAlternatesOffSelector = 1,
	kSwashAlternatesOnSelector	= 2,
	kSwashAlternatesOffSelector	 = 3,
	kContextualSwashAlternatesOnSelector = 4,
	kContextualSwashAlternatesOffSelector = 5
};
/*
 *	Summary:
 *	Selectors for feature type kLowerCaseType
 */
enum {
	kDefaultLowerCaseSelector	 = 0,
	kLowerCaseSmallCapsSelector	 = 1,
	kLowerCasePetiteCapsSelector	= 2
};
/*
 *	Summary:
 *	Selectors for feature type kUpperCaseType
 */
enum {
	kDefaultUpperCaseSelector	 = 0,
	kUpperCaseSmallCapsSelector	 = 1,
	kUpperCasePetiteCapsSelector	= 2
};
/*
 *	Summary:
 *	Selectors for feature type kCJKRomanSpacingType
 */
enum {
	kHalfWidthCJKRomanSelector	= 0,
	kProportionalCJKRomanSelector = 1,
	kDefaultCJKRomanSelector		= 2,
	kFullWidthCJKRomanSelector	= 3
};
```