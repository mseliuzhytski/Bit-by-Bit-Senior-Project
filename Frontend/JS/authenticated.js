var isUserAuth


const isAuth = async () => {
    const res = await fetch('http://localhost:8000/isAuthenticated')
    return await res.json()
}

window.addEventListener('load', async function () {
    isUserAuth = await isAuth()
    console.log(isUserAuth)
    if (!isloggedin(isUserAuth)) return
    
    if(window.location.pathname === '/login.html') window.location.href = "/"

    const userdata = getuserdata(isUserAuth)
    let adminPanel = document.createElement("div");
    adminPanel.style.display = "flex"
    adminPanel.style.background = "green"
    adminPanel.style.color = "white"
    adminPanel.style.padding = "20px"
    adminPanel.style.justifyContent = "end"


    adminPanel.innerHTML = `
        <div style="margin:10px"><b>NAME : </b> ${userdata.Emp_FirstName} ${userdata.Emp_LastName}</div>
        <div style="margin:10px"><b>ID : </b> ${userdata.Emp_ID}</div>
        <div style="margin:10px"><b>ROLE : </b> ${userdata.Emp_Role}</div>
        <div style="margin:10px; float:right"><form action="/logout" method="get"><input style="width: 72px;padding: 8px;background: #d2232a;border: none;color: white;cursor: pointer;" type="submit" value="Logout" /></form></div>
    `
    document.body.prepend(adminPanel)

})

function isloggedin(isUserAuth) {
    return 'userInfo' in isUserAuth
}
function getuserdata(isUserAuth) {
    if (isloggedin(isUserAuth)) return isUserAuth.userInfo
    else return null
}