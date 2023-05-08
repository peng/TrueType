# 指令系统

## 介绍

本节按字母顺序列出了 TrueType 指令集。 每个描述都从基本事实开始。 下面简要描述指令的功能。 本材料仅供参考。 有关 TrueType 语言的介绍，请参阅 Instructing Fonts 。

## 理解指令摘要

以下部分总结了理解后面的说明摘要所需的基本信息。

### 指令摘要格式

每个指令描述都以一个基本信息列表开始，如下面的图 1 所示。 对于给定的指令，仅包括相关信息字段。 例如，除了“push”指令之外的所有指令都省略了“From IS”字段。 通常，如果特定指令描述中省略了“使用”字段，则可以安全地假设该指令没有图形状态依赖性。 指令控制状态变量是该规则的一个例外。 它不会出现在每条指令的使用字段中，尽管它可以关闭所有指令的执行。

**图 1 指令摘要格式**

<table>
  <tr>
    <td>MNEMONIC[flags]</td>
    <td>助记词的解释</td>
  </tr>
  <tr>
    <td>Code Range</td>
    <td>标识此指令及其变体的十六进制代码范围</td>
  </tr>
  <tr>
    <td>Flags</td>
    <td>括号内二进制数含义的解释</td>
  </tr>
  <tr>
    <td>From IS</td>
    <td>来自 IS 推送指令从指令流中获取的任何参数</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>从堆栈弹出的任何参数</td>
  </tr>
  <tr>
    <td>Pushes</td>
    <td>任何压入堆栈的参数</td>
  </tr>
  <tr>
    <td>Uses</td>
    <td>该指令所依赖的任何状态变量</td>
  </tr>
  <tr>
    <td>Sets</td>
    <td>此指令设置的任何状态变量</td>
  </tr>
  <tr>
    <td>Gets</td>
    <td>此指令检索其值的状态变量</td>
  </tr>
  <tr>
    <td>Related instructions</td>
    <td>任何密切相关的指令，包括具有相似或相反效果的指令</td>
  </tr>
</table>

**表示堆栈相互作用**

在随后的指令摘要中，将列出一条指令从堆栈弹出或压入堆栈的参数，以及它们的用途和数据类型的简要说明。
在从堆栈弹出参数的情况下，列出的第一个参数是第一个从堆栈弹出的参数，第二个是下一个弹出的参数，依此类推。

<table>
  <tr>
    <td rowspan="10">MNEMONIC[flags]</td>
    <td>arg3：第一个参数弹出（uint32）</td>
  </tr>
  <tr>
    <td>arg2：弹出的第二个参数（uint32）</td>
  </tr>
  <tr>
    <td>arg1：弹出第三个参数（F26Dot6）</td>
  </tr>
</table>

在从堆栈弹出参数的情况下，第一个压入堆栈的结果首先出现，第二个压入的结果出现在它下面，依此类推。

<table>
  <tr>
    <td rowspan="10">Pushes</td>
    <td>result1：推送的第一个结果（F26Dot6）</td>
  </tr>
  <tr>
    <td>result2：推送的第二个结果（F26Dot6）</td>
  </tr>
</table>

当需要总结一条指令的堆栈交互时，信息将写在一行中。 弹出的项目在两个连字符左侧的左侧，推送的项目在右侧。 上面的例子会写成：

（arg1 arg2 arg3 -- 结果 1 结果 2）。

列表中最右边的项目始终是堆栈顶部的项目。


**堆栈中使用的数据类型**

许多 TrueType 指令与解释器堆栈交互。 简单来说，它们从堆栈中获取数据并将结果返回到堆栈中。 他们操作的堆栈元素都是 32 位值。 指令解释这些值的方式各不相同。 有些人认为所有压入或弹出的 32 位都是重要的。 有些只使用某些位。 有些将 32 位数量视为带符号整数，有些将其视为无符号整数，有些则将其视为定点值。
可以出现在堆栈上的数据类型在下面的表 1 中列出。

在压入或弹出的 32 位中只有一部分相关的情况下，数据类型的名称以大写字母 E 开头，表示“扩展”。 无符号值扩展为 32 位，有效位左侧为零。 有符号值被符号扩展为 32 位。

