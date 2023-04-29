# 图形状态

## 介绍

图形状态变量建立了执行 TrueType 指令的上下文。 本章按字母顺序列出了构成图形状态的变量，并简要描述了它们的用途以及理解其作用所需的基本事实。 特别是它提供了有关每个变量的默认值、用于设置其值的指令以及受其设置影响的指令列表的信息。 在第 2 章“字体引擎”中可以找到对图形状态变量作用的全面讨论。

大多数图形状态变量都有一个默认值，如下所示。 该值在第一次访问特定字体时建立，并在任何字形的解释开始时再次建立。

可以使用指令更改图形状态变量的默认值。 如果在控制值程序中更改了该值，则该值将成为新的默认值。 如果状态变量的值被与特定字形相关联的指令更改，则新值不是新的默认值，并且仅适用于该字形。

## 自动翻转

```text
Default TRUE

Set with		FLIPOFF[]
                     FLIPON[]

Affects MIRP[]
```

控制是否更改控制值表条目的符号以匹配与其进行比较的实际距离测量值的符号。 将自动翻转设置为 TRUE 可以通过单个控制值表条目来控制使用或针对投影矢量测量的距离。 当自动翻转设置为 FALSE 时，必须使用投影矢量测量距离。

## 控制切入值

```
Default 17/16 pixels (F26Dot6)

Set with		LCVTCI[]

Affects MIAP[]
                  MIRP[]
```

将控制值表条目的正则化效果限制为表值与从原始轮廓获取的测量值之间的差异足够小的情况。

## 基础增量

```
Default 9

Set with		SDB[]

Affects DELTAP1[]
            DELTAP2[]
            DELTAP3[]
            DELTAC1[]
            DELTAC2[]
            DELTAC3[]

```

建立用于计算给定 DELTAC[] 或 DELTAP[] 指令将应用的点大小范围的基值。 下面给出的公式用于计算各种 DELTA 指令的范围。

```
DELTAC1		 DELTAP1		 (delta_base) through (delta_base + 15)
	 DELTAC2		 DELTAP2		 (delta_base + 16) through (delta_base + 31)
	 DELTAC3		 DELTAP3		 (delta_base + 32) through (delta_base + 47)
   
```

## 增量偏移

```
Default 3

Set with		SDS[]

Affects DELTAP1[]
            DELTAP2[]
            DELTAP3[]
            DELTAC1[]
            DELTAC2[]
            DELTAC3[]
```

确定 DELTAC[] 或 DELTAP[] 指令中的移动范围和最小移动幅度（步长）。 更改 delta shift 的值可以权衡点移动的精细控制与移动范围。 低增量偏移有利于运动范围而不是精细控制。 高增量偏移有利于对运动范围的精细控制。 该步长的值为幂增量偏移的 1/2。 运动范围的计算方法是将允许的步数 (16) 乘以步数。

Delta shift 的合法范围是零到六。 负值是非法的。

## 双投影矢量

```
Default none

Set with		SDPVTL[]

Affects IP[]
            GC[]
            MD[]
            MDRP[]
            MIRP[]

```

第二个投影矢量设置为由两点的原始轮廓位置定义的线。 当需要在执行任何指令之前测量与缩放轮廓的距离时，使用双投影矢量。

## 自由向量

```
Default x-axis

Set with		SFVTCA[]
            SFVTL[]
            SFTPV[]
            SVTCA[]
            SFVFS[]
Affects ALIGNPTS[]
            ALIGNRP[]
            DELTAP1[]
            DELTAP2[]
            DELTAP3[]
            IP[]
            MDAP[]
            MDRP[]
            MIAP[]
            MIRP[]
            MSIRP[]
            ROUND[]
            SCFS[]
            SHC[]
            SHPIX[]
            SHZ[]
            UTP[]
```

一个单位矢量，它建立一个轴，点可以沿着该轴移动。

## 指示控制

```
Default		 0

Set with				INSTCTRL[]

Affects all	 instructions
```

可以在某些情况下关闭指令。 当设置为 TRUE 时，将不执行任何指令。

## loop 循环

```
Default 1

Set with		SLOOP[]

Affects ALIGNRP[]
            FLIPPT[]
            IP[]
            SHP[]
            SHPIX[]
```

可以将某些指令重复指定的次数。 默认值 1 确保除非更改 loop 的值，否则这些指令将执行一次。

