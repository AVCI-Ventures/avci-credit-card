var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import StyledCreditCard from './styles';
import Payment from 'payment';
var CreditCard = function (_a) {
    var cvc = _a.cvc, expiry = _a.expiry, focused = _a.focused, name = _a.name, number = _a.number, token = _a.token, preview = _a.preview, callback = _a.callback, acceptedCards = _a.acceptedCards, _b = _a.locale, locale = _b === void 0 ? {
        valid: "valid thru",
    } : _b, _c = _a.placeholders, placeholders = _c === void 0 ? {
        name: "Jack Daniels",
    } : _c;
    var _d = useState(undefined), issuer = _d[0], setIssuer = _d[1];
    var _e = useState(16), maxLength = _e[0], setMaxLength = _e[1];
    useEffect(function () {
        if (number && typeof number === 'string') {
            var issuer_1 = Payment.fns.cardType(number);
            setIssuer(issuer_1);
        }
    }, [number]);
    useEffect(function () {
        if (issuer) {
            if (issuer === 'amex') {
                setMaxLength(15);
            }
            else if (issuer === 'dinersclub') {
                setMaxLength(14);
            }
            else if (['hipercard', 'mastercard', 'visa'].includes(issuer)) {
                setMaxLength(16);
            }
            else {
                setMaxLength(16);
            }
        }
    }, [issuer]);
    useEffect(function () {
        var newCardArray = [];
        if (acceptedCards) {
            Payment.getCardArray().forEach(function (d) {
                if (acceptedCards.includes(d.type)) {
                    newCardArray.push(d);
                }
            });
        }
        else {
            newCardArray = newCardArray.concat(Payment.getCardArray());
        }
        Payment.setCardArray(newCardArray);
    }, [acceptedCards]);
    useEffect(function () {
        if (callback) {
            callback({
                issuer: issuer || '',
                maxLength: maxLength,
                validNumber: Payment.fns.validateCardNumber(number),
            });
        }
    }, [callback, issuer, maxLength, number]);
    function handleNumberChange(ccnumber) {
        var nextNumber = typeof ccnumber === 'number' ? ccnumber.toString() : ccnumber.replace(/[A-Za-z]| /g, '');
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
                var format = [0, 4, 10];
                var limit = [4, 6, 5];
                nextNumber = "".concat(nextNumber.substr(format[0], limit[0]), " ").concat(nextNumber.substr(format[1], limit[1]), " ").concat(nextNumber.substr(format[2], limit[2]));
            }
            else if (nextNumber.length > 16) {
                var format = [0, 4, 8, 12];
                var limit = [4, 7];
                nextNumber = "".concat(nextNumber.substr(format[0], limit[0]), " ").concat(nextNumber.substr(format[1], limit[0]), " ").concat(nextNumber.substr(format[2], limit[0]), " ").concat(nextNumber.substr(format[3], limit[1]));
            }
            else {
                for (var i = 1; i < (maxLength / 4); i++) {
                    var space_index = (i * 4) + (i - 1);
                    nextNumber = "".concat(nextNumber.slice(0, space_index), " ").concat(nextNumber.slice(space_index));
                }
            }
        }
        return nextNumber;
    }
    function handleExpiryChange(expiry) {
        var _a;
        var date = typeof expiry === 'number' ? expiry.toString() : expiry;
        var month = '';
        var year = '';
        if (date.includes('/')) {
            _a = date.split('/'), month = _a[0], year = _a[1];
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
        return "".concat(month, "/").concat(year);
    }
    return (_jsx(StyledCreditCard, __assign({ "$token": token }, { children: _jsxs("div", __assign({ className: [
                'card',
                "card--".concat(issuer),
                focused === 'cvc' && issuer !== 'amex' ? 'card--flipped' : '',
            ].join(' ').trim() }, { children: [_jsxs("div", __assign({ className: "card--front" }, { children: [_jsx("div", { className: "card__background" }), _jsx("div", { className: "issuer" }), _jsx("div", __assign({ className: [
                                'cvc__front',
                                focused === 'cvc' ? 'focused' : '',
                            ].join(' ').trim() }, { children: cvc || placeholders.cvc })), _jsx("div", __assign({ className: [
                                'number',
                                String(number).replace(/ /g, '').length > 16 ? 'number--large' : '',
                                focused === 'number' ? 'focused' : '',
                                String(number).substr(0, 1) !== '•' ? 'filled' : '',
                            ].join(' ').trim() }, { children: handleNumberChange(number) || placeholders.number })), _jsx("div", __assign({ className: [
                                'name',
                                focused === 'name' ? 'focused' : '',
                                name ? 'filled' : '',
                            ].join(' ').trim() }, { children: name || placeholders.name })), _jsxs("div", __assign({ className: [
                                'expiry',
                                focused === 'expiry' ? 'focused' : '',
                                String(expiry).substr(0, 1) !== '•' ? 'filled' : '',
                            ].join(' ').trim() }, { children: [_jsx("div", __assign({ className: "expiry__valid" }, { children: locale.valid })), _jsx("div", __assign({ className: "expiry__value" }, { children: handleExpiryChange(expiry) || placeholders.expiry }))] })), _jsx("div", { className: "chip" })] })), _jsxs("div", __assign({ className: "card--back" }, { children: [_jsx("div", { className: "card__background" }), _jsx("div", { className: "stripe" }), _jsx("div", { className: "signature" }), _jsx("div", __assign({ className: [
                                'cvc',
                                focused === 'cvc' ? 'focused' : '',
                            ].join(' ').trim() }, { children: cvc })), _jsx("div", { className: "issuer" })] }))] })) })));
};
export default CreditCard;
