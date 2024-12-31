"use client";

import React, { useState } from "react";

import "remixicon/fonts/remixicon.css";

import {
  usePathname,
  useParams,
  useRouter,
  useSearchParams,
} from "@/node_modules/next/navigation";

import styles from "./page.module.css";

import { useFlashcardsContext } from "@/context/FlashcardsContextProvider";

import Flashcard from "@/app/Components/Flashcard/Flashcard";
import CardSetsDropdown, {
  CardSet,
} from "@/app/Components/CardSetsDropdown/CardSetsDropdown";
import MainLinkButton from "@/app/Components/MainLinkButton/MainLinkButton";
import { QuestionType } from "@/app/Components/AddQuestionDialog/AddQuestionDialog";

export default function StudyPage() {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();
  const searchParams = useSearchParams();

  const currentCardIdx = searchParams.get("card");

  const { flashcardSets } = useFlashcardsContext();

  const [cardSetDropdownOpen, setCardSetDropdownOpen] = useState(false);

  const cardSet = flashcardSets?.filter((set: CardSet) => {
    return set.id === params.flashcardSetId;
  })[0];

  const cardSetName = cardSet?.setName;

  const cards = cardSet?.cards;

  const [cardFlipped, setCardFlipped] = useState(false);

  function flipCard() {
    setCardFlipped(!cardFlipped);
  }

  function incrementCardCounter() {
    if (Number(currentCardIdx) < cards.length - 1) {
      router.push(`${pathname}?card=${Number(currentCardIdx) + 1}`);
      setCardFlipped(false);
    }
  }

  function decrementCardCounter() {
    if (Number(currentCardIdx) > 0) {
      router.push(`${pathname}?card=${Number(currentCardIdx) - 1}`);
      setCardFlipped(false);
    }
  }

  return (
    <>
      <div className={styles.flashcardMain}>
        <div className={styles.setNameAndDropdownContainer}>
          <h1
            className={styles.cardSetNameHeading}
            onClick={() => setCardSetDropdownOpen(!cardSetDropdownOpen)}
          >
            {cardSetName}
          </h1>

          {cardSetDropdownOpen && <CardSetsDropdown cardSets={flashcardSets} />}
        </div>

        {cards.length > 0 ? (
          <>
            <div className={styles.cardAndActionsContainer}>
              <button
                className={styles.cardCounterMain}
                onClick={decrementCardCounter}
                disabled={Number(currentCardIdx) === 0}
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              {cards
                .filter((_: any, idx: number) => {
                  return idx === Number(currentCardIdx);
                })
                .map((card: QuestionType) => {
                  const { id, question, answer } = card;

                  return (
                    <Flashcard onClick={flipCard} cardKey={id}>
                      {!cardFlipped ? <p>{question}</p> : <p>{answer}</p>}
                    </Flashcard>
                  );
                })}

              <button
                className={styles.cardCounterMain}
                onClick={incrementCardCounter}
                disabled={Number(currentCardIdx) === cards?.length - 1}
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>

              <div className={styles.smScreenCardBtns}>
                <button
                  onClick={decrementCardCounter}
                  disabled={Number(currentCardIdx) === 0}
                >
                  <i className="ri-arrow-left-s-line"></i>
                </button>
                <button
                  onClick={incrementCardCounter}
                  disabled={Number(currentCardIdx) === cards?.length - 1}
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>

            <div className={styles.progressBar}>
              {Number(currentCardIdx) + 1}/{cards?.length}
            </div>
          </>
        ) : (
          <div className={styles.emptyCardsText}>
            <p>
              You have no cards in this set. Click the button to edit and add
              cards.
            </p>

            <MainLinkButton
              text="Edit Card Set"
              href={`/flashcards/${params.flashcardSetId}/edit`}
            />
          </div>
        )}
      </div>
    </>
  );
}
