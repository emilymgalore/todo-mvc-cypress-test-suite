before(
    "will visit todomvc.com",
    () => {
        cy.visitTodomvc()
    }
)

const TODOS_ALIAS = "@todos"
const TODOS_SELECTOR = ".todo-list li"

describe(
    "will validate Todos can add, clear field, delete, and mark as done",
    // eslint-disable-next-line max-lines-per-function
    () => {
        it(
            "will validate can add Todos and clears field",
            () => {
                const TODO_INDEX_ZERO = 0
                const TODO_INDEX_ONE = 1
                const TODO_INDEX_TWO = 2
                const TODO_INDEX_THREE = 3
                const TODO_INDEX_FOUR = 4

                // Act
                cy.createTodo("Go for a walk")
                cy.createTodo("Do the laundry")
                cy.createTodo("Feed the cat")
                cy.createTodo("Prepare dinner")

                // Text of each todo is correct
                cy.get(TODOS_SELECTOR).as("todos")
                    .eq(TODO_INDEX_ZERO)
                    .should("contain", "Go for a walk")
                cy.get(TODOS_ALIAS)
                    .eq(TODO_INDEX_ONE)
                    .should("contain", "Do the laundry")
                cy.get(TODOS_ALIAS)
                    .eq(TODO_INDEX_TWO)
                    .should("contain", "Feed the cat")
                cy.get(TODOS_ALIAS)
                    .eq(TODO_INDEX_THREE)
                    .should("contain", "Prepare dinner")

                // Assertion that there are 4
                cy.get(TODOS_ALIAS)
                    .should("have.length", TODO_INDEX_FOUR)

                // Assertion that the input field got cleared after adding the todos
                cy.get(".new-todo")
                    .should("have.value", "")
            }
        )

        it("will validate can mark a todo as done", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_TWO = 2

            // Marks as done
            cy.get(".view .toggle").as("toggles")
                .eq(TODO_INDEX_ZERO)
                .click()
            cy.get("@toggles")
                .eq(TODO_INDEX_TWO)
                .click()

            // Assertion that the 1st and 3rd were marked as done, and the rest were not
            cy.get(".todo-list li .toggle").as("checkbox")
                .eq(TODO_INDEX_ZERO)
                .should("be.checked")
            cy.get("@checkbox")
                .eq(TODO_INDEX_TWO)
                .should("be.checked")
        })

        it("will validate can delete todo", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_ONE = 1
            const TODO_INDEX_TWO = 2
            const TODO_INDEX_FOUR = 4

            // Assert there are 4 todos before deleting one
            cy.get(TODOS_SELECTOR)
                .should("have.length", TODO_INDEX_FOUR)

            // Delete
            cy.get(".todo-list .destroy")
                .last()
                .invoke("show")
                .click()

            // Assertion that last todo is deleted
            cy.get(".todo-list li .edit")
                .as("edits")
                .eq(TODO_INDEX_ZERO)
                .should("have.value", "Go for a walk")
            cy.get("@edits")
                .eq(TODO_INDEX_ONE)
                .should("have.value", "Do the laundry")
            cy.get("@edits")
                .eq(TODO_INDEX_TWO)
                .should("have.value", "Feed the cat")
        })

        it("will validate can edit todo", () => {
            const TODO_INDEX_ZERO = 0

            // Edit
            cy.get(TODOS_SELECTOR)
                .as("todos")
                .eq(TODO_INDEX_ZERO)
                .as("firstTodo")
                .should("contain", "Go for a walk")

            cy.get("@firstTodo")
                .find("label")
                .dblclick()

            // Clear out the inputs current value
            // And type a new value
            cy.get("@firstTodo")
                .find(".edit")
                .clear()
                .type("Walk the dog")
                .type("{enter}")

            cy.get("@firstTodo")
                .should("have.text", "Walk the dog")
        })

        it(
            "will validate can mark all checkboxes as done when some are checked",
            () => {
                const TODO_INDEX_ZERO = 0
                const TODO_INDEX_ONE = 1
                const TODO_INDEX_TWO = 2
                const TODO_INDEX_THREE = 3

                cy.get(".todo-list li [type=\"checkbox\"]").as("todos")
                    .eq(TODO_INDEX_ZERO)
                    .should("be.checked")
                cy.get(TODOS_ALIAS)
                    .eq(TODO_INDEX_ONE)
                    .should("not.be.checked")
                cy.get(TODOS_ALIAS)
                    .eq(TODO_INDEX_TWO)
                    .should("be.checked")

                // Mark all checkboxes at once
                cy.get(".toggle-all")
                    .check({"force": true})

                // Validates each checkbox is checked
                cy.get(".todo-list li [type=\"checkbox\"]")
                    .should("have.length", TODO_INDEX_THREE)
                    .each((checkedBox) => {
                        cy.wrap(checkedBox)
                            .should("be.checked")
                    })
            }
        )

        it("will validate all checkboxes are unchecked at once", () => {
            const TODO_INDEX_THREE = 3

            // Validates each checkbox is checked
            cy.get(".todo-list li [type=\"checkbox\"]")
                .should("have.length", TODO_INDEX_THREE)
                .each((checkedBox) => {
                    cy.wrap(checkedBox)
                        .should("be.checked")
                })

            // Uncheck all checkboxes at once
            cy.get(".toggle-all")
                .uncheck({"force": true})

            // Validates each checkbox is unchecked
            cy.get(".todo-list li [type=\"checkbox\"]")
                .should("have.length", TODO_INDEX_THREE)
                .each((checkedBox) => {
                    cy.wrap(checkedBox)
                        .should("not.be.checked")
                })
        })

        it("will validate all unchecked checkboxes are checked at once", () => {
            const TODO_INDEX_THREE = 3

            // Validates each checkbox is unchecked
            cy.get(".todo-list li [type=\"checkbox\"]")
                .should("have.length", TODO_INDEX_THREE)
                .each((checkedBox) => {
                    cy.wrap(checkedBox)
                        .should("not.be.checked")
                })

            // Uncheck all checkboxes at once
            cy.get(".toggle-all")
                .check({"force": true})

            // Validates each checkbox is checked
            cy.get(".todo-list li [type=\"checkbox\"]")
                .should("have.length", TODO_INDEX_THREE)
                .each((checkedBox) => {
                    cy.wrap(checkedBox)
                        .should("be.checked")
                })
        })
    }
)
