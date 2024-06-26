import { getMianBanGongJI, getShenfaJiachengHuixin } from '@/components/BasicSet/CharacterSet/util'
import { 增益计算类型枚举 } from './../../@types/enum'
import { TargetDTO } from '@/@types/character'
import { guoshiHuixinLv, guoshiHuixinshanghai, guoshiResult } from '@/utils/help'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO, CycleGain } from '@/@types/cycle'
import { 增益类型枚举 } from '@/@types/enum'
import { DpsGainBasicDTO, SkillBasicDTO, SKillGainData } from '@/@types/skill'
import { skillFinalDps, 获取全能加成面板 } from '@/utils/skill-dps'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { TuanduiZengyi_DATA } from '@/数据/团队增益'
import { Zhenyan_DATA } from '@/数据/阵眼'
import { 属性系数 } from '@/数据/常量'
import XIAOCHI_DATA from '@/数据/小药小吃'
import 装备增益数据 from '@/数据/装备/装备增益数据'

interface GetDpsTotalParams {
  计算循环: CycleDTO[]
  角色最终属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能基础数据: SkillBasicDTO[]
  增益启用: boolean
  增益数据: ZengyixuanxiangDataDTO
  战斗时间: number
}

export interface DpsListData {
  countName?: string // 用于显示在统计记录里的dps
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
  会心几率: number // 会心几率
}

// 计算技能循环总输出
export const getDpsTotal = (props: GetDpsTotalParams) => {
  const { 计算循环, 角色最终属性, 当前目标, 技能基础数据, 增益启用, 增益数据, 战斗时间 } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: DpsListData[] = []
  const 计算目标 = 当前目标
  const 计算属性 = 获取全能加成面板(角色最终属性)

  // 获取装备增益等带来的最终增益集合
  let 总增益集合: SKillGainData[] = getAllGainData(计算属性, [])

  // 根据增益信息修改最终循环内容
  const 最终循环: CycleDTO[] = getFinalCycleData(计算属性, [...计算循环], 战斗时间)

  if (增益启用 && 增益数据) {
    const 团队增益增益集合 = getZengyi(增益数据)
    总增益集合 = 总增益集合.concat(团队增益增益集合)

    if (增益数据?.团队增益.find((item) => item.增益名称 === '飘黄' && !!item.启用)) {
      最终循环.push({
        技能名称: '逐云寒蕊',
        技能数量: Math.floor(战斗时间 * 0.13),
        技能增益列表: [],
      })
    }
  }

  // 遍历循环，获取每一个技能的总输出
  最终循环.forEach((item) => {
    // 获取循环内某个技能的总dps
    const { totalDps, 总会心数量 } = getSingleSkillTotalDps(
      item,
      计算属性,
      计算目标,
      技能基础数据,
      总增益集合
    )
    dpsList.push({
      countName: item.统计用技能名称,
      name: item.技能名称,
      dps: totalDps,
      number: item.技能数量,
      会心几率: 总会心数量 / item.技能数量,
    })
    total = total + totalDps
  })

  return { totalDps: total, dpsList }
}

// 根据增益信息修改最终循环内容
export const getFinalCycleData = (角色最终属性, 计算循环, 战斗时间): CycleDTO[] => {
  const 最终循环: CycleDTO[] = [...计算循环]
  if (角色最终属性?.装备增益?.大附魔_伤腕) {
    最终循环.push({
      技能名称: '昆吾·弦刃',
      技能数量: Math.floor(战斗时间 / 15),
    })
  }
  if (角色最终属性?.装备增益?.大附魔_伤鞋) {
    最终循环.push({
      技能名称: '刃凌',
      技能数量: Math.floor(战斗时间 / 10),
    })
  }

  if (角色最终属性?.装备增益?.龙门武器) {
    最终循环.push({
      技能名称: '剑风',
      技能数量: Math.floor((战斗时间 * 6) / 30),
      技能增益列表: [{ 增益名称: '承契_5层', 增益技能数: Math.floor((战斗时间 * 6) / 30) }],
    })
  }
  return 最终循环
}

