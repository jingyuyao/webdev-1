function UserServiceClient() {
  this._apiBase = "/api";
  this._baseUserUrl = this._apiBase + "/user";
  this._registerUrl = this._apiBase + "/register";
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

UserServiceClient.prototype.createUser = function(user, cb) {
  var self = this;
  $.ajax({
    url : self._baseUserUrl,
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
    url : this._baseUserUrl,
    method : "GET"
  }).done(function(data) {
    cb(data.map(self._jsonObjectToUser));
  });
}

UserServiceClient.prototype.findUserById = function(id, cb) {
  var self = this;
  $.ajax({
    url : self._baseUserUrl + "/" + id,
    method : "GET"
  }).done(function(data) {
    cb(self._jsonObjectToUser(data));
  });
}

UserServiceClient.prototype.updateUser = function(id, user, cb) {
  var self = this;
  $.ajax({
    url : self._baseUserUrl + "/" + id,
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
    url : self._baseUserUrl + "/" + id,
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
