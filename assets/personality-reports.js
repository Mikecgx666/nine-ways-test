(() => {
  const reports = {
    preschool: {
      label: '03-06岁 学前观察',
      items: {
        '完美': ['你可能很在意规则、顺序和“做对没有”。事情和预想不一样时，容易显得紧张或想马上纠正。', '细致和认真是你的力量。大人可以先肯定努力，再陪你一起再试一次，让你知道出错也很安全。'],
        '助人': ['你常能注意到大人的情绪，也愿意分享、照顾或陪伴别人。', '你的温暖会让身边人很舒服。大人也要常问“你想要什么”，让你知道照顾自己同样重要。'],
        '成就': ['你喜欢被看见、展示成果，也会为完成一件事或赢得比赛感到兴奋。', '你的动力很宝贵。除了结果，大人可以多表扬你的尝试、坚持和与同伴的合作。'],
        '自我': ['你的感受很细腻，对喜欢和不喜欢常有鲜明表达，也很在意是否被理解。', '画画、讲故事和游戏都能帮助你表达。大人可以先听见你的感受，而不是说你“太敏感”。'],
        '观察': ['遇到新环境时，你可能喜欢先看一看、想一想，再决定是否加入。', '安静探索是你的方式。大人可以给你一点准备时间，再用小步骤邀请你参与。'],
        '忠诚': ['面对陌生环境、分离或临时变化时，你可能需要反复确认大人是否在身边。', '提前告诉你接下来的安排，会让你更安心。稳定的回应能慢慢建立你的安全感。'],
        '活跃': ['你对新游戏和新点子很有兴趣，喜欢变化，也不太喜欢等待。', '你的活力会带来很多快乐。大人可以给你有限选择，并用有趣的方式陪你完成一件小事。'],
        '领袖': ['你有自己的主意，喜欢自己决定；遇到限制时，可能会直接表达不愿意。', '勇敢表达是你的力量。清楚的边界和可选择的空间，能帮助你把力量用得更好。'],
        '和平': ['你常很温和、愿意配合，也可能把自己的选择让给别人。', '你的包容很珍贵。大人可以给你一点时间说出“我想要什么”，让你知道表达不会破坏关系。']
      }
    },
    child: {
      label: '07-12岁 儿童探索',
      items: {
        '完美': ['在作业、游戏和集体规则中，你可能很在意正确，也会因小失误感到不舒服。', '你有认真负责的一面。试着为自己设定“做到够好”的标准，把错误当成下一次进步的线索。'],
        '助人': ['在同伴中，你常会照顾别人、帮助调和，也可能不太好意思拒绝请求。', '你的关心很有力量。练习说“我愿意”“我现在不方便”，边界也能让友谊更舒服。'],
        '成就': ['你喜欢表现、进步和被认可，对名次、评价或效率会比较敏感。', '你的目标感能带你前进。除了比较结果，也记录自己比昨天学会了什么。'],
        '自我': ['你开始在意自己的兴趣、风格和“我和别人有什么不同”，感受也更丰富。', '独特是你的优势。可以把感受画出来、写下来，再和信任的人分享，而不是一个人猜别人是否理解你。'],
        '观察': ['你可能对某个知识或技能特别投入，社交前喜欢先弄懂规则和情况。', '深入思考是你的长处。试着把想法说成一句清楚的话，让别人也能听见你的发现。'],
        '忠诚': ['你看重朋友是否可靠，也会关注规则、公平和自己是否被接纳。', '你的谨慎能保护自己。遇到担心时，可以先找证据，再和可信的人把问题说出来。'],
        '活跃': ['你喜欢新活动、新朋友和新点子，容易被有趣的事吸引。', '好奇能让生活打开很多可能。每周选一件最想做的事完成到底，你会看见自己的坚持。'],
        '领袖': ['你愿意带头，也会为觉得不公平的事发声；有时可能显得比较强势。', '你的行动力很难得。表达想法前先听一听同伴的意见，会让大家更愿意和你一起做事。'],
        '和平': ['你擅长倾听和配合，常希望同伴之间不要争吵。', '你能让团体更舒服。试着在安全的场合说出一个不同意见，真实表达也是对关系的尊重。']
      }
    },
    teen: {
      label: '13-18岁 少年自省',
      items: {
        '完美': ['面对学习与评价时，你可能把“是否做对、是否足够好”看得很重要。', '你的原则感是优势。试着区分真正重要的原则和对自己过高的要求，给不完美留一点位置。'],
        '助人': ['在关系中，你常因为被需要而感到有价值，也可能不容易直接说出自己的需求。', '你的共情很珍贵。可以练习说“我希望你怎样支持我”，让关系不只靠你单方面付出。'],
        '成就': ['你可能通过成绩、能力或形象确认自己，害怕落后或显得不够好。', '你的执行力很强。也请记得，真实的压力和迟疑可以被说出来，不必只展示最好的部分。'],
        '自我': ['你会认真探索自己的风格、情感和归属感，也可能因比较而放大缺失。', '你的敏感能带来创造力。把“感受、事实、下一步行动”分开记录，会让你更稳地前进。'],
        '观察': ['你会通过知识、独处和充分准备建立安全感，重要选择前可能想很久。', '你的洞察有价值。给决定设一个期限，并用小实验验证想法，让理解和行动一起发生。'],
        '忠诚': ['你对前途、关系和权威有较强的风险意识，可能在依赖与反抗之间摇摆。', '你的警觉能帮助你做准备。把担忧分成事实、猜测和行动，会让你更相信自己的判断。'],
        '活跃': ['你渴望自由、新鲜和多种可能，遇到沉闷或压力时可能很想马上转移。', '你的创意很有感染力。保留探索，也为重要承诺设一个收尾日期，体验完成带来的力量。'],
        '领袖': ['你对尊重、控制和公平反应强烈，常会直接保护自己或重要的人。', '你的担当很突出。冲突时先说出需求，再说结论，能让你的力量更容易被理解。'],
        '和平': ['你希望关系保持和谐，可能把自己的志愿、边界或不满放在后面。', '你的包容能连接不同的人。练习说“我不同意，因为……”，温和而坚定地表达自己。']
      }
    },
    adult: {
      label: '19-35岁 青年抉择',
      items: {
        '完美': ['在职业和关系中，你可能追求高标准，也容易承担过多责任或持续内耗。', '你的可靠能带来质量感。选一项真正重要的标准，把其余细节留给协商与弹性。'],
        '助人': ['你善于建立信任和支持网络，但可能为了关系牺牲时间、精力或个人计划。', '你的关怀会让人感到被看见。先确认自己的资源上限，再承诺帮助，关系会更长久。'],
        '成就': ['你目标清晰、行动高效，容易把职业进展和外部认可当作主要价值来源。', '你的推进力很强。用健康、关系、学习和贡献一起衡量成功，让成长更可持续。'],
        '自我': ['你重视意义、匹配感和个人风格，可能在理想与现实的差距中犹豫。', '你的创造力能让生活更有深度。把理想拆成可验证的下一步，用行动而非等待确认方向。'],
        '观察': ['你适合深度专业和独立思考，但可能因过度分析而延迟投入或回避协作。', '你的分析能力很强。信息足够时就做一个小试行，让专业洞见真正产生影响。'],
        '忠诚': ['你重视稳定、团队与长期承诺，面对变化时往往先看见风险。', '你的风险意识能保护重要的人和事。准备预案后设定行动期限，用事实更新担忧。'],
        '活跃': ['你擅长发现机会和新路径，也可能因选择太多、承诺太快而精力分散。', '你的热情能带来创新。限定核心项目数量，把自由留给真正重要的探索。'],
        '领袖': ['你在决策、谈判和压力情境中有推动力，但可能把独立变成过度控制。', '你的担当很有价值。分清必须坚持的边界和可以授权的部分，力量会成为支持而非压力。'],
        '和平': ['你能够稳定关系与团队氛围，但可能因回避冲突而延后职业或生活决定。', '你的整合能力很珍贵。把大选择拆成小决定并写下期限，让平静来自行动。']
      }
    },
    integration: {
      label: '36+岁 人生整合',
      items: {
        '完美': ['长期承担责任后，你可能更依赖标准和自我要求，也更容易对自己和家人严格。', '你的经验能带来秩序。把经验变成原则而非控制，并给恢复与欣赏留出固定时间。'],
        '助人': ['在人际与家庭责任中，你可能习惯先照顾所有人，最后才轮到自己。', '你的付出很有温度。重新盘点可分担的责任，也让家人有机会照顾你。'],
        '成就': ['你习惯推动目标与承担成果，阶段转换时可能会重新思考“下一步为何而做”。', '你的经验值得被传递。把成功扩展到长期贡献、健康与关系质量，培育他人也是成就。'],
        '自我': ['人生经历让你的感受与表达更丰富，也可能在遗憾或比较中停留过久。', '你的深度能带来独特价值。把未完成的情感转化为创作、对话或服务，继续参与真实生活。'],
        '观察': ['你积累了专业判断和独立能力，可能更习惯独处并减少对新关系的投入。', '你的洞见值得被看见。主动分享方法与经验，在合作中让知识产生新的价值。'],
        '忠诚': ['你重视承诺、秩序与家人团队，面对变化时容易先关注失去和风险。', '你的可靠是重要支撑。保留风险意识，也定期尝试低风险的新选择，用事实更新旧担忧。'],
        '活跃': ['你依然需要好奇和新鲜感，可能在责任累积后以忙碌或不断切换维持活力。', '你的活力能感染他人。选择少量真正滋养的兴趣深耕，让快乐也包含休息、陪伴和完成。'],
        '领袖': ['你的承担力和保护欲突出，可能在家庭或组织里形成“只能靠我”的位置。', '你的力量能创造安全。把一部分力量用于授权与培养，在不掌控全部时也保持信任。'],
        '和平': ['你擅长维系长期关系与稳定氛围，可能因求稳而压下真正想改变的事。', '你的包容能维系连接。为个人愿望预留资源，用温和但明确的方式推动长期改变。']
      }
    }
  };

  const profiles = {
    '完美': {
      intro: '你是一个重视原则、标准与责任感的人。你很难对明显的漏洞、低效或不公平视而不见，往往会自发地把事情整理得更清楚、更可靠。你不只是想把事情做好，更希望它经得起检验。',
      core: '你内在很在意“是否正确、是否合乎标准”。当事情失序、规则模糊或自己犯错时，容易出现紧绷、自责，或把不满压在心里。',
      strength: '你的可靠、耐心和持续改进能力，能为身边的人带来质量感、秩序感与可信度。你尤其擅长发现问题、建立规范，并把模糊的要求落成可执行的步骤。',
      stress: '压力变大时，你可能把高标准变成“只有一种正确答案”，对自己和他人都更苛刻。先区分真正重要的原则与可以协商的偏好，能减少不必要的消耗。',
      action: '练习先看见已经做对的部分，再只选择一项最值得改进的地方。把“批评”转成明确、温和、可执行的下一步。',
      celebrity: '从长期坚守、责任感与对教育质量的投入来看，你可联想到张桂梅等公众人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '张桂梅',
      celebrityImage: 'assets/celebrities/zhang-guimei.jpg',
      snapshot: '你会把“做对、做好、做到位”当作一种责任，并希望事情经得起检验。',
      tags: ['原则感', '可靠', '持续改进']
    },
    '助人': {
      intro: '你是一个对人很敏感、愿意主动付出的人。你常能比别人更早察觉谁需要支持、谁正在为难，并自然地想办法让关系更顺畅。被信任、被需要，会让你感到自己的价值被确认。',
      core: '你内在很在意“我是否被爱、被珍视、对人有用”。因此你容易把照顾别人放在自己之前，也不太习惯直接说出自己的需要。',
      strength: '你的共情、热情和关系经营能力，能让团体更有温度。你擅长搭建连接、鼓励他人、读懂未说出口的情绪，并让合作不只停留在任务层面。',
      stress: '压力下，你可能过度投入、难以拒绝，或因付出没有被回应而感到委屈。关心不是取消边界，健康的帮助也包含照顾自己的时间、精力与感受。',
      action: '在答应请求前先问自己“我现在是否有余力”，并练习把“我可以帮你”说得更具体：我可以帮到哪里、什么时候、以什么方式。',
      celebrity: '从长期服务他人、把关怀落实到日常行动的公众叙事来看，你可联想到雷锋等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '雷锋',
      celebrityImage: 'assets/celebrities/lei-feng.jpg',
      snapshot: '你很容易先看见他人的感受与需要，并愿意用行动让关系更温暖。',
      tags: ['共情力', '温暖', '关系连接']
    },
    '成就': {
      intro: '你是一个有目标感、适应力和推进力的人。面对任务时，你很快会判断什么最有效，并愿意调动资源、节奏和表达方式来达成结果。你对“做成一件事”的感受十分敏锐。',
      core: '你内在很在意“我是否有价值、是否得到认可”。成就和评价容易成为衡量自我的标尺，所以你习惯向前、向上，并努力呈现出有能力的一面。',
      strength: '你的效率、感染力和执行力，能在不确定中把人带向目标。你擅长设定里程碑、呈现成果、动员资源，也能在变化中快速找到自己的位置。',
      stress: '压力大时，你可能把自己变成只看产出的机器，或过度在意比较与外在形象。表现优异是能力，但不是你唯一值得被喜欢和肯定的理由。',
      action: '给自己安排一段不需要产出的时间，并找一位可信的人分享一件尚未完成或不够完美的事，练习把自我价值从结果中松开一点。',
      celebrity: '从目标感、长期训练与不断突破的公众形象来看，你可联想到苏炳添等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '苏炳添',
      celebrityImage: 'assets/celebrities/su-bingtian.jpg',
      snapshot: '你会自然把注意力放在目标、进展与成果上，并希望用行动证明价值。',
      tags: ['目标感', '行动力', '突破']
    },
    '自我': {
      intro: '你是一个感受细腻、重视意义与个人风格的人。你不满足于“差不多”，更在意事情是否真实、是否有美感、是否能表达内在体验。你对人和氛围的微妙变化很敏锐。',
      core: '你内在很在意“我是否独特、是否被真正理解”。当感到平淡、被误解或不被看见时，可能更容易退回内心世界，反复体验失落与比较。',
      strength: '你的审美、直觉和创造力，能带来差异化视角。你擅长捕捉情绪、发现被忽略的意义，并让作品、关系或日常体验拥有更鲜明的温度与个性。',
      stress: '压力下，你可能把情绪当成事实，或者因比较而放大自己的缺失。感受值得被尊重，但不需要由感受独自决定行动方向。',
      action: '当情绪起伏时，写下“我感受到什么、事实是什么、我能做的一小步是什么”。先行动十分钟，再决定是否继续停留在当下感受里。',
      celebrity: '从作品与舞台上鲜明的个人风格、审美辨识度与表达感来看，你可联想到王菲等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '王菲',
      celebrityImage: 'assets/celebrities/faye-wong.jpg',
      snapshot: '你对感受、意义和独特表达很敏锐，希望活出真正属于自己的样子。',
      tags: ['感受力', '创造力', '独特表达']
    },
    '观察': {
      intro: '你是一个独立、冷静、喜欢理解本质的人。面对陌生或复杂的问题，你往往会先退一步观察、收集资料、推演逻辑，直到掌握足够信息才愿意投入。',
      core: '你内在很在意“我是否足够有能力、是否会被耗尽”。因此你珍视时间、空间和边界，也可能把准备做得很充分，却迟迟没有开始。',
      strength: '你的专注、分析和系统化能力，能把杂乱信息变成有用洞见。你擅长研究、技术、策略、数据与专业判断，能为复杂问题建立清晰结构。',
      stress: '压力大时，你可能过度抽离、只分析不行动，或把人际需求视为对精力的侵占。知识能带来准备，真实体验同样会更新你的判断。',
      action: '为一个正在研究的问题设定“信息足够即可行动”的阈值。完成一个小实验后再复盘，而不是等所有不确定性都消失。',
      celebrity: '从长期研究、专业专注与以知识解决问题的公众形象来看，你可联想到屠呦呦等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '屠呦呦',
      celebrityImage: 'assets/celebrities/tu-youyou.jpg',
      snapshot: '你喜欢先理解问题的本质，再投入行动；知识和空间会让你感到安心。',
      tags: ['洞察', '专注', '系统思考']
    },
    '忠诚': {
      intro: '你是一个重视信任、责任和安全感的人。你会自然地提前想一想风险在哪里、谁值得依靠、规则是否可靠。你不轻易交付信任，但一旦认定人和团队，往往很有担当。',
      core: '你内在很在意“我是否安全、是否有可靠支持”。不确定时，你容易反复验证、做最坏打算，或在顺从权威和质疑权威之间摇摆。',
      strength: '你的忠诚、风险意识和协作精神，能让团体少走弯路。你擅长准备预案、守住承诺、发现潜在问题，也愿意在重要关系里长期投入。',
      stress: '压力大时，你可能把可能性都看成危险，陷入犹豫、焦虑或不必要的猜疑。警觉是天赋，但不需要由它独自驾驶每一个选择。',
      action: '把一个担心分成“事实证据、我的推测、可控行动”三栏，只为可控行动安排时间；同时记录自己已经做对的判断，培养对自己的信任。',
      celebrity: '从公共叙事中呈现的责任感、团队意识与长期承诺来看，你可联想到周恩来等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '周恩来',
      celebrityImage: 'assets/celebrities/zhou-enlai.jpg',
      snapshot: '你很重视信任、责任和安全感，习惯提前看见风险并守住重要承诺。',
      tags: ['忠诚', '风险意识', '责任感']
    },
    '活跃': {
      intro: '你是一个乐观、好奇、反应快的人。你喜欢新鲜体验、灵感和自由度，总能看见不止一种可能。当环境沉闷或困难来临时，你会本能地寻找更有趣、更值得期待的下一步。',
      core: '你内在很在意“我能否保持自由、快乐和选择”。因此你不喜欢被困在痛苦、单调或限制中，也容易在不舒服的情绪出现时迅速转移注意。',
      strength: '你的创意、幽默和连接资源的能力，能为身边人带来活力和新方案。你擅长发散思路、发现机会、调动气氛，并让事情重新有了可能性。',
      stress: '压力大时，你可能过度分心、冲动承诺，或用忙碌和快乐回避需要处理的问题。自由不是不停切换，而是有能力选择留下来完成重要的事。',
      action: '只选一个当前最重要的项目，连续投入一小段不切换的时间。遇到不舒服时，先停留片刻描述感受，再决定如何回应。',
      celebrity: '从舞台与创作中机智、点子密度高、善于带动轻松氛围的公众形象来看，你可联想到李诞等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '李诞',
      celebrityImage: 'assets/celebrities/li-dan.jpg',
      snapshot: '你会被新鲜感、自由和可能性吸引，总能给生活找到更有趣的出口。',
      tags: ['好奇', '创意', '活力']
    },
    '领袖': {
      intro: '你是一个直接、有行动力、重视掌控感的人。遇到阻碍时，你通常不会绕开，而会迅速判断关键点并推动解决。你不喜欢被无端控制，也很在意公平、边界和对自己人的保护。',
      core: '你内在很在意“我是否足够强、是否会被控制或伤害”。因此你习惯靠力量、意志和决断确保局面可控，对软弱、含糊或不公平会特别敏感。',
      strength: '你的魄力、担当和抗压能力，能在困难时带来方向感。你擅长决策、谈判、危机处理与资源整合，也愿意在关键时刻为重要的人承担责任。',
      stress: '压力大时，你可能把推动变成压迫，把直率变成攻击，或因不愿示弱而拒绝支持。真正的强大也包括能听、能协商、能在安全关系里坦诚。',
      action: '在一次分歧中，先问两个澄清问题，再表达判断。把“就这么定了”换成“我倾向这样做，你怎么看”，让力量成为保护而非压力。',
      celebrity: '从商业叙事中决断、战略意识与承担压力的公众形象来看，你可联想到任正非等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '任正非',
      celebrityImage: 'assets/celebrities/ren-zhengfei.jpg',
      snapshot: '你倾向直接面对问题、守住边界，并在关键时刻为人和事承担责任。',
      tags: ['魄力', '担当', '保护欲']
    },
    '和平': {
      intro: '你是一个温和、包容、擅长缓和气氛的人。你能自然看见不同立场各自的道理，也愿意给人空间。在冲突和变化中，你倾向于先让关系不破裂、局面保持平衡。',
      core: '你内在很在意“我是否平静、关系是否和谐”。为了避免紧张和冲突，你有时会把自己的优先级、意见或不满放到很后面。',
      strength: '你的耐心、倾听和整合能力，能让团体在分歧中继续合作。你擅长看见不同需求、稳定节奏，并让人感到被接纳和有空间。',
      stress: '压力大时，你可能拖延、回避决定，或表面平和而内在累积不满。和谐不等于没有冲突，而是能让冲突被安全地表达出来。',
      action: '每天主动表达一个具体偏好，例如“我更希望这样安排”。面对一件拖延的事，只做五分钟启动动作，用行动唤回自己的优先级。',
      celebrity: '从公众节目中倾听、包容与调和氛围的形象来看，你可联想到何炅等人物所呈现的气质。这里借的是公众形象中的特征，不是对其真实人格的判定。',
      celebrityName: '何炅',
      celebrityImage: 'assets/celebrities/he-jiong.jpg',
      snapshot: '你擅长看见不同立场，也愿意让关系和氛围先保持平衡。',
      tags: ['包容', '倾听', '协调']
    }
  };

  const stageGuides = {
    preschool: {
      focus: '这一阶段以家长或老师的日常观察为主，不给孩子贴人格标签。重点是看见重复出现的反应，并提供安全、接纳和可预测的支持。',
      stress: '对这个年龄的孩子来说，稳定回应、清楚预告和被理解的感受，比要求“马上改好”更重要。'
    },
    child: {
      focus: '这一阶段的重点是同伴、规则与自我表达。孩子正在学习如何在集体中合作、比较、表达偏好，也需要通过具体情境认识自己的选择。',
      stress: '支持的目标不是把孩子变成另一种人，而是帮助他在保持优势的同时，学会更有弹性地与同伴相处。'
    },
    teen: {
      focus: '这一阶段聚焦关系、选择与身份感。青少年正在尝试回答“我是谁、我在乎什么、我如何与别人建立关系”，需要把观察转化为自我理解。',
      stress: '这份结果不是永久标签。它更适合用来识别压力反应、关系需要与真实选择，而不是限制未来可能性。'
    },
    adult: {
      focus: '这一阶段聚焦工作、亲密关系与生活方向。人格倾向会在职业取舍、边界协商、承诺与资源分配中表现得更清楚。',
      stress: '成熟不是消除自己的倾向，而是能在重要选择中看见惯性，并为自己增加一个更有弹性的回应方式。'
    },
    integration: {
      focus: '这一阶段聚焦责任、关系与长期变化。重点不是改变成另一种人，而是让既有优势更成熟，在健康、家庭、贡献与个人愿望之间保持选择。',
      stress: '当责任累积时，越需要辨认哪些事真正重要、哪些可以分担，并让经验变成支持他人的力量。'
    }
  };

  function addStyles() {
    if (document.getElementById('personality-report-styles')) return;
    const style = document.createElement('style');
    style.id = 'personality-report-styles';
    style.textContent = `
      .personality-report { margin:28px 0 18px; padding:20px; border:2px solid #211f2a; background:#fff; box-shadow:5px 5px 0 #211f2a; animation:report-enter .42s cubic-bezier(.2,.8,.2,1) both; }
      .personality-report__eyebrow { margin:0 0 7px; color:#5d5a67; font-size:13px; font-weight:800; letter-spacing:.04em; }
      .personality-report h3 { margin:0 0 18px; font-size:clamp(26px,4vw,34px); line-height:1.12; }
      .personality-report p { margin:0; font-size:17px; line-height:1.7; }
      .personality-report__score { display:inline-flex; align-items:center; min-height:30px; margin-left:8px; padding:3px 9px; border:1px solid #211f2a; background:#ffd33d; font-size:13px; font-weight:800; vertical-align:middle; }
      .personality-report__snapshot { font-size:19px !important; line-height:1.72 !important; }
      .personality-report__tags { display:flex; flex-wrap:wrap; gap:8px; margin:16px 0 20px; }
      .personality-report__tag { padding:5px 9px; border:1px solid #211f2a; background:#f7f4ed; font-size:14px; font-weight:800; }
      .personality-report__explore { margin:0; font-size:14px !important; font-weight:800; color:#5d5a67; }
      .personality-report__topics { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin:10px 0 0; }
      .personality-report__topic { min-height:42px; padding:9px; border:2px solid #211f2a; background:#fff; color:#17151f; font:inherit; font-size:14px; font-weight:800; cursor:pointer; text-align:left; transition:transform .18s ease, box-shadow .18s ease, background .18s ease; }
      .personality-report__topic:hover { transform:translate(-2px,-2px); box-shadow:3px 3px 0 #211f2a; }
      .personality-report__topic[aria-pressed="true"] { background:#7ae36e; box-shadow:3px 3px 0 #211f2a; }
      .personality-report__detail { margin-top:16px; padding:15px; border:1px solid #ded9cd; background:#fbfaf6; animation:detail-enter .24s ease both; }
      .personality-report__detail[hidden] { display:none; }
      .personality-report__detail h4 { margin:0 0 7px; font-size:18px; }
      .personality-report__celebrity { display:grid; grid-template-columns:116px minmax(0,1fr); gap:14px; align-items:start; margin:5px 0 14px; padding:10px; border:2px solid #211f2a; background:#f1eefc; }
      .personality-report__celebrity img { display:block; width:116px; aspect-ratio:1; border:2px solid #211f2a; object-fit:cover; background:#fff; }
      .personality-report__celebrity strong { display:block; margin:2px 0 4px; font-size:17px; }
      .personality-report__celebrity span { display:block; color:#5d5a67; font-size:13px; line-height:1.45; }
      .personality-report__celebrity.is-unavailable { grid-template-columns:1fr; }
      @keyframes report-enter { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      @keyframes detail-enter { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      @media (prefers-reduced-motion:reduce) { .personality-report, .personality-report__detail { animation:none; } .personality-report__topic { transition:none; } }
      @media (max-width:560px) { .personality-report { padding:16px; box-shadow:4px 4px 0 #211f2a; } .personality-report p { font-size:16px; } .personality-report__snapshot { font-size:17px !important; } .personality-report__topics { grid-template-columns:1fr; } .personality-report__celebrity { grid-template-columns:88px minmax(0,1fr); } .personality-report__celebrity img { width:88px; } }
    `;
    document.head.append(style);
  }

  window.renderPersonalityReport = (container, scores, stageKey) => {
    const stage = reports[stageKey];
    if (!stage || !container || !scores) return;
    const topId = Object.keys(scores).sort((a, b) => scores[b] - scores[a] || Number(a) - Number(b))[0];
    const names = { 1: '完美', 2: '助人', 3: '成就', 4: '自我', 5: '观察', 6: '忠诚', 7: '活跃', 8: '领袖', 9: '和平' };
    const name = names[topId];
    const content = stage.items[name];
    const profile = profiles[name];
    const guide = stageGuides[stageKey];
    if (!content || !profile || !guide) return;
    addStyles();
    container.querySelector('.personality-report')?.remove();
    const card = document.createElement('section');
    card.className = 'personality-report';
    card.setAttribute('aria-label', `${name}人格特征描述`);
    const eyebrow = document.createElement('p');
    eyebrow.className = 'personality-report__eyebrow';
    eyebrow.textContent = `${stage.label} · 得分最高的人格倾向`;
    const title = document.createElement('h3');
    title.textContent = `你更接近「${name}」`;
    const score = document.createElement('span');
    score.className = 'personality-report__score';
    score.textContent = `匹配度 ${scores[topId]}%`;
    title.append(score);
    const snapshot = document.createElement('p');
    snapshot.className = 'personality-report__snapshot';
    snapshot.textContent = profile.snapshot;
    const tags = document.createElement('div');
    tags.className = 'personality-report__tags';
    profile.tags.forEach(tag => {
      const label = document.createElement('span');
      label.className = 'personality-report__tag';
      label.textContent = tag;
      tags.append(label);
    });
    const explore = document.createElement('p');
    explore.className = 'personality-report__explore';
    explore.textContent = '想继续了解哪一面？';
    const topics = [
      ['核心关注', profile.core],
      ['你的优势', profile.strength],
      ['压力提醒', `${profile.stress} ${guide.stress}`],
      ['名人气质', profile.celebrity, profile.celebrityName, profile.celebrityImage]
    ];
    const topicButtons = document.createElement('div');
    topicButtons.className = 'personality-report__topics';
    const detail = document.createElement('section');
    detail.className = 'personality-report__detail';
    detail.hidden = true;
    const detailHeading = document.createElement('h4');
    const detailBody = document.createElement('p');
    detail.append(detailHeading, detailBody);
    const createCelebrityCard = (person, imageSource) => {
      const media = document.createElement('div');
      media.className = 'personality-report__celebrity';
      const image = document.createElement('img');
      image.alt = `${person}的公开照片`;
      const info = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = person;
      const status = document.createElement('span');
      status.textContent = '人物照片加载中';
      info.append(name, status);
      media.append(info);
      const showFallback = () => {
        image.remove();
        media.classList.add('is-unavailable');
        status.textContent = '暂时无法载入人物照片';
      };
      image.addEventListener('load', () => {
        media.prepend(image);
        status.textContent = '人物照片';
      }, { once:true });
      image.addEventListener('error', showFallback, { once:true });
      image.src = imageSource;
      return media;
    };
    const activateTopic = topicIndex => {
      const [topicTitle, topicText, person, imageSource] = topics[topicIndex];
      detailHeading.textContent = topicTitle;
      detailBody.textContent = topicText;
      detail.replaceChildren(detailHeading);
      if (person) detail.append(createCelebrityCard(person, imageSource));
      detail.append(detailBody);
      detail.hidden = false;
      [...topicButtons.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === topicIndex)));
    };
    topics.forEach(([topicTitle], index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'personality-report__topic';
      button.textContent = topicTitle;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => activateTopic(index));
      topicButtons.append(button);
    });
    card.append(eyebrow, title, snapshot, tags, explore, topicButtons, detail);
    const restart = container.querySelector('#restart');
    container.insertBefore(card, restart || null);
  };
})();
