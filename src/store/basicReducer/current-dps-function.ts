// 根据当前增益装备，计算实时循环总dps
import { RootState } from '../index'
import { 根据秘籍奇穴装备格式化技能信息 } from '@/utils/skill-dps'
import { 更新当前计算结果DPS } from './index'
import { CharacterFinalDTO } from '@/@types/character'
import { SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'
import { CycleDTO } from '@/@types/cycle'
import useCycle from '@/hooks/use-cycle'
import { 全局平台标识类型 } from '@/@types/common'
import { 全局平台标识枚举 } from '@/@types/enum'
import { MijiSelectedData } from '@/@types/miji'

interface CurrentDpsFunctionProps {
  showTime?: boolean // 是否展示计算时间
  updateCurrentDps?: boolean // 是否更新当前dps结果
  更新角色面板?: CharacterFinalDTO // 传入的需要更新的角色面板
  更新技能基础数据?: SkillBasicDTO[] // 传入的需要更新的技能基础数据
  更新团队增益数据?: ZengyixuanxiangDataDTO // 传入的需要更新团队增益数据
  更新默认增益集合?: SKillGainData[] // 用于增益计算
  是否郭氏计算?: boolean // 是否郭式计算
  更新计算时间?: number // 更新计算时间
  更新循环技能列表?: CycleDTO[] // 更新循环技能列表
  更新循环名称?: string // 更新循环名称
  更新奇穴数据?: string[] // 更新奇穴数据
  更新平台标识?: 全局平台标识类型
  更新秘籍信息?: MijiSelectedData[]
}

export interface CurrentDpsFunctionRes {
  totalDps: number
  dpsList: any[]
  dpsPerSecond: number
  dpsTime: number
}

export const currentDpsFunction =
  (props?: CurrentDpsFunctionProps) =>
  (dispatch, getState): CurrentDpsFunctionRes => {
    const {
      updateCurrentDps = false,
      更新角色面板 = {},
      更新团队增益数据 = {},
      更新技能基础数据,
      更新默认增益集合 = [],
      是否郭氏计算 = true,
      更新计算时间,
      更新循环技能列表,
      更新奇穴数据,
      更新平台标识,
      更新秘籍信息,
    } = props || {}

    const currentState: RootState = getState() || {}

    const 延迟 = currentState?.basic?.网络延迟
    const 当前角色面板 = { ...currentState?.basic?.角色最终属性, ...更新角色面板 }

    const 当前目标 = currentState?.basic?.当前输出计算目标
    const 奇穴数据 = 更新奇穴数据?.length ? 更新奇穴数据 : currentState.basic.当前奇穴信息
    const 团队增益数据 = { ...currentState?.basic?.增益数据, ...更新团队增益数据 }
    const 团队增益是否启用 = currentState?.basic?.增益启用

    const 当前平台标识 = 更新平台标识 || currentState?.basic?.当前平台标识
    const 当前为无界平台 = 当前平台标识 === 全局平台标识枚举.无界
    const 当前秘籍信息 = 更新秘籍信息 || currentState?.basic?.当前秘籍信息

    const 技能基础数据 =
      更新技能基础数据 ||
      根据秘籍奇穴装备格式化技能信息({
        技能基础数据: currentState?.basic?.技能基础数据,
        秘籍信息: 当前秘籍信息,
        奇穴数据,
        装备增益: 当前角色面板?.装备增益,
      })

    const 内存循环信息 = useCycle({
      角色最终属性: 当前角色面板,
      增益数据: 团队增益数据,
      增益启用: 团队增益是否启用,
      网络延迟: 延迟,
      当前奇穴信息: 当前为无界平台 ? [] : 奇穴数据,
      当前循环各加速枚举: currentState?.basic?.当前循环各加速枚举,
      当前循环名称: currentState?.basic?.当前循环名称,
      当前平台标识,
    })

    const 当前内存技能列表 = 内存循环信息?.cycle

    const 当前循环技能列表 = 更新循环技能列表?.length ? 更新循环技能列表 : 当前内存技能列表

    if (!当前循环技能列表?.length || !当前角色面板) {
      return { totalDps: 0, dpsList: [], dpsPerSecond: 0, dpsTime: 0 }
    }

    const 战斗时间 = 更新计算时间 || 内存循环信息?.dpsTime || 0

    // const dpsFunction =
    //   当前平台标识 === 全局平台标识枚举.旗舰版
    //     ? 是否郭氏计算
    //       ? getDpsTotal
    //       : getNotGuoDpsTotal
    //     : 是否郭氏计算
    //     ? getDpsTotal
    //     : getNotGuoDpsTotal

    const dpsFunction = 是否郭氏计算 ? getDpsTotal : getNotGuoDpsTotal

    // dps结果计算
    const { totalDps, dpsList } = dpsFunction({
      计算循环: 当前循环技能列表,
      角色最终属性: 当前角色面板,
      当前目标: 当前目标,
      技能基础数据: 技能基础数据,
      增益启用: 团队增益是否启用,
      增益数据: 团队增益数据,
      默认增益集合: 更新默认增益集合 || [],
      战斗时间,
    })

    // 每秒dps
    const dpsPerSecond = Math.floor(totalDps / 战斗时间)

    if (updateCurrentDps) {
      dispatch(更新当前计算结果DPS(dpsPerSecond))
    }

    return { totalDps, dpsList, dpsPerSecond, dpsTime: 战斗时间 }
  }
