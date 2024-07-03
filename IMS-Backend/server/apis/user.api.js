const { validateBody } = require('../middlewares/validator');
const { createAdminSchema, createStudentSchema } = require('../schema/user.schama');
const { getUsers, createAdminUser } = require('../services/user.service');

const ApiService = {
  getUsers: async (req, res, next) => {
    try {
      const users = await getUsers();
      res.formattedResponse(200, 'Users fetch successfully', users);
    } catch (err) {
      next(err);
    }
  },
  createAdminUser: async (req, res, next) => {
    try {
      const users = await createAdminUser(req.body);
      res.formattedResponse(200, 'User created successfully', users);
    } catch (err) {
      next(err);
    }
  },
  createStudentUser: async (req, res, next) => {
    try {
      const users = await createStudentUser(req.body);
      res.formattedResponse(200, 'User created successfully', users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .get('/users', ApiService.getUsers)
    .post(
      '/user/admin',
      validateBody(createAdminSchema),
      ApiService.createAdminUser
    )
    .post(
      '/user/sttudent',
      validateBody(createStudentSchema),
      ApiService.createStudentUser
    );
};
