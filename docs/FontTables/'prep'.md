# “prep”表

“prep”表存储组成控制值程序的指令，这是一组 TrueType 指令，将在首次访问字体时执行一次，并在字体、点大小或变换矩阵发生变化时再次执行。它由一个有序的指令操作码列表组成。每个操作码都是一个字节。标签“prep”指的是 preProgram，它已经过时了，但有些人仍然将控制值程序称为 preProgram。

有关控制值程序的更多信息，请参阅“指导字体”。

**表 75：** “prep”表

类型|名称|描述
|-|-|-|
|uint8|controlValueProgram[length]|每当点大小或字体变换发生变化时执行的指令集|
