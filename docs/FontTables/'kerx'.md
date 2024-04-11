# "kerx"表

## 一般表信息

字距调整（'kern'）表的格式最初设计于 1988 年。当时，680x0 处理器是设计中心，内存相对昂贵。 由于这些限制，表格式被设计为占用尽可能少的空间，并使用加速处理的“技巧”。

然而，在运行千兆赫处理器的多千兆字节机器的世界中，这种设计是不合时宜的，更糟糕的是，这是一种障碍。 开发人员希望创建的字体所需的字体超出了原始“kern”表所能提供的范围。 为此，引入了扩展的字距调整表，即“kerx”表。

“kerx”表包含调整字体中字形位置的值。 它可以有多个不同格式的子表，其中可以包含垂直或水平文本的信息。

调整可以平行于文本流或垂直于文本流，或两者兼而有之。 例如，如果指定垂直调整并且文本通常水平书写，则调整将向上或向下。

当前定义了四种定位格式，格式 0、1、2、4 和 6。文件格式规范允许定义其他格式以供进一步使用。 格式 3、5、7 到 255 保留供将来使用。

每个子表可以采用下面指定的四种格式之一，并且可以包含垂直或水平文本的信息。 字体可以有多个“kerx”子表，但由于这些表所做的调整是累加性的，因此包含调整的子表的顺序并不重要。

定位表有一个标题，其中包含格式编号、存在的子表数量以及子表本身。

'kerx' **表**
|类型|名称|描述|
|-|-|-|
|uint16|version|扩展字距调整表的版本号（当前为 2、3 或 4）。|
|uint16|填充未使用； |设置为零。|
|uint32|nTables|扩展字距调整表中包含的子表的数量。|

如果“kerx”表版本为 3 或更高，则最后一个子表后跟有 subtableGlyphCoverageArray，如下所述。

如果“kerx”表版本为 4 或更大，则字距调整值可以是单个值或向量，如下所述。

定位子表还有一个标头，用于标识子表的格式及其包含的信息类型。

'kerx' **子表头**

|类型|名称|描述|
|-|-|-|
|uint32|length| 此子表的长度（以字节为单位），包括此标头。|
|uint32|覆盖范围| 使用此表的情况。 请参阅下面的说明。|
|uint32|tupleCount| 元组计数。 该值仅与变体字体一起使用，对于所有其他字体应为 0。 如果“kerx”表版本小于 4，则子表的 tupleCount 将被忽略。|

如果子表的 tupleCount 大于零，则子表不包含单个紧排值，而是包含与字体的“gvar”表中的全局元组关联的紧排值的 tupleCount 维向量。 支持的方式根据子表格式的不同而不同。

子表覆盖字段分为以下给出的子字段。

**覆盖领域**

|掩码值|名称|说明|
|-|-|-|
|0x80000000|垂直| 设置表格是否具有垂直字距调整值。|
|0x40000000|crossStream| 设置表是否具有跨流字距调整值。|
|0x20000000|变化| 设置表是否具有变化字距调整值。|
|0x10000000|processDirection| 进程方向标志。 如果清除，则向前处理字形，即从字形流中的第一个到最后一个。 如果我们从最后到第一个处理它们。 该标志仅适用于基于状态表的“kerx”子表（类型 1 和 4）。|
|0x0FFFFF00|未使用位|设置为 0。|
|0x000000FF|formatMask| 这些字节包含该子表的格式（当前定义的0、1、2、4和6）。|

掩码值为 0x40000000 表示要调用跨流位置调整。 如果文本通常是水平书写的，则调整将是垂直的。 如果调整值为正，则文本将向上移动。 如果它们为负，则文本将向下移动。 如果文本通常是垂直书写的，则调整将是水平的。 如果调整值为正，则文本将移至右侧。 如果它们为负，则文本将移至左侧。

## 定位子表格式

特定于格式的字距调整子表位于字距调整子表标头之后。 以下部分提供了字距调整表格式 0、1、2、4 和 6 的详细信息。格式 3、5 和 7 到 255 保留供将来使用。 当前定义了以下字距调整格式：

* 格式 0 是字距调整对的有序列表
* 格式 1 是最多八个字形的上下文字距调整的状态表
* 格式 2 是一个简单的二维、基于字节偏移量的字距调整值数组以及关联的类子表。
* 格式4是控制点/锚点定位的状态表
* 格式 6 是一个简单的、基于索引的二维数组，其中包含字距调整值以及关联的类子表。

