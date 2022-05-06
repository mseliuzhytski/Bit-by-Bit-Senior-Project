// form variable declarations
const loginForm = document.getElementById("loginForm");
const loginSubmit = document.getElementById("loginSubmit");

// key listener for the submit button of the login credentials on Login.html
loginSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    // variable definition section
    const username = loginForm.username.value;
    const password = loginForm.password.value;


    if(username == "newUser" && password == "newPass"){
        // routes to homepage currently it needs to be updated to proper route when ready
        location.replace("../Pages/Homepage.html");
    }
    else if(username == "" || password == ""){
        loginForm.reset();
        alert("Missing Username or Password. Please Try again.");
    }
    else if(username == "user"){
        loginForm.reset();
        alert("Username already exists in database. Please Try again.");
    }
    else if(username.length > 16){
        // max length can be changed later
        loginForm.reset();
        alert("Maximum size of user name is 16 characters. Please Try again.");
    }
    else if(password.length < 8){
        // max length can be changed later
        loginForm.reset();
        alert("Minimum size of password is 8 characters. Please Try again.");
    }
    else{
        loginForm.reset();
        alert("Invalid new username or password. Please try again.");
    }
});
