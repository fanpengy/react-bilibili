import * as React from "react";
import Logo from "../../components/Logo";
import Avatar from "../../components/Avatar";

import style from "./header.styl?css-modules";

const Header = () => {
  return (
    <div className={style.header}>
      {/* <a className={style.logo} href="/channel/1">
        <Logo />
      </a> */}
      {/* <a className={style.avatar} href="/space"> */}
      <a className={style.avatar}>
        <Avatar />
      </a>
      {/* <a className={style.searchIcon} href="/search">
        <i className="icon-search" />
      </a> */}
    </div>
  );
}

export default Header;
