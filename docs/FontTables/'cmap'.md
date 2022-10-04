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

**Unicode 编码**

当 platformID 为 0 (Unicode) 时，platformSpecificID 解释如下：

