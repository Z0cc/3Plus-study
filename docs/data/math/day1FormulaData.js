export const day1FormulaTopics = [
  {
    id: 'absolute-value',
    title: '绝对值',
    navTitle: '绝对值',
    keywords: ['实数', '数轴', '距离', '|a|'],
    plain: '绝对值就是数轴上一个数离 0 有多远，所以结果永远不可能是负数。',
    formulas: [
      { text: '|a| 表示 a 到 0 的距离', meaning: '看距离，不看方向。', condition: 'a 可以是正数、负数或 0。' },
      { text: '|a| ≥ 0', meaning: '距离不能是负数。', condition: '所有实数都成立。' },
      { text: '|-a| = |a|', meaning: '相反数到 0 的距离相同。', condition: 'a 为任意实数。' }
    ],
    examples: ['|-3| = 3', '|5| = 5', '|0| = 0'],
    mistakes: ['不要认为负数的绝对值还是负数。', '|-3| 不是 -3，而是 3。'],
    examTip: '看到绝对值，先想到“距离”和“非负”。',
    interactive: { type: 'numberLine', label: '|-3|', result: '距离是 3，所以 |-3| = 3' },
    practices: [
      { type: '基础题', question: '|-8| = ?', answer: ['8'], explanation: '绝对值表示到 0 的距离，-8 到 0 的距离是 8。', tag: '概念错误' },
      { type: '易错题', question: '判断：|-5| = -5。正确填“对”或“错”。', answer: ['错'], explanation: '距离不能是负数，|-5| = 5。', tag: '符号错误' },
      { type: '考试风格题', question: '若 |x| = 4，x 的值是？', answer: ['4或-4', '-4或4', '4,-4', '-4,4'], explanation: '到 0 的距离为 4 的数有两个：4 和 -4。', tag: '审题错误' }
    ]
  },
  {
    id: 'powers-roots',
    title: '乘方与开方',
    navTitle: '乘方与开方',
    keywords: ['平方', '立方', '开方', '平方数'],
    plain: '平方就是自己乘自己，开方就是反过来找“谁平方后等于它”。',
    formulas: [
      { text: 'a² = a × a', meaning: '平方是两个相同的 a 相乘。', condition: 'a 为任意实数。' },
      { text: 'a³ = a × a × a', meaning: '立方是三个相同的 a 相乘。', condition: 'a 为任意实数。' },
      { text: '√a 表示哪个数平方后等于 a', meaning: '开平方是平方的逆过程。', condition: '初中阶段通常要求 a ≥ 0。' },
      { text: '√(a²) = |a|', meaning: '平方后再开方，结果是非负距离。', condition: 'a 为任意实数。' }
    ],
    examples: ['3² = 9', '2³ = 8', '√25 = 5', '√((-3)²) = 3'],
    mistakes: ['√(a²) 不一定等于 a，而是 |a|。', '例如 √((-3)²)=√9=3，不是 -3。'],
    examTip: '1² 到 10² 要熟到不用想，尤其 6²、7²、8²、9²。',
    squares: ['1²=1', '2²=4', '3²=9', '4²=16', '5²=25', '6²=36', '7²=49', '8²=64', '9²=81', '10²=100'],
    interactive: { type: 'squareMatch' },
    practices: [
      { type: '基础题', question: '√49 = ?', answer: ['7'], explanation: '7² = 49，所以 √49 = 7。', tag: '计算错误' },
      { type: '易错题', question: '√((-6)²) = ?', answer: ['6'], explanation: '√(a²)=|a|，所以 √((-6)²)=|-6|=6。', tag: '公式错误' },
      { type: '考试风格题', question: '若 a=-4，√(a²)=?', answer: ['4'], explanation: '先平方得到 16，再开方得 4；也可直接用 √(a²)=|a|。', tag: '符号错误' }
    ]
  },
  {
    id: 'polynomial',
    title: '整式',
    navTitle: '整式',
    keywords: ['同类项', '合并', '去括号', '整式'],
    plain: '同类项就像同一种东西才能合并。苹果只能和苹果加，不能和香蕉加。x 和 x² 不是同类项，所以不能合并。',
    formulas: [
      { text: '同类项：字母相同，且相同字母的指数也相同', meaning: '两个条件必须同时满足。', condition: '只看字母部分，不看系数。' },
      { text: 'ax + bx = (a+b)x', meaning: '合并同类项时，只合并系数。', condition: '必须是同类项。' },
      { text: 'a(b+c)=ab+ac', meaning: '括号外的数要分别乘括号内每一项。', condition: '注意符号也要一起乘。' }
    ],
    examples: ['3x+5x=8x', '2(x+3)=2x+6', 'x+x² 不能合并'],
    mistakes: ['x+x² 不能等于 2x²。', '只有字母和指数完全相同，才可以合并。'],
    examTip: '合并前先问自己：字母和指数完全一样吗？',
    interactive: { type: 'classifyTerms' },
    practices: [
      { type: '基础题', question: '3x + 5x = ?', answer: ['8x'], explanation: '3x 和 5x 是同类项，系数相加得 8x。', tag: '计算错误' },
      { type: '易错题', question: 'x + x² 能合并吗？填“能”或“不能”。', answer: ['不能'], explanation: 'x 的指数是 1，x² 的指数是 2，不是同类项。', tag: '概念错误' },
      { type: '考试风格题', question: '2(x+3)=?', answer: ['2x+6'], explanation: '2 分别乘 x 和 3，得到 2x+6。', tag: '步骤不规范' }
    ]
  },
  {
    id: 'multiplication-formulas',
    title: '乘法公式',
    navTitle: '乘法公式',
    keywords: ['平方差', '完全平方', '展开'],
    plain: '平方差公式的特点是：前面一样，后面一正一负。完全平方公式最容易漏掉中间项，中间项永远是 2×前×后。',
    formulas: [
      { text: '(a+b)(a-b)=a²-b²', meaning: '两个括号前项相同，后项一正一负。', condition: '符合“一样加、一样减”的结构。' },
      { text: '(a+b)²=a²+2ab+b²', meaning: '和的平方有三项，中间项是 2ab。', condition: '括号整体平方。' },
      { text: '(a-b)²=a²-2ab+b²', meaning: '差的平方中间项是负的。', condition: '最后一项 b² 仍然是正数。' }
    ],
    examples: ['(x+3)(x-3)=x²-9', '(2x+3)²=4x²+12x+9', '(x-5)²=x²-10x+25'],
    mistakes: ['(a+b)² 不等于 a²+b²，必须有中间项 2ab。', '(2x)²=4x²，不是 2x²。'],
    examTip: '看到平方括号，立刻检查有没有中间项。',
    interactive: { type: 'expandSteps' },
    practices: [
      { type: '基础题', question: '(x+4)(x-4)=?', answer: ['x²-16', 'x^2-16'], explanation: '平方差：x²-4²=x²-16。', tag: '公式错误' },
      { type: '易错题', question: '(a+b)² 是否等于 a²+b²？填“是”或“否”。', answer: ['否'], explanation: '(a+b)²=a²+2ab+b²，不能漏掉 2ab。', tag: '公式错误' },
      { type: '考试风格题', question: '(2x+3)² = ?', answer: ['4x²+12x+9', '4x^2+12x+9'], explanation: '(2x)²=4x²，中间项 2×2x×3=12x，3²=9。', tag: '计算错误' }
    ]
  },
  {
    id: 'factorization',
    title: '因式分解',
    navTitle: '因式分解',
    keywords: ['提公因式', '平方差', '完全平方', '拆成乘法'],
    plain: '因式分解就是把一个式子“拆成乘法形式”。先找大家都有的东西，也就是公因式。',
    formulas: [
      { text: 'ab+ac=a(b+c)', meaning: '把共同的 a 提出来。', condition: '每一项都有相同因式。' },
      { text: 'a²-b²=(a+b)(a-b)', meaning: '两个平方相减可以拆成一加一减。', condition: '必须是减号，且两边都是平方。' },
      { text: 'a²+2ab+b²=(a+b)²', meaning: '三项式能还原成和的平方。', condition: '中间项等于 2×前×后。' },
      { text: 'a²-2ab+b²=(a-b)²', meaning: '三项式能还原成差的平方。', condition: '中间项为负，最后一项仍为正。' }
    ],
    examples: ['3x+6=3(x+2)', 'x²-25=(x+5)(x-5)', 'x²+6x+9=(x+3)²'],
    mistakes: ['x²-4=(x+2)(x-2)，不是 (x-2)²。', '看到减号和两个平方，优先想到平方差。'],
    examTip: '识别顺序：先提公因式，再看平方差，最后看完全平方。',
    interactive: { type: 'identifyFactor' },
    practices: [
      { type: '基础题', question: '3x+6 因式分解为？', answer: ['3(x+2)'], explanation: '3x 和 6 都有公因式 3，提出得 3(x+2)。', tag: '不会识别题型' },
      { type: '易错题', question: 'x²-16 因式分解为？', answer: ['(x+4)(x-4)'], explanation: '这是平方差：x²-4²=(x+4)(x-4)。', tag: '公式错误' },
      { type: '考试风格题', question: 'x²+10x+25 因式分解为？', answer: ['(x+5)²', '(x+5)^2'], explanation: '25=5²，中间项 10x=2×x×5，所以是 (x+5)²。', tag: '不会识别题型' }
    ]
  },
  {
    id: 'fraction',
    title: '分式',
    navTitle: '分式',
    keywords: ['分母', '有意义', '约分', '倒数'],
    plain: '分式最重要的底线是：分母不能为 0。只要分母可能等于 0，就必须排除这个值。',
    formulas: [
      { text: 'A/B，其中 B≠0', meaning: '分母不能为 0。', condition: '只要出现分式，先看分母。' },
      { text: '(a/b)×(c/d)=ac/bd', meaning: '分子乘分子，分母乘分母。', condition: 'b、d 都不能为 0。' },
      { text: '(a/b)÷(c/d)=(a/b)×(d/c)', meaning: '除以一个分数，等于乘它的倒数。', condition: 'b、c、d 都不能为 0。' }
    ],
    examples: ['1/(x-2) 有意义，则 x≠2', '(2/3)×(3/5)=2/5', '(1/2)÷(3/4)=2/3'],
    mistakes: ['不能随便把分式拆开。', '(x+2)/x 不能直接等于 1+2。'],
    examTip: '分式题第一步：写出分母不等于 0。',
    interactive: { type: 'reduceFraction' },
    practices: [
      { type: '基础题', question: '1/(x-2) 有意义，x 不能等于多少？', answer: ['2'], explanation: '分母 x-2 不能为 0，所以 x≠2。', tag: '概念错误' },
      { type: '易错题', question: '(1/2)÷(3/4)=?', answer: ['2/3'], explanation: '除以 3/4 等于乘 4/3，结果为 2/3。', tag: '公式错误' },
      { type: '考试风格题', question: '2x/4x 约分结果是？', answer: ['1/2'], explanation: '上下同除以 2x，得 1/2，但条件是 x≠0。', tag: '步骤不规范' }
    ]
  },
  {
    id: 'linear-equation',
    title: '一元一次方程',
    navTitle: '一元一次方程',
    keywords: ['移项', '合并', '系数化1', '解方程'],
    plain: '解方程就是把 x 单独留下来。移项的时候，过等号要变号。',
    formulas: [
      { text: '只含一个未知数，未知数最高次数是 1', meaning: '这就是一元一次方程的核心特征。', condition: '未知数不能出现在分母里，也不能有 x²。' },
      { text: '移项 → 合并 → 系数化 1', meaning: '一步一步把 x 留在一边。', condition: '移项要变号。' },
      { text: '等式两边同时加、减、乘、除同一个不为 0 的数，等式仍成立', meaning: '解方程的每一步都靠等式性质。', condition: '除数不能为 0。' }
    ],
    examples: ['2x+3=11', '2x=8', 'x=4'],
    mistakes: ['x+3=5，正确是 x=5-3，不是 x=5+3。', '移项过等号必须变号。'],
    examTip: '每一步都写清楚，特别是移项和系数化 1。',
    interactive: { type: 'equationSteps' },
    practices: [
      { type: '基础题', question: '2x+3=11，x=?', answer: ['4'], explanation: '移项得 2x=11-3=8，所以 x=4。', tag: '计算错误' },
      { type: '易错题', question: 'x+3=5，x=?', answer: ['2'], explanation: '+3 移到右边变 -3，x=5-3=2。', tag: '符号错误' },
      { type: '考试风格题', question: '3x-6=12，x=?', answer: ['6'], explanation: '移项得 3x=18，系数化 1 得 x=6。', tag: '步骤不规范' }
    ]
  }
]
