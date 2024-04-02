const staffsRouter = require('./staffsRoute');

function route(app) {
    app.use('/api/v1/staffs/', staffsRouter);
}

module.exports = route;
