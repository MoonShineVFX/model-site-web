let langs;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNzUzMTg2LCJpYXQiOjE2NTM3NDk1ODYsImp0aSI6IjllOWEwZDMyZDQ3YjRmMDViYzA0MDVjMWNkYTQzZWM0IiwidXNlcl9pZCI6Miwic2NvcGUiOiJjdXN0b21lciJ9.-xlMsRJO9UcfGuMsrEr2jM7tzxkHvi3mIdJk0bFAidE';
const fake = {
    account: 'abc@gmail.com',
    password: 'abc123456',
};

describe('/signin', () => {

    beforeEach(() => {

        cy.visit('/signin');
        cy.deftag().then((resData) => langs = resData);

    });

    context('HTML form submission', () => {

        let obj = {};

        it('display form, title, buttons and forgot password link', () => {

            cy.get('.formWrap')
                .should('exist')
                .and('contain', langs.text_signin_title);

            cy.get('.form-row-btns button')
                .should('have.length', 4)
                .each(($btn, idx) => {

                    obj[idx] = $btn.text();
                    cy.get($btn).should('have.text', obj[idx]);

                });

            cy.get('.form-row-btns a')
                .contains(langs.text_forgot_password)
                .should('have.attr', 'href', '/forgot_password');

        });

        it('require account (email)', () => {

            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', langs.error_required);

        });

        it('require password', () => {

            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap form').submit();
            cy.get('.formWrap .error-mesg').should('contain', langs.error_required);

        });

        it('require valid account and password', () => {

            cy.get('.formWrap button[type="submit"]').should('have.attr', 'disabled');
            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap [name="password"]').type('12345');

            // "點我驗證" 按鈕
            cy.get('.formWrap [type="button"]')
                .contains(langs.btn_verify)
                .click()
                .should('have.attr', 'disabled');

            cy.get('.formWrap button[type="submit"]').should(($btn) => {

                expect($btn).not.to.have.attr('disabled');

            }).click();

            cy.get('.formWrap .error-mesg').should('contain', langs.error_password_at_least_eight);
            cy.get('.formWrap [name="password"]').type('12345678');
            cy.get('.formWrap .error-mesg').should('not.exist');
            cy.get('.formWrap button[type="submit"]').click();

            // alert 錯誤
            cy.on('window:alert', (mesg) => {

                expect(mesg).to.deep.equal(['detail: 用户名或者密码错误。']);

            });

        });

        it('successful signin', () => {

            cy.get('.formWrap [name="email"]').type(fake.account);
            cy.get('.formWrap [name="password"]').type(fake.password);

            // "點我驗證" 按鈕
            cy.get('.formWrap [type="button"]')
                .contains(langs.btn_verify)
                .click();

            cy.get('.formWrap button[type="submit"]').click();
            cy.location()
                .then((loc) => {

                    if (loc.origin === 'http://localhost:1006') cy.setCookie('token', token);

                });

            cy.getCookie('token').should('exist');
            cy.location('origin').should('eq', location.origin);

        });

    });

    // context('Reusable "signin" custom command', () => {

    //     Cypress.Commands.add('mkwsignin', (
    //         account = 'abc@gmail.com',
    //         password = 'abc123456'
    //     ) => {

    //         cy.get('.formWrap [name="email"]').type(account);
    //         cy.get('.formWrap [name="password"]').type(password);

    //         // "點我驗證" 按鈕
    //         cy.get('.formWrap [type="button"]')
    //             .contains(langs.btn_verify)
    //             .click();

    //         cy.get('.formWrap button[type="submit"]').click();

    //     });

    //     beforeEach(() => cy.mkwsignin());

    //     it('can visit /index', () => {

    //         cy.visit('/index');
    //         cy.get('main').should('have.class', 'main');

    //     });

    //     it('can simply request other authenticated pages', () => {

    //         cy.request({
    //             method: 'POST',
    //             url: '/api/web_departments_roles_skills',
    //         })
    //         .its('body')
    //         .should('have.property', 'data')
    //         .then((resData) => {

    //             expect(resData).to.have.property('departments');
    //             expect(resData.departments).to.be.an('array');

    //         });

    //     });

    // });

});
