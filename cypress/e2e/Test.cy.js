// Giải pháp sử dụng cypress-localstorage-commands plugin

describe('Test Navigation After Login', () => {
  before(() => {
    cy.visit('http://localhost:3000/user-login')
    cy.get('input[name="email"]').type('vonhatphuong.2k4@gmail.com')
    cy.get('input[name="password"]').type('13032004')
    cy.get('button[type="submit"]').click()

    // Đợi và verify login thành công
    cy.intercept('GET', 'https://vibely-study-social-web.onrender.com/users/check-auth').as('checkAuth')
    cy.wait('@checkAuth')

    // Lưu token và user data
    cy.window().then((window) => {
      const token = window.localStorage.getItem('authToken')
      const userData = window.localStorage.getItem('user-storage')
      cy.setLocalStorage('authToken', token)
      cy.setLocalStorage('user-storage', userData)
    })
  })

  beforeEach(() => {
    // Khôi phục localStorage mà không verify
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Should navigate to video-feed', () => {
    cy.visit('http://localhost:3000/video-feed')
    cy.url().should('include', '/video-feed')
    cy.url().should('not.include', '/user-login')
    cy.scrollTo('bottom')
  })

  it('Should navigate to document page', () => {
    // Intercept API calls khi vào trang document
    cy.intercept('GET', 'https://vibely-study-social-web.onrender.com/documents/**').as('getDocuments')
    cy.intercept('GET', 'https://vibely-study-social-web.onrender.com/users/check-auth').as('checkAuth')

    // Visit với timeout dài hơn
    cy.visit('http://localhost:3000/document', { timeout: 10000 })

    // Đợi API calls hoàn thành
    cy.wait('@checkAuth')
    cy.wait('@getDocuments')

    // Verify URL
    cy.url().should('include', '/document')
    cy.url().should('not.include', '/user-login', { timeout: 10000 })
  })

  it('Should navigate to calendar page', () => {
    cy.visit('http://localhost:3000/calendar')
    cy.url().should('include', '/calendar')
    cy.url().should('not.include', '/user-login')
  })

  // Chỉ verify token ở test cuối
  it('Should maintain authentication throughout all tests', () => {
    cy.window().then((window) => {
      expect(window.localStorage.getItem('authToken')).to.exist
      expect(window.localStorage.getItem('user-storage')).to.exist
    })
    cy.getCookie('session_id').should('exist')
  })
})
