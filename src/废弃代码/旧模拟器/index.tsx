// // 循环模拟器
// import React, { useEffect, useMemo, useState } from 'react'
// import {
//   Alert,
//   Badge,
//   Button,
//   Checkbox,
//   Dropdown,
//   Input,
//   Menu,
//   Modal,
//   Popover,
//   Select,
//   Space,
//   Tag,
//   Tooltip,
// } from 'antd'
// import { ReactSortable } from 'react-sortablejs'
// import {
//   循环日志数据类型,
//   循环基础技能数据类型,
//   ShowCycleSingleSkill,
// } from '@/@types/cycleSimulator'
// import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
// import { useAppSelector } from '@/hooks'
// import 循环模拟技能基础数据 from '@/数据/cycleSimulator/skill'
// import {
//   测试宠物顺序,
//   测试循环新桑柘,
//   测试循环_朱厌,
//   朱厌一键宏,
//   朱厌一键宏宠物,
//   测试循环新桑柘宠物,
// } from './constant'
// import { SimulatorCycle } from './simulator'
// import BattleLogModal from './BattleLogModal'
// import {
//   getDpsCycle,
//   判断上一个同名技能,
//   判断当前技能添加之前需要换箭,
//   获取总用时,
//   获取显示秒伤,
//   获取本循环阵眼覆盖率,
//   获取添加技能CD循环,
//   获取添加换箭节点循环,
//   // 获取该轮箭用时,
// } from './utils'
// // import { CurrentDpsFunctionRes } from '@/store/basicReducer/current-dps-function'
// // import { currentSingleSkillDpsFunction } from '@/store/basicReducer/current-single-skill-dps-function'
// // import QixueSet from '../QixueSet'
// import DpsResModal from './DpsResModal'
// import SkillCountModal from './SkillCountModal'
// import './index.css'
// import { 缓存映射 } from '@/utils/system_constant'

// function CycleSimulator() {
//   const [logData, setLogData] = useState<循环日志数据类型[]>([])
//   // 基础弹窗
//   const [basicModalOpen, setBasicModalOpen] = useState<boolean>(false)
//   // 日志log
//   const [logModalOpen, setLogModalOpen] = useState<boolean>(false)
//   // 技能统计
//   const [countModal, setCountModal] = useState<boolean>(false)
//   // dps曲线
//   const [dpsModal, setDpsModal] = useState<boolean>(false)
//   // 循环
//   const [cycle, setCycle] = useState<循环基础技能数据类型[]>([])
//   const [自定义循环保存弹窗, 设置自定义循环保存弹窗] = useState<boolean>(false)
//   // 自定义循环名称保存输入
//   const [自定义循环名称输入, 设置自定义循环名称输入] = useState<string>()
//   // 宠物顺序
//   const [宠物顺序, 设置宠物顺序] = useState<string[]>([...测试宠物顺序])
//   // 当前面板加速值
//   const 加速值 = useAppSelector((state) => state?.basic?.角色最终属性)?.加速值
//   // 当前网络延迟
//   const 网络按键延迟 = 0

//   // 是否实时计算
//   const [是否实时计算, 设置是否实时计算] = useState<boolean>(false)

//   const [承契起手层数, 设置承契起手层数] = useState<number>(0)

//   // dps结果
//   // const [dpsRes, setDpsRes] = useState<CurrentDpsFunctionRes>({
//   //   totalDps: 0,
//   //   dpsList: [],
//   //   dpsPerSecond: 0,
//   // })
//   // 奇穴
//   const qixuedata = useAppSelector((state) => state?.basic?.当前奇穴信息)

//   // 获取自定义循环
//   const 自定义循环 = useMemo(() => {
//     const 循环 = JSON.parse(localStorage.getItem(缓存映射.自定义循环) || '[]') || []
//     if (循环?.length) {
//       return {
//         名称: 循环[0]?.name,
//         技能数组: 循环[0]?.skillList,
//         // 宠物顺序: 循环[0]?.宠物顺序 || [],
//       }
//     } else {
//       return false
//     }
//   }, [localStorage.getItem(缓存映射.自定义循环)])

