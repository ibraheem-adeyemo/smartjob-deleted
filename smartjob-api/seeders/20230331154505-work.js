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
   const works = ['Electrical','Plumbing','Cleaning','Clearing','Mechanical','Packing', 'Moving','Logistic','Painting','Repair','Aluminium','Laundry','Generator','Towing','bricklaying','weldering','locksmith','goldsmith','nanny','security','errand','Casual','Teaching','Driver','cobbler','gardner','Tailoring', 'Tiling']
    await queryInterface.bulkInsert('Works', [...works.map(work => {
        return {
            name: work,
            createdAt: new Date(),
            updatedAt: new Date()
          }
    })], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