// 统计增益，获取增益的集合
export const getAllGainData = (
  角色最终属性,
  defaultGainData?
): SKillGainData[] => {
  let 总增益集合: SKillGainData[] = [...(defaultGainData || [])];
  if (角色最终属性?.装备增益?.套装会心会效) {
    // 偷懒覆盖率测试80%左右
    总增益集合 = 总增益集合.concat(装备增益数据.套装会心会效);
  }
  if (
    角色最终属性?.装备增益?.切糕会心 &&
    角色最终属性?.装备增益?.切糕会心 > 0
  ) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心);
  }
  if (
    角色最终属性?.装备增益?.切糕无双 &&
    角色最终属性?.装备增益?.切糕无双 > 0
  ) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双);
  }
  if (
    角色最终属性?.装备增益?.切糕会心_英雄 &&
    角色最终属性?.装备增益?.切糕会心_英雄 > 0
  ) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心_英雄);
  }
  if (
    角色最终属性?.装备增益?.切糕无双_英雄 &&
    角色最终属性?.装备增益?.切糕无双_英雄 > 0
  ) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双_英雄);
  }
  if (角色最终属性?.装备增益?.冬至套装) {
    总增益集合 = 总增益集合.concat(装备增益数据.冬至套装);
  }
  if (角色最终属性?.装备增益?.水特效武器) {
    总增益集合 = 总增益集合.concat(装备增益数据.水特效武器);
  }
  if (角色最终属性?.装备增益?.水特效武器_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.水特效武器_英雄);
  }
  if (角色最终属性?.装备增益?.风特效腰坠) {
    总增益集合 = 总增益集合.concat(装备增益数据.风特效腰坠);
  }
  if (角色最终属性?.装备增益?.风特效腰坠_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.风特效腰坠_英雄);
  }
  // 大附魔增益
  if (角色最终属性?.装备增益?.大附魔_伤帽) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤帽);
  }
  if (角色最终属性?.装备增益?.大附魔_伤衣) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤衣);
  }
  if (角色最终属性?.装备增益?.大附魔_伤腰) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤腰);
  }
  if (角色最终属性?.装备增益?.龙门武器) {
    总增益集合 = 总增益集合.concat(装备增益数据.龙门武器);
  }

  console.log(总增益集合);
  return 总增益集合;
};

// 获取循环内某个技能的总dps
export const getSingleSkillTotalDps = (
  循环: CycleDTO,
  最终人物属性: CharacterFinalDTO,
  计算目标: TargetDTO,
  技能基础数据: SkillBasicDTO[],
  总增益集合: SKillGainData[]
) => {
  // 在技能数据模型中找到当前执行循环内技能的数据，获取各种系数
  const 当前技能属性 = 技能基础数据.find(
    (item) => item.技能名称 === 循环?.技能名称
  );
  // 总输出
  let totalDps = 0;
  let 总会心数量 = 0;
  let 无增益技能数 = 循环?.技能数量;
  let 技能增益集合 = [...总增益集合];
  if (当前技能属性) {
    // 计算技能常驻固定增益（秘籍、奇穴）等
    当前技能属性.技能增益列表.forEach((增益) => {
      if (增益.常驻增益) {
        if (增益.增益集合?.length) {
          技能增益集合 = 技能增益集合.concat(增益.增益集合);
        }
      }
    });

    // 判断增益技能的总伤
    if (循环?.技能增益列表?.length) {
      循环?.技能增益列表.forEach((增益) => {
        无增益技能数 = 无增益技能数 - 增益.增益技能数;
        const 技能独立增益集合列表: SKillGainData[] = getGainList(
          增益,
          当前技能属性
        );
        if (增益.增益技能数) {
          const 用于计算的增益集合 = [...技能增益集合, ...技能独立增益集合列表];
          const { 期望技能总伤, 会心数量 } = geSkillTotalDps(
            当前技能属性,
            最终人物属性,
            增益.增益技能数,
            计算目标,
            用于计算的增益集合
          );
          totalDps = totalDps + 期望技能总伤;
          总会心数量 = 总会心数量 + 会心数量;
        }
      });
    }

    if (无增益技能数) {
      // 判断常规未增益技能的总伤
      const { 期望技能总伤, 会心数量 } = geSkillTotalDps(
        当前技能属性,
        最终人物属性,
        无增益技能数,
        计算目标,
        技能增益集合
      );

      totalDps = totalDps + 期望技能总伤;
      总会心数量 = 总会心数量 + 会心数量;
    }

    return { totalDps, 总会心数量 };
  }

  return { totalDps, 总会心数量 };
};

