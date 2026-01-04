export function maskedAccountNumber(accountNumber) {
    if(accountNumber.length > 4) {
        const last4Digits = accountNumber.slice(-4);
        const maskedDigits = '*'.repeat(accountNumber.length - 4) + last4Digits;
        return maskedDigits;
    }
    else {
        return accountNumber;
    }
}

export default maskedAccountNumber;