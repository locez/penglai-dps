import { SkillMijiBasicDataDTO } from '@/@types/miji'
import 秘籍_击水三千 from "./秘籍_击水三千";
import 秘籍_振翅图南 from "./秘籍_振翅图南";
import 秘籍_木落雁归 from "./秘籍_木落雁归";

const skillMijiBasicData: SkillMijiBasicDataDTO[] = [
  {
    描述技能名称: "木落雁归",
    生效技能: ["木落雁归"],
    秘籍列表: 秘籍_木落雁归,
  },
  {
    描述技能名称: "振翅图南",
    生效技能: ["振翅图南"],
    秘籍列表: 秘籍_振翅图南,
  },
  {
    描述技能名称: "击水三千",
    生效技能: ["击水三千"],
    秘籍列表: 秘籍_击水三千,
  },
];

export default skillMijiBasicData
