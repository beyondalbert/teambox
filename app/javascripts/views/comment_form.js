Teambox.Views.CommentForm = Backbone.View.extend({

  tagName: "form",
  className: "new_comment",

  template: Handlebars.compile(Templates.partials.comment_form),

  initialize: function() {
    _.bindAll(this, "render");
    // Fixme: bind to changes
  },

  // Build a form DOM element, that will be used by other views
  render: function() {
    $(this.el).writeAttribute({
      'accept-charset': "UTF-8",
      'action': this.model.get('url')(),
      'data-project-id': this.model.get('project_id'),
      'data-remote': "true",
      'enctype': "multipart/form-data",
      'method': "post"
    });
    $(this.el).addClassName("edit_"+this.model.get('type').toLowerCase());
    $(this.el).update(
      this.template(this.model.toJSON())
    );
    return this;
  },


  /////////////////////////////////////////////////////////////////////////////
  // Event handling

  events: {
    "click a.attach_icon": "toggleAttach",
    "click a.add_hours_icon": "toggleHours",
    "focus textarea": "revealCommentArea"
  },

  // Toggle the attach files area
  toggleAttach: function(evt) {
    $(this.el).down('.upload_area').toggle().highlight();
    return false;
  },

  // Toggle the time tracking area
  toggleHours: function(evt) {
    $(this.el).down('.hours_field').toggle().down('input').focus();
    return false;
  },

  // Reveal the extra controls when focusing on the textarea
  revealCommentArea: function(evt) {
    $(this.el).down('.extra').show();
  }

});
