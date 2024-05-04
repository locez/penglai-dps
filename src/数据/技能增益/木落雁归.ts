// import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { 增益计算类型枚举, 增益类型枚举 } from "@/@types/enum";
import { SkillGainDTO } from "../../@types/skill";
import commonGainDTO from "./common";

const 木落雁归GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: "江汉",
    增益所在位置: "奇穴",
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
      {
        增益类型: 增益类型枚举.外攻会心效果等级,
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
  {
    增益名称: "小CW会心5%",
    增益所在位置: "武器",
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
];

export default 木落雁归GainDTO;
