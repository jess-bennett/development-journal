import React from "react";
import Link from "next/link";

import { iconConfig } from "../utilities/iconConfig";

const Header = () => {
  const { iconCart, iconJournal, iconToDo, iconTicTacToe } = iconConfig;
  return (
    <header className="c-site-header">
      <Link href="/">
        <h1>Journal App</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/" role={"button"}>
              {iconJournal}
            </Link>
          </li>
          <li>
            <Link href="/features/to-do" role={"button"}>
              {iconToDo}
            </Link>
          </li>
          <li>
            <Link href="/features/tic-tac-toe" role={"button"}>
              {iconTicTacToe}
            </Link>
          </li>
          <li>
            <Link href="/features/checkout" role={"button"}>
              {iconCart}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
