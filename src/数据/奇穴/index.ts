import { QixueListDTO } from '@/@types/qixue'
import { CharacterFinalDTO } from '@/@types/character'
import {
  getMianBanGongJI,
  卢令身法加成,
  getShenfaJiachengHuixin,
} from '@/components/BasicSet/CharacterSet/util'
import { 装备信息数据类型 } from '@/@types/equipment'
import 装备增益数据 from '../装备/装备增益数据'

export const 身法加成奇穴 = '卢令'
export const 无视防御奇穴 = ''

export const 判断是否开启身法加成奇穴 = (data) => {
  return data?.some((item) => item === 身法加成奇穴)
}

export const 判断是否开启无视防御奇穴 = (data) => {
  return data?.some((item) => item === 无视防御奇穴)
}

export const 奇穴数据: QixueListDTO[] = [
  // 1
  {
    奇穴列表: [
      {
        奇穴名称: "凌霄",
        奇穴加成类型: "常驻",
        奇穴加成技能: ["浮游天地"],
        奇穴图片: "https://icon.jx3box.com/icon/10867.png",
      },
      {
        奇穴名称: "江汉",
        奇穴加成类型: "常驻",
        奇穴加成技能: ["木落雁归"],
        奇穴图片: "https://icon.jx3box.com/icon/10855.png",
      },
      {
        奇穴名称: "海隅",
        奇穴加成类型: "无增益",
        // 是否不可编辑: true,
        奇穴加成技能: ["击水三千·1", "击水三千·2", "击水三千·3"],
        奇穴图片: "https://icon.jx3box.com/icon/10760.png",
      },
    ],
  },
  // 2
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "扶桑",
        奇穴加成类型: "常驻",
        奇穴加成技能: ["翼绝云天"],
        奇穴图片: "https://icon.jx3box.com/icon/10768.png",
      },
      {
        奇穴名称: "苍梧",
        奇穴加成类型: "常驻",
        奇穴加成技能: ["木落雁归"],
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/10882.png",
      },
      {
        奇穴名称: "潮音",
        奇穴加成类型: "无增益",
        奇穴加成技能: ["跃潮斩波"],
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/17166.png",
      },
    ],
  },
  // 3
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "羽彰",
        奇穴加成类型: "部分数量加成",
        奇穴图片: "https://icon.jx3box.com/icon/10863.png",
      },
      {
        奇穴名称: "乘龙",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/10837.png",
      },
      {
        奇穴名称: "虹流",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20288.png",
      },
      {
        奇穴名称: "弋矰",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20286.png",
      },
    ],
  },
  // 4
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "清源",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/10764.png",
      },
      {
        奇穴名称: "射革",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20306.png",
      },
      {
        奇穴名称: "蓄锐",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20307.png",
      },
      {
        奇穴名称: "沃焦",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20304.png",
      },
    ],
  },
  // 5
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "游仙",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/10913.png",
      },
      {
        奇穴名称: "镇祟",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20292.png",
      },
      {
        奇穴名称: "反曲",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20309.png",
      },
      {
        奇穴名称: "腾驾",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20310.png",
      },
    ],
  },
  // 6
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "青冥",
        奇穴加成技能: "通用",
        奇穴加成类型: "部分数量加成",
        奇穴图片: "https://icon.jx3box.com/icon/14108.png",
      },
      {
        奇穴名称: "片羽",
        是否不可编辑: true,
        奇穴加成类型: "无增益",
        奇穴图片: "https://icon.jx3box.com/icon/20285.png",
      },
      {
        奇穴名称: "祓厄",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20308.png",
      },
      {
        奇穴名称: "桑柘",
        // 是否不可编辑: true,
        奇穴加成类型: "无增益",
        奇穴图片: "https://icon.jx3box.com/icon/20280.png",
      },
    ],
  },
  // 7
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "鸿轨",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/10917.png",
      },
      {
        奇穴名称: "九婴",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20283.png",
      },
      {
        奇穴名称: "上岩",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20282.png",
      },
      {
        奇穴名称: "同渡",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20285.png",
      },
    ],
  },
  // 8
  {
    奇穴列表: [
      {
        奇穴名称: "烟涛",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/14112.png",
      },
      {
        奇穴名称: "领胡",
        奇穴加成类型: "常驻",
        奇穴加成技能: [
          "攻击-虎",
          "攻击-狼",
          "攻击-鹰",
          "攻击-熊",
          "重击",
          "践踏",
        ],
        奇穴图片: "https://icon.jx3box.com/icon/20269.png",
      },
      {
        奇穴名称: "时祯",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20265.png",
      },
      {
        奇穴名称: "九乌",
        奇穴加成类型: "常驻",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20266.png",
      },
      {
        奇穴名称: "卢令",
        奇穴加成类型: "常驻",
        奇穴加成技能: "通用",
        奇穴图片: "https://icon.jx3box.com/icon/20268.png",
      },
    ],
  },
  // 9
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "溯徊",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/10869.png",
      },
      {
        奇穴名称: "畴野",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20277.png",
      },
      {
        奇穴名称: "兴游",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20275.png",
      },
      {
        奇穴名称: "托月",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/20276.png",
      },
      {
        奇穴名称: "禳灾",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20279.png",
      },
    ],
  },
  // 10
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "驰行",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/10753.png",
      },
      {
        奇穴名称: "扶国",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20296.png",
      },
      {
        奇穴名称: "泑泽",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20301.png",
      },
      {
        奇穴名称: "丛云隐月",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20297.png",
      },
      {
        奇穴名称: "涉野徒林",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20294.png",
      },
    ],
  },
  // 11
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "梦悠",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/10859.png",
      },
      {
        奇穴名称: "贯侯",
        奇穴加成技能: ["标鹄"],
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/20299.png",
      },
      {
        奇穴名称: "风止",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20300.png",
      },
      {
        奇穴名称: "审固",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/20303.png",
      },
      {
        奇穴名称: "祛邪",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20295.png",
      },
    ],
  },
  // 12
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: "濯流",
        奇穴加成类型: "部分数量加成",
        奇穴加成技能: [
          "攻击-虎",
          "攻击-狼",
          "攻击-鹰",
          "攻击-熊",
          "重击",
          "践踏",
        ],
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/10824.png",
      },
      {
        奇穴名称: "祝灵",
        奇穴加成类型: "无增益",
        是否不可编辑: true,
        奇穴图片: "https://icon.jx3box.com/icon/20290.png",
      },
      {
        奇穴名称: "星烨",
        奇穴加成类型: "部分数量加成",
        奇穴加成技能: ["劲风簇"],
        奇穴图片: "https://icon.jx3box.com/icon/20278.png",
      },
      {
        奇穴名称: "朝仪万汇",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/19602.png",
      },
      {
        奇穴名称: "白虹贯日",
        奇穴加成类型: "常驻",
        奇穴图片: "https://icon.jx3box.com/icon/19598.png",
      },
    ],
  },
];

