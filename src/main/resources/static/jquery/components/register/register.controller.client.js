(function() {
  var userServiceClient = new UserServiceClient();
  var $registerFormUsername;
  var $registerFormPassword;
  var $registerFormPasswordVerify;
  var $registerFormSubmitBtn;
  var $errorContainer;

  $(main);

  function main() {
    $registerFormUsername = $("#register-form-username");
    $registerFormPassword = $("#register-form-password");
    $registerFormPasswordVerify = $("#register-form-password-verify");
    $registerFormSubmitBtn = $("#register-form-submit-btn");
    $errorContainer = $("#error-container");

    $registerFormSubmitBtn.click(register);
  }

  function register() {
    $errorContainer.empty();

    var username = $registerFormUsername.val();
    var password = $registerFormPassword.val();
    var passwordVerify = $registerFormPasswordVerify.val();

    if (password === passwordVerify) {
      var user = new User(null /* id */, username, password);
      userServiceClient.registerUser(user, registerSuccess, registerFail);
    } else {
      $errorContainer.text("The passwords you entered do not match.")
    }
  }

  function registerSuccess() {
    window.location.href = "/jquery/components/profile/profile.template.client.html";
  }

  function registerFail(msg) {
    $errorContainer.text(msg);
  }
})();
