/**
 * Author: Professor Krasso
 * Date: 4/1/2024
 * File Name: recipes.js
 * Description: Recipe collection file for the cookbook application; used to store recipe data
 */

// Require statement
const Collection = require("./collection");

// Array of recipe objects
const recipes = new Collection([
  { id: 1, name: "Pancakes", ingredients: ["flour", "milk", "eggs"] },
  { id: 2, name: "Spaghetti", ingredients: ["pasta", "tomato sauce", "ground beef"] },
  { id: 3, name: "Chicken Salad", ingredients: ["chicken", "lettuce", "tomatoes", "cucumber"] },
  { id: 4, name: "Beef Stew", ingredients: ["beef", "potatoes", "carrots", "peas"] },
  { id: 5, name: "Fish Tacos", ingredients: ["fish", "tortillas", "avocado", "salsa"] },
]);

module.exports = recipes; // export the recipes collection