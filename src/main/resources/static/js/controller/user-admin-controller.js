(function() {
  var userServiceClient = new UserServiceClient();
  var $userTableBody;
  var $createUserBtn;
  var $userForm;
  var $userFormTitle;
  var $userFormUsername;
  var $userFormPassword;
  var $userFormFirstName;
  var $userFormLastName;
  var $userFormPhone;
  var $userFormEmail;
  var $userFormRole;
  var $userFormDateOfBirth;
  var $userFormSubmitBtn;

  $(main);

  function main() {
    $userTableBody = $("#user-table-body");
    $createUserBtn = $("#create-user-btn");
    $userForm = $("#user-form")
    $userFormTitle = $("#user-form-title");
    $userFormUsername = $("#user-form-username");
    $userFormPassword = $("#user-form-password");
    $userFormFirstName = $("#user-form-first-name");
    $userFormLastName = $("#user-form-last-name");
    $userFormPhone = $("#user-form-phone");
    $userFormEmail = $("#user-form-email");
    $userFormRole = $("#user-form-role");
    $userFormDateOfBirth = $("#user-form-date-of-birth");
    $userFormSubmitBtn = $("#user-form-submit-btn");

    $createUserBtn.click(showCreateUserForm);
    findAllUsers();
  }

  function findAllUsers() {
    $userTableBody.empty();
    $userTableBody.append($("<caption></caption>").text("Loading..."));

    userServiceClient.findAllUsers(renderUsers);
  }

  function renderUsers(users) {
    $userTableBody.empty();

    users.forEach(function(user) {
      var userId = user.getId();
      var ntr = "<tr></tr>";
      var ntd = "<td></td>";
      var nbtn = "<button class='btn'></button>";
      var ntrashIcon = "<i class='fa fa-2x fa-trash'></i>";
      var neditIcon = "<i class='fa fa-2x fa-pencil'></i>";
      var $row = $(ntr);
      $row.append($(ntd).text(user.getUsername()));
      $row.append($(ntd).text(user.getPassword()));
      $row.append($(ntd).text(user.getFirstName()));
      $row.append($(ntd).text(user.getLastName()));
      $row.append($(ntd).text(user.getPhone()));
      $row.append($(ntd).text(user.getEmail()));
      $row.append($(ntd).text(user.getRole()));
      $row.append($(ntd).text(user.getDateOfBirth()));
      var $trash = $(nbtn).append($(ntrashIcon)).click(function() {
        deleteUser(userId);
      });
      var $edit = $(nbtn).append($(neditIcon)).click(function() {
        showUpdateUserForm(userId);
      });
      $row.append($(ntd).append($trash).append($edit));
      $row.appendTo($userTableBody);
    });
  }

  function showUpdateUserForm(userId) {
    userServiceClient.findUserById(userId, function(user) {
      showUserForm("Edit user", user, function() {
        userServiceClient.updateUser(userId, getUserFromForm(),
            findAllUsers);
      });
    });
  }

  function deleteUser(userId) {
    userServiceClient.deleteUser(userId, findAllUsers);
  }

  function showCreateUserForm() {
    showUserForm("Create a new user", new User(), function() {
      userServiceClient.createUser(getUserFromForm(), findAllUsers);
    });
  }

  function showUserForm(title, user, submitCb) {
    $userFormTitle.text(title);
    $userFormUsername.val(user.getUsername());
    $userFormPassword.val(user.getPassword());
    $userFormFirstName.val(user.getFirstName());
    $userFormLastName.val(user.getLastName());
    $userFormPhone.val(user.getPhone());
    $userFormEmail.val(user.getEmail());
    $userFormRole.val(user.getRole());
    $userFormDateOfBirth.val(user.getDateOfBirth());
    $userFormSubmitBtn.off("click").on("click", function() {
      $userForm.modal("hide");
      submitCb();
    });
    $userForm.modal("show");
  }

  function getUserFromForm() {
    return new User(null /* id */, $userFormUsername.val(),
        $userFormPassword.val(), $userFormFirstName.val(),
        $userFormLastName.val(), $userFormPhone.val(), $userFormEmail
            .val(), $userFormRole.val(), $userFormDateOfBirth.val());
  }
})();
