const fake = {
    account: 'abc@gmail.com',
    password: 'abc123456',
};

describe('/signin', () => {

    beforeEach(() => cy.visit('/signin'));

    context('HTML form submission', () => {

        it('display form, title, buttons and forgot password link', () => {

            cy.title().should('contain', '登入');
            cy.get('.formWrap')
                .should('exist')
                .and('contain', '帳號登入');

            cy.get('.form-row-btns button')
                .should('have.length', 4)
                .each(($btn) => {

                    cy.get($btn).should('contain', $btn.text());

                })
                .parent()
                .find('a')
                .contains('忘記密碼')
                .should('have.attr', 'href', '/forgot_password');

        });

        it('require account (email)', () => {

            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', '此欄位為必填');

        });

        it('require password', () => {

            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', '此欄位為必填');

        });

        it('require valid account and password', () => {

            cy.get('.formWrap button[type="submit"]').should('have.attr', 'disabled');
            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap [name="password"]').type('12345');

            // "點我驗證" 按鈕
            cy.get('.formWrap [type="button"]')
                .contains('點我驗證')
                .click()
                .should('have.attr', 'disabled');

            cy.get('.formWrap button[type="submit"]').should(($btn) => {

                expect($btn).not.to.have.attr('disabled');

            }).click();

            cy.get('.formWrap .error-mesg').should('contain', '至少 8 碼');
            cy.get('.formWrap [name="password"]').type('12345678');
            cy.get('.formWrap .error-mesg').should('not.exist');
            cy.get('.formWrap button[type="submit"]').click();

            // alert 錯誤
            cy.on('window:alert', (mesg) => {

                expect(mesg).to.deep.equal(['detail: 用户名或者密码错误。']);

            });

        });

        it('successful signin', () => {

            cy.intercept('**/api/login').as('signin');
            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap [name="password"]').type(fake.password);

            // "點我驗證" 按鈕
            cy.get('.formWrap [type="button"]')
                .contains('點我驗證')
                .click();

            cy.get('.formWrap button[type="submit"]').click();

            // localhost 環境才需要手動加 token
            cy.wait('@signin').then((xhr) => {

                cy.setCookie('token', xhr.response.body.data.token);
                cy.visit('/');

            });

            cy.getCookie('token').should('exist');
            cy.get('header [type="button"]').should('contain', '我的帳號');

        });

    });

    context('Reusable "signin" custom command', () => {

        Cypress.Commands.add('mkwsignin', (
            account = 'abc@gmail.com',
            password = 'abc123456'
        ) => {

            // localhost 環境才需要手動加 token
            cy.intercept('**/api/login').as('signin');
            cy.get('.formWrap [name="email"]').type(account);
            cy.get('.formWrap [name="password"]').type(password);

            // "點我驗證" 按鈕
            cy.get('.formWrap [type="button"]')
                .contains('點我驗證')
                .click();

            cy.get('.formWrap button[type="submit"]').click();
            cy.wait('@signin').then((xhr) => {

                cy.setCookie('token', xhr.response.body.data.token);

            });

        });

        beforeEach(() => cy.mkwsignin());

        it('can visit home page', () => {

            cy.visit('/');
            cy.get('header [type="button"]').should('contain', '我的帳號');

        });

        it('can simply request other authenticated pages', () => {

            cy.visit('/');
            cy.get('header [type="button"]').click();
            cy.get('header [type="button"]')
                .next()
                .should('exist')
                .find('.menu-item')
                .contains('會員中心')
                .should('have.attr', 'href', '/member/account')
                .click();

            cy.location('pathname').should('eq', '/member/account');

        });

    });

});