// 技能dps结果期望
export const geSkillTotalDps = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  技能总数: number,
  当前目标: TargetDTO,
  总增益集合: SKillGainData[]
) => {
  let 增益计算基础: DpsGainBasicDTO = {
    计算目标: 当前目标,
    最终人物属性: { ...人物属性 },
    技能增伤: {
      通用A类增伤: 1,
      技能独立增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
    },
    郭氏额外会效果值: 0,
    额外会心率: 0,
    郭式无视防御: 0,
    身法数值加成: 0,
    郭氏身法: 0,
    郭氏无双等级: 0,
    郭氏破防等级: 0,
    郭氏基础攻击: 0,
    郭氏武器伤害: 0,
  };
  // 对增益集合进行排序，先计算数值。后计算百分比
  const 当前技能计算增益集合: SKillGainData[] = getSortZengyiList(总增益集合);

  // 第一轮计算，计算身法对面板的基础加成
  // 单独先计算身法增益的收益
  当前技能计算增益集合
    .filter((item) =>
      [增益类型枚举.身法, 增益类型枚举.郭氏身法].includes(item.增益类型)
    )
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础);
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      };
    });

  // 郭氏身法在是否开启卢令下的提升百分比
  const 身法提升百分比 = 增益计算基础?.郭氏身法 / 1024;
  // 郭式身法对人物属性身法的提升值
  const 郭式身法对属性身法的提升值 = Math.floor(
    增益计算基础?.最终人物属性.身法 * 身法提升百分比
  );
  // 郭式力道对增益提供的力道二次加成提升值
  const 郭式身法对增益内身份的提升值 = Math.floor(
    增益计算基础?.身法数值加成 * 身法提升百分比
  );
  // 身法数值的提升值
  const 增益内身法提升值 =
    增益计算基础?.身法数值加成 + 郭式身法对增益内身份的提升值;
  const 总身法提升值 = 郭式身法对属性身法的提升值 + 增益内身法提升值;

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      身法: 增益计算基础?.最终人物属性.身法 + 总身法提升值,
      会心值: getShenfaJiachengHuixin(
        增益计算基础?.最终人物属性.会心值,
        总身法提升值
      ),
      面板攻击: getMianBanGongJI(
        增益计算基础?.最终人物属性.面板攻击,
        总身法提升值
      ),
    },
  };

  // 除去身法基础计算的剩余计算
  当前技能计算增益集合
    .filter(
      (item) =>
        ![增益类型枚举.身法, 增益类型枚举.郭氏身法].includes(item.增益类型)
    )
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础);
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      };
    });

  // 将ABCD类技能增伤相乘
  const 最终技能增伤 =
    增益计算基础?.技能增伤?.通用A类增伤 *
    增益计算基础?.技能增伤?.技能独立增伤 *
    增益计算基础?.技能增伤?.易伤增伤 *
    增益计算基础?.技能增伤?.非侠增伤;

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      无双值:
        增益计算基础?.最终人物属性.无双值 +
        Math.floor((属性系数.无双 * 增益计算基础?.郭氏无双等级) / 1024),
      破防值:
        增益计算基础?.最终人物属性.破防值 +
        Math.floor(
          (增益计算基础?.最终人物属性.破防值 * 增益计算基础?.郭氏破防等级) /
            1024
        ),
      基础攻击:
        增益计算基础?.最终人物属性.基础攻击 +
        Math.floor(
          (增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) /
            1024
        ),
      面板攻击:
        增益计算基础?.最终人物属性.面板攻击 +
        Math.floor(
          (增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) /
            1024
        ),
      武器伤害_最小值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        Math.floor(
          (增益计算基础?.最终人物属性.武器伤害_最小值 *
            增益计算基础?.郭氏武器伤害) /
            1024
        ),
      武器伤害_最大值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        Math.floor(
          (增益计算基础?.最终人物属性.武器伤害_最大值 *
            增益计算基础?.郭氏武器伤害) /
            1024
        ),
    },
  };

  const { 期望技能总伤, 会心数量 } = getSkillDamage({
    当前技能属性,
    技能总数,
    当前目标: 增益计算基础?.计算目标,
    最终人物属性: 增益计算基础?.最终人物属性,
    技能增伤: 最终技能增伤,
    郭氏额外会效果值: 增益计算基础?.郭氏额外会效果值,
    额外会心率: 增益计算基础?.额外会心率,
    郭式无视防御: 增益计算基础?.郭式无视防御,
  });

  console.log("------------------", {
    当前技能属性,
    技能总数,
    当前目标: 增益计算基础?.计算目标,
    最终人物属性: 增益计算基础?.最终人物属性,
    技能增伤: 最终技能增伤,
    郭氏额外会效果值: 增益计算基础?.郭氏额外会效果值,
    额外会心率: 增益计算基础?.额外会心率,
    郭式无视防御: 增益计算基础?.郭式无视防御,
  });
  return { 期望技能总伤, 会心数量 };
};

