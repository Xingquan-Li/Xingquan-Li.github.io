import{_ as i,a as n,b as e,c as l,d}from"./dp_18-dd1423f2.js";import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as v,f as r}from"./app-1ed3f6c2.js";const t={},m=r('<p>1、定义：规划中变量部分或全部定义成整数是，称为整数规划。</p><p>2、分类：纯整数规划和混合整数规划。</p><p>3、特点：</p><p>（1）原线性规划有最优解，当自变量限制为整数后：</p><p>​ a、原最优解全是整数，那最优解仍成立</p><p>​ b、整数规划没有可行解</p><p>​ c、有可行解，但是不是原最优解</p><p>4、求解方法分类</p><p>（1）分支定界法</p><p>（2）割平面法</p><p>（3）隐枚举法</p><p>（4）匈牙利法</p><p>（5）蒙特卡洛法</p><h3 id="分支定界法" tabindex="-1"><a class="header-anchor" href="#分支定界法" aria-hidden="true">#</a> 分支定界法</h3><h2 id="_1、算法如下-求解整数规划最大化问题" tabindex="-1"><a class="header-anchor" href="#_1、算法如下-求解整数规划最大化问题" aria-hidden="true">#</a> 1、算法如下（求解整数规划最大化问题）</h2><div style="text-align:center;"><img src="'+i+`" alt="ASIC Flow" width="200"><h4>图1 整数规划</h4></div><h2 id="matlab实现" tabindex="-1"><a class="header-anchor" href="#matlab实现" aria-hidden="true">#</a> MATLAB实现</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function r=checkint(x)
%判断x(i)是不是整数了。是的话r(i)返回1，不是的话，返回0

%输入参数：x   X向量
%输出参数：r   R向量

for i=1:length(x)
    if(min(abs(x(i)-floor(x(i))),abs(x(i)-ceil(x(i))))&lt;1e-3)
        r(i)=1;
    else
        r(i)=0;
    end
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function val=isrowinmat(arow,mat)
%用来判断mat中是否包含与arow一样的向量

%输入变量：arow    向量
%         mat     矩阵
%输出变量：val     1表示有，0表示没有
val=0;
rows=size(mat,1);
for i=1:rows
    temp=(mat(i,:)==arow);
    if length(find(temp==0))==0
        val=1;
        return;
    else
        val=0;
    end; 
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function [x,fval,exitflag,output,lambda]=linprogdis(ifint,f,A,b,Aeq,beq,lb,ub,x0,options)
% 用法
%    [x,fval,exitflag,output,lambda]=lpint(ifint.f,A,b,Aeq,beq)
%    [x,fval,exitflag,output,lambda]=lpint(ifint,f,A,b,Aeq,beq,lb)
%    [x,fval,exitflag,output,lambda]=lpint(ifint,f,A,b,Aeq,beq,lb,ub)
%    [x,fval,exitflag,output,lambda]=lpint(ifint,f,A,b,Aeq,beq,lb,ub,x0)
%    [x,fval,exitflag,output,lambda]=lpint(ifint,f,A,b,Aeq,beq,lb,ub,x0,options)

if nargin&lt;10, options=[];  end
if nargin&lt;9,  x0=[];       end
if nargin&lt;8,  ub=inf*ones(size(f));      end
if nargin&lt;7,  lb=zeros(size(f));      end

[x,fval,exitflag,output,lambda]=linprog(f,A,b,Aeq,beq,lb,ub,x0,options);

if exitflag&lt;=0        %表示线性规划没有最优解
    return 
end

v1=find(ifint==1);  %找到需要整数规划的变量的下标

temp=x(v1);%如果不是要求整数规划的就可以返回了。
if isempty(temp)
    return
end

v2=find(checkint(temp)==0);
if isempty(v2)   %都是整数，得到最众解
    return
end

k=v1(v2(1));

temp1=zeros(1,length(f));
temp1(k)=1;
low=floor(x(k));
if isrowinmat([temp1,low],[A,b])==1
    thisA=A;
    thisb=b;
else
    thisA=[A;temp1];
    thisb=b;
    thisb(end+1)=low;
end

[x1,fval1,exitflag1,output1,lambda1]=linprogdis(ifint,f,thisA,thisb,Aeq,beq,lb,ub,x0,options);


temp2=zeros(1,length(f));
temp2(k)=-1;
high=-ceil(x(k));
if isrowinmat([temp2,high],[A,b])==1
    thisA=A;
    thisb=b;
else
    thisA=[A;temp2];
    thisb=b;
    thisb(end+1)=high;
end

[x2,fval2,exitflag2,output2,lambda2]=linprogdis(ifint,f,thisA,thisb,Aeq,beq,lb,ub,x0,options);

if (isempty(v2) &amp;&amp; ((exitflag1&gt;0 &amp;&amp; exitflag2&lt;=0 &amp;&amp; fval&lt;=fval)||(exitflag2&gt;0 &amp;&amp; exitflag1&lt;=0 &amp;&amp; fval&lt;=fval2)||(exitflag1&gt;0 &amp;&amp; exitflag2&gt;0 &amp;&amp; fval&lt;=fval1 &amp;&amp; fval&lt;=fval2)))
    disp(&#39;error call&#39;);
    return ; %表示都是整数
end

if exitflag1&gt;0&amp;&amp;exitflag2&lt;=0
     x=x1;
     fval=fval1;
     exitflag=exitflag1;
     output=output1;
     lambda=lambda1;
elseif exitflag1&lt;=0&amp;&amp;exitflag2&gt;0
     x=x2;
     fval=fval2;
     exitflag=exitflag2;
     output=output2;
     lambda=lambda2;
elseif exitflag1&gt;0 &amp;&amp; exitflag2&gt;0
    if fval1&lt;fval2
        x=x1;
        fval=fval1;
        exitflag=exitflag1;
        output=output1;
        lambda=lambda1;
    else
         x=x2;
         fval=fval2;
         exitflag=exitflag2;
         output=output2;
         lambda=lambda2;
    end
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三、0-1型整数规划</p><p>1、定义：就是变量的取值只能是0-1，这样的话，其实我们可以将不同的整数规划转化成0-1规划。</p><p>2、实际问题：</p><div style="text-align:center;"><img src="`+n+'" alt="ASIC Flow" width="200"><h4>图2 整数规划</h4></div><p>​ 这里我们就可以直接列出一个是0-1规划的方程，设的变量xi，“1”表示被选中，“0”表示没被选中</p><p>3、相互排斥的约束条件可以转化成同类型的。</p><div style="text-align:center;"><img src="'+e+'" alt="ASIC Flow" width="200"><h4>图3 整数规划</h4></div><p>四、求解整数规划的3种方法</p><p>（1）穷举法，这种比较土= =，但是最有效，而且某些情况只能穷举。</p><p>（2）过渡隐枚举法</p><p>a、先试探性求一个可行解X（随便带入求值）</p><p>b、然后根据是求极大值还是极小值，如果是求极大值，那么凡是目标值&lt;X的解不必检验是否满足约束条件即可删除，如果是求极小值，那么凡是目标值&gt;X不必检验是否满足约束条件就可满足。</p><p>c、改进新的过滤条件</p><p>d、然后验证目标值，最终求得。</p><p>PS：怎么说呢，这个方法就是一种变相的穷举，如果运气不好，就会变成全部都穷举，但是因为是先比较目标值，所以可以减少计算量，因而还是有效的（但是要注意不要犯反复测验的错误）、</p><p>（3）蒙特卡洛法（随机抽样法）</p><p>就是选择不穷举全部点，而是采用随机的方式来抽取样本估计整体，如果样本足够大，可信度是很大的。</p><p>例如求解此题：</p><div style="text-align:center;"><img src="'+l+`" alt="ASIC Flow" width="200"><h4>图4 整数规划</h4></div><p>MATLAB编程求解：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function [ f,g ] = mengte( x )
%MENGTE 键入整数线性规划的目标函数和约束条件
%   f：指的是目标函数      向量
%   g：指的是约束条件      向量


f=x(1)^2+x(2)^2+3*x(3)^2+4*x(4)^2+2*x(5)^2-8*x(1)-2*x(2)-3*x(3)-x(4)-2*x(5);

g=[sum(x)-400
   x(1)+2*x(2)+2*x(3)+x(4)+6*x(5)-800
   2*x(1)+x(2)+6*x(3)-200
   x(3)+x(4)+5*x(5)-200];

end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rand(&#39;state&#39;,sum(clock));
p0=0;
tic
for i=1:10^6
    x=99*rand(5,1);
    x1=floor(x);x2=ceil(x);
    [f,g]=mengte(x1);
    if  sum(g&lt;=0)==4
        if  p0&lt;=f
            x0=x1;p0=f;
        end
    end
    [f,g]=mengte(x2);
    if  sum(g&lt;=0)==4
        if  p0&lt;=f
            x0=x2;p0=f;
        end
    end
end
    x0,p0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>五、0-1整数规划的求解</p><p>例如求解这个指派问题。</p><div style="text-align:center;"><img src="`+d+`" alt="ASIC Flow" width="200"><h4>图5 指派问题</h4></div><p>由于MATLAB里面有封装好的函数- -，我就不用C++再写了。。不过这个问题还是很容易写出来的，一些比赛题目也会出现的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>c=[3,8,2,10,3;
    8,7,2,9,7;
    6,4,2,7,5;
    8,4,2,3,5;
    9,10,6,9,10]


c=c(:);%就是变成列向量（提取矩阵的方法）
a=zeros(10,25);
for i=1:5
    a(i,(i-1)*5+1:1:5*i)=1;
    a(5+i,i:5:25)=1;
end
b=ones(10,1);
[x,y]=bintprog(c,[],[],a,b);
x=reshape(x,[5,5]),y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,47),u=[m];function b(c,p){return a(),v("div",null,u)}const g=s(t,[["render",b],["__file","整数规划.html.vue"]]);export{g as default};
