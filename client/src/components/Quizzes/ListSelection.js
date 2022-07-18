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
        key: (side === "Left") ? listId + "-pLeft" : listId + (uniqueKeyNum+=1) + "-pRight"
      },
      list.name);

    let listButton = React.createElement(
      "button",
      {
        id: listId,
        onClick: (side === "Left") ? props.addToRightList : props.removeFromRightList,
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
  };

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
      rightArray.push("No lists have been added yet.");
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
        <h2> Click on a &ldquo;+&rdquo; below to add a list for the quiz game! </h2>
        <hr className="list-selection-hr"/>
        {DisplayLeft(props.leftLists)}
      </div>
      <div className="right-list-container">
        <h2> The added lists for the quiz game: </h2>
        <hr className="list-selection-hr"/>
        {DisplayRight(props.rightLists)}
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
