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
    
    await PassedReg("JoeSmith", "Password1",1,"Functional")
    await PassedReg("Test", "Az1Za2Az3Za4", 2, "Funtional")

    await FailedReg("invalid", "aaaa", 3, "Funtional")
    await FailedReg("invalid 2", "iopahfnpduosfph", 4, "Funtional")


    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places

    await printTotals(time)

    await driver.quit()


}

async function PassedReg(user, pass, num, testType){
    var end;
    var passedOrFailed = "Passed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{

        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.html");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let register = await driver.findElement(By.id("register"))
    
        await username.sendKeys(user)
        await password.sendKeys(pass)
        await register.click()

        actual = await driver.getTitle()
        expected = "Admin"
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

async function FailedReg(user, pass, num, testType){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{
       
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.html");

        let username = await driver.findElement(By.id("username"))
        let password = await driver.findElement(By.id("password"))
        let register = await driver.findElement(By.id("register"))
    
        await username.sendKeys(user)
        await password.sendKeys(pass)
        await register.click()

        actual = await driver.getTitle()
        expected = "Admin"
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
    await console.log("Test Function Call: Failed Registration")
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
RegisterUser();