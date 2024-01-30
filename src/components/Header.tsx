import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="c-site-header">
      <Link href="/">
        <h1>Journal App</h1>
      </Link>
      <nav>
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
