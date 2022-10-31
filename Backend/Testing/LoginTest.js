const assert = require("assert")
const {By,Builder} = require("selenium-webdriver");
require("chromedriver")
const {performance} = require('perf_hooks'); //used to measure time


var driver =  new Builder().forBrowser("chrome").build();
var failed = 0
var passed = 0


Tester();

async function Tester(){
    var end;
    var start = await performance.now()
    var time;
    
    await loginTestWithCorrectLogin("ABCdefGHIjklMNOpqrSTUvwxYz", "Qwerty2022", 1, "Funtional")
    await loginTestWithCorrectLogin("tester", "Az1Za2Az3Za4", 2, "Funtional")

    await loginTestWithInvalidLogin("invalid", "Qwerty2019", 3, "Funtional")
    await loginTestWithInvalidLogin("invalid 2", "Pass1234", 4, "Funtional")


    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places

    await printTotals(time)

    await driver.quit()
}

async function loginTestWithCorrectLogin(user, pass, num, testType){
        var end;
        var passedOrFailed = "Failed"
        var start = await performance.now()
        var time;

        // adds the seperator between segments
        await console.log("*".repeat(15))

        try{
            // setups an account for the test since database isn't connected
            await register(user,pass)

            await driver.get("https://okaidi-auto-sales.herokuapp.com/Login.html");

            let username = await driver.findElement(By.id("username"))
            let password = await driver.findElement(By.id("password"))
            let login = await driver.findElement(By.id("loginSubmit"))

            await username.sendKeys(user)
            await password.sendKeys(pass)
            await login.click()
    
            actual = await driver.getTitle()
            expected = "Okaidi Auto Sales"
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
        await console.log("Test Function Call: login With Correct Login")
        await console.log("Time Taken: %d secs", time)
        await console.log("Passed/Failed: %s", passedOrFailed)
}

async function loginTestWithInvalidLogin(user, pass, num, testType){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{
        // setups an account for the test since database isn't connected
        await register(user + "j", pass)

        await driver.get("https://okaidi-auto-sales.herokuapp.com/Login.html");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let login = await driver.findElement(By.id("loginSubmit"))

        await username.sendKeys(user)
        await password.sendKeys(pass)
        await login.click()

        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)
        
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
    await console.log("Test Function Call: login With Invalid Login")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)

}
 
async function register(user, pass){
    await driver.get("https://okaidi-auto-sales.herokuapp.com/RegisterUser.html");

    let username = await driver.findElement(By.id("username"))
    let password = await driver.findElement(By.id("password"))
    let register = await driver.findElement(By.id("register"))

    await username.sendKeys(user)
    await password.sendKeys(pass)
    await register.click()
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