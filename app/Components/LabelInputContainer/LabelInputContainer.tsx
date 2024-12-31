import React, { ReactNode } from "react";

import styles from "./LabelInputContainer.module.css";

interface Props {
  children?: ReactNode;
}

export default function LabelInputContainer({ children }: Props) {
  return <div className={styles.labelInputContainer}>{children}</div>;
}