定点数的名称以字母 F 开头。名称由表示数字整数部分的位数和表示二进制小数点的字母“DOT”组成。 其次是小数位数。 扩展定点数以字母 EF 开头。

通用堆栈元素的数据类型为 StkElt。 任何 32 位数量都可以具有此数据类型。

**表 1：** 指令集数据类型

|数据类型|描述|
|-|-|
|Eint8|符号扩展 8 位整数|
|Euint16|零扩展 16 位无符号整数|
|EFWord|符号扩展的 16 位有符号整数，描述 FUnits 中的数量，em 空间中的最小可测量单位|
|EF2Dot14|符号扩展的 16 位有符号固定数，低 14 位表示小数|
|uint32|32 位无符号整数|
|int32|32 位有符号整数|
|F26Dot6|32 位有符号固定数，低 6 位代表小数|
|StkElt|任意 32 位数量|

## 理解插图

许多说明都附有插图。 这些插图中的大多数解释了指令对字形轮廓中点位置的影响。 图 1 列出了这些插图中使用的约定。 请记住，
* 除非另有说明，否则距离是沿投影矢量测量的
* 除非另有说明，指令沿自由向量移动点
有关移动点的更多信息，请参阅 [字体教程](./instructing_fonts.md) 。

**图 1** 图示要点

![](./images/F025_instr1.gif)

## 说明
### AA[] 调整角度

<table>
  <tr>
    <td>代码范围</td>
    <td>0x7F</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>p：点数（uint32）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>SANGW[ ]</td>
  </tr>
</table>

从堆栈中弹出一个参数。 该指令是不合时宜的，没有其他作用。

### ABS[] 绝对值

<table>
  <tr>
    <td>代码范围</td>
    <td>0x64</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>n：定点数（F26Dot6）</td>
  </tr>
  <tr>
    <td >Pushes 推动</td>
    <td>|n|：n 的绝对值 (F26Dot6)</td>
  </tr>
  <tr>
    <td colspan="10" >用绝对值替换堆栈顶部的数字。</td>
  </tr>
</table>

从堆栈弹出一个 26.6 定点数 n，并将 n 的绝对值压入堆栈。

### ADD[] 添加

<table>
  <tr>
    <td>代码范围</td>
    <td>0x60</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>n2：定点数（F26Dot6） n1：定点数（F26Dot6）</td>
  </tr>
  <tr>
    <td >Pushes 推动</td>
    <td>总和：n1 + n2(F26Dot6)</td>
  </tr>
  <tr>
    <td colspan="10" >将栈顶的两个数字相加。</td>
  </tr>
</table>

从堆栈中弹出两个 26.6 定点数 n2 和 n1，并将这两个数字的和压入堆栈。

### ALIGNPTS[] 对齐点

<table>
  <tr>
    <td>代码范围</td>
    <td>0x27</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>p2：点编号 (uint32) p1：点编号 (uint32)</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>带点 p2 的 zp0 和带点 p1 的 zp1、自由向量、投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>ALIGNRP[ ]</td>
  </tr>
</table>

沿与投影向量正交的轴对齐编号为堆栈顶部两项的两个点。
从堆栈中弹出两个点数 p2 和 p1，并通过将两个点沿自由向量移动到它们沿投影向量的投影的平均值，使它们之间的距离为零。

在下图中，点 p1 和 p2 沿着自由向量移动，直到它们之间的投影距离减小为零。 从 A 到 B 的距离等于 d/2，这等于从 B 到 C 的距离。值 d/2 是 p1 和 p2 之间原始投影距离的一半。

![图2](./images/F025_instr2.gif)

### ALIGNRP[] 与参考点对齐

<table>
  <tr>
    <td>代码范围</td>
    <td>0x27</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>p1、p2、...、ploopvalue：点数 (uint32)</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>带点 p2 的 zp0 和带点 p1 的 zp1、自由向量、投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>ALIGNPTS[ ]</td>
  </tr>
</table>

将编号位于堆栈顶部的点与 rp0 引用的点对齐。
从堆栈中弹出点编号 p1、p2、...、ploopvalue，并通过移动每个点 pi 将这些点与 rp0 的当前位置对齐，从而使从 pi 到 rp0 的投影距离减小为零。 对齐的点数取决于状态变量循环的当前设置。

