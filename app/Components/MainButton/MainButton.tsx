import React from "react";

import styles from "./MainButton.module.css";

interface Props {
  text: string;
  onClick?: (e: any) => void;
  btnType?: "submit" | "reset" | "button";
}

export default function MainButton({
  text,
  onClick,
  btnType = "submit",
}: Props) {
  return (
    <button className={styles.mainBtn} onClick={onClick} type={btnType}>
      {text}
    </button>
  );
}
