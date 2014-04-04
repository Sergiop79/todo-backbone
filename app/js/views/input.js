var Backbone = require('backbone'),
	TodoModel = require('../models/todo'),
	TodoCollection = require('../collections/todos'),
	TodoCollectionView = require('./todos'),
	$ = require('jquery');

module.exports = Backbone.View.extend({
	el: $('.todoinput'),
	initialize: function () {
		this.$list = $('#todolist');
		this.$close = $('.close-icon');
		this.collection = new TodoCollection();
		this.todoCollectionView = new TodoCollectionView({collection: this.collection});
	},
	events: {
		"keyup" : "addNew",
	},

	addNew : function(e) {

		if (e.which === 13 && this.$el.val().trim()) {
			var todo = new TodoModel({title: this.$el.val().trim()});
			this.collection.add(todo);
			this.updateView();
			this.$list.append(this.todoCollectionView.render().el);
			this.$el.val('');
		};

		if (e.which === 27) {
			this.$el.val('');
		};
	},

	updateView: function() {
		this.todoCollectionView.remove();
		this.todoCollectionView = new TodoCollectionView({ collection: this.collection });
	}
})