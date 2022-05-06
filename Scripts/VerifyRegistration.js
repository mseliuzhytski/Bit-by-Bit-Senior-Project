// form variable declarations
const loginForm = document.getElementById("loginForm");
const loginSubmit = document.getElementById("loginSubmit");

// key listener for the submit button of the login credentials on Login.html
loginSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    // variable definition section
    const username = loginForm.username.value;
    const password = loginForm.password.value;


    if(username == "user" && password == "pass"){
        // routes to homepage currently it needs to be updated to proper route when ready
        location.replace("../Pages/Homepage.html");
    }
    else if(username == "" || password == ""){
        loginForm.reset();
        alert("Missing Username or Password. Please Try again.");
    }
    else{
        loginForm.reset();
        alert("Invalid Login. Please try again.");
    }
});
