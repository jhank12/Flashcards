"use client";

import React, { useState, useRef } from "react";

import { v4 as uuid } from "uuid";

import "remixicon/fonts/remixicon.css";

import styles from "./page.module.css";

import Link from "@/node_modules/next/link";

import { useRouter } from "@/node_modules/next/navigation";

import { showModal } from "@/app/lib/modalFunctions";

// types

import { QuestionType } from "@/app/Components/AddQuestionDialog/AddQuestionDialog";

// components
import LabelInputContainer from "@/app/Components/LabelInputContainer/LabelInputContainer";
import AddQuestionDialog from "@/app/Components/AddQuestionDialog/AddQuestionDialog";

import { useFlashcardsContext } from "@/context/FlashcardsContextProvider";
import QuestionsList from "@/app/Components/QuestionsList/QuestionsList";
import JustifySpaceBetween from "@/app/Components/JustifySpaceBetween/JustifySpaceBetween";

import MainButton from "@/app/Components/MainButton/MainButton";

export default function CreateSetPage() {
  const addQuestionDialogRef = useRef(null);

  const [flashcardSetName, setFlashcardSetName] = useState<string>("");
  const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);

  const [error, setError] = useState(false);

  const { createFlashcardSet } = useFlashcardsContext();

  const router = useRouter();

  //   key = question or answer
  function editQuestion(
    questionIdx: number,
    updatedField: string,
    key: string
  ) {
    const questionsListCopy: QuestionType[] = [...questionsList];
    const question: QuestionType = questionsListCopy[questionIdx];

    question[key] = updatedField;

    setQuestionsList([...questionsListCopy]);
  }

  function deleteQuestion(questionIdx: number) {
    setQuestionsList((prev) => {
      return prev.filter((q, idx) => {
        return idx !== questionIdx;
      });
    });
  }

  function flashcardSetSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (flashcardSetName !== "") {
      const newFlashcardSetObj = {
        id: uuid(),
        setName: flashcardSetName,
        cards: questionsList,
      };

      createFlashcardSet(newFlashcardSetObj);
      setFlashcardSetName("");
      setError(false);

      router.push("./");
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.createSetPage}>
      <AddQuestionDialog
        dialogRef={addQuestionDialogRef}
        setQuestionsList={setQuestionsList}
      />

      <Link href={"/flashcards"}>
        <i className="ri-arrow-left-s-line" />
        Back to your flashcard sets
      </Link>
      <h1>Create New Set</h1>
      <form className={styles.createSetForm} onSubmit={flashcardSetSubmit}>
        <LabelInputContainer>
          <label htmlFor={styles.setNameInput}>Flashcard Set Name</label>
          <input
            type="text"
            id={styles.setNameInput}
            value={flashcardSetName}
            onChange={(e) => setFlashcardSetName(e.target.value)}
          />
          {error && (
            <p className={styles.errorText}>
              Error: Flashcard set name input is empty.
            </p>
          )}
        </LabelInputContainer>

        <hr />

        <div className={styles.questionAnswersContainer}>
          <JustifySpaceBetween>
            <h2>Your Questions and Answers</h2>

            <MainButton
              text={"Add Question"}
              onClick={(e) => showModal(addQuestionDialogRef, e)}
            />
          </JustifySpaceBetween>

          <div className={styles.questionAnswersList}>
            <QuestionsList
              questionsList={questionsList}
              editQuestion={editQuestion}
              deleteQuestion={deleteQuestion}
            />
          </div>

          <MainButton text={"Create Set"} />
        </div>
      </form>
    </div>
  );
}
