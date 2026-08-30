describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Obrigado', 20)
    cy.clock() // Congela o relógio do navegador para controlar o tempo de exibição da mensagem de sucesso

    cy.get('#firstName')
      .type('Mauricio')
    cy.get('#lastName')
      .type('Teste')
    cy.get('#email')
      .type('emailteste@gmail.com')
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
    cy.contains('.button', 'Enviar')
      .click()
    
    cy.get('.success') 
      .should('be.visible','Mensagem enviada com sucesso.')

    cy.tick(3000) // Avança o relógio em 3 segundos

    cy.get('.success') 
      .should('not.be.visible','Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock() 

    cy.get('#firstName')
      .type('Mauricio')
    cy.get('#lastName')
      .type('Teste')
    cy.get('#email')
      .type('emailteste.com')
    cy.contains('.button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(3000)

    cy.get('.error')
      .should('not.be.visible')
  })

  it('validar se campo telefone fica em branco ao ser preenchido com conteúdo nao numérico', () => {
    cy.get('#firstName')
      .type('Mauricio')
    cy.get('#lastName')
      .type('Teste')
    cy.get('#email')
      .type('emailteste@gmail.com')
    cy.get('#phone')
      .type('abcde')

    cy.get('#phone')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    
    cy.get('#firstName')
      .type('Mauricio')
    cy.get('#lastName')
      .type('Teste')
    cy.get('#email')
      .type('emailteste@gmail.com')
    cy.get('#phone-checkbox')
      .check()
    cy.contains('.button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(3000)

    cy.get('.error')
      .should('not.be.visible') 
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Mauricio')
      .should('have.value', 'Mauricio')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Teste')
      .should('have.value', 'Teste')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('testeemail@gmail.com')
      .should('have.value', 'testeemail@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
   }) 

   it('validar se exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => {
    cy.clock()
    
    cy.contains('.button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(3000)

    cy.get('.error')
      .should('not.be.visible')
    }) 

    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.clock()
      
      cy.fillMandatoryFields()
      cy.sendScreeData()
      cy.checkSuccessMessage()

      cy.tick(3000) 

      cy.checkSuccessMessageNotVisible()
    })

    it('envia o formulário com sucesso usando um comando customizado com parâmetros', () => {
      cy.clock()
      
      cy.fillKeyFields('Mauricio', 'Teste', 'emailteste@gmail.com', '1234567890', 'Teste preenchimento')
      cy.sendScreeData()
      cy.checkSuccessMessage()

      cy.tick(3000) 

      cy.checkSuccessMessageNotVisible()
    })

    it('envia o formulário com sucesso usando um comando customizado passando um objeto como parâmetro', () => {
      const formData = {
        firstName: 'Mauricio',
        lastName: 'Teste',
        email: 'emailteste@gmail.com',
        phone: '1234567890',
        textArea: 'Teste preenchimento'
      }
      cy.clock()

      cy.fillKeyFieldsObject(formData)
      cy.sendScreeData()
      cy.checkSuccessMessage()

      cy.tick(3000) 

      cy.checkSuccessMessageNotVisible()  
    })

    it('selecionar um produto no select através do seu texto', () => {
      cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('selecionar um produto no select através do índice', () => {
      cy.get('#product').select(2).should('have.value', 'cursos')
    })

    it('selecionar um produto no select através do seu valor', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('marca o tipo de atendimento "Feedback"', () => {      
      cy.get('input[type="radio"]').check('feedback').should('be.checked', 'feedback')
    })
    
    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]').each(($el) => {
        cy.wrap($el).check().should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    }) 

    it('seleciona um arquivo da pasta fixtures', () => {      
      cy.get('#file-upload')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input) => {
// Executar o comando console.log() e rodar o cypress. Com o botao direito do mouse, clicar em inspecionar e ir na aba console para ver o resultado.
// e verificar o caminho que vai estar o nome do arquivo que foi selecionado.          
//          console.log($input) 
          expect($input[0].files[0].name).to.equal('example.json')
        })  
    })

    it('seleciona um arquivo simulando um drag and drop', () => {      
      cy.get('#file-upload')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(($input) => {
// Executar o comando console.log() e rodar o cypress. Com o botao direito do mouse, clicar em inspecionar e ir na aba console para ver o resultado.
// e verificar o caminho que vai estar o nome do arquivo que foi selecionado.          
//          console.log($input) 
          expect($input[0].files[0].name).to.equal('example.json')
        })  
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {      
      cy.fixture('example.json').as('myTestFile')
      cy.get('#file-upload')
        .selectFile('@myTestFile')
        .should(($input) => {
// Executar o comando console.log() e rodar o cypress. Com o botao direito do mouse, clicar em inspecionar e ir na aba console para ver o resultado.
// e verificar o caminho que vai estar o nome do arquivo que foi selecionado.          
//        console.log($input) 
          expect($input[0].files[0].name).to.equal('example.json')
        })  
    })

    it('verifica que a política de privacidade abre em outra aba se,a necessidade de um clique', () => {
// Em todos os navegadores é padrão utilizar o atributo target="_blank" para abrir o link em outra aba. Então, para verificar se o link abre em outra aba, basta verificar se o atributo target do link é igual a "_blank".
// Foi usado o contains pois o cy.get('a') é muito genérico       
      cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
// Deletando o atributo target="_blank" vai abrir o link na mesma aba
// Foi usado o contains pois o cy.get('a') é muito genérico     
      cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target')
        .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
      const longText = Cypress._.repeat('Obrigado', 20)  
// o invoke nesse caso poem o texto de uma vez só, sem precisar digitar letra por letra, como o .type.      
      cy.get('#open-text-area').invoke('val', longText).should('have.value', longText) 
    })

    it('utilizar request para fazer uma requisição HTTP', () => {
//      cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
//        .then((response) => {
//         expect(response.status).to.equal(200)
//          expect(response.statusText).to.equal('OK')
//         expect(response.body).to.include('CAC TAT')
//        })

      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('retornoRequisicao')
        .its('status')
        .should('equal', 200)
      cy.get('@retornoRequisicao')
        .its('statusText')
        .should('equal', 'OK')  
      cy.get('@retornoRequisicao')
        .its('body')
        .should('include', 'CAC TAT') 
    })

    it('encontrar gato invisível', () => {
      cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    })
})