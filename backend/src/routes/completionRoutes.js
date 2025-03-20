const express = require("express");
const Completion = require("../models/Completion");
const Quiz = require("../models/Quiz");

const router = express.Router();

router.post("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userName, answers, completionTime, userTimezone } = req.body;

    if (!userName || !answers || !completionTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const completedAt = new Date().toLocaleString("en-US", {
      timeZone: userTimezone,
    });
    
    const newCompletion = new Completion({
      quizId,
      userName,
      answers,
      completionTime,
      completedAt,
    });
    await newCompletion.save();

    await Quiz.findByIdAndUpdate(quizId, { $inc: { completions: 1 } });

    res.status(201).json({
      message: "Quiz completed successfully",
      newCompletion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
