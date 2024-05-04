import { 宠物基础数据 } from '../../constant/skill'
import { 待生效事件 } from '../type'
import 技能统一类 from './技能统一类'

class 宠物 extends 技能统一类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  召唤宠物(宠物名称, 额外buff?) {
    // 添加宠物进入场地日志
    this.模拟循环.添加战斗日志?.({
      日志: `${宠物名称}-宠物`,
      日志类型: '宠物进入场地',
      日志时间: this.模拟循环.当前时间,
    })
    const 本次召唤宠物数据 = 宠物基础数据[宠物名称]
    this.模拟循环.更新当前宠物数据(宠物名称, {
      宠物: 宠物名称,
      入场时间: this.模拟循环.当前时间,
      离场时间: this.模拟循环.当前时间 + 本次召唤宠物数据.释放后退场时间,
    })
    switch (宠物名称) {
      case '狼':
        this.狼攻击事件(本次召唤宠物数据, 额外buff)
        this.宠物离场事件(本次召唤宠物数据)
        break
      default:
        this.宠物攻击事件(本次召唤宠物数据, 额外buff)
        this.宠物离场事件(本次召唤宠物数据)
        break
    }
  }

  // 事件预备-start
  狼攻击事件(本次召唤宠物数据, 额外buff?) {
    const 待生效事件: 待生效事件[] = []
    for (let i = 0; i < 本次召唤宠物数据.宠物攻击次数; i++) {
      待生效事件.push({
        事件名称: `${本次召唤宠物数据.宠物}-宠物攻击`,
        事件时间:
          this.模拟循环.当前时间 +
          本次召唤宠物数据.释放后攻击时间 +
          本次召唤宠物数据.宠物攻击频率 * i,
        事件备注: {
          宠物名称: 本次召唤宠物数据.宠物,
          额外buff,
        },
      })
    }
    this.模拟循环.添加待生效事件队列(待生效事件)
  }

  宠物攻击事件(本次召唤宠物数据, 额外buff?) {
    this.模拟循环.添加待生效事件队列([
      {
        事件名称: `${本次召唤宠物数据.宠物}-宠物攻击`,
        事件时间: this.模拟循环.当前时间 + 本次召唤宠物数据.释放后攻击时间,
        事件备注: {
          宠物名称: 本次召唤宠物数据.宠物,
          额外buff,
        },
      },
    ])
  }

  宠物离场事件(本次召唤宠物数据) {
    this.模拟循环.添加待生效事件队列([
      {
        事件名称: `${本次召唤宠物数据.宠物}-宠物离场`,
        事件时间: this.模拟循环.当前时间 + 本次召唤宠物数据.释放后退场时间,
        事件备注: {
          宠物名称: 本次召唤宠物数据.宠物,
        },
      },
    ])
  }
  // 事件预备-end

  // 实际动作行为
  宠物攻击(宠物名称, 事件时间, 额外buff) {
    // 点了孰湖奇穴后宠物出现携带两层
    const 携带承契层数 = this.模拟循环.校验奇穴是否存在('孰湖') ? 2 : 1

    // 鹰上四层贯穿
    if (宠物名称 === '鹰') {
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿('鹰')
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿('鹰')
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿('鹰')
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿('鹰')
    }

    // 九乌宠物上两层贯穿
    if (this.模拟循环.校验奇穴是否存在('九乌')) {
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿(`${宠物名称}-九乌`)
      this.模拟循环.技能类实例集合.贯穿.获得和刷新贯穿(`${宠物名称}-九乌`)
    }

    this.模拟循环.技能造成伤害(
      Skill_Cycle_Map[宠物名称],
      1,
      [`承契_${携带承契层数}层`, ...(额外buff || [])],
      事件时间,
      false,
      true
    )
  }

  宠物离场(宠物名称, 事件时间) {
    if (this.模拟循环.校验奇穴是否存在('鹿蜀')) {
      // 点了孰湖奇穴后宠物出现携带两层
      this.模拟循环.获得承契()
      if (this.模拟循环.校验奇穴是否存在('孰湖')) {
        this.模拟循环.获得承契()
      }
    }

    this.模拟循环.添加战斗日志({
      日志: `${宠物名称}-宠物`,
      日志类型: '宠物离开场地',
      日志时间: 事件时间,
    })
  }
}

export default 宠物

// 没表明枚举就直接取原值
export const Skill_Cycle_Map = {
  狼: '攻击-狼',
  虎: '攻击-虎',
  鹰: '攻击-鹰',
  熊: '攻击-熊',
  猪: '重击',
  象: '践踏',
}
