const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require('bcrypt');

const userController = {

  /* entry point and register view to add users information */
  create: (req, res) => res.render("auth/register"),
  
  /* store user signin */
  store: async (req, res) => {
    const {name, email, username, password} = req.body;
    const con = new Sequelize(config);
    const hashPassword = bcrypt.hashSync(password, 10);
    
    const user = await con.query(
      "INSERT INTO users (name, username, email, password, create_at, update_at) VALUES(:name, :username, :email, :password, :create_at, :update_at)", 
      { // object passed after query
        replacements: { // replacement passed by req.body and date
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
    
    /* call home to registers users */
    auth: (req, res) => res.render("/home", {user:req.session}),
    
}; // end userController

module.exports = userController;