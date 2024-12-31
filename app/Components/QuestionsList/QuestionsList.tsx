"use client";

import React from "react";

import styles from "./QuestionsList.module.css";

// types
import { QuestionType } from "../AddQuestionDialog/AddQuestionDialog";

import QuestionAndAnswer from "../QuestionAndAnswer/QuestionAndAnswer";

interface Props {
  questionsList: QuestionType[];
  editQuestion: (
    questionIdx: number,
    updatedField: string,
    currentKey: string
  ) => void;
  deleteQuestion: (questionIdx: number) => void;
  inEditPage?: boolean;
  setId?: string;
}

export default function QuestionsList({
  questionsList,
  editQuestion,
  deleteQuestion,
  inEditPage = false,
  setId,
}: Props) {
  return (
    <>
      {questionsList?.map((q, idx) => {
        const { question } = q;

        return (
          <div key={question} className={styles.questionAnswerContainer}>
            <div className={styles.questionHeader}>
              <h3>Question {idx + 1}</h3>
              <p
                className={styles.questionAction}
                onClick={() =>
                  inEditPage
                    ? deleteQuestion(setId, questionsList, idx)
                    : deleteQuestion(idx)
                }
              >
                Delete
              </p>
            </div>

            <QuestionAndAnswer
              q={q}
              idx={idx}
              questionsList={questionsList}
              editQuestion={editQuestion}
              deleteQuestion={deleteQuestion}
              inEditPage={inEditPage}
              setId={setId}
            />
          </div>
        );
      })}
    </>
  );
}