export default 奇穴数据

// 奇穴名称枚举
export const QixueNameMap = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '12',
]

// 获取装备加成后面板
export const 获取装备加成后面板 = (
  data: CharacterFinalDTO,
  装备信息: 装备信息数据类型
): CharacterFinalDTO => {
  const 面板 = { ...data }
  if (装备信息?.切糕会心) {
    面板.会心值 = 面板.会心值 + 装备增益数据?.切糕会心?.[0]?.增益数值
  }
  if (装备信息?.切糕会心_英雄) {
    面板.会心值 = 面板.会心值 + 装备增益数据?.切糕会心_英雄?.[0]?.增益数值
  }
  if (装备信息?.切糕无双) {
    面板.无双值 = 面板.无双值 + 装备增益数据?.切糕无双?.[0]?.增益数值
  }
  if (装备信息?.切糕无双_英雄) {
    面板.会心值 = 面板.会心值 + 装备增益数据?.切糕无双_英雄?.[0]?.增益数值
  }
  return 面板
}

// 判断身法奇穴加成后面板
export const 获取身法奇穴加成后面板 = (data: CharacterFinalDTO, 开启卢令): CharacterFinalDTO => {
  if (开启卢令) {
    const 加成后面板身法 = 卢令身法加成(data.身法, true)
    return {
      ...data,
      身法: 加成后面板身法,
      // 由于基础面板已经加过会心了，所以只计算增加的身法带来的会心加成
      会心值: getShenfaJiachengHuixin(data.会心值, 加成后面板身法 - data.身法),
      面板攻击: getMianBanGongJI(data.基础攻击, 加成后面板身法),
    }
  } else {
    return data
  }
}
