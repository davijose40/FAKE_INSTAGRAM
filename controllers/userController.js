const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require('bcrypt');

const userController = {

  /* call auth register to add users information */
  create: (req, res) => res.render("auth/register"),

  /* store user signin */
  store: async (req, res) => {
    const {name, email, username, password} = req.body;
    const con = new Sequelize(config);
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await con.query(
      "INSERT INTO users (name, username, email, password, create_at, update_at) VALUES(:name, :username, :email, :password, :create_at, :update_at)", 
      {
        replacements: {
          name,
          email,
          username,
          password: hashPassword,
          create_at: new Date(),
          update_at: new Date(),
        },
        type: Sequelize.QueryTypes.INSERT,
      }
    );
    if (!user) {
      return res.render("auth/register", {
        msg: "Erro ao cadastrar um usario",
      });
    }

    return res.redirect("/home");

  }, // end store

}; // end userController

module.exports = userController;