## 最小距离

```
Default 1 pixel (F26Dot6)

Set with		SMD[]

Affects MDRP[]
            MIRP[]

```

建立距离四舍五入的最小可能值。

## 投影矢量

```

Default x-axis

Set with		SPVTCA[]

            SPVTL[]
            SVTCA[]
            SPVFS[]

Affects ALIGNPTS[]
            ALIGNRP[]
            DELTAP1[]
            DELTAP2[]
            DELTAP3[]
            GC[]
            IP[]
            MD[]
            MDAP[]
            MDRP[]
            MIAP[]
            MIRP[]
            MSIRP[]
            SCFS[]
            SHC[]
            SHP[]
            SHZ[]

```

一个单位向量，其方向建立了一个轴，沿着该轴测量距离。

## 圆形状态

```
Default 1 (grid)
Set with		RDTG[]
            ROFF[]
            RTDG[]
            RTG[]
            RTHG[]
            RUTG[]
            SROUND[]
            S45ROUND[]

Affects EVEN[]
            ODD[]
            MDAP[]
            MIAP[]
            MDRP[]
            MIRP[]
            ROUND[]
```

确定值的舍入方式。 可以使用 SROUND 或 S45ROUND 指令设置为多种预定义状态或自定义状态。

## rp0

```

Default 0
Set with		SRP0[], MDRP[], MIAP[], MSIRP[]

Affects ALIGNRP[]
            MDRP[]
            MIRP[]
            MSIRP[]

```

三个参考点中的第一个。 引用一个点编号，该编号与区域名称一起指定字形区域或模糊区域中的一个点。

## rp1

```
Default 0

Set with		SRP1[], MDAP[], MDRP[], MIRP[]
Affects IP[]
            SHC[]
            SHP[]
            SHZ[]
```

三个参考点中的第二个。 引用一个点编号，该编号与区域名称一起指定字形区域或模糊区域中的一个点。

## rp2

```
Default				 0
Set with		SRP2[], MDRP[], MIRP[]
Affects IP[]
            SHC[]
            SHP[]
            SHZ[]
```

三个参考点中的第三个。 引用一个点编号，该编号与区域名称一起指定字形区域或模糊区域中的一个点。

## scan control

```
Default FALSE
Set with		SCANCTRL[]
```

确定解释器是否将为当前字形激活丢弃控制。 压降控制模式的使用取决于以下三个条件的当前普遍组合：

1. 字形是否旋转？
2. 字形是否被拉伸？
3. 当前每个像素设置是否小于指定阈值？

如果上述条件之一为假，也可以阻止 dropout 控制。

## 单宽度切入

```
Default 0 pixels (F26Dot6)
    Set with		SSWCI[]
    Affects MDRP[]
                MIRP[]
```

解释器将替换 CVT 距离或实际距离以支持单一宽度值的距离差。

## zp0

```
Default 1
Set with		SZP0[]
            SZPS[]
Affects ALIGNPTS[]
            ALIGNRP[]
            DELTAP1[]
            DELTAP2[]
            DELTAP3[]
            FLIPPT[]
            FLIPRGOFF[]
            FLIPRGON[]
            IP[]
            ISECT[]
            MD[]
            MDAP[]
            MDRP[]
            MIAP[]
            MIRP[]
            MSIRP
            SHC[]
            SHP[]
            UTP[]
```

三个区域指针中的第一个。 可以设置为引用字形区域 (Z0) 或模糊区域 (Z1)。

## zp1

```
Default 1
Set with		SZP1[]
            SZPS[]

Affects ALIGNPTS[]
            ALIGNRP[]
            IP[]
            ISECT[]
            MD[]
            MDRP[]
            MIRP[]
            MSIRP[]
            SDPVTL[]
            SFVTL[]
            SHC[]
            SHP[]
            SHZ[]
            SPVTL[]
```

三个区域指针中的第二个。 可以设置为引用模糊区域 (Z0) 或字形区域 (Z1)。

## zp2

```
Default 1
Set with		SZP2[]
            SZPS[]

Affects GC[]
            IP[]
            ISECT[]
            IUP[]
            SCFS[]
            SDPVTL[]
            SFVTL[]
            SHC[]
            SHP[]
            SHPIX[]
            SPVTL[]
```

三个区域指针中的第三个。 可以设置为引用模糊区域 (Z0) 或字形区域 (Z1)。