### 格式 0 字距调整子表（字距调整对的有序列表）

格式 0 定位子表将定位信息存储为字距调整对和值的排序列表。 使用定位子表头中存储的信息，您可以对这些列表执行有效的二分搜索。

如果搜索范围是 2 的幂，则二分搜索的编码效率最高，因此可以通过移位而不是除法将搜索范围缩小一半。 一般来说，字距调整对的数量 nPairs 不会是 2 的幂。 searchRange 值应为小于或等于 nPairs 的两个的最大幂。 searchRange 未覆盖的对的数量（即 nPairs - searchRange）是值 rangeShift。

在进行二分搜索循环之前，您需要确定所需的字距调整对是否位于列表的 searchRange 部分中。 如果是，则二分搜索从字距调整对列表的开头开始。 如果不是，则搜索从列表开头开始 rangeShift 字节。 这将是一个入口边界。 通过字距调整对列表进行的迭代次数由entrySelector 的值确定，该值计算为小于或等于nPairs 值的两个最大幂的以2 为底的对数。

尽管这种有序列表格式紧凑且易于生成，但二分搜索循环需要 EntrySelector 迭代才能进行搜索。

此表给出了 Format 0 字距调整子表的格式：

**0 型 "kerx" 子表**
|类型|名称|描述|
|-|-|-|
|uint32|nPairs| 该子表中的字距调整对的数量。|
|uint32|searchRange| 小于或等于 nPairs 值的两个最大幂乘以子表中条目的大小（以字节为单位）。|
|uint32|EntrySelector| 计算为小于或等于 nPairs 值的两个最大幂的 log2。 该值指示必须进行搜索循环的迭代次数。 例如，在包含八个项目的列表中，将进行三次循环迭代。|
|uint32|rangeShift| nPairs 的值减去两个小于或等于 nPairs 的最大幂。 该值乘以表中条目的大小（以字节为单位）。|

Format 0 字距调整对和值的格式如下：

**类型 0 'kerx' 子表字距调整记录**
|类型|名称|描述|
|-|-|-|
|uint16|左| 字距调整对中左侧字形的字形索引。|
|uint16|右| 字距调整对中右侧字形的字形索引。|
|sint16|值| 见下文|

如果此子表的 tupleCount 为 0，则该表包含左右对的 FUnit 中的单个字距调整值。 如果该值大于零，则字形将分开。 如果该值小于零，则字形会一起移动。

如果 tupleCount 为 1 或更大，则该表包含从子表开头到控制字距调整的 FUnit 的 tupleCount 维向量的偏移量。

字距调整对的左半部分（高位字）和右半部分（低位字）构成一个无符号的 32 位数字，然后使用该数字对字距调整对进行数字排序。

该表可能以左侧字形 0xFFFF、右侧字形 0xFFFF 和字距调整值 0 的标记条目结束。

### 格式 1 字距调整子表（上下文字距调整状态表）
格式 1 定位表包含特定于格式的标头和状态表，以允许同时调整最多八个字形。 格式 1 定位表的格式特定标头如下：

**类型 1 'kerx' 标头**
|类型|名称|描述|
|-|-|-|
|STXHeader|stHeader|上下文字距调整状态表标题。|
|uint32|valueTable|从状态表开头到字距调整值数组开头的偏移量（以字节为单位）。|
上下文字距调整子表中的操作的长度为三个单词。 第一个字是状态表中新状态的索引。 第二个字是表特定的标志字段。 标志及其描述如下：

**类型 1 'kerx' 子表操作**
|掩码值|解读|
|-|-|
|0x8000|压入：如果设置，则将此字形推送到字距调整堆栈上。|
|0x4000|如果设置，则在进入新状态之前不要前进到下一个字形。|
|0x2000|如果设置，则重置字距调整数据（清除堆栈）|
|0x1FFF|未使用； 设置为 0。|

如果设置了推送标志，则字形数组中当前字形的位置将被推送到最多包含八个字形的堆栈上，称为字距调整堆栈。

操作中的最后一个单词是字距调整值数组的索引。 如果该索引为 0xFFFF，则不执行字距调整。

如果该子表的 tupleCount 为 0，则字距调整值表是 FUnit 字距调整值的列表。 每个字形从字距调整堆栈中弹出一个字形，并将字距调整值应用于它。 列表的末尾由值 0xFFFF 标记。

