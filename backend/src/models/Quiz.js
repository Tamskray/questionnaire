const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ["single", "multiple", "text"], required: true },
  options: [{ type: String }],
  correctAnswers: [{ type: String }],
});

const QuizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema],
  completions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
