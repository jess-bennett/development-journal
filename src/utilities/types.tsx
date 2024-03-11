import { BiLogoNodejs } from "react-icons/bi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRedhat } from "react-icons/fa6";
import {
  GiArtificialIntelligence,
  GiCoalPile,
  GiDatabase,
  GiSkullCrossedBones,
} from "react-icons/gi";
import { GrBug, GrCubes } from "react-icons/gr";
import {
  SiCss3,
  SiGit,
  SiGoogleanalytics,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiSass,
  SiTypescript,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { VscCloud, VscSymbolMisc } from "react-icons/vsc";

import { Skill } from "@prisma/client";

export const skillIcons: Record<Skill, React.JSX.Element> = {
  AI: <GiArtificialIntelligence title="AI" />,
  ANALYTICS: <SiGoogleanalytics title="Analytics" />,
  BUG_FIXES: <GrBug title="Bug fixes" />,
  CSS: <SiCss3 title="CSS" />,
  DATABASES: <GiDatabase title="Databases" />,
  GIT: <SiGit title="Git" />,
  EXTERNAL_LIBRARIES: <GrCubes title="External libraries" />,
  HTML: <SiHtml5 title="HTML" />,
  JAVASCRIPT: <SiJavascript title="JavaScript" />,
  JEST: <SiJest title="Jest" />,
  LEGACY_CODE: <GiSkullCrossedBones title="Legacy code" />,
  MISC: <VscSymbolMisc title="Misc" />,
  NEXT_JS: <SiNextdotjs title="Next.js" />,
  NODE_JS: <BiLogoNodejs title="Node.js" />,
  NPM: <SiNpm title="Npm" />,
  REACT: <SiReact title="React" />,
  REST_APIS: <VscCloud title="Rest APIs" />,
  SASS: <SiSass title="Sass" />,
  SQL: <TbSql title="SQL" />,
  TYPESCRIPT: <SiTypescript title="TypeScript" />,
};

export const categoryIcons = {
  Headgear: <FaRedhat title="Headgear" />,
  Material: <GiCoalPile title="Material" />,
  Fuel: <BsFillFuelPumpFill title="Fuel" />,
};
