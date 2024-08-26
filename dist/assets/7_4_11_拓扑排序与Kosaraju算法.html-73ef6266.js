import{_ as i,a as n,b as e,c as d,d as s,e as l,f as v,g as r}from"./graph_34-ac84b830.js";import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as a,f as o}from"./app-1ed3f6c2.js";const u={},m=o('<h3 id="_1-强连通的定义" tabindex="-1"><a class="header-anchor" href="#_1-强连通的定义" aria-hidden="true">#</a> 1.强连通的定义</h3><p>回想一下我们在无向图的时候，当时我们就利用深度优先搜索解决了一幅无向图的连通问题。根据深搜能够到达所有连通的顶点，我们很容易解决这个问题。但是，问题变成有向图，就没有那么简单了！下面分别是无向图和有向图的两个例子：</p><div style="text-align:center;"><img src="'+i+'" alt="ASIC Flow" width="200"><h4>图1 强连通</h4></div><p>无向图的各连通分量</p><blockquote><p>定义。如果两个顶点<code>v</code>和<code>w</code>是互相可达的，则称它们为强连通的。也就是说，既存在一条从<code>v</code>到<code>w</code>的有向路径，也存在一条从<code>w</code>到<code>v</code>的有向路径。如果一幅有向图中的任意两个顶点都是强<br> 连通的，则称这幅有向图也是强连通的。</p></blockquote><p>以下是另一些强连通的例子：</p><div style="text-align:center;"><img src="'+n+'" alt="ASIC Flow" width="200"><h4>图2 强连通例子</h4></div><p>强连通的有向图</p><h3 id="_2-强连通分量" tabindex="-1"><a class="header-anchor" href="#_2-强连通分量" aria-hidden="true">#</a> 2.强连通分量</h3><p>在有向图中，强连通性其实是顶点之间的一种等价关系，因为它有以下性质</p><ul><li>自反性：任意顶点 v 和自己都是强连通的</li><li>对称性：如果 v 和 w 是强连通的，那么 w 和 v 也是强连通的</li><li>传递性：如果 v 和 w 是强连通的且 w 和 x 也是强连通的，那<br> 么 v 和 x 也是强连通的</li></ul><p>因为等价，所以和无向图一样，我们可以将一幅图分为若干个强连通分量，每一个强连通分量中的所有顶点都是强连通的。这样的话，<strong>任意给定两个顶点判断它们之间的强连通关系，我们就直接判断它们是否在同一个强连通分量中就可以了！</strong></p><div style="text-align:center;"><img src="'+e+'" alt="ASIC Flow" width="200"><h4>图3 强连通分量</h4></div><p>有向图的强连通分量</p><p>接下来，我们需要设计一种算法来实现我们的目标————<strong>将一幅图分为若干个强连通分量</strong>。我们先来总结一下我们的目标：</p><div style="text-align:center;"><img src="'+d+'" alt="ASIC Flow" width="200"><h4>图4 强连通分量例子</h4></div><hr><h3 id="_3-kosaraju算法" tabindex="-1"><a class="header-anchor" href="#_3-kosaraju算法" aria-hidden="true">#</a> 3.Kosaraju算法</h3><p>Kosaraju算法就是一种经典的解决强连通性问题的算法，它实现很简单，但是不好理解<strong>why</strong>，希望你打起精神，我希望我能够把它讲明白（也只是希望，我会尽量，如果不清楚的话，强烈建议结合<strong>算法4</strong>一起食用）</p><hr><p>回忆一下我们之前在无向图的部分如何解决连通性问题的，<strong>一次dfs能够恰好遍历一个连通分量</strong>，所以我们可以通过<code>dfs</code>来计数，获取每个顶点的<code>id[]</code>;所以，我们在解决有向图的强连通性问题时，也希望能够利用<strong>一次dfs能够恰好遍历一个连通分量</strong>的性质；不过，在有向图中，它失效了，来看一下图：</p><div style="text-align:center;"><img src="'+s+'" alt="ASIC Flow" width="200"><h4>图5 连通分量</h4></div><p>在图中，<code>dfs遍历</code>会存在两种情况：</p><p>第一种情况：如果<code>dfs</code>的起点时<code>顶点A</code>，那么一次<code>dfs遍历</code>会遍历整个区域一和区域二，但是区域一与区域二并不是强连通的，这就是有向图给我们带来的困难！</p><p>第二种情况：<strong>如果<code>dfs</code>的起点是<code>顶点D</code>，则第一次<code>dfs</code>会遍历区域二，第二次<code>dfs</code>会遍历区域一</strong>，这不就是我们想要的吗？</p><p>所以，第二个情况给了我们一个努力的方向！也就是<strong>如果我们人为地，将所有的可能的情况都变成第二种情况，事情不就解决了！</strong></p><p>有了方向，那么接下来，我们来看一幅真实的有向图案例，如图所示，这是一幅有向图，它的各个强连通分量在图中用灰色标记；我们的操作是将每个强连通分量看成一个<strong>顶点（比较大而已）</strong>，那么会产生什么后果呢？<strong>我们的原始的有向图就会变成一个有向无环图！</strong></p><div style="text-align:center;"><img src="'+l+'" alt="ASIC Flow" width="200"><h4>图6 有向无环图</h4></div><p>ps:想一想为什么不能存在环呢？因为前提我们把所有的强连通分量看成了一个个顶点，如果<code>顶点A</code>和<code>顶点B</code>之间存在环，那<code>A</code>和<code>B</code>就会构成一个更大的强连通分量！它们本应属于一个顶点！</p><p>在得到一幅有向无环图（DAG）之后，事情没有那么复杂了。现在，我们再回想一下我们的目的————<strong>在图一中，我们希望区域二先进行<code>dfs</code>，也就是箭头指向的区域先进行<code>dfs</code></strong>。在将一个个区域抽象成点后，问题归结于<strong>在一幅有向无环图中，我们要找到一种顺序，这种顺序的规则是箭头指向的顶点排在前</strong>！</p><p>到这儿，我们稍微好好想想，我们的任务就是找到一种进行<code>dfs</code>的顺序，这种顺序，是不是和我们在前面讲到的<strong>某种排序</strong>十分相似呢？我想你已经不难想到了，就是<strong>拓扑排序</strong>！但是<strong>和拓扑排序是完全相反的。</strong></p><p>我们把箭头理解为优先级，对于顶点A指向顶点B，则A的优先级高于B。那么对于拓扑排序，<strong>优先级高者在前</strong>；对于我们的任务，<strong>优先级低者在前</strong>（我们想要的结果就是dfs不会从优先级低的地方跑到优先级高的地方）</p><p>我们想要的结果如图所示：</p><div style="text-align:center;"><img src="'+v+'" alt="ASIC Flow" width="200"><h4>图7 有向无环图</h4></div><p>如果我们从<code>顶点1</code>开始进行<code>dfs</code>，依次向右，那么永远不会发生我们不希望的情况！因为箭头是单向的！</p><p>我想，到这儿，你应该差不多理解我的意思了。我们还有最后一个小问题————<strong>如何获取拓扑排序的反序？</strong></p><p>其实解决方法很简单：对于一个有向图<code>G</code>,我们先取反（reverse方法），将图<code>G</code>的所有边的顺序颠倒，然后获取取反后的图的<strong>逆后序排序（我们不能称为拓扑排序，因为真实情况是有环的）</strong>；最后，我们利用刚才获得的顶点顺序对原图<code>G</code>进行<code>dfs</code>即可，这时它的原理与上一篇文章无向图的完全一致！</p><p>最后，总结一下Kosaraju算法的实现步骤：</p><ul><li>1.在给定的一幅有向图 G 中，使用 DepthFirstOrder 来计算它的反向图 GR 的逆后序排列。</li><li>2.在 G 中进行标准的深度优先搜索，但是要按照刚才计算得到的顺序而非标准的顺序来访问<br> 所有未被标记的顶点。</li></ul><p>具体的实现代码只在无向图的实现<code>CC类</code>中增加了两行代码（改变dfs的顺序）</p><p>最后，附上一幅具体的操作过程：</p><div style="text-align:center;"><img src="'+r+`" alt="ASIC Flow" width="200"><h4>图8 操作过程</h4></div><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include&lt;iostream&gt;
#include&lt;cstdio&gt;
#include&lt;vector&gt;
#include&lt;cstring&gt;
 
using namespace std;
 
const int max_v=100;
 
int V;
vector&lt;int&gt;g[max_v];
vector&lt;int&gt;rg[max_v];
vector&lt;int&gt;vs;
bool used[max_v];
int cmp[max_v];
 
void add_edge(int from,int to)
{
    g[from].push_back(to);
    rg[to].push_back(from);
}
 
void dfs(int v)
{
    used[v]=true;
    for(int i=0;i&lt;g[v].size();i++){
        if(!used[g[v][i]]){
            dfs(g[v][i]);
        }
    }
    vs.push_back(v);
}
 
void rdfs(int v,int k)
{
    used[v]=true;
    cmp[v]=k;
    for(int i=0;i&lt;rg[v].size();i++){
        if(!used[rg[v][i]]){
            rdfs(rg[v][i],k);
        }
    }
}
 
int scc()
{
    memset(used,0,sizeof(used));
    vs.clear();
    for(int v=0;v&lt;V;v++){
        if(!used[v]){
            dfs(v);
        }
    }
    memset(used,0,sizeof(used));
    int k=0;
    for(int i=vs.size()-1;i&gt;=0;i--){
        if(!used[vs[i]]){
            rdfs(vs[i],k++);
        }
    }
    return k;
}
 
int main()
{
    scanf(&quot;%d&quot;,&amp;V);
    int m;
    scanf(&quot;%d&quot;,&amp;m);
    int u,v;
    for(int i=0;i&lt;m;i++){
        scanf(&quot;%d%d&quot;,&amp;u,&amp;v);
        add_edge(u,v);
    }
    int ans=scc();
    printf(&quot;%d\\n&quot;,ans);
    return 0;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),b=[m];function p(g,_){return t(),a("div",null,b)}const x=c(u,[["render",p],["__file","7_4_11_拓扑排序与Kosaraju算法.html.vue"]]);export{x as default};
