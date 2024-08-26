import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as l,c as r,b as e,d as i,e as n,f as t}from"./app-1ed3f6c2.js";const d={},a=i("h1",{id:"ieda-script",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#ieda-script","aria-hidden":"true"},"#"),n(" iEDA-Script")],-1),o=i("h2",{id:"_1-module-division-and-description",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-module-division-and-description","aria-hidden":"true"},"#"),n(" 1 Module Division and Description")],-1),c=i("p",null,"iEDA-Script: a specialized script for iEDA, used for testing, evaluating, and analyzing data. The main tool flow of the iEDA-Script is as follows:",-1),u=t(`<p>Figure 1: iEDA Tool Flow</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scripts
├── design                   #iEDA flows for different designs
│   ├── ispd18               #tbd
│   └── sky130_gcd           #flow of gcd in sky130
│       ├── iEDA             
│       ├── iEDA_config      # iEDA parameters configuration files
│       ├── README.md
│       ├── result           # iEDA result output files
│       ├── run_iEDA_gui.py  # Python3 script for running all iEDA flow with GUI layout
│       ├── run_iEDA.py      # Python3 script for running all iEDA flow
│       ├── run_iEDA.sh      # POSIX shell script for running all iEDA flow
│       └── script           # TCL script files
├── foundry
│   ├── README.md
│   └── sky130               # SkyWater Open Source PDK
│       ├── lef              # lef files
│       ├── lib              # lib files
│       ├── sdc              # sdc files
│       └── spef             # folder for spef files if needed
└── hello.tcl                # Test running iEDA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Module Description</strong></p><p>The script directory contains all the physical backend design scripts and result analysis and evaluation scripts required for the different designs, and the modules are divided into subdirectories based on the flow and functionality. The flow scripts can be called by the top-level automatic running scripts (run_iEDA.py, run_iEDA.sh) or can be run independently.</p>`,4),v=t(`<p>Figure 2: iEDA-Script Project Directory Structure, with run_iEDA.py as the main script</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scripts/design/sky130_gcd/script
├── DB_script                           # Data process flow scripts
│   ├── db_init_lef.tcl                 # initialize lef
│   ├── db_init_lib_drv.tcl             # initialize lib only for flow of drv 
│   ├── db_init_lib_fixfanout.tcl       # initialize lib only for flow of fix fanout
│   ├── db_init_lib_hold.tcl            # initialize lib only for flow of optimize hold
│   ├── db_init_lib_setup.tcl           # initialize lib only for flow of optimize setup
│   ├── db_init_lib.tcl                 # initialize lib for common flow
│   ├── db_init_sdc.tcl                 # initialize sdc 
│   ├── db_init_spef.tcl                # initialize spef
│   ├── db_path_setting.tcl             # set paths for all processing technology files, including TechLEF，LEF, Lib, sdc and spef
│   ├── run_db_checknet.tcl             # check net connectivity based on data built by DEF (.def) and LEF (.lef &amp; .tlef)
│   ├── run_db_report_evl.tcl           # report wire length and congestion based on data built by DEF (.def) and LEF (.lef &amp; .tlef)
│   ├── run_db.tcl                      # test building data by DEF (.def) and LEF (.lef &amp; .tlef)
│   ├── run_def_to_gds_text.tcl         # transform data from DEF (.def) to GDSII (.gdsii)
│   ├── run_def_to_verilog.tcl          # transform data from DEF (.def) to netlist (.v)
│   ├── run_netlist_to_def.tcl          # transform data from netlist (.v) to DEF (.def)
│   └── run_read_verilog.tcl            # test read verilog file (.v)
├── iCTS_script                         # CTS flow scripts
│   ├── run_iCTS_eval.tcl               # report wire legnth for CTS result
│   ├── run_iCTS_STA.tcl                # report CTS STA
│   └── run_iCTS.tcl                    # run CTS
├── iDRC_script                         # DRC(Design Rule Check) flow scipts
│   ├── run_iDRC_gui.tcl                # show GUI for DRC result
│   └── run_iDRC.tcl                    # run DRC
├── iFP_script                          # Floorplan flow scripts
│   ├── module                          # submodule for Floorplan scripts
│   │   ├── create_tracks.tcl           # create tracks for routing layers
│   │   ├── pdn.tcl                     # create pdn networks 
│   │   └── set_clocknet.tcl            # set clock net
│   └── run_iFP.tcl                     # run Floorplan
├── iGUI_script                         # GUI flow scipts
│   └── run_iGUI.tcl                    # run GUI
├── iNO_script                          # NO(Netlist Optimization) flow scipts
│   └── run_iNO_fix_fanout.tcl          # run Fix Fanout
├── iPL_script                          # Placement flow scripts
│   ├── run_iPL_eval.tcl                # report congestion statistics and wire legnth for Placement result
│   ├── run_iPL_filler.tcl              # run standard cell filler
│   ├── run_iPL_gui.tcl                 # run gui flow that shows Global Placement Processing result
│   ├── run_iPL_legalization_eval.tcl   # report congestion statistics and wire legnth for Legalization result
│   ├── run_iPL_legalization.tcl        # run Cell Legalization
│   └── run_iPL.tcl                     # run Placement
├── iRT_script                          # Routing flow scripts
│   ├── run_iRT_DRC.tcl                 # run DRC for Routing result
│   ├── run_iRT_eval.tcl                # report wire legnth for Routing result
│   ├── run_iRT_STA.tcl                 # run STA for Routing result
│   └── run_iRT.tcl                     # run Routing
├── iSTA_script                         # STA flow scripts
│   ├── init_iSTA.tcl                   # STA initialization
│   ├── report_iSTA.tcl                 # report STA result
│   └── run_iSTA.tcl                    # run STA
└── iTO_script                          # TO(Timing Optimization) flow script
    ├── run_iTO_drv_STA.tcl             # run STA for DRV result
    ├── run_iTO_drv.tcl                 # run DRV
    ├── run_iTO_hold_STA.tcl            # run STA for Fix Hold Violation result
    ├── run_iTO_hold.tcl                # run Fix Hold Violation
    ├── run_iTO_setup_STA.tcl           # run STA for Fix Setup Violation result
    └── run_iTO_setup.tcl               # run Fix Setup Violation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-flow-running-process" tabindex="-1"><a class="header-anchor" href="#_2-flow-running-process" aria-hidden="true">#</a> 2 Flow Running Process</h2><p>After setting up iEDA and the PDK, you can choose to run the sky130_gcd flow scripts either automatically using the top-level running scripts (run_iEDA.py, run_iEDA.sh) or run them independently. All the results are saved in the script/design/sky130_gcd/result directory.</p><p>The general process for running a single point tool is as follows:</p><p><strong>Step 1 Path Setting</strong></p><p>First of all, the process environment path must be configured. To facilitate the search and configuration of path parameters, the paths of TechLEF, LEF, Lib, sdc, and spef are uniformly configured in the file <code>./script/DB_script/db_path_setting.tcl</code> for the script. The details are shown in the following table:</p><table><thead><tr><th>Function</th><th>Configuration Command</th><th>Reference TCL Example</th></tr></thead><tbody><tr><td>Set TechLef Path</td><td>set TECH_LEF_PATH xxx</td><td>set TECH_LEF_PATH &quot;./lef/sky130_fd_sc_hs.tlef&quot;</td></tr><tr><td>Set Lef Path</td><td>set LEF_PATH xxx</td><td>set LEF_PATH./lef/sky130_ef_io__com_bus_slice_10um.lef</td></tr><tr><td>Set Lib Path</td><td>set LIB_PATH xxx</td><td>set LIB_PATH./lib/sky130_dummy_io.lib</td></tr><tr><td>Set Fix Fanout Lib Path</td><td>set LIB_PATH_FIXFANOUT xxx</td><td>set LIB_PATH_FIXFANOUT./lib/sky130_dummy_io.lib</td></tr><tr><td>Set Fix DRV Violation Lib Path</td><td>set LIB_PATH_DRV xxx</td><td>set LIB_PATH_DRV./lib/sky130_dummy_io.lib</td></tr><tr><td>Set Fix Hold Violation Lib Path</td><td>set LIB_PATH_HOLD xxx</td><td>set LIB_PATH_HOLD./lib/sky130_dummy_io.lib</td></tr><tr><td>Set Fix Setup Violation Lib Path</td><td>set LIB_PATH_SETUP xxx</td><td>set LIB_PATH_SETUP./lib/sky130_dummy_io.lib</td></tr><tr><td>Set SDC Path</td><td>set SDC_PATH xxx</td><td>set SDC_PATH &quot;./sdc/gcd.sdc&quot;</td></tr><tr><td>Set SPEF Path</td><td>set SPEF_PATH xxx</td><td>set SPEF_PATH &quot;./spef/xxx.spef&quot;</td></tr></tbody></table><p><strong>Step 2 Configuration Point Tool Config</strong><br> The parameter settings Config of all point tools are in the path <code>./iEDA_config</code>. You can check the <strong>Input and Output List</strong> in the later chapters to modify the corresponding point tool Config file.</p><p><strong>Step 3 Read.def Design File</strong><br> Taking CTS as an example, execute the <code>def_init</code> command to read the result after layout.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#===========================================================
##   read def
#===========================================================
def_init -path./result/iPL_result.def
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After steps 1 - 3, the data of Tech LEF, LEF, and DEF files will be loaded, which is a prerequisite for the startup of the point tool.</p><p><strong>Step 4 Start Point Tool</strong><br> Taking CTS as an example, execute the <code>run_cts</code> command to start the CTS process.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#===========================================================
##   run CTS
#===========================================================
run_cts -config./iEDA_config/cts_default_config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Step 5 Save Point Tool Running Results</strong><br> Taking CTS as an example, after the point tool process is completed, the running results of the point tool are saved in the path <code>./result/</code>.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#===========================================================
##   Save def
#===========================================================
def_save -path./result/iCTS_result.def

#===========================================================
##   Save netlist 
#===========================================================
netlist_save -path./result/iCTS_result.v -exclude_cell_names {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Step 6 Output Report</strong><br> Taking CTS as an example, after the data is stored, the overall report related to the design result will be output, and the report path is stored in <code>./result/report/</code>.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#===========================================================
##   report 
#===========================================================
report_db -path &quot;./result/report/cts_db.rpt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Step 7 Exit</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#===========================================================
##   Exit 
#===========================================================
flow_exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above steps are the general process of executing a single point tool. Among them, steps 1 - 3 initialize the configuration and database and are necessary steps. After step 4, various point tools or module commands can be flexibly connected as needed.</p>`,21);function p(_,m){return l(),r("div",null,[a,o,c,e(' <img src="@source/en/tools/img/iEDA_script/iEDA_script2.png"> '),u,e(' <img src="@source/en/tools/img/iEDA_script/iEDA_script1.png"> '),v])}const g=s(d,[["render",p],["__file","iEDA_script.html.vue"]]);export{g as default};
