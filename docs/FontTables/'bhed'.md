# "bhed"表

## 一般表信息

"bhed"（bitmap head）表包含有关位图字体的全局信息。 它记录了诸如字体版本号、创建和修改日期、修订号以及适用于整个字体的基本印刷数据等事实。 这包括字体边界框的规范、字体字形最有可能书写的方向以及有关字形在全角方形中的位置的其他信息。 校验和用于验证字体中数据的完整性。 它还可以用来区分两种相似的字体。

"bhed"表与"head"（字体头）表逐字节相同。 OS X 使用"bhed"表的存在作为字体没有任何字形轮廓而只有嵌入位图的标志。 有关"bhed"表中的字段及其值的更多信息，请参阅"head"（字体标题）表的文档。

## 平台特定信息

该表在 OS X 中用于表示仅位图字体的存在。 如果字体没有轮廓，则这是必需的。 如果字体确实有轮廓，则不应有"bhed"表。

## 依赖关系

如果字体中存在"bhed"表，则该字体还必须具有"bdat"和"bloc"表。 字体不得有"head"或"glyf"表。

"bhed"表的字段与其他表之间的字段依赖关系在"head"（字体标题）表的文档中进行了描述。