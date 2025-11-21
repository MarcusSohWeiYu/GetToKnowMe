import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// Question Schema
const questionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  questionType: {
    type: String,
    required: true,
    enum: [
      'multiple-choice',
      'checkboxes',
      'text-short',
      'text-long',
      'dropdown',
    ],
  },
  // Options for multiple choice, checkboxes, dropdown
  options: [{
    text: String,
    value: String,
  }],
  // Question settings
  required: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

// Survey Schema
const surveySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'active', 'paused', 'closed'],
      default: 'draft',
    },
    questions: [questionSchema],
    
    // AI Instructions for avatar generation
    aiInstructions: {
      type: String,
      trim: true,
      default: 'Generate a character avatar based on the survey responses',
    },
    
    // Response count
    responses: {
      type: Number,
      default: 0,
    },
    
    // Creator reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
  }
);

// Add plugin that converts mongoose to json
surveySchema.plugin(toJSON);

export default mongoose.models.Survey || mongoose.model("Survey", surveySchema);