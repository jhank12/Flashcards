"use client";

import React from "react";

import Link from "@/node_modules/next/link";

import styles from "./page.module.css";

import { useFlashcardsContext } from "@/context/FlashcardsContextProvider";

import Flashcard from "../Components/Flashcard/Flashcard";
import PageContainer from "../Components/PageContainer/PageContainer";
import MainLinkButton from "../Components/MainLinkButton/MainLinkButton";

export default function FlashcardsPage() {
  const { flashcardSets } = useFlashcardsContext();

  function pluralizeString(num, item): string {
    const word = num > 1 ? `${item}s` : `${item}`;

    return word;
  }

  return (
    <PageContainer>
      <div className={styles.flashCardPage}>
        <div className={styles.flashCardsActions}>
          <h1>Your Flashcard Sets</h1>

          <MainLinkButton text={"Create Set"} href={"/flashcards/create-set"} />
        </div>

        <div className={styles.flashcardSetsContainer}>
          {flashcardSets?.map((set) => {
            const { id, setName, cards } = set;

            return (
              <Link key={id} href={`./flashcards/${id}`}>
                <Flashcard key={id}>
                  <div className={styles.cardInfoContainer}>
                    <p className={styles.cardSetName}>{setName}</p>
                    <p className={styles.cardSetAmount}>
                      {cards.length} {pluralizeString(cards.length, "Question")}
                    </p>
                  </div>
                </Flashcard>
              </Link>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
