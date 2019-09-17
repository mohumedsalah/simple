const userRouter = require('../components/users/userRouter');

module.exports = app => {
  app.use('/api/user', userRouter.router);
};
