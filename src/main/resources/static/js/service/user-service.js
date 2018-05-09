function UserServiceClient() {
  this._baseUrl = "/api/user";
}

UserServiceClient.prototype.createUser = function(user, cb) {
  var self = this;
  $.ajax({
    url : self._baseUrl,
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
    url : this._baseUrl,
    method : "GET"
  }).done(function(data) {
    cb(data.map(self._jsonObjectToUser));
  });
}

UserServiceClient.prototype.findUserById = function(id, cb) {
  var self = this;
  $.ajax({
    url : self._baseUrl + "/" + id,
    method : "GET"
  }).done(function(data) {
    cb(self._jsonObjectToUser(data));
  });
}

UserServiceClient.prototype.updateUser = function(id, user, cb) {
  var self = this;
  $.ajax({
    url : self._baseUrl + "/" + id,
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
    url : self._baseUrl + "/" + id,
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
