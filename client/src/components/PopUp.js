import React from 'react';

function PopUp({ openPopup }) {
  return (
    <div className="box">
      <div className="popup-container">
        <div className="header">
          <h1 className="story"> Our Story</h1>
        </div>
        <div className="popup-content">
          <p className="popup-text">
            This application was established in 2021 after the Operation
            Guardian of the Walls, by Omer Botbol, Shira Meirovitz and Noa
            Shalom as part of a program for veterans that operated by Scale-Up
            Velocity in cooperation with the IDF and the cyber system.
          </p>
          <br></br>
          <p className="popup-text">
            The purpose of the application is to reflect the knowledge acquired
            after five months of training and has one vision: to create and
            expand the circles of volunteering and giving in Israeli society,
            with an emphasis on free accommodation. In order to promote this
            vision, we have developed an application that makes accessible and
            quick search for accommodation, as well as advertising accommodation
            at the click of a button.
          </p>
          <br></br>
          <p className="popup-text">
            We believe that volunteering can and should become public domain,
            and that the way there is through quality technology.
          </p>
        </div>
        <button className="close-popup-btn" onClick={() => openPopup(false)}>
          X
        </button>
      </div>
    </div>
  );
}

export default PopUp;
