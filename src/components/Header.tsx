import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="c-site-header">
      <nav>
        <ul>
          <li>
            <strong>Journal App</strong>
          </li>
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
