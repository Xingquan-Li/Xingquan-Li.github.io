const l=JSON.parse('{"key":"v-3a15d2a3","path":"/train/eda/chip-circuit/Part_2-chip_files/2_3_LEF.html","title":"2.3 LEF文件","lang":"zh-CN","frontmatter":{"title":"2.3 LEF文件","order":3},"headers":[{"level":2,"title":"1 工艺LEF","slug":"_1-工艺lef","link":"#_1-工艺lef","children":[{"level":3,"title":"(1) 层的三种类型：","slug":"_1-层的三种类型","link":"#_1-层的三种类型","children":[]},{"level":3,"title":"(2) PITCH & WIDTH & SPACING","slug":"_2-pitch-width-spacing","link":"#_2-pitch-width-spacing","children":[]},{"level":3,"title":"（3）互连线通孔via","slug":"_3-互连线通孔via","link":"#_3-互连线通孔via","children":[]},{"level":3,"title":"（4）通孔阵列","slug":"_4-通孔阵列","link":"#_4-通孔阵列","children":[]},{"level":3,"title":"（5）相同连线距离","slug":"_5-相同连线距离","link":"#_5-相同连线距离","children":[]}]},{"level":2,"title":"2 单元LEF","slug":"_2-单元lef","link":"#_2-单元lef","children":[{"level":3,"title":"（1）SITE语句","slug":"_1-site语句","link":"#_1-site语句","children":[]},{"level":3,"title":"（2）MACRO语句","slug":"_2-macro语句","link":"#_2-macro语句","children":[]}]},{"level":2,"title":"5 引用","slug":"_5-引用","link":"#_5-引用","children":[]}],"git":{"createdTime":1721213548000,"updatedTime":1721213548000,"contributors":[{"name":"Xingquan-Li","email":"fzulxq@gmail.com","commits":1}]},"readingTime":{"minutes":7.71,"words":2313},"filePathRelative":"train/eda/chip-circuit/Part_2-chip_files/2_3_LEF.md","localizedDate":"2024年7月17日","excerpt":"<p>在本文中，我们将讨论在ASIC设计中使用的LEF文件。LEF是库交换格式 [Library Exchange Format] 的缩写。LEF文件采用ASCII格式编写，因此这个文件是可读的，它是由foundry提供的。</p>\\n<p>LEF是自动布局布线所必须的库文件，随着工艺尺寸的逐步缩小，芯片制造过程中不断出现许多新的物理效应，设计规则也越来越复杂，LEF文件也在不断更新。目前，描述库的LEF文件主要有两部分：</p>\\n<ul>\\n<li>工艺LEF [Technology LEF]：主要包含工艺信息、设计规则信息、工控信息</li>\\n<li>单元LEF [Cell LEF]:包含单元库中各单元的信息的几何信息</li>\\n</ul>","copyright":{"author":"iEDA","license":"GPL-3.0"}}');export{l as data};