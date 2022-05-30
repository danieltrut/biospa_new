 describe('Visuaal test for Bio Spa', () => {
    it('Test visual for button Otsi', () => {

        cy.visit('http://localhost:3000')
        
        cy.get('[style="width: 100%; display: flex; margin-top: 4rem;"] > :nth-child(1) > .MuiGrid-container > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiOutlinedInput-root > #valueId').click().type('Meeallergia{downArrow}{enter}{esc}')

        cy.get('.MuiButton-root').click()
  
        cy.get(':nth-child(3) > .MuiGrid-container > .MuiGrid-root').matchImageSnapshot("otsi")
      })
}) 
