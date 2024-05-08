const staffsRouter = require('./staffsRoute');
const departmentRouter = require('./departmentRoute');
const positionRouter = require('./positionRoute');
const positionHistoryRouter = require('./positionHistoryRoute');
const holidayRouter = require('./holidayRoute');
const salaryRouter = require('./salaryRoute');
const authRouter = require('./authRoute');


function route(app) {
    app.use('/api/v1/staffs/', staffsRouter);
    app.use('/api/v1/departments/', departmentRouter);
    app.use('/api/v1/positions/', positionRouter);
    app.use('/api/v1/position-histories/', positionHistoryRouter);
    app.use('/api/v1/holidays/', holidayRouter);
    app.use('/api/v1/salaries/', salaryRouter);
    app.use('/api/v1/auth/', authRouter);

}

module.exports = route;
