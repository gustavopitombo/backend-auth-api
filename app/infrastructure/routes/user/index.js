const express = require('express');
const { Adapter } = require('../../../common');

const authMiddleware = require('../../../common/middleware/auth-middleware');
const FindUserFactory = require('../../factory/user/find-user-factory')
const FindUserHandler = require('../../http/user/find-user-handler')

const router = () => {
  const userRouter = express.Router();

  userRouter.route('/:id').get(authMiddleware, Adapter(FindUserFactory, FindUserHandler));

  return userRouter;
};

module.exports = router;