const getSkillDamage = ({
  当前技能属性,
  技能总数,
  当前目标,
  最终人物属性,
  技能增伤,
  郭氏额外会效果值,
  额外会心率,
  郭式无视防御,
}: {
  当前技能属性: SkillBasicDTO;
  最终人物属性: CharacterFinalDTO;
  技能增伤: number;
  当前目标: TargetDTO;
  技能总数: number;
  郭氏额外会效果值: number;
  额外会心率: number;
  郭式无视防御: number;
}) => {
  const 目标 = {
    ...当前目标,
    防御点数:
      guoshiResult(当前目标.防御点数, -郭式无视防御) > 0
        ? guoshiResult(当前目标.防御点数, -郭式无视防御)
        : 0,
  };

  const { min, max } = skillFinalDps(当前技能属性, 最终人物属性, 目标);

  const 最小技能总伤 = min * 技能增伤;
  const 最大技能总伤 = max * 技能增伤;

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2);

  const 会心期望率 = guoshiHuixinLv(最终人物属性.会心值) + 额外会心率;

  const 会心数量 = 会心期望率 * 技能总数;

  const 会心实际伤害 = guoshiHuixinshanghai(
    最终人物属性.会心效果值,
    平均伤害,
    郭氏额外会效果值
  );

  const 技能期望伤害 = Math.round(
    平均伤害 + 会心期望率 * (会心实际伤害 - 平均伤害)
  );
  // const 技能期望伤害 = Math.round(平均伤害 + 会心期望率 * (会心实际伤害 - 平均伤害))

  const 期望技能总伤 = (技能期望伤害 ? 技能期望伤害 : 1) * 技能总数;

  return { 期望技能总伤, 会心数量 };
};

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 * 计算A类增伤，所有增伤害相加
 */