在下图中，点 p 沿着自由向量移动，直到它与 rp0 的投影距离减小为零。

![图3](./images/F025_instr3.gif)

### AND[] 逻辑与

<table>
  <tr>
    <td>代码范围</td>
    <td>0x5A</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>e2：堆栈元素 (StkElt) e1：堆栈元素 (StkElt)</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>(e1 and e2)：e1 和 e2 的逻辑与 (uint32)</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>带点 p2 的 zp0 和带点 p1 的 zp1、自由向量、投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>OR[ ]</td>
  </tr>
</table>

获取顶部两个堆栈元素的逻辑与。
从堆栈中弹出顶部的两个元素 e2 和 e1，并将两个元素的逻辑与结果压入堆栈。 如果其中一个或两个元素为 FALSE（值为零），则压入零。 如果两个元素都为 TRUE（具有非零值），则压入一个。

### CALL[] 调用函数

<table>
  <tr>
    <td>代码范围</td>
    <td>0x2B</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>f：函数标识符号（0 到 (n-1) 范围内的 int32，其中 n 在“maxp”表中指定）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>FDEF[ ], EIF[ ]</td>
  </tr>
</table>

### CEILING[] 天花板

<table>
  <tr>
    <td>代码范围</td>
    <td>0x67</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>n：定点数（F26Dot6）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>n : n 的上限 (F26Dot6)</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>FLOOR[ ]</td>
  </tr>
</table>

获取堆栈顶部数字的上限。
从堆栈中弹出一个数字 n 并压入 n ，即大于或等于 n 的最小整数值。 请注意，n 的上限虽然是一个整数值，但表示为 26.6 定点数。

### CINDEX[] 将 INDEXed 元素复制到栈顶

<table>
  <tr>
    <td>代码范围</td>
    <td>0x25</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>k：堆栈元素编号（int32）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>ek: 第 k 个堆栈元素 (StkElt)</td>
  </tr>
  <tr>
    <td rowspan="4" >堆栈之前</td>
    <td>k：堆栈元素编号</td>
  </tr>
  <tr>
    <td>e1：堆栈元素</td>
  </tr>
  <tr>
    <td>...</td>
  </tr>
  <tr>
    <td>ek：堆栈元素</td>
  </tr>
  <tr>
    <td rowspan="4" >堆栈之后</td>
    <td>ek：索引元素</td>
  </tr>
  <tr>
    <td>e1：堆栈元素</td>
  </tr>
  <tr>
    <td>...</td>
  </tr>
  <tr>
    <td>ek：堆栈元素</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>MINDEX[ ]</td>
  </tr>
</table>

将索引堆栈元素复制到堆栈顶部。
从堆栈中弹出堆栈元素编号 k，并将第 k 个堆栈元素的副本压入堆栈顶部。 由于它是一个被压入的副本，因此第 k 个元素保持在其原始位置。 此功能是 CINDEX[ ] 和 MINDEX[ ] 指令之间的主要区别。

k 的零值或负值是错误的。

### CLEAR[] 清除堆栈

<table>
  <tr>
    <td>代码范围</td>
    <td>0x22</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>堆栈中的所有项目 (StkElt)</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
</table>

清除堆栈中的所有元素。

### DEBUG[] 调试调用

<table>
  <tr>
    <td>代码范围</td>
    <td>0x4F</td>
  </tr>
  <tr>
    <td>pops 尾部弹出</td>
    <td>n：整数（uint32）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
</table>

从堆栈中弹出一个整数。 在解释器的非调试版本中，指令的执行将继续。 在可供字体开发人员使用的调试版本中，将调用依赖于实现的调试器。
该指令仅用于调试目的，不应成为成品字体的一部分。 某些实现不支持此指令。

### DELTAC1[] DELTA异常C1

<table>
  <tr>
    <td>代码范围</td>
    <td>0x73</td>
  </tr>
  <tr>
    <td rowspan="2" >pops 尾部弹出</td>
    <td>n：异常规范和 CVT 条目号的对数 (uint32)</td>
  </tr>
  <tr>
    <td>argn, cn, argn-1,cn-1, , arg1, c1：CVT 条目号和异常规范对（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>delta 转移, delta 基础</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3, DELTAP1, DELTAP2, DELTAP3</td>
  </tr>
