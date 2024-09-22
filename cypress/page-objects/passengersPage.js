const e = {
  peopleBtn: '[data-qa="people-button"]',
  baseModalPeople: '[data-qa="base-modal"]',
};

class passengersPage {
  //Validate Adult record
  validateAdultRecord(number, decreaseDisabled, increaseDisabled) {
    cy.get(e.baseModalPeople)
      .find('[class="field-people-row"]')
      .eq(0)
      .then((row) => {
        cy.wrap(row).find('[class="field-people-row-title"]').should("have.text", "Adults");
        cy.wrap(row)
          .find('[class="field-people-row-subtext"]')
          .should("have.text", "12 Years and Above");
        decreaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-decrease disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-decrease"]').should("be.visible");
        cy.wrap(row).find('[data-qa="counter-value"]').should("have.text", number);
        increaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-increase disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-increase"]').should("be.visible");
      });
  }

  //Validate Children record
  validateChildrenRecord(number, decreaseDisabled, increaseDisabled) {
    cy.get(e.baseModalPeople)
      .find('[class="field-people-row"]')
      .eq(1)
      .then((row) => {
        cy.wrap(row).find('[class="field-people-row-title"]').should("have.text", "Children");
        cy.wrap(row)
          .find('[class="field-people-row-subtext"]')
          .should("have.text", "2 to 11 Years");
        //Validate decrise button
        decreaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-decrease disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-decrease"]').should("be.visible");
        cy.wrap(row).find('[data-qa="counter-value"]').should("have.text", number);
        //Validate increase button
        increaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-increase disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-increase"]').should("be.visible");
      });
  }

  //Validate Infants record
  validateInfantsRecord(number, decreaseDisabled, increaseDisabled) {
    cy.get(e.baseModalPeople)
      .find('[class="field-people-row"]')
      .eq(2)
      .then((row) => {
        cy.wrap(row).find('[class="field-people-row-title"]').should("have.text", "Infants");
        cy.wrap(row)
          .find('[class="field-people-row-subtext"]')
          .should("have.text", "Below 2 Years");
        decreaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-decrease disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-decrease"]').should("be.visible");
        cy.wrap(row).find('[data-qa="counter-value"]').should("have.text", number);
        increaseDisabled
          ? cy
              .wrap(row)
              .find('[class="field-people-counter-increase disabled"]')
              .should("be.visible")
          : cy.wrap(row).find('[class="field-people-counter-increase"]').should("be.visible");
      });
  }

  openPassengerForm() {
    cy.get(e.peopleBtn).click();
  }

  submitPassangersForm() {
    cy.get(e.baseModalPeople).find('[type="submit"]').click();
  }

  validatePassengerQuantity(Number) {
    cy.get(e.peopleBtn)
      .find('[class="field-people-title-wrapper"]')
      .should("contain.text", `${Number} Passenger`);
  }

  increasePassenger(row, number) {
    for (let i = 1; i <= number; i++) {
      cy.get(e.baseModalPeople)
        .find('[class="field-people-row"]')
        .eq(row)
        .find('[data-qa="increase-button"]')
        .click();
    }
  }

  //Decrease Passenger row by Number
  decreasePassenger(row, number) {
    for (let i = 1; i <= number; i++) {
      cy.get(e.baseModalPeople)
        .find('[class="field-people-row"]')
        .eq(row)
        .find('[data-qa="decrease-button"]')
        .click();
    }
  }

  increaseAdultNumber(number) {
    this.increasePassenger(0, number);
  }

  decreaseAdultNumber(number) {
    this.decreasePassenger(0, number);
  }

  increaseChildrenNumber(number) {
    this.increasePassenger(1, number);
  }

  decreaseChildrenNumber(number) {
    this.decreasePassenger(1, number);
  }

  increaseInfantsNumber(number) {
    this.increasePassenger(2, number);
  }

  decreaseInfantsNumber(number) {
    this.decreasePassenger(2, number);
  }
}

module.exports = new passengersPage();
