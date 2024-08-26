import{_ as i,a as e,b as n,c as a}from"./graph_4-047e39f3.js";import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{o as r,c as s,f as t}from"./app-1ed3f6c2.js";const l={},c=t('<h2 id="基本认识" tabindex="-1"><a class="header-anchor" href="#基本认识" aria-hidden="true">#</a> 基本认识</h2><p>回溯算法（DFS 深度优先算法）实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。</p><h2 id="基本思想与原理" tabindex="-1"><a class="header-anchor" href="#基本思想与原理" aria-hidden="true">#</a> 基本思想与原理</h2><p>回溯法（DFS 深度优先算法）简单来说就是按照深度优先的顺序，穷举所有可能性的算法，但是回溯算法比暴力穷举法更高明的地方就是回溯算法可以随时判断当前状态是否符合问题的条件。一旦不符合条件，那么就退回到上一个状态，省去了继续往下探索的时间。<br><em>换句话说，回溯法可以理解为通过选择不同的岔路口寻找目的地，一个岔路口一个岔路口的去尝试找到目的地。如果走错了路，继续返回来找到岔路口的另一条路，直到找到目的地。省去了在错路上走下去的时间。</em></p><h2 id="适用的问题" tabindex="-1"><a class="header-anchor" href="#适用的问题" aria-hidden="true">#</a> 适用的问题</h2><p>如果一个问题是<strong>搜索求解类</strong>的问题，而且该问题的解是<strong>树状结构（不断扩张式向量）</strong>，该题就可以考虑使用回溯算法。</p><div style="text-align:center;"><img src="'+i+'" alt="ASIC Flow" width="200"><h4>图1 搜索求解类问题</h4></div><p>回溯算法的典型例题和适用特点</p><h2 id="求解的步骤与模板" tabindex="-1"><a class="header-anchor" href="#求解的步骤与模板" aria-hidden="true">#</a> 求解的步骤与模板</h2><h4 id="回溯函数的三个组成部分" tabindex="-1"><a class="header-anchor" href="#回溯函数的三个组成部分" aria-hidden="true">#</a> 回溯函数的三个组成部分：</h4><p>1.<strong>回溯出口</strong>：当找到了一个问题的解时，存储该解。</p><p>2.<strong>回溯主体</strong>：就是遍历当前的状态的所有子节点，并判断下一个状态是否是满足问题条件的，如果满足问题条件，那么进入下一个状态。</p><p>3.<strong>状态返回</strong>：如果当前状态不满足条件，那么返回到前一个状态。</p><h2 id="引例部分" tabindex="-1"><a class="header-anchor" href="#引例部分" aria-hidden="true">#</a> 引例部分</h2><p>*<strong>八皇后问题：*</strong><br> 八皇后问题是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出：在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法？</p><p><em><strong>解题思路：*</strong><br> 1.从棋盘的第一行开始，从第一个位置开始，依次判断当前位置是否能够放置皇后，判断的依据为：同该行之前的所有行中皇后的所在位置进行比较，如果在同一列，或者在同一条斜线上（斜线有两条，为正方形的两个对角线），都不符合要求，继续检验后序的位置。<br> 2.如果该行所有位置都不符合要求，则回溯到前一行，改变皇后的位置，继续试探。<br> 3.如果试探到最后一行，所有皇后摆放完毕，则直接打印出 8</em>8 的棋盘。最后一定要记得将棋盘恢复原样，避免影响下一次摆放。</p><h2 id="实战部分" tabindex="-1"><a class="header-anchor" href="#实战部分" aria-hidden="true">#</a> 实战部分</h2><div style="text-align:center;"><img src="'+e+'" alt="ASIC Flow" width="200"><h4>图2 实战问题</h4></div><p>*<em>解题思路：*</em><br> 这道题的思路是：以 target 为根结点，依次减去数组中的数字，直到小于0或者等于0，把等于0的结果记录到结果集中。<br> “解集不能包含重复的组合”，就提示我们得对数组先排个序（“升序”或者“降序”均可，下面示例中均使用“升序”）。<br> “candidates 中的每个数字在每个组合中只能使用一次”，那就按照顺序依次减去数组中的元素，递归求解即可：遇到0就结算且回溯，遇到负数也回溯。<br> candidates 中的数字可以重复，可以借助「LeetCode」第 47 题：“全排列 II”（后面刷题练习部分有链接） 的思想，在搜索的过程中，找到可能发生重复结果的分支，把它剪去。</p><div style="text-align:center;"><img src="'+n+'" alt="ASIC Flow" width="200"><h4>图3 剪枝</h4></div><p>这里借用Leetcode上一位大佬的图片来帮助理解</p><div style="text-align:center;"><img src="'+a+`" alt="ASIC Flow" width="200"><h4>图4 剪枝</h4></div><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Solution {
private:
    vector&lt;vector&lt;int&gt;&gt; res;
    vector&lt;int&gt; row;
    
    void combination(vector&lt;int&gt;&amp; candidates, int target,int index) {
        if(target&lt;0)
            return;
        if(target==0){
            res.push_back(row);
            return;
        }
        else{
            for(int i=index;i&lt;candidates.size();++i){
            	//去重，加快运行速度
                if(i&gt;index &amp;&amp; candidates[i]==candidates[i-1])
                    continue;
                row.push_back(candidates[i]);
                //此处要用i+1
                combination(candidates,target-candidates[i],i+1);
                row.pop_back();
            }
        }
            
    }
public:
    vector&lt;vector&lt;int&gt;&gt; combinationSum2(vector&lt;int&gt;&amp; candidates, int target) {
        sort(candidates.begin(),candidates.end());
        combination(candidates,target,0);
        return res;
    }
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),v=[c];function o(m,h){return r(),s("div",null,v)}const g=d(l,[["render",o],["__file","7_4_2_搜索回溯.html.vue"]]);export{g as default};
