import{_ as n}from"./graph_26-d8825a62.js";import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as d,f as v}from"./app-1ed3f6c2.js";const s={},l=v('<h1 id="floyd算法求多源最短路" tabindex="-1"><a class="header-anchor" href="#floyd算法求多源最短路" aria-hidden="true">#</a> Floyd算法求多源最短路</h1><p>弗洛伊德算法作为求最短路径的经典算法，其算法实现相比迪杰斯特拉等算法是非常优雅的，可读性和理解都非常好。</p><p>基本思想：<br> 弗洛伊德算法定义了两个二维矩阵：</p><p>矩阵D记录顶点间的最小路径<br> 例如D [0] [3]= 10，说明顶点0 到 3 的最短路径为10；</p><p>矩阵P记录顶点间最小路径中的中转点 例如P[0] [3]= 1 说明，0 到 3的最短路径轨迹为：0 -&gt; 1 -&gt; 3。<br><strong>它通过3重循环，k为中转点，v为起点，w为终点，循环比较D[v] [w] 和 D[v] [k] + D[k] [w] 最小值，如果D[v] [k] + D[k] [w] 为更小值，则把D[v] [k] + D[k] [w] 覆盖保存在D[v] [w]中</strong>。</p><p>概念是比较难理解的，我们来看图：</p><div style="text-align:center;"><img src="'+n+`" alt="ASIC Flow" width="200"><h4>图1 Floyd算法求多源最短路</h4></div><p>顶点名称和下标的对应<br><strong>A B C D E F G</strong><br><strong>0 1 2 3 4 5 6</strong></p><p>第2步：<br> 以A为中间点，原D矩阵中，D[B] [G]的 值为INF，即不存在B-&gt;G的最小路径，但是通过A为中间点，D[B] [A] + D[A] [G] = 12 + 14 = 26 小于 D[B] [G] = INF， 所以D[B] [A] + D[A] [G] 为 B -&gt; G的最小值，因此覆盖D[B] [G] 为 26。</p><p>第3步：<br> 以B为中间点，第2步后的D矩阵中，D[A] [C]的值为INF， 但是通过B，D[A] [B] + D[B] [C] = 12 + 10 = 22 小于 D[A] [C] = INF，所以D[A] [B] + D[B] [C] 为 A-&gt;C的最小路径，覆盖D[A] [C]的值为22， 以此类推。</p><p>第4步:</p><p>….</p><p>我们就对上面的图进行弗洛伊德算法求最短路径，并且我们求A到D的最小路径，即v = 0， w = 3；</p><h3 id="结构定义" tabindex="-1"><a class="header-anchor" href="#结构定义" aria-hidden="true">#</a> <strong>结构定义</strong></h3><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>typedef struct struct_graph{
    char vexs[MAXN];
    int vexnum;//顶点数 
    int edgnum;//边数 
    int matirx[MAXN][MAXN];//邻接矩阵 
} Graph;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="弗洛伊德算法" tabindex="-1"><a class="header-anchor" href="#弗洛伊德算法" aria-hidden="true">#</a> <strong>弗洛伊德算法</strong></h3><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//这里是弗洛伊德算法的核心部分 
    //k为中间点 
    for(k = 0; k &lt; G.vexnum; k++){
        //v为起点 
        for(v = 0 ; v &lt; G.vexnum; v++){
            //w为终点 
            for(w =0; w &lt; G.vexnum; w++){
                if(D[v][w] &gt; (D[v][k] + D[k][w])){
                    D[v][w] = D[v][k] + D[k][w];//更新最小路径 
                    P[v][w] = P[v][k];//更新最小路径中间顶点 
                }
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="求a-到-d的最短路径" tabindex="-1"><a class="header-anchor" href="#求a-到-d的最短路径" aria-hidden="true">#</a> <strong>求A 到 D的最短路径</strong></h3><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    v = 0;
    w = 3;
    //求 0 到 3的最小路径
    printf(&quot;\\n%d -&gt; %d 的最小路径为：%d\\n&quot;, v, w, D[v][w]);
    k = P[v][w];
    printf(&quot;path: %d&quot;, v);//打印起点
    while(k != w){
        printf(&quot;-&gt; %d&quot;, k);//打印中间点
        k = P[k][w]; 
    }
    printf(&quot;-&gt; %d\\n&quot;, w);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> <strong>完整代码</strong></h3><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define MAXN 10 
#define INF = 1000

typedef struct struct_graph{
    char vexs[MAXN];
    int vexnum;//顶点数 
    int edgnum;//边数 
    int matirx[MAXN][MAXN];//邻接矩阵 
} Graph;

int pathmatirx[MAXN][MAXN];//记录对应点的最小路径的前驱点，例如p(1,3) = 2 说明顶点1到顶点3的最小路径要经过2 
int shortPath[MAXN][MAXN];//记录顶点间的最小路径值

void short_path_floyd(Graph G, int P[MAXN][MAXN], int D[MAXN][MAXN]){
    int v, w, k;
    //初始化floyd算法的两个矩阵 
    for(v = 0; v &lt; G.vexnum; v++){
        for(w = 0; w &lt; G.vexnum; w++){
            D[v][w] = G.matirx[v][w];
            P[v][w] = w;
        }
    }

    //这里是弗洛伊德算法的核心部分 
    //k为中间点 
    for(k = 0; k &lt; G.vexnum; k++){
        //v为起点 
        for(v = 0 ; v &lt; G.vexnum; v++){
            //w为终点 
            for(w =0; w &lt; G.vexnum; w++){
                if(D[v][w] &gt; (D[v][k] + D[k][w])){
                    D[v][w] = D[v][k] + D[k][w];//更新最小路径 
                    P[v][w] = P[v][k];//更新最小路径中间顶点 
                }
            }
        }
    }

    printf(&quot;\\n初始化的D矩阵\\n&quot;);
    for(v = 0; v &lt; G.vexnum; v++){
        for(w = 0; w &lt; G.vexnum; w++){
            printf(&quot;%d &quot;, D[v][w]);
        }
        printf(&quot;\\n&quot;);
    }

    printf(&quot;\\n初始化的P矩阵\\n&quot;);
    for(v = 0; v &lt; G.vexnum; v++){
        for(w = 0; w &lt; G.vexnum; w++){
            printf(&quot;%d&quot;, P[v][w]);
        }
        printf(&quot;\\n&quot;);
    }

    v = 0;
    w = 3;
    //求 0 到 3的最小路径
    printf(&quot;\\n%d -&gt; %d 的最小路径为：%d\\n&quot;, v, w, D[v][w]);
    k = P[v][w];
    printf(&quot;path: %d&quot;, v);//打印起点
    while(k != w){
        printf(&quot;-&gt; %d&quot;, k);//打印中间点
        k = P[k][w]; 
    }
    printf(&quot;-&gt; %d\\n&quot;, w);
}

int main(){
    int v, w;
    Graph G;
    printf(&quot;请输入顶点数:\\n&quot;);
    scanf(&quot;%d&quot;, &amp;G.vexnum);
    printf(&quot;请输入初始矩阵值：\\n&quot;);
    for(v = 0; v &lt; G.vexnum; v++){
        for(w = 0; w &lt; G.vexnum; w++){
            scanf(&quot;%d&quot;, &amp;G.matirx[v][w]);
        }
    }
    printf(&quot;\\n输入的矩阵值：\\n&quot;);
    for(v = 0; v &lt; G.vexnum; v++){
        for(w = 0; w &lt; G.vexnum; w++){
            printf(&quot;%d &quot;, G.matirx[v][w]);
        }
        printf(&quot;\\n&quot;);
    }
    short_path_floyd(G, pathmatirx, shortPath);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),r=[l];function a(u,t){return e(),d("div",null,r)}const o=i(s,[["render",a],["__file","7_4_10_Floyd算法求多源最短路.html.vue"]]);export{o as default};
