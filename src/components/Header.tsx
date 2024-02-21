import React from "react";
import Link from "next/link";
import { BsGrid3X3 } from "react-icons/bs";
import { BsJournalCode } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="c-site-header">
      <Link href="/">
        <h1>Journal App</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/" role={"button"}>
              <BsJournalCode />
            </Link>
          </li>
          <li>
            <Link href="/features/to-do" role={"button"}>
              <RiTodoLine />
            </Link>
          </li>
          <li>
            <Link href="/features/tic-tac-toe" role={"button"}>
              <BsGrid3X3 />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
