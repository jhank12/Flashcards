"use client";

import React, { useRef } from "react";

import styles from "./edit.module.css";

import { useParams, useRouter } from "@/node_modules/next/navigation";

import { useFlashcardsContext } from "@/context/FlashcardsContextProvider";

import { showModal } from "@/app/lib/modalFunctions";

import QuestionsList from "@/app/Components/QuestionsList/QuestionsList";
import JustifySpaceBetween from "@/app/Components/JustifySpaceBetween/JustifySpaceBetween";

import MainButton from "@/app/Components/MainButton/MainButton";

import AddQuestionDialog from "@/app/Components/AddQuestionDialog/AddQuestionDialog";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();

  const { flashcardSets, deleteFlashcardSet, editQuestion, deleteQuestion } =
    useFlashcardsContext();

  function deleteSet() {
    router.push("/flashcards");
    deleteFlashcardSet(setId);
  }

  const setId = params.flashcardSetId;

  const cardSet = flashcardSets?.filter((set) => {
    return set.id === setId;
  })[0];

  const cardSetName = cardSet?.setName;

  const cards = cardSet?.cards;

  const addQuestionRef = useRef(null);

  return (
    <div className={styles.editPage}>
      {flashcardSets && (
        <>
          <AddQuestionDialog
            dialogRef={addQuestionRef}
            inCreateSet={false}
            setId={setId}
          />
          <JustifySpaceBetween>
            <h1>{cardSetName}</h1>

            <div className={styles.cardSetActions}>
              <MainButton
                text={"Add Question"}
                onClick={(e) => showModal(addQuestionRef, e)}
              />

              <MainButton text={"Delete Flashcard Set"} onClick={deleteSet} />
            </div>
          </JustifySpaceBetween>
          <QuestionsList
            questionsList={cards}
            editQuestion={editQuestion}
            deleteQuestion={deleteQuestion}
            inEditPage={true}
            setId={setId}
          />
        </>
      )}
    </div>
  );
}
