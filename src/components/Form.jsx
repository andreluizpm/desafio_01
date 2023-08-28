import React, { useState } from 'react';
import './styles/Form.css';

function Form({
    cardData,
    cardFrontDataFieldState,
    setCardFrontDataFieldState,
    cardBackDataFieldState,
    setCardBackDataFieldState
}) {
    const [formErrors, setFormErrors] = useState({});

    const formatCardNumber = (value) => {
        // Remove all non-numeric characters
        const numericValue = value.replace(/\D/g, '');

        // Insert space after every 4 digits
        const formattedValue = numericValue.replace(/(.{4})/g, '$1 ');

        return formattedValue.trim();
    };

    const validateForm = () => {
        const errors = {};
    
        if (!cardFrontDataFieldState.userName) {
            errors.userName = 'Please enter cardholder name';
        }
    
        if (!cardFrontDataFieldState.numberCard) {
            errors.numberCard = 'Please enter card number';
        } else if (cardFrontDataFieldState.numberCard.replace(/\D/g, '').length !== 16) {
            errors.numberCard = 'Card number must be 16 digits';
        } else if (/^0+$/.test(cardFrontDataFieldState.numberCard.replace(/\D/g, ''))) {
            errors.numberCard = 'Card number cannot be all zeros';
        }
    
        if (!cardFrontDataFieldState.cvv || cardFrontDataFieldState.cvv == 0) {
            errors.cvv = 'Please enter CVV';
        }
    
        const expMM = parseInt(cardFrontDataFieldState.expMM, 10);
        const expYY = parseInt(cardFrontDataFieldState.expYY, 10);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
    
        if (!cardFrontDataFieldState.expMM || !cardFrontDataFieldState.expYY) {
            errors.expDate = 'Please enter expiration date';
        } else if (expMM < 1 || expMM > 12) {
            errors.expDate = 'Invalid month';
        } else if (expYY < currentYear || (expYY === currentYear && expMM < (currentDate.getMonth() + 1))) {
            errors.expDate = 'Card has expired';
        }
    
        setFormErrors(errors);
    
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Submit your form data or take further actions here
            console.log('Form submitted successfully');
        }
    };


    return (
        <>
         {formErrors.expDate && <div className="error">{formErrors.expDate}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="CARDHOLDER NAME">CARDHOLDER NAME</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={`e.g ${cardData.userName}`}
                    maxLength={50}
                    onChange={(e) => {
                        setCardFrontDataFieldState((oldState) => ({
                            ...oldState,
                            userName: e.target.value.toLocaleUpperCase()
                        }));
                    }}
                />
                {formErrors.userName && <span className="error">{formErrors.userName}</span>}

                <label htmlFor="CARD NUMBER">CARD NUMBER</label>
                <input
                    type="text"
                    name="numberCard"
                    id="numberCard"
                    value={formatCardNumber(cardFrontDataFieldState["numberCard"])}
                    placeholder={`e.g 0000 0000 0000 0000`}
                    maxLength={19}
                    onChange={(e) => {
                        setCardFrontDataFieldState((oldState) => ({
                            ...oldState,
                            numberCard: e.target.value
                        }));
                    }}
                />
                {formErrors.numberCard && <span className="error">{formErrors.numberCard}</span>}

                <div className='label'>
                    <label htmlFor="exp.date(mm/yy)">EXP. DATE(MM/YY)</label>
                    <label htmlFor="cvc" id='cvc'>CVC</label>
                    <div>
                        <input
                            type="text"
                            name="expMM"
                            id="expMM"
                            placeholder="MM"
                            minLength={2}
                            maxLength={2}
                           
                            onChange={(e) => {
                                setCardFrontDataFieldState((oldState) => ({
                                    ...oldState,
                                    expMM: e.target.value
                                }));
                            }}
                        />
                        <input
                            type="text"
                            name="expYY"
                            id="expYY"
                            placeholder="YY"
                            minLength={2}
                            maxLength={2}
                            onChange={(e) => {
                                setCardFrontDataFieldState((oldState) => ({
                                    ...oldState,
                                    expYY: e.target.value
                                }));
                            }}
                        />
                       
                        <input
                            type="text"
                            name="cvv"
                            id="cvv"
                            minLength={3}
                            maxLength={3}
                            placeholder="cvv"
                            onChange={(e) => {
                                setCardBackDataFieldState((oldState) => ({
                                    ...oldState,
                                    cvv: e.target.value
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Confirm" id='confirm'/>
                    </div>
                </div>
            </form>
        </>
    );
}

export { Form };