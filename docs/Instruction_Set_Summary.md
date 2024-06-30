# 指令集摘要

下表简要概述了 TrueType 指令集的名称、操作码、指令流和堆栈交互。

第一个表列出了从指令流中获取数据并将其放入解释器堆栈的指令。第二个表列出了从堆栈中获取参数的其余 TrueType 指令。

**表 1** 从指令流中获取数据的指令

指令|操作码|来自指令流|推送
-|-|-|-
|NPUSHB[ ]|0x40|n, b1, b2,...bn|b1,b2...bn
|NPUSHW[ ]|0x41|n, w1, w2,...w|w1,w2...wn
|PUSHB[abc]|0xB0 - 0xB7|b0, b1,..bn|b0, b1, ...,bn
|PUSHW[abc]|0xB8 - 0xBF|w0,w1,..wn|w0 ,w1, ...wn

**表 2** 从解释器堆栈获取数据的指令

<table border="0" cellspacing="2" cellpadding="0">
		<tbody><tr align="left" valign="middle">
		<th align="left">
			<p align="left">指令</p>
		</th>
		<th align="left">
			<p align="left">操作码</p>
		</th>
		<th align="left">
			<p align="left">弹出</p>
		</th>
		<th align="left">
			<p align="left">推送</p>
		</th>
		</tr>
		<tr align="left" valign="middle">
		<td>AA[ ]</td>
		<td>0x7F</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ABS[ ]</td>
		<td>0x64</td>
		<td>n</td>
		<td>|n|</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ADD[ ]</td>
		<td>0x60</td>
		<td>n2, n1</td>
		<td>(n1 + n2)</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ALIGNPTS[ ]</td>
		<td>0x27</td>
		<td>p2, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ALIGNRP[ ]</td>
		<td>0x3C</td>
		<td>p1, p2, ... , ploopvalue</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>AND[ ]</td>
		<td>0x5A</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>CALL[ ]</td>
		<td>0x2B</td>
		<td>f</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>CEILING[ ]</td>
		<td>0x67</td>
		<td>n</td>
		<td>Èn</td>
		</tr>
		<tr align="left" valign="middle">
		<td>CINDEX[ ]</td>
		<td>0x25</td>
		<td>k</td>
		<td>ek</td>
		</tr>
		<tr align="left" valign="middle">
		<td>CLEAR[ ]</td>
		<td>0x22</td>
		<td>all items on the stack</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DEBUG[ ]</td>
		<td>0x4F</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAC1[ ],</td>
		<td>0x73</td>
		<td>argn, cn, argn-1,cn-1, , arg1, c1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAC2[ ]</td>
		<td>0x74</td>
		<td>argn, cn, argn-1,cn-1, , arg1, c1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAC3[ ]</td>
		<td>0x75</td>
		<td>argn, cn, argn-1,cn-1, , arg1, c1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAP1[ ]</td>
		<td>0x5D</td>
		<td>argn, pn, argn-1, pn-1, , arg1, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAP2[ ]</td>
		<td>0x71</td>
		<td>argn, pn, argn-1, pn-1, , arg1, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DELTAP3[ ]</td>
		<td>0x72</td>
		<td>argn, pn, argn-1, pn-1, , arg1, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DEPTH[ ]</td>
		<td>0x24</td>
		<td>-</td>
		<td>n</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DIV[ ]</td>
		<td>0x62</td>
		<td>n2, n1</td>
		<td>(n1 * 64)/ n2</td>
		</tr>
		<tr align="left" valign="middle">
		<td>DUP[ ]</td>
		<td>0x20</td>
		<td>e</td>
		<td>e, e</td>
		</tr>
		<tr align="left" valign="middle">
		<td>EIF[ ]</td>
		<td>0x59</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ELSE</td>
		<td>0x1B</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ENDF[ ]</td>
		<td>0x2D</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>EQ[ ]</td>
		<td>0x54</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>EVEN[ ]</td>
		<td>0x57</td>
		<td>e</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FDEF[ ]</td>
		<td>0x2C</td>
		<td>f</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLIPOFF[ ]</td>
		<td>0x4E</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLIPON[ ]</td>
		<td>0x4D</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLIPPT[ ]</td>
		<td>0x80</td>
		<td>p1, p2, ..., ploopvalue</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLIPRGOFF[ ]</td>
		<td>0x82</td>
		<td>h, l</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLIPRGON[ ]</td>
		<td>0x81</td>
		<td>h, l</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>FLOOR[ ]</td>
		<td>0x66</td>
		<td>n</td>
		<td>În°</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GC[a]</td>
		<td>0x46 - 0x47</td>
		<td>p</td>
		<td>c</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GETINFO[ ]</td>
		<td>0x88</td>
		<td>selector</td>
		<td>result</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GFV[ ]</td>
		<td>0x0D</td>
		<td>-</td>
		<td>px, py</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GPV[ ]</td>
		<td>0x0C</td>
		<td>-</td>
		<td>px, py</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GT[ ]</td>
		<td>0x52</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>GTEQ[ ]</td>
		<td>0x53</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>IDEF[ ]</td>
		<td>0x89</td>
		<td>f</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>IF[ ]</td>
		<td>0x58</td>
		<td>e</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>INSTCTRL</td>
		<td>0x8E</td>
		<td>s, v</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>IP[ ]</td>
		<td>0x39</td>
		<td>p1, p2, ... , ploopvalue</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ISECT[ ]</td>
		<td>0x0F</td>
		<td>a1, a0, b1, b0, p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>IUP[a]</td>
		<td>0x30 - 0x31</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>JMPR</td>
		<td>0x1C</td>
		<td>offset</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>JROF[ ]</td>
		<td>0x79</td>
		<td>e, offset</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>JROT[ ]</td>
		<td>0x78</td>
		<td>e, offset</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>LOOPCALL[ ]</td>
		<td>0x2A</td>
		<td>f, count</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>LT[ ]</td>
		<td>0x50</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>LTEQ[ ]</td>
		<td>0x51</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MAX[ ]</td>
		<td>0X8B</td>
		<td>e2, e1</td>
		<td>max(e1, e2)</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MD[a]</td>
		<td>0x49 - 0x4A</td>
		<td>p2,p1</td>
		<td>d</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MDAP[ a ]</td>
		<td>0x2E - 0x2F</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MDRP[abcde]</td>
		<td>0xC0 - 0xDF</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MIAP[a]</td>
		<td>0x3E - 0x3F</td>
		<td>n, p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MIN[ ]</td>
		<td>0X8C</td>
		<td>e2, e1</td>
		<td>min(e1, e2)</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MINDEX[ ]</td>
		<td>0x26</td>
		<td>k</td>
		<td>ek</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MIRP[abcde]</td>
		<td>0xE0 - 0xFF</td>
		<td>n, p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MPPEM[ ]</td>
		<td>0x4B</td>
		<td>-</td>
		<td>ppem</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MPS[ ]</td>
		<td>0x4C</td>
		<td>-</td>
		<td>pointSize</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MSIRP[a]</td>
		<td>0x3A - 0x3B</td>
		<td>d, p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>MUL[ ]</td>
		<td>0x63</td>
		<td>n2, n1</td>
		<td>(n1 * n2)/64</td>
		</tr>
		<tr align="left" valign="middle">
		<td>NEG[ ]</td>
		<td>0x65</td>
		<td>n</td>
		<td>-n</td>
		</tr>
		<tr align="left" valign="middle">
		<td>NEQ[ ]</td>
		<td>0x55</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>NOT[ ]</td>
		<td>0x5C</td>
		<td>e</td>
		<td>( not e )</td>
		</tr>
		<tr align="left" valign="middle">
		<td>NROUND[ab]</td>
		<td>0x6C - 0x6F</td>
		<td>n1</td>
		<td>n2</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ODD[ ]</td>
		<td>0x56</td>
		<td>e</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>OR[ ]</td>
		<td>0x5B</td>
		<td>e2, e1</td>
		<td>b</td>
		</tr>
		<tr align="left" valign="middle">
		<td>POP[ ]</td>
		<td>0x21</td>
		<td>e</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RCVT[ ]</td>
		<td>0x45</td>
		<td>location</td>
		<td>value</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RDTG[ ]</td>
		<td>0x7D</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ROFF[ ]</td>
		<td>0x7A</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ROLL</td>
		<td>0x8a</td>
		<td>a,b,c</td>
		<td>b,a,c</td>
		</tr>
		<tr align="left" valign="middle">
		<td>ROUND[ab]</td>
		<td>0x68 - 0x6B</td>
		<td>n1</td>
		<td>n2</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RS[ ]</td>
		<td>0x43</td>
		<td>n</td>
		<td>v</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RTDG[ ]</td>
		<td>0x3D</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RTG[ ]</td>
		<td>0x18</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RTHG[ ]</td>
		<td>0x19</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>RUTG[ ]</td>
		<td>0x7C</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>S45ROUND[ ]</td>
		<td>0x77</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SANGW[ ]</td>
		<td>0x7E</td>
		<td>weight</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SCANCTRL[ ]</td>
		<td>0x85</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SCANTYPE[ ]</td>
		<td>0x8D</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SCFS[ ]</td>
		<td>0x48</td>
		<td>c, p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SCVTCI[ ]</td>
		<td>0x1D</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SDB[ ]</td>
		<td>0x5E</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SDPVTL[a]</td>
		<td>0x86 - 0x87</td>
		<td>p2, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SDS[ ]</td>
		<td>0x5F</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SFVFS[ ]</td>
		<td>0x0B</td>
		<td>y, x</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SFVTCA[a]</td>
		<td>0x04 - 0x05</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SFVTL[a]</td>
		<td>0x08 - 0x09</td>
		<td>p2, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SFVTPV[ ]</td>
		<td>0x0E</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SHC[a]</td>
		<td>0x34 - 0x35</td>
		<td>c</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SHP[a]</td>
		<td>0x32 - 0x33</td>
		<td>p1, p2, ..., ploopvalue</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SHPIX[ ]</td>
		<td>0x38</td>
		<td>d, p1, p2, ..., ploopvalue</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SHZ[a]</td>
		<td>0x36 - 0x37</td>
		<td>e</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SLOOP[ ]</td>
		<td>0x17</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SMD[ ]</td>
		<td>0x1A</td>
		<td>distance</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SPVFS[ ]</td>
		<td>0x0A</td>
		<td>y, x</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SPVTCA[a]</td>
		<td>0x02 - 0x03</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SPVTL[a]</td>
		<td>0x06 - 0x07</td>
		<td>p2, p1</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SROUND[ ]</td>
		<td>0x76</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SRP0[ ]</td>
		<td>0x10</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SRP1[ ]</td>
		<td>0x11</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SRP2[ ]</td>
		<td>0x12</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SSW[ ]</td>
		<td>0x1F</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SSWCI[ ]</td>
		<td>0x1E</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SUB[ ]</td>
		<td>0x61</td>
		<td>n2, n1</td>
		<td>(n1 - n2)</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SVTCA[a]</td>
		<td>0x00 - 0x01</td>
		<td>-</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SWAP[ ]</td>
		<td>0x23</td>
		<td>e2, e1</td>
		<td>e1, e2</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SZP0[ ]</td>
		<td>0x13</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SZP1[ ]</td>
		<td>0x14</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SZP2[ ]</td>
		<td>0x15</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>SZPS[ ]</td>
		<td>0x16</td>
		<td>n</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>UTP[ ]</td>
		<td>0x29</td>
		<td>p</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>WCVTF[ ]</td>
		<td>0x70</td>
		<td>n, l</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>WCVTP[ ]</td>
		<td>0x44</td>
		<td>v, l</td>
		<td>-</td>
		</tr>
		<tr align="left" valign="middle">
		<td>WS[ ]</td>
		<td>0x42</td>
		<td>v, l</td>
		<td>-</td>
		</tr>
	</tbody></table>