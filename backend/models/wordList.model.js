import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Subdocument of listSchema
const wordSchema = new Schema({
	wordName: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  partOfSpeech: {
    type: String,
    required: true
  },
  synonyms: {
    type: [String],
    default: []
  },
  relatedWords: {
    type: [String],
    default: []
  }
});

const listSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	name: {
	  type: String,
    required: true,
    trim: true,
		min: 1
	},
  private: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  words: {
    type: [wordSchema],
    default: []
  }

}, {
	timestamps: true
});

const WordList = mongoose.model("WordList", listSchema);

// export const Word = mongoose.model("Word", wordSchema);
export default WordList;
