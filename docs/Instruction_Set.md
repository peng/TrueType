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