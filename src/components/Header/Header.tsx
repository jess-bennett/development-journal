import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <strong>Journal App</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/entry/create" role={"button"}>
              New Entry
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
