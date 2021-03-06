module.exports = Zeppelin.ModelView.extend({
  attributes: {
    'data-type': 'file'
  },

  className: function() {
    var className = 'card is-detail has-loaded-preview';
    if (this.model.hasPreview()) className += ' has-preview';
    if (this.model.get('featured')) className += ' is-featured';
    return className;
  },

  events: {
    'click [data-action=view-original]': 'onViewOriginalClick'
  },

  elements: {
      preview: 'div.card-preview',
      previewLoader: 'img.card-preview-loader',
      previewWrapper: 'div.card-preview-wrapper'
  },

  bindings: {
    model: {
      'change:thumbnail_lg_path': function(file, thumbnail) {
        if (file.previous('thumbnail_lg_path') === null) {
          this.setPreview();
        }
      }
    }
  },

  template: require('account/templates/file-detail'),

  context: function() {
    return _.extend({}, this.model.attributes, {
      preview: this.model.getPreview(true),
      hasPreview: this.model.hasPreview()
    });
  },

  setPreview: function() {
    var context = {
          preview: this.model.getPreview(true) ,
          hasPreview: this.model.hasPreview()
        },
        template = require('account/templates/file-detail-preview');

    this.getElement('previewWrapper').html(
      this.renderTemplate(template, context)
    );

    this.addElements({
      preview: 'div.card-preview',
      previewLoader: 'img.card-preview-loader'
    });
  },

  viewOriginal: function() {
    var url, self = this;

    this.model.originalThumbnail().done(function(data) {
      url = data.original_thumbnail_url;
      self.broadcast('router:navigate', url, { trigger: false });
      window.location.replace(url);
    });
  },

  onViewOriginalClick: function(event) {
    event.preventDefault();
    this.viewOriginal();
  },
});