//   useEffect(() => {
//     if (!basicModalOpen) {
//       setLogData([])
//       setBasicModalOpen(false)
//       setLogModalOpen(false)
//       setCountModal(false)
//       setDpsModal(false)
//       设置宠物顺序([...测试宠物顺序])
//       setCycle([])
//     }
//   }, [basicModalOpen])

//   // 对cycle进行处理，自动添加换箭节点
//   // const cycle = useMemo(() => {
//   //   // 塞入自动换箭节点
//   //   const 添加换箭节点循环: 循环基础技能数据类型[] = 获取添加换箭节点循环(cycle)
//   //   return 添加换箭节点循环
//   // }, [cycle])

//   // 更新循环的同时自动塞入换箭节点
//   const setCycleAndAddChange = (val) => {
//     const 添加换箭节点循环: 循环基础技能数据类型[] = 获取添加换箭节点循环(val)
//     setCycle(添加换箭节点循环)
//   }

//   useEffect(() => {
//     if (是否实时计算) {
//       simulator({})
//     }
//   }, [cycle, 宠物顺序, 是否实时计算, 承契起手层数, 网络按键延迟, 加速值, qixuedata])

//   const simulator = (props?) => {
//     const { 传入延迟 = 网络按键延迟, 传入加速 = 加速值, 更新日志 = true } = props
//     const data = SimulatorCycle({
//       测试循环: cycle.map((item) => item?.技能名称) || [],
//       加速值: 传入加速 !== undefined ? 传入加速 : 加速值,
//       网络按键延迟: 传入延迟 !== undefined ? 传入延迟 : 网络按键延迟,
//       测试宠物顺序: 宠物顺序,
//       奇穴: qixuedata,
//       承契起手层数,
//     })
//     if (更新日志) {
//       计算dps日志(data)
//     }
//     return data
//   }

//   // 计算DPS日志
//   const 计算dps日志 = (data: 循环日志数据类型[]) => {
//     let totalDps = 0
//     const 获取的秒伤 = (造成总伤害, 日志时间) => {
//       const 第一次造成伤害的时间 =
//         data?.find((item) => item?.日志类型 === '造成伤害')?.日志时间 || 0
//       const 时间差 = 日志时间 - 第一次造成伤害的时间
//       if (时间差) {
//         return Math.round(造成总伤害 / (时间差 / 16))
//       } else {
//         return 0
//       }
//     }
//     const newLog = data.map((item) => {
//       if (item?.日志类型 === '造成伤害') {
//         const dps = 0
//         totalDps = totalDps + dps
//         return {
//           ...item,
//           造成总伤害: totalDps,
//           造成伤害: dps,
//           秒伤: item?.日志时间 > 16 ? 获取的秒伤(totalDps, item?.日志时间) : 0,
//         }
//       } else {
//         return {
//           ...item,
//           造成总伤害: totalDps,
//           秒伤: item?.日志时间 > 16 ? 获取的秒伤(totalDps, item?.日志时间) : 0,
//         }
//       }
//     })
//     setLogData(newLog)
//     return newLog
//   }

//   // 向循环内新增技能
//   const addCycle = (item: 循环基础技能数据类型) => {
//     let newSkill = [item]
//     const 需要换箭 = 判断当前技能添加之前需要换箭(cycle)
//     if (需要换箭) {
//       const 寒更晓箭技能对象 = 循环模拟技能基础数据?.find((a) => a.技能名称 === '寒更晓箭')
//       if (寒更晓箭技能对象) {
//         newSkill = [寒更晓箭技能对象, item]
//       }
//     }
//     const newCycle = [...(cycle || []), ...newSkill]
//     setCycle(newCycle)
//   }

//   // 从循环内删除技能
//   const removeSkill = (index) => {
//     const newCycle = [...(cycle || [])]
//     newCycle.splice(index, 1)
//     setCycle(newCycle)
//   }

