var DataTypes = require("sequelize").DataTypes;
var _ToDos = require("./ToDos");
var _Users = require("./Users");

function initModels(sequelize) {
  var ToDos = _ToDos(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  ToDos.belongsTo(Users, { as: "id_User", foreignKey: "id"});
  Users.hasOne(ToDos, { as: "ToDo", foreignKey: "id"});

  return {
    ToDos,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
