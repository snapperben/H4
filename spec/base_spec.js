const request = require('request');

describe('Basic request', function () {
    let endpoint = 'http://localhost:3000/';

    it('GET 200 response code', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            //let recipe = JSON.parse(response.body);
            done();
        });
    });
});