//   // 根据循环计算更适合展示的多层数组，用于显示
//   const 处理循环结果对象 = useMemo(() => {
//     // 添加所有技能的CD显示
//     const 添加技能CD循环: ShowCycleSingleSkill[] = 获取添加技能CD循环({
//       cycle: cycle,
//       网络按键延迟,
//       加速值,
//       qixuedata,
//     })

//     const res: ShowCycleSingleSkill[][] = []
//     添加技能CD循环.forEach((item, index) => {
//       if (index === 0) {
//         res[res?.length] = [{ ...item, index: index || 0 }]
//       } else {
//         res[res?.length - 1] = [...(res[res?.length - 1] || []), { ...item, index: index || 0 }]
//         if (item.技能名称 === '寒更晓箭') {
//           res[res?.length] = []
//         }
//       }
//     })

//     return { 显示循环: res, 完整循环: 添加技能CD循环 }
//   }, [cycle])

//   const 本循环阵眼覆盖率 = useMemo(() => {
//     const 覆盖率 = 获取本循环阵眼覆盖率(处理循环结果对象?.完整循环, logData)
//     return 覆盖率
//   }, [处理循环结果对象, logData])

//   // 拖拽更新循环
//   const 拖拽更新循环 = (newList, type) => {
//     if (type == '轮次内') {
//       // 首先获取被替换轮次的第一个元素的index索引
//       const minIndex = newList.reduce(function (min, obj) {
//         return Math.min(min, obj.index)
//       }, Infinity)
//       // 获取最大的索引，判断拖拽生效范围
//       const maxIndex = newList.reduce(function (min, obj) {
//         return Math.max(min, obj.index)
//       }, Number.NEGATIVE_INFINITY)
//       // 将数组哪索引范围内跌元素替换为新的数组元素
//       const newCycle = cycle.map((item, index) => {
//         if (index < minIndex || index > maxIndex) {
//           return { ...item }
//         } else {
//           return newList[index - minIndex]
//         }
//       })
//       // 更新循环
//       setCycle(newCycle)
//     } else if (type === '整个轮次拖拽') {
//       const res: 循环基础技能数据类型[] = []
//       newList.forEach((item) => {
//         item.forEach((a) => {
//           if (a.技能名称) {
//             const 当前技能数据 = 循环模拟技能基础数据?.find((b) => b?.技能名称 === a.技能名称)
//             if (当前技能数据) {
//               res.push(当前技能数据)
//             }
//           }
//         })
//       })
//       setCycle(res)
//     }
//   }

//   // 复制本轮到最后
//   const 复制本轮至最后 = (轮次) => {
//     const newCycle = cycle.concat(轮次)
//     setCycle(newCycle)
//   }

//   // 删除本轮次
//   const 删除本轮次 = (轮次) => {
//     const minIndex = 轮次.reduce(function (min, obj) {
//       return Math.min(min, obj.index)
//     }, Infinity)
//     // 获取最大的索引，判断拖拽生效范围
//     const maxIndex = 轮次.reduce(function (min, obj) {
//       return Math.max(min, obj.index)
//     }, Number.NEGATIVE_INFINITY)
//     // 将数组哪索引范围内跌元素替换为新的数组元素
//     const newCycle = cycle.filter((item, index) => {
//       return index < minIndex || index > maxIndex
//     })
//     // 更新循环
//     setCycle(newCycle)
//   }

//   // 保存为自定义循环
//   const 保存自定义循环 = () => {
//     if (自定义循环 && 自定义循环?.名称) {
//       Modal.confirm({
//         title: '已存在一个自定义循环，再次保存将覆盖',
//         okText: '我要覆盖',
//         onOk: () => 确认保存循环(),
//       })
//     } else {
//       确认保存循环()
//     }
//   }
//   // 确认保存自定义循环
//   const 确认保存循环 = () => {
//     // 获取0 1 2 加速下 网络延迟为 1 2 3 的共9种循环
//     const dpsTime = {
//       0: { 1: 0, 2: 0, 3: 0 },
//       1: { 1: 0, 2: 0, 3: 0 },
//       2: { 1: 0, 2: 0, 3: 0 },
//       3: { 1: 0, 2: 0, 3: 0 },
//     }

