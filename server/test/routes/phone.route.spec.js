describe('Phone Routes', () => {

    const expect = require('chai').expect,
        request = require('supertest'),
        express = require('express'),
        app = express(),
        urlSpace = require('../../src/url-space');

    let phoneRouter;

    before(() => {
        phoneRouter = require('../../src/routes/phone.route')();
        app.use('/',phoneRouter);
    });


    it('should get phone number combinations',() => {
        const result = { total: 3, data: [ '1a','1b','1c' ], err: '' };
        let url = urlSpace.local.getPhoneNumbers + '?phonenumber=12&page=1&size=10';
        return request(app)
        .get(url)
        .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.deep.equal(result);
        });
    });


    it('should return error if no phone number',() => {
        const result = { total: 0, data: [], err: 'invalid phone number' };
        let url = urlSpace.local.getPhoneNumbers;
        return request(app)
        .get(url)
        .then((res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.deep.equal(result);
        });
    });
});