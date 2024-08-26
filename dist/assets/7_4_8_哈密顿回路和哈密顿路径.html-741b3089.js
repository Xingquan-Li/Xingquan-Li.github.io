import{_ as n,a as l,b as e,c as s,d as t,e as r,f as d}from"./graph_22-2fb41c42.js";import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as m,c,e as v,f as i}from"./app-1ed3f6c2.js";const u={},o=i('<h1 id="哈密顿回路和哈密顿路径" tabindex="-1"><a class="header-anchor" href="#哈密顿回路和哈密顿路径" aria-hidden="true">#</a> 哈密顿回路和哈密顿路径</h1><p>内容概要：</p><ol><li>Hamilton路径、回路算法</li><li>基于位运算的状态压缩优化</li><li>记忆化搜索</li><li>Hamilton图的应用</li></ol><h3 id="哈密顿图" tabindex="-1"><a class="header-anchor" href="#哈密顿图" aria-hidden="true">#</a> 哈密顿图</h3><p>问题来源：1859年，爱尔兰数学家、天文学家哈密顿提出的一个在正十二面体的二十个顶点上周游世界的游戏。<br><strong>基本概念：</strong><br> 哈密顿路径：通过图中所有顶点一次且仅一次的路径称为哈密顿(Hamilton)路径；<br> 哈密顿回路：通过图中所有顶点一次且仅一次的回路称为哈密顿回路；<br> 哈密顿图：具有哈密顿回路的图称为哈密顿图；<br> 半哈密顿图：具有哈密顿路径而没有哈密顿回路的图称为半哈密顿图。</p><p>寻找哈密顿回路和哈密顿路径是一个NPC问题。到目前为止，还没有找到一个简明的条件来作为判定哈密顿图的充要条件，研究哈密顿图要比欧拉图难得多。<br> 哈密顿回路和哈密顿通路有一些充分条件和必要条件，由于不是充要条件编程中使用的少，这里不对它的拓扑性质做过多讨论。<br> 我们可以通过回溯搜索按照定义判定一个图是否是哈密顿图。<br> 与哈密顿回路问题比较类似的一个算法问题是旅行推销员问题(Travelling Salesman Problem,TSP)：给定一系列城市和每队城市之间的距离，求解访问每座城市一次并回到起始城市的最短回路，不过这是在一个有权完全图中寻找最短的哈密顿回路。<br><strong>寻找哈密顿回路算法</strong><br> 最直观的方案就是将所有顶点的排列序做一一检验来暴力求解，比如判断下图中是否有哈密顿回路：</p><div style="text-align:center;"><img src="'+n+'" alt="ASIC Flow" width="200"><h4>图1 哈密顿回路</h4></div><p>哈密顿</p><p>我们可以依次检验顶点访问序列(共24种排列)是否是一个回路：</p><ul><li>0-1-2-3，0-1-3-2，0-2-1-3，0-2-3-1，0-3-1-2，0-3-2-1，1-0-2-3<br> ...</li></ul><p>如果在图中用回溯法进行求解，由于有些顶点是不相邻的，一旦这样的情况出现会停止本轮回溯，相当于进行了剪枝，如序列2-3-0-1，在检测到2与3不相邻时就不会再继续本轮回溯了。<br> 另外，由于哈密顿回路是一个回路，所以判定哈密顿图可以只从一个顶点开始即可，并不需要搜索顶点序的全排列n!种情况。如果从某个点开始找不到哈密顿回路，那么整张图就一定不存在哈密顿回路了。但这只是暴力求解的一点优化，求解哈密顿回路最坏的时间复杂度仍然是<img src="https://math.jianshu.com/math?formula=O(n!)" alt="O(n!)">。</p><p><strong>求解哈密顿路径</strong><br> 由哈密顿回路的求解过程，稍加修改不难得到求解哈密顿路径算法，不过由于哈密顿路径依赖初始点</p><div style="text-align:center;"><img src="'+l+'" alt="ASIC Flow" width="200"><h4>图2 哈密顿回路</h4></div><p>哈密顿路径</p><p>如上图中从1开始不存在哈密顿路径。<br> 所以求解哈密顿路径应当判断从某点开始是否有哈密顿路径，而且递归终止条件应有所不同，不需要终点和源点之间有边。</p><h3 id="状态压缩" tabindex="-1"><a class="header-anchor" href="#状态压缩" aria-hidden="true">#</a> 状态压缩</h3><p>在上面的求解哈密顿回路和哈密顿路径的代码中，如果图中顶点很多，那么单是访问标记数组visited就会占用很多空间，而且有时我们希望把访问标记数组整体当做一个状态来使用，即visited数组的一组取值，对应某个问题的一个解，为此引入状态压缩。由于visited数组元素的取值只有true和false，对应二进制的1和0，可以用二进制数来表示，而二进制数又与十进制数一一对应，所以最终用整数就能表示顶点的访问情况，也就是一个整数就表示了一个集合，这就是状态压缩。</p><div style="text-align:center;"><img src="'+e+'" alt="ASIC Flow" width="200"><h4>图3 状态压缩</h4></div><p>状态压缩</p><p>但是整型数据位数是有限的，int型32位，去掉符号位只有31位，这样只能表示31个顶点的访问状态。不过对于寻找哈密顿路径算法来说，它本身就是指数级别的算法，问题规模不会太大，所以31位一般足够了，实在不够还可以用long long有64位。<br> 由十进制整型查看顶点的访问状态和修改顶点的访问状态也非常简单：</p><div style="text-align:center;"><img src="'+s+'" alt="ASIC Flow" width="200"><h4>图4 状态压缩</h4></div><p>与运算</p><p>即如果要通过十进制数<img src="https://math.jianshu.com/math?formula=n" alt="n">的查看第<img src="https://math.jianshu.com/math?formula=i" alt="i">位是否为0，只需要数<img src="https://math.jianshu.com/math?formula=n" alt="n">和<img src="https://math.jianshu.com/math?formula=2^i" alt="2^i">（1左移<img src="https://math.jianshu.com/math?formula=i" alt="i">位后的数）做相应的与运算：</p><figure><img src="https://math.jianshu.com/math?formula=n \\%26 (1&lt;&lt;i)%3D%3D0%3F" alt="n  (1&lt;&lt;i)==0?" tabindex="0"><figcaption>n &amp; (1&lt;&lt;i)==0?</figcaption></figure><p>进而如果要把某一位设置为0或1，只需要做加法（减法）即可：</p><div style="text-align:center;"><img src="'+t+'" alt="ASIC Flow" width="200"><h4>图5 状态压缩</h4></div>',26),b=i('<p>即如果要通过十进制数<img src="https://math.jianshu.com/math?formula=n" alt="n">的修改第<img src="https://math.jianshu.com/math?formula=i" alt="i">位，只需要数<img src="https://math.jianshu.com/math?formula=n" alt="n">和<img src="https://math.jianshu.com/math?formula=2^i" alt="2^i">（1左移<img src="https://math.jianshu.com/math?formula=i" alt="i">位后的数）加减运算：</p><figure><img src="https://math.jianshu.com/math?formula=第i位0修改为1：n%2B(1&lt;&lt;i) \\\\ 第i位1修改为0：n-(1&lt;&lt;i)" alt="第i位0修改为1：n+(1&lt;&lt;i)  第i位1修改为0：n-(1&lt;&lt;i)" tabindex="0"><figcaption>第i位0修改为1：n+(1&lt;&lt;i) \\ 第i位1修改为0：n-(1&lt;&lt;i)</figcaption></figure><p>注意：位运算符的优先级一般比较低，编程时要留心加括号。</p><h3 id="记忆化搜索" tabindex="-1"><a class="header-anchor" href="#记忆化搜索" aria-hidden="true">#</a> 记忆化搜索</h3><p>假设求解下图的哈密顿回路：</p><div style="text-align:center;"><img src="'+r+'" alt="ASIC Flow" width="200"><h4>图6 记忆化搜索</h4></div><p>图</p><p>显然该图中是不存在哈密顿回路的，但是算法还要进行回溯搜索，搜索序列0-1-2-3-...，0-2-1-3-...，...，但是从顶点3开始的右边部分在搜索序列0-1-2-3-...时已经搜索过了，我们相当于进行了重复的搜索。当问题规模比较大时，很多的时间被浪费在重复搜索中，所以有必要记录搜索的状态，避免重复搜索。在上图的例子中，0-1-2-3-...和0-2-1-3-...搜索序列在来到顶点3时，二者的visited值都是0b00001111，此时继续进行dfs二者传入的参数完全一样，求解的结果也会完全一样，但是由于二者前面搜索序列的不同，回溯求解时仍然会分别求解从3开始的结果，实际没必要求解多次。<br><strong>解决办法：记忆化搜索</strong><br> 新增数组memo，用于记录visited和v的不同组合状态的求解结果，这样如果已经求解过，就不再进行搜索，直接使用记录的结果。空间大小需要<img src="https://math.jianshu.com/math?formula=memo[1&lt;&lt;G.V()][G.V()]" alt="memo[1&lt;&lt;G.V()][G.V()]">（2个顶点的访问组合有00,01,10,11，需要4×2个空间；3个顶点需要8×3个空间，以此类推。）基于记忆化搜索的优化可以把哈密顿回路求解的时间复杂度优化到<img src="https://math.jianshu.com/math?formula=O(n*2^n)" alt="O(n*2^n)">（最坏情况相当于每种状态都要计算一次，也就是memo数组的大小）。<br> 需要指出的是，记忆化搜索相比于回溯算法其实并没有优化太多，而且记忆化搜索由于需要很多额外的内存空间、对空间进行初始化以及寻址访问，这些时间开销也是不小的，综合起来一些情况下相比回溯甚至更慢，具体使用时还要看情况。<br> 但是记忆化搜索在很多其它问题上有着非常棒的表现，这个思想还是有必要掌握的。</p><h3 id="哈密顿路径问题实例" tabindex="-1"><a class="header-anchor" href="#哈密顿路径问题实例" aria-hidden="true">#</a> 哈密顿路径问题实例</h3><p>LeetCode980号问题：</p><div style="text-align:center;"><img src="'+d+`" alt="ASIC Flow" width="200"><h4>图7 实例</h4></div><p>LeetCode980</p><p>这个问题可以抽象为一个哈密顿路径问题，1就是源点，2就是终点，每个无障碍方格0都要通过一次，相当于每个存在的顶点都要遍历一次。</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>
class Solution {
private:
    int res;
    int rows;
    int cols;
    // 目的地坐标
    int dr;
    int dc;
    // 四个移动方向
    int dires[5] = {0, 1, 0, -1, 0};
    // 记忆的数组用map来实现
    unordered_map&lt;int, unordered_map&lt;int, int&gt;&gt; memo;

#define RC(r, c) (1&lt;&lt;(r*cols+c))
#define R1C(r, c) (r*cols+c)

    int dfs(int r, int c, int rest)
    {
        // cout &lt;&lt; r &lt;&lt; &quot; &quot; &lt;&lt;c &lt;&lt; &quot; &quot; &lt;&lt; rest &lt;&lt; &quot; to &quot; &lt;&lt; dr &lt;&lt; &quot;,&quot; &lt;&lt; dc &lt;&lt; endl;
        int rc = R1C(r, c);
        if (memo.find(rc) != memo.end() &amp;&amp; memo[rc].find(rest) != memo[rc].end())
        {
            return memo[rc][rest];
        }

        // 找到目的地
        if (r == dr &amp;&amp; c == dc)
        {
            // 只有完全覆盖才是有效的，否则返回0
            return rest == 0 ? 1 : 0;
        }

        int res = 0;
        // 考虑四个方向
        for (int i = 0; i &lt; 4; ++i)
        {
            int nr = r + dires[i];
            int nc = c + dires[i+1];
            if (nr &gt;= 0 &amp;&amp; nr &lt; rows &amp;&amp; nc &gt;= 0 &amp;&amp; nc &lt; cols)
            {
                // 只考虑覆盖的子集才可行：即目前rest里包含下一步的位置
                // 满足则可以递归调用下面的情况
                int r1c = RC(nr,nc);
                if ((rest &amp; r1c) != 0)
                {
                    // rest取消当前走的这一步
                    res += dfs(nr, nc, rest ^ r1c);
                }
            }
        }

        memo[rc][rest] = res;
        return res;
    }

public:
    int uniquePathsIII(vector&lt;vector&lt;int&gt;&gt;&amp; grid) {
        res = 0;
        rows = grid.size();
        cols = grid[0].size();

        // 构建所有可能的位置，即0的地方
        int target = 0;
        // 起点
        int sr = 0;
        int sc = 0;
        for (int r = 0; r &lt; rows; ++r)
        {
            for (int c = 0; c &lt; cols; ++c)
            {
                if ((grid[r][c] % 2) == 0)
                {
                    target |= RC(r, c);
                    // cout &lt;&lt; r &lt;&lt; &quot;,&quot; &lt;&lt; c &lt;&lt; &quot; &quot; &lt;&lt;target  &lt;&lt; &quot; + &quot; &lt;&lt; RC(r, c) &lt;&lt; endl;
                } 

                if (grid[r][c] == 1)
                {
                    sr = r;
                    sc = c;
                }
                else if (grid[r][c] == 2)
                {
                    dr = r;
                    dc = c;
                }
            }
        }

        return dfs(sr, sc, target);
    }
};


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function h(p,g){return m(),c("div",null,[o,v(" 修改操作 "),b])}const w=a(u,[["render",h],["__file","7_4_8_哈密顿回路和哈密顿路径.html.vue"]]);export{w as default};
