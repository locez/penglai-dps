// import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { 增益计算类型枚举, 增益类型枚举 } from "@/@types/enum";
import { SkillGainDTO } from "../../@types/skill";
import commonGainDTO from "./common";

const 振翅图南GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: "濯流",
    增益所在位置: "奇穴",
    常驻增益: true,
    增益集合: [
      {
        // 贯侯是直接修改标鹄基础系数进行的加成，这里直接采用独立伤害百分比计算
        // 代码里用的是DST_NPC_DAMAGE_COEFFICIENT，和非侠是同一个
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.D,
        增益数值: 1.5,
      },
    ],
  },
  // 4件套
  {
    增益名称: "套装10%_1",
    增益所在位置: "套装",
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
  // 2件套
  {
    增益名称: "套装10%_2",
    增益所在位置: "套装",
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: "CW5%",
    增益所在位置: "武器",
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
];

export default 振翅图南GainDTO;
