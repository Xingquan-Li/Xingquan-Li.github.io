import{_ as n}from"./SegmentTree_1-2bdda50c.js";import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as p,f as t}from"./app-1ed3f6c2.js";const o={},c=t('<ul><li></li></ul><h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1><p>线段树(segment tree)也是一种二叉搜索树，线段树的每一个节点都是一个区间<img src="https://math.jianshu.com/math?formula=[L%2C\\ R]" alt="[L,R]">，叶子节点则是一个单点区间，也即<img src="https://math.jianshu.com/math?formula=L %3D%3D R" alt="L == R">。对于一个非叶子节点，其左子节点的区间为<img src="https://math.jianshu.com/math?formula=[L%2C\\ (L%2BR)%2F2]" alt="[L,(L+R)/2]">，右子节点的区间为<img src="https://math.jianshu.com/math?formula=[(L%2BR)%2F2%2B1%2C\\ R]" alt="[(L+R)/2+1,R]">。需要注意的是，<strong>线段树的区间是其数组元素下标的区间，区间大小与数组中元素的大小无关</strong>。</p><p>根据上述定义，线段树任一非根，非叶子节点的区间长度都是其父节点的区间长度的一半，所以，线段树是一个平衡二叉树。他的叶子节点的数目为N，即整个区间的长度。</p><p>线段树的用途很广，主要用于进行更新和查询操作，这里的更新或者查询一般至少有一个指的是区间的更新或者查询。</p><div style="text-align:center;"><img src="'+n+`" alt="ASIC Flow" width="200"><h4>图1 线段树</h4></div><p>一棵普普通通的线段树</p><h2 id="线段树的节点定义" tabindex="-1"><a class="header-anchor" href="#线段树的节点定义" aria-hidden="true">#</a> 线段树的节点定义</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">Node</span>
<span class="token punctuation">{</span>
     <span class="token keyword">int</span> l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> mx<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>tr<span class="token punctuation">[</span>MAXN <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//习惯上将线段树的大小开到原始数组的4倍</span>
 <span class="token comment">/*
 l : 区间左端点
 r : 区间右端点
 mx : 以l, r为下标区间中元素的最大值
 实际上，线段树数组足够的空间==原始数组n可向上取到的最近的2的某个次方的两倍
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于一个线段树数组来说，某一节点(编号为d)的左孩子存储在2 * d， 右孩子存储在2 * d + 1</p><ul><li>在c/c++中，将一个数乘以2的x次方可以写成：2 &lt;&lt; x，故上面的 &quot; MAXN * 4 &quot; 可以写成MAXN &lt;&lt; 2，实际上，对于 &quot;&lt;&lt;&quot; 和 &quot;&gt;&gt;&quot; 运算符，其实际含义是将左操作数的二进制数向左或向右移动指定的位数（比如A == 15，在二进制中A的值为：0000 1111，A &lt;&lt; 2为：0011 1100），表现在十进制中就是将操作数乘或除2^x。</li></ul><h2 id="建树" tabindex="-1"><a class="header-anchor" href="#建树" aria-hidden="true">#</a> 建树</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code> <span class="token keyword">void</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token keyword">int</span> d<span class="token punctuation">,</span> <span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
     tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">=</span> l<span class="token punctuation">,</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r <span class="token operator">=</span> r<span class="token punctuation">;</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">==</span> r<span class="token punctuation">)</span>
     <span class="token punctuation">{</span>
         tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">=</span> arr<span class="token punctuation">[</span>l<span class="token punctuation">]</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>l <span class="token operator">+</span> r<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> lc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> rc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token function">build</span><span class="token punctuation">(</span>lc<span class="token punctuation">,</span> l<span class="token punctuation">,</span> mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token function">build</span><span class="token punctuation">(</span>rc<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span>
     tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>tr<span class="token punctuation">[</span>lc<span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">,</span> tr<span class="token punctuation">[</span>rc<span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般会将更新节点信息的操作称为Push或PushUp，在上述建树例子中更新节点信息的操作是：tr[d].mx = max(tr[lc].mx, tr[rc].mx); 一般会将这一句抽离出来写成一个独立的函数：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">Push</span><span class="token punctuation">(</span><span class="token keyword">int</span> d<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   td<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>tr<span class="token punctuation">[</span>d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">,</span> tr<span class="token punctuation">[</span>d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token keyword">int</span> d<span class="token punctuation">,</span> <span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token comment">//查询一个区间内的最大值</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">==</span> l <span class="token operator">&amp;&amp;</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r <span class="token operator">==</span> r<span class="token punctuation">)</span><span class="token keyword">return</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">;</span>
     <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">+</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> lc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> rc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span><span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>lc<span class="token punctuation">,</span> l<span class="token punctuation">,</span> mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&gt;</span> mid<span class="token punctuation">)</span><span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>rc<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token function">query</span><span class="token punctuation">(</span>lc<span class="token punctuation">,</span> l<span class="token punctuation">,</span> mid<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">query</span><span class="token punctuation">(</span>rc<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线段树查询操作的时间复杂度可以达到O(logn)，有如下定理：</p><p><strong>Thm</strong>：当n &gt;= 3时，一个<img src="https://math.jianshu.com/math?formula=[1%2Cn]" alt="[1,n]">的线段树可以将<img src="https://math.jianshu.com/math?formula=[1%2Cn]" alt="[1,n]">的任意子区间<img src="https://math.jianshu.com/math?formula=[L%2C\\ R]" alt="[L,R]">分解为不超过<img src="https://math.jianshu.com/math?formula=2log_2(n-1)" alt="2log_2(n-1)">个子区间。</p><h2 id="更新及「慵懒更新」" tabindex="-1"><a class="header-anchor" href="#更新及「慵懒更新」" aria-hidden="true">#</a> 更新及「慵懒更新」</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">modify</span><span class="token punctuation">(</span><span class="token keyword">int</span> d<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token comment">//将位置为pos的元素更改为v</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">==</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r <span class="token operator">&amp;&amp;</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">==</span> pos<span class="token punctuation">)</span><span class="token punctuation">{</span>
         tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">=</span> v<span class="token punctuation">;</span>
         <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">+</span> tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> lc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> rc <span class="token operator">=</span> d <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>pos <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span><span class="token function">modify</span><span class="token punctuation">(</span>lc<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">else</span> <span class="token function">modify</span><span class="token punctuation">(</span>rc<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
     tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>mx <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>tr<span class="token punctuation">[</span>lc<span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">,</span> tr<span class="token punctuation">[</span>rc<span class="token punctuation">]</span><span class="token punctuation">.</span>mx<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于线段树的更新还有一种「慵懒更新」方式，具体做法是，如果更新的区间与当前节点的区间完全重叠，那么就可以只对这个节点更新，并对这个节点做标记，对这个节点的子节点就无需再更新。若后续操作中存在关于这个区间，或其子区间的查询，那么<strong>一定会经过这个区间</strong>，当再次经过这个区间的时候就更新起子区间的标记，然后置这个区间的标记为&quot;false&quot;即可。</p><h2 id="慵懒更新" tabindex="-1"><a class="header-anchor" href="#慵懒更新" aria-hidden="true">#</a> 慵懒更新</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">int</span> L<span class="token punctuation">,</span> <span class="token keyword">int</span> R<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">,</span> <span class="token keyword">int</span> d<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">==</span> L <span class="token operator">&amp;&amp;</span> Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r <span class="token operator">==</span> R<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//区间完全覆盖</span>
         Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> val<span class="token punctuation">;</span>
         <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     <span class="token keyword">int</span> mid <span class="token operator">=</span> Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>l <span class="token operator">+</span> Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>r <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>lazy <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//如果这个区间被标记了就更新其子节点</span>
         Tr<span class="token punctuation">[</span>d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> Tr<span class="token punctuation">[</span>d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>lazy<span class="token punctuation">;</span>
         Tr<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span> mid <span class="token operator">&lt;</span> L <span class="token punctuation">)</span><span class="token function">update</span><span class="token punctuation">(</span>L<span class="token punctuation">,</span> R<span class="token punctuation">,</span> val<span class="token punctuation">,</span> d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//更新右子树</span>
     <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span> R <span class="token operator">&lt;=</span> mid <span class="token punctuation">)</span><span class="token function">update</span><span class="token punctuation">(</span>L<span class="token punctuation">,</span> R<span class="token punctuation">,</span> val<span class="token punctuation">,</span> d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//更新左子树</span>
     <span class="token keyword">else</span> <span class="token function">update</span><span class="token punctuation">(</span>L<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> val<span class="token punctuation">,</span> d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">update</span><span class="token punctuation">(</span>mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> R<span class="token punctuation">,</span> val<span class="token punctuation">,</span> d <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),e=[c];function u(l,i){return a(),p("div",null,e)}const m=s(o,[["render",u],["__file","6_8_segement_tree.html.vue"]]);export{m as default};