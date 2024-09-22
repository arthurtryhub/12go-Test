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
  findBtn: '[data-qa="search-form-submit-button"]',
};

class seachPanel {
  //check search panel exist
  checkSearchPanelExist() {
    cy.get(e.searchForm).should("be.visible");
    cy.get(e.swapBtn).should("be.visible");
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
    cy.get(".loader").should("not.exist");
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

  pressFindTicketsBtn() {
    cy.intercept("/g/*").as("getAnalytic");
    cy.get(e.findBtn).click();
    cy.get(".loader").should("not.exist");
    cy.wait("@getAnalytic");
  }
}

module.exports = new seachPanel();
