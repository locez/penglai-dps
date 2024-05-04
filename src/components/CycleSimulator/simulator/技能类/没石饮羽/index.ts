import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'
import { 待生效事件 } from '../../type'

class 没石饮羽 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '没石饮羽')
  static 初始作用间隔帧 = 20 // 固定时间轴，不吃加速
  static 作用间隔帧 = 6 // 固定时间轴，不吃加速
  static 作用次数 = 3

  constructor(模拟循环) {
    super(模拟循环)
    // 根据加速修改实际读条帧
  }

  生命周期() {
    this.释放()
    this.释放后()
  }

  释放() {
    this.模拟循环.添加战斗日志?.({
      日志: '没石饮羽',
      日志类型: '释放技能',
    })
    // 开始读条
    this.释放没石饮羽()
    return
  }

  释放没石饮羽() {
    // 再待触发事件里加入三个队列事件
    const 待生效事件: 待生效事件[] = []
    let 能否触发于狩 = false

    if (this.模拟循环.校验奇穴是否存在('于狩')) {
      this.模拟循环.获得承契()
      能否触发于狩 = this.模拟循环.角色状态信息.箭数 <= 5 && this.模拟循环.角色状态信息.箭数 >= 3
    }

    for (let i = 0; i < 没石饮羽.作用次数; i++) {
      const 事件时间 = this.模拟循环.当前时间 + 没石饮羽.初始作用间隔帧 + 没石饮羽.作用间隔帧 * i
      待生效事件.push({
        事件名称: `没石饮羽·${i + 1}`,
        事件时间: 事件时间,
        事件备注: {
          触发于狩: 能否触发于狩,
          次数: i + 1,
        },
      })
    }

    this.模拟循环.添加待生效事件队列(待生效事件)
  }

  没石饮羽触发(配置) {
    if (配置.触发于狩) {
      this.模拟循环.于狩引爆贯穿判定(`没石饮羽·${配置.次数}`)
    }
    this.模拟循环.技能类实例集合?.饮羽簇?.饮羽簇造成伤害?.('没石饮羽')
    // this.模拟循环.金乌箭判定()
    // this.模拟循环.标鹄判定()
    // this.触发伤害行为('饮羽簇')
  }

  释放后() {
    // this.模拟循环.添加待生效事件队列([
    //   {
    //     事件名称: `卸除buff-饮羽簇追`,
    //     事件时间: this.模拟循环.当前时间 + 32,
    //     事件备注: { buff名称: '饮羽簇追', buff对象: '自身', 卸除层数: 9999 },
    //   },
    // ])
    this.模拟循环.卸除buff({ 名称: '饮羽簇追', 对象: '自身' })
    this.模拟循环.消耗箭('没石饮羽', 3)
  }
}

export default 没石饮羽

export const 弛风鸣角类型 = typeof 没石饮羽
