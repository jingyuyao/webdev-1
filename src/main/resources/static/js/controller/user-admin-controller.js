(function() {
	var userServiceClient = new UserServiceClient();

	function main() {
		findAllUsers();

		$("#create-user-btn").click(showCreateUserForm);
	}

	function findAllUsers() {
		var $tableBody = $("#user-table-body");
		$tableBody.empty();
		$tableBody.append($("<caption></caption>").text("Loading..."));

		userServiceClient.findAllUsers(renderUsers);
	}

	function renderUsers(users) {
		var $tableBody = $("#user-table-body");
		$tableBody.empty();

		users.forEach(function(user) {
			var userId = user.getId();
			var $row = $("<tr></tr>").data("id", userId);
			$row.append($("<td></td>").text(user.getUsername()));
			$row.append($("<td></td>").text(user.getPassword()));
			$row.append($("<td></td>").text(user.getFirstName()));
			$row.append($("<td></td>").text(user.getLastName()));
			$row.append($("<td></td>").text(user.getPhone()));
			$row.append($("<td></td>").text(user.getEmail()));
			$row.append($("<td></td>").text(user.getRole()));
			$row.append($("<td></td>").text(user.getDateOfBirth()));
			var $trash = $("<button class='btn'></button>").append(
					$("<i class='fa-2x fa fa-trash'></i>")).click(function() {
				userServiceClient.deleteUser(userId, findAllUsers);
			});
			var $edit = $("<button class='btn'></button>").append(
					$("<i class='fa-2x fa fa-pencil'></i>")).click(function() {
				showUserForm("Edit user", user, function() {
					userServiceClient.updateUser(userId, getUserFromForm(), findAllUsers);
				});
			});
			$row.append($("<td></td>").append($trash).append($edit));
			$row.appendTo($tableBody);
		});
	}

	function showCreateUserForm() {
		showUserForm("Create a new user", new User(), function() {
			userServiceClient.createUser(getUserFromForm(), findAllUsers);
		});
	}

	function showUserForm(title, user, submitCb) {
		$("#user-form-title").text(title);
		$("#user-form-username").val(user.getUsername());
		$("#user-form-password").val(user.getPassword());
		$("#user-form-first-name").val(user.getFirstName());
		$("#user-form-last-name").val(user.getLastName());
		$("#user-form-phone").val(user.getPhone());
		$("#user-form-email").val(user.getEmail());
		$("#user-form-role").val(user.getRole());
		$("#user-form-date-of-birth").val(user.getDateOfBirth());
		$("#user-form-submit-btn").off("click").on("click", function() {
			$("#user-form").modal("hide");
			submitCb();
		});
		$("#user-form").modal("show");
	}

	function getUserFromForm() {
		return new User(null /* id */, $("#user-form-username").val(), $(
				"#user-form-password").val(), $("#user-form-first-name").val(),
				$("#user-form-last-name").val(), $("#user-form-phone").val(),
				$("#user-form-email").val(), $("#user-form-role").val(), $(
						"#user-form-date-of-birth").val());
	}

	$(main);
})();
