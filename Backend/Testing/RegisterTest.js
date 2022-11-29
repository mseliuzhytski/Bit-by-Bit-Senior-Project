const assert = require("assert")
const {By,Builder} = require("selenium-webdriver");
require("chromedriver")
const {performance} = require('perf_hooks'); //used to measure time


var driver =  new Builder().forBrowser("chrome").build();
var failed = 0
var passed = 0

async function RegisterUser(){
    var end;
    var start = await performance.now()
    var time;
    await login();
    
    await PassedReg("JoeSmith", "Password1","Joe","Smith",1,"Functional")
    await PassedReg("Test", "Az1Za2Az3Za4","Test","User", 2, "Funtional")

    await FailedReg("invalid", "aaaa","a","b", 3, "Funtional")
    await FailedReg("invalid 2", "iopahfnpduosfph","a","b", 4, "Funtional")


    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places

    await printTotals(time)

    await driver.quit()


}

async function PassedReg(user, pass,fname,lname,num, testType){
    var end;
    var passedOrFailed = "Passed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{

        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.ejs");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let firstname = await driver.findElement(By.id("fName"))
        let lastname = await driver.findElement(By.id("lName"))
        let register = await driver.findElement(By.id("register"))
    
        await username.sendKeys(user)
        await password.sendKeys(pass)
        await firstname.sendKeys(fname)
        await lastname.sendKeys(lname)
        await register.click()

        actual = await driver.getCurrentUrl()
        expected = "https://bit-by-bit-auto-sales.herokuapp.com/Homepage.ejs"
        await assert.equal(actual,expected)
        
        passedOrFailed = "Passed"
        passed += 1

    }catch(error){
        // empty as will denote failed below
        failed += 1
    }

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
    
    await console.log("Test Number: %d", num)
    await console.log("Test Type: %s", testType)
    await console.log("Test Function Call: Passed Registration")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)

}

async function FailedReg(user, pass,fname,lname,num, testType){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{
       
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.ejs");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let firstname = await driver.findElement(By.id("fName"))
        let lastname = await driver.findElement(By.id("lName"))
        let register = await driver.findElement(By.id("register"))
    
        await username.sendKeys(user)
        await password.sendKeys(pass)
        await firstname.sendKeys(fname)
        await lastname.sendKeys(lname)
        await register.click()

        actual = await driver.getCurrentUrl()
        expected = "https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.ejs"
        await assert.equal(actual,expected)
        
        passedOrFailed = "Failed"
        failed += 1

    }catch(error){
        // empty as will denote failed below
        failed += 1
    }

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
    
    await console.log("Test Number: %d", num)
    await console.log("Test Type: %s", testType)
    await console.log("Test Function Call: Failed Registration")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)
}

async function login(){
    try{

        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Login.ejs");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let login = await driver.findElement(By.id("loginSubmit"))

        await username.sendKeys("Admin")
        await password.sendKeys("12345")
        await login.click()

        actual = await driver.getTitle()
        expected = "Landing Page"
        await assert.equal(actual,expected)

    }catch(error){

    }
}


async function printTotals(time){
    let totalTest = passed + failed

    await console.log("*".repeat(15))

    await console.log("Test Passed: %d", passed)
    await console.log("Test Failed: %d", failed)
    await console.log("Total Test Taken: %d", totalTest)
    await console.log("Total Time Taken: %s secs", time)

    await console.log("*".repeat(15))
}
RegisterUser();