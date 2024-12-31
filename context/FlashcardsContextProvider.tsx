// "use client";

import React, { useState, useContext, createContext } from "react";
import { ReactNode } from "react";

import { QuestionType } from "@/app/Components/AddQuestionDialog/AddQuestionDialog";
import { CardSet } from "@/app/Components/CardSetsDropdown/CardSetsDropdown";

interface Props {
  children: ReactNode;
}

type FlashcardContextType = {
  flashcardSets: CardSet[];
  createFlashcardSet: (newFlashcardSet: QuestionType[]) => void;
  deleteFlashcardSet: (setId: string) => void;
  addQuestion: (setId: string, newQuestionObj: QuestionType) => void;
  editQuestion: (
    questionIdx: number,
    updatedField: string,
    key: string,
    setId: string,
    cards: QuestionType[]
  ) => void;
  deleteQuestion: (
    setId: string,
    cards: QuestionType[],
    questionIdx: number
  ) => void;
};

const FlashcardsContext = createContext<FlashcardContextType | null>(null);

export default function FlashcardsContextProvider({ children }: Props) {
  const [flashcardSets, setFlashcardSets] = useState();

  if (typeof window !== "undefined") {
    setFlashcardSets(JSON.parse(localStorage.getItem("flashcardSets")));
  }

  function createFlashcardSet(newFlashcardSet: QuestionType[]) {
    if (flashcardSets) {
      setFlashcardSets((prev: CardSet[]) => {
        return [newFlashcardSet, ...prev];
      });
      localStorage.setItem(
        "flashcardSets",
        JSON.stringify([newFlashcardSet, ...flashcardSets])
      );
    } else {
      setFlashcardSets([newFlashcardSet]);
      localStorage.setItem("flashcardSets", JSON.stringify([newFlashcardSet]));
    }
  }

  function deleteFlashcardSet(setId: string) {
    const cardSetsCopy = [...flashcardSets];

    const filtered: CardSet[] = cardSetsCopy.filter((set) => {
      return set.id !== setId;
    });

    setFlashcardSets(filtered);
    localStorage.setItem("flashcardSets", JSON.stringify(filtered));
  }

  function addQuestion(setId: string, newQuestionObj: QuestionType) {
    const stateCopy = [...flashcardSets];

    const setIdx = stateCopy.indexOf(
      stateCopy.filter((set) => {
        return set.id == setId;
      })[0]
    );

    stateCopy[setIdx].cards = [...stateCopy[setIdx].cards, newQuestionObj];

    setFlashcardSets([...stateCopy]);
    localStorage.setItem("flashcardSets", JSON.stringify([...stateCopy]));
  }

  function editQuestion(
    questionIdx: number,
    updatedField: string,
    key: string,
    setId: string,
    cards: QuestionType[]
  ) {
    const question = cards[questionIdx];

    question[key] = updatedField;

    const stateCopy = [...flashcardSets];

    const setIdx = stateCopy.indexOf(
      stateCopy.filter((set) => {
        return set.id == setId;
      })
    );

    stateCopy[setIdx] = cards;

    setFlashcardSets([...stateCopy]);
    localStorage.setItem("flashcardSets", JSON.stringify([...stateCopy]));
  }

  function deleteQuestion(
    setId: string,
    cards: QuestionType[],
    questionIdx: number
  ) {
    const filteredCards = cards.filter((card, idx) => {
      return idx !== questionIdx;
    });

    const stateCopy = [...flashcardSets];

    const setIdx = stateCopy.indexOf(
      stateCopy.filter((set) => {
        return set.id == setId;
      })[0]
    );

    stateCopy[setIdx].cards = filteredCards;

    setFlashcardSets([...stateCopy]);
    localStorage.setItem("flashcardSets", JSON.stringify([...stateCopy]));
  }

  return (
    <FlashcardsContext.Provider
      value={{
        flashcardSets,
        createFlashcardSet,
        deleteFlashcardSet,
        addQuestion,
        editQuestion,
        deleteQuestion,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}

export const useFlashcardsContext = () => {
  const context = useContext(FlashcardsContext);
  if (!context)
    throw Error("useAuthContext can only be used inside an AuthProvider");
  return context;
};
