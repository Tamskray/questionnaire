import { quizzes } from "../quizzes";

export const getAllQuizzes = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/quizzes");
    if (!response.ok) {
      throw new Error("Failed to fetch quizzes");
    }
    const data = await response.json();
    return data.map((quiz) => ({
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      completions: quiz.completions,
      questionCount: quiz.questionCount,
    }));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

export const getQuiz = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/quizzes/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch quiz data");
    }
    const quiz = await response.json();
    return quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
};

export const updateQuiz = async (id, updatedQuizData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuizData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await fetch("http://localhost:5000/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error("Failed to create quiz");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const submitQuiz = async (
  quizId,
  userName,
  answers,
  completionTime
) => {
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const response = await fetch(
      `http://localhost:5000/api/completions/${quizId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          answers,
          completionTime,
          userTimezone,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit quiz");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting quiz completion:", error);
    throw error;
  }
};

