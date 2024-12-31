import React, { ReactNode } from "react";

import styles from "./Flashcard.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  cardKey: string | number;
}

export default function Flashcard({ children, onClick, cardKey }: Props) {
  return (
    <div className={styles.flashCard} onClick={onClick} key={cardKey}>
      {children}
    </div>
  );
}
