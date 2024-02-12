import React, { useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleAnswerChange = async (event) => {
    const newIndex = parseInt(event.target.value);
    setSelectedAnswer(newIndex);

    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newIndex,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update answer on the server");
      }

      console.log("Answer updated successfully on the server");
    } catch (error) {
      console.error("Error updating answer on the server:", error);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
