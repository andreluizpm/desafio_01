import React, { useState } from 'react'

import './App.css'

import { Card } from './components/Card'

import {Form} from './components/Form'

const cardData = {
    numberCard: "0000 0000 0000 0000",
    userName: "Jane Appleseed",

    expMM: "00",
    expYY: "00",
    
    cvv: 123,
};
const cardDataFront = {
    side: "front",

    numberCard: cardData.numberCard,
    userName: cardData.userName,

    expMM: cardData.expMM,
    expYY: cardData.expYY,
};
const cardDataBack = {
  side: "back",
  cvv: cardData.cvv,
};

function App() {
  const [CardFrontData, setCardFrontData] = useState(cardDataFront);
  const [cardBackData, setCardBackData] = useState(cardDataBack);

  return (
    <>
      <div className='ContainerCard' style={{
        color: 'white',
      }}>
        <Card cardData={CardFrontData} side="front" />
        <Card cardData={cardBackData} side="back" />

      </div>
      
      <div className='ContainerForm'>
        <Form
          cardData={cardData}

          cardFrontDataFieldState={CardFrontData}
          setCardFrontDataFieldState={setCardFrontData}

          cardBackDataFieldState={cardBackData}
          setCardBackDataFieldState={setCardBackData}
        />
      </div>
    </>
  )
}

export default App
