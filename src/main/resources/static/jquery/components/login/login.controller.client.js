(function() {
  var userServiceClient = new UserServiceClient();
  var $loginFormUsername;
  var $loginFormPassword;
  var $loginFormSubmitBtn;
  var $errorContainer;

  $(main);

  function main() {
    $loginFormUsername = $("#login-form-username");
    $loginFormPassword = $("#login-form-password");
    $loginFormSubmitBtn = $("#login-form-submit-btn");
    $errorContainer = $("#error-container");

    $loginFormSubmitBtn.click(login);
  }

  function login() {
    $errorContainer.empty();

    var username = $loginFormUsername.val();
    var password = $loginFormPassword.val();
    var user = new User(null /* id */, username, password);

    userServiceClient.loginUser(user, loginSuccess, loginFail);
  }

  function loginSuccess() {
    window.location.href = "/jquery/components/profile/profile.template.client.html";
  }

  function loginFail(msg) {
    $errorContainer.text(msg);
  }
})();
