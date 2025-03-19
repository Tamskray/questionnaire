const mongoose = require("mongoose");

const CompletionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      response: [{ type: String }],
    },
  ],
  completionTime: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Completion", CompletionSchema);
