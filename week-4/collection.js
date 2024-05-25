/**
 * Author: Professor Krasso
 * Date: 4/1/2024
 * File Name: collection.js
 * Description: Collection class used to mimic MongoDB CRUD operations
 */

// Collection class
class Collection {
  constructor(data) {
    this.data = data;
  }

  /**
   * @description Finds all items in the collection that match the query
   * @param {*} query The query object to search for 
   * @returns {Promise} A promise that resolves with the items that match the query
   */
  find(query = {}) {
    // Filter the data array to find all items that match the query
    const items = this.data.filter(item =>
      Object.keys(query).every((key) => item[key] === query[key])
    );
    return Promise.resolve(items); // Return a promise that resolves with the items
  }

  /**
   * @description Finds the first item in the collection that matches the query
   * @param {*} query The query object to search for
   * @returns {Promise} A promise that resolves with the first item that matches the query 
   */
  findOne(query) {
    // Find the first item in the data array that matches the query
    const item = this.data.find(item =>
      Object.keys(query).every((key) => item[key] === query[key])
    );

    // if no item is found, reject the promise with an error
    if (!item) {
      return Promise.reject(new Error('No matching item found')); // Reject the promise with an error
    }

    return Promise.resolve(item); // Return a promise that resolves with the item
  }

  /**
   * @description Inserts an item into the collection
   * @param {*} item The item to insert into the collection
   * @returns {Promise} A promise that resolves with the inserted item
   */
  insertOne(item) {
    this.data.push(item); // Push the item into the data array

    // Return a promise that resolves with the inserted item and the operation result
    return Promise.resolve({ result: { ok: 1, n: 1 }, ops: [item] });
  }

  /**
   * @description Updates an item in the collection
   * @param {*} query The query object to search for 
   * @param {*} update The item to update in the collection   
   * @returns {Promise} A promise that resolves with the updated item 
   */
  updateOne(query, update) {
     // Find the first item in the data array that matches the query
     const item = this.data.find(item =>
      Object.keys(query).every((key) => item[key] === query[key])
    );

    // if no item is found, reject the promise with an error
    if (!item) {
      return Promise.reject(new Error('No matching item found')); // Reject the promise with an error
    }

    const index = this.data.indexOf(item); // Get the index of the item in the data array

    // Update the item in the data array
    this.data[index] = { ...this.data[index], ...update };

    // Return a promise that resolves with the updated item and the operation result
    return Promise.resolve({ result: { ok: 1, nModified: 1 }, matchedCount: 1, modifiedCount: 1 });
  }

  /**
   * @description Deletes an item from the collection
   * @param {*} query The query object to search for
   * @returns {Promise} A promise that resolves with the deleted item
   */
  deleteOne(query) {
    // Find the index of the item in the data array
    const index = this.data.findIndex(item => item.id === query.id);

    // If no item is found, reject the promise with an error
    if (index === -1) {
      return Promise.reject(new Error('No matching item found')); // Reject the promise with an error
    }

    this.data.splice(index, 1); // Remove the item from the data array

    // Return a promise that resolves with the operation result and the deleted item
    return Promise.resolve({ result: { ok: 1, n: 1 }, deletedCount: 1 });
  }
}

module.exports = Collection; // Export the Collection class