'use strict';
module.exports = (sequelize, DataTypes) => {
  const dino = sequelize.define('dino', {
    type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  // }, {
  //   hooks: {
  //     beforeCreate: function(d) {
  //       d.name = d.name.toUpperCase()
  //     }
  //   }
  // });
  dino.associate = function(models) {
    // associations can be defined here
  };
  return dino;
};