const staffsRouter = require('./staffsRoute');
const departmentRouter = require('./departmentRoute');
const positionRouter = require('./positionRoute');
const positionHistoryRouter = require('./positionHistoryRoute');
const holidayRouter = require('./holidayRoute');
const basicSalaryRouter = require('./basicSalaryRoute');
const authRouter = require('./authRoute');
const timesheetRouter = require('./timesheetRoute');
const bonusRouter = require('./bonusRoutes');
const deductionRouter = require('./deductionRoutes');
const allowanceRouter = require('./allowanceRoutes');
const payRollRouter = require('./payRollRoute')

function route(app) {
    app.use('/api/v1/staffs/', staffsRouter);
    app.use('/api/v1/departments/', departmentRouter);
    app.use('/api/v1/positions/', positionRouter);
    app.use('/api/v1/position-histories/', positionHistoryRouter);
    app.use('/api/v1/holidays/', holidayRouter);
    app.use('/api/v1/basic-salaries/', basicSalaryRouter);
    app.use('/api/v1/auth/', authRouter);
    app.use('/api/v1/timesheets/', timesheetRouter);
    app.use('/api/v1/holidays/', holidayRouter);
    app.use('/api/v1/bonuses', bonusRouter);
    app.use('/api/v1/deductions', deductionRouter);
    app.use('/api/v1/allowances', allowanceRouter);
    app.use('/api/v1/payrolls', payRollRouter);


}

module.exports = route;
