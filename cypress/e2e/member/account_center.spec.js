const account = 'staff+test06235545@moonshine.tw';
const fields = {
    realName: '雙木林',
    address: '忠孝東路四段481號3樓',
};

const errorMesg = '此欄位為必填';

describe('/member/account', () => {

    it('redirect to signin page without signin', () => {

        cy.visit('/member/account');
        cy.location('pathname').should('eq', '/signin');

    });

    context('Go to account center as usual flow', () => {

        beforeEach(() => {

            cy.login();
            cy.get('header [type="button"]')
                .should('contain', '我的帳號')
                .click()
                .next()
                .find('.menu-item')
                .contains('會員中心')
                .click();

        });

        it('visits the page', () => {

            cy.location('pathname').should('eq', '/member/account');
            cy.title().should('contain', '會員中心-我的模型庫');

            // Tabs
            cy.get('.tab-menu button').each(($btn) => {

                cy.get($btn)
                    .click()
                    .should('have.class', 'Mui-selected')
                    .and('contain', $btn.text());

            });

        });

    });

    // context('My product', () => {

    //     beforeEach(() => {

    //         cy.login();
    //         cy.visit('/member/account');

    //     });

    //     it('display message when there is no product', () => {

    //         cy.get('.tab-menu button')
    //             .contains('我的模型庫')
    //             .click();

    //     });

    // });

    context('My order list', () => {});

    context('Update my account', () => {

        beforeEach(() => {

            cy.login();
            cy.visit('/member/account');
            cy.get('.tab-menu button')
                .contains('修改會員資料')
                .click();

            // 先清除 input 值再檢測
            cy.get('.panel-account form [name="realName"]').clear();
            cy.get('.panel-account form [name="address"]').clear();

        });

        it('display my account data', () => {

            cy.get('.panel-account [role="tabpanel"]:last-child').should('not.have.attr', 'hidden');
            cy.get('.panel-account .row .title')
                .should('contain', '電子信箱')
                .parent()
                .contains(account);

        });

        it('require real name', () => {

            cy.get('.panel-account form').submit();
            cy.get('.panel-account .error-mesg').should('contain', errorMesg);

        });

        it('require address', () => {

            cy.get('.panel-account form [name="realName"]').type(fields.realName);
            cy.get('.panel-account form').submit();
            cy.get('.panel-account .error-mesg').should('contain', errorMesg);

        });

        it('successful saved data', () => {

            cy.get('.panel-account form [name="realName"]').type(fields.realName);
            cy.get('.panel-account form [name="address"]').type(fields.address);
            cy.get('.panel-account form').submit();

            // alert 成功
            cy.on('window:alert', (mesg) => {

                expect(mesg).to.deep.equal('更新成功');

            });

        });

    });

});
