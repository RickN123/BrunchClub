module.exports = function(sequelize, DataTypes) {
    var Register = sequelize.define("Register", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [8]
      }
    });
  
    Register.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Register.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Register;
  };