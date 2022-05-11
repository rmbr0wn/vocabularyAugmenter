import React from 'react';

/* The privacy & email parameters won't be used until public lists become a thing
 * (if ever).
 *
 * The "name" h4 should be changed to a different HTML element that is editable
 * in the future.
 */
const ListPanel = ({ email, name, privacy, tags, words }) => (

    <div className="list-panel">
      <h4 className="list-panel-name"> {name} </h4>
      <h3 className="list-panel-tags"> {tags} </h3>
      <h3 className="list-panel-words"> {words} </h3>
      <h6 className="temp-params"> {email} , {privacy.toString()} </h6>
    </div>

);

export default ListPanel;
