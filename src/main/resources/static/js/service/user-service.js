function UserServiceClient() {
  this._apiBase = "/api";
  this._userUrl = this._apiBase + "/user";
  this._registerUrl = this._apiBase + "/register";
  this._loginUrl = this._apiBase + "/login";
  this._logoutUrl = this._apiBase + "/logout";
  this._profileUrl = this._apiBase + "/profile";
}

UserServiceClient.prototype.registerUser = function(user, successCb, failCb) {
  var self = this;
  $.ajax({
    url : self._registerUrl,
    method : "POST",
    contentType : "application/json",
    data : self._userToJsonString(user)
  }).done(function(data) {
    successCb(self._jsonObjectToUser(data));
  }).fail(function(xhr) {
    failCb(xhr.responseJSON["message"]);
  });
}

UserServiceClient.prototype.loginUser = function(user, successCb, failCb) {
  var self = this;
  $.ajax({
    url : self._loginUrl,
    method : "POST",
    contentType : "application/json",
    data : self._userToJsonString(user)
  }).done(function(data) {
    successCb(self._jsonObjectToUser(data));
  }).fail(function(xhr) {
    failCb(xhr.responseJSON["message"]);
  });
}

UserServiceClient.prototype.logoutUser = function(cb) {
  var self = this;
  $.ajax({
    url : self._logoutUrl,
    method : "POST",
  }).done(function() {
    cb();
  });
}

UserServiceClient.prototype.userProfile = function(successCb, failCb) {
  var self = this;
  $.ajax({
    url : self._profileUrl,
    method : "GET",
  }).done(function(data) {
    successCb(self._jsonObjectToUser(data));
  }).fail(function(xhr) {
    failCb(xhr.responseJSON["message"]);
  });
}

UserServiceClient.prototype.updateUserProfile = function(user, successCb, failCb) {
  var self = this;
  $.ajax({
    url : self._profileUrl,
    method : "PUT",
    contentType : "application/json",
    data : self._userToJsonString(user)
  }).done(function(data) {
    successCb(self._jsonObjectToUser(data));
  }).fail(function(xhr) {
    failCb(xhr.responseJSON["message"]);
  });
}

UserServiceClient.prototype.createUser = function(user, cb) {
  var self = this;
  $.ajax({
    url : self._userUrl,
    method : "POST",
    contentType : "application/json",
    data : self._userToJsonString(user)
  }).done(function(data) {
    cb(self._jsonObjectToUser(data));
  });
}

UserServiceClient.prototype.findAllUsers = function(cb) {
  var self = this;
  $.ajax({
    url : this._userUrl,
    method : "GET"
  }).done(function(data) {
    cb(data.map(self._jsonObjectToUser));
  });
}

UserServiceClient.prototype.findUserById = function(id, cb) {
  var self = this;
  $.ajax({
    url : self._userUrl + "/" + id,
    method : "GET"
  }).done(function(data) {
    cb(self._jsonObjectToUser(data));
  });
}

UserServiceClient.prototype.updateUser = function(id, user, cb) {
  var self = this;
  $.ajax({
    url : self._userUrl + "/" + id,
    method : "PUT",
    contentType : "application/json",
    data : self._userToJsonString(user)
  }).done(function(data) {
    cb(self._jsonObjectToUser(data));
  });
}

UserServiceClient.prototype.deleteUser = function(id, cb) {
  var self = this;
  $.ajax({
    url : self._userUrl + "/" + id,
    method : "DELETE"
  }).done(function() {
    cb();
  });
}

UserServiceClient.prototype._userToJsonString = function(user) {
  // Does not serialize ID.
  return JSON.stringify({
    username : user.getUsername(),
    password : user.getPassword(),
    firstName : user.getFirstName(),
    lastName : user.getLastName(),
    phone : user.getPhone(),
    email : user.getEmail(),
    role : user.getRole(),
    dateOfBirth : user.getDateOfBirth()
  });
}

UserServiceClient.prototype._jsonObjectToUser = function(data) {
  return new User(data.id, data.username, data.password, data.firstName,
      data.lastName, data.phone, data.email, data.role, data.dateOfBirth);
}
