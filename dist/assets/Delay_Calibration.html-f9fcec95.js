import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as i,c as n,d as t,e,a as o,f as l}from"./app-1ed3f6c2.js";const c={},s=t("h1",{id:"delay-calibration-dataset",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#delay-calibration-dataset","aria-hidden":"true"},"#"),e(" Delay calibration dataset")],-1),h=t("h2",{id:"download",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#download","aria-hidden":"true"},"#"),e(" Download")],-1),_={href:"https://gitee.com/i-eda/i-bm/tree/master/Delay_Calibration_Dataset/demo",target:"_blank",rel:"noopener noreferrer"},m=l('<h2 id="dataset-description" tabindex="-1"><a class="header-anchor" href="#dataset-description" aria-hidden="true">#</a> Dataset Description</h2><ol><li>使用内部开源静态时序分析工具iSTA生成时序报告；</li><li>使用商业静态时序分析工具Prime Time生成对应的时序报告；</li><li>通过iSTA报告中的时序路径信息，提取每条时序路径中的特征数据，包括影响单元时延和互连线时延的特征；</li><li>确定PT报告中对应路径的时延，该时延值作为标签，认为是Ground truth</li><li>将每条路径从iSTA中提取的特征数据和从PT中提取的对应的标签值保存到.txt文件中</li></ol><h3 id="file-descriptions" tabindex="-1"><a class="header-anchor" href="#file-descriptions" aria-hidden="true">#</a> File descriptions</h3><ul><li>在文档中每一条时序路径的特征和标签，以features开始，到下一条路径的features结束</li><li>每一条时序路径包含从iSTA报告中提取的15个特征和从PT中提取的4个标签</li><li>每一行中的数据是这条时序路径中的每一个pin的一个特征构成，每一行代表一个特征。比如，第一行是这条路径中每一个pin的名称</li><li>下面对每一个特征进行解释：</li></ul><table><thead><tr><th>特征</th><th>描述</th></tr></thead><tbody><tr><td>pin name</td><td>pin名称</td></tr><tr><td>cell name</td><td>instance名称+pin名称</td></tr><tr><td>fanout</td><td>互连线的扇出</td></tr><tr><td>rise_fall</td><td>上升/下降</td></tr><tr><td>is_net</td><td>标记是否为互连线</td></tr><tr><td>capacitance</td><td>负载电容</td></tr><tr><td>slew</td><td>翻转时间</td></tr><tr><td>incr_elmore</td><td>Elmore方法增加时延</td></tr><tr><td>incr_d2m</td><td>D2M方法增加时延</td></tr><tr><td>incr_ecm</td><td>ECM方法增加时延</td></tr><tr><td>incr_d2mc</td><td>MD2M方法增加时延</td></tr><tr><td>at_elmore</td><td>Elmore方法到达时延</td></tr><tr><td>at_d2m</td><td>D2M方法到达时延</td></tr><tr><td>at_ecm</td><td>ECM方法到达时延</td></tr><tr><td>at_d2mc</td><td>MD2M方法到达时延</td></tr><tr><td>cap_pt</td><td>PT报告的负载电容</td></tr><tr><td>slew_pt</td><td>PT报告的翻转时间</td></tr><tr><td>incr_pt</td><td>PT报告的增加时延</td></tr><tr><td>at_pt</td><td>PT报告的到达时延</td></tr></tbody></table><ul><li>上述特征和标签，可以根据需求做特征工程判断使用哪些特征最有效。</li></ul><h2 id="updates" tabindex="-1"><a class="header-anchor" href="#updates" aria-hidden="true">#</a> Updates</h2><h2 id="citation" tabindex="-1"><a class="header-anchor" href="#citation" aria-hidden="true">#</a> Citation</h2><h2 id="contact" tabindex="-1"><a class="header-anchor" href="#contact" aria-hidden="true">#</a> Contact</h2><p>Please feel free to send any questions or comments to <a href="mailto:ieda.oscc@gmail.com">ieda.oscc@gmail.com</a>.</p>',10);function p(f,u){const d=r("ExternalLinkIcon");return i(),n("div",null,[s,h,t("p",null,[t("a",_,[e("时序校准数据集"),o(d)])]),m])}const T=a(c,[["render",p],["__file","Delay_Calibration.html.vue"]]);export{T as default};