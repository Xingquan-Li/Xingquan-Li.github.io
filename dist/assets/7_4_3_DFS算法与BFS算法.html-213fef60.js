import{_ as i}from"./graph_5-e5168bd6.js";import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as l,f as v}from"./app-1ed3f6c2.js";const s={},d=v('<h1 id="dfs算法" tabindex="-1"><a class="header-anchor" href="#dfs算法" aria-hidden="true">#</a> DFS算法</h1><p>DFS算法即：Depth First Search，深度优先搜索。这个算法的关键是解决“当下如何做”，至于下一步如何做和“当下如何做”是一样的，该算法从一个状态DFS(n)转移到下一个状态DFS（n+1），直到状态无法转移即到达临界点，然后回退到上一个状态，在上一个状态的基础上继续遍历其他状态，如此不断重复，直到找到最终解。如果算法有M个状态，每个状态有N种可能可以尝试，那么总的尝试次数是N^M 即M个N相乘。</p><p>算法的关注点：</p><ol><li>当下如何做，当下的状态如何处理</li><li>如何转移到下一个状态，下一个状态有哪些可能？</li><li>临界条件设定和dfs结束条件的设定以及处理</li><li>标志位的设置和复位，标记资源被占用，以及当前使用后及时释放，留给下一次使用。</li></ol><p>一般在进行DFS遍历的时候，会有一些限制条件，如已经用过的东西不能再使用，则需要对每次的使用做一个标记，然后转入到下一状态，并且从下一状态返回时候需要清除标记。</p><p>关键是分清<strong>状态</strong>和每种状态下的<strong>可能</strong>的区别。</p><h1 id="bfs算法" tabindex="-1"><a class="header-anchor" href="#bfs算法" aria-hidden="true">#</a> BFS算法</h1><p>我觉得有一种比喻对于 DFS 和 BFS 从方法论的角度解释很到位，DFS 就像是小明要在家里找到钥匙，因为对位置的不确定，所以一间一间的来找，深度遍历能确保小明走过所有的屋子。而 BFS 像是近视的小明的眼镜掉在了地上，小明肯定是先摸索离手比较近的位置，然后手慢慢向远方延伸，直至摸到眼镜，像是以小明为中心搜索圈不断扩大的过程。所以如果说 DFS 从遍历的层次结构上类似树的先序遍历，那么BFS算法按照里外顺序逐渐增加深度的做法，就像极了朴素的层次遍历，例如：</p><div style="text-align:center;"><img src="'+i+`" alt="ASIC Flow" width="200"><h4>图1 DFS和BFS算法</h4></div><p>把左图拉平，按照层序把结点排列下来，各节点的连接关系并没有变，图结构没有发生变化，但是这时，我们从A出发，按层序遍历可以得到顺序是 <strong>A B F C I G E D H</strong></p><p>结合上一篇文章的 DFS ，我们可以发现这两种算法的区别在每一个点上都能得以体现，比如 A 点，DFS 鼓励结点向着一个方向冲，BFS 则会在一个点上按照顶点下标次序遍历完所有没有访问过的结点，比如A点遍历完，马上开始扫描，如果 B F这两个点没有被宠幸过，那么一定要翻完 B、F 这两个点的牌子之后，才会继续访问第二层，即把A点相连的结点全部遍历完成才行，当然到了第二层 发现 B、F 早就被A安排过了，就不再进入这两个点的循环，后面的一样，这里就不再赘述。</p><p>我们回忆一下DFS算法，DFS沿着一个方向走最后是要走回头路的，因为它迟早会遍历到一个所有分支都被访问过的结点，那么要走回头路意味着我们实现 DFS 时应该选择后进先出的栈结构，而现在的 BFS 算法是每经过一个点就会遍历所有没访问过的点，同时，一个点如果已经访问完，那么它就没有利用价值了，所以应该使用队列先进先出的特点</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>例题：
《迷宫问题》
定义一个二维数组：

0 0 1 0 1 //0表示可走，1表示墙
0 1 1 1 0 //只能↑↓←→走，不能斜着走
0 0 0 0 0 
0 1 1 1 0
0 0 0 1 0 //题目保证了输入是一定有解的
求从左上角（0，0）到右下角（4，4）的最短路线。

bfs解题核心逻辑伪代码：

1，将起点推入队列中；
2，将起点标识为已走过；
while（队列非空）{
  3，取队列首节点vt，并从队列中弹出；
  4，探索上面取出得节点的周围是否有没走过的节点vf，如果有将所有能走的vf的parents指向vt，并将vf加入队列
    （如果vf等于终点，说明探索完成，退出循环）。
}
如果队列为空自然跳出，说明无路可达终点。


实际c++实现：

#include&lt;vector&gt;
#include&lt;iostream&gt;
#include&lt;string&gt;
#include&lt;algorithm&gt;
#include&lt;map&gt;
#include&lt;queue&gt;
using namespace std;
struct Node//定义结构体Node
{
    int xx ;//自身处于组内的位置
    int yy;
    bool qiang;//是否是墙
    bool walked;//是否走过
    Node *parents;//指向父节点的指针
};


int main() {
    int id = 0;
    //int xx, yy;
    queue&lt;Node*&gt; bfs;//创建Node指针队列
    vector&lt;vector&lt;Node&gt;&gt; migong;//创建二维迷宫组
    for (int i = 0; i &lt; 5; i++) {
        vector&lt;Node&gt; hang;
        for (int j = 0; j &lt; 5; j++) {
            int ii;
            cin &gt;&gt; ii;
            Node node{ i,j,ii,false};
            hang.push_back(node);
        }

        migong.push_back(hang);
    }
    //输入完毕
    int ax[4] = { -1,1,0,0 };
    int by[4] = { 0,0,1,-1 };
    
    
    bfs.push(&amp;migong[0][0]);//先将起点推进去
    migong[0][0].walked = true;

    Node *vt;//等下指向父节点的指针
    Node *vf;//等下指向父节点引申出的子节点

    while (!bfs.empty()) {
        vt = bfs.front();
        bfs.pop();


        
            if ((*vt).xx &gt;= 1) {//查询左节点是否可以
                vf = &amp;migong[(*vt).xx + ax[0]][(*vt).yy + by[0]];
                if (!(*vf).qiang &amp;&amp; !(*vf).walked) {
                    bfs.push(vf);
                    (*vf).walked = true;
                    (*vf).parents = vt;//子节点指向父节点
                    if ((*vf).xx == 4 &amp;&amp; (*vf).yy == 4) break;//如果是终点节点，结束寻找，跳出循环。
                }
            }
            if ((*vt).xx &lt;=3  ) {//查询右节点是否可以
                vf = &amp;migong[(*vt).xx + ax[1]][(*vt).yy + by[1]];
                if (!(*vf).qiang &amp;&amp; !(*vf).walked) {
                    bfs.push(vf);
                    (*vf).walked = true;
                    (*vf).parents = vt;
                    if ((*vf).xx == 4 &amp;&amp; (*vf).yy == 4) break;
                }
            }
            if ((*vt).yy &lt;= 3) {//查询下节点是否可以
                vf = &amp;migong[(*vt).xx + ax[2]][(*vt).yy + by[2]];
                if (!(*vf).qiang &amp;&amp; !(*vf).walked) {
                    bfs.push(vf);
                    (*vf).walked = true;
                    (*vf).parents = vt;
                    if ((*vf).xx == 4 &amp;&amp; (*vf).yy == 4) break;
                }
            }
            if ((*vt).yy &gt;= 1) {//查询上节点是否可以
                vf = &amp;migong[(*vt).xx + ax[3]][(*vt).yy + by[3]];
                if (!(*vf).qiang &amp;&amp; !(*vf).walked) {
                    bfs.push(vf);
                    (*vf).walked = true;
                    (*vf).parents = vt;
                    if ((*vf).xx == 4 &amp;&amp; (*vf).yy == 4) break;
                }
            }
        
    }
    

//结束算法，从vf指向的节点开始寻找父节点。
    vector&lt;Node*&gt; fin;
    
    
    while (true) {
        fin.push_back(vf);
        vf = (*vf).parents;
        if ((*vf).xx == 0 &amp;&amp; (*vf).yy == 0) {
            fin.push_back(vf);
            break;
        }
        
    }
//输出
    for (int i = fin.size()-1; i &gt;=0;i--) {
        cout &lt;&lt; (*fin[i]).xx &lt;&lt; &quot;,&quot; &lt;&lt; (*fin[i]).yy &lt;&lt; endl;
    }
    

    return 0;

}


输出示例：
0 0 1 0 1
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
0,0
1,0
2,0
2,1
2,2
2,3
2,4
3,4
4,4
dfs解题核心逻辑伪代码：

1，栈初始化
2，获得起点，将起点标识为已走过，将起点入栈
while（栈非空）{
  取栈顶元素vt
  如果vt周围有为走过的节点vf，则：
      将vf改为已走
      vf入栈
  没有能走的节点，vt出栈
}
代码：

#include&lt;iostream&gt;
#include&lt;vector&gt;
#include&lt;list&gt;
#include&lt;algorithm&gt;
#include&lt;queue&gt;
#include&lt;string&gt;
#include&lt;stack&gt;
#include&lt;time.h&gt;
#include &lt;windows.h&gt;
#include&lt;set&gt;

using namespace std;

struct Node
{
    int x;
    int y;
    bool walked;
    int g;
    int f;//f = g+h
    int h;
    Node* parents;
};

int main() {
    
    vector&lt;vector&lt;Node&gt;&gt; migong;//创建二维迷宫组
    for (int i = 0; i &lt; 5; i++) {
        vector&lt;Node&gt; hang;
        for (int j = 0; j &lt; 5; j++) {
            int ii;
            cin &gt;&gt; ii;
            Node node{ i,j,ii };
            hang.push_back(node);
        }

        migong.push_back(hang);
    }
    
    
    /*-----------------------------------dfs----------------------------------------------*/
    vector&lt;vector&lt;Node&gt;&gt; migong2 = migong;

    stack&lt;Node*&gt; f;
    f.push(&amp;migong2[0][0]);
    migong2[0][0].walked = true;
    while (!f.empty()) {
        Node *vt = f.top();
        bool can = true;
        if (vt-&gt;x &gt;= 1) {
            Node *vf = &amp;migong2[vt-&gt;x - 1][vt-&gt;y];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;x &lt;=3) {
            Node *vf = &amp;migong2[vt-&gt;x + 1][vt-&gt;y];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;y &gt;= 1) {
            Node *vf = &amp;migong2[vt-&gt;x][vt-&gt;y - 1];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;y &lt;= 3) {
            Node *vf = &amp;migong2[vt-&gt;x ][vt-&gt;y + 1];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }

        if (can) {
            f.pop();
        }

    }

    




    vector&lt;Node*&gt; fin2;
    Node*bb = &amp;migong2[4][4];
    while (true) {

        fin2.push_back(aa);
        if (bb == &amp;migong2[0][0]) {
            break;
        }
        bb = bb-&gt;parents;

    }

    

    int count2 = 0;
    for (int i = 0; i &lt; 5; i++) {
        for (int j = 0; j &lt; 5; j++) {
            cout &lt;&lt; migong2[i][j].walked;
            if (migong2[i][j].walked)count2++;
        }
        cout &lt;&lt; endl;
    }
    reverse(fin2.begin(), fin2.end());




    for (int i = 0; i &lt; fin.size(); i++) {
        cout &lt;&lt; fin[i]-&gt;x &lt;&lt;&quot; &quot;&lt;&lt; fin[i]-&gt;y&lt;&lt; endl;
    }

    return 0;
}


输出：
0 1 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
11000
11111
11111
11111
00011
0 0
1 0
2 0
2 1
2 2
2 3
2 4
3 4
4 4



两种方法的时间对比以及路径分析：


#include&lt;iostream&gt;
#include&lt;vector&gt;
#include&lt;list&gt;
#include&lt;algorithm&gt;
#include&lt;queue&gt;
#include&lt;string&gt;
#include&lt;stack&gt;
#include&lt;time.h&gt;
#include &lt;windows.h&gt;
#include&lt;set&gt;

using namespace std;

struct Node
{
    int x;
    int y;
    bool walked;
    int g;
    int f;//f = g+h
    int h;
    Node* parents;
};

int main() {
    int qiang = 0;
    vector&lt;vector&lt;Node&gt;&gt; migong;//创建二维迷宫组
    for (int i = 0; i &lt; 5; i++) {
        vector&lt;Node&gt; hang;
        for (int j = 0; j &lt; 5; j++) {
            int ii;
            cin &gt;&gt; ii;
            if (ii) qiang++;
            Node node{ i,j,ii };
            hang.push_back(node);
        }

        migong.push_back(hang);
    }
    
    int a[10002];
    int i = 0;
    double run_time;
    _LARGE_INTEGER time_start;  //开始时间
    _LARGE_INTEGER time_over;   //结束时间
    double dqFreq;      //计时器频率
    LARGE_INTEGER ff;   //计时器频率
    QueryPerformanceFrequency(&amp;ff);
    dqFreq = (double)ff.QuadPart;
    QueryPerformanceCounter(&amp;time_start);

    /*-----------------------------------dfs----------------------------------------------*/
    vector&lt;vector&lt;Node&gt;&gt; migong2 = migong;

    stack&lt;Node*&gt; f;
    f.push(&amp;migong2[0][0]);
    migong2[0][0].walked = true;
    while (!f.empty()) {
        Node *vt = f.top();
        bool can = true;
        if (vt-&gt;x &gt;= 1) {
            Node *vf = &amp;migong2[vt-&gt;x - 1][vt-&gt;y];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;x &lt;=3) {
            Node *vf = &amp;migong2[vt-&gt;x + 1][vt-&gt;y];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;y &gt;= 1) {
            Node *vf = &amp;migong2[vt-&gt;x][vt-&gt;y - 1];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }
        if (vt-&gt;y &lt;= 3) {
            Node *vf = &amp;migong2[vt-&gt;x ][vt-&gt;y + 1];
            if (vf-&gt;walked == false) {
                vf-&gt;parents = vt;
                vf-&gt;walked = true;
                if (vf == &amp;migong2[4][4]) {
                    break;
                }
                f.push(vf);
                can = false;
            }
        }

        if (can) {
            f.pop();
        }

    }

    QueryPerformanceCounter(&amp;time_over);    //计时结束
    run_time = 1000000 * (time_over.QuadPart - time_start.QuadPart) / dqFreq;
    float time1 = run_time;

    QueryPerformanceFrequency(&amp;ff);
    dqFreq = (double)ff.QuadPart;
    QueryPerformanceCounter(&amp;time_start);

    /*-----------------------------------bfs----------------------------------------------*/
    int ax[4] = { -1,1,0,0 };
    int by[4] = { 0,0,1,-1 };

    queue&lt;Node*&gt; bfs;
    bfs.push(&amp;migong[0][0]);//先将起点推进去
    migong[0][0].walked = true;

    Node *vt;//等下指向父节点的指针
    Node *vf;//等下指向父节点引申出的子节点

    while (!bfs.empty()) {
        vt = bfs.front();
        bfs.pop();



        if ((*vt).x &gt;= 1) {//查询左节点是否可以
            vf = &amp;migong[(*vt).x + ax[0]][(*vt).y + by[0]];
            if (!(*vf).walked &amp;&amp; !(*vf).walked) {
                bfs.push(vf);
                (*vf).walked = true;
                (*vf).parents = vt;//子节点指向父节点
                if ((*vf).x == 4 &amp;&amp; (*vf).y == 4) break;//如果是终点节点，结束寻找，跳出循环。
            }
        }
        if ((*vt).x &lt;= 3) {//查询右节点是否可以
            vf = &amp;migong[(*vt).x + ax[1]][(*vt).y + by[1]];
            if (!(*vf).walked &amp;&amp; !(*vf).walked) {
                bfs.push(vf);
                (*vf).walked = true;
                (*vf).parents = vt;
                if ((*vf).x == 4 &amp;&amp; (*vf).y == 4) break;
            }
        }
        if ((*vt).y &lt;= 3) {//查询下节点是否可以
            vf = &amp;migong[(*vt).x + ax[2]][(*vt).y + by[2]];
            if (!(*vf).walked &amp;&amp; !(*vf).walked) {
                bfs.push(vf);
                (*vf).walked = true;
                (*vf).parents = vt;
                if ((*vf).x == 4 &amp;&amp; (*vf).y == 4) break;
            }
        }
        if ((*vt).y &gt;= 1) {//查询上节点是否可以
            vf = &amp;migong[(*vt).x + ax[3]][(*vt).y + by[3]];
            if (!(*vf).walked &amp;&amp; !(*vf).walked) {
                bfs.push(vf);
                (*vf).walked = true;
                (*vf).parents = vt;
                if ((*vf).x == 4 &amp;&amp; (*vf).y == 4) break;
            }
        }

    }

    QueryPerformanceCounter(&amp;time_over);    //计时结束
    run_time = 1000000 * (time_over.QuadPart - time_start.QuadPart) / dqFreq;
    float time2 = run_time;
    /*-----------------------------------A*----------------------------------------------*/
    vector&lt;vector&lt;Node&gt;&gt; migong3 = migong;
    set&lt;Node*&gt; openNode;
    set&lt;Node*&gt; closeNode;
    openNode.insert(&amp;migong3[0][0]);

    /*-----------------------------------结束----------------------------------------------*/

    vector&lt;Node*&gt; fin;
    Node*aa = &amp;migong[4][4];
    while (true) {
        
        fin.push_back(aa);
        if (aa == &amp;migong[0][0]) {
            break;
        }
        aa = aa-&gt;parents;
        
    }

    vector&lt;Node*&gt; fin2;
    Node*bb = &amp;migong2[4][4];
    while (true) {

        fin2.push_back(bb);
        if (bb == &amp;migong2[0][0]) {
            break;
        }
        bb = bb-&gt;parents;

    }

    cout &lt;&lt; &quot;bfs运行后矩阵&quot; &lt;&lt; endl;

    int count = 0;
    for (int i = 0; i &lt; 5; i++) {
        for (int j = 0; j &lt; 5; j++) {
            cout &lt;&lt; migong[i][j].walked;
            if (migong[i][j].walked)count++;
        }
        cout &lt;&lt; endl;
    }
    reverse(fin.begin(), fin.end());

    cout &lt;&lt; &quot;dfs运行后矩阵&quot; &lt;&lt; endl;

    int count2 = 0;
    for (int i = 0; i &lt; 5; i++) {
        for (int j = 0; j &lt; 5; j++) {
            cout &lt;&lt; migong2[i][j].walked;
            if (migong2[i][j].walked)count2++;
        }
        cout &lt;&lt; endl;
    }
    reverse(fin2.begin(), fin2.end());




    for (int i = 0; i &lt; fin.size(); i++) {
        cout &lt;&lt; fin[i]-&gt;x &lt;&lt;&quot; &quot;&lt;&lt; fin[i]-&gt;y&lt;&lt; endl;
    }

    cout &lt;&lt; &quot;Totle Time of dfs : &quot; &lt;&lt; time1 &lt;&lt; &quot;s&quot; &lt;&lt; endl;
    cout &lt;&lt; &quot;Totle Time of bfs: &quot; &lt;&lt; time2 &lt;&lt; &quot;s&quot; &lt;&lt; endl;
    cout &lt;&lt; &quot;bfs共搜索过的节点数：&quot; &lt;&lt; count- qiang &lt;&lt; endl;
    cout &lt;&lt; &quot;dfs共搜索过的节点数：&quot; &lt;&lt; count2- qiang &lt;&lt; endl;
    return 0;
    //https://blog.csdn.net/u012878643/article/details/46723375
}

输出示例1：
0 1 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
bfs运行后矩阵
11001
11111
11111
11111
11111
dfs运行后矩阵
11000
11111
11111
11111
00011
bfs路径
0 0
1 0
2 0
2 1
2 2
2 3
2 4
3 4
4 4
dfs路径
0 0
1 0
2 0
2 1
2 2
2 3
2 4
3 4
4 4
Totle Time of dfs : 65.5013s
Totle Time of bfs: 67.3427s
bfs共搜索过的节点数：15
dfs共搜索过的节点数：11


输出示例2：
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
bfs运行后矩阵
11111
11111
11111
11111
11111
dfs运行后矩阵
11111
11111
11111
11111
11111
bfs路径
0 0
1 0
2 0
3 0
4 0
4 1
4 2
4 3
4 4
dfs路径
0 0
0 1
0 2
0 3
0 4
1 4
2 4
2 3
2 2
2 1
2 0
3 0
4 0
4 1
4 2
4 3
4 4
Totle Time of dfs : 133.107s
Totle Time of bfs: 131.792s
bfs共搜索过的节点数：25
dfs共搜索过的节点数：25


输出示例3：
0 0 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 0 0
bfs运行后矩阵
11111
11111
11111
11111
11111
dfs运行后矩阵
11111
11111
11111
11111
11111
bfs路径
0 0
1 0
2 0
3 0
4 0
4 1
4 2
4 3
4 4
dfs路径
0 0
0 1
0 2
0 3
0 4
1 4
2 4
2 3
2 2
2 1
2 0
3 0
4 0
4 1
4 2
4 3
4 4
Totle Time of dfs : 120.217s
Totle Time of bfs: 99.1726s
bfs共搜索过的节点数：19
dfs共搜索过的节点数：19

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),a=[d];function r(m,u){return e(),l("div",null,a)}const f=n(s,[["render",r],["__file","7_4_3_DFS算法与BFS算法.html.vue"]]);export{f as default};
