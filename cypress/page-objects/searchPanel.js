const e = {
  searchForm: '[data-qa="search-form"]',
  searchField: '[class="vue-search-form-group-field"]',

  selectBtn: '[data-qa="select-button"]',
  baseModal: '[data-qa="select-base-modal"]',
  rowInBaseModal: '[class*="options-list-item"]',
  valueInSelectBtn: '[class="field-select-btn"]',
  swapBtn: '[data-id="search-form-swap"]',

  pickDataStart: '[data-qa="datepicker-button"]',
  pickDateRange: '[data-qa="datepicker-button-range"]',

  peopleBtn: '[data-qa="people-button"]',
  baseModalPeople: '[data-qa="base-modal"]',
  findBtn: '[data-qa="search-form-submit-button"]',
};

class seachPanel {
  //check search panel exist
  checkSearchPanelExist() {
    cy.get(e.searchForm).should("be.visible");
    cy.get(e.selectBtn).eq(0).should("be.visible");
    cy.get(e.selectBtn).eq(1).should("be.visible");
    cy.get(e.pickDataStart).should("be.visible");
    cy.get(e.pickDateRange).should("be.visible");
    cy.get(e.peopleBtn).should("be.visible");
    cy.get(e.findBtn).should("be.visible");
  }

  //Select departure, destination and validate values

  openDepartureRecord() {
    cy.get(e.selectBtn).eq(0).click();
  }

  openDestinationRecord() {
    cy.get(e.selectBtn).eq(1).click();
  }

  validateHintAndTypeSearch(hint, search) {
    cy.get(e.searchField)
      .find(e.baseModal)
      .find('[data-qa="select-input-inner"]')
      .should("have.attr", "placeholder", hint);
    cy.get(e.searchField).find(e.baseModal).find('[data-qa="select-input-inner"]').type(search);
    cy.get('[data-icon="spinner"]').should("not.exist");
  }

  validateSearchByName(search) {
    cy.get('[data-icon="spinner"]').should("not.exist");
    cy.get(".vue-modal-content-body")
      .find("li")
      .each((row) => {
        cy.wrap(row).should("contain.text", search);
      });
  }

  selectAndValidateFirstValueFromTheList(name) {
    cy.get('[data-icon="spinner"]').should("not.exist");
    cy.get(".vue-modal-content-body").find("li").eq(0).should("contain.text", name);
    cy.get(".vue-modal-content-body").find("li").eq(0).click();
  }

  selectDirection(departure, destination) {
    cy.get(e.selectBtn).eq(0).click();
    cy.get(e.searchField).eq(0).find(e.baseModal).should("be.visible");
    cy.contains(e.rowInBaseModal, departure).click();
    cy.get(e.searchField).eq(1).find(e.baseModal).should("be.visible");
    cy.contains(e.rowInBaseModal, destination).click();
    this.validateDirection(departure, destination);
  }

  validateDirection(departure, destination) {
    cy.get(e.valueInSelectBtn).eq(0).should("contain.text", departure);
    cy.get(e.valueInSelectBtn).eq(1).should("contain.text", destination);
  }

  //Validate values swap and validate it again
  validateAndSwapDirections(departure, destination) {
    cy.get(e.valueInSelectBtn).eq(0).should("have.text", departure);
    cy.get(e.valueInSelectBtn).eq(1).should("have.text", destination);
    cy.get(e.swapBtn).click(), cy.get(e.valueInSelectBtn).eq(1).should("have.text", departure);
    cy.get(e.valueInSelectBtn).eq(0).should("have.text", destination);
  }

  selectDirectionByTyping(departure, destination) {
    cy.get(e.selectBtn).eq(0).click();
    cy.get(e.searchField).eq(0).find(e.baseModal).should("be.visible");
    cy.get(e.searchField).eq(0).find(e.baseModal).find('[data-qa="select-input-inner"]');
    cy.contains(e.rowInBaseModal, departure).click();
    cy.get(e.searchField).eq(1).find(e.baseModal).should("be.visible");
    cy.contains(e.rowInBaseModal, destination).click();
    cy.get(e.valueInSelectBtn).eq(0).should("have.text", departure);
    cy.get(e.valueInSelectBtn).eq(1).should("have.text", destination);
  }

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

module.exports = new seachPanel();
