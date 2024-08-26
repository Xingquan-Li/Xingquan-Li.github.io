import{_ as o,a}from"./course1_2-be3df8e7.js";import{_ as u,a as c,b as _,c as p,d as m}from"./course1_7-1c37bae4.js";import{_ as h}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as g,c as v,d as t,e as s,a as i,w as e,f as r}from"./app-1ed3f6c2.js";const b={},f=r(`<h2 id="数据流处理与分析" tabindex="-1"><a class="header-anchor" href="#数据流处理与分析" aria-hidden="true">#</a> <strong>数据流处理与分析</strong></h2><h3 id="_1-问题背景" tabindex="-1"><a class="header-anchor" href="#_1-问题背景" aria-hidden="true">#</a> <strong>1 问题背景</strong></h3><p>合理的逻辑交互设计可以提高系统的可靠性和稳定性，并且能够更好地满足用户的需求。因此，我们需要关注各个模块之间的信息流动和交互方式，保证系统的正常运行和用户的良好体验。对于iEDA项目而言，为了实现不同点工具之间的交互，我们需要关注平台的数据流变化、平台提供的服务、iEDA的各点工具的API接口以及逻辑交互等等。</p><h3 id="_2-问题描述" tabindex="-1"><a class="header-anchor" href="#_2-问题描述" aria-hidden="true">#</a> <strong>2 问题描述</strong></h3><p>1、<strong>实现要求</strong>：遵循iEDA平台的模块划分，完成以下功能：用iEDA读取gcd设计文件，根据EDA后端设计流程，依次运行iEDA点工具流程，参考现有点工具的报告（report目录下的输出文件，如cts_db.rpt、drc.rpt、drv_db.rpt、filler_db.rpt、fixfanout_db.rpt、fp_db.rpt、hold_db.rpt、lg_db.rpt、pl_db.rpt rt_db.rpt等）输出结果，需要实现对各流程的相关参数（如CORE Usage，IO pin Number，Instance Number，Net Number等等参数）的变化进行汇总，同学们需要设计相应的Json数据结构，来展示各流程的参数变化，Json示例如下，其中示例仅供参考，同学们可以自行设计。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;Instance Number&quot;: {     #各点工具都输出的参数
        &quot;iDB(database)-floorplan&quot;: 932,
        &quot;iNO-fix_fanout&quot;: 932,
        &quot;iPL-filler&quot;: 2048,
        &quot;iPL-legalization&quot;: 942,
        &quot;iPL-placement&quot;: 932,
        &quot;iCTS-cts&quot;: 943,
        &quot;iTO-fix_drv&quot;: 942,
        &quot;iTO-fix_hold&quot;: 942,
        &quot;iRT-routing&quot;: 942,
    },
    &quot;Core Usage&quot;: {
        &quot;iDB(database)-floorplan&quot;: 0.392942,
        &quot;iNO-fix_fanout&quot;: 0.392942,
        &quot;iPL-filler&quot;: 0.972277,
        &quot;iPL-legalization&quot;: 0.396726,
        &quot;iPL-placement&quot;: 0.392942,
        &quot;iCTS-cts&quot;: 0.396963,
        &quot;iTO-fix_drv&quot;: 0.396726,
        &quot;iTO-fix_hold&quot;: 0.396726,
        &quot;iRT-routing&quot;: 0.396726,
    },
    &quot;Cut Different Layer Spacing&quot;: 0, # 在iDRC工具生成的drc.rpt中独有配置参数设置
    &quot;Metal Parallel Run Length Spacing&quot;: 580
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报告生成目录示例：iEDA/scripts/design/sky130_gcd/result/report</p>`,7),D={href:"https://gitee.com/oscc-project/iEDA",target:"_blank",rel:"noopener noreferrer"},E=t("img",{src:o,style:{zoom:"100%"}},null,-1),q=t("p",null,"iEDA作为基础底座，包含下面的主要的内容模块：文件系统，数据库等等",-1),A=t("img",{src:a,style:{zoom:"100%"}},null,-1),y=r(`<p><strong>2、通过iEDA运行脚本的方法：</strong></p><p>（1）以gcd设计为例，采用sky130工艺依次运行布图规划（iFP）、扇出优化（iNO_fix_fanout）和布局（iPL）、CTS（ICTS）等点工具。</p><pre><code>● sky130工艺库位置：iEDA/scripts/foundry/sky130

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
</code></pre><p><strong>3、项目文件目录概述</strong>：</p><ul><li>iEDA主目录概述：</li></ul><table><thead><tr><th>iEDA子目录名称</th><th>内容概况</th></tr></thead><tbody><tr><td>cmake</td><td>包含构建和管理Cmake项目的配置信息</td></tr><tr><td>docs</td><td>包含项目的相关学习资料和项目向导</td></tr><tr><td>scripts</td><td>需要读取的数据和工艺文件，以及脚本文件和输出结果</td></tr><tr><td>src</td><td>iEDA项目点工具和平台相关源代码</td></tr></tbody></table><ul><li>iEDA/src目录概述：</li></ul><table><thead><tr><th>iEDA/src子目录名称</th><th>内容概况</th></tr></thead><tbody><tr><td>analysis</td><td>对外提供的算法分析拓展接口</td></tr><tr><td>apps</td><td>结合相关业务，设置的一些常见应用</td></tr><tr><td>database</td><td>将数据解析以后使用不同的类进行存放</td></tr><tr><td>evaluation</td><td>对不同点工具流程的算法进行评估的模块</td></tr><tr><td>interface</td><td>对外提供的可以使用的交互接口代码，包括gui，python，tcl，shell等</td></tr><tr><td>operation</td><td>点工具功能模块的实现，包括：iCTS，iDRS，iECO，iFP，iLR，iLO，iMP，iNO，iPDN，iPL，iPW，iRT，iSTA，iTM，iTO等（见图3-2）</td></tr><tr><td>platform</td><td>结合了具体业务需求，结合使用点工具封装的接口，实现一些应用于具体业务的中间数据的读取、处理、分析、存储、应用等等</td></tr><tr><td>solver</td><td>提供指定算法解决方案，包含聚类布线布局等</td></tr><tr><td>third_party</td><td>使用到的第三方依赖库</td></tr><tr><td>utility</td><td>实用程序的开发，可简化开发过程</td></tr></tbody></table>`,8),x=t("img",{src:u,style:{zoom:"100%"}},null,-1),k=t("h3",{id:"_3-输入输出",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_3-输入输出","aria-hidden":"true"},"#"),s(),t("strong",null,"3 输入输出")],-1),N=t("h4",{id:"算法输入",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#算法输入","aria-hidden":"true"},"#"),s(),t("strong",null,"算法输入")],-1),T=t("pre",null,[t("code",null,`以cts流程为例，首先可以通过【iEDA运行主脚本】读取【设计文件】，运行floorplan、fix_fanout、place以及cts的流程，每个流程会生成对应的.def文件和log、report等文件，查阅report目录下的[designName]_hold.skew和[designName]_setup.skew文件，

主要文件如下：

● 设计文件：iEDA/scripts/design/sky130_gcd/result/verilog/gcd.v

● cts配置文件：iEDA/scripts/design/sky130_gcd/iEDA_config/cts_default_config.json

● iEDA运行主脚本：iEDA/scripts/design/sky130_gcd/run_iEDA.py
`)],-1),P=t("img",{src:c,style:{zoom:"100%"}},null,-1),L=t("h4",{id:"算法输出",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#算法输出","aria-hidden":"true"},"#"),s(),t("strong",null,"算法输出")],-1),C=t("p",null,"算法输出主要为两部分：参考各流程获得的Summary报告，设计对应的Json文件输出。输出示例见问题描述，同学们可以自行设计Json中的数据结构。其中，现有工程中实现的Summary报告样例截图如下。",-1),O=t("p",null,"现有的Summary报告实现如下图5、6、7所示（仅供参考）：",-1),S=t("img",{src:_,style:{zoom:"100%"}},null,-1),z=t("img",{src:p,style:{zoom:"100%"}},null,-1),I=t("img",{src:m,style:{zoom:"100%"}},null,-1);function R(B,w){const l=d("ExternalLinkIcon"),n=d("center");return g(),v("div",null,[f,t("p",null,[s("iEDA工程链接如下："),t("a",D,[s("https://gitee.com/oscc-project/iEDA"),i(l)])]),i(n,null,{default:e(()=>[E]),_:1}),i(n,null,{default:e(()=>[s("图1 iEDA手册截图，上面列了report中各字段的含义")]),_:1}),q,i(n,null,{default:e(()=>[A]),_:1}),i(n,null,{default:e(()=>[s("图2 iEDA项目基础设施")]),_:1}),y,i(n,null,{default:e(()=>[x]),_:1}),i(n,null,{default:e(()=>[s("iEDA点工具（红色部分为开发迭代中，未上线）")]),_:1}),k,N,T,i(n,null,{default:e(()=>[P]),_:1}),i(n,null,{default:e(()=>[s("图4 iEDA运行主脚本，可以通过运行的主脚本进入到对应的点工具主脚本，查看运行不同点工具的配置和子脚本信息算法输出")]),_:1}),L,C,O,i(n,null,{default:e(()=>[S]),_:1}),i(n,null,{default:e(()=>[s("图5 cts_db.rpt文件截图，文件起始部分介绍了跑流程的时间，运行的点工具阶段、运行时间和占用内存，运行的设计等信息；其次介绍了一些Area和Number的统计信息；然后介绍不同Instance的分布情况和数量等信息。")]),_:1}),i(n,null,{default:e(()=>[z]),_:1}),i(n,null,{default:e(()=>[s("图6 cts_db.rpt文件截图（续1），统计了不同金属层的线网数量和长度等信息。")]),_:1}),i(n,null,{default:e(()=>[I]),_:1}),i(n,null,{default:e(()=>[s("图7 cts_db.rpt文件截图（续2），介绍了引脚分布情况。")]),_:1})])}const F=h(b,[["render",R],["__file","s1.html.vue"]]);export{F as default};