//     const 加速等级枚举 = {
//       0: 0,
//       1: 95,
//       2: 4241,
//       3: 8857,
//     }

//     // 保存用于计算的循环，这里只保存当前加速和延迟下生成的循环，减少计算损耗。实际使用时很少在多个加速和延迟之前频繁切换，
//     // 等待后续优化
//     const 日志 = simulator({ 更新日志: false })
//     const 用于计算循环 = getDpsCycle(日志)

//     Object.keys(dpsTime).forEach((加速) => {
//       const 实际加速值 = 加速等级枚举[加速]
//       Object.keys(dpsTime[加速]).forEach((延迟) => {
//         const 本次日志 = simulator({
//           传入延迟: Math.max(Number(延迟) - 1, 0),
//           传入加速: Number(实际加速值),
//           更新日志: false,
//         })
//         const 战斗时间 = 本次日志[本次日志.length - 1].日志时间
//         const 战斗秒 = Math.round((战斗时间 / 16) * 100) / 100

//         dpsTime[加速][延迟] = 战斗秒
//       })
//     })

//     const 用于保存的自定义循环 = {
//       name: 自定义循环名称输入,
//       title: 自定义循环名称输入,
//       cycle: 用于计算循环,
//       hide: false,
//       dpsTime,
//       type: '自定义',
//       qixue: qixuedata,
//       skillList: cycle,
//     }

//     localStorage?.setItem(缓存映射.自定义循环, JSON.stringify([用于保存的自定义循环]))
//     设置自定义循环保存弹窗(false)
//   }

//   const 快捷添加循环 = (名称) => {
//     if (名称 === '朱厌（压缩）') {
//       setCycleAndAddChange(
//         测试循环_朱厌.map((item) => {
//           return 循环模拟技能基础数据?.find((a) => a?.技能名称 === item) || 循环模拟技能基础数据[0]
//         })
//       )
//       设置宠物顺序(测试宠物顺序)
//     } else if (名称 === '大招桑柘') {
//       setCycleAndAddChange(
//         测试循环新桑柘.map((item) => {
//           return 循环模拟技能基础数据?.find((a) => a?.技能名称 === item) || 循环模拟技能基础数据[0]
//         })
//       )
//       设置宠物顺序(测试循环新桑柘宠物)
//     } else if (名称 === '朱厌（一键宏）') {
//       setCycleAndAddChange(
//         朱厌一键宏.map((item) => {
//           return 循环模拟技能基础数据?.find((a) => a?.技能名称 === item) || 循环模拟技能基础数据[0]
//         })
//       )
//       设置宠物顺序(朱厌一键宏宠物)
//     } else if (自定义循环) {
//       setCycleAndAddChange(自定义循环?.技能数组)
//       // 设置宠物顺序(自定义循环?.宠物顺序)
//     }
//   }

