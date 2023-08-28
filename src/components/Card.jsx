import React from "react";
import "./styles/Card.css";

const Front = ({ cardFrontData }) => {
    return (
        <div className="frontCard">
            <div className="boll"></div>
            <div className="numbercardcontainer">
            {cardFrontData.numberCard === "" ? (
                <h1 id="numberCardfront">0000 0000 0000 0000</h1>
            ) : (
                <h1 id="numberCardfront">{cardFrontData.numberCard}</h1>
            )}</div>
            <div className="container-bottom">
            {cardFrontData.userName === "" ? (
                <p id="">Nome do Titular</p>
            ) : (
                <p id="">{cardFrontData.userName}</p>
            )}
            {cardFrontData.expMM === "" || cardFrontData.expYY === "" ? (
                <div>
                    <span>MM</span> / <span>AA</span>
                </div>
            ) : (
                <div>
                    <span>{cardFrontData.expMM}</span> /{" "}
                    <span>{cardFrontData.expYY}</span>
                </div>
            )}</div>
        </div>
    );
};


const Back = ({ cardBackData }) => {
    return <div className="backCard">
        <p>{cardBackData.cvv}</p>
    </div>;
};

const Card = ({ cardData, side }) => {
    return side === "front" ? (
        <Front cardFrontData={cardData} />
    ) : (
        <Back cardBackData={cardData} />
    );
};

export { Card };
