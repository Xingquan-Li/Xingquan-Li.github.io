import{_ as o}from"./d3_dataset-117cc26f.js";import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as d,d as t,e as a,a as s,w as m,f as n}from"./app-1ed3f6c2.js";const p={},h=t("h1",{id:"pc-cap-3d-dataset",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#pc-cap-3d-dataset","aria-hidden":"true"},"#"),a(" PC-Cap 3D Dataset")],-1),u={href:"https://gitee.com/oscc-project/pct-cap",target:"_blank",rel:"noopener noreferrer"},g=t("p",null,[a("The dataset generation is briefly shown in "),t("a",{href:"#fig_d3_dataset"},"Fig. 1"),a(".")],-1),_=t("a",{id:"fig_d3_dataset"},[t("img",{src:o,width:"800"})],-1),v=t("br",null,null,-1),x=t("h2",{id:"download",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#download","aria-hidden":"true"},"#"),a(" Download")],-1),b={href:"https://www.jianguoyun.com/p/De81uBYQvsDYDBi7gsoFIAA",target:"_blank",rel:"noopener noreferrer"},f=n(`<h2 id="dataset-description" tabindex="-1"><a class="header-anchor" href="#dataset-description" aria-hidden="true">#</a> Dataset Description</h2><h3 id="directory-descriptions" tabindex="-1"><a class="header-anchor" href="#directory-descriptions" aria-hidden="true">#</a> Directory Descriptions</h3><p>The complete directory structure is as follows:</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>.
├── dataset
│   ├── pc
│   ├── pc_annotation_coupling_test_clean.csv
│   ├── pc_annotation_coupling_test.csv
│   ├── pc_annotation_coupling_train_clean.csv
│   ├── pc_annotation_coupling_train.csv
│   ├── pc_annotation.csv
│   ├── pc_annotation_total_test_clean.csv
│   ├── pc_annotation_total_test.csv
│   ├── pc_annotation_total_train_clean.csv
│   └── pc_annotation_total_train.csv
├── imgs
│   └── d3_dataset.png
├── LICENSE
└── README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The directory <strong>./dataset/pc</strong> contains all information of the point cloud.</p><h3 id="file-descriptions" tabindex="-1"><a class="header-anchor" href="#file-descriptions" aria-hidden="true">#</a> File descriptions</h3>`,6),w=n("<li><p><strong>pc_annotation.csv</strong> - records some information from the original <strong>3D Capacitance Sample</strong> of the point cloud</p><table><thead><tr><th>column name</th><th>description</th></tr></thead><tbody><tr><td>point_cloud_path</td><td>point cloud file path</td></tr><tr><td>conductor_num</td><td>the number of conductors that the original sample contains</td></tr><tr><td>point_num</td><td>the size of point cloud</td></tr><tr><td>electrode1_point_num</td><td>points generated based on the master conductor</td></tr><tr><td>electrode2_point_num</td><td>points generated based on the target environment conductor</td></tr><tr><td>cap_type</td><td>total or coupling capacitance</td></tr><tr><td>cap</td><td>reference capacitance value, the label</td></tr><tr><td>v1_x</td><td>the absolute coordinate-low-x of the original sample in the layout</td></tr><tr><td>v1_y</td><td>the absolute coordinate-low-y of the original sample in the layout</td></tr><tr><td>v1_z</td><td>the absolute coordinate-low-z of the original sample in the layout</td></tr><tr><td>dx</td><td>the size of the original sample along direction-x</td></tr><tr><td>dy</td><td>the size of the original sample along direction-y</td></tr><tr><td>dz</td><td>the size of the original sample along direction-z</td></tr><tr><td>timestamp</td><td>timestamp of the point cloud file generation</td></tr><tr><td>solver_time</td><td>the calculation time that the solver takes to get the capacitance result</td></tr></tbody></table></li>",1),y=t("strong",null,"pc_annotation_xxx.csv",-1),k=t("br",null,null,-1),z={href:"https://gitee.com/oscc-project/pct-cap",target:"_blank",rel:"noopener noreferrer"},M=n("<table><thead><tr><th>sub-dataset used in our research</th><th>descriptions</th></tr></thead><tbody><tr><td>pc_annotation_coupling_train_clean.csv</td><td>the training set for coupling capacitance task</td></tr><tr><td>pc_annotation_coupling_test_clean.csv</td><td>the testing set for coupling capacitance task</td></tr><tr><td>pc_annotation_total_train_clean.csv</td><td>the training set for total capacitance task</td></tr><tr><td>pc_annotation_total_test_clean.csv</td><td>the testing set for total capacitance task</td></tr></tbody></table>",1),C=t("p",null,[t("strong",null,"w500l2_1_C_0_0.txt"),a(" - example of a point cloud file")],-1),D=t("li",null,[t("p",null,"file name format"),t("ul",null,[t("li",null,[a("w500l2:"),t("br"),a(" The 3D sampling window is height-adaptive and can accommodate 2 layers above and 2 layers below."),t("br"),a(" 5 metal layers in maximum: Routing-Via-Routing-Via-Routing or Via-Routing-Via-Routing-Via."),t("br"),a(" The 3D sampling window project to XOY-plane with an area sized "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mn",null,"500"),t("mi",null,"n"),t("mi",null,"m"),t("mo",null,"×"),t("mn",null,"500"),t("mi",null,"n"),t("mi",null,"m")]),t("annotation",{encoding:"application/x-tex"},"500 nm \\times 500nm")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"500"),t("span",{class:"mord mathnormal"},"nm"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),t("span",{class:"mbin"},"×"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6444em"}}),t("span",{class:"mord"},"500"),t("span",{class:"mord mathnormal"},"nm")])])]),a(".")]),t("li",null,[a("1:"),t("br"),a(" the sample id when generation")]),t("li",null,[a("C_0_0:"),t("br"),a(" the position in the sample capacitance matrix")])])],-1),L={href:"https://www.cloudcompare.org/",target:"_blank",rel:"noopener noreferrer"},T=t("table",null,[t("thead",null,[t("tr",null,[t("th",null,"symbol"),t("th",null,"descriptions")])]),t("tbody",null,[t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"x")]),t("annotation",{encoding:"application/x-tex"},"x")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.4306em"}}),t("span",{class:"mord mathnormal"},"x")])])])]),t("td",null,"coordinate-x")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"y")]),t("annotation",{encoding:"application/x-tex"},"y")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.625em","vertical-align":"-0.1944em"}}),t("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y")])])])]),t("td",null,"coordinate-y")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"z")]),t("annotation",{encoding:"application/x-tex"},"z")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.4306em"}}),t("span",{class:"mord mathnormal",style:{"margin-right":"0.04398em"}},"z")])])])]),t("td",null,"coordinate-z")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msub",null,[t("mi",null,"n"),t("mi",null,"x")])]),t("annotation",{encoding:"application/x-tex"},"n_x")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.5806em","vertical-align":"-0.15em"}}),t("span",{class:"mord"},[t("span",{class:"mord mathnormal"},"n"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.1514em"}},[t("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mathnormal mtight"},"x")])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.15em"}},[t("span")])])])])])])])])]),t("td",null,"component-x of normal vector")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msub",null,[t("mi",null,"n"),t("mi",null,"y")])]),t("annotation",{encoding:"application/x-tex"},"n_y")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7167em","vertical-align":"-0.2861em"}}),t("span",{class:"mord"},[t("span",{class:"mord mathnormal"},"n"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.1514em"}},[t("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y")])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.2861em"}},[t("span")])])])])])])])])]),t("td",null,"component-y of normal vector")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msub",null,[t("mi",null,"n"),t("mi",null,"z")])]),t("annotation",{encoding:"application/x-tex"},"n_z")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.5806em","vertical-align":"-0.15em"}}),t("span",{class:"mord"},[t("span",{class:"mord mathnormal"},"n"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.1514em"}},[t("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.04398em"}},"z")])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.15em"}},[t("span")])])])])])])])])]),t("td",null,"component-z of normal vector")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msub",null,[t("mi",null,"ε"),t("mi",null,"r")])]),t("annotation",{encoding:"application/x-tex"},"\\varepsilon_r")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.5806em","vertical-align":"-0.15em"}}),t("span",{class:"mord"},[t("span",{class:"mord mathnormal"},"ε"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.1514em"}},[t("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.02778em"}},"r")])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.15em"}},[t("span")])])])])])])])])]),t("td",null,"the dielectric channel, relative permittivity")]),t("tr",null,[t("td",null,"class"),t("td",null,"a point belongs to a class that relates to its generation")]),t("tr",null,[t("td",null,[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",{mathvariant:"normal"},"Φ")]),t("annotation",{encoding:"application/x-tex"},"\\Phi")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6833em"}}),t("span",{class:"mord"},"Φ")])])])]),t("td",null,"the selecting channel")])])],-1),V=n("<li><p>line 1 : 432.715, 171.114, 0.5879, 1, 0, 0, 4.06, 1, 0<br> A point with coordinates <strong>(432.715, 171.114, 0.5879)</strong> in layout.<br> This point is generated on the surface of a region whose local normal vector is <strong>(1, 0, 0)</strong>.<br> This local region is full of dielectric with a relative permittivity of <strong>4.06</strong>, except the region inner the conductor.<br> The id of this region equals <strong>1</strong>.<br> The selecting channel value of this point is <strong>0</strong>, such as non-target environment conductors. The details of the setting are related to the <strong>Gauss Law-based Point Cloud feature</strong>.</p></li>",1),P=n('<h2 id="updates" tabindex="-1"><a class="header-anchor" href="#updates" aria-hidden="true">#</a> Updates</h2><h2 id="citation" tabindex="-1"><a class="header-anchor" href="#citation" aria-hidden="true">#</a> Citation</h2><h2 id="contact" tabindex="-1"><a class="header-anchor" href="#contact" aria-hidden="true">#</a> Contact</h2><p>Please feel free to send any questions or comments to <a href="mailto:ieda.oscc@gmail.com">ieda.oscc@gmail.com</a>.</p>',4);function E(B,R){const e=l("ExternalLinkIcon"),i=l("center");return c(),d("div",null,[h,t("p",null,[a("This project serves as the submodule of "),t("a",u,[a("PC-Cap"),s(e)]),a(".")]),g,t("div",null,[s(i,null,{default:m(()=>[_,v,a(" Fig. 1: Brief Introduction to Data Generation ")]),_:1})]),x,t("p",null,[a("You can download "),t("a",b,[a("3D capacitance dataset"),s(e)]),a(".")]),f,t("ul",null,[w,t("li",null,[t("p",null,[y,a(" - part of records from pc_annotation.csv"),k,a(" The details of dataset partition and data cleaning are available at "),t("a",z,[a("PC-Cap repository"),s(e)])]),M]),t("li",null,[C,t("ul",null,[D,t("li",null,[t("p",null,[a("content format: point cloud file format that "),t("a",L,[a("CloudCompare"),s(e)]),a(" can read directly.")]),T]),V])])]),P])}const A=r(p,[["render",E],["__file","3D_Cap_PC.html.vue"]]);export{A as default};