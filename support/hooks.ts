import {Before} from "cucumber";

const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { browser } from "protractor";
var count=0;
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(100 * 100);

BeforeAll({timeout: 100 * 1000}, async() => {

    await browser.manage().window().maximize();
    await browser.manage().timeouts().implicitlyWait(2000);
    await console.log("\n Test suite started!" );
    await console.log(" ====================================================================");
    setDefaultTimeout(100 * 1000);
});

Before(async function(scenario) {
    count++;
    await console.log("\n" + count+". Stared test - " + scenario.pickle.name);
    await console.log("---------------------------------------------------------------------");
});

After( async function (scenario)  {
    await console.log("\nTests ended.");
    await console.log("---------------------------------------------------------------------");
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, "image/png");
    }
});

AfterAll({timeout: 100 * 1000}, async ()=> {
    await console.log("\n Test suite execution finished!");
    await console.log("====================================================================");
    await browser.quit();
});