如果该子表的 tupleCount 为 1 或更大，则字距调整值表是 FUnit 字距调整值的 tupleCount 维向量的列表。 每个字形从字距调整堆栈中弹出一个字形，并将字距调整矢量应用于它。 列表的末尾由单个值 0xFFFF 标记。

格式 2 字距调整子表（基于简单偏移的 n × m 字距调整值数组）
格式 2 定位子表将字距调整信息存储在字距调整值的二维数组中。 字形映射到类，对左手和右手字形使用不同的映射。 这允许具有相似左手或右手形状的字形一起处理（例如，字母的重音形式）。

数组中的每一行代表一个左侧字形类别，每一列代表一个右侧字形类别，每个单元格都包含一个字距调整值。 第 0 行和第 0 列应指示不紧缩且包含全零的字形。

右侧类值预先乘以单个字距调整值中的字节数（即，2）进行存储。 左侧类值存储时预先乘以一行中的字节数，并按数组距字距调整数组开头的偏移量进行偏移。 这样就无需将行值和列值相乘来确定字距调整值的位置。 可以通过完成左侧和右侧类映射、将类值添加到字距调整数组的地址并获取新地址指向的字距调整值来索引该数组。

格式2简单数组头子表的表头如下：

**简单的基于偏移的数组头**
|类型|名称|描述|
|-|-|-|
|uint32|rowWidth| 字距调整值数组每行的字节数|
|uint32|leftOffsetTable| 从该子表的开头到左侧偏移表的偏移量。|
|uint32|rightOffsetTable| 从该子表的开头到右侧偏移表的偏移量。|
|uint32|数组| 从此子表的开头到字距调整数组的开头的偏移量。|

左侧和右侧偏移表是查找表。 值是 16 位无符号偏移量，对于查找表未涵盖的字形，默认为零。

要查找字距调整值，首先计算左侧（或顶部）字形的行和右侧（或底部）字形的列。 使用它们来计算该对的字距调整值的索引。

请注意，字距调整数组中行和列零的所有值都应为 0。

如果该子表的 tupleCount 为 0，则字距调整数组包含左侧类和右侧类的 FUnit 中的单个字距调整值。 如果该值大于零，则字形将分开。 如果该值小于零，则字形会一起移动。

如果 tupleCount 为 1 或更大，则字距调整数组包含从子表开头到控制字距调整的 FUnit 的 tupleCount 维向量的偏移量。

### 格式 4 字距调整子表（控制点/锚点定位的状态表）
格式 4 定位表包含格式特定标头和状态表，以允许通过将字形上的控制/锚点与另一个字形上的控制/锚点对齐来定位字形。 格式 4 定位表的格式特定标头如下：

**类型 4 'kerx' 子表头**
|类型|名称|描述|
|-|-|-|
|STXHeader| stHeader| 控制点定位状态表头。|
|uint32| 标志| 标志|
标志字段具有以下格式：

**格式 4 标志**
|值|解读|
|-|-|
|0xC0000000|动作类型掩码。 包含操作类型的两位字段。|
|0x3F000000|未使用 - 必须为零。|
|0x00FFFFFF|屏蔽从状态表开头到控制点表开头的偏移量（以字节为单位）。|

控制点定位子表内的条目表中的值非常类似于状态表子表（类型1）的操作。 第一个字是下一个状态的索引，第二个字包含标志，第三个字是 0xFFFF（表示无操作）或要执行的操作的索引。

标志及其描述如下：

**格式 4 行动**
|掩码值|解读|
|-|-|
|0x8000|标记：如果设置，请记住此字形作为标记字形。|
|0x4000|如果设置，则在进入新状态之前不前进到下一个字形|

如果设置了标记标志，则当前字形在字形数组中的位置将被保存。 该字形称为标记字形。

如果操作类型字段为 0，则操作包含控制点编号：

**控制点行动**
|类型|名称|描述|
|-|-|-|
|uint16|markControlPoint|标记字形中的控制点。|
|uint16|currControlPoint|当前字形中的控制点。|
如果操作类型字段为 1，则操作包含锚点编号：

**锚点动作**
|类型|名称|描述|
|-|-|-|
|uint16| markAnchorPoint|标记字形中的锚点。|
|uint16| currAnchorPoint|当前字形中的锚点。|
如果操作类型字段为 2，则操作包含坐标：

控制点坐标动作

