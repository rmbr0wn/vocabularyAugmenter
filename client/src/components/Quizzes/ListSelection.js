import React from "react";
import PropTypes from "prop-types";

import "./listselection.css";

const ListSelection = (props) => {
  let uniqueKeyNum = 0;

  const CreateListEntry = (list, side, listId) => {
    let listItemArray = [];
    let buttonText = (side === "Left") ? "+" : "-";

    let listName = React.createElement(
      "p",
      {
        key: (side === "Left") ? listId + "-pLeft" : listId + (uniqueKeyNum+=1) + "-pRight",
        className: "list-selection-individual-name"
      },
      list.name);

    let listButton = React.createElement(
      "button",
      {
        id: listId,
        onClick: (side === "Left") ? props.addToRightList : props.removeFromRightList,
        key: (side === "Left") ? listId + "-btnLeft" : listId + (uniqueKeyNum+=1) + "-btnRight",
        className: "form-button"
      },
      buttonText);

    listItemArray.push(listName);
    listItemArray.push(listButton);

    let listDiv = React.createElement(
      "div",
      {
        key: (side === "Left") ? listId + "-divLeft" : listId + (uniqueKeyNum+=1) + "-divRight",
        className: "left-list-individual-container"
      },
      listItemArray);

    return listDiv;
  };

  const DisplayLeft = (lists) => {
    let leftArray = [];

    if (!lists || lists.length === 0) {
      let noLists = React.createElement(
        "p",
        {
          key: "noListsInRight",
          className: "no-lists-text"
        },
        "No lists remaining, or none to be found.");
      leftArray.push(noLists);
      return leftArray;
    }

    lists.forEach((list) => {
      let arrayItem = CreateListEntry(list, "Left", list._id);
      leftArray.push(arrayItem);
    });

    return leftArray;
  };

  const DisplayRight = (lists) => {
    let rightArray = [];

    if (!lists || lists.length === 0) {
      let noLists = React.createElement(
        "p",
        {
          key: "noListsInRight",
          className: "no-lists-text"
        },
        "No lists have been added yet.");
      rightArray.push(noLists);
      return rightArray;
    }

    lists.forEach((list) => {
      let arrayItem = CreateListEntry(list, "Right", list._id);
      rightArray.push(arrayItem);
    });

    return rightArray;
  };

  return (
    <div id="list-selection-wrapper">
      <div className="left-list-wrapper">
        <h2 className="list-selection-header"> Click on a &ldquo;+&rdquo; below to add a list for the quiz game! </h2>
        <hr className="list-selection-hr"/>
        <div className="quiz-lists-container">
          {DisplayLeft(props.leftLists)}
        </div>
      </div>
      <div className="right-list-wrapper">
        <h2 className="list-selection-header"> The added lists for the quiz game: </h2>
        <hr className="list-selection-hr"/>
        <div className="quiz-lists-container">
          {DisplayRight(props.rightLists)}
        </div>
      </div>
    </div>

  );
};

ListSelection.propTypes = {
  leftLists: PropTypes.array,
  rightLists: PropTypes.array,
  addToRightList: PropTypes.func,
  removeFromRightList: PropTypes.func
};

export default ListSelection;
