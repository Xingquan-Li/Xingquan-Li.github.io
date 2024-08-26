import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-1ed3f6c2.js";const t={},o=p(`<h1 id="凸包" tabindex="-1"><a class="header-anchor" href="#凸包" aria-hidden="true">#</a> 凸包</h1><p>由凸包点集的性质我们可知凸包算法的思想，按顺序构建凸包点集，并且维护它，直到完成点的遍历。</p><p>其精髓在于顺序和维护该性质。网上的算法代码第一步往往是寻找边角点和其相邻点，因为边角点必会在凸包点集中。但是其实多此一举，由于需要顺序，我们先将所有点按坐标排列，排列完的最初元素也必为边角点。</p><p>首先在凸包点集中加入排序后的前两个点，接下来我们在凸包点集中取出末尾两个点，以这两点构成的边对接下来的点进行处理。每次处理通过向量判断是否在边的内侧，若在内侧则跳过这个点，视为已处理，若在外侧则说明我们所用的边并不是凸包所要的边，故抛弃当前凸包点集的最后一个点，然后再取末尾两个点，进行迭代判断，直到将该点加入。由此遍历完即产生凸包点集。（雾）应该正序遍历完倒序遍历一次回到起始点，才是一个封闭凸包，不然只有一半</p><p>凸包类型的题算法主要有三种：<strong>JarvisMarch</strong> 算法、<strong>Graham</strong> 算法和 <strong>Andrew</strong> 算法，这三种算法时间性能上递增。</p><h2 id="_1-jarvismarch-算法" tabindex="-1"><a class="header-anchor" href="#_1-jarvismarch-算法" aria-hidden="true">#</a> 1. JarvisMarch 算法</h2><h4 id="_1-1-思想" tabindex="-1"><a class="header-anchor" href="#_1-1-思想" aria-hidden="true">#</a> 1.1 思想</h4><p>纵坐标最小然后横坐标最小的点一定是凸包上的点， 我们将其记为 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}">，从 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}"> 开始，按逆时针的方向，逐个找凸包上的点，每前进一步找到一个点，所以叫作步进法。</p><ul><li>选取下一个点的方法：<br> 假设已找到 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}">、<img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}">，则利用跟 <img src="https://math.jianshu.com/math?formula={p_0p_1}" alt="{p_0p_1}"> 向量夹角最小的点作为 <img src="https://math.jianshu.com/math?formula={p_2}" alt="{p_2}">。（<img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}"> 则利用 <img src="https://math.jianshu.com/math?formula={p_0p_1}" alt="{p_0p_1}">向量和水平线的夹角）</li></ul><h4 id="_1-2-代码" tabindex="-1"><a class="header-anchor" href="#_1-2-代码" aria-hidden="true">#</a> 1.2 代码</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/******************************************************************
                    Jarvis March的步进算法
算法复杂度：O(nH)。（其中 n 是点的总个数，H 是凸包上的点的个数）
******************************************************************/</span>

<span class="token comment">//#include &lt;bits/stdc++.h&gt;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;queue&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdio&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cmath&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>
 
using namespace std<span class="token punctuation">;</span>
 
<span class="token keyword">const</span> <span class="token keyword">int</span> MAXN <span class="token operator">=</span> <span class="token number">10005</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> MAXD <span class="token operator">=</span> <span class="token number">1e9</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> ACCUR <span class="token operator">=</span> <span class="token number">1e-9</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">node</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>        <span class="token comment">//点的坐标</span>
    bool operator <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>y<span class="token operator">-</span>n<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token keyword">return</span> x <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        <span class="token keyword">else</span>    <span class="token keyword">return</span> y <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    bool operator <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>x<span class="token operator">-</span>n<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>y<span class="token operator">-</span>n<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">vect</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> v<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> v<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">double</span> operator <span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x<span class="token operator">*</span>v<span class="token punctuation">.</span>x <span class="token operator">+</span> y<span class="token operator">*</span>v<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