|类型|名称|描述|
|-|-|-|
|FWord|markX|标记控制点的X坐标|
|FWord|markY|标记控制点的 Y 坐标|
|FWord|currX|当前控制点的X坐标|
|FWord|currY|当前控制点的Y坐标|

当前字形的位置使得两个控制/锚点重叠。

tupleCount 字段的值不会影响类型 4 'kerx' 子表的解释。 对于类型 4 子表的变化敏感字距调整，操作类型字段应为 0（指示控制点编号的使用），并且“gvar”包含适当的信息以重新定位字距调整中使用的控制点。

### 格式 6 字距调整子表（基于简单索引的 n × m 字距调整值数组）
格式 6 定位子表将字距调整信息存储在字距调整值的二维数组中。 字形映射到类，对左手和右手字形使用不同的映射。 这允许具有相似左手或右手形状的字形一起处理（例如，字母的重音形式）。

数组中的每一行代表一个左侧字形类别，每一列代表一个右侧字形类别，每个单元格都包含一个字距调整值。 第 0 行和第 0 列应指示不紧缩且包含全零的字形。

格式6简单数组头子表的表头如下：

**简单的基于索引的数组头**
|类型|名称|描述|
|-|-|-|
|uint32|flags|该子表的标志。 见下文。
|uint16|rowCount|字距调整值数组中的行数
|uint16|columnCount|字距调整值数组中的列数
|uint32|rowIndexTableOffset|从该子表的开头到行索引查找表的偏移量。
|uint32|columnIndexTableOffset|从该子表的开头到列索引偏移表的偏移量。
|uint32|kerningArrayOffset|从该子表的开头到字距调整数组的开头的偏移量。
|uint32|kerningVectorOffset|从该子表的开头到字距调整向量的开头的偏移量。 仅当该子表的 tupleCount 为 1 或更大时，此值才存在。

为类型 6“kerx”子表定义的唯一标志是valuesAreLong（位 0）。 如果设置，则两个类表和字距调整数组中的值的大小为四个字节。 如果清楚，那么它们的大小是两个字节。

通常，如果 rowCount × columnCount 大于 65535，则必须设置valuesAreLong 标志。如果 rowCount ×columnCount 等于或小于 65535，则可以设置valuesAreLong 标志，但不鼓励在这种情况下使用长值——这会使 表不必要地大。

这两个索引表是查找表。 每个都包含字距调整数组的索引。 行索引查找表中的值预先乘以columnCount，以避免在运行时进行乘法。 对于未覆盖的字形，查找表值默认为 0。

要查找字距调整值，首先计算第一个字形的行索引和第二个字形的列索引。 将它们相加以计算该对的字距调整值的索引。

请注意，字距调整数组中行和列零的所有值都应为 0。

如果该子表的 tupleCount 为 0，则字距调整数组包含 FUnit 中的单个字距调整值。 如果该值大于零，则字形将分开。 如果该值小于零，则字形会一起移动。

如果 tupleCount 为 1 或更大，则字距调整数组包含从 kerningVectors 表的开头到控制字距调整的 FUnit 的 tupleCount 维向量的偏移量。 如果设置了valuesAreLong标志，那么这些偏移量的大小是四个字节； 否则，它们的大小为两个字节。

## 子表字形覆盖表

子表字形覆盖表用于确定字体中的特定字形是否与给定子表相关。 其格式如下：

|类型|名称|描述|
|-|-|-|
|uint32| subtableOffsets[]| 从子表字形覆盖表开头到给定子表的字形覆盖位字段的偏移数组； “kerx”表中的每个子表都有一个偏移量。 使用 0xFFFFFFFF 指示给定子表没有覆盖位字段。 覆盖位字段仅用于类型 1 和 4 'kerx' 子表。
|uint8|coverageBitfields[]| 各个覆盖位域

每个覆盖位字段的大小为 (numGlyphs + CHAR_BIT - 1) / CHAR_BIT 字节（向上舍入到四字节边界）。

要确定特定字形是否被子表覆盖，请计算coverageBitfield[glyph/CHAR_BIT] & (1 << (glyph & (CHAR_BIT-1)))。 如果该值非零，则该字形被覆盖。

实际上，对于给定的文本运行，会为该运行中的字形生成覆盖位字段。 然后将该位字段与每个子表的覆盖位字段进行“与”运算。 如果结果为零，则子表不会使用运行中的任何字形，并且可以跳过子表。

