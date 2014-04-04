var Backbone = require('backbone'),
	TodoModel = require('../models/todo');

module.exports = Backbone.Collection.extend({
	model: TodoModel
});