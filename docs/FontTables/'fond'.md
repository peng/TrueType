# "fond" 的表

一般表信息

“fond”表包含与旧的“FOND”和“NFNT”资源相当的内容。 它提供了使真正的数据分叉字体表现得好像它们位于带有关联的“FOND”和“NFNT”数据的字体手提箱中的能力。

该表以标题开头，给出表版本以及它所替换的“FOND”和“NFNT”资源的数量。 当前版本是2。

```
struct TableHeader_fond {
	uint16_t fVersion;
	uint16_t fCount_fond;
	uint16_t fCount_nfnt;
	uint16_t fUnused;
}
```

fUnused 字段应设置为 0。它为表的未来扩展提供更好的数据对齐和空间。

标头后面是 fCount_fond TableEntry_fond 条目，每个条目都包含资源管理器为单个“FOND”资源提供的数据的等效项。

资源名称可以被视为 Pascal 字符串（通过将其开头作为 &fNameLength），但它实际上存储为 C 字符串。 fScript 和 fLanguage 字段用于确定如何将资源名称转换为 Unicode。

建议将 fName 字段中未使用的字节设置为 0xFF 或 0x00 等值。

表条目还指示在“fond”表中找到“FOND”数据的位置。

通常，fResourceID 和 fFamilyID 字段相同； 然而，也有一些特殊情况，它们是不同的。 fResourceID 字段是特定“FOND”表的资源 ID，fFamilyID 字段是“FOND”资源内的系列 ID 字段。

fFlags 字段包含 GetResAttrs() 返回的“FOND”资源的值。

fStyle 字段用于存储此特定 TrueType 字体的 QuickDraw 样式值。 也就是说，如果包含 'fond' 表的字体是 'FOND' 资源的 plain 样式对应的字体，则 fStyle 的值为 0。如果是 'FOND' 资源的粗体样式对应的 TrueType 字体，则 fStyle 的值为 0。 为 1，依此类推。

fOffset 字段是相应 Resource_fond 结构相对于“fond”表开头的偏移量。 fLength 字段是 Resource_fond 和后面嵌入的“FOND”资源的总长度。

```
struct TableEntry_fond {
	int16_t fResourceID;
	int16_t fFamilyID;
	ResAttributes fFlags;
	uint16_t fStyle;
	int16_t fScript;
	int16_t fLanguage;
	uint32_t fOffset;
	uint32_t fLength;
	uint8_t fNameLength;
	uint8_t fName[ 255 ];
}
```

TableEntry_fond 数组后面是 TableHeader_fond.fCount_nfnt TableEntry_nfnt 结构数组，如下所述。

“FOND”资源通过关联的“sfnt”资源的资源 ID 来识别 TrueType 字体。 这在没有资源的数据分叉字体中显然是不可能的。 因此，实际的“FOND”数据前面有一个表，该表将资源 ID 映射到相关 TrueType 字体的 PostScript 名称。 该映射表位于 Resource_fond 结构中，该结构是映射的计数，后跟各个 ResourceMapping 结构：

```
struct Resource_fond {
	uint32_t fNumMappings;
	ResourceMapping fEntries[ kVariableLengthArray ];
}

struct ResourceMapping {
	int32_t fResourceID;
	uint8_t fPostScriptName[ 62 ];
}
```

由于 ResourceMapping 结构包含 PostScript 名称，因此这些名称存储为 ASCII、以零结尾。 建议将 fPostScriptName 字段未使用的字节设置为 0xFF 或 0x00 等值。

资源映射后面跟着《Inside Macintosh》中记录的“FOND”数据，但有两个例外，两者都与字体关联表 (FAT) 有关。

QuickDraw 使用 FAT 提供样式和“sfnt”资源以及样式/点大小组合和“NFNT”资源之间的映射。 “fond”表保留 FAT，但不需要包含对“sfnt”资源（除了包含该表的字体的资源）的引用。

“NFNT”资源的处理方式与“FOND”资源类似。 TableEntry_nfnt 条目用于存储有关“NFNT”表的资源管理器数据。 这些字段与 TableEntry_fond 结构的字段类似。

```
struct TableEntry_nfnt {
	int16_t fResourceID;
	ResAttributes fFlags;
	uint16_t fStyle;
	int16_t fScript;
	int16_t fLanguage;
	uint32_t fOffset;
	uint32_t fLength;
	uint8_t fNameLength;
	uint8_t fName[ 255 ];
}
```

同样，fOffset 字段的值相对于“fond”表的开头，并且与 fLength 字段一起指示嵌入“fond”表中的“NFNT”资源的位置。 由于“NFNT”资源不引用其他资源，因此不需要 Resource_fond 结构。

从 OS X 10.6 开始，OS X 支持“fond”表。

