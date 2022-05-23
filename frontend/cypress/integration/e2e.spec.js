describe('Bio spa test', () => {
    it('As a User, when I am on Procedure page, choose from a list of targets with dropdown and get matching procedures', () => {
      cy.visit('http://localhost:3000')
  
      cy.get('[data-top="561.984375"]').click().type('Verevarustuse parandamine{downArrow}{enter}{esc}')

      cy.get('.css-8atqhb > [type="button"]').click()

      cy.get('#enhanced-table-checkbox-0').should('have.text', 'Meemassaaž')
    })

    it('As a User, when I am on Procedure page, choose from a list of symptoms with dropdown and get matching procedures', () => {
      cy.visit('http://localhost:3000')
  
      cy.get(':nth-child(2) > .MuiGrid-container > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiOutlinedInput-root > #valueId').click().type('Lihaspinge{downArrow}{enter}{esc}')

      cy.get('.css-8atqhb > [type="button"]').click()

      cy.get('#enhanced-table-checkbox-0').should('have.text', 'Meemassaaž')
    })

    it('As a User, when I am on Procedure page, choose from a list of diseases with dropdown and get matching procedures', () => {
      cy.visit('http://localhost:3000')
  
      cy.get('[style="width: 100%; display: flex; margin-top: 4rem;"] > :nth-child(1) > .MuiGrid-container > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiOutlinedInput-root > #valueId').click().type('Meeallergia{downArrow}{enter}{esc}')

      cy.get('.css-8atqhb > [type="button"]').click()

      cy.get('#enhanced-table-checkbox-0').should('have.text', 'Klassikaline massaaž')
    })

    it('As a User, when I am on Procedure page, choose from a list of diseases with dropdown and get matching procedures', () => {
      cy.visit('http://localhost:3000')
      
      cy.get('.MuiSlider-rail').click()

      cy.get('.css-8atqhb > [type="button"]').click()
      
      cy.get('#enhanced-table-checkbox-0').should('have.text', 'Klassikaline massaaž')

    }) 
  })