通常，当覆盖位字段仅包含触发字距调整操作的字形时，会产生最大的好处。 这将最大化可以跳过的子表的数量。

## 变体字体支持
如果“kerx”表版本为 4 或更高，则它可用于在变体字体中提供可变字距调整。

通常在“kerx”表中，每个字形对都与单个两字节 FUnit 值相关联。 如果该值为负，则字形会靠得更近； 如果是正数，则它们的距离会更远。

在变体字体中，如果 tupleCount 值为 1 或更大，则字形对与两字节 FUnit 值的 tupleCount 维向量相关联。 它们与字体的“gvar”表中定义的全局元组坐标结合使用。 向量中的第一个值是字形对的默认字距调整值。 其余值是与全局坐标之一关联的增量。

例如，Skia 在其“gvar”表中定义了八个全局坐标。 因此，其“kerx”表子表的 tupleCount 值可以为 0（对于非可变字距调整）或 2 到 9（一个默认值和一到八个增量）。 任何未明确存在的增量均设置为 0。

字体的变体设置确定由字体的 n 个变体轴定义的 n 维空间中的一个点。 该点用于计算字体的“gvar”表中每个全局坐标的标量。 标量的计算与“gvar”表本身的计算完全相同。 “kerx”子表中定义的增量乘以该标量并添加到默认字距调整值。 最终结果是实际应用于字形对的字距调整值。

为了说明这一点，让我们假设一种字体具有以下内容：

* 两个变化轴，“wght”和“wdth”
* 'gvar' 表中的八个全局坐标： (1, 0), (-1, 0), (0, 1), (0, -1), (-1, -1), (1, -1) 、(1, 1) 和 (-1, 1)。 （前两个条件对于 Skia 来说是正确的。）
* 与字距调整向量相关的一对字形 [100, 5, -10, -15, 20, 0, 0, -25, 30]。 这定义了默认字距调整值 100 和八个全局坐标的八个增量。
我们进一步假设“wght”轴的归一化值为 0.4，“wdth”轴的归一化值为 -0.25。

第一个全局坐标的“wght”轴值为 1，“wdth”轴值为 0。 0 值意味着忽略轴设置，因此我们考虑的唯一值是“重量”轴的值。 我们对该轴的设置介于 0 和该轴的全局坐标值之间，因此我们将应用该全局坐标的增量。 具体来说，我们的设置是 0 和全局坐标设置之间的 0.4，因此我们将应用 0.4 的增量，或 2 (0.4 × 5)。 因此，到目前为止我们的字距调整值为 100 + 2 = 102。

第二个全局坐标的“wght”轴值为 -1，“wdth”轴值为 0。 同样，我们忽略了“宽度”。 我们对该轴的设置不在 0 和该轴的全局坐标值之间，因此我们不会应用此全局坐标的增量。 到目前为止，我们的字距调整值仍然是 102。

第三个增量同样被跳过（“wght”坐标为 0，我们的“wdth”轴设置不在 0 和全局坐标的“wdth”轴值之间）。

应用第四个增量（“wght”坐标为 0，但我们的“wdth”轴设置介于 0 和全局坐标的“wdth”轴值之间）。 我们将 (-0.25 / -1.0) × -15 = -3.75 添加到迄今为止的字距调整值中，得到 98.25。

我们将应用的唯一另一个增量是第六个，因为它是唯一一个我们的设置处于不被忽略的轴的正确范围内的增量 - 但由于增量本身为 0，因此我们不再进行进一步的更改。

因此，我们的最终字距调整值为 98.25。

## 平台特定信息
OS X 10.7 和 iOS 7 及更高版本支持“kerx”表。 类型 2 'kerx' 子表在 iOS 7 和 OS X 10.9 之前不起作用。

iOS 9 或更高版本以及 OS X 10.11 或更高版本中提供了对 processDirection 标志和版本 3“kerx”表的支持。

计划在 iOS 和 OS X 的未来版本中支持 1 或更大的 tupleCount 值以及类型 6“kerx”子表。

## 依赖关系
“kerx”表通过字形索引引用字形。 这些值不应超过最大配置文件 ('maxp') 表中包含的字体字形数量。

如果字体有“ankr”（锚点）表，则它用于定义锚点。 否则，“锚点”是由“glyf”（字形数据）表定义的点。

## 工具
ftxdumperfuser 支持“kerx”表的转储和融合。 'kerx' 表也可以使用 ftxenhancer 生成。