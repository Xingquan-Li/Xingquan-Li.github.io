import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as m,c as r,f as n,d as i,e as a}from"./app-1ed3f6c2.js";const e={},l=n('<h1 id="高斯消元" tabindex="-1"><a class="header-anchor" href="#高斯消元" aria-hidden="true">#</a> 高斯消元</h1><p>对一个线性方程组，比如：<br><img src="https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} %26x_1-2x_2%2Bx_3%26%3D0\\tag{1}\\\\ %262x_2-8x_3%26%3D8\\tag{2}\\\\ %265x_1\\quad\\quad-5x_3%26%3D10\\tag{3}\\\\ \\end{align} \\right." alt="eft egin{align} &amp;x_1-2x_2+x_3&amp;=0ag{1} &amp;2x_2-8x_3&amp;=8ag{2} &amp;5x_1uaduad-5x_3&amp;=10ag{3} nd{align} ight."><br> 现在我们想要解这个线性方程组，我们能做的是其中一个式子乘以一个数，与另一个式子相减，消去一个变量，重复上述步骤再消去另一个变量。这种解方程组的方式初中就已经学过，它被称为“消元”。<br> 比如对于上边的方程组，（1）+（2），消去变量<img src="https://math.jianshu.com/math?formula=x_2" alt="x_2">,得到新的方程<img src="https://math.jianshu.com/math?formula=x_1-7x_3%3D8" alt="x_1-7x_3=8">。再用新方程乘以5，再减去（3）式得到只含有x_3的式子<img src="https://math.jianshu.com/math?formula=-30x_3%3D30" alt="-30x_3=30">。解得<img src="https://math.jianshu.com/math?formula=x_3%3D-1" alt="x_3=-1">。再回代<img src="https://math.jianshu.com/math?formula=x_3" alt="x_3">解得<img src="https://math.jianshu.com/math?formula=x_1%3D1%2Cx_2%3D0" alt="x_1=1,x_2=0">。<br> 这个过程很简单，但想一想我们在消元的过程中做了哪些工作：</p><ol><li>行倍加变换（把某一行乘以一个数加到另一行上)</li><li>倍乘变换（某一行乘以一个非0的数）</li><li>行交换（两行对调位置）：在我们看来，这条变换我们并没有使用，但你确实可以在消元的过程中对任意俩个式子调换位置，这在矩阵运算中及其重要。</li></ol><p>我们把以上三种变换称为<strong>初等行变换</strong>,可以看出初等行变换不影响方程组的解集。</p><hr><p>接下来，我们将方程组的系数提取出来，并按照原来的位置放进第一个方框中，并在第二个方框中放入方程组右侧的常量。<br><img src="https://math.jianshu.com/math?formula=\\begin{array}{cc} \\underbrace{ \\begin{bmatrix} 1%26-2%261\\\\ 0%262%26-8\\\\ 5%260%26-5\\\\ \\end{bmatrix}}_{系数矩阵}%26 \\underbrace{ \\begin{bmatrix} 1%26-2%261%260\\\\ 0%262%26-8%268\\\\ 5%260%26-5%2610\\\\ \\end{bmatrix}}_{增广矩阵}\\\\ \\end{array}" alt="egin{array}{cc} nderbrace{ egin{bmatrix} 1&amp;-2&amp;1 0&amp;2&amp;-8 5&amp;0&amp;-5 nd{bmatrix}}{系数矩阵}&amp; nderbrace{ egin{bmatrix} 1&amp;-2&amp;1&amp;0 0&amp;2&amp;-8&amp;8 5&amp;0&amp;-5&amp;10 nd{bmatrix}}{增广矩阵} nd{array}"><br> 我们把这种一堆数加一个方框的列表称为矩阵。对于求解线性方程组而言我们更喜欢增广矩阵的形式。考虑如果我们把矩阵的每一行看作一个方程，我们对这些行做初等行变换，根据我们所作的初等行变换的次数和方式，我们会得到许多新的矩阵，而这些矩阵和原矩阵必然有着相同的解集。<br><strong>因此我们说如果一个矩阵经过了若干次初等行变换变为了另一个矩阵，我们就称这两个矩阵是行等价的。行等价的矩阵具有完全相同的解集。</strong></p><hr><p>这样一来，对方程组进行消元就转换为了对矩阵进行消元。在处理及其大的方程组和解存与唯一性问题上，矩阵消元法远比传统的解方程组方便的多。</p><h2 id="方程组的系统解法—高斯消元法" tabindex="-1"><a class="header-anchor" href="#方程组的系统解法—高斯消元法" aria-hidden="true">#</a> 方程组的系统解法—高斯消元法</h2><p><img src="https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} 3x_2-6x_3%2B6x_4%2B4x_5%26%3D-5\\\\ 3x_1-7x_2%2B8x_3-5x_4%2B8x_5%26%3D9\\\\ 3x_1-9x_2%2B12x_3-9x_4%2B6x_5%26%3D15\\\\ \\end{align} \\right.\\to" alt="eft egin{align} 3x_2-6x_3+6x_4+4x_5&amp;=-5 3x_1-7x_2+8x_3-5x_4+8x_5&amp;=9 3x_1-9x_2+12x_3-9x_4+6x_5&amp;=15 nd{align} ight.o"><br><img src="https://math.jianshu.com/math?formula=\\underbrace{ \\begin{bmatrix} 0%263%26-6%266%264%26-5\\\\ 3%26-7%268%26-5%268%269\\\\ 3%26-9%2612%26-9%266%2615\\\\ \\end{bmatrix}}_{增广矩阵}\\implies" alt="nderbrace{ egin{bmatrix} 0&amp;3&amp;-6&amp;6&amp;4&amp;-5 3&amp;-7&amp;8&amp;-5&amp;8&amp;9 3&amp;-9&amp;12&amp;-9&amp;6&amp;15 nd{bmatrix}}_{增广矩阵}mplies"><br> 通过初等行变换将增广矩阵化为阶梯型矩阵的形式：<br><img src="https://math.jianshu.com/math?formula=\\underbrace{\\begin{bmatrix} \\fbox{3}%26-9%2612%26-9%266%2615\\\\ 0%26\\fbox{2}%26-4%264%262%26-6\\\\ 0%260%260%260%26\\fbox{1}%264\\\\ \\end{bmatrix}}_{阶梯型矩阵（REF）}\\implies" alt="nderbrace{egin{bmatrix} box{3}&amp;-9&amp;12&amp;-9&amp;6&amp;15 0&amp;box{2}&amp;-4&amp;4&amp;2&amp;-6 0&amp;0&amp;0&amp;0&amp;box{1}&amp;4 nd{bmatrix}}_{阶梯型矩阵（REF）}mplies"></p><p><img src="https://math.jianshu.com/math?formula=\\fbox{3}%2C\\fbox{2}%2C\\fbox{1}" alt="box{3},box{2},box{1}">是阶梯型矩阵每一行的先导元素，我们称之为<strong>主元</strong>，主元所在的列称为<strong>主列</strong>,主元不在的列称为<strong>自由列</strong>。主列对应的变量称为<strong>基本变量</strong>，自由列对应的变量称为<strong>自由变量。</strong><br> 接下来我们通过初等行变换把<strong>主元位置的元素化为1，把主列中除主元外其他元素化为0</strong>。得到的矩阵称为简化行阶梯型矩阵。<br><img src="https://math.jianshu.com/math?formula=\\underbrace{\\begin{bmatrix} \\fbox{1}%260%26-2%263%260%26-24\\\\ 0%26\\fbox{1}%26-2%262%260%26-7\\\\ 0%260%260%260%26\\fbox{1}%264\\\\ \\end{bmatrix}}_{简化阶梯型矩阵（RREF）}" alt="nderbrace{egin{bmatrix} box{1}&amp;0&amp;-2&amp;3&amp;0&amp;-24 0&amp;box{1}&amp;-2&amp;2&amp;0&amp;-7 0&amp;0&amp;0&amp;0&amp;box{1}&amp;4 nd{bmatrix}}_{简化阶梯型矩阵（RREF）}"><br> 有简化行阶梯型矩阵我们得知：<br><img src="https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} x_1-2x_3%2B3x_4%26%3D-24\\\\ x2-2x_3%2B2x_4%26%3D-7\\\\ x_5%26%3D4\\\\ \\end{align}\\right." alt="eft egin{align} x_1-2x_3+3x_4&amp;=-24 x2-2x_3+2x_4&amp;=-7 x_5&amp;=4 nd{align}ight."><br> 解得：<br><img src="https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} %26x_1%3D2x_3-3x_4-24\\\\ %26x2%3D2x_3-2x_4-7\\\\ %26x_3是自由变量\\\\ %26x_4是自由变量\\\\ %26x_5%3D4\\\\ \\end{align}\\right." alt="eft egin{align} &amp;x_1=2x_3-3x_4-24 &amp;x2=2x_3-2x_4-7 &amp;x_3是自由变量 &amp;x_4是自由变量 &amp;x_5=4 nd{align}ight."><br> 这个解称为解的显式表达，只要两个自由变量得值确定，方程组的解就确定。因为存在了自由变量，所以这方程有无数个解。</p><hr><h4 id="矩阵方程与向量方程" tabindex="-1"><a class="header-anchor" href="#矩阵方程与向量方程" aria-hidden="true">#</a> 矩阵方程与向量方程</h4><p>对于方程组：<br><img src="https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} %26x_1-2x_2%2Bx_3%26%3D0\\\\ %262x_2-8x_3%26%3D8\\\\ %265x_1\\quad\\quad-5x_3%26%3D10\\\\ \\end{align} \\right." alt="eft egin{align} &amp;x_1-2x_2+x_3&amp;=0 &amp;2x_2-8x_3&amp;=8 &amp;5x_1uaduad-5x_3&amp;=10 nd{align} ight."><br> 我们有另外两种表达：<br><strong>矩阵方程</strong>：<br><img src="https://math.jianshu.com/math?formula=\\underbrace{ \\begin{align} \\underbrace{ \\begin{bmatrix} 1%26-2%261\\\\ 0%262%26-8\\\\ 5%260%26-5\\\\ \\end{bmatrix}}_{系数矩阵} %26 \\begin{bmatrix} x_1\\\\ x_2\\\\ x_3 \\end{bmatrix}%3D\\begin{bmatrix} 0\\\\ 8\\\\ 10 \\end{bmatrix} \\end{align}}_{AX%3Db}" alt="nderbrace{ egin{align} nderbrace{ egin{bmatrix} 1&amp;-2&amp;1 0&amp;2&amp;-8 5&amp;0&amp;-5 nd{bmatrix}}{系数矩阵} &amp; egin{bmatrix} x_1 x_2 x_3 nd{bmatrix}=egin{bmatrix} 0 8 10 nd{bmatrix} nd{align}}{AX=b}"><br><strong>向量方程：</strong><br><img src="https://math.jianshu.com/math?formula=x_1\\begin{bmatrix} 1\\\\0\\\\5\\end{bmatrix}%2Bx_2\\begin{bmatrix} -2\\\\2\\\\0\\end{bmatrix}%2Bx_3\\begin{bmatrix} 1\\\\-8\\\\-5\\end{bmatrix}%3D\\begin{bmatrix}0\\\\8\\\\10\\\\\\end{bmatrix}" alt="x_1egin{bmatrix} 105nd{bmatrix}+x_2egin{bmatrix} -220nd{bmatrix}+x_3egin{bmatrix} 1-8-5nd{bmatrix}=egin{bmatrix}0810nd{bmatrix}"><br> 可以看出，矩阵与向量的乘积，是以X中元素为权的A中列向量的线性组合。<br><strong>向量的运算</strong></p>',14),s=i("ul",null,[i("li",{bmatrix:""},[a("加法："),i("img",{src:"https://math.jianshu.com/math?formula=\\begin{bmatrix}a\\\\b\\\\c\\end{bmatrix}%2B\\begin{bmatrix}d\\\\e\\\\f\\end{bmatrix}%3D\\begin{bmatrix}a%2Bd\\\\b%2Be\\\\c%2Bf\\end{bmatrix}",alt:"egin{bmatrix}abcnd{bmatrix}+egin{bmatrix}defnd{bmatrix}=egin{bmatrix}a+db+ec+fnd{bmatrix}"})]),i("li",null,[a("数乘："),i("img",{src:"https://math.jianshu.com/math?formula=k\\begin{bmatrix}a\\\\b\\\\c\\end{bmatrix}%3D\\begin{bmatrix}ka\\\\kb\\\\kc\\end{bmatrix}(k是常数)",alt:"kegin{bmatrix}abcnd{bmatrix}=egin{bmatrix}kakbkcnd{bmatrix}(k是常数)"}),i("br"),i("strong",null,"矩阵的线性性质"),i("br"),i("img",{src:"https://math.jianshu.com/math?formula=A(u%2Bv)%3DA(u)%2BA(v)",alt:"A(u+v)=A(u)+A(v)"}),i("br"),i("img",{src:"https://math.jianshu.com/math?formula=A(cu)%3DcA(u)",alt:"A(cu)=cA(u)"})])],-1),d=i("hr",null,null,-1),x=i("h4",{id:"解的隐式表达-参数向量形式",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#解的隐式表达-参数向量形式","aria-hidden":"true"},"#"),a(" 解的隐式表达：参数向量形式")],-1),b=i("p",{bmatrix:""},[a("对于方程的显式解："),i("br"),i("img",{src:"https://math.jianshu.com/math?formula=\\left\\{ \\begin{align} %26x_1%3D2x_3-3x_4-24\\\\ %26x2%3D2x_3-2x_4-7\\\\ %26x_3是自由变量\\\\ %26x_4是自由变量\\\\ %26x_5%3D4\\\\ \\end{align}\\right.",alt:"eft egin{align} &x_1=2x_3-3x_4-24 &x2=2x_3-2x_4-7 &x_3是自由变量 &x_4是自由变量 &x_5=4 nd{align}ight."}),i("br"),a(" 我们可以写为以自由变"),i("img",{src:"https://math.jianshu.com/math?formula=x_3%2Cx_4",alt:"x_3,x_4"}),a("为权的线性组合"),i("br"),i("img",{src:"https://math.jianshu.com/math?formula=x%3D\\begin{bmatrix} x_1\\\\x_2\\\\x_3\\\\x_4\\\\x_5\\end{bmatrix}%3Dx_3\\begin{bmatrix} 2\\\\2\\\\1\\\\0\\\\0\\end{bmatrix}%2Bx_4\\begin{bmatrix} -3\\\\-2\\\\0\\\\1\\\\0\\end{bmatrix}%2B\\begin{bmatrix} -24\\\\-7\\\\0\\\\0\\\\4\\end{bmatrix}",alt:"x=egin{bmatrix} x_1x_2x_3x_4x_5nd{bmatrix}=x_3egin{bmatrix} 22100nd{bmatrix}+x_4egin{bmatrix} -3-2010nd{bmatrix}+egin{bmatrix} -24-7004nd{bmatrix}"})],-1),c=n(`<h2 id="例题" tabindex="-1"><a class="header-anchor" href="#例题" aria-hidden="true">#</a> 例题</h2><p>poj1222</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//高斯消元 
#include&lt;iostream&gt;
#include&lt;cstring&gt;
using namespace std;

int a[31][31];//表示30个方程组 
int d[5][2] = {{0, 0}, {0, 1}, {0, -1}, {1, 0}, {-1, 0}};
int res[5][6];//结果 

void back () {
    for (int i = 29; i &gt;= 0; i--) {
        res[i / 6][i % 6] = a[i][30];
    }   
}

void gauss () {
    for (int i = 0; i &lt; 30; i++) {
        //行交换 
        int k = i;
        for (; k &lt; 30; k++) {
            if (a[k][i]) break;
        }
        for (int j = 0; j &lt;= 30; j++) {//att1:根据题意存在唯一解，所以这里k不会&gt;=30 不用再判断了
            swap(a[i][j], a[k][j]);
        }
        //消元--化成单位矩阵 
        for (int j = 0; j &lt; 30; j++) {//att1：从0开始 
            if (i == j) continue;//att2:别漏了 
            if (a[j][i]) {
                for (int k = i; k &lt;= 30; k++) {
                    a[j][k] ^= a[i][k];
                }
            }
        } 
    }
    back();
}

int main()
{
    int t, cnt = 0;
    cin &gt;&gt; t;
    while (t--) {
        memset(a, 0, sizeof(a));
        for (int i = 0; i &lt; 30; i++) {
            cin &gt;&gt; a[i][30];
        }
        for (int i = 0; i &lt; 5; i++) {
            for (int j = 0; j &lt; 6; j++) {
                int ti = i * 6 + j;
                for (int k = 0; k &lt; 5; k++) {
                    int tx = i + d[k][0];
                    int ty = j + d[k][1];
                    if (tx &lt; 0 || tx &gt; 4 || ty &lt; 0 || ty &gt; 5) continue;
                    a[ti][tx * 6 + ty] = 1;
                }
            }
        }
        
        gauss();
        cout &lt;&lt; &quot;PUZZLE #&quot; &lt;&lt; ++cnt &lt;&lt; endl;
        for (int i = 0; i &lt; 5; i++) {
            for (int j = 0; j &lt; 5; j++) {
                cout &lt;&lt; res[i][j] &lt;&lt; &#39; &#39;; 
            }
            cout &lt;&lt; res[i][5] &lt;&lt; endl;
        } 
    }   
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),_=[l,s,d,x,b,c];function u(g,h){return m(),r("div",null,_)}const p=t(e,[["render",u],["__file","高斯消元.html.vue"]]);export{p as default};
