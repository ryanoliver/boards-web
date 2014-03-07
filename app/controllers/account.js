module.exports = Zeppelin.View.extend({
  name: 'AccountController',

  template: require('templates/account-main'),

  initialize: function() {
    _.bindAll(this, 'onBoardsSync');

    this.setDocumentTitle();
    this.insert('#application').initChildren();
    this.fetchBoards();

    return this;
  },

  setDocumentTitle: function() {
    var account = App.Accounts.getCurrent();

    if (account) document.title = 'Blimp | ' + account.get('name');
    return this;
  },

  fetchBoards: function() {
    if (App.Boards.isEmpty()) {
      App.Boards.fetch({
        data: {
          account: App.Cache.get('current_account')
        },

        reset: true
      }).done(this.onBoardsSync);
    } else {
      this.onBoardsSync();
    }

    return this;
  },

  initChildren: function() {
    this.addChild(_.createView('header'), 'header').render();
    this.addChild(_.createView('boards-list'), 'allBoards');
    return this;
  },

  onBoardsSync: function() {
    this.children.allBoards.insert('div.sidebar');
    return this;
  }
});