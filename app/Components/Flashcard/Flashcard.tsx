import React, { ReactNode } from "react";

import styles from "./Flashcard.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  cardKey: string | number;
  flashCardClass: string;
}

export default function Flashcard({
  children,
  onClick,
  cardKey,
  isOnlyCard,
}: Props) {
  return (
    <div className={styles.flashCard} onClick={onClick} key={cardKey}>
      {children}
    </div>
  );
}
