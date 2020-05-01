const Sequelize = require('sequelize');
const config = require('../configs/database');
const bcrypt = require('bcrypt');

const authController = {
  // view to get login info
  create: ( _req, res ) => {
    return res.render("auth/login");
  },

  // business rules to login
  store: async (req, res) => {
    // get params
    const { email, password } = req.body;
    // connect DB
    const con = new Sequelize(config);
    // find user
    const [user] = await con.query(
      "SELECT * FROM users WHERE email= :email", {
      replacements: {
        email,
      },
      type: Sequelize.QueryTypes.SELECT,
    });

    if(!user || !bcrypt.compareSync(password, user.password)) {
      return res.render("auth/login", {
        msg: "Email ou Senha invalidos!",
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.redirect("/home");

  }, // end store
  
};

module.exports = authController;