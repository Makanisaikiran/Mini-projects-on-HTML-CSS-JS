
let userDatabase = [
  { username: "sai", password: 12345678 , email:"sai@gmail.com" },
  { username: "kiran", password: 12345678 , email:"kiran@gmail.com"},
  { username: "ravi", password: 12345678, email:"ravi@gmail.com" },
  { username: "kishore", password: 12345678 , email:"kishore@gmail.com"},
  { username: "ramesh", password: 12345678 , email:"ramesh@gmail.com"},
  { username: "suresh", password: 12345678 , email:"suresh@gmail.com"},
  { username: "vamsi", password: 12345678 , email:"vamsi@gmail.com"},
  { username: "mahesh", password: 12345678 , email:"mahesh@gmail.com"},
  { username: "raju", password: 12345678 , email:"raju@gmail.com"},
  { username: "naveen", password: 12345678 , email:"naveen@gmail.com"},
  { username: "krishna", password: 12345678, email:"krishna@gmail.com" },
  { username: "ramu", password: 12345678 , email:"ramu@gmail.com"},
  ];
  localStorage.setItem("users", JSON.stringify(userDatabase));
    
  const form = document.getElementById("form");
  const submitButton = form.querySelector("button");
  submitButton.innerHTML = "Login";
  const errorMessage = form.querySelector("#p");
  let isLogin = false;
  
  let failedLoginAttempts = 0;
  let earlySignUpPrompt = null;

  let formMode = "login";
  
  form.insertBefore(errorMessage,form.children[3]);

  promptSignUpButton();
  // --------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formMode === "login") {
      loginUser();
    } else {
      registerUser();
    }
  });
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  function loginUser() {
    let enteredUsernameOrEmail = form.querySelector("#oldusername").value;
    let enteredPassword = form.querySelector("#oldpassword").value;
  
    const users = JSON.parse(localStorage.getItem("users"));
    let userFound = users.find((user) =>
      user.password == enteredPassword && 
      (user.username === enteredUsernameOrEmail || user.email === enteredUsernameOrEmail)
    );
  
    if (userFound) {
      localStorage.setItem("isLogin",true)
      isLogin = true;
      window.location.href = "main.html"
    } else {
      errorMessage.innerHTML = "Invalid username or password";
      setTimeout(() => {
        errorMessage.innerHTML = "&nbsp";
      }, 2000);
      failedLoginAttempts++;
      if (failedLoginAttempts === 3) {
        let confirmSignUp = confirm("Not signed up? Would you like to sign up now?");
        if (confirmSignUp) {
          showSignUpForm();
        }
        failedLoginAttempts = 0;
      }
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  function removeSignUpForm() {
    form.querySelector("#newusername").id = "oldusername";
    form.querySelector("#emailDiv").remove();
    form.querySelector("#confirmPasswordDiv").remove();
  }
  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function registerUser() {
    let newUsername = form.querySelector("#newusername").value;
    let newPassword = form.querySelector("#oldpassword").value;
    let confirmNewPassword = form.querySelector("#newpassword").value;
    let newEmail = form.querySelector("#email").value;

  
    if (newPassword !== confirmNewPassword) {
      errorMessage.innerHTML = "Passwords do not match";
      form.querySelector("#newpassword").value = "";
      setTimeout(() => {
        errorMessage.innerHTML = "&nbsp";
      }, 2000);
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users"));
    let userExists = users.find((user) =>
      user.username === newUsername || user.email === newEmail
    );
  
    if (userExists) {
      userExists.username === newUsername
        ? (errorMessage.innerHTML = "username with "+`${userExists.username} already exists`)
        : (errorMessage.innerHTML = "Email  with "+`${userExists.email} already exists`);
        return;
    } else {
      users.push({ username: newUsername, password: newPassword, email: newEmail });
      localStorage.setItem("users", JSON.stringify(users));
      removeSignUpForm();
      errorMessage.innerHTML = "";
      formMode = "login";
      submitButton.innerHTML = "Login";
      form.reset();
      promptSignUpButton();
    }
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function promptSignUpButton() {
    const signUpDiv = document.createElement("div");
    signUpDiv.id = "signUpPrompt";
    signUpDiv.innerHTML = `<button type="button" id="signUpButton" onclick="showSignUpForm()">Sign Up</button>`;
    form.append(signUpDiv);
    earlySignUpPrompt = "prompted";
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function showSignUpForm() {
    failedLoginAttempts = 0;
    let emailDiv = document.createElement("div");
    emailDiv.id = "emailDiv";
    emailDiv.innerHTML = `<label for="email">Email: </label><input type="email" id="email" placeholder="Email" name="email" required>`;
  
    let confirmPasswordDiv = document.createElement("div");
    confirmPasswordDiv.id = "confirmPasswordDiv";
    confirmPasswordDiv.innerHTML = `<label for="password2">Confirm Password:</label>
                                    <input type="password" name="password2" id="newpassword" class="password" placeholder="Confirm password" maxlength="15" required>`;
  
    form.insertBefore(emailDiv, form.children[1]);
    form.insertBefore(confirmPasswordDiv, form.children[4]);
    submitButton.innerHTML = "Sign Up";
    
    if (earlySignUpPrompt === "prompted") {
      document.getElementById("signUpPrompt").remove();
    }
  
    formMode = "signup";
    form.reset();
    form.querySelector("#oldusername").id = "newusername";
    form.querySelector("#newusername").placeholder = "Enter Username";
    earlySignUpPrompt = null;
  }
  
