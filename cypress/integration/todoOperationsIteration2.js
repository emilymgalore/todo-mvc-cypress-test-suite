before(
    "will visit todomvc.com",
    () => {
        cy.visitTodomvc()
    }
)

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

                // Arrange
                cy.get(".todo-list li")
                    .should("have.length", TODO_INDEX_ZERO)

                // Act
                cy.createTodo("Go for a walk")
                cy.createTodo("Do laundry")
                cy.createTodo("Wash the dog")
                // Assertion that the text of each todo is correct

                // Assertion that there are 3
                cy.get(".todo-list li").as("todos")
                    .should("have.length", TODO_INDEX_THREE)

                // Text of each todo is correct
                cy.get("@todos")
                    .eq(TODO_INDEX_ZERO)
                    .should("contain", "Go for a walk")
                cy.get("@todos")
                    .eq(TODO_INDEX_ONE)
                    .should("contain", "Do laundry")
                cy.get("@todos")
                    .eq(TODO_INDEX_TWO)
                    .should("contain", "Wash the dog")
            }
        )

        it("will validate can mark a todo as done", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_ONE = 1

            cy.get(".view .toggle").as("checkbox")
                .eq(TODO_INDEX_ZERO)
                .should("not.be.checked")
            cy.get("@checkbox")
                .eq(TODO_INDEX_ONE)
                .should("not.be.checked")

            // Marks as done
            cy.get("@checkbox")
                .eq(TODO_INDEX_ZERO)
                .click()
            cy.get("@checkbox")
                .eq(TODO_INDEX_ONE)
                .click()

            // Assertion that the 1st and 2nd were marked as done, and the rest were not
            cy.get("@checkbox")
                .eq(TODO_INDEX_ZERO)
                .should("be.checked")
            cy.get("@checkbox")
                .eq(TODO_INDEX_ONE)
                .should("be.checked")
        })

        it("will validate can delete todo", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_ONE = 1
            const TODO_INDEX_TWO = 2
            const TODO_INDEX_THREE = 3

            // Assert there are 3 todos before deleting one
            cy.get(".todo-list li")
                .should("have.length", TODO_INDEX_THREE)

            // Delete
            cy.get(".todo-list .destroy")
                .last()
                .invoke("show")
                .click()

            // Assertions that last todo is deleted
            cy.get(".todo-list li")
                .should("have.length", TODO_INDEX_TWO)

            cy.get(".todo-list .edit")
                .eq(TODO_INDEX_ZERO)
                .should("have.value", "Go for a walk")

            cy.get(".todo-list .edit")
                .eq(TODO_INDEX_ONE)
                .should("have.value", "Do laundry")
        })

        it("will validate can edit todo", () => {
            const TODO_INDEX_ZERO = 0

            // Edit
            cy.get(".todo-list li")
                .should("contain", "Go for a walk")

            cy.get(".todo-list li")
                .as("todos")

            cy.get("@todos")
                .eq(TODO_INDEX_ZERO)
                .as("firstTodo")
                .find("label")
                .dblclick()

            // Clear out the inputs current value and type a new value2
            cy.get("@firstTodo")
                .find(".edit")
                .clear()
                .type("Walk the dog")
                .type("{enter}")

            cy.get("@firstTodo")
                .should("contain", "Walk the dog")
        })

        it("will validate can mark all checkboxes as done", () => {
            // Mark all checkboxes at once
            cy.get(".toggle-all")
                .check()
        })
    }
)
