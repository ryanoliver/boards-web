var Card = require('account/views/card');

module.exports = Card.extend({
  attributes: function() {
    return {
      'title': this.model.get('name'),
      'data-type': 'file'
    };
  },

  className: function() {
    var className = Card.prototype.className.apply(this, arguments);
    if (this.model.get('is_uploading')) className += ' is-uploading';
    return className;
  },

  template: require('account/templates/file'),

  elements: function() {
    return _.merge({
      preview: 'div.card-preview',
      previewLoader: 'img.card-preview-loader',
      uploadProgress: 'div.card-upload-progress'
    }, Card.prototype.elements);
  },

  bindings: function() {
    return _.merge({
      model: {
        'change:is_uploading': 'onUploadingStateChange',
        'change:upload_progress': 'onUploadProgress'
      }
    }, Card.prototype.bindings);
  },

  context: function() {
    return _.extend({}, this.model.attributes, {
      preview: this.model.getPreview(),
      extension: this.model.getExtension(),
      hasNoPreview: this.model.hasNoPreview()
    });
  },

  initialize: function() {
    _.bindAll(this, ['onPreviewLoaded']);
  },

  toggleHighlight: function(event) {
    Card.prototype.toggleHighlight.apply(this, arguments);

    this.getElement('preview').css({
      'background-image': 'url(' + this.model.getPreview() + ')'
    });

    return this;
  },

  updateUploadProgress: function(progress) {
    this.getElement('uploadProgress').text(progress + '%');
  },

  onRender: function() {
    if (this.getElement('previewLoader')[0].complete) {
      this.onPreviewLoaded();
    } else {
      this.getElement('previewLoader').load(this.onPreviewLoaded);
    }
  },

  onUploadingStateChange: function(file, isUploading) {
    this.$el.toggleClass('is-uploading', isUploading);
  },

  onUploadProgress: function(file, progress) {
    if (this.isRendered) this.updateUploadProgress(progress);
  },

  onPreviewLoaded: function() {
    _.delay(_.bind(function() {
      this.$el.addClass('has-loaded-preview');
    }, this), 1);
  }
});