</table>

为一个或多个 CVT 值创建例外，每个 CVT 值都具有指定的磅值和指定的数量。

弹出一个整数 n，后跟 n 对异常规范和控制值表条目号。 DELTAC1[] 更改每个 CVT 条目中指定的值，大小和像素数量在其成对参数中指定。

DELTAC1[] 指令的 8 位 arg 组件分解为两部分。 最重要的 4 位表示应用异常的每个 em 的相对像素数。 最低有效 4 位表示要进行的更改的大小。

每个 em 的相对像素数是参数中指定的值和增量基数的函数。 DELTAC1[] 指令以每 em 像素大小工作，从 delta base 到 delta_base + 15。要以更大的每 em 像素大小调用异常，请使用 DELTAC2[] 或 DELTAC3[] 指令，这会影响大小的变化 最多 delta_base + 47 或者，如果需要，增加 delta base 的值。

移动的幅度在指令中以编码形式指定。 表 5 列出了异常值的映射和移动的幅度。步长的大小取决于增量偏移的值。

**表 4：** 映射到移动步数的幅度值

<table>
  <tr>
    <th>选择器</th>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
    <td>12</td>
    <td>13</td>
    <td>14</td>
    <td>15</td>
  </tr>
  <tr>
    <th>步数</th>
    <td>-8</td>
    <td>-7</td>
    <td>-6</td>
    <td>-5</td>
    <td>-4</td>
    <td>-3</td>
    <td>-2</td>
    <td>-1</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
  </tr>
</table>

有关 DELTA 指令的更多信息，请参阅 [字体教程](./instructing_fonts.md)。

### DELTAC2[] DELTA异常C2

<table>
  <tr>
    <td>代码范围</td>
    <td>0x74</td>
  </tr>
  <tr>
    <td rowspan="2" >pops 尾部弹出</td>
    <td>n：异常规范和 CVT 条目号的对数 (uint32)</td>
  </tr>
  <tr>
    <td>argn, cn, argn-1,cn-1, , arg1, c1：CVT 条目号和异常规范对（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>delta 转移, delta 基础</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3[], DELTAP1[], DELTAP2[], DELTAP3[]</td>
  </tr>
</table>

为一个或多个 CVT 值创建例外，每个 CVT 值都具有指定的磅值和指定的数量。
弹出一个整数 n，后跟 n 对异常规范和 CVT 条目号。 DELTAC2[] 以其配对参数中指定的大小和数量更改每个 CVT 条目中的值。

DELTAC2[] 指令与 DELTAC1[] 指令完全相同，除了以从 (delta_base + 16) 到 (delta_base + 31) 开始的每 em 像素大小操作。 要以每 em 大小的较小像素调用异常，请使用 DELTAC1[] 指令。 要以较小的每 em 像素大小调用异常，请使用 DELTAC3[] 指令，该指令可以影响最大 delta_base + 47 大小的更改，或者，如果需要，更改 delta base 的值。

有关详细信息，请参阅 DELTAC1[] 或 [字体教程](./instructing_fonts.md) 的条目。

### DELTAC3[] DELTA 异常 C3

<table>
  <tr>
    <td>代码范围</td>
    <td>0x75</td>
  </tr>
  <tr>
    <td rowspan="2" >pops 尾部弹出</td>
    <td>n：CVT条目号和异常规范的对数（uint32）</td>
  </tr>
  <tr>
    <td>argn, cn, argn-1,cn-1, , arg1, c1：CVT 条目号和异常规范对（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>delta 转移, delta 基础</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3[], DELTAP[], DELTAP2[], DELTAP3[]</td>
  </tr>
</table>

为一个或多个 CVT 值创建例外，每个 CVT 值都具有指定的磅值和指定的数量。
弹出一个整数 n，后跟 n 对异常规范和 CVT 条目号。 DELTAC3[] 以其配对参数中指定的大小和数量更改每个 CVT 条目中的值。

