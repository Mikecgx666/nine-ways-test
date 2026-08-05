(() => {
  // A story may change its setting, but not the decision it asks a participant to make.
  // These 27 slots are the shared measurement contract for every future story album.
  const slots = [
    { id:'uncertain-route', name:'信息不完整时如何起步', dilemma:'先求稳、先维持队形，还是先闯出一条路？', pairs:[[6,1],[9,3],[8,7]] },
    { id:'scarce-resources', name:'资源不足时如何取舍', dilemma:'先守标准、先照顾人，还是先保住推进？', pairs:[[1,5],[2,9],[3,7]] },
    { id:'autonomy-boundary', name:'伙伴想单独行动时如何回应', dilemma:'先说出自己的担心、先问动机，还是给对方试行空间？', pairs:[[4,6],[4,2],[7,3]] },
    { id:'urgent-request', name:'紧急请求出现时如何判断', dilemma:'先核验、先分工接住，还是先说清自己不愿冒的风险？', pairs:[[5,6],[2,3],[4,1]] },
    { id:'rule-violation', name:'有人破坏约定时如何处理', dilemma:'先修复规则、先理解关系，还是先让局面继续？', pairs:[[1,8],[9,2],[7,3]] },
    { id:'conflicting-information', name:'消息相互矛盾时如何求证', dilemma:'先按风险核验、先摆出取舍，还是先做一轮小验证？', pairs:[[6,5],[6,9],[3,7]] },
    { id:'open-conflict', name:'关系冲突升级时如何介入', dilemma:'先让双方说完、先旁观信息，还是先把冲突按停？', pairs:[[9,2],[5,9],[8,6]] },
    { id:'shared-space', name:'有限空间如何分配', dilemma:'先按规则、先听需要，还是先让所有人今晚都有地方待？', pairs:[[1,6],[2,9],[9,8]] },
    { id:'blocked-process', name:'规则或流程卡住时如何推进', dilemma:'先拆清问题、先坦白自己的处境争取例外，还是先分头推进？', pairs:[[5,1],[4,3],[7,6]] },
    { id:'high-risk-operation', name:'高风险操作前如何行动', dilemma:'先核实风险与保障、先做小试验，还是先统一指挥？', pairs:[[6,5],[7,3],[8,1]] },
    { id:'silent-overload', name:'同伴过载却沉默时如何回应', dilemma:'先关心、先重排责任，还是先替对方减负？', pairs:[[2,5],[1,9],[8,3]] },
    { id:'stay-or-go', name:'舒适与承诺冲突时如何选择', dilemma:'先说真实感受、先谈各自顾虑，还是先定下一步？', pairs:[[4,1],[5,9],[3,8]] },
    { id:'unverified-alert', name:'不确定的警报到来时如何反应', dilemma:'先查信号、先留退路，还是先保护现场？', pairs:[[5,6],[6,7],[8,3]] },
    { id:'credit-and-visibility', name:'贡献没有被看见时如何处理', dilemma:'先补全事实、先照顾关系，还是把责任说到明面？', pairs:[[1,2],[9,2],[3,4]] },
    { id:'withdrawal', name:'伙伴想退出时如何回应', dilemma:'先理解原因、先守住约定，还是把大任务拆小？', pairs:[[2,4],[8,1],[3,7]] },
    { id:'refused-request', name:'对方拒绝合作时如何继续', dilemma:'先理解阻力、先换一种方案，还是先重申边界？', pairs:[[5,2],[7,3],[8,1]] },
    { id:'lost-resource', name:'关键资源走失时如何组织', dilemma:'先定范围、先按计划搜寻，还是先稳住队伍？', pairs:[[6,1],[1,3],[2,9]] },
    { id:'unsafe-unknown-place', name:'陌生环境有异常时如何进入', dilemma:'先观察、先说出自己的不安并守住出口，还是先安定人心？', pairs:[[5,6],[4,3],[9,2]] },
    { id:'group-misunderstanding', name:'团队被误会时如何回应', dilemma:'先听清指控、先说清自己不能接受什么，还是先用行动说明？', pairs:[[9,5],[4,8],[3,2]] },
    { id:'competing-evidence', name:'两份证据冲突时如何决定', dilemma:'先找第三方证据、先厘清顾虑，还是先试一条短路？', pairs:[[5,1],[9,2],[7,3]] },
    { id:'core-work-damaged', name:'关键成果受损时如何保全', dilemma:'先止损、先协调分段继续，还是先搭一个替代办法？', pairs:[[1,6],[9,3],[7,5]] },
    { id:'hidden-risk', name:'隐蔽风险出现时如何处置', dilemma:'先把风险带离现场再观察、先收紧边界，还是先找替代路径？', pairs:[[6,5],[8,9],[7,3]] },
    { id:'accountability', name:'造成损失后如何承担', dilemma:'先承认并补救、先让当事人表态，还是先恢复最关键部分？', pairs:[[1,5],[4,8],[2,3]] },
    { id:'last-resources', name:'最后资源如何使用', dilemma:'先算底线、先照顾最需要的人，还是先派人找新资源？', pairs:[[6,1],[2,9],[3,7]] },
    { id:'collective-fatigue', name:'集体疲惫时如何继续', dilemma:'先减少风险、先照顾状态，还是先缩小目标？', pairs:[[6,1],[2,9],[3,7]] },
    { id:'missing-piece', name:'成果缺失时如何补救', dilemma:'先查缺口、先立刻组织补救，还是先带着已有部分继续？', pairs:[[5,1],[8,6],[7,3]] },
    { id:'integration', name:'经历结束后如何带走经验', dilemma:'先沉淀规则、先说出感受，还是先定下次动作？', pairs:[[1,5],[4,2],[3,8]] }
  ];
  const responseStyles = {
    1:'先核对标准与细节', 2:'先回应他人需要', 3:'先把目标做成结果', 4:'先表达真实感受', 5:'先理清信息原理',
    6:'先核实风险保障', 7:'先打开新的可能', 8:'先直接定下边界', 9:'先缓和冲突关系'
  };
  window.ASSESSMENT_CORE = {
    version: '2026-07-core-03',
    slots,
    responseStyles,
    interpretation: '结果描述的是本次 27 个情境中较常出现的优先策略，不是临床诊断，也不等于固定人格；稳定倾向仍需在不同角色、关系与压力情境中重复观察。',
    actionMap: slots.map((slot) => slot.pairs)
  };
})();
