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

