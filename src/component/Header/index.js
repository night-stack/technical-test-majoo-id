import React from "react";
import { Icon } from "react-materialize";
import styles from "./style.module.css";

const Header = () => {
  return (
    <div className={styles.headerLayout}>
      <div style={{ width: "fit-content" }}>
        <a className={styles.link} href="/">
          <Icon style={{ fontSize: 20, marginRight: 20 }}>home</Icon>
          To-do List
        </a>
      </div>
    </div>
  );
};

export default Header;
