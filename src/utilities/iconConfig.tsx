import { BsGrid3X3 } from "react-icons/bs";
import { BsJournalCode } from "react-icons/bs";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { FiDelete, FiEdit } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuSkipBack } from "react-icons/lu";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { TfiWrite } from "react-icons/tfi";

export const iconConfig = {
  iconEdit: <FiEdit />,
  iconDelete: <FiDelete />,
  iconJournal: <BsJournalCode />,
  iconToDo: <RiTodoLine />,
  iconTicTacToe: <BsGrid3X3 />,
  iconNewEntry: <TfiWrite />,
  iconUpdate: <RxUpdate />,
  iconCreate: <FiSend />,
  iconNewItem: <IoMdAddCircleOutline />,
  iconRestart: <MdOutlineSettingsBackupRestore />,
  iconSkipBack: <LuSkipBack />,
  iconComplete: <FaRegCheckCircle />,
  iconIncomplete: <FaCheckCircle />,
};
