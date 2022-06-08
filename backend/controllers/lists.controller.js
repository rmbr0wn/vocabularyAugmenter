import WordList from "../models/wordList.model.js";

export const createList = async (req, res) => {
  const { listTitle, userEmail } = req.body;

  try {
    if(listTitle.length < 1) return res.status(400).json({ message: "The list title cannot be empty." });

    const result = await WordList.create({ name: listTitle, email: userEmail });

    res.status(201).json({ message: "List successfully created.", result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with createList: ", error });
  }
};

export const getUserLists = async (req, res) => {
  const { email } = req.query;

  try{
    const result = await WordList.find({ email }).exec();

    res.status(200).json({ message: "Lists successfully returned.", result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with getUserLists: ", error });
  }
}

export const changeListName = async (req, res) => {
  const { newName, listId } = req.body;

  try{
    if(!newName) return;

    const result = await WordList.findById(listId);

    result.name = newName;
    const updateName = await result.save();

    res.status(200).json({ message: "List successfully updated.", result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when updating the list name: ", error});
  }
}

export const deleteList = async (req, res) => {
  const { id } = req.params;

  try{

    const result = await WordList.deleteOne({ _id: id });
    console.log(result);

    if(!result) return res.status(404).send("No list found with that id.");

    res.status(200).json({ message: "List successfully deleted.", id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when deleting the list: ", error});
  }
}

export const deleteWord = async (req, res) => {
  const { word, listId } = req.body;

  try{
    const result = await WordList.findById(listId);

    if(!result) return res.status(404).send("No list found with that id.");

    var wordIndex = result.words.map(e => e.wordName).indexOf(word);
    if(wordIndex > -1){
      result.words.splice(wordIndex, 1);
    }

    const updateWords = await result.save();

    res.status(200).json({ message: "Word successfully deleted.", result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when deleting the word: ", error});
  }
}