DELTAC3[] 指令与 DELTAC1 指令完全相同，除了以从 (delta_base + 32) 到 (delta_base + 47) 开始的每 em 像素大小操作。

有关详细信息，请参阅 DELTAC1[] 或 [字体教程](./instructing_fonts.md) 的条目。

### DELTAP1[] DELTA异常P1

<table>
  <tr>
    <td>代码范围</td>
    <td>0x5D</td>
  </tr>
  <tr>
    <td>Pops n：异常规范和点数对（uint32）</td>
    <td>argn, pn, argn-1, pn-1, , arg1, p1：n 对异常规范和点（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>zp0, delta base, delta shift, 自由向量, 投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3, DELTAP1, DELTAP2, DELTAP3</td>
  </tr>
</table>

在一个或多个点位置创建异常，每个位置都具有指定的点大小和指定的数量。
DELTAP1[] 作用于 zp0 引用的区域中的点。 它以配对参数中指定的大小和数量移动指定的点。 移动一个点可以打开或关闭位图中选定的像素，这些像素将在扫描转换受影响的轮廓时创建。 可以指定任意数量的点和参数。

分组 [argi, pi] 可以执行 n 次。 argi 的值由一个字节组成，低四位表示异常的大小，高四位表示每个 em 值的相对像素。

DELTAP 指令工作的实际每 em 像素大小是相对每 em 像素大小和 delta base 的函数。 DELTAP1[] 指令以每 em 像素大小工作，从 delta_base 到 delta_base + 15。要在每 em 更大像素大小上调用异常，请使用 DELTAP2[] 或 DELTAP3[] 指令，它们一起可以影响更改 大小最大为 delta_base + 47，或者，如果需要，增加 delta base 的值。

移动的幅度在指令中以编码形式指定。 表 5 列出了从 DELTA 指令中使用的异常值到移动步长的映射。 步长的大小取决于增量偏移的值。

**表 5：** 映射到移动步数的幅度值

<table>
  <tr>
    <th>选择器</th>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
    <td>12</td>
    <td>13</td>
    <td>14</td>
    <td>15</td>
  </tr>
  <tr>
    <th>步数</th>
    <td>-8</td>
    <td>-7</td>
    <td>-6</td>
    <td>-5</td>
    <td>-4</td>
    <td>-3</td>
    <td>-2</td>
    <td>-1</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
  </tr>
</table>

### DELTAP2[] DELTA 异常 P2

<table>
  <tr>
    <td>代码范围</td>
    <td>0x71</td>
  </tr>
  <tr>
    <td>Pops n：异常规范和点数对（uint32）</td>
    <td>argn, pn, argn-1, pn-1, , arg1, p1：n 对异常规范和点（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>zp0, delta shift, delta base, 自由向量, 投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3, DELTAP1, DELTAP2, DELTAP3</td>
  </tr>
</table>

在一个或多个点位置创建异常，每个位置都具有指定的点大小和指定的数量。
DELTAP2[] 作用于 zp0 引用的区域中的点。 它以配对参数中指定的大小和数量移动指定的点。 移动一个点可以打开或关闭位图中选定的像素，这些像素将在扫描转换受影响的轮廓时创建。 可以指定任意数量的点和参数。

DELTAP2[] 指令与 DELTAP1[] 指令相同，除了以从 (delta_base + 16) 到 (delta_base + 31) 开始的每 em 像素大小进行操作。 要以每 em 大小的较小像素调用异常，请使用 DELTAP1[] 指令。 要以每 em 大小的较小像素调用异常，请使用 DELTAP3[] 指令。 如有必要，更改 delta_base 的值。

### DELTAP3[] DELTA 异常 P3

<table>
  <tr>
    <td>代码范围</td>
    <td>0x71</td>
  </tr>
  <tr>
    <td>Pops n：异常规范和点数对（uint32）</td>
    <td>argn, pn, argn-1, pn-1, , arg1, p1：n 对异常规范和点（uint32 对）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>zp0, delta shift, delta base, 自由向量, 投影向量</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>DELTAC2[ ], DELTAC3, DELTAP1, DELTAP2, DELTAP3</td>
  </tr>
</table>

