import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as n,f as a}from"./app-1ed3f6c2.js";const i={},r=a('<h2 id="_1-overview" tabindex="-1"><a class="header-anchor" href="#_1-overview" aria-hidden="true">#</a> 1. Overview</h2><p>Currently, iCTS supports clock tree construction under given constraints. Currently, iCTS takes DME and Slew-Aware as the basic framework and integrates multiple types of constraints for clock tree design. Due to the inability to obtain upstream Slew information in the bottom-up process of DME,<br> The downstream chained propagation will bring a large error. iCTS introduces the timing backward propagation method and performs timing propagation at the wire level during the buffer insertion stage to correct the insertion delay of the wire load unit.<br> iCTS uses a more accurate timing model for the estimation and propagation of timing information and constructs the clock tree with the goal of minimizing the design cost.</p><h3 id="constraints" tabindex="-1"><a class="header-anchor" href="#constraints" aria-hidden="true">#</a> Constraints</h3><p>The constraints that iCTS can support are shown in the following table, where the constraint names correspond to the Config parameter names</p><table><thead><tr><th style="text-align:center;">Constraint Name</th><th style="text-align:center;">Constraint Level</th></tr></thead><tbody><tr><td style="text-align:center;">skew_bound</td><td style="text-align:center;">Hard</td></tr><tr><td style="text-align:center;">max_buf_tran</td><td style="text-align:center;">Hard</td></tr><tr><td style="text-align:center;">max_sink_tran</td><td style="text-align:center;">Hard</td></tr><tr><td style="text-align:center;">max_cap</td><td style="text-align:center;">Soft</td></tr><tr><td style="text-align:center;">max_fanout</td><td style="text-align:center;">Hard</td></tr><tr><td style="text-align:center;">max_length</td><td style="text-align:center;">Soft</td></tr></tbody></table><h3 id="timing-models" tabindex="-1"><a class="header-anchor" href="#timing-models" aria-hidden="true">#</a> Timing Models</h3><p>iCTS currently uses the PERI interconnect model as the slew calculation method for interconnects and the Elmore model as the delay calculation method for interconnects. For the insertion delay of buffers, the lookup table method (Lut) is used, which includes extensions of some methods, as shown in the following table.</p><table><thead><tr><th style="text-align:center;">Model</th><th style="text-align:center;">Scenario</th><th style="text-align:center;">Extension</th></tr></thead><tbody><tr><td style="text-align:center;">PERI</td><td style="text-align:center;">Calculation and propagation of interconnect slew</td><td style="text-align:center;">Formula calculation, timing backward propagation correction</td></tr><tr><td style="text-align:center;">Elmore</td><td style="text-align:center;">Calculation of interconnect delay</td><td style="text-align:center;">Formula calculation</td></tr><tr><td style="text-align:center;">Unit RC</td><td style="text-align:center;">Conversion of the load capacitance and resistance of interconnects based on the unit capacitance and resistance</td><td style="text-align:center;">Formula calculation</td></tr><tr><td style="text-align:center;">Lut</td><td style="text-align:center;">Calculation of buffer insertion delay and unit slew propagation</td><td style="text-align:center;">Bilinear interpolation method, multiple linear fitting model, machine learning model</td></tr></tbody></table><h3 id="goals" tabindex="-1"><a class="header-anchor" href="#goals" aria-hidden="true">#</a> Goals</h3><p>Under the premise of meeting the design constraints as much as possible, for scenarios with multiple buffering schemes, iCTS will adopt the scheme with the minimum design cost for clock tree design. The current measurement methods are as follows:</p><ul><li>Prefer the buffering scheme with a smaller size that meets the timing constraints.</li><li>For the case of continuous buffer insertion to balance the clock skew, in order to simplify the complexity of timing calculation and propagation, consider using the same buffer and perform timing balancing at a uniform wire length interval. At this stage, the buffering scheme that minimizes the increase in cell area is preferred.</li></ul><h2 id="_2-multi-clock-balance" tabindex="-1"><a class="header-anchor" href="#_2-multi-clock-balance" aria-hidden="true">#</a> 2. Multi-Clock Balance</h2><p>iCTS can support multi-clock design. First, a clock tree is constructed for each clock one by one to form the basic clock tree result. The clock skew of the top-level node is analyzed through the timing evaluation of iSTA, and finally, timing balancing is performed according to the design requirements.</p><h2 id="_3-support-extensions" tabindex="-1"><a class="header-anchor" href="#_3-support-extensions" aria-hidden="true">#</a> 3. Support Extensions</h2><h3 id="multiple-buffer-types" tabindex="-1"><a class="header-anchor" href="#multiple-buffer-types" aria-hidden="true">#</a> Multiple Buffer Types</h3><p>iCTS supports clock tree design based on multiple buffer types (currently excluding inverters) and selects buffers using the strategy in <a href="#Goals">Goals</a> during the buffer insertion process. This feature can be set in the <code>buffer_type</code> parameter in Config.</p><h3 id="clustering-to-reduce-scale" tabindex="-1"><a class="header-anchor" href="#clustering-to-reduce-scale" aria-hidden="true">#</a> Clustering to Reduce Scale</h3><p>iCTS supports using the clustering method (K-Means) to reduce the running time of large-scale nets. For nets with more than 3000 registers, iCTS will automatically execute the K-Means algorithm and divide them into 50 clusters for local clock tree construction. After completing the local construction, the top-level clock tree is merged. Both the local construction and the top-level clock tree construction use the same clock tree algorithm.</p><p>During the K-Means clustering process, we set the initial number of iterations. In each iteration, we record the total register load capacitance of each cluster and consider the clustering result with a smaller variance of capacitance between clusters for clock tree construction.</p><h3 id="machine-learning-models" tabindex="-1"><a class="header-anchor" href="#machine-learning-models" aria-hidden="true">#</a> Machine Learning Models</h3><p>iCTS supports the invocation of Python models and methods based on Cython. Currently, the encapsulated Linear, XGBoost, CatBoost models, and basic plotting methods of Matplotlib are available. You can specify the compilation option <code>SYS_PYTHON3_VERSION</code> to specify the system Python version,<br> And by turning on the <code>PY_MODEL</code> option, C++ and Python interaction can be achieved. In this mode, the timing-related Lut process will use machine learning models.</p>',21),o=[r];function s(l,c){return t(),n("div",null,o)}const u=e(i,[["render",s],["__file","icts.html.vue"]]);export{u as default};