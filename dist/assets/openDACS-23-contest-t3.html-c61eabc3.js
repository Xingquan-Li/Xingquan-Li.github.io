import{_ as h,a as d,b as s,c as l,d as c,e as _,f as u,g as f}from"./fig8-b094936c.js";import{_ as g}from"./fig7-1-ecab5abe.js";import{_ as A}from"./fig7-2-bfb0fe99.js";import{_ as m}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as b,c as C,a as t,w as o,d as e,e as a,f as n}from"./app-1ed3f6c2.js";const x={},D=n('<h2 id="赛题3-fpga工艺映射算法及优化介绍" tabindex="-1"><a class="header-anchor" href="#赛题3-fpga工艺映射算法及优化介绍" aria-hidden="true">#</a> 赛题3：FPGA工艺映射算法及优化介绍</h2><p><strong>主办单位：</strong> 工业和信息化部、江苏省人民政府、湖南省人民政府</p><p><strong>承办单位：</strong> 开放原子开源基金会、央视网、江苏省工业和信息化厅、无锡市人民政府、江苏软件产业人才发展基金会、苏州工业园区、无锡高新区等</p><p><strong>联合承办单位：</strong> openDACS工作委员会、中国科学院计算技术研究所、中国科学院微电子研究所、北京大学、复旦大学、清华大学、北京开源芯片研究院、深圳微纳研究院、深圳华秋电子有限公司</p><p><strong>本赛项聚焦：</strong> 集成电路产业的数字设计、模拟设计、芯片制造、芯片封装、处理器设计自动化、生成式芯片设计等领域，对促进产业高质量发展具有重要意义。</p><p><strong>本赛项包含：</strong> 五个方向共计10道赛题。</p><p><strong>出题单位：</strong> 鹏城实验室，openDACS工委会SIG2</p><p><strong>赛题Chair：</strong> 罗国杰</p><h2 id="_1-赛题背景" tabindex="-1"><a class="header-anchor" href="#_1-赛题背景" aria-hidden="true">#</a> 1. 赛题背景</h2><p>随着芯片设计日益复杂和先进技术的不断发展，如图1所示，FPGA（现场可编程门阵列）在芯片原型验证和嵌入式系统中的应用越来越广泛。FPGA工艺映射是将逻辑电路映射到可编程逻辑查找表（LUT）的必不可少的过程，对FPGA设计的性能、功耗和面积（PPA）至关重要，图2是FPGA的基本结构。</p><figure><img src="'+u+'" alt="" tabindex="0"><figcaption></figcaption></figure>',11),G=e("figure",null,[e("img",{src:h,alt:"",tabindex:"0"}),e("figcaption")],-1),P=n('<p>然而，随着设计规模的增加和性能要求的提高，传统的工艺映射算法面临着挑战。这些算法在应对庞大的搜索空间、时序约束的优化、资源利用率的提升以及功耗的降低方面可能存在不足。为了提高FPGA设计的性能和资源利用率，对FPGA工艺映射算法进行优化是必要的。</p><h2 id="_2-赛题描述" tabindex="-1"><a class="header-anchor" href="#_2-赛题描述" aria-hidden="true">#</a> 2. 赛题描述</h2><h3 id="_2-1-描述" tabindex="-1"><a class="header-anchor" href="#_2-1-描述" aria-hidden="true">#</a> 2.1 描述</h3><figure><img src="'+f+'" alt="" tabindex="0"><figcaption></figcaption></figure>',4),S=e("p",null,"如图3所示是一个传统的FPGA工艺映射算法的概要图，其主要流程是对原始电路的每个节点进行CUT组的枚举，然后通过面积、深度等特性对每个节点的CUT组进行排序后，选择每个节点上最优的CUT，从而实现对整个电路面积的覆盖。从传统算法的流程来看，其还有很多可以进一步改进以及优化的地方。",-1),q=e("figure",null,[e("img",{src:d,alt:"",tabindex:"0"}),e("figcaption")],-1),k=e("p",null,"如图4所示，本赛题聚焦于基于智能CUT选择的工艺映射算法设计。该算法将利用智能筛选和优先割技术，以减少不必要的搜索空间并提高工艺映射的效率。通过对逻辑电路的结构和特性进行分析，算法能够智能地选择最优的割集（Cut Set）作为候选映射目标。同时，算法还将优化割集的选择顺序，以进一步减少搜索空间并提高映射效果。",-1),E=e("p",null,"该赛题的目标是设计一个高效的智能筛选优先割的工艺映射算法，能够在大规模和复杂的FPGA设计中提供优秀的PPA性能。算法需要考虑多个因素，如逻辑电路的规模、时序要求、资源限制和功耗约束等。该算法的设计将充分利用智能筛选和优先割技术，结合先进的优化方法，以实现高效的工艺映射和优化。",-1),I=e("h3",{id:"_2-2-赛题case",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-2-赛题case","aria-hidden":"true"},"#"),a(" 2.2 赛题case")],-1),F=e("figure",null,[e("img",{src:s,alt:"",tabindex:"0"}),e("figcaption")],-1),T=e("p",null,"每个案例的输入文件为AIG（And-Inverter Graph）格式的组合逻辑电路。AIG电路中的每个基本门为与门或者非门，如图5所示，与门和非门是逻辑完备组，可以表示其它所有基本门单元。",-1),U=e("blockquote",null,[e("p",null,"一个典型的输入文件如图5所示（本次赛题只针对组合逻辑网表，所以第三项L总是 0）：")],-1),M=e("figure",null,[e("img",{src:l,alt:"",tabindex:"0"}),e("figcaption")],-1),y=e("h3",{id:"_2-3-输出要求",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-3-输出要求","aria-hidden":"true"},"#"),a(" 2.3 输出要求")],-1),B=e("p",null,"输出文件为 LUTs 组成的网表。一个K输入的 LUT本质上是一个K位地址的单输出RAM，可以通过存储真值表的方式实现任意K输入的布尔逻辑。",-1),w=e("blockquote",null,[e("p",null,"一个典型的输出文件如图7所示，其中o0 = i0&i1&i2&i3&i4&i5; o1 = i0 | i2 | i4。")],-1),L=e("figure",null,[e("img",{src:c,alt:"",tabindex:"0"}),e("figcaption")],-1),J=n('<h3 id="_2-4-比赛环境" tabindex="-1"><a class="header-anchor" href="#_2-4-比赛环境" aria-hidden="true">#</a> 2.4 比赛环境</h3><p><strong>（1）运行环境</strong></p><ul><li><p>操作系统：linux系统；</p></li><li><p>硬件环境：64位x86CPU、128GB运行内存、1TB硬盘、NVIDIA-GPU；</p></li><li><p>软件环境：gcc7.5.0、g++7.5.0、glibc2.27、python3.7、cuda-驱动。</p></li></ul><p><strong>（2）参考工具</strong></p>',4),K={href:"https://gitee.com/oscc-project/iMAP%E3%80%82",target:"_blank",rel:"noopener noreferrer"},N=e("figure",null,[e("img",{src:_,alt:"",tabindex:"0"}),e("figcaption")],-1),V=n('<p>如图8所示，iMAP支持“.aig”文件的读写以及FPGA网表的写出。对于参赛队伍只需要关注FPGA工艺映射环节的算法即可。</p><h2 id="_3-评分标准" tabindex="-1"><a class="header-anchor" href="#_3-评分标准" aria-hidden="true">#</a> 3. 评分标准</h2><blockquote><p>（1）必备要求：通过等价性检查。保证输出的FPGA网表和原始输入AIG的逻辑等价，否则该题计0分。</p></blockquote><blockquote><p>（2）加权评分：cost=50%*runtime+30%*delay + 20%*area， cost越低表示结果质量越好，则对应case的得分就越高。</p></blockquote><h2 id="_4-参赛作品要求" tabindex="-1"><a class="header-anchor" href="#_4-参赛作品要求" aria-hidden="true">#</a> 4. 参赛作品要求</h2><h3 id="_4-1-初赛作品" tabindex="-1"><a class="header-anchor" href="#_4-1-初赛作品" aria-hidden="true">#</a> 4.1 初赛作品</h3><p>参赛队伍（成员1~3名）提交该赛题的设计文档及作品源代码。</p><p>（1）设计文档要求是PDF文档，在文档中应写清楚技术实现细节并提供测试案例上的测试结果，包含以下几点：</p><p>• 功能描述</p><p>• 整体设计框架</p><p>• 功能模块细节设计</p><p>• 方案的优势和挑战</p><p>• 测试结果与数据分析</p><p>（2）作品源代码需要包含以下几项：</p><p>• 源代码</p><p>• 编译好的code二进制文件</p><p>• readme（对最终提交算法的基本说明，包括运行方式、输入格式说明等）</p><p>• 依赖的第三方库（如果有的话需要一并提供，防止由于版本不同而带来的结果差异）</p><h3 id="_4-2-决赛作品" tabindex="-1"><a class="header-anchor" href="#_4-2-决赛作品" aria-hidden="true">#</a> 4.2 决赛作品</h3><p>参赛队伍在初赛作品的基础上，进一步完善作品，如提升关键算法的性能，优化代码的实现，增强代码可读性，符合开源代码规范性等，并提交最终源代码及设计文档参加决赛。</p><h3 id="_4-3-作品提交通道" tabindex="-1"><a class="header-anchor" href="#_4-3-作品提交通道" aria-hidden="true">#</a> 4.3 作品提交通道</h3><p>参赛队伍提交作品前，需将队长在大赛官网上的注册邮箱、用户名、姓名、手机号码等信息邮件发送给本赛题工作人员（联系邮箱：Johnhw_2019@qq.com，邮件主题命名为：“队伍名称”建仓申请），工作人员将为该队伍在 AtomGit 上创建一个私有仓库，并将队长添加为该仓库管理员。参赛队伍完成作品后，将作品相关文档及源代码提交至该仓库即可。提交作品命名方式为：赛题名称+队伍名称+作品标题。</p>',22),j={href:"https://atomgit.com/opendacs/competition-t3",target:"_blank",rel:"noopener noreferrer"},v=n('<h2 id="_5-奖励方案" tabindex="-1"><a class="header-anchor" href="#_5-奖励方案" aria-hidden="true">#</a> 5. 奖励方案</h2><p>（1）初赛评选冠军1名，奖励5万奖金；开源EDA新秀奖2名，奖励0.5万元；各颁发证书。</p><p>（2）初赛冠军将进入开源EDA与芯片赛项总决赛，在2024年4月进行总决赛路演，有机会获得“openDACS开源之星”及额外奖金2万元。</p><p>（3）为所有获奖队伍提供北京开源芯片研究院、上海安路信息科技有限公司、鹏城实验室、北京大学等关联单位实习机会。</p><h2 id="_6-参考文献" tabindex="-1"><a class="header-anchor" href="#_6-参考文献" aria-hidden="true">#</a> 6. 参考文献</h2><blockquote><p>[1] S. Chatterjee, A. Mishchenko, R. Brayton, X. Wang and T. Kam, &quot;Reducing structural bias in technology mapping&quot;, IEEE TCAD<br> 2006.</p></blockquote><blockquote><p>[2] D. Chen and J. Cong, &quot;DAOmap: a depth-optimal area optimization mapping algorithm for FPGA designs&quot;, ICCAD 2004.</p></blockquote><blockquote><p>[3] A. Mishchenko; S. Cho; S. Chatterjee; R. Brayton. Combinational and sequential mapping with priority cuts.”, ICCAD 2007.</p></blockquote><h2 id="附1-10个赛题总体介绍" tabindex="-1"><a class="header-anchor" href="#附1-10个赛题总体介绍" aria-hidden="true">#</a> 附1：10个赛题总体介绍</h2><p>本赛项包含五个方向共计10道赛题，分别如下：</p><h3 id="数字芯片eda方向" tabindex="-1"><a class="header-anchor" href="#数字芯片eda方向" aria-hidden="true">#</a> <strong>数字芯片EDA方向：</strong></h3><p>赛题1：功能向量的时序电路故障模拟器</p><p>赛题2：增量式时序优化算法</p><p>赛题3：FPGA工艺映射算法及优化</p><h3 id="模拟芯片eda方向" tabindex="-1"><a class="header-anchor" href="#模拟芯片eda方向" aria-hidden="true">#</a> <strong>模拟芯片EDA方向：</strong></h3><p>赛题4：模拟电路优化算法</p><p>赛题5：运算放大器自动化设计</p><h3 id="芯片制造eda方向" tabindex="-1"><a class="header-anchor" href="#芯片制造eda方向" aria-hidden="true">#</a> <strong>芯片制造EDA方向：</strong></h3><p>赛题6：基于BSIM-CMG模型的器件模型提参</p><h3 id="处理器设计自动化eda方向" tabindex="-1"><a class="header-anchor" href="#处理器设计自动化eda方向" aria-hidden="true">#</a> <strong>处理器设计自动化EDA方向：</strong></h3><p>赛题7：ASIP基于OpenHarmony软总线特性的硬化IP设计</p><p>赛题8：基于开源PDK的硅基板互连设计</p><h3 id="生成式芯片设计方向" tabindex="-1"><a class="header-anchor" href="#生成式芯片设计方向" aria-hidden="true">#</a> <strong>生成式芯片设计方向：</strong></h3><p>赛题9：基于自动芯片生成框架AutoChip（ChipGPT 2.0）的流水线CPU设计</p><p>赛题10：AutoChip（ChipGPT 2.0）芯片创意设计</p><h2 id="附2-赛制-赛程" tabindex="-1"><a class="header-anchor" href="#附2-赛制-赛程" aria-hidden="true">#</a> 附2：赛制/赛程</h2><h3 id="_1-竞赛流程" tabindex="-1"><a class="header-anchor" href="#_1-竞赛流程" aria-hidden="true">#</a> 1. 竞赛流程</h3><ul><li>2023.09 -2023.11 在大赛官网、openDACS公众号、CCF集成电路设计专委公众号发布各个赛题</li><li>2023.09.30 - 2024.2.28 参赛队伍报名参赛，提交作品，并由出题方辅导改进</li><li>2023.10.15 在CCFDAC2023大会开源EDA专题论坛现场进行赛题答疑</li><li>2023.10.15 - 2023.12.30 在指定单位安排讲座（中科院、北大、复旦、清华、武汉理工、深圳技术大学等）；在电子发烧友网站安排1-2次在线讲座</li><li>2024.03.31 初赛评审，评选各个赛题冠军及新秀奖，出题方辅导冠军队伍改进</li><li>2024.04.01 - 2024.04.15 决赛作品提交</li><li>2024.04 决赛评审，十个赛题冠军汇总评选出3名openDACS开源之星奖</li><li>2024.06（暂定） 开放原子开发者大会，公布获奖名单与线下颁奖</li></ul><h3 id="_2-竞赛咨询" tabindex="-1"><a class="header-anchor" href="#_2-竞赛咨询" aria-hidden="true">#</a> 2. 竞赛咨询</h3><p>请参赛队伍加入本赛项微信交流群“openDACS开源EDA与芯片大赛”，微信群二维码：</p>',30),R=e("img",{src:g,alt:"6",style:{zoom:"90%"},title:"openDACS开源EDA与芯片大赛"},null,-1),z=e("blockquote",null,null,-1),O=e("img",{src:A,alt:"6",style:{zoom:"110%"},title:"开源iEDA社区群"},null,-1),W=n('<p>如微信群二维码过期，可直接联系本赛项负责人微信：WinPolestar，申请加入交流群。</p><blockquote><p>参赛队伍在报名及提交作品后，可将报名信息、参赛作品发至<br><a href="mailto:Johnhw_2019@qq.com">Johnhw_2019@qq.com</a>。</p></blockquote><h3 id="_3-参赛队伍须知" tabindex="-1"><a class="header-anchor" href="#_3-参赛队伍须知" aria-hidden="true">#</a> 3. 参赛队伍须知</h3><p>本赛项正式开始比赛的要求为：报名队伍数量至少达到10支，且提交作品数量至少达到5个。若未达到报名队伍或提交作品的数量要求，则本赛项可能被延期或暂停，届时将由本赛项各共建方（中科院计算技术研究所、中国科学院微电子研究所、北京大学、复旦大学、清华大学、北京开源芯片研究院、深圳微纳研究院、深圳华秋电子有限公司）向您发出书面通知。</p><h2 id="附3-作品提交要求" tabindex="-1"><a class="header-anchor" href="#附3-作品提交要求" aria-hidden="true">#</a> 附3：作品提交要求</h2><h3 id="_1-参赛作品内容要求" tabindex="-1"><a class="header-anchor" href="#_1-参赛作品内容要求" aria-hidden="true">#</a> 1. 参赛作品内容要求</h3><p>各赛题具体作品内容要求详见“赛题”栏目中各赛题描述。</p><h3 id="_2-参赛作品规范要求" tabindex="-1"><a class="header-anchor" href="#_2-参赛作品规范要求" aria-hidden="true">#</a> 2. 参赛作品规范要求</h3><p>（1）参赛作品须符合本届大赛赛项要求及主题，作品名称应能体现作品主要特征。</p><p>（2）参赛作品必须为原创作品，不可侵犯任何他人的专利权、著作权、商标权及其他知识产权，且不得违反国家相关法律法规。</p><p>（3）作品必须可分离原开发环境，具备可演示的运行环境，能够在组委会提供的测试账户上编译/运行或自行提供编译/运行环境。</p><p>（4） 作品允许使用他人开源代码，但必须在保持原有版权的基础上，注明出处和其它开源代码的依赖关系。提交作品时,必须在分析设计文档中明确说明作品中其他开源代码的作用及所占比例。</p><p>（5）作品应能正确运行并可达到预期结果。作品应与设计文档描述的功能一致，如未能实现设计文档中描述的所有功能，应注明未实现功能及其所占比例和重要程度。</p><h3 id="_3-参赛作品提交要求" tabindex="-1"><a class="header-anchor" href="#_3-参赛作品提交要求" aria-hidden="true">#</a> 3. 参赛作品提交要求</h3>',14),H={href:"https://atomgit.com/%E3%80%82",target:"_blank",rel:"noopener noreferrer"},X=n('<p>（2）参赛队伍均可在不改变作品名称和主要功能的基础上，持续推进作品迭代升级，对应赛程最后一次提交的作品为参赛作品。</p><p>（3）评审期间，参赛队伍须按照组委会的要求补充提交作品相关材料。</p><p>（4）所有已提交的参赛作品和相关材料原则上不予退还。</p><h2 id="附4-评审规则与评审专家组" tabindex="-1"><a class="header-anchor" href="#附4-评审规则与评审专家组" aria-hidden="true">#</a> 附4：评审规则与评审专家组</h2><h3 id="_1-评审规则" tabindex="-1"><a class="header-anchor" href="#_1-评审规则" aria-hidden="true">#</a> 1. 评审规则</h3><p>（1）各赛题评审细则详见&quot;赛题&quot;栏目中，每道赛题的验收标准。</p><p>（2）完成参赛作品文档说明，文档技术路径可行，并被方向专家评审后通过。</p><p>（3）代码功能完成指标要求，并提交规范的代码和详实的文档，最后经过评审代码合入到对应仓库。</p><p>（4）根据每道赛题中验收标准说明获得对应奖项。</p><h3 id="_2-评审专家组" tabindex="-1"><a class="header-anchor" href="#_2-评审专家组" aria-hidden="true">#</a> 2. 评审专家组</h3><p>李华伟（组长，openDACS工委会主任兼SIG1负责人，中国科学院计算技术研究所研究员，处理器芯片全国重点实验室副主任，负责赛题1）</p><p>何均宏（联合组长，openDACS工委会联合主任兼执行总监，负责本赛题赛事组织运作，参与赛题7-10评选）</p><p>李兴权（鹏城实验室副研究员。负责赛题2）</p><p>罗国杰（openDACS工委会SIG2负责人，北京大学信息科学技术学院长聘副教授、高能效计算与应用中心执行主任。负责赛题3）</p><p>杨 帆（openDACS工委会SIG3负责人，复旦大学微电子学院教授，博士生导师。参与赛题2评选）</p><p>解壁伟（openDACS工委会SIG4负责人，中国科学院计算技术研究所和鹏城实验室助理研究员，参与和负责“一生一芯”和开源EDA等项目。参与赛题2\\3评选）</p><p>叶佐昌（openDACS工委会SIG7负责人，清华大学集成电路学院副研究员，负责赛题4、5）</p><p>李志强（openDACS工委会SIG5负责人，中国科学院微电子研究所研究员，EDA中心负责人，负责赛题6）</p><p>刘永新（深圳市微纳集成电路与系统应用研究院助理院长，负责赛题7）</p><p>王郁杰（之江实验室，研究专家，负责Chiplet等分离制设计方法的计算核设计、互连系统设计、EDA设计等工作，负责赛题8）</p><p>樊嘉祺（华进半导体，封装设计经理，负责2.5D/3D集成封装、晶圆级扇出封装、三维异质集成等封装设计、仿真技术研究。负责赛题8）</p><p>王 颖（openDACS工委会SIG8负责人，中国科学院计算技术研究所研究员，负责赛题9-10）</p><p>黄 宇（华为半导体科学家，深圳海思EDA首席架构师和EDA实验室主任。参与赛题1/4/8评选）</p><p>杨 凡（深圳国微芯科技有限公司研发副总裁，参与赛题2评选）</p><p>刘 勇（深圳华秋电子有限公司旗下电子发烧友平台社区运营负责人，负责线上讲座，参与赛题7-10评选）</p>',25);function $(Q,Y){const i=p("center"),r=p("ExternalLinkIcon");return b(),C("div",null,[D,t(i,null,{default:o(()=>[a("图1. FPGA市场规模图")]),_:1}),G,t(i,null,{default:o(()=>[a("图2. FPGA基本门LUT表示图")]),_:1}),P,t(i,null,{default:o(()=>[a("图3. FPGA工艺映射算法概要图")]),_:1}),S,q,t(i,null,{default:o(()=>[a("图4. 赛题主题流程图")]),_:1}),k,E,I,F,t(i,null,{default:o(()=>[a("图5. 与非门的逻辑完备表示图")]),_:1}),T,U,M,t(i,null,{default:o(()=>[a("图6. AIG文件格式图")]),_:1}),y,B,w,L,t(i,null,{default:o(()=>[a("图7. FPGA网表图")]),_:1}),J,e("blockquote",null,[e("p",null,[a("iMAP："),e("a",K,[a("https://gitee.com/oscc-project/iMAP。"),t(r)])])]),N,t(i,null,{default:o(()=>[a("图8. iMAP软件运行图")]),_:1}),V,e("blockquote",null,[e("p",null,[a("赛题3的AtomGit网址："),e("a",j,[a("https://atomgit.com/opendacs/competition-t3"),t(r)])])]),v,t(i,null,{default:o(()=>[R]),_:1}),t(i,null,{default:o(()=>[a("openDACS开源EDA与芯片大赛")]),_:1}),z,t(i,null,{default:o(()=>[O]),_:1}),t(i,null,{default:o(()=>[a("数字芯片EDA方向赛题1,2,3交流群")]),_:1}),W,e("p",null,[a("（1）参赛队伍提交作品前，需将队长在大赛官网上的注册邮箱、用户名、姓名、手机号码等信息邮件发送给本赛题工作人员（联系邮箱：Johnhw_2019@qq.com，邮件主题命名为：“队伍名称”建仓申请），工作人员将为该队伍在 AtomGit 上创建一个私有仓库，并将队长添加为该仓库管理员。参赛队伍完成作品后，将作品相关文档及源代码提交至该仓库即可。提交作品命名方式为：赛题名称+队伍名称+作品标题。AtomGit网址："),e("a",H,[a("https://atomgit.com/。"),t(r)])]),X])}const oe=m(x,[["render",$],["__file","openDACS-23-contest-t3.html.vue"]]);export{oe as default};