module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

  // Instance method for password comparison (will be implemented in controller)
  User.prototype.comparePassword = function(candidatePassword) {
    // This method will be implemented in the controller using bcrypt
    // We're just defining the signature here
    throw new Error('Method comparePassword not implemented');
  };

  return User;
};