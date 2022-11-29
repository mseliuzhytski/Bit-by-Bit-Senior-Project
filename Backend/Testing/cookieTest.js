const assert = require("assert")
const {By,Builder} = require("selenium-webdriver");
require("chromedriver")
const {performance} = require('perf_hooks'); //used to measure time

var passed = 0;
var failed = 0;
var driver =  new Builder().forBrowser("chrome").build();

test()

async function test(){
    var end;
    var start = await performance.now()
    var time;

    await testPublicLinksWithoutClearance()
    await testNonPublicLinksWithOutClearance()

    await login()

    await testPublicLinksWithClearance()
    await testNonPublicLinksWithClearance()

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places

    await printTotals(time)

    await driver.quit()
}


async function testPublicLinksWithClearance(){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{

        //Home
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Homepage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Search
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Search.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //About Us
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Aboutus.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Contact Us
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ContactUs.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Apply Now
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ApplyNow.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        passedOrFailed = "Passed"
        passed += 1

    }catch(error){
        failed += 1

    }
    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
        
    await console.log("Test Number: %d", 3)
    await console.log("Test Type: %s", "Unit Test")
    await console.log("Test Function Call: Test Public Links with clearance")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)
}

async function testPublicLinksWithoutClearance(){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))

    try{
        //Home
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Homepage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Search
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Search.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //About Us
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/Aboutus.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Contact Us
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ContactUs.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Apply Now
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ApplyNow.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        passedOrFailed = "Passed"
        passed += 1

    }catch(error){
        failed += 1
    }

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
        
    await console.log("Test Number: %d", 1)
    await console.log("Test Type: %s", "Unit Test")
    await console.log("Test Function Call: Test Public Links without clearance")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)
}

async function testNonPublicLinksWithClearance(){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))
    
    try{

        //Admin Page
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/AdminPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Change Password
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ChangePassword.ejs");
        actual = await driver.getTitle()
        expected = "Change Password"
        await assert.equal(actual,expected)

        //Landing Page
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/LandingPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        //Resgister User
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.equal(actual,expected)

        passedOrFailed = "Passed"
        passed += 1

    }catch(error){
        failed += 1
    }

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
        
    await console.log("Test Number: %d", 4)
    await console.log("Test Type: %s", "Unit Test")
    await console.log("Test Function Call: Test Non-Public Links with clearence")
    await console.log("Time Taken: %d secs", time)
    await console.log("Passed/Failed: %s", passedOrFailed)
}

async function testNonPublicLinksWithOutClearance(){
    var end;
    var passedOrFailed = "Failed"
    var start = await performance.now()
    var time;

    // adds the seperator between segments
    await console.log("*".repeat(15))
    
    try{
        //Admin Edit Page
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/AdminEditPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        //Admin Page
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/AdminPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        //Change Password
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ChangePassword.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        //Edit Inventory
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/EditInventoryPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        //Landing Page
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/LandingPage.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        //Resgister User
        await driver.get("https://bit-by-bit-auto-sales.herokuapp.com/RegisterUser.ejs");
        actual = await driver.getTitle()
        expected = "Okaidi Auto Sales"
        await assert.notEqual(actual,expected)

        passedOrFailed = "Passed"
        passed += 1

    }catch(error){
        failed += 1
    }

    end = await performance.now()
    time = (end - start) / 1000    //unlimited decimal places and put to seconds
    time = await time.toFixed(2)   //rounded to 2 decimal places
        
    await console.log("Test Number: %d", 2)
    await console.log("Test Type: %s", "Unit Test")
    await console.log("Test Function Call: Test Non-Public Links without clearence")
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
        expected = "Okaidi Auto Sales"
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