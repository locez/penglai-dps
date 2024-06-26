/**
 * @name 阵眼数据模型
 */

import { 增益计算位置枚举 } from './enum'
import { SKillGainData } from './skill'

export interface ZhenyanGainDTO {
  /**
   * @name 阵眼名称
   */
  阵眼名称: string
  /**
   * @name 增益集合
   */
  增益集合?: ZengyanZengyiData[]
  /**
   * @name 伤害提升百分比
   */
  伤害提升百分比?: number
  /**
   * @name 伤害是否提升
   */
  伤害是否提升?: boolean
  /**
   * @name 伤害排名
   */
  伤害排名?: number
}

export interface ZengyanZengyiData extends SKillGainData {
  计算位置: 增益计算位置枚举
}
