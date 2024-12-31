"use client";

import React, { useState, Ref, SetStateAction, Dispatch } from "react";

import styles from "./AddQuestionDialog.module.css";

import { v4 as uuid } from "uuid";

// functions

import { closeModal } from "@/app/lib/modalFunctions";

import { useFlashcardsContext } from "@/context/FlashcardsContextProvider";

// components
import Dialog from "../Dialog/Dialog";
import JustifySpaceBetween from "../JustifySpaceBetween/JustifySpaceBetween";
import LabelInputContainer from "../LabelInputContainer/LabelInputContainer";

interface Props {
  dialogRef: Ref<HTMLDialogElement>;
  setQuestionsList: Dispatch<SetStateAction<QuestionType[]>>;
  inCreateSet?: boolean;
  setId?: string;
}

export type QuestionType = {
  id: string;
  question: string;
  answer: string;
};

export default function AddQuestionDialog({
  dialogRef,
  setQuestionsList,
  inCreateSet = true,
  setId = "",
}: Props) {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const { addQuestion } = useFlashcardsContext();

  function addQuestionOnSubmit(e: null | undefined) {
    e.preventDefault();

    const newQuestionObj: QuestionType = {
      id: uuid(),
      question: newQuestion,
      answer: newAnswer,
    };

    if (newQuestion !== "" && newAnswer !== "") {
      setError(false);
      if (inCreateSet) {
        setQuestionsList((prev: QuestionType[]) => [...prev, newQuestionObj]);
      } else {
        addQuestion(setId, newQuestionObj);
      }

      closeModal(dialogRef, e);
      setNewQuestion("");
      setNewAnswer("");
    } else {
      setError(true);
    }
  }

  return (
    <Dialog dialogRef={dialogRef}>
      <JustifySpaceBetween>
        <h2>Add Question</h2>
        <i
          className="ri-close-line modalCloseIcon"
          onClick={(e) => closeModal(dialogRef, e)}
        />
      </JustifySpaceBetween>

      <form onSubmit={addQuestionOnSubmit}>
        <LabelInputContainer>
          <label htmlFor="questionInput">Question</label>
          <input
            type="text"
            id="questionInput"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <label htmlFor="questionInput">Answer</label>
          <input
            type="text"
            id="questionInput"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </LabelInputContainer>

        {error && (
          <p className={styles.errorText}>
            Error: One or more of the fields are empty.
          </p>
        )}

        <button className={styles.formSubmitBtn}>Add Question</button>
      </form>
    </Dialog>
  );
}