在一个或多个点位置创建异常，每个位置都具有指定的点大小和指定的数量。
弹出一个整数 n，后跟 n 对异常规范和点。 DELTAP3[] 作用于 zp0 引用的区域中的点。 它以配对参数中指定的大小和数量移动指定的点。 移动一个点可以打开或关闭位图中选定的像素，这些像素将在扫描转换受影响的轮廓时创建。 可以指定任意数量的点和参数。

DELTAP3[] 指令与 DELTAP1[] 指令相同，除了以从 (delta_base + 32) 到 (delta base + 47) 开始的每 em 像素大小进行操作。 要以每 em 大小的较小像素调用异常，请使用 DELTAP1[] 或 DELTAP2[] 指令。 如有必要，更改增量基数的值。

### DEPTH[] 栈的深度

<table>
  <tr>
    <td>代码范围</td>
    <td>0x24</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>n：元素数量（int32）</td>
  </tr>
</table>

将 n（当前在堆栈中的元素数）压入堆栈。

### DIV[]除法

<table>
  <tr>
    <td>代码范围</td>
    <td>0x62</td>
  </tr>
  <tr>
    <td rowspan="2" >Pops</td>
    <td>n2：小数 (F26Dot6)</td>
  </tr>
  <tr>
    <td>n1：最后一个小数（F26Dot6）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>(n1 * 64)/n2：商 (F26Dot6)</td>
  </tr>
</table>

将堆栈顶部的第二个数除以堆栈顶部的数字。
从堆栈中弹出两个 26.6 定点数 n1 和 n2，并将 n2 除以 n1 得到的商压入堆栈。 除法按以下方式进行，n1 左移六位，然后除以 2。

### DUP[] DUPlicate 栈顶元素

<table>
  <tr>
    <td>代码范围</td>
    <td>0x20</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>e：堆栈元素（StkElt）</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>e：堆栈元素（StkElt）</td>
  </tr>
  <tr>
    <td>e：堆栈元素（StkElt）</td>
    <td></td>
  </tr>
</table>

复制栈顶元素。
从堆栈中弹出一个元素 e，复制该元素并将其压入两次。

### EIF[] End IF

<table>
  <tr>
    <td>代码范围</td>
    <td>0x59</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>IF[ ], ELSE[ ]</td>
  </tr>
</table>

标记 IF 或 IF-ELSE 指令序列的结束。

### ELSE[] ELSE 子句

<table>
  <tr>
    <td>代码范围</td>
    <td>0x1B</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>IF[ ], ELSE[ ]</td>
  </tr>
</table>

标记当 IF 指令在堆栈上遇到 FALSE 值时要执行的指令序列的开始。 该指令序列以 EIF 指令结束。

IF-ELSE-EIF 序列的 ELSE 部分是可选的。

### ENDF[] END 函数定义

<table>
  <tr>
    <td>代码范围</td>
    <td>0x2D</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>-</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>FDEF[ ], IDEF[ ]</td>
  </tr>
</table>

标记函数定义或指令定义的结尾。 函数定义和指令定义不能嵌套。

### EQ[] 相等

<table>
  <tr>
    <td>代码范围</td>
    <td>0x54</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>e2：堆栈元素 e1：堆栈元素</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>b：布尔值（[0,1]范围内的uint32）</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>NEQ[ ]</td>
  </tr>
</table>

测试栈顶的两个数是否相等。
从堆栈中弹出两个 32 位值 e2 和 e1 并比较它们。 如果它们相同，则将一个表示 TRUE 的值压入堆栈。 如果它们不相等，则将零（表示 FALSE）放入堆栈。

### EVEN[] EVEN

<table>
  <tr>
    <td>代码范围</td>
    <td>0x57</td>
  </tr>
  <tr>
    <td>Pops</td>
    <td>e: 堆栈元素 (F26Dot6)</td>
  </tr>
  <tr>
    <td>Pushes 压入栈</td>
    <td>b：布尔值（[0,1]范围内的uint32）</td>
  </tr>
  <tr>
    <td>使用</td>
    <td>圆形状态</td>
  </tr>
  <tr>
    <td>相关说明</td>
    <td>ODD[ ]</td>
  </tr>
</table>