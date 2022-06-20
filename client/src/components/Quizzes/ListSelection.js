import React, { useState } from "react";
import PropTypes from "prop-types";

import "./list-style.css"

const ListSelection = ({ leftLists, rightLists, addToRight, removeFromRight }) => {
  let uniqueKeyNum = 0;

  const CreateListEntry = (list, side, listId) => {
    let listItemArray = [];
    let buttonText = (side === "Left") ? "+" : "-";

    let listName = React.createElement(
      "p",
      {
        key: (side === "Left") ? listId + "-pLeft" : listId + (uniqueKeyNum+=1) + "-pRight"
      },
      list.name);

    let listButton = React.createElement(
      "button",
      {
        id: listId,
        onClick: (side === "Left") ? addToRight : removeFromRight,
        key: (side === "Left") ? listId + "-btnLeft" : listId + (uniqueKeyNum+=1) + "-btnRight"
      },
      buttonText);

    listItemArray.push(listName);
    listItemArray.push(listButton);

    let listDiv = React.createElement(
      "div",
      {
        key: (side === "Left") ? listId + "-divLeft" : listId + (uniqueKeyNum+=1) + "-divRight"
      },
      listItemArray);

    return listDiv;
  }

  const DisplayLeft = (lists) => {
    let leftArray = [];

    if (!lists || lists.length === 0) {
      leftArray.push("No lists to be found.");
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
      rightArray.push("No lists to be found.");
      return rightArray;
    }

    lists.forEach((list) => {
      let arrayItem = CreateListEntry(list, "Right", list._id);
      rightArray.push(arrayItem);
    });

    return rightArray;
  };

  return (
    <div className="list-selection-container">
      <div className="left-list-container">
        {DisplayLeft(leftLists)}
      </div>
      <div className="right-list-container">
        {DisplayRight(rightLists)}
      </div>
    </div>

  );
};

ListSelection.propTypes = {
  leftLists: PropTypes.array,
  rightLists: PropTypes.array,
  addToRight: PropTypes.func,
  removeFromRight: PropTypes.func,
};

export default ListSelection;
