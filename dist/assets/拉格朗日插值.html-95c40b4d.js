import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,f as i}from"./app-1ed3f6c2.js";const s={},l=i(`<h1 id="拉格朗日插值" tabindex="-1"><a class="header-anchor" href="#拉格朗日插值" aria-hidden="true">#</a> 拉格朗日插值</h1><h2 id="_1-1插值多项式" tabindex="-1"><a class="header-anchor" href="#_1-1插值多项式" aria-hidden="true">#</a> 1.1插值多项式</h2><p>用多项式作为研究插值的工具，称为代数插值。其基本问题是：已知函数<img src="https://math.jianshu.com/math?formula=f(x)" alt="f(x)">在区间<img src="https://math.jianshu.com/math?formula=[a%2C b]" alt="[a, b]">上<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个不同点<img src="https://math.jianshu.com/math?formula=x_{0}%2C x_{1}%2C \\cdots%2C x_{n}" alt="x_{0}, x_{1}, dots, x_{n}">处的函数值<img src="https://math.jianshu.com/math?formula=y_{i}%3Df\\left(x_{i}\\right)(i%3D0%2C1%2C \\cdots%2C n)" alt="y_{i}=feft(x_{i}ight)(i=0,1, dots, n)">，求一个至多<img src="https://math.jianshu.com/math?formula=n" alt="n"> 次多项式：<br><img src="https://math.jianshu.com/math?formula=\\varphi_{n}(x)%3Da_{0}%2Ba_{1} x%2B\\cdots%2Ba_{n} x^{n}（1）" alt="arphi_{n}(x)=a_{0}+a_{1} x+dots+a_{n} x^{n}（1）"><br> 使其在给定点处与<img src="https://math.jianshu.com/math?formula=f(x)" alt="f(x)">同值，即满足插值条件：<br><img src="https://math.jianshu.com/math?formula=\\varphi_{n}\\left(x_{i}\\right)%3Df\\left(x_{i}\\right)%3Dy_{i} \\quad(i%3D0%2C1%2C \\cdots%2C n)（2）" alt="arphi_{n}eft(x_{i}ight)=feft(x_{i}ight)=y_{i} uad(i=0,1, dots, n)（2）"></p><blockquote><p><img src="https://math.jianshu.com/math?formula=\\varphi_{n}(x)" alt="arphi_{n}(x)">称为<strong>插值多项式</strong>，<img src="https://math.jianshu.com/math?formula=x_{i}(i%3D0%2C1%2C \\cdots%2C n)" alt="x_{i}(i=0,1, dots, n)">称为<strong>插值节点</strong>，简称<strong>节点</strong>，<img src="https://math.jianshu.com/math?formula=[a%2C b]" alt="[a, b]">称为<strong>插值区间</strong>。从几何上看，<img src="https://math.jianshu.com/math?formula=n" alt="n">次多项式插值就是过<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个点，作一条多项式曲线<img src="https://math.jianshu.com/math?formula=y%3D\\varphi_{n}(x)" alt="y=arphi_{n}(x)">近似曲线<img src="https://math.jianshu.com/math?formula=y%3Df(x)" alt="y=f(x)">。</p></blockquote><p><img src="https://math.jianshu.com/math?formula=n" alt="n">次多项式（1）有<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个待定系数，由插值条件（2）恰好给出<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个方程：<br><img src="https://math.jianshu.com/math?formula=\\left\\{\\begin{array}{l}{a_{0}%2Ba_{1} x_{0}%2Ba_{2} x_{0}^{2}%2B\\cdots%2Ba_{n} x_{0}^{n}%3Dy_{0}} \\\\ {a_{0}%2Ba_{1} x_{1}%2Ba_{2} x_{1}^{2}%2B\\cdots%2Ba_{n} x_{1}^{n}%3Dy_{1}} \\\\ {\\ldots \\ldots \\ldots \\ldots \\ldots \\ldots \\ldots \\ldots \\ldots \\ldots \\ldots} \\\\ {a_{0}%2Ba_{1} x_{n}%2Ba_{2} x_{n}^{2}%2B\\cdots%2Ba_{n} x_{n}^{n}%3Dy_{n}}\\end{array}\\right.（3）" alt="eftegin{array}{l}{a_{0}+a_{1} x_{0}+a_{2} x_{0}^{2}+dots+a_{n} x_{0}^{n}=y_{0}}  {a_{0}+a_{1} x_{1}+a_{2} x_{1}^{2}+dots+a_{n} x_{1}^{n}=y_{1}}  {dots dots dots dots dots dots dots dots dots dots dots}  {a_{0}+a_{1} x_{n}+a_{2} x_{n}^{2}+dots+a_{n} x_{n}^{n}=y_{n}}nd{array}ight.（3）"></p><p>记此方程组的系数矩阵为<img src="https://math.jianshu.com/math?formula=A" alt="A">，则：<br><img src="https://math.jianshu.com/math?formula=\\operatorname{det}(A)%3D\\left|\\begin{array}{ccccc}{1} %26 {x_{0}} %26 {x_{0}^{2}} %26 {\\cdots} %26 {x_{0}^{n}} \\\\ {1} %26 {x_{1}} %26 {x_{1}^{2}} %26 {\\cdots} %26 {x_{1}^{n}} \\\\ {} %26 {\\cdots} %26 {\\cdots} %26 {\\cdots} %26 {\\cdots} \\\\ {1} %26 {x_{n}} %26 {x_{n}^{2}} %26 {\\cdots} %26 {x_{n}^{n}}\\end{array}\\right|" alt="peratorname{det}(A)=eft|egin{array}{ccccc}{1} &amp; {x_{0}} &amp; {x_{0}^{2}} &amp; {dots} &amp; {x_{0}^{n}}  {1} &amp; {x_{1}} &amp; {x_{1}^{2}} &amp; {dots} &amp; {x_{1}^{n}}  {} &amp; {dots} &amp; {dots} &amp; {dots} &amp; {dots}  {1} &amp; {x_{n}} &amp; {x_{n}^{2}} &amp; {dots} &amp; {x_{n}^{n}}nd{array}ight|"></p><p>称为范德蒙特行列式。当<img src="https://math.jianshu.com/math?formula=x_{0}%2C x_{1}%2C \\cdots%2C x_{n}" alt="x_{0}, x_{1}, dots, x_{n}">互不相同时，此行列式值不为零。因此方程组（3）有唯一解。这表明，只要<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个节点互不相同，满足插值要求（2）的<br> 插值多项式（1）是唯一的。</p><p>插值多项式与被插函数之间的差：<br><img src="https://math.jianshu.com/math?formula=R_{n}(x)%3Df(x)-\\varphi_{n}(x)" alt="R_{n}(x)=f(x)-arphi_{n}(x)"></p><p>称为截断误差，又称为插值余项。当<img src="https://math.jianshu.com/math?formula=f(x)" alt="f(x)">充分光滑时，<br><img src="https://math.jianshu.com/math?formula=R_{n}(x)%3Df(x)-L_{n}(x)%3D\\frac{f^{(n%2B1)}(\\xi)}{(n%2B1) !} \\omega_{n%2B1}(x)%2C \\xi \\in(a%2C b)" alt="R_{n}(x)=f(x)-L_{n}(x)=rac{f^{(n+1)}(i)}{(n+1) !} mega_{n+1}(x), i n(a, b)"><br> 其中，<br><img src="https://math.jianshu.com/math?formula=\\omega_{n%2B1}(x)%3D\\prod_{j%3D0}^{n}\\left(x-x_{j}\\right)" alt="mega_{n+1}(x)=rod_{j=0}^{n}eft(x-x_{j}ight)"></p><h2 id="_1-2-拉格朗日插值多项式" tabindex="-1"><a class="header-anchor" href="#_1-2-拉格朗日插值多项式" aria-hidden="true">#</a> 1.2.拉格朗日插值多项式</h2><p>实际上比较方便的作法不是解方程（3）求待定系数，而是先构造一组基函数：<br><img src="https://math.jianshu.com/math?formula=\\begin{aligned} l_{i}(x) %26%3D\\frac{\\left(x-x_{0}\\right) \\cdots\\left(x-x_{i-1}\\right)\\left(x-x_{i%2B1}\\right) \\cdots\\left(x-x_{n}\\right)}{\\left(x_{i}-x_{0}\\right) \\cdots\\left(x_{i}-x_{i-1}\\right)\\left(x_{i}-x_{i%2B1}\\right) \\cdots\\left(x_{i}-x_{n}\\right)} \\\\ %26%3D\\prod_{j%3D0 \\atop j \\neq i}^{n} \\frac{x-x_{j}}{x_{i}-x_{j}}%2C \\quad(i%3D0%2C1%2C \\cdots%2C n) \\end{aligned}" alt="egin{aligned} l_{i}(x) &amp;=rac{eft(x-x_{0}ight) dotseft(x-x_{i-1}ight)eft(x-x_{i+1}ight) dotseft(x-x_{n}ight)}{eft(x_{i}-x_{0}ight) dotseft(x_{i}-x_{i-1}ight)eft(x_{i}-x_{i+1}ight) dotseft(x_{i}-x_{n}ight)}  &amp;=rod_{j=0 top j eq i}^{n} rac{x-x_{j}}{x_{i}-x_{j}}, uad(i=0,1, dots, n) nd{aligned}"><br><img src="https://math.jianshu.com/math?formula=l_{i}(x)" alt="l_{i}(x)">是<img src="https://math.jianshu.com/math?formula=n" alt="n">次多项式，满足：<br><img src="https://math.jianshu.com/math?formula=l_{i}\\left(x_{j}\\right)%3D\\left\\{\\begin{array}{ll}{0} %26 {j \\neq i} \\\\ {1} %26 {j%3Di}\\end{array}\\right." alt="l_{i}eft(x_{j}ight)=eftegin{array}{ll}{0} &amp; {j eq i}  {1} &amp; {j=i}nd{array}ight."><br> 令：<br><img src="https://math.jianshu.com/math?formula=L_{n}(x)%3D\\sum_{i%3D0}^{n} y_{i} l_{i}(x)%3D\\sum_{i%3D0}^{n} y_{i}\\left(\\prod_{j%3D0 \\atop j \\neq i}^{n} \\frac{x-x_{j}}{x_{i}-x_{j}}\\right)（4）" alt="L_{n}(x)=um_{i=0}^{n} y_{i} l_{i}(x)=um_{i=0}^{n} y_{i}eft(rod_{j=0 top j eq i}^{n} rac{x-x_{j}}{x_{i}-x_{j}}ight)（4）"></p><p>上式称为<img src="https://math.jianshu.com/math?formula=n" alt="n">次<img src="https://math.jianshu.com/math?formula=Lagrange" alt="Lagrange">插值多项式，由方程（3）解的唯一性，<img src="https://math.jianshu.com/math?formula=n%2B1" alt="n+1">个节点的 <img src="https://math.jianshu.com/math?formula=n" alt="n"> 次<img src="https://math.jianshu.com/math?formula=Lagrange" alt="Lagrange"> 插值多项式存在唯一。</p><p>伪代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LagrangeInterpolationPolynomia(ele, n, x[], y[]) 
//ele是需要预测的元素值，n是提供的值的数量，x[]与y[]分别存储着已知的x值与所对应的y值
	sum &lt;- 0
	k &lt;- 0
	while k &lt; n do
		t &lt;- 1
		j &lt;- 0
		while j &lt; n do
			if j != k
				t &lt;- ((ele - x[j])/(x[k] - x[j]))*t
				sum &lt;- t * y[k] + sum
			end
			j &lt;- j + 1
		end 
		k &lt;- k + 1
	end 
	return sum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>c++实现</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;iostream&gt;
using namespace std;
float LagrangeInterpolationPolynomia(float x,int n,float a[],float b[]);
 
int main ()
{
	float x,y,t,a[100],b[100];
	int i,j,k,n;
	cout &lt;&lt; &quot;输入n的值&quot;&lt;&lt;endl;
	cin &gt;&gt; n;
	cout &lt;&lt; &quot;输入x的值&quot;&lt;&lt;endl;
	cin &gt;&gt; x;
	y = 0;
	for (i=0;i&lt;n;i++)
	{
		cout&lt;&lt; &quot;输入x&quot;&lt;&lt;i&lt;&lt;&quot;的数据：&quot;;
		cin &gt;&gt; a[i];
		cout&lt;&lt; &quot;输入y&quot;&lt;&lt;i&lt;&lt;&quot;的数据：&quot;;
		cin &gt;&gt; b[i];
	}
	cout &lt;&lt; &quot;y=&quot;&lt;&lt;LagrangeInterpolationPolynomia(x,n,a,b)&lt;&lt;endl;
	return 0;
}
 
float LagrangeInterpolationPolynomia(float x,int n,float a[],float b[])
{
	int k;
	float t,y=0;
	int j;
	for (k = 0;k &lt; n;k++)
	{
		t = 1;
		for (j = 0;j &lt; n;j++)
		{
			if (j != k)
			t = ((x - a[j])/(a[k]-a[j]))*t;
		}
		y = t * b[k]+y;
		cout &lt;&lt; y &lt;&lt; endl;
	}
	return y;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),m=[l];function e(r,d){return a(),n("div",null,m)}const c=t(s,[["render",e],["__file","拉格朗日插值.html.vue"]]);export{c as default};
