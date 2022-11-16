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
    
    await loginTestWithCorrectLogin("Admin", "12345", 1, "Funtional")
    await loginTestWithCorrectLogin("moham4321", "Qwerty12345", 2, "Funtional")

    await loginTestWithInvalidLogin("invalid", "Qwerty2019", 3, "Funtional")
    await loginTestWithInvalidLogin("bookworm916", "Pass1234", 4, "Funtional")


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

            await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Login.ejs");

            let username = await driver.findElement(By.id("username"))
            let password = await driver.findElement(By.id("password"))
            let login = await driver.findElement(By.id("loginSubmit"))

            await username.sendKeys(user)
            await password.sendKeys(pass)
            await login.click()
    
            actual = await driver.getTitle()
            expected = "Landing Page"
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

        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Login.ejs");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let login = await driver.findElement(By.id("loginSubmit"))

        await username.sendKeys(user)
        await password.sendKeys(pass)
        await login.click()

        actual = await driver.getTitle()
        expected = "Login"
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
    await console.log("Test Function Call: login With Invalid Login")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)

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