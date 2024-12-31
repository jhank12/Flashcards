import React, { useState, useRef } from "react";

import styles from "../QuestionsList/QuestionsList.module.css";

import EditDialog from "../EditDialog/EditDialog";

import { showModal } from "@/app/lib/modalFunctions";

import { QuestionType } from "../AddQuestionDialog/AddQuestionDialog";

interface Props {
  q: QuestionType;
  idx: number;
  questionsList: QuestionType[];
  editQuestion: (
    idx: number,
    updatedField: string,
    key: string,
    setId?: string,
    cards?: QuestionType[]
  ) => void;
  inEditPage: boolean;
  setId: string;
}

export default function QuestionAndAnswer({
  q,
  idx,
  questionsList,
  editQuestion,
  inEditPage,
  setId,
}: Props) {
  const { question, answer } = q;

  const editDialogRef = useRef(null);

  const [currentKey, setCurrentKey] = useState("");

  function editQuestionSubmit(updatedField: string) {
    if (inEditPage) {
      editQuestion(idx, updatedField, currentKey, setId, questionsList);
    } else {
      editQuestion(idx, updatedField, currentKey);
    }
  }

  function showEditModal(key: string) {
    setCurrentKey(key);
    showModal(editDialogRef);
  }

  return (
    <>
      <EditDialog
        dialogRef={editDialogRef}
        editQuestionSubmit={editQuestionSubmit}
        currentKey={currentKey}
        isForm={inEditPage}
      />
      <div>
        <div className={styles.questionListQuestion}>
          <p>Q: {question}</p>

          <div className={styles.questionListActions}>
            <p
              className={styles.questionAction}
              onClick={() => showEditModal("question")}
            >
              Edit
            </p>
          </div>
        </div>
        <div className={styles.questionListAnswer}>
          <p>A: {answer}</p>

          <div className={styles.questionListActions}>
            <p
              className={styles.questionAction}
              onClick={() => showEditModal("answer")}
            >
              Edit
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
