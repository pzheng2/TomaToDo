(function (root) {
  "use strict";
  var CurrentUserStore = root.CurrentUserStore = {};
  var _currentUser = {};
  var _callbacks = [];

  CurrentUserStore.changed = function () {
    _callbacks.forEach(function (callback) {
      callback();
    });
  };

  CurrentUserStore.addChangedHandler = function (callback) {
    _callbacks.push(callback);
  };

  CurrentUserStore.removeChangedHandler = function (callback) {
    _callbacks = _callbacks.filter(function (cb) {
      return cb !== callback;
    });
  };

  CurrentUserStore.currentUser = function () {
    return $.extend({}, _currentUser);
  };

  CurrentUserStore.isLoggedIn = function () {
    return (typeof _currentUser.id !== "undefined");
  };

  CurrentUserStore.createUser = function (credentials, successCallback, errorCallback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: { user: credentials },
      success: function (user) {
        UserActions.receiveUser(user);
        successCallback && successCallback(user);
      },
      error: function (errors) {
        errorCallback && errorCallback(errors);
      }
    });
  };

  CurrentUserStore.login = function (credentials, successCallback, errorCallback) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        // CurrentUserActions.receiveCurrentUser(currentUser);
        _currentUser = currentUser;
        CurrentUserStore.changed();
        successCallback && successCallback(currentUser);
      },
      error: function (errors) {
        errorCallback && errorCallback(errors);
      }
    });
  };

  CurrentUserStore.logout = function () {
    $.ajax ({
      type: 'DELETE',
      url: 'api/session',
      dataType: 'json',
      success: function () {
        console.log("logged out");
        _currentUser = {};
        CurrentUserStore.changed();
      }
    });
  };

  CurrentUserStore.fetchCurrentUser = function (successCallback) {
    $.ajax({
     url: '/api/session',
     type: 'GET',
     dataType: 'json',
     success: function (currentUser) {
       CurrentUserActions.receiveCurrentUser(currentUser);
       successCallback && successCallback(currentUser);
     }

    });
  };

})(this);
