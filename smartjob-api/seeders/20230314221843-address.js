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

    await queryInterface.bulkInsert('addresses', [{
        country:'Nigeria',
        state:'Osun',
        city:'Ede',
        // profileImg:'profileimage.img',
        municipality:'Okeresi',
        street:'',
        houseNumber:'',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:1,
        longitude:12.00987,
        latitude:0.00987,
      },
      {
         country:'Nigeria',
         state:'Osun',
         city:'Ede',
        //  profileImg:'profileimage.img',
         municipality:'Okeresi',
         street:'',
         houseNumber:'',
         createdAt: new Date(),
         updatedAt: new Date(),
         userId:4,
         longitude:12.00987,
        latitude:0.00987,
       },
       {
         country:'Nigeria',
         state:'Osun',
         city:'Ede',
        //  profileImg:'profileimage.img',
         municipality:'Okeresi',
         street:'',
         houseNumber:'',
         createdAt: new Date(),
         updatedAt: new Date(),
         userId:3,
         longitude:12.00987,
        latitude:0.00987,
       },
       {
        country:'Ghanna',
        state:'Osun',
        city:'Ede',
        // profileImg:'profileimage.img',
        municipality:'Okeresi',
        street:'',
        houseNumber:'',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:4,
        longitude:12.00987,
        latitude:0.00987,
      },
      {
        country:'Nigeria',
        state:'Ekiti',
        city:'Ado',
        // profileImg:'profileimage.img',
        municipality:'Okeresi',
        street:'',
        houseNumber:'',
        createdAt: new Date(),
        updatedAt: new Date(),
        longitude:12.00987,
        latitude:0.00987,
        userId:3
      }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('addresses', null, {})
  }
};
