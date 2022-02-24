# <center>'maxp' 表</center>

## 一般表信息

'maxp' 表确定了字体的内存要求。 它以表版本号开头。 下一个条目是字体中字形的数量。 其余条目都建立了许多参数的最大值。 其中大部分是不言自明的。 然而，有一些需要澄清。

maxSizeOfInstructions 是与特定字形关联的所有指令的最大字节大小。

maxComponentElements 字段是指将用于创建复合字形的简单字形的最大数量。

maxComponentDepth 指的是用于构建最复杂的复合字形的递归级别数。 maxComponentDepth 的最大合法值为 16。如果组件中没有组件，则所有复合字形都可以视为简单，并且可以将此字段设置为值 1。