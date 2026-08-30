// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

    Cypress.Commands.add('fillMandatoryFields', () => {
        cy.get('#firstName').type('Mauricio')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('emailteste@gmail.com')
        cy.get('#open-text-area').type('Teste preenchimento')
    })

    Cypress.Commands.add('sendScreeData', () => {
        cy.contains('.button', 'Enviar').click()
    })

    Cypress.Commands.add('checkSuccessMessage', () => {
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    Cypress.Commands.add('checkSuccessMessageNotVisible', () => {
        cy.get('.success').should('not.be.visible', 'Mensagem enviada com sucesso.')
    })

    Cypress.Commands.add('fillKeyFields', (firstName, lastName, email, phone, textArea) => {                                   
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#phone').type(phone)
        cy.get('#open-text-area').type(textArea)
    })

       Cypress.Commands.add('fillKeyFieldsObject', (formData) => {                                   
        cy.get('#firstName').type(formData.firstName)
        cy.get('#lastName').type(formData.lastName)
        cy.get('#email').type(formData.email)
        cy.get('#phone').type(formData.phone)
        cy.get('#open-text-area').type(formData.textArea)
    })