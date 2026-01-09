const maskedAccountNumber = (accountNumber = "") => {
  if (!accountNumber) return "";

  const str = String(accountNumber);

  if (str.length <= 4) return str;

  return "*".repeat(str.length - 4) + str.slice(-4);
};

export default maskedAccountNumber;