//   return (
//     <>
//       <Button danger onClick={() => setBasicModalOpen(true)}>
//         循环模拟
//       </Button>
//       <Modal
//         className='cycle-simulator-modal'
//         maskClosable={false}
//         width={'90%'}
//         title={
//           <div className={'cycle-simulator-modal-header space-between'}>
//             <h1 className={'cycle-simulator-modal-title'}>循环模拟（beta）</h1>
//             {cycle?.length ? (
//               <Tooltip title='自定义循环和原计算器其他循环的dps会心期望计算方式不同。会导致最终数值偏差。请勿进行跨循环比较。'>
//                 <Button
//                   size='small'
//                   type='primary'
//                   onClick={() => 设置自定义循环保存弹窗(true)}
//                   disabled={cycle?.length <= 1}
//                 >
//                   保存为自定义循环
//                 </Button>
//               </Tooltip>
//             ) : null}
//           </div>
//         }
//         centered
//         footer={null}
//         open={basicModalOpen}
//         onCancel={() => setBasicModalOpen(false)}
//         destroyOnClose
//       >
//         <Alert
//           type='warning'
//           message='目前默认每轮箭都有金乌，由于贯穿的计算还有很多问题，可能存在贯穿数量的偏差，仅供参考。请勿以本功能作为直接结论。功能持续迭代，后续会开放更多模拟循环相关能力。'
//         />
//         <div className={'cycle-simulator-setting'}>
//           <div className={'cycle-simulator-setting-header'}>
//             <div className='cycle-simulator-setting-header-left'>
//               <h1>配置你的循环</h1>
//               <Popover
//                 content={
//                   <div>
//                     <p>1、点击下方技能按钮添加至循环内</p>
//                     <p>2、可以整行删除、复制本行到最后一行</p>
//                     <p>3、可以整行拖动技能、在单行内拖动改变技能顺序</p>
//                     <p>4、宠物可以通过拖动改变宠物顺序</p>
//                     <p>5、按钮上红色标识为技能剩余CD</p>
//                   </div>
//                 }
//               >
//                 <span className={'cycle-simulator-help'}>如何使用?</span>
//               </Popover>
//               <Popover
//                 content={
//                   <div>
//                     <p>标鹄显示</p>
//                     <p>验证循环合理性，金乌判断</p>
//                     <p>日志分析buff覆盖</p>
//                     <p>宏命令生成循环等等</p>
//                     <p>后续会逐步按计划实现。</p>
//                   </div>
//                 }
//               >
//                 <span className={'cycle-not-support'}>目前未支持功能</span>
//               </Popover>
//             </div>
//             <div>
//               承契起手层数：
//               <Select
//                 size='small'
//                 value={承契起手层数}
//                 placeholder={'请选择承契起手层数'}
//                 onChange={(e) => 设置承契起手层数(e)}
//                 options={[
//                   { value: 0, label: '零层起手' },
//                   { value: 1, label: '一层起手' },
//                   { value: 2, label: '二层起手' },
//                   { value: 3, label: '三层起手' },
//                   { value: 4, label: '四层起手' },
//                   { value: 5, label: '五层起手' },
//                 ]}
//               />
//             </div>
//           </div>
//           <div className={'cycle-simulator-setting-btns'}>
//             <Space size={[8, 16]} wrap>
//               {循环模拟技能基础数据
//                 .filter((item) => !item?.创建循环不可选)
//                 .map((item) => {
//                   return item?.技能名称 === '弛风鸣角' ? (
//                     <Tooltip
//                       title='弛风鸣角没有做释放间换箭的功能'
//                       key={`${item?.技能名称}tooltip`}
//                     >
//                       <AddCycleBtn
//                         onClick={() => addCycle(item)}
//                         key={item?.技能名称}
//                         className={'cycle-simulator-setting-btn'}
//                         完整循环={处理循环结果对象?.完整循环 || []}
//                         技能={item}
//                         朱厌={qixuedata?.includes('朱厌')}
//                       />
//                     </Tooltip>
//                   ) : (
//                     <AddCycleBtn
//                       onClick={() => addCycle(item)}
//                       key={item?.技能名称}
//                       className={'cycle-simulator-setting-btn'}
//                       完整循环={处理循环结果对象?.完整循环 || []}
//                       技能={item}
//                       朱厌={qixuedata?.includes('朱厌')}
//                     />
//                   )
//                 })}
//             </Space>
//             <Space>
//               <Dropdown
//                 overlay={
//                   <Menu>
//                     <Menu.Item onClick={() => 快捷添加循环('朱厌（一键宏）')}>
//                       朱厌（一键宏）
//                     </Menu.Item>
//                     <Menu.Item onClick={() => 快捷添加循环('朱厌（压缩）')}>朱厌（压缩）</Menu.Item>
//                     <Menu.Item onClick={() => 快捷添加循环('大招桑柘')}>大招桑柘</Menu.Item>
//                     {自定义循环 ? (
//                       <Menu.Item onClick={() => 快捷添加循环('自定义循环')}>
//                         {自定义循环?.名称}
//                       </Menu.Item>
//                     ) : null}
//                   </Menu>
//                 }
//               >
//                 <Button>循环快捷设置</Button>
//               </Dropdown>
//               <Button onClick={() => setCycle([])}>清空循环</Button>
//               {/* <QixueSet className="cycle-qixue-set-button" /> */}
//             </Space>
//           </div>
//           <div className={'cycle-simulator-setting-res'}>
//             <ReactSortable
//               list={(处理循环结果对象?.显示循环 || []).map((i, index) =>
//                 Object.assign(i, { id: index })
//               )}
//               setList={(e) => {
//                 拖拽更新循环(e, '整个轮次拖拽')
//               }}
//               animation={150}
//               draggable={'.cycle-turn-drag'}
//             >
//               {(处理循环结果对象?.显示循环 || []).map((轮次, index) => {
//                 return (
//                   <div className={`cycle-simulator-setting-turn cycle-turn-drag`} key={`${index}`}>
//                     <ReactSortable
//                       list={轮次.map((i) =>
//                         Object.assign(i, { id: `${i?.技能名称}_${index}_${i?.index}` })
//                       )}
//                       setList={(e) => {
//                         拖拽更新循环(e, '轮次内')
//                       }}
//                       className='cycle-simulator-setting-turn-drop'
//                       animation={150}
//                       draggable={'.cycle-simulator-setting-skill-drag'}
//                     >
//                       {(轮次 || []).map((item) => {
//                         const 间隔CD =
//                           (item.本技能实际释放时间 || 0) - (item.本技能计划释放时间 || 0)
//                         // 把帧转成秒，保留两位小数
//                         const 剩余秒 = Math.round((间隔CD / 16) * 100) / 100
//                         return item?.技能名称 === '寒更晓箭' ? (
//                           <Tag
//                             color={SkillColorMap[item?.技能名称] || undefined}
//                             closable={false}
//                             className={'cycle-simulator-setting-change'}
//                           >
//                             {'寒更晓箭'}
//                           </Tag>
//                         ) : (
//                           <Badge
//                             count={剩余秒}
//                             key={`${item?.技能名称}_${index}_${item?.index}`}
//                             offset={[-30, 5]}
//                             className={'cycle-simulator-setting-skill-drag'}
//                           >
//                             <Tag
//                               closable
//                               color={SkillColorMap[item?.技能名称] || undefined}
//                               className={'cycle-simulator-setting-skill'}
//                               onClose={() => removeSkill(item?.index)}
//                             >
//                               {item?.技能名称}
//                             </Tag>
//                           </Badge>
//                         )
//                       })}
//                       <div className={'cycle-turn-operate'}>
//                         <Tooltip title='复制并添加到最后'>
//                           <CopyOutlined
//                             className={'cycle-turn-operate-btn'}
//                             onClick={() => 复制本轮至最后(轮次)}
//                           />
//                         </Tooltip>
//                         <Tooltip title='删除此轮'>
//                           <DeleteOutlined
//                             className={'cycle-turn-operate-btn'}
//                             onClick={() => 删除本轮次(轮次)}
//                           />
//                         </Tooltip>
//                       </div>
//                       {/* <div className="cycle-turn-time">
//                         该轮用时：
//                         {获取该轮箭用时(轮次)}
//                       </div> */}
//                     </ReactSortable>
//                   </div>
//                 )
//               })}
//             </ReactSortable>
//           </div>
//         </div>
//         <div className={'cycle-simulator-modal-footer'}>
//           <div className={'cycle-simulator-pet'}>
//             <ReactSortable
//               list={宠物顺序.map((i) => Object.assign(i, { id: i }))}
//               setList={(e) => {
//                 设置宠物顺序(e.map((item) => item.id))
//               }}
//               animation={150}
//             >
//               {(宠物顺序 || []).map((item, index) => {
//                 return (
//                   <Tag
//                     color={PetColorMap[item] || undefined}
//                     className={'cycle-simulator-setting-skill'}
//                     key={`${item}${index}`}
//                   >
//                     {item}
//                   </Tag>
//                 )
//               })}
//             </ReactSortable>
//           </div>
//           <div className={'cycle-simulator-operate'}>
//             {是否实时计算 ? null : (
//               <Tooltip title='实际模拟计算较为复杂，随着延迟、加速不同。可能存在部分技能数量误差。仅供参考'>
//                 <Button
//                   className={'cycle-simulator-operate-btn'}
//                   type='primary'
//                   onClick={simulator}
//                 >
//                   {logData?.length ? '重新模拟' : '开始模拟'}
//                 </Button>
//               </Tooltip>
//             )}
//             <Tooltip title='开启实时计算会影响性能，编辑循环可能出现卡顿。'>
//               <Checkbox
//                 checked={是否实时计算}
//                 onChange={(e) => 设置是否实时计算(e?.target?.checked)}
//               >
//                 是否实时计算
//               </Checkbox>
//             </Tooltip>
//             {logData?.[logData.length - 1]?.秒伤 ? (
//               <span className='cycle-simulator-dps-res-text'>
//                 模拟DPS：
//                 <span className={'cycle-simulator-dps-res'}>
//                   {获取显示秒伤(logData?.[logData.length - 1])}
//                 </span>
//                 用时：
//                 <span className={'cycle-simulator-dps-res'}>
//                   {获取总用时(logData?.[logData.length - 1]?.日志时间)}秒
//                 </span>
//                 阵眼覆盖率：
//                 <span className={'cycle-simulator-dps-res'}>{本循环阵眼覆盖率}%</span>
//               </span>
//             ) : null}
//             {logData?.length ? (
//               <>
//                 <Button onClick={() => setDpsModal(true)}>Dps曲线</Button>
//                 <Button onClick={() => setLogModalOpen(true)}>战斗日志</Button>
//                 <Button onClick={() => setCountModal(true)}>技能统计</Button>
//               </>
//             ) : null}
//           </div>
//         </div>
//         {/* dps结果 */}
//         <DpsResModal open={dpsModal} onCancel={() => setDpsModal(false)} logData={logData} />
//         {/* 战斗日志 */}
//         <BattleLogModal
//           open={logModalOpen}
//           onCancel={() => setLogModalOpen(false)}
//           logData={logData}
//         />
//         {/* 技能统计 */}
//         <SkillCountModal
//           open={countModal}
//           onCancel={() => setCountModal(false)}
//           logData={logData}
//         />
//         <Modal
//           centered
//           title='保存自定义循环'
//           okButtonProps={{
//             disabled: !自定义循环名称输入,
//           }}
//           open={自定义循环保存弹窗}
//           onCancel={() => 设置自定义循环保存弹窗(false)}
//           onOk={保存自定义循环}
//         >
//           <Input
//             value={自定义循环名称输入}
//             placeholder='请输入自定义循环名称'
//             onChange={(e) => 设置自定义循环名称输入(e?.target?.value)}
//           />
//         </Modal>
//       </Modal>
//     </>
//   )
// }

