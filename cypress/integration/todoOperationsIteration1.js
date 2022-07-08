before(
    "will visit todomvc.com",
    () => {
        cy.visitTodomvc()
    }
)

const NEW_TODO_SELECTOR = ".new-todo"
const GET_THE_SUGAR = "Get the sugar"
const GO_FOR_A_WALK = "Go for a walk"
const MAKE_AN_APPOINTMENT = "Make an appointment"
const TAKE_A_NAP = "Take a nap"
const BUY_SOME_EGGS = "Buy some eggs"
const TODO_INPUT_FIELDS_SELECTOR = ".todo-list li .edit"
const TODO_LIST_SELECTOR = ".todo-list li"
const TOGGLE_DONE_CHECKBOXES_SELECTOR = ".view .toggle"
const IS_DONE_CHECKBOX_SELECTOR = ".todo-list .toggle"
const DELETE_ICON_SELECTOR = ".todo-list .destroy"
const EDIT_INPUT_FIELD_SELECTOR = ".edit"

describe(
    "will validate Todos can add, clear field, delete, and mark as done",
    // eslint-disable-next-line max-lines-per-function
    () => {
        it(
            "will validate can add Todos and clears field",
            () => {
                // Adds 4 todos
                cy.get(NEW_TODO_SELECTOR)
                    .type(`${GET_THE_SUGAR}{enter}`)
                    .trigger("input")
                cy.get(NEW_TODO_SELECTOR)
                    .type(`${GO_FOR_A_WALK}{enter}`)
                    .trigger("input")
                cy.get(NEW_TODO_SELECTOR)
                    .type(`${MAKE_AN_APPOINTMENT}{enter}`)
                    .trigger("input")
                cy.get(NEW_TODO_SELECTOR)
                    .type(`${TAKE_A_NAP}{enter}`)
                    .trigger("input")

                const TODO_INDEX_ZERO = 0
                const TODO_INDEX_ONE = 1
                const TODO_INDEX_TWO = 2
                const TODO_INDEX_THREE = 3
                const TODO_INDEX_FOUR = 4

                // Assertion that the text of each todo is correct
                cy.get(TODO_INPUT_FIELDS_SELECTOR)
                    .eq(TODO_INDEX_ZERO)
                    .should("have.value", GET_THE_SUGAR)
                cy.get(TODO_INPUT_FIELDS_SELECTOR)
                    .eq(TODO_INDEX_ONE)
                    .should("have.value", GO_FOR_A_WALK)
                cy.get(TODO_INPUT_FIELDS_SELECTOR)
                    .eq(TODO_INDEX_TWO)
                    .should("have.value", MAKE_AN_APPOINTMENT)
                cy.get(TODO_INPUT_FIELDS_SELECTOR)
                    .eq(TODO_INDEX_THREE)
                    .should("have.value", TAKE_A_NAP)

                // Assertion that there are 4
                cy.get(TODO_LIST_SELECTOR)
                    .should("have.length", TODO_INDEX_FOUR)
                // Assertion that the input field got cleared after adding the todos
                cy.get(NEW_TODO_SELECTOR)
                    .should("have.value", "")
            }
        )

        it("will validate can mark a todo as done", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_TWO = 2

            // Marks as done
            cy.get(TOGGLE_DONE_CHECKBOXES_SELECTOR)
                .first()
                .click()
            cy.get(TOGGLE_DONE_CHECKBOXES_SELECTOR)
                .eq(TODO_INDEX_TWO)
                .click()

            // Assertion that the 1st and 3rd were marked as done, and the rest were not
            cy.get(IS_DONE_CHECKBOX_SELECTOR)
                .eq(TODO_INDEX_ZERO)
                .should("be.checked")
            cy.get(IS_DONE_CHECKBOX_SELECTOR)
                .eq(TODO_INDEX_TWO)
                .should("be.checked")
        })

        it("will validate can delete todo", () => {
            const TODO_INDEX_ZERO = 0
            const TODO_INDEX_ONE = 1
            const TODO_INDEX_TWO = 2
            const TODO_INDEX_THREE = 3
            const TODO_INDEX_FOUR = 4

            // Assert there are 4 todos before deleting one
            cy.get(TODO_LIST_SELECTOR)
                .should("have.length", TODO_INDEX_FOUR)

            // Delete
            cy.get(DELETE_ICON_SELECTOR)
                .last()
                .invoke("show")
                .click()

            // Assertion that last todo is deleted
            cy.get(TODO_INPUT_FIELDS_SELECTOR).eq(TODO_INDEX_ZERO)
                .should("have.value", GET_THE_SUGAR)
            cy.get(TODO_INPUT_FIELDS_SELECTOR).eq(TODO_INDEX_ONE)
                .should("have.value", GO_FOR_A_WALK)
            cy.get(TODO_INPUT_FIELDS_SELECTOR).eq(TODO_INDEX_TWO)
                .should("have.value", MAKE_AN_APPOINTMENT)
            cy.get(TODO_LIST_SELECTOR)
                .should("have.length", TODO_INDEX_THREE)
        })

        it("will validate can edit todo", () => {
            const TODO_INDEX_ONE = 1

            // Edit
            cy.get(TODO_LIST_SELECTOR)
                .eq(TODO_INDEX_ONE)
                .should("contain", GO_FOR_A_WALK)
            cy.get(TODO_LIST_SELECTOR)
                .as("todos")

            cy.get("@todos")
                .eq(TODO_INDEX_ONE)
                .as("secondTodo")
                .find("label")
                .dblclick()

            // Clear out the inputs current value, and types a new value
            cy.get("@secondTodo")
                .find(EDIT_INPUT_FIELD_SELECTOR)
                .clear()
                .type(BUY_SOME_EGGS)
                .type("{enter}")
            cy.get(TODO_LIST_SELECTOR)
                .eq(TODO_INDEX_ONE)
                .should("contain", BUY_SOME_EGGS)
        })
    }
)
