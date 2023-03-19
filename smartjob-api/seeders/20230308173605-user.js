'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
           id:1, 
           firstName: 'John',
           lastName: 'Doe',
           email:'john@mail.com',
           phoneNumber:'08140404040',
           password:'Password@11',
           isVerified: false,
           createdAt: new Date(),
           updatedAt: new Date()
         },
         {
            id:2,
            firstName: 'Smith',
            lastName: 'Doe',
            email:'smith@mail.com',
            password:'Password@11',
            isVerified: true,
            username:'Easy job',
            phoneNumber:'08140404040',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:3,
            firstName: 'Abdullah',
            lastName: 'Isma\'el',
            email:'abdullah2@mail.com',
            phoneNumber:'08140404040',
            isVerified: true,
            password:'Password@11',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:4,
            firstName: 'james',
            lastName: 'Isma\'el',
            email:'abdullah@mail.com',
            phoneNumber:'08140404040',
            password:'Password@11',
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:5,
            firstName: 'Abdullah',
            lastName: 'senior',
            email:'senior@mail.com',
            phoneNumber:'08140404040',
            password:'Password@13',
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
