const e = {
  cardNumberInput: '[name="number"]',
  cardName: '[autocomplete="cc-name"]',
  exDate: '[autocomplete="cc-exp"]',
  cvvInp: '[autocomplete = "cc-csc"]',
};

class paymentPage {
  setCardNumber(cardNumber) {
    cy.get(e.cardNumberInput).type(cardNumber);
  }

  validateCardNumber(cardNumber) {
    cy.get(e.cardNumberInput).should("include.text", cardNumber);
  }

  setNameOnCard(name) {
    cy.get(e.cardName).type(name);
  }

  setExpireDate(expDate) {
    cy.get(e.exDate).shadow().type(expDate, { force: true });
  }

  setCVV(cvv) {
    cy.get(e.cvvInp).type(cvv);
  }
}

module.exports = new paymentPage();
