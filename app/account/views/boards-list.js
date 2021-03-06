module.exports = Zeppelin.CollectionView.extend({
  tagName: 'ol',

  className: 'boards-list list-unstyled',

  itemView: require('account/views/board'),

  addMethod: 'prepend',

  collection: function() {
    return App.Boards;
  }
});

