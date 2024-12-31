import React, { ReactNode } from "react";

import styles from "./JustifySpaceBetween.module.css";

interface Props {
  children: ReactNode;
}

export default function JustifySpaceBetween({ children }: Props) {
  return <div className={styles.justifySpaceBetween}>{children}</div>;
}
