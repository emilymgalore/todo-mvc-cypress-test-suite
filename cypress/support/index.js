import "@testing-library/cypress/add-commands"

Cypress.Commands.add("createTodo", (textOfTheTodo) => {
    cy.get(".new-todo")
        .type(`${textOfTheTodo}{enter}`)
})

Cypress.Commands.add("visitTodomvc", () => {
    cy.visit("https://todomvc.com/examples/react/#/")
})
