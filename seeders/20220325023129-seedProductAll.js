'use strict';
const fs = require("fs")

module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = fs.readFileSync("./productAll.json", "utf-8")
     data = JSON.parse(data)
 
     data.forEach(element => {
       element.createdAt = new Date()
       element.updatedAt = new Date()
     });
 
     return queryInterface.bulkInsert('Products', data, {})
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Products', null, {})
  }
};
