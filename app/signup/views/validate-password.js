module.exports = Zeppelin.FormView.extend({
  tagName: 'form',

  className: 'signup-validate-password',

  template: require('signup/templates/validate-password'),

  bindings: {
    model: {
      'user:signup:error': 'onSignupError',
      'user:signup:success': 'onSignupSuccess'
    }
  },

  saveOnSubmit: false,

  model: function() {
    return App.User;
  },

  context: function() {
    return _.extend({}, this.model.attributes, {
      domain: this.model.getDomain()
    });
  },

  onValidationSuccess: function() {
    this.model.signup();
  },

  onSignupError: function(error) {
    this.getAttributeErrorElement('password').show().text(error);
  },

  onSignupSuccess: function() {
    this.getAttributeErrorElement('password').hide();
    this.broadcast('router:navigate', 'accounts/');
  }
});
