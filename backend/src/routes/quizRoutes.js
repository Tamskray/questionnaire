const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "name description completions"); // Only necessary fields
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
