const {Builder,By,Key} = require ("selenium-webdriver");
const assert = require("assert");

async function testone() {

    //browser
    let driver = await new Builder().forBrowser("firefox").build();


    //get the end point 
    await driver.get("https://okaidi-auto-sales.herokuapp.com/ChangePassword.html");



    //get the elements 
    await driver.findElement(By.id("username")).sendKeys("aziz");
    await driver.findElement(By.id("oldPassword")).sendKeys("Ahwazcity1");
    await driver.findElement(By.id("newPassword")).sendKeys("Ahwaz916");
    await driver.findElement(By.id("changeSubmit")).click();

    // current page
    let strURL = driver.getCurrentUrl();

    if(strURL === "https://okaidi-auto-sales.herokuapp.com/change") {
        console.log("Test Passed");
    }
    
    else {
        console.log("Test failed");
    }

    await driver.quit();

}

async function testtwo() {

    //browser
    let driver = await new Builder().forBrowser("firefox").build();


    //get the end point 
    await driver.get("https://okaidi-auto-sales.herokuapp.com/ChangePassword.html");



    //get the elements 
    await driver.findElement(By.id("username")).sendKeys("aziz");
    await driver.findElement(By.id("oldPassword")).sendKeys("Ahwazcity1");
    await driver.findElement(By.id("newPassword")).sendKeys("11111111111");
    await driver.findElement(By.id("changeSubmit")).click();

    // current page
    let strURL = driver.getCurrentUrl();

    if(strURL === "https://okaidi-auto-sales.herokuapp.com/change") {
        console.log("Test Passed");
    }
    
    else {
        console.log("Test failed");
    }

    await driver.quit();

}

async function testthree() {

    //browser
    let driver = await new Builder().forBrowser("firefox").build();


    //get the end point 
    await driver.get("https://okaidi-auto-sales.herokuapp.com/ChangePassword.html");



    //get the elements 
    await driver.findElement(By.id("username")).sendKeys("aziz");
    await driver.findElement(By.id("oldPassword")).sendKeys("Ahwazcity1");
    await driver.findElement(By.id("newPassword")).sendKeys("justletters");
    await driver.findElement(By.id("changeSubmit")).click();

    // current page
    let strURL = driver.getCurrentUrl();

    if(strURL === "https://okaidi-auto-sales.herokuapp.com/change") {
        console.log("Test Passed");
    }
    
    else {
        console.log("Test failed");
    }

    await driver.quit();

}

testone();
testtwo();
testthree();