bool <span class="token function">equal</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">double</span> d1<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">double</span> d2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>d1<span class="token operator">-</span>d2<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
vect <span class="token function">vform</span><span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    vect tmpv<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>x <span class="token operator">=</span> n2<span class="token punctuation">.</span>x <span class="token operator">-</span> n1<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>y <span class="token operator">=</span> n2<span class="token punctuation">.</span>y <span class="token operator">-</span> n1<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token keyword">return</span> tmpv<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>x<span class="token operator">*</span>v<span class="token punctuation">.</span>x<span class="token operator">+</span>v<span class="token punctuation">.</span>y<span class="token operator">*</span>v<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">vcos</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v1<span class="token punctuation">,</span> <span class="token keyword">const</span> vect v2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token punctuation">(</span><span class="token function">vlen</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span><span class="token operator">*</span><span class="token function">vlen</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">area</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">,</span> <span class="token keyword">const</span> node n3<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> b1<span class="token punctuation">,</span> b2<span class="token punctuation">,</span> b3<span class="token punctuation">;</span>
    b1 <span class="token operator">=</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token function">vform</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span>n2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b2 <span class="token operator">=</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token function">vform</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span>n3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b3 <span class="token operator">=</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token function">vform</span><span class="token punctuation">(</span>n3<span class="token punctuation">,</span>n1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> b <span class="token operator">=</span> <span class="token punctuation">(</span>b1<span class="token operator">+</span>b2<span class="token operator">+</span>b3<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span>b<span class="token operator">*</span><span class="token punctuation">(</span>b<span class="token operator">-</span>b1<span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">(</span>b<span class="token operator">-</span>b2<span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">(</span>b<span class="token operator">-</span>b3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
node p<span class="token punctuation">[</span>MAXN<span class="token punctuation">]</span><span class="token punctuation">;</span>           <span class="token comment">//点集</span>
queue <span class="token operator">&lt;</span>node<span class="token operator">&gt;</span> bq<span class="token punctuation">;</span>        <span class="token comment">//凸包顶点集</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> n<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>n<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/*【注意】第一个点先不标记，作为循环结束条件（即最后找到第一个点）*/</span>
        <span class="token keyword">int</span> f<span class="token punctuation">[</span>MAXN<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>      <span class="token comment">//点集标记数组;</span>
        vect v<span class="token punctuation">;</span>                 <span class="token comment">//v表示上两个点形成的向量。</span>
        node p0<span class="token punctuation">,</span> p1<span class="token punctuation">;</span>             <span class="token comment">//p0表示第一个点，p1表示上一个点。</span>
        p0<span class="token punctuation">.</span>x <span class="token operator">=</span> p0<span class="token punctuation">.</span>y <span class="token operator">=</span> MAXD<span class="token punctuation">;</span>     <span class="token comment">//初始化</span>
 
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%lf%lf&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> p0<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                p0 <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
 
        p1 <span class="token operator">=</span> p0<span class="token punctuation">;</span>                <span class="token comment">//初始化上一个点</span>
        <span class="token comment">//【注意】初始化向量的选取跟第一个点的选取关。</span>
        <span class="token comment">//如果第一个点是横坐标最小然后纵坐标最小则初始向量为竖直单位向量</span>
        v<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> v<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>       <span class="token comment">//初始向量为水平单位向量。</span>
        <span class="token keyword">do</span>
        <span class="token punctuation">{</span>
            node p2<span class="token punctuation">;</span>            <span class="token comment">//待判定的点。</span>
            vect v1<span class="token punctuation">;</span>            <span class="token comment">//待判定的向量</span>
            <span class="token keyword">int</span> j<span class="token punctuation">;</span>              <span class="token comment">//带判定的点的下标</span>
            <span class="token keyword">double</span> minvcos <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> minvlen <span class="token operator">=</span> MAXD<span class="token punctuation">;</span>    <span class="token comment">//初始最大夹角和最小向量长度。</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>f<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>      <span class="token comment">//判断该点是否已经在凸包上</span>
                <span class="token punctuation">{</span>
                    vect tmpv<span class="token punctuation">;</span>
                    tmpv<span class="token punctuation">.</span>x <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token operator">-</span>p1<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
                    tmpv<span class="token punctuation">.</span>y <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token operator">-</span>p1<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">vcos</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span>tmpv<span class="token punctuation">)</span> <span class="token operator">&gt;</span> minvcos<span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        p2 <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        v1 <span class="token operator">=</span> tmpv<span class="token punctuation">;</span>
                        j <span class="token operator">=</span> i<span class="token punctuation">;</span>
                        minvcos <span class="token operator">=</span> <span class="token function">vcos</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span>tmpv<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        minvlen <span class="token operator">=</span> <span class="token function">vlen</span><span class="token punctuation">(</span>tmpv<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token function">vcos</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span>tmpv<span class="token punctuation">)</span><span class="token punctuation">,</span>minvcos<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">vlen</span><span class="token punctuation">(</span>tmpv<span class="token punctuation">)</span> <span class="token operator">&lt;</span> minvlen<span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        p2 <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        v1 <span class="token operator">=</span> tmpv<span class="token punctuation">;</span>
                        j <span class="token operator">=</span> i<span class="token punctuation">;</span>
                        minvcos <span class="token operator">=</span> <span class="token function">vcos</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span>tmpv<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        minvlen <span class="token operator">=</span> <span class="token function">vlen</span><span class="token punctuation">(</span>tmpv<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            bq<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            p1 <span class="token operator">=</span> p2<span class="token punctuation">;</span>
            v <span class="token operator">=</span> v1<span class="token punctuation">;</span>
            f<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">//printf(&quot;minvcos=%f,minvlen=%f\\n&quot;, minvcos, minvlen);</span>
        <span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>p1<span class="token operator">==</span>p0<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token comment">/*
        while(!bq.empty())
        {
            node tmpp = bq.front();
            printf(&quot;(%f,%f)\\n&quot;, tmpp.x, tmpp.y);
            bq.pop();
        }
        */</span>
        
        <span class="token comment">//凸包周长</span>
        <span class="token keyword">double</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        node fp<span class="token punctuation">,</span> ep<span class="token punctuation">;</span>
        fp <span class="token operator">=</span> p0<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>bq<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ep <span class="token operator">=</span> bq<span class="token punctuation">.</span><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            bq<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ans <span class="token operator">+=</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token function">vform</span><span class="token punctuation">(</span>fp<span class="token punctuation">,</span> ep<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fp <span class="token operator">=</span> ep<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f\\n&quot;</span><span class="token punctuation">,</span> ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
     
        <span class="token comment">/*
        //凸包面积
        double ans = 0;
        node fp = bq.front();
        bq.pop();
        node np = bq.front();
        bq.pop();
        while(!bq.empty())
        {
            node ep = bq.front();
            bq.pop();
            ans += area(fp,np,ep);
            np = ep;
            //printf(&quot;(%f,%f)\\n&quot;, tmpp.x, tmpp.y);
        }
        printf(&quot;%d\\n&quot;, (int)ans/50);
        */</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-graham-算法" tabindex="-1"><a class="header-anchor" href="#_2-graham-算法" aria-hidden="true">#</a> 2. Graham 算法</h2><h4 id="_2-1-思想" tabindex="-1"><a class="header-anchor" href="#_2-1-思想" aria-hidden="true">#</a> 2.1 思想</h4><p>把所有点放在二维坐标系中，则纵坐标最小的点一定是凸包上的点，记为 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}"> 。计算各个点相对 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}"> 的幅角，按从小到大的顺序对各个点排序。（当幅角相同是，距离 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}"> 比较近的排在前面）则幅角最小的点和最大的点一定在凸包上。取幅角最小的点记为 <img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}">，将 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}">、<img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}"> 入栈。连接栈顶的点和次栈顶的点，得到直线 <img src="https://math.jianshu.com/math?formula=l" alt="l">，看当前点是在直线的右边还是左边，在右边则栈顶元素不是凸包上的点，将其弹出，返回继续执行。如果在左边，则当前点是凸包上的点。一直到幅角最大的那个点为之。</p><ul><li>叉积原理<br> 两个向量的叉积 <img src="https://math.jianshu.com/math?formula={P_1 \\times P_2 %3D x_1y_2 - x_2y_1}" alt="{P_1 imes P_2 = x_1y_2 - x_2y_1}">，其中用结果的正负代表叉乘结果的方向。该公式本质是两个三维向量（<img src="https://math.jianshu.com/math?formula=z" alt="z"> 轴分量为0）叉乘的结果（原来结果为<img src="https://math.jianshu.com/math?formula={(x_1y_2 - x_2y_1)\\cdot \\vec{k}}" alt="{(x_1y_2 - x_2y_1)dot ec{k}}">，其中 <img src="https://math.jianshu.com/math?formula={\\vec{k}}" alt="{ec{k}}"> 是 <img src="https://math.jianshu.com/math?formula=z" alt="z"> 轴单位正向量）。</li></ul><h4 id="_2-2-代码" tabindex="-1"><a class="header-anchor" href="#_2-2-代码" aria-hidden="true">#</a> 2.2 代码</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/************************************************************************
                        Graham Scan算法
时间复杂度：O(nlogn)。Scan过程为O(n)，预处理排序为O(nlogn)。
预处理排序：极角排序。
************************************************************************/</span>

<span class="token comment">//#include &lt;bits/stdc++.h&gt;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stack&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdio&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cmath&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>
 
using namespace std<span class="token punctuation">;</span>
 
<span class="token keyword">const</span> <span class="token keyword">int</span> MAXN <span class="token operator">=</span> <span class="token number">10005</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> MAXD <span class="token operator">=</span> <span class="token number">1e9</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> ACCUR <span class="token operator">=</span> <span class="token number">1e-9</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">node</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>        <span class="token comment">//点的坐标</span>
    bool operator <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>y<span class="token operator">-</span>n<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token keyword">return</span> x <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        <span class="token keyword">else</span>    <span class="token keyword">return</span> y <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    bool operator <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>x<span class="token operator">-</span>n<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>y<span class="token operator">-</span>n<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">vect</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> v<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> v<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//叉积</span>
    <span class="token keyword">double</span> operator <span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x<span class="token operator">*</span>v<span class="token punctuation">.</span>y <span class="token operator">-</span> y<span class="token operator">*</span>v<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
node p0<span class="token punctuation">;</span>            <span class="token comment">//纵坐标最小的点</span>
 
bool <span class="token function">equal</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">double</span> d1<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">double</span> d2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>d1<span class="token operator">-</span>d2<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
vect <span class="token function">vform</span><span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    vect tmpv<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>x <span class="token operator">=</span> n2<span class="token punctuation">.</span>x <span class="token operator">-</span> n1<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>y <span class="token operator">=</span> n2<span class="token punctuation">.</span>y <span class="token operator">-</span> n1<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token keyword">return</span> tmpv<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>x<span class="token operator">*</span>v<span class="token punctuation">.</span>x<span class="token operator">+</span>v<span class="token punctuation">.</span>y<span class="token operator">*</span>v<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">vcos</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v1<span class="token punctuation">,</span> <span class="token keyword">const</span> vect v2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token punctuation">(</span><span class="token function">vlen</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span><span class="token operator">*</span><span class="token function">vlen</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//极角排序</span>
bool <span class="token function">cmpp</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node p1<span class="token punctuation">,</span> <span class="token keyword">const</span> node p2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
    v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p0<span class="token punctuation">,</span> p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p0<span class="token punctuation">,</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">equal</span><span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">vlen</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">vlen</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> v1<span class="token operator">*</span>v2 <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//叉积判断点（v2的终点）在v1左边还是右边</span>
bool <span class="token function">cmpv</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vect v1<span class="token punctuation">,</span> <span class="token keyword">const</span> vect v2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>v1<span class="token operator">*</span>v2 <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">equal</span><span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">area</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">,</span> <span class="token keyword">const</span> node n3<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/*
    //海伦公式
    double b1, b2, b3;
    b1 = vlen(vform(n1,n2));
    b2 = vlen(vform(n2,n3));
    b3 = vlen(vform(n3,n1));
    double b = (b1+b2+b3)/2;
    return sqrt(b*(b-b1)*(b-b2)*(b-b3));
    */</span>
 
    <span class="token comment">//叉积公式（叉积为平行四边形面积）</span>
    vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
    v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
node p<span class="token punctuation">[</span>MAXN<span class="token punctuation">]</span><span class="token punctuation">;</span>           <span class="token comment">//点集</span>
stack <span class="token operator">&lt;</span>node<span class="token operator">&gt;</span> bs<span class="token punctuation">;</span>        <span class="token comment">//凸包顶点集</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> n<span class="token punctuation">;</span>
    p0<span class="token punctuation">.</span>x <span class="token operator">=</span> p0<span class="token punctuation">.</span>y <span class="token operator">=</span> MAXD<span class="token punctuation">;</span> <span class="token comment">//初始化第一个点</span>
    <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%lf%lf&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> p0<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            p0 <span class="token operator">=</span> p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">sort</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span>p<span class="token operator">+</span>n<span class="token punctuation">,</span>cmpp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&lt;</span> n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//取出栈顶和次栈顶</span>
        node p1<span class="token punctuation">,</span> p2<span class="token punctuation">;</span>
        p2 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        p1 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//构造叉乘向量</span>
        vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
        v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p2<span class="token punctuation">,</span>p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">cmpv</span><span class="token punctuation">(</span>v1<span class="token punctuation">,</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token operator">++</span>j<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
    while(!bs.empty())
    {
        node tmpp = bs.top();
        printf(&quot;(%f,%f)\\n&quot;, tmpp.x, tmpp.y);
        bs.pop();
    }
    */</span>
    <span class="token comment">/*
    //计算周长
    double ans = 0;
    node fp, ep;
    fp = p[0];
    while(!bs.empty())
    {
        ep = bs.top();
        bs.pop();
        ans += vlen(vform(fp, ep));
        fp = ep;
    }
    printf(&quot;%.2f\\n&quot;, ans);
    */</span>
 
    <span class="token comment">//计算面积</span>
    <span class="token keyword">double</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    node fp<span class="token punctuation">,</span> np<span class="token punctuation">,</span> ep<span class="token punctuation">;</span>
    fp <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    np <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>bs<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ep <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ans <span class="token operator">+=</span> <span class="token function">area</span><span class="token punctuation">(</span>fp<span class="token punctuation">,</span>np<span class="token punctuation">,</span>ep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        np <span class="token operator">=</span> ep<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ans<span class="token operator">/</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-andrew-算法" tabindex="-1"><a class="header-anchor" href="#_3-andrew-算法" aria-hidden="true">#</a> 3. Andrew 算法</h2><h4 id="_3-1-思想" tabindex="-1"><a class="header-anchor" href="#_3-1-思想" aria-hidden="true">#</a> 3.1 思想</h4><p>预处理排序改为水平排序，按照横坐标从小到大进行排序，横坐标相同则按纵坐标从小到大排。按照 <strong>graham</strong> 算法思想从 <img src="https://math.jianshu.com/math?formula={p_0}" alt="{p_0}">、<img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}"> 扫描所有点得到下凸包，再从 <img src="https://math.jianshu.com/math?formula={p_{n-1}}" alt="{p_{n-1}}">、<img src="https://math.jianshu.com/math?formula={p_{n-2}}" alt="{p_{n-2}}"> 扫描所有点得到上凸包，二者结合即为整个凸包。（注意：这里的 <img src="https://math.jianshu.com/math?formula={p_1}" alt="{p_1}"> 不一定在凸包里）</p><h4 id="_3-2-代码" tabindex="-1"><a class="header-anchor" href="#_3-2-代码" aria-hidden="true">#</a> 3.2 代码</h4><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/************************************************************************
                    Andrew算法（Graham Scan算法变种）
时间复杂度：O(nlogn)。Scan过程为O(n)，预处理排序为O(nlogn)。
预处理排序：水平排序排序。
************************************************************************/</span>
 
<span class="token comment">//#include &lt;bits/stdc++.h&gt;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stack&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdio&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cmath&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;algorithm&gt;</span></span>
 
using namespace std<span class="token punctuation">;</span>
 
<span class="token keyword">const</span> <span class="token keyword">int</span> MAXN <span class="token operator">=</span> <span class="token number">10005</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> MAXD <span class="token operator">=</span> <span class="token number">1e9</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">double</span> ACCUR <span class="token operator">=</span> <span class="token number">1e-9</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">node</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>        <span class="token comment">//点的坐标</span>
    <span class="token comment">//水平排序（与极角排序不一样，只能确定p0和pn-1在凸包内）</span>
    bool operator <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>x<span class="token operator">-</span>n<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token keyword">return</span> y <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
        <span class="token keyword">else</span>    <span class="token keyword">return</span> x <span class="token operator">&lt;</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    bool operator <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>x<span class="token operator">-</span>n<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>y<span class="token operator">-</span>n<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> n<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> n<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">vect</span>
<span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token keyword">void</span> operator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        x <span class="token operator">=</span> v<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> v<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//叉积</span>
    <span class="token keyword">double</span> operator <span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x<span class="token operator">*</span>v<span class="token punctuation">.</span>y <span class="token operator">-</span> y<span class="token operator">*</span>v<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
bool <span class="token function">equal</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">double</span> d1<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">double</span> d2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>d1<span class="token operator">-</span>d2<span class="token punctuation">)</span> <span class="token operator">&lt;</span> ACCUR<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
vect <span class="token function">vform</span><span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    vect tmpv<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>x <span class="token operator">=</span> n2<span class="token punctuation">.</span>x <span class="token operator">-</span> n1<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
    tmpv<span class="token punctuation">.</span>y <span class="token operator">=</span> n2<span class="token punctuation">.</span>y <span class="token operator">-</span> n1<span class="token punctuation">.</span>y<span class="token punctuation">;</span>
    <span class="token keyword">return</span> tmpv<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//计算向量长度</span>
<span class="token keyword">double</span> <span class="token function">vlen</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">sqrt</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>x<span class="token operator">*</span>v<span class="token punctuation">.</span>x<span class="token operator">+</span>v<span class="token punctuation">.</span>y<span class="token operator">*</span>v<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//计算向量夹角余弦值</span>
<span class="token keyword">double</span> <span class="token function">vcos</span><span class="token punctuation">(</span><span class="token keyword">const</span> vect v1<span class="token punctuation">,</span> <span class="token keyword">const</span> vect v2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token punctuation">(</span><span class="token function">vlen</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span><span class="token operator">*</span><span class="token function">vlen</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
//极角排序
bool cmpp (const node p1, const node p2)
{
    vect v1, v2;
    v1 = vform(p0, p1);
    v2 = vform(p0, p2);
    if (equal(v1*v2,0))
    {
        return vlen(v1) &lt; vlen(v2);
    }
    else
    {
        return v1*v2 &gt; 0;
    }
}
*/</span>
<span class="token comment">//叉积判断点（v2的终点）在v1左边还是右边</span>
bool <span class="token function">cmpv</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vect v1<span class="token punctuation">,</span> <span class="token keyword">const</span> vect v2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>v1<span class="token operator">*</span>v2 <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">equal</span><span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">double</span> <span class="token function">area</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node n1<span class="token punctuation">,</span> <span class="token keyword">const</span> node n2<span class="token punctuation">,</span> <span class="token keyword">const</span> node n3<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/*
    //海伦公式
    double b1, b2, b3;
    b1 = vlen(vform(n1,n2));
    b2 = vlen(vform(n2,n3));
    b3 = vlen(vform(n3,n1));
    double b = (b1+b2+b3)/2;
    return sqrt(b*(b-b1)*(b-b2)*(b-b3));
    */</span>
 
    <span class="token comment">//叉积公式（叉积为平行四边形面积）</span>
    vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
    v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">abs</span><span class="token punctuation">(</span>v1<span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
node p<span class="token punctuation">[</span>MAXN<span class="token punctuation">]</span><span class="token punctuation">;</span>           <span class="token comment">//点集</span>
stack <span class="token operator">&lt;</span>node<span class="token operator">&gt;</span> bs<span class="token punctuation">;</span>        <span class="token comment">//凸包顶点集</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> n<span class="token punctuation">;</span>
    <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%lf%lf&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">sort</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span>p<span class="token operator">+</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//正向扫描（上凸包）</span>
    bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&lt;</span> n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//取出栈顶和次栈顶</span>
        node p1<span class="token punctuation">,</span> p2<span class="token punctuation">;</span>
        p2 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//p1不一定在凸包中</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token operator">++</span>j<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            p1 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//构造叉乘向量</span>
            vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
            v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p2<span class="token punctuation">,</span>p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">cmpv</span><span class="token punctuation">(</span>v1<span class="token punctuation">,</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
                bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token operator">++</span>j<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//反向扫描（下凸包）</span>
    <span class="token keyword">int</span> k <span class="token operator">=</span> n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>k <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//取出栈顶和次栈顶</span>
        node p1<span class="token punctuation">,</span> p2<span class="token punctuation">;</span>
        p2 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        p1 <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//构造叉乘向量</span>
        vect v1<span class="token punctuation">,</span> v2<span class="token punctuation">;</span>
        v1 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        v2 <span class="token operator">=</span> <span class="token function">vform</span><span class="token punctuation">(</span>p2<span class="token punctuation">,</span>p<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">cmpv</span><span class="token punctuation">(</span>v1<span class="token punctuation">,</span>v2<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            bs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token operator">--</span>k<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//p0重复进栈一次</span>
 
    <span class="token comment">/*
    while(!bs.empty())
    {
        node tmpp = bs.top();
        printf(&quot;(%f,%f)\\n&quot;, tmpp.x, tmpp.y);
        bs.pop();
    }
    */</span>
    <span class="token comment">/*
    //计算周长
    double ans = 0;
    node fp, ep;
    fp = p[0];
    while(!bs.empty())
    {
        ep = bs.top();
        bs.pop();
        ans += vlen(vform(fp, ep));
        fp = ep;
    }
    printf(&quot;%.2f\\n&quot;, ans);
    */</span>
    
    <span class="token comment">//计算面积</span>
    <span class="token keyword">double</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    node fp<span class="token punctuation">,</span> np<span class="token punctuation">,</span> ep<span class="token punctuation">;</span>
    fp <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    np <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>bs<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ep <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ans <span class="token operator">+=</span> <span class="token function">area</span><span class="token punctuation">(</span>fp<span class="token punctuation">,</span>np<span class="token punctuation">,</span>ep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        np <span class="token operator">=</span> ep<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ans<span class="token operator">/</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),e=[o];function c(i,l){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","求凸包.html.vue"]]);export{r as default};