export const 通用增益计算 = (
  增益: SKillGainData,
  增益计算基础: DpsGainBasicDTO
): DpsGainBasicDTO => {
  const { 增益数值, 增益类型 } = 增益;
  const 计算后人物属性 = { ...增益计算基础?.最终人物属性 };
  let 通用A类增伤 = 增益计算基础?.技能增伤?.通用A类增伤;
  let 技能独立增伤 = 增益计算基础?.技能增伤?.技能独立增伤;
  let 易伤增伤 = 增益计算基础?.技能增伤?.易伤增伤;
  let 非侠增伤 = 增益计算基础?.技能增伤?.非侠增伤;
  let 郭氏额外会效果值 = 增益计算基础?.郭氏额外会效果值;
  let 额外会心率 = 增益计算基础?.额外会心率;
  let 当前目标 = 增益计算基础?.计算目标;
  let 郭式无视防御 = 增益计算基础?.郭式无视防御;
  let 身法数值加成 = 增益计算基础?.身法数值加成;
  let 郭氏身法 = 增益计算基础?.郭氏身法;
  let 郭氏无双等级 = 增益计算基础?.郭氏无双等级;
  let 郭氏破防等级 = 增益计算基础?.郭氏破防等级;
  let 郭氏基础攻击 = 增益计算基础?.郭氏基础攻击;
  let 郭氏武器伤害 = 增益计算基础?.郭氏武器伤害;

  switch (增益类型) {
    case 增益类型枚举.全能等级:
      计算后人物属性.全能值 = 计算后人物属性.全能值 + 增益数值;
      计算后人物属性.破招值 = 计算后人物属性.破招值 + 增益数值;
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值;
      break;
    case 增益类型枚举.基础攻击:
      计算后人物属性.基础攻击 = 计算后人物属性.基础攻击 + 增益数值;
      计算后人物属性.面板攻击 = 计算后人物属性.面板攻击 + 增益数值;
      break;
    case 增益类型枚举.外攻破防等级:
      计算后人物属性.破防值 = 计算后人物属性.破防值 + 增益数值;
      break;

    case 增益类型枚举.外攻会心等级:
      计算后人物属性.会心值 = 计算后人物属性.会心值 + 增益数值;
      break;
    case 增益类型枚举.破招:
      计算后人物属性.破招值 = 计算后人物属性.破招值 + 增益数值;
      break;
    case 增益类型枚举.无视防御:
      if (当前目标.防御点数 - 增益数值 > 0) {
        当前目标 = {
          ...当前目标,
          防御点数: 当前目标.防御点数 - 增益数值,
        };
      } else {
        当前目标 = {
          ...当前目标,
          防御点数: 0,
        };
      }
      break;
    case 增益类型枚举.身法:
      身法数值加成 = 身法数值加成 + 增益数值;
      break;
    case 增益类型枚举.无双等级:
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值;
      break;
    case 增益类型枚举.加速:
      计算后人物属性.加速值 = 计算后人物属性.加速值 + 增益数值;
      break;
    case 增益类型枚举.近战武器伤害:
      计算后人物属性.武器伤害_最小值 += 增益数值;
      计算后人物属性.武器伤害_最大值 += 增益数值;
      break;
    case 增益类型枚举.外攻会心效果等级:
      计算后人物属性.会心效果值 = 计算后人物属性.会心效果值 + 增益数值;
      break;
    case 增益类型枚举.郭氏外攻会心效果等级:
      郭氏额外会效果值 = 郭氏额外会效果值 + 增益数值;
      break;
    case 增益类型枚举.外攻会心百分比:
      额外会心率 = 额外会心率 + 增益数值;
      break;
    case 增益类型枚举.郭氏无视防御:
      郭式无视防御 = 郭式无视防御 + 增益数值;
      break;
    case 增益类型枚举.郭氏外攻破防等级:
      郭氏破防等级 = 郭氏破防等级 + 增益数值;
      break;
    case 增益类型枚举.郭氏无双等级:
      郭氏无双等级 = 郭氏无双等级 + 增益数值;
      break;
    case 增益类型枚举.郭氏基础攻击:
      郭氏基础攻击 = 郭氏基础攻击 + 增益数值;
      break;
    case 增益类型枚举.郭氏武器伤害:
      郭氏武器伤害 = 郭氏武器伤害 + 增益数值;
      break;
    case 增益类型枚举.郭氏身法:
      郭氏身法 = 郭氏身法 + 增益数值;
      break;
    case 增益类型枚举.伤害百分比:
      // 分别计算ABCD类增益，同类增益相加，结果相乘
      if (增益?.增益计算类型 === 增益计算类型枚举?.A) {
        通用A类增伤 = 通用A类增伤 + 增益数值;
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.B) {
        技能独立增伤 = 技能独立增伤 + 增益数值;
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.C) {
        易伤增伤 = 易伤增伤 + 增益数值;
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.D) {
        非侠增伤 = 非侠增伤 + 增益数值;
      }
      break;
    default:
      console.warn(`存在未计算增益${增益?.增益类型}`, 增益);
      break;
  }

  return {
    计算目标: 当前目标,
    最终人物属性: { ...计算后人物属性 },
    技能增伤: {
      通用A类增伤: 通用A类增伤,
      技能独立增伤: 技能独立增伤,
      易伤增伤: 易伤增伤,
      非侠增伤: 非侠增伤,
    },
    郭氏额外会效果值: 郭氏额外会效果值,
    额外会心率: 额外会心率,
    郭式无视防御: 郭式无视防御,
    身法数值加成: 身法数值加成,
    郭氏身法: 郭氏身法,
    郭氏无双等级: 郭氏无双等级,
    郭氏破防等级: 郭氏破防等级,
    郭氏基础攻击: 郭氏基础攻击,
    郭氏武器伤害: 郭氏武器伤害,
  };
};

