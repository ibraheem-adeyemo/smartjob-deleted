'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expertLeve: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['beginner', 'intermediate', 'advance', 'expert']
      },
      yearsOfExperience: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      banners: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      // you may need to change the service type to array 
    //   or you may need to incled all
      serviceType: {
        type:Sequelize.ENUM,
        values: ['all','hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:Sequelize.ENUM,
        values: ['available','notavailable']
      },
    //   service charge will be removed and the buyers will request for quotation
      servicecharge: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};