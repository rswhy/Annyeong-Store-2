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
    let data = fs.readFileSync("./categories.json", "utf-8")
    data = JSON.parse(data)

    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });

    return queryInterface.bulkInsert('Categories', data, {})
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories', null, {})
  }
};
