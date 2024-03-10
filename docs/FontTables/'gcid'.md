# "gcid" 表

## 一般表信息

该表提供将字体中的字符映射到 CID 的数据。 它的结构如下：

**gcid表** 

|类型|名称|描述|
|-|-|-|
|UInt16|	version|版本号（设置为0）
|UInt16|	format|数据格式（设置为0）
|UInt32|	size|表的大小，包括标题
|UInt16|	registry|注册表 ID
|char[64]|	registryName|ASCII 格式的注册表名称； 未使用的字节应设置为 0
|UInt16|	order|订单ID
|char[64]|	orderName|ASCII 格式的订单名称； 未使用的字节应设置为 0
|UInt16|	supplementVersion|补充版
|UInt16|	count|随后的 CID 数量； 这不应超过字体中的字形数量
|UInt16[]|	CIDs|字体中字形的 CID，从字形 0 开始。如果字形与已识别集合中的 CID 不对应，则使用 0xFFFF。

例如，可以通过将注册表设置为 0，将注册表名称设置为“Adobe”，将订单设置为 2，将订单名称设置为“CNS1”，并将 SupplementVersion 设置为 4，从而指定 CID 用于 Adobe-CNS1-4。