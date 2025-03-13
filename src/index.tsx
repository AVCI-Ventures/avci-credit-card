import { FC, useEffect, useState } from 'react';
import StyledCreditCard from './styles';
import { CARD_TYPE, CreditCardProps } from './types';
import Payment from 'payment';
const CreditCard: FC<CreditCardProps> = ({
  cvc,
  expiry,
  focused,
  name,
  number,
  token,
  preview,
  callback,
  acceptedCards,
  locale = {
    valid: "valid thru",
  },
  placeholders = {
    name: "Jack Daniels",
  }
}) => {

  const [issuer, setIssuer] = useState<string | undefined>(undefined);
  const [maxLength, setMaxLength] = useState<number>(16);

  useEffect(() => {
    if (number && typeof number === 'string') {
      const issuer = Payment.fns.cardType(number as string);
      setIssuer(issuer);
    }
  }, [number]);

  useEffect(() => {
    if (issuer) {
      if (issuer === 'amex') {
        setMaxLength(15);
      } else if (issuer === 'dinersclub') {
        setMaxLength(14);
      } else if (['hipercard', 'mastercard', 'visa'].includes(issuer)) {
        setMaxLength(16);
      } else {
        setMaxLength(16);
      }
    }
  }, [issuer]);

  useEffect(() => {
    let newCardArray: Array<any> = [];
    if (acceptedCards) {
      Payment.getCardArray().forEach(d => {
        if (acceptedCards.includes(d.type as CARD_TYPE)) {
          newCardArray.push(d);
        }
      });
    }
    else {
      newCardArray = newCardArray.concat(Payment.getCardArray());
    }
    Payment.setCardArray(newCardArray);
  }, [acceptedCards]);

  useEffect(() => {
    if (callback) {
      callback({
        issuer: issuer || '',
        maxLength,
        validNumber: Payment.fns.validateCardNumber(number as string),
      });
    }
  }, [callback, issuer, maxLength, number]);

  function handleNumberChange(ccnumber: string | number) {

    let nextNumber = typeof ccnumber === 'number' ? ccnumber.toString() : ccnumber.replace(/[A-Za-z]| /g, '');

    if (isNaN(parseInt(nextNumber, 10)) && !preview) {
      nextNumber = '';
    }

    if (maxLength > 16) {
      var length = nextNumber.length <= 16 ? 16 : maxLength;
      setMaxLength(length);
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength);
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•';
    }

    if (issuer) {
      if (['amex', 'dinersclub'].includes(issuer)) {
        const format = [0, 4, 10];
        const limit = [4, 6, 5];
        nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(format[1], limit[1])} ${nextNumber.substr(format[2], limit[2])}`;
      }
      else if (nextNumber.length > 16) {
        const format = [0, 4, 8, 12];
        const limit = [4, 7];
        nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(format[2], limit[0])} ${nextNumber.substr(format[3], limit[1])}`;
      }
      else {
        for (let i = 1; i < (maxLength / 4); i++) {
          const space_index = (i * 4) + (i - 1);
          nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(space_index)}`;
        }
      }
    }
    return nextNumber;
  }

  function handleExpiryChange(expiry: string | number) {
    const date = typeof expiry === 'number' ? expiry.toString() : expiry;
    let month = '';
    let year = '';

    if (date.includes('/')) {
      [month, year] = date.split('/');
    }
    else if (date.length) {
      month = date.substr(0, 2);
      year = date.substr(2, 6);
    }

    while (month.length < 2) {
      month += '•';
    }

    if (year.length > 2) {
      year = year.substr(2, 4);
    }

    while (year.length < 2) {
      year += '•';
    }

    return `${month}/${year}`;
  }


  return (
    <StyledCreditCard $token={token}>
      <div
        className={[
          'card',
          `card--${issuer}`,
          focused === 'cvc' && issuer !== 'amex' ? 'card--flipped' : '',
        ].join(' ').trim()}
      >
        <div className="card--front">
          <div className="card__background" />
          <div className="issuer" />
          <div
            className={[
              'cvc__front',
              focused === 'cvc' ? 'focused' : '',
            ].join(' ').trim()}
          >
            {cvc || placeholders.cvc}
          </div>
          <div
            className={[
              'number',
              String(number).replace(/ /g, '').length > 16 ? 'number--large' : '',
              focused === 'number' ? 'focused' : '',
              String(number).substr(0, 1) !== '•' ? 'filled' : '',
            ].join(' ').trim()}
          >
            {handleNumberChange(number) || placeholders.number}
          </div>
          <div
            className={[
              'name',
              focused === 'name' ? 'focused' : '',
              name ? 'filled' : '',
            ].join(' ').trim()}
          >
            {name || placeholders.name}
          </div>
          <div
            className={[
              'expiry',
              focused === 'expiry' ? 'focused' : '',
              String(expiry).substr(0, 1) !== '•' ? 'filled' : '',
            ].join(' ').trim()}
          >
            <div className="expiry__valid">{locale.valid}</div>
            <div className="expiry__value">{handleExpiryChange(expiry) || placeholders.expiry}</div>
          </div>
          <div className="chip" />
        </div>
        <div className="card--back">
          <div className="card__background" />
          <div className="stripe" />
          <div className="signature" />
          <div
            className={[
              'cvc',
              focused === 'cvc' ? 'focused' : '',
            ].join(' ').trim()}
          >
            {cvc}
          </div>
          <div className="issuer" />
        </div>
      </div>
    </StyledCreditCard>
  );
}

export default CreditCard;
