describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3007')
  })

  it('should load the home page', () => {
    cy.get('h1').should('exist')
  })

  it('should navigate to different sections', () => {
    cy.get('nav').should('exist')
  })

  it('should show main content sections', () => {
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
  })

  // Add test for the ConsultAI specific features
  it('should show consultation features', () => {
    cy.get('[data-testid="consultation-features"]').should('exist')
  })

  it('should show AI chatbot interface', () => {
    cy.get('[data-testid="ai-chatbot"]').should('exist')
  })
})
