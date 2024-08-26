import{_ as i,a as s,b as c,c as _,d as h,e as u,f as g,g as p,h as m,i as b,j as f,k as L,l as y,m as A,n as E,o as P}from"./course2_16-ec75e262.js";import{_ as C}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as D,c as x,a as d,w as n,d as t,e as r,f as o}from"./app-1ed3f6c2.js";const G={},I=t("h3",{id:"_1-问题背景",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-问题背景","aria-hidden":"true"},"#"),r(),t("strong",null,"1 问题背景")],-1),z=t("p",null,"布局流程中，可以分为三个阶段处理：总体布局(Global Placement)、合法化(Legalization)、详细布局(Detailed Placement)。在全局布局中把单元放到合适的位置，忽略单元重叠。合法化则是把单元放到行上，消除单元之间的重叠。",-1),T=t("img",{src:i,style:{zoom:"35%"}},null,-1),v=o(`<p>影响布局质量的主要因素包括：</p><pre><code>● 线长：Placement阶段可以根据利用率对面积进行适当优化。

● 功耗：在重视功耗的设计中，标准单元可以按电压分为三种(HVT,LVT,SVT)。

● 性能：标准单元位置影响CTS过程(即时钟信号的延迟)，同时也会影响线长(即数据信号的延迟)。

● 可布线性：要对局部地congestion进行评估，以确保布线成功。

● 可制造性：随着工艺地不断演进，越来越多的约束也需要在DP阶段被考虑。
</code></pre><h3 id="_2-问题描述" tabindex="-1"><a class="header-anchor" href="#_2-问题描述" aria-hidden="true">#</a> <strong>2 问题描述</strong></h3><p>给定版图规格之后，设计者需要将模块和标准单元在Die内放置好。满足单元无重叠，行对齐和site对齐，最优化线长，时序，功耗，可布通性。</p><p>1、<strong>实现要求</strong>：我们对全局布局的结果进行合法化，参考iEDA已有合法化的实现方法——Abacus[1]算法中的接口设计和逻辑交互（iEDA/src/operation/iPL/source/module/legalizer/method/abacus），需要实现Tetris[2]算法或采用其他合法化方法来进行合法化。</p><p>目前iEDA项目已封装好为工厂模式，同学们需要在iEDA/src/operation/iPL/source/module/legalizer/method目录下创建tetris目录，进行Tetris算法活其他算法的实现。</p><pre><code>● 算法约束：单元在芯片区域内；单元间无重叠。

● 算法目标：全局布局结果改变最小。

● 主要挑战：需要保证全局视野；对算法复杂度要求高。
</code></pre><h3 id="_3-输入输出" tabindex="-1"><a class="header-anchor" href="#_3-输入输出" aria-hidden="true">#</a> <strong>3 输入输出</strong></h3><h4 id="算法输入" tabindex="-1"><a class="header-anchor" href="#算法输入" aria-hidden="true">#</a> <strong>算法输入</strong></h4><p>Def文件，存放了已完成全局布局的结果，包括已经经过粗略放置的电路设计中所有单元的位置坐标等。</p><p>具体数据结构设计如下（详细请见：iEDA/src/operation/iPL/source/module/legalizer/database）：</p><pre><code>● LGCell：合法化单元，是布局过程中的最小单位。它通常表示一个正方形或矩形的区域。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_index</td><td>int32_t</td><td>单元索引号，由外部传入</td></tr><tr><td>_name</td><td>string</td><td>单元名称，是工艺库中的单元名字</td></tr><tr><td>_type</td><td>LGCELL_TYPE</td><td>单元类型，包括：宏单元，标准单元，时序单元（时钟缓冲器或触发器）等。枚举类型：kNone, kMacro, kSequence, kStdcell</td></tr><tr><td>_width</td><td>int32_t</td><td>单元宽度</td></tr><tr><td>_height</td><td>int32_t</td><td>单元高度</td></tr></tbody></table><pre><code>● LGInstance：一个芯片通常由多个功能模块或电路单元组成，如处理器核、存储单元、输入输出接口等。每个功能模块可以被表示为一个实例。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_index</td><td>int32_t</td><td>实例索引，对实例vector进行遍历时给每个实例添加的索引号</td></tr><tr><td>_name</td><td>string</td><td>实例名称</td></tr><tr><td>_master</td><td>LGCell*</td><td>实例所对应的主要版本或原型，在实例化过程中提供参考布局和布线信息</td></tr><tr><td>_shape</td><td>Rectangle&lt;int32_t&gt;</td><td>实例形状</td></tr><tr><td>_orient</td><td>Orient</td><td>描述实例方向或朝向的属性</td></tr><tr><td>_state</td><td>LGINSTANCE_STATE</td><td>实例状态，包括：固定单元，已放置单元，未放置单元等。枚举类型：kNone, kUnPlaced, kPlaced, kFixed</td></tr><tr><td>_belong_region</td><td>LGRegion*</td><td>实例所属的区域</td></tr><tr><td>_weight</td><td>double</td><td>表示实例的权重或重要性值。通过为不同实例分配权重，可以在布局过程中引导优化工具对实例进行优化，以满足设计要求和优化目标</td></tr></tbody></table><pre><code>● LGInterval：区间，因macro单元等不可移动单元的存在，布局区域可能划分为多个不连续的区间。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_index</td><td>int32_t</td><td>区间索引，对区间vector进行遍历时给每个区间添加的索引号</td></tr><tr><td>_name</td><td>string</td><td>row_index + segment_index</td></tr><tr><td>_belong_row</td><td>LGRow*</td><td>所属行</td></tr><tr><td>_min_x</td><td>int32_t</td><td>表示在X轴方向上该区间的最左位置</td></tr><tr><td>_max_x</td><td>int32_t</td><td>表示在X轴方向上该区间的最右位置</td></tr></tbody></table><pre><code>● LGLayout：布局数据结构，将电路设计中的各个组件、连线和其他结构以准确位置放置在芯片上的过程。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_row_num</td><td>int32_t</td><td>布局的行的数量</td></tr><tr><td>_dbu</td><td>int32_t</td><td>dbu是芯片设计中的一个相对单位，database_unit，其具体数值取决于所采用的芯片制造工艺和设计工具的设定，用于表示布局中的距离、尺寸和位置，相当于物理空间中的一个单位。</td></tr><tr><td>_max_x</td><td>int32_t</td><td>布局中的最大 X 轴坐标值</td></tr><tr><td>_max_y</td><td>int32_t</td><td>布局中的最大 Y 轴坐标值</td></tr><tr><td>_row_2d_list</td><td>vector&lt;vector&lt;LGRow*&gt;&gt;</td><td>二维列表，用于表示布局中的各个行</td></tr><tr><td>_interval_2d_list</td><td>vector&lt;vector&lt;LGInterval*&gt;&gt;</td><td>二维列表，用于表示布局中的各个空间间距</td></tr><tr><td>_region_list</td><td>vector&lt;LGRegion*&gt;</td><td>区域列表</td></tr><tr><td>_cell_list</td><td>vector&lt;LGCell*&gt;</td><td>单元列表</td></tr><tr><td>_region_map</td><td>map&lt;string, LGRegion*&gt;</td><td>区域映射</td></tr><tr><td>_cell_map</td><td>map&lt;string, LGCell*&gt;</td><td>单元映射</td></tr></tbody></table><pre><code>● LGRegion：将芯片划分成不同的区域，并为每个区域指定布局约束，以更好地管理和优化布局过程中相关实例的布置和布线
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_index</td><td>int32_t</td><td>区域索引，对区域vector进行遍历时给每个区域添加的索引号</td></tr><tr><td>_name</td><td>string</td><td>区域名称</td></tr><tr><td>_type</td><td>LGREGION_TYPE</td><td>区域类型，枚举类型，包括：kNone, kFence, kGuide。Fence（围栏）是一种用于限制组件或连线在布局中的位置和范围的边界线。Guide（指导线）是一条提供布局方向和位置参考的线。</td></tr><tr><td>_shape_list</td><td>vector&lt;Rectangle&lt;int32_t&gt;&gt;</td><td>区域的几何形状列表</td></tr><tr><td>_inst_list</td><td>vector&lt;LGInstance*&gt;</td><td>实例列表</td></tr></tbody></table><pre><code>● LGSite：芯片的物理结构划分为一个网格，该网格由一系列水平和垂直方向上的单元格组成。每个单元格称为一个 site，代表了可以放置一个组件、连线或其他功能元素的特定位置。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_name</td><td>string</td><td>单元格名称</td></tr><tr><td>_width</td><td>int32_t</td><td>单元格宽度</td></tr><tr><td>_height</td><td>int32_t</td><td>单元格高度</td></tr></tbody></table><pre><code>● LGRow：芯片的布局中的一种横向排列方式
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_index</td><td>int32_t</td><td>行索引，对行vector进行遍历时给每个行添加的索引号</td></tr><tr><td>_name</td><td>string</td><td>行名称</td></tr><tr><td>_site</td><td>LGSite*</td><td>单元格对象</td></tr><tr><td>_site_num</td><td>int32_t</td><td>单元格数量</td></tr><tr><td>_coordinate</td><td>Point&lt;int32_t&gt;</td><td>坐标</td></tr><tr><td>_orient</td><td>Orient</td><td>方位</td></tr></tbody></table><pre><code>● AbacusCluster：合法化聚类，当不存在overlap的时候，每个单元的最优位置就是当前位置，而当存在overlap的时候，要为每个重叠的单元分配最优位置。我们把存在重叠的这些单元的集合称为Cluster，可以对每个&quot;Cluster&quot;进行独立的布局和布线，以满足该集合内实例之间的约束和优化目标。
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_name</td><td>string</td><td>聚类名称</td></tr><tr><td>_inst_list</td><td>vector&lt;LGInstance*&gt;</td><td>实例列表</td></tr><tr><td>_belong_segment</td><td>LGInterval*</td><td>聚类所属的芯片布局区间</td></tr><tr><td>_min_x</td><td>int32_t</td><td>表示聚类的左边界或起始位置</td></tr><tr><td>_weight_e</td><td>double</td><td>边缘权重，用于衡量聚类与其周围环境之间的相互作用强度</td></tr><tr><td>_weight_q</td><td>double</td><td>质量权重，用于评估聚类的质量或优先级</td></tr><tr><td>_total_width</td><td>int32_t</td><td>聚类在芯片布局中所占据的总的水平宽度。</td></tr><tr><td>_front_cluster</td><td>LGCluster*</td><td>指向该聚类的前一个聚类</td></tr><tr><td>_back_cluster</td><td>LGCluster*</td><td>指向该聚类的后一个聚类</td></tr></tbody></table><pre><code>● LGDatabase：合法化数据库定义
</code></pre><table><thead><tr><th>数据名</th><th>数据类型</th><th>数据含义</th></tr></thead><tbody><tr><td>_placer_db</td><td>PlacerDB*</td><td>布局相关自定义数据库，见PlacerDB.hh</td></tr><tr><td>_shift_x</td><td>int32_t</td><td>横坐标偏移量</td></tr><tr><td>_shift_y</td><td>int32_t</td><td>纵坐标偏移量</td></tr><tr><td>_lg_layout</td><td>LGLayout*</td><td>合法化布局对象</td></tr><tr><td>_lgInstance_list</td><td>vector&lt;LGInstance*&gt;</td><td>实例列表</td></tr><tr><td>_lgInstance_map</td><td>map&lt;LGInstance*, Instance*&gt;</td><td>合法化实例与实例映射</td></tr><tr><td>_instance_map</td><td>map&lt;Instance*, LGInstance*&gt;</td><td>实例与合法化实例映射</td></tr><tr><td>Legalizer</td><td>类成员</td><td>合法化类对象，见Legalizer.hh</td></tr></tbody></table><h4 id="算法输出" tabindex="-1"><a class="header-anchor" href="#算法输出" aria-hidden="true">#</a> <strong>算法输出</strong></h4><p>Def文件，verilog文件，合法化后的结果，包括合法的单元的坐标等。</p><h3 id="_4-评估指标" tabindex="-1"><a class="header-anchor" href="#_4-评估指标" aria-hidden="true">#</a> <strong>4 评估指标</strong></h3><p>所有单元的竖直移动距离以及未来的水平移动距离之和最小。算法设计关键在于如何减小未来的水平移动距离。评估要求如下：</p><pre><code>● 程序在合理运行时间和内存，正常运行结束，输出Def文件，所有标准单元布局合法。

● 运行时间上限：程序运行时间超出10分钟，认为程序死循环，实现失败。

● 运行内存上限：运行内存超过 10G，实现失败。

● 对于源代码，将对如下方面进行考察：

○ 代码风格是否优美，组织架构是否清晰，可读性是否良好

○ 有无良好的模块化设计

○ 命名风格和编程规范是否良好

● 输出实验报告行文要求条理清楚，详略得当，清楚易读，内容应该包括以下几个方面：

○ 算法原理，测试结果

○ 时间 / 空间复杂度分析

○ 代码设计上其他亮点（如果有），比如架构设计，模块复用，一些最佳实践等
</code></pre><h3 id="_5-参考实现" tabindex="-1"><a class="header-anchor" href="#_5-参考实现" aria-hidden="true">#</a> <strong>5 参考实现</strong></h3><h4 id="算法1-abacus算法-ieda已实现该算法" tabindex="-1"><a class="header-anchor" href="#算法1-abacus算法-ieda已实现该算法" aria-hidden="true">#</a> <strong>算法1：Abacus算法（iEDA已实现该算法）</strong></h4><p>目前iEDA项目的src/operation/iPL/source/module/legalizer/method/abacus目录中实现的布局合法化算法为Abacus算法。</p><p><strong>1、Abacus算法主要步骤</strong>如下（动态规划算法，会移动已经合法化的单元）：</p><pre><code>●**单元分散到行**：根据单元的横坐标对各个单元进行排序。每次处理一个单元，该单元首先移动到最近的行；

●**行内合法化**：计算该单元在本行的代价，以及移动到该行的上方和下方的代价，其中约束是对每一行中所有单元进行放置，使它们的总移动最小并且不重叠。代价计算是对一行中的所有单元簇以及簇的最佳位置，依靠簇的最优位置得到簇中的每一单元的最优坐标以及簇的代价；一行中所有簇的代价为该行的总代价；
</code></pre>`,39),w=t("img",{src:s,style:{zoom:"90%"}},null,-1),k=t("pre",null,[t("code",null,`●**单元放置**：将该单元放置到代价最小的行，同时更新簇，以及该行中的所有单元的坐标根据该单元移动过来后的最优簇的坐标进行更新。
`)],-1),W=t("img",{src:c,style:{zoom:"80%"}},null,-1),S=t("img",{src:_,style:{zoom:"60%"}},null,-1),M=t("p",null,[t("strong",null,"2、优缺点分析"),r("：")],-1),H=t("pre",null,[t("code",null,`● 优点：质量相比Tetris有较大提升。

● 缺点：质量不够稳定，依赖遍历的顺序，当存在较大的宽度差的时候，结果显著变差，速度变慢。
`)],-1),Y=t("p",null,[t("strong",null,"3、通过iEDA运行Abacus布局合法化的方法"),r("：")],-1),R=t("p",null,"（1）以gcd设计为例，采用sky130工艺运行布图规划（iFP）、扇出优化（iNO_fix_fanout）和布局（iPL）的点工具",-1),N=t("pre",null,[t("code",null,`● sky130工艺库位置：iEDA/scripts/foundry/sky130

● 运行脚本主入口：iEDA/scripts/design/sky130_gcd/run_iEDA.py

● gcd设计的网表文件：iEDA/scripts/design/sky130_gcd/result/verilog/gcd.v

● sdc约束文件：iEDA/scripts/foundry/sky130/sdc/gcd.sdc

● 运行指令：

○ 进入到iEDA工程：cd [iEDA工程父目录]/iEDA

○ 更新代码为最新代码：git pull

○ 编译构建工程：bash[build.sh](https://build.sh)

○ 复制可执行文件到样例目录：cp bin/iEDA scripts/design/sky130_gcd/

○ 进入到样例目录：cd scripts/design/sky130_gcd

○ 修改文件并注释掉23行到文件末尾的内容：vim[run_iEDA.py](https://run_iEDA.py)

○ 运行脚本：python[run_iEDA.py](https://run_iEDA.py)

○ 运行结果解析：在进行详细布局之前，会对布局合法化的结果进行检查，如果合法化失败了，则会打印"Design Instances before detail placement are not legal"，且无法执行详细布局。
`)],-1),V=t("img",{src:h,style:{zoom:"100%"}},null,-1),Z=t("img",{src:u,style:{zoom:"100%"}},null,-1),B=t("img",{src:g,style:{zoom:"50%"}},null,-1),F=t("img",{src:p,style:{zoom:"50%"}},null,-1),J=t("img",{src:m,style:{zoom:"60%"}},null,-1),O=t("img",{src:b,style:{zoom:"70%"}},null,-1),q=t("h4",{id:"算法2-tetris算法-ieda未实现该算法",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#算法2-tetris算法-ieda未实现该算法","aria-hidden":"true"},"#"),r(),t("strong",null,"算法2：Tetris算法（iEDA未实现该算法）")],-1),X=t("pre",null,[t("code",null,`Tetris 算法的思想源自经典的俄罗斯方块游戏，它的目标是对各个单元找到一个适合的位置，将待放置的逻辑单元放入芯片的物理空间中。
`)],-1),K=t("p",null,[t("strong",null,"1、Tetris算法主要步骤"),r("如下（贪心算法，不会移动已经合法化的单元）：")],-1),U=t("pre",null,[t("code",null,`●**候选空间选取**：首先对所有单元按照横坐标顺序进行排列，按顺序在每一行选取最左端的一个空白区域作为候选空间。

●**单元放置**：对于每个单元，在所有候选空间中挑出最近的一个，并将该单元放入。在放置逻辑单元后，更新已占用的格子信息，标记相应的格子为已占用状态。逐个放置剩余的单元，直到所有单元都被放置。
`)],-1),j=t("img",{src:f,style:{zoom:"70%"}},null,-1),Q=t("img",{src:L,style:{zoom:"70%"}},null,-1),$=t("p",null,[t("strong",null,"2、优缺点分析"),r("：")],-1),tt=t("pre",null,[t("code",null,`● 优点：是一种启发式算法，速度很快。

● 缺点：质量不稳定，局部获得良好的结果，不保证能够找到全局最优解，但是整体结果较差。
`)],-1),dt=t("p",null,[t("strong",null,"3、运行结果"),r("：")],-1),et=t("pre",null,[t("code",null,`还是以设计gcd在工艺为skywater 130nm下的执行为例：
`)],-1),nt=t("img",{src:y,style:{zoom:"100%"}},null,-1),rt=o("<p>表1 方法关键参数指标对比结果样例</p><table><thead><tr><th>对比项</th><th>Abacus方法</th><th>Tetris方法</th></tr></thead><tbody><tr><td>全局布局HPWL</td><td>10127910</td><td>10127910</td></tr><tr><td>布局合法化HPWL</td><td>10426323</td><td>11276288</td></tr><tr><td>详细布局HPWL</td><td>9901517</td><td>10214554</td></tr><tr><td>合法化单元移动量</td><td>795829</td><td>2183285</td></tr><tr><td>Total Time Elapsed （s）</td><td>0.005505</td><td>0.000937</td></tr><tr><td>Average Congestion of Edges（评估布局拥塞程度的一个指标，通过计算所有边缘（网格间隙中的垂直和水平线段）上的导线密度来评估布局的拥塞程度）</td><td>0.821588</td><td>0.821588</td></tr><tr><td>Total Overflow（模拟布线查看总溢出量情况）</td><td>49</td><td>49</td></tr><tr><td>Maximal Overflow （模拟布线查看局部溢出量情况）</td><td>18</td><td>18</td></tr><tr><td>Peak BinDensity（峰值密度，≤1则无重叠）</td><td>1</td><td>1</td></tr><tr><td>Total HPWL</td><td>9901517</td><td>10214554</td></tr><tr><td>Total STWL</td><td>10637190</td><td>10950590</td></tr><tr><td>Max STWL</td><td>431085</td><td>435825</td></tr></tbody></table>",2),ot=t("img",{src:A,style:{zoom:"60%"}},null,-1),at=t("img",{src:E,style:{zoom:"90%"}},null,-1),lt=t("img",{src:P,style:{zoom:"100%"}},null,-1),it=o(`<p><strong>4、算法变体</strong>：</p><pre><code>● 行密度拓展：大于某个密度的行不选取；

● 行选取的拓展：距离开始行比较近的地方；

● 局部拓展：将整个布局区域分为k份，在局部内做合法化
</code></pre><h4 id="算法3-其他算法" tabindex="-1"><a class="header-anchor" href="#算法3-其他算法" aria-hidden="true">#</a> <strong>算法3：其他算法</strong></h4><p>请调研其他参考文献或者自己设计。</p><p>参考文献：</p><p>[1] P. Spindler, U. Schlichtmann, and F. M. Johannes. Abacus: fast legalization of standard cell Circuits with minimal movement. In Proceedings of ACM International Symposium on Physical Design, pp. 47–53, 2008. <strong>【Abacus】</strong></p><p>[2] Method and system for high speed detailed placement of cells within an integrated circuit design 发明人：Dwight Hill 申请号：US09273809, 公开日期：2002.04.09. <strong>【Tetris】</strong></p><p>[3] E. M. Gertz and S. J. Wright. Object-oriented software for quadratic programming. ACM Transactions on Mathematical Software, 29(1), pp. 58–81, 2003.</p><p>[4] G.Wu and C.Chu. Detailed placement algorithm for VLSI design with double-row height standard cells. IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems, 35(9):1569–1573, September 2016.</p><p>[5] W.-K. Chow, C.-W. Pui, and E.F.Y. Young. Legalization algorithm for multiplerow height standard cell design. In Proceedings of ACM/IEEE Design Automation Conference, 2016.</p><p>[6] C.-H. Wang, Y.-Y. Wu, J. Chen, Y.-W. Chang, S.-Y. Kuo, W. Zhu, and G. Fan. An e_ective legalization algorithm for mixed-cell-height standard cells. In Proceedings of IEEE/ACM Asia and South Paci_c Design Automation Conference, 2017.</p><p>[7] J. Chen, Z. Zhu, W. Zhu, and Y.-W. Chang. Toward optimal legalization for mixed-cell-height circuit designs. In Proceedings of ACM/IEEE Design Automation Conference, June 2017.</p><p>[8] Y. Lin, B. Yu, X. Xu, J.-R. Gao, N. Viswanathan, W.-H. Liu, Z. Li, C. J. Alpert, and D. Z. Pan. MrDP: multiple-row detailed placement of heterogeneous-sized cells for advanced nodes. In Proceedings of IEEE/ACM International Conference on Computer-Aided Design, pages 7:1–7:8, 2016.</p><p>[9] J. Chen, Z. Zhu, W. Zhu, and Y.-W. Chang. Toward optimal legalization for mixed-cell-height circuit designs. In Proceedings of ACM/IEEE Design Automation Conference, 2017.</p>`,14),st={href:"http://H.Li",target:"_blank",rel:"noopener noreferrer"},ct=o('<h3 id="_6-评测排名" tabindex="-1"><a class="header-anchor" href="#_6-评测排名" aria-hidden="true">#</a> <strong>6 评测排名</strong></h3><table><thead><tr><th>排名</th><th>姓名</th><th>院校/单位</th><th>评估指标结果</th><th>是否开源</th><th>开源地址</th></tr></thead><tbody><tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>',2);function _t(ht,ut){const e=a("center"),l=a("ExternalLinkIcon");return D(),x("div",null,[I,z,d(e,null,{default:n(()=>[T]),_:1}),d(e,null,{default:n(()=>[r("图1 全局布局、合法化、详细布局概述")]),_:1}),v,d(e,null,{default:n(()=>[w]),_:1}),d(e,null,{default:n(()=>[r("图2 单元分散到行及行内合法化示意图")]),_:1}),k,d(e,null,{default:n(()=>[W]),_:1}),d(e,null,{default:n(()=>[r("图3全局布局结果，Tetris算法和Abacus算法的合法化单元移动情况")]),_:1}),d(e,null,{default:n(()=>[S]),_:1}),d(e,null,{default:n(()=>[r("图4 算法主要流程伪代码")]),_:1}),M,H,Y,R,N,d(e,null,{default:n(()=>[V]),_:1}),d(e,null,{default:n(()=>[r("图5 以设计gcd在工艺为skywater 130nm下的执行为例，运行布局的日志信息截图，可以看到全局布局后的HPWL为10127910，Abacus布局合法化后的总移动量为795829、HPWL为10426323，详细布局后的HPWL为9901517")]),_:1}),d(e,null,{default:n(()=>[Z]),_:1}),d(e,null,{default:n(()=>[r("图6 scripts/design/sky130_gcd/result/pl/report下的线长统计结果文件截图")]),_:1}),d(e,null,{default:n(()=>[B]),_:1}),d(e,null,{default:n(()=>[r("图7 src/operation/iPL/api/PLAPI.cc中runDP方法截图")]),_:1}),d(e,null,{default:n(()=>[F]),_:1}),d(e,null,{default:n(()=>[r("图8 src/operation/iPL/api/PLAPI.cc中checkLegality方法截图，展示对合法化结果检查的四项主要内容，不满足其他任意一项，都视为合法化失败")]),_:1}),d(e,null,{default:n(()=>[J]),_:1}),d(e,null,{default:n(()=>[r("图9 src/operation/iPL/source/module/legalizer/method/abacus/AbacusLegalizer.cc下的Abacus算法主入口")]),_:1}),d(e,null,{default:n(()=>[O]),_:1}),d(e,null,{default:n(()=>[r("图10 src/operation/iPL/source/module/legalizer/AbacusLegalizer.cc的runCompleteMode方法截图，与图4 算法主要流程伪代码相对应")]),_:1}),q,X,K,U,d(e,null,{default:n(()=>[j]),_:1}),d(e,null,{default:n(()=>[r("图11 Tetris合法化算法主要流程")]),_:1}),d(e,null,{default:n(()=>[Q]),_:1}),d(e,null,{default:n(()=>[r("图12 对于给定单元，如何选取行进行单元放置的流程")]),_:1}),$,tt,dt,et,d(e,null,{default:n(()=>[nt]),_:1}),d(e,null,{default:n(()=>[r("图13 Tetris合法化算法下，运行布局的日志信息截图，可以看到全局布局后的HPWL为10127910，Tetris布局合法化后的总移动量为2183285、HPWL为11276288，详细布局后的HPWL为10214554")]),_:1}),rt,d(e,null,{default:n(()=>[ot]),_:1}),d(e,null,{default:n(()=>[r("图14 半周长线长 (HPWL) 和直线型最小斯坦纳树 (RSMT) 线长对比")]),_:1}),d(e,null,{default:n(()=>[at]),_:1}),d(e,null,{default:n(()=>[r("图15 Abacus合法化算法下，布局流程结束后统计信息截图")]),_:1}),d(e,null,{default:n(()=>[lt]),_:1}),d(e,null,{default:n(()=>[r("图16 Tetris合法化算法下，布局流程结束后统计信息截图")]),_:1}),it,t("p",null,[r("[10] "),t("a",st,[r("H.Li"),d(l)]),r(",W.-K.Chow, G.Chen, E. F. Y. Young, and B. Yu. Routability-driven and fence-aware legalization for mixed-cell-height circuits. In Proceedings of ACM/IEEE Design Automation Conference, 2018.")]),ct])}const bt=C(G,[["render",_t],["__file","a1.html.vue"]]);export{bt as default};
