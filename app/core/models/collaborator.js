var Person = require('core/models/person');

module.exports = Person.extend({
  url: function() {
    var url = App.API_URL + '/boards/collaborators/';
    return this.isNew() ? url : url + this.id + '/';
  },

  hasAccount: function() {
    return this.has('user') && this.get('user');
  },

  isOwner: function(board) {
    if (!this.hasAccount()) return false;

    if (!board) {
      this.request('boards:current', function(currentBoard) {
        board = currentBoard;
      });
    }

    if (board.get('created_by').id === this.get('user')) return true;

    return false;
  },

  getName: function() {
    if (this.hasAccount()) {
      return this.get('user_data').first_name + ' ' + this.get('user_data').last_name;
    } else {
      return this.get('user_data').email;
    }
  },

  getAvatar: function() {
    return this.has('user_data') ? this.get('user_data').gravatar_url : '';
  },

  getUsername: function() {
    if (this.hasAccount()) {
      return this.get('user_data').username;
    } else {
      return '';
    }
  },

  canEdit: function() {
    return this.get('permission') === 'write';
  }
});
