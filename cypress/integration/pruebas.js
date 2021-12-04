/// <reference types="cypress"/>

const URL = "http://127.0.0.1:8080/index.html";

context('Casa de cambio', () => {
    before(() => {
        cy.visit(URL);
    })

    it('Accede a URL', () => {})

});