import React, { Ref, ReactNode } from "react";

import styles from "./Dialog.module.css";

interface Props {
  children?: ReactNode;
  dialogRef: Ref<HTMLDialogElement> | null;
}

export default function Dialog({ children, dialogRef }: Props) {
  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      {children}
    </dialog>
  );
}
