import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class Testing {

    public void applyNowPageEmailCHeck() {

        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\mrazi\\OneDrive\\Desktop\\CSC_191\\driver\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ApplyNow.ejs");// Add the URL for Contact Us Page

        driver.findElement(By.id("fname")).sendKeys("aziz");
        driver.findElement(By.id("lname")).sendKeys("ameri");
        driver.findElement(By.id("contact")).sendKeys("mr.azizameri@gmail.com");
        driver.findElement(By.id("stockNumber")).sendKeys("150");
        driver.findElement(By.xpath("/html/body/div[4]/div/form/button")).click();


        String currURL = driver.getCurrentUrl();    // get the currant page after adding the email and other info attempt


        if (currURL.equals("https://bit-by-bit-auto-sales.herokuapp.com/ApplyNow.ejs")) {

            System.out.println("Test passed");
        }

        else
            System.out.println("Test filed");



        driver.quit();

    }

    public void contactUsPageEmailCheck() {

        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\mrazi\\OneDrive\\Desktop\\CSC_191\\driver\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://bit-by-bit-auto-sales.herokuapp.com/ContactUs.ejs");// Add the URL for Contact Us Page

        driver.findElement(By.id("fname")).sendKeys("aziz");
        driver.findElement(By.id("lname")).sendKeys("ameri");
        Select email = new Select(driver.findElement(By.id("contact")));
        email.selectByValue("Email");
        driver.findElement(By.id("contact")).sendKeys("mr.azizameri@gmail.com");
        driver.findElement(By.id("subject")).sendKeys("for testing");
        driver.findElement(By.xpath("/html/body/div[4]/div[3]/div/form/input[4]")).click();

        String currURL = driver.getCurrentUrl();    // get the currant page after adding the email and other info attempt


        if (currURL.equals("https://bit-by-bit-auto-sales.herokuapp.com/ContactUs.ejs")) {

            System.out.println("Test passed");
        }

        else
            System.out.println("Test filed");



        driver.quit();

    }


    public void setPasswordPage() {

        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\mrazi\\OneDrive\\Desktop\\CSC_191\\driver\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://okaidi-auto-sales.herokuapp.com/ChangePassword.html"); // get the URL for password change page

        driver.findElement(By.id("username")).sendKeys("aziz"); // Add the username here
        driver.findElement(By.id("oldPassword")).sendKeys("Ahwazcity1"); // Add the old password here
        driver.findElement(By.id("newPassword")).sendKeys("Ahwaz916"); // Add the new password here
        driver.findElement(By.id("changeSubmit")).click();

        String strURL = driver.getCurrentUrl(); // get the currant page after password change attempt

        if (strURL.equals("https://okaidi-auto-sales.herokuapp.com/change")) { // check the currant page with successful password change page
            System.out.println("Test passed");
        }
        else {
            System.out.println("Test filed");
        }

        driver.quit(); // close the browser

    }

}
