function User(id, username, password, firstName, lastName, phone, email, role,
		dateOfBirth) {
	this._id = id;
	this._username = username;
	this._password = password;
	this._firstName = firstName;
	this._lastName = lastName;
	this._phone = phone;
	this._email = email;
	this._role = role;
	this._dateOfBirth = dateOfBirth;
}

User.prototype.getId = function() {
	return this._id;
}

User.prototype.getUsername = function() {
	return this._username;
}

User.prototype.setUsername = function(username) {
	this._username = username;
}

User.prototype.getPassword = function() {
	return this._password;
}

User.prototype.setPassword = function(password) {
	this._password = password;
}

User.prototype.getFirstName = function() {
	return this._firstName;
}

User.prototype.setFirstName = function(firstName) {
	this._firstName = firstName;
}

User.prototype.getLastName = function() {
	return this._lastName;
}

User.prototype.setLastName = function(lastName) {
	this._lastName = lastName;
}

User.prototype.getPhone = function() {
	return this._phone;
}

User.prototype.setPhone = function(phone) {
	this._phone = phone;
}

User.prototype.getEmail = function() {
	return this._email;
}

User.prototype.setEmail = function(email) {
	this._email = email;
}

User.prototype.getRole = function() {
	return this._role;
}

User.prototype.setRole = function(role) {
	this._role = role;
}

User.prototype.getDateOfBirth = function() {
	return this._dateOfBirth;
}

User.prototype.setDateOfBirth = function(dateOfBirth) {
	this._dateOfBirth = dateOfBirth;
}
