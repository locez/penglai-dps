import { MijiSelectedData } from '@/@types/miji'
import { SkillBasicDTO, SkillGainDTO } from '@/@types/skill'
import skillMijiBasicData from '@/数据/秘籍'

/**
 * 根据当前已选的秘籍、奇穴等修改技能增益
 */
export const 根据秘籍格式化技能基础数据 = (
  skillBasicData: SkillBasicDTO[],
  当前秘籍信息: MijiSelectedData[]
): SkillBasicDTO[] => {
  const newSkillData = skillBasicData.map((item) => {
    return {
      ...item,
      技能增益列表: getSkillMijiZengyi(item, 当前秘籍信息),
    }
  })
  return newSkillData
}

export const getSkillMijiZengyi = (
  skill: SkillBasicDTO,
  当前秘籍信息: MijiSelectedData[]
): SkillGainDTO[] => {
  let zengyiList: SkillGainDTO[] = skill.技能增益列表?.filter(
    (item) => item.增益所在位置 !== '秘籍'
  )

  skillMijiBasicData.forEach((item) => {
    const selectedMiji =
      当前秘籍信息?.find((a) => {
        return a?.技能名称 === item?.描述技能名称
      })?.技能已选秘籍 || []

    if (item.生效技能.includes(skill.技能名称)) {
      const newList: SkillGainDTO[] = item.秘籍列表
        .filter((a) => selectedMiji.includes(a.秘籍名称))
        .map((a) => {
          return {
            增益名称: a?.秘籍名称,
            常驻增益: a?.常驻增益,
            增益集合: a?.增益集合,
            增益所在位置: '秘籍',
          }
        })
      zengyiList = zengyiList?.concat(newList)
    }
  })

  return zengyiList
}
