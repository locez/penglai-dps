import 循环模拟技能基础数据 from "../../../constant/skill";
import 技能统一类 from "../../通用类/技能统一类";

class 木落雁归 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find(
    (item) => item.技能名称 === "木落雁归"
  );

  constructor(模拟循环) {
    super(模拟循环);
  }

  造成伤害() {
    this.触发伤害行为("木落雁归");
  }
}

export default 木落雁归;

export const 木落雁归类型 = typeof 木落雁归;
