const Sequelize = require('sequelize');
const config = require('../configs/database');
const bcrypt = require('bcrypt');

const authController = {
  create: ( _req, res ) => {
    return res.render("auth/login");
  },

  store: async (req, res) => {
    const { email, password } = req.body;
    const con = new Sequelize(config);
  },
};

module.exports = authController;