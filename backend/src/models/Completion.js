const mongoose = require("mongoose");

const CompletionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  userName: { type: String, required: true },
  answers: [
    {
      questionText: { type: String, required: true },
      response: [{ type: String }],
      isCorrect: { type: Boolean, required: true },
    },
  ],
  completionTime: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Completion", CompletionSchema);
