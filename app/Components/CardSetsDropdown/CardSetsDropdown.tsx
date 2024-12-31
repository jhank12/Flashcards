import React from "react";

import styles from "./CardSetsDropdown.module.css";

// types
import { QuestionType } from "../AddQuestionDialog/AddQuestionDialog";

import Link from "@/node_modules/next/link";

export type CardSet = {
  id: string;
  setName: string;
  cards: QuestionType[];
};

interface Props {
  cardSets: CardSet[];
}

export default function CardSetsDropdown({ cardSets }: Props) {
  return (
    <div className={styles.cardSetsDropdown}>
      {cardSets.map((set) => {
        const { id, setName } = set;

        return (
          <Link key={id} href={`/flashcards/${id}/study?card=0`}>
            {setName}
          </Link>
        );
      })}
    </div>
  );
}
