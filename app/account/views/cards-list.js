module.exports = Zeppelin.CollectionView.extend({
  tagName: 'ol',

  className: 'cards-list list-unstyled clearfix',

  subscriptions: {
    'cardsList:layout': 'triggerLayout',
    'cardsList:updateBlock': 'updateBlock'
  },

  addMethod: 'prepend',

  wall: null,

  layoutTimer: null,

  itemView: function(model) {
    return require('account/views/' + model.get('type'));
  },

  collection: function() {
    return App.Cards;
  },

  initialize: function() {
    _.bindAll(this, ['layout']);
  },

  triggerLayout: function() {
    clearTimeout(this.layoutTimer);
    this.layoutTimer = _.delay(this.layout, 1);
  },

  layout: function() {
    var self = this;

    if (this.collection.isEmpty()) {
      return this;
    }

    if (this.wall) {
      this.wall.fitWidth();
      return this;
    }

    this.wall = new freewall(this.$list);

    this.wall.reset({
      delay: 0,
      cellW: 222,
      cellH: 222,
      gutterX: 15,
      gutterY: 15,
      animate: false,
      fixSize: 0,
      selector: 'li.card',
      onResize: _.debounce(function() {
        self.wall.fitWidth();
      }, 250),
      onBlockFinish: function() {
        var $b = $(this);

        if ($b.attr('data-type') === 'file') {
          $b.find('div.card-preview').height($b.height() - 50);
        } else {
          $b.find('div.card-content').height($b.height() - 72);
        }
      }
    });

    this.wall.fitWidth();

    return this;
  },

  updateBlock: function(options) {
    if (this.wall) {
      this.wall.fixSize(options);
      this.wall.fitWidth();
    } else {
      this.layout();
    }
  },

  onRenderItems: function() {
    this.triggerLayout();
  },

  onPrependItem: function() {
    if (!this.isFirstCollectionRender()) this.triggerLayout();
  },

  onUnplug: function() {
    clearTimeout(this.layoutTimer);
  }
});

