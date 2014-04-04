var Backbone = require('backbone'),
	TodoModel = require('../models/todo'),
	$ = require('jquery'),
	Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
	tagName: "li",

	initialize: function () {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events : {
		"click .edit": "editTodo",
		"click .remove": "destroyTodo"
	},

	template: Handlebars.compile($('#todo-template').html()),

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	remove: function () {
		this.$el.remove();
	},

	editTodo: function() {
		var newTitle = prompt('Pleas enter a new title for de todo',this.model.get('title'));
		if(!newTitle) return;
		this.model.set('title', newTitle);
	},

	destroyTodo: function () {
		this.model.destroy();
	}

});