// export default CycleSimulator

// const SkillColorMap = {
//   引风唤灵: 'green',
//   弛律召野: 'lime',
//   劲风簇: 'blue',
//   弛风鸣角: 'cyan',
//   饮羽簇: 'red',
//   '饮羽簇-读条': 'red',
//   没石饮羽: 'orange',
//   朝仪万汇: 'purple',
//   寒更晓箭: 'magenta',
// }

// const PetColorMap = {
//   虎: 'red',
//   鹰: 'blue',
//   猪: 'green',
//   象: 'lime',
//   熊: 'orange',
//   狼: 'purple',
// }

// // 添加循环技能按钮组件
// const AddCycleBtn = ({ 技能, 完整循环, 朱厌, ...rest }) => {
//   const { 剩余CD } = 判断上一个同名技能(技能, 完整循环, 朱厌)
//   // 把帧转成秒，保留两位小数
//   const 剩余秒 = Math.round((剩余CD / 16) * 100) / 100
//   return 剩余秒 > 0 ? (
//     <Badge count={剩余秒} offset={[-20, 0]}>
//       <Tooltip title={`当前技能处于冷却中，剩余${剩余秒}秒`}>
//         <Button {...rest}>{技能?.技能名称}</Button>
//       </Tooltip>
//     </Badge>
//   ) : (
//     <Button {...rest}>{技能?.技能名称}</Button>
//   )
// }

export default {}