/**
 * @name 该技能数量下同时计算的多个增益的增益集合
 * getGainList
 */
export const getGainList = (增益: CycleGain, 当前技能属性: SkillBasicDTO) => {
  // 将该数量下同时计算的多个增益转为数组
  const gainNameList = 增益.增益名称.split(',')

  // 该技能数量下同时计算的多个增益的增益集合
  let 增益集合列表: SKillGainData[] = []

  gainNameList.forEach((i) => {
    const findGain = 当前技能属性?.技能增益列表.find(
      (item) => item.增益名称 === i && (item.常驻增益 || item.增益启用开关)
    )
    if (findGain) {
      增益集合列表 = 增益集合列表.concat(findGain?.增益集合 || [])
    }
  })

  return 增益集合列表
}

/**
 * 计算增益选项带来的增益。获取增益集合
 */
export const getZengyi = (增益数据: ZengyixuanxiangDataDTO): SKillGainData[] => {
  let 增益集合: SKillGainData[] = []

  if (增益数据?.小吃) {
    const 小吃数据集合 = XIAOCHI_DATA.filter((item) => 增益数据?.小吃?.includes(item.小吃名称))
    if (小吃数据集合?.length) {
      小吃数据集合.forEach((a) => {
        if (a?.增益集合?.length) {
          增益集合 = 增益集合.concat(a?.增益集合)
        }
      })
    }
  }

  if (增益数据?.团队增益?.length) {
    const 团队增益集合 = 增益数据?.团队增益
      ?.filter((item) => item.启用)
      .map((item) => {
        const data: any = TuanduiZengyi_DATA.find((a) => a.增益名称 === item.增益名称)
        return {
          ...data,
          增益集合: data?.增益集合.map((c) => {
            return {
              ...c,
              增益数值: (c?.增益数值 * item?.层数 * item?.覆盖率) / 100,
            }
          }),
        }
      })

    if (团队增益集合?.length) {
      团队增益集合.forEach((item) => {
        增益集合 = 增益集合.concat(item.增益集合)
      })
    }
  }

  if (增益数据?.阵眼) {
    const 增益阵眼 = Zhenyan_DATA.find((item) => item.阵眼名称 === 增益数据?.阵眼)
    if (增益阵眼 && 增益阵眼?.增益集合?.length) {
      增益集合 = 增益集合.concat(增益阵眼.增益集合)
    }
  }

  return 增益集合
}

// 对增益进行排序
export const getSortZengyiList = (list: SKillGainData[]): SKillGainData[] => {
  const SortKeyList = Object.keys(增益类型枚举)
  const newList = [...list]

  newList.sort((a, b) => {
    return SortKeyList.indexOf(a.增益类型) - SortKeyList.indexOf(b.增益类型)
  })

  return newList.filter((item) => !!item)
}
