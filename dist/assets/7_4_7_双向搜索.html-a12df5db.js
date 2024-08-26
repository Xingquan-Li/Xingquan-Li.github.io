import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as e,f as l}from"./app-1ed3f6c2.js";const d={},s=l(`<h2 id="双向同时搜索" tabindex="-1"><a class="header-anchor" href="#双向同时搜索" aria-hidden="true">#</a> 双向同时搜索</h2><p>双向同时搜索的基本思路是从状态图上的起点和终点同时开始进行 广搜 或 深搜。如果发现搜索的两端相遇了，那么可以认为是获得了可行解。</p><p>双向广搜的步骤：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>将开始结点和目标结点加入队列 q
标记开始结点为 1
标记目标结点为 2
while (队列 q 不为空)
{
  从 q.front() 扩展出新的 s 个结点
  
  如果 新扩展出的结点已经被其他数字标记过
    那么 表示搜索的两端碰撞
    那么 循环结束
  
  如果 新的 s 个结点是从开始结点扩展来的
    那么 将这个 s 个结点标记为 1 并且入队 q 
    
  如果 新的 s 个结点是从目标结点扩展来的
    那么 将这个 s 个结点标记为 2 并且入队 q
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="meet-in-the-middle" tabindex="-1"><a class="header-anchor" href="#meet-in-the-middle" aria-hidden="true">#</a> Meet in the middle</h2><p>Meet in the middle 算法没有正式译名，常见的翻译为「折半搜索」、「双向搜索」或「中途相遇」。它适用于输入数据较小，但还没小到能直接使用暴力搜索的情况。</p><p>主要思想是将整个搜索过程分成两半，分别搜索，最后将两半的结果合并。</p><p>暴力搜索的复杂度往往是指数级的，而改用 meet in the middle 算法后复杂度的指数可以减半，即让复杂度从 O(a^b) 降到 O（a^(b/2))。</p><p>​ 有 n盏灯，每盏灯与若干盏灯相连，每盏灯上都有一个开关，如果按下一盏灯上的开关，这盏灯以及与之相连的所有灯的开关状态都会改变。一开始所有灯都是关着的，你需要将所有灯打开，求最小的按开关次数。<br> ​<br> ​ 如果这道题暴力 DFS 找开关灯的状态，时间复杂度就是 O(2^{n}), 显然超时。不过，如果我们用 meet in middle 的话，时间复杂度可以优化至 O(n2^{n/2})。meet in middle 就是让我们先找一半的状态，也就是找出只使用编号为 1 到 mid的开关能够到达的状态，再找出只使用另一半开关能到达的状态。如果前半段和后半段开启的灯互补，将这两段合并起来就得到了一种将所有灯打开的方案。具体实现时，可以把前半段的状态以及达到每种状态的最少按开关次数存储在 map 里面，搜索后半段时，每搜出一种方案，就把它与互补的第一段方案合并来更新答案。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;algorithm&gt;
#include &lt;cstdio&gt;
#include &lt;iostream&gt;
#include &lt;map&gt;

using namespace std;

int n, m, ans = 0x7fffffff;
map&lt;long long, int&gt; f;
long long a[40];

int main() {
  cin &gt;&gt; n &gt;&gt; m;
  a[0] = 1;
  for (int i = 1; i &lt; n; ++i) a[i] = a[i - 1] * 2;  //进行预处理

  for (int i = 1; i &lt;= m; ++i) {  //对输入的边的情况进行处理
    int u, v;
    cin &gt;&gt; u &gt;&gt; v;
    --u;
    --v;
    a[u] |= ((long long)1 &lt;&lt; v);
    a[v] |= ((long long)1 &lt;&lt; u);
  }

  for (int i = 0; i &lt; (1 &lt;&lt; (n / 2)); ++i) {  //对前一半进行搜索
    long long t = 0;
    int cnt = 0;
    for (int j = 0; j &lt; n / 2; ++j) {
      if ((i &gt;&gt; j) &amp; 1) {
        t ^= a[j];
        ++cnt;
      }
    }
    if (!f.count(t))
      f[t] = cnt;
    else
      f[t] = min(f[t], cnt);
  }

  for (int i = 0; i &lt; (1 &lt;&lt; (n - n / 2)); ++i) {  //对后一半进行搜索
    long long t = 0;
    int cnt = 0;
    for (int j = 0; j &lt; (n - n / 2); ++j) {
      if ((i &gt;&gt; j) &amp; 1) {
        t ^= a[n / 2 + j];
        ++cnt;
      }
    }
    if (f.count((((long long)1 &lt;&lt; n) - 1) ^ t))
      ans = min(ans, cnt + f[(((long long)1 &lt;&lt; n) - 1) ^ t]);
  }

  cout &lt;&lt; ans;

  return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),v=[s];function a(t,c){return i(),e("div",null,v)}const u=n(d,[["render",a],["__file","7_4_7_双向搜索.html.vue"]]);export{u as default};
