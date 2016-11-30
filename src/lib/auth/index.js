const compose = require('koa-compose');
function authToken() {
    return compose([
        function *(next) {
            this.throw('UnauthorizedError',401);
            console.log(1212)
            yield next;
        },
    ])
}
exports.authToken = authToken;