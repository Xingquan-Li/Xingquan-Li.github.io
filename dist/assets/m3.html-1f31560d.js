const e=JSON.parse('{"key":"v-caf7d6fc","path":"/train/practice/models/m3.html","title":"M3-3D电容提取","lang":"zh-CN","frontmatter":{"title":"M3-3D电容提取","order":3},"headers":[{"level":3,"title":"1 问题背景","slug":"_1-问题背景","link":"#_1-问题背景","children":[]},{"level":3,"title":"2 问题描述","slug":"_2-问题描述","link":"#_2-问题描述","children":[]},{"level":3,"title":"3 输入输出","slug":"_3-输入输出","link":"#_3-输入输出","children":[]},{"level":3,"title":"4 评估指标","slug":"_4-评估指标","link":"#_4-评估指标","children":[]},{"level":3,"title":"5 参考模型","slug":"_5-参考模型","link":"#_5-参考模型","children":[]}],"git":{"createdTime":1719138368000,"updatedTime":1720089070000,"contributors":[{"name":"Xingquan-Li","email":"fzulxq@gmail.com","commits":4},{"name":"simintao","email":"simintao@126.com","commits":1}]},"readingTime":{"minutes":4.58,"words":1374},"filePathRelative":"train/practice/models/m3.md","localizedDate":"2024年6月23日","excerpt":"<h3> <strong>1 问题背景</strong></h3>\\n<p>电容提取是指芯片设计过程中，利用EDA工具对金属导体和电介质组成的静电平衡系统进行电学分析，求解该系统构成的电容矩阵的过程。寄生电容在延时预估、功耗计算、串扰分析等步骤中至关重要。随着工艺进步，互连线变得更窄更细，通孔增加，单位区域的布线密度显著增加，互连线之间的电容效应显著增加，精确又快速的大规模电容提取技术变得不可或缺。</p>\\n<p>大规模电容提取，又称模式匹配(Pattern Matching)。其常见的步骤分为两个：</p>\\n<ol>\\n<li>\\n<p>构建模式库（Pattern Library）：根据集成电路工艺参数，列举出各种可能出现的互连结构，再对这些成千上万的中等大小结构（称为Pattern）进行二维或三维的精确电容提取。将计算出的这些结构的电容数据收集，并进行经验公式拟合，或构造查找表。</p>\\n</li>\\n<li>\\n<p>版图寄生参数提取：将互连线的建模结果与Pattern中的参数对应，调用经验公式或使用查找表插值查询，得到对应的电容值。</p>\\n</li>\\n</ol>","copyright":{"author":"iEDA","license":"GPL-3.0"}}');export{e as data};