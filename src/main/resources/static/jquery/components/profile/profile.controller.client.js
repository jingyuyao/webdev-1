(function() {
  var userServiceClient = new UserServiceClient();
  var $profileFormUsername;
  var $profileFormPassword;
  var $profileFormFirstName;
  var $profileFormLastName;
  var $profileFormPhone;
  var $profileFormEmail;
  var $profileFormRole;
  var $profileFormDateOfBirth;
  var $profileFormSubmitBtn;
  var $profileFormLogoutBtn;
  var $successContainer;
  var $errorContainer;

  $(main);

  function main() {
    $profileFormUsername = $("#profile-form-username");
    $profileFormPassword = $("#profile-form-password");
    $profileFormFirstName = $("#profile-form-first-name");
    $profileFormLastName = $("#profile-form-last-name");
    $profileFormPhone = $("#profile-form-phone");
    $profileFormEmail = $("#profile-form-email");
    $profileFormRole = $("#profile-form-role");
    $profileFormDateOfBirth = $("#profile-form-date-of-birth");
    $profileFormSubmitBtn = $("#profile-form-submit-btn");
    $profileFormLogoutBtn = $("#profile-form-logout-btn");
    $successContainer = $("#success-container");
    $errorContainer = $("#error-container");

    $profileFormSubmitBtn.click(updateProfile);
    $profileFormLogoutBtn.click(logout);
    userServiceClient.userProfile(populateProfile, redirectToLogin);
  }

  function updateProfile() {
    $successContainer.empty();
    $errorContainer.empty();
    userServiceClient.updateUserProfile(
      getUserFromForm(),
      function(user) {
        $successContainer.text("Updated profile successfully");
        populateProfile(user);
      },
      function(msg) {
        $errorContainer.text(msg);
      });
  }

  function redirectToLogin() {
    window.location.href = "/jquery/components/login/login.template.client.html";
  }

  function logout() {
    userServiceClient.logoutUser(redirectToLogin);
  }

  function populateProfile(user) {
    $profileFormUsername.val(user.getUsername());
    $profileFormPassword.val(user.getPassword());
    $profileFormFirstName.val(user.getFirstName());
    $profileFormLastName.val(user.getLastName());
    $profileFormPhone.val(user.getPhone());
    $profileFormEmail.val(user.getEmail());
    $profileFormRole.val(user.getRole());
    $profileFormDateOfBirth.val(user.getDateOfBirth());
  }

  function getUserFromForm() {
    return new User(null /* id */, $profileFormUsername.val(),
        $profileFormPassword.val(), $profileFormFirstName.val(),
        $profileFormLastName.val(), $profileFormPhone.val(), $profileFormEmail.val(),
        $profileFormRole.val(), $profileFormDateOfBirth.val());
  }
})();
