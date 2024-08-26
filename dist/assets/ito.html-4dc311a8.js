import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,f as t}from"./app-1ed3f6c2.js";const o={},a=t(`<h1 id="ito-function-documentation" tabindex="-1"><a class="header-anchor" href="#ito-function-documentation" aria-hidden="true">#</a> iTO Function Documentation</h1><blockquote><h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2></blockquote><p>The full name of TO is Timing Optimization. In this step, the EDA tool performs timing analysis on the chip according to the timing constraint file. The purpose is to repair the timing violations of the chip as much as possible by methods such as cell sizing and buffer insertion.</p><p>The main checks for timing violations include:</p><ol><li>Timing design rule violation (DRV) check;</li><li>Setup time violation check;</li><li>Hold time violation check.</li></ol><p>Supported functions:</p><ol><li>Timing design rule violation (DRV) optimization;</li><li>Setup time violation optimization;</li><li>Hold time violation optimization.</li></ol><p>iTO provides 4 Tcl commands:</p><ol><li><code>run_to</code>: Users can arbitrarily specify the optimization steps needed in the config file;</li><li><code>run_to_drv</code>: Perform DRV optimization;</li><li><code>run_to_hold</code>: Perform Hold optimization;</li><li><code>run_to_setup</code>: Perform Setup optimization.</li></ol><blockquote><h2 id="ito-usage-example" tabindex="-1"><a class="header-anchor" href="#ito-usage-example" aria-hidden="true">#</a> iTO Usage Example</h2></blockquote><p>Part of the Config description</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;setup_slack_margin&quot;: 0.0, // When the setup slack is less than this value, it is considered a violation and is also the target of slack optimization
&quot;hold_slack_margin&quot;: 0.4,  // When the hold slack is less than this value, it is considered a violation and is also the target of slack optimization
&quot;max_buffer_percent&quot;: 0.2,  // The maximum proportion of the area occupied by buffer insertion to the chip area
&quot;max_utilization&quot;: 0.8,  // The maximum proportion of the area after buffer insertion + the area of other cells to the chip area

&quot;DRV_insert_buffers&quot;: [
    &quot;&quot;  // Buffers used for optimizing DRV
],
&quot;setup_insert_buffers&quot;: [
    &quot;&quot;  // Buffers used for optimizing setup
],
&quot;hold_insert_buffers&quot;: [
    &quot;&quot;  // Buffers used for optimizing hold
],
&quot;number_passes_allowed_decreasing_slack&quot;: 5,  // When iteratively optimizing setup, the maximum consecutive number of iterations allowed for WNS to continuously deteriorate
&quot;rebuffer_max_fanout&quot;: 20,  // For setup, when the fanout of a net exceeds this value, buffer insertion optimization will not be performed on it
&quot;split_load_min_fanout&quot;: 8  // For setup, when the fanout of a net is greater than this value, the fanout is reduced by inserting buffers

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>iTO can perform a certain optimization step independently or arbitrarily specify the steps to be optimized.<br> To perform which step, set the corresponding step in the iTO Config file to True</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;optimize_drv&quot;: false,
&quot;optimize_hold&quot;: false,
&quot;optimize_setup&quot;: false,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The following takes performing DRV optimization as an example:</p><ol><li>Set the Config file in the Tcl file</li></ol><p><code>run_to_drv -config./iEDA_config/to_default_config_drv.json</code></p><ol start="2"><li>Use iEDA to run the tcl file</li></ol><p><code>./iEDA -script./script/iTO_script/run_iTO_drv.tcl</code></p><h3 id="report-output" tabindex="-1"><a class="header-anchor" href="#report-output" aria-hidden="true">#</a> Report Output</h3><p>The report output path of the optimization result can be set in the Config file:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;report_file&quot;: &quot;path&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Example of DRV optimization report:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Found 0 slew violations.
Found 0 capacitance violations.
Found 0 fanout violations.
Found 0 long wires.
Before ViolationFix | slew_vio: 0 cap_vio: 0 fanout_vio: 0 length_vio: 0    \\\\ Violation situation before optimization
The 1th check
After ViolationFix | slew_vio: 0 cap_vio: 0 fanout_vio: 0 length_vio: 0 \\\\ Violation situation after optimization
Inserted 0 buffers in 0 nets.
Resized 0 instances.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Example of Hold optimization report:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Hold violation situation before optimization.
---------------------------------------------------------------------------
Clock Group                                    Hold TNS            Hold WNS
---------------------------------------------------------------------------
core_clock                                            0                   0
---------------------------------------------------------------------------

Worst Hold Path Launch : dpath/a_reg/_145_:CLK
Worst Hold Path Capture: dpath/a_reg/_145_:CLK


Finish hold optimization!
Total inserted 0 hold buffers and 0 load buffers.

// Hold violation situation after optimization.
---------------------------------------------------------------------------
Clock Group                                    Hold TNS            Hold WNS
---------------------------------------------------------------------------
core_clock                                            0                   0
---------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Example of Setup optimization report:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-0.304023 -0.204023    // WNS changes during setup optimization
Inserted 10 buffers.
Resized 10 instances.
Unable to repair all setup violations.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),s=[a];function l(d,r){return e(),n("div",null,s)}const v=i(o,[["render",l],["__file","ito.html.vue"]]);export{v as default};
