import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as l}from"./app-1ed3f6c2.js";const d={},s=l(`<h1 id="ito-功能文档" tabindex="-1"><a class="header-anchor" href="#ito-功能文档" aria-hidden="true">#</a> iTO 功能文档</h1><blockquote><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2></blockquote><p>TO的全称为Timing Optimization，时序优化。在该步骤，EDA工具会根据时序约束文件，对芯片进行时序分析，目的是通过单元尺寸调整和插入缓冲器等方法尽可能地修复芯片存在的时序违例。</p><p>时序违例检查主要包括：</p><ol><li>时序设计规则违例（DRV）检查；</li><li>建立时间违例（Setup）检查；</li><li>保持时间违例（Hold）检查。</li></ol><p>支持功能：</p><ol><li>时序设计规则违例（DRV）优化；</li><li>建立时间违例（Setup）优化；</li><li>保持时间违例（Hold）优化。</li></ol><p>iTO提供了4个Tcl命令：</p><ol><li><code>run_to</code>：由用户在config文件中任意指定需要优化的步骤；</li><li><code>run_to_drv</code>：执行DRV优化；</li><li><code>run_to_hold</code>：执行Hold优化；</li><li><code>run_to_setup</code>：执行Setup优化。</li></ol><blockquote><h2 id="ito使用示例" tabindex="-1"><a class="header-anchor" href="#ito使用示例" aria-hidden="true">#</a> iTO使用示例</h2></blockquote><p>部分Config说明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;setup_slack_margin&quot;: 0.0, // setup slack小于该值时认为违例，也是slack优化的目标
&quot;hold_slack_margin&quot;: 0.4,  // hold slack小于该值时认为违例，也是slack优化的目标
&quot;max_buffer_percent&quot;: 0.2,  // 缓冲器插入的面积占芯片面积的最大比例
&quot;max_utilization&quot;: 0.8,  // 缓冲器插入后的面积+其他单元的面积，占芯片面积的最大比例

&quot;DRV_insert_buffers&quot;: [
    &quot;&quot;  // 优化DRV使用的缓冲器
],
&quot;setup_insert_buffers&quot;: [
    &quot;&quot;  // 优化setup使用的缓冲器
],
&quot;hold_insert_buffers&quot;: [
    &quot;&quot;  // 优化hold使用的缓冲器
],
&quot;number_passes_allowed_decreasing_slack&quot;: 5,  // 迭代优化setup时，允许WNS不断变差的最大连续迭代次数
&quot;rebuffer_max_fanout&quot;: 20,  // 针对setup，线网的fanout超过该值时不会对其进行缓冲器插入优化
&quot;split_load_min_fanout&quot;: 8  // 针对setup，线网的fanout大于该值时通过插入缓冲器把fanout降低

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>iTO可以独立执行某个优化步骤，也可以任意指定需要优化的步骤。<br> 需要执行哪个步骤，可将iTO的Config文件中对应的步骤设置为True</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;optimize_drv&quot;: false,
&quot;optimize_hold&quot;: false,
&quot;optimize_setup&quot;: false,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面以执行DRV优化为例：</p><p>1.在Tcl文件中设置Config文件</p><p><code>run_to_drv -config ./iEDA_config/to_default_config_drv.json</code></p><p>2.使用iEDA运行tcl文件</p><p><code>./iEDA -script ./script/iTO_script/run_iTO_drv.tcl</code></p><h3 id="报告输出" tabindex="-1"><a class="header-anchor" href="#报告输出" aria-hidden="true">#</a> 报告输出</h3><p>在Config文件中可设置优化结果的报告输出路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;report_file&quot;: &quot;path&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>DRV优化报告示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Found 0 slew violations.
Found 0 capacitance violations.
Found 0 fanout violations.
Found 0 long wires.
Before ViolationFix | slew_vio: 0 cap_vio: 0 fanout_vio: 0 length_vio: 0    \\\\ 优化前违例情况
The 1th check
After ViolationFix | slew_vio: 0 cap_vio: 0 fanout_vio: 0 length_vio: 0 \\\\ 优化后违例情况
Inserted 0 buffers in 0 nets.
Resized 0 instances.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Hold优化报告示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 优化前Hold违例情况。
---------------------------------------------------------------------------
Clock Group                                    Hold TNS            Hold WNS
---------------------------------------------------------------------------
core_clock                                            0                   0
---------------------------------------------------------------------------

Worst Hold Path Launch : dpath/a_reg/_145_:CLK
Worst Hold Path Capture: dpath/a_reg/_145_:CLK


Finish hold optimization!
Total inserted 0 hold buffers and 0 load buffers.

// 优化后Hold违例情况。
---------------------------------------------------------------------------
Clock Group                                    Hold TNS            Hold WNS
---------------------------------------------------------------------------
core_clock                                            0                   0
---------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Setup优化报告示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-0.304023 -0.204023    // setup优化过程中的WNS变化情况
Inserted 10 buffers.
Resized 10 instances.
Unable to repair all setup violations.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),a=[s];function t(o,u){return i(),n("div",null,a)}const v=e(d,[["render",t],["__file","ito.html.vue"]]);export{v as default};
