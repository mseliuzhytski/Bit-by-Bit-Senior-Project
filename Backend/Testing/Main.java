import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Main {

    public static void main(String[] args) {
        System.out.println("Hello world!");

        Test test = new Test();

        test.setDriver();

    }
}

class Test{


    public void setDriver() {

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

          driver.close(); // close the browser

    }
}