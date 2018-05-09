function UserServiceClient() {
	this._baseUrl = "/api/user";
}

UserServiceClient.prototype.createUser = function(user, cb) {
	$.ajax({
		url : this._baseUrl,
		method : "POST",
		data : this._userToJsonString(user)
	}).done(function(data) {
		cb(this._jsonObjectToUser(data));
	});
}

UserServiceClient.prototype.findAllUsers = function(cb) {
	$.ajax({
		url : this._baseUrl,
		method : "GET"
	}).done(function(data) {
		cb(data.map(this._jsonObjectToUser));
	});
}

UserServiceClient.prototype.findUserById = function(id, cb) {
	$.ajax({
		url : this._baseUrl + "/" + id,
		method : "GET"
	}).done(function(data) {
		cb(this._jsonObjectToUser(data));
	});
}

UserServiceClient.prototype.updateUser = function(id, user, cb) {
	$.ajax({
		url : this._baseUrl + "/" + id,
		method : "PUT",
		data: this._userToJsonString(user)
	}).done(function(data) {
		cb(this._jsonObjectToUser(data));
	});
}

UserServiceClient.prototype.deleteUser = function(id, cb) {
	$.ajax({
		url : this._baseUrl + "/" + id,
		method : "DELETE"
	}).done(function() {
		cb();
	});
}

UserServiceClient.prototype._userToJsonString = function(user) {
	// Does not serialize the id back to service.
	return JSON.stringify({
		username : user.getUserName(),
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
