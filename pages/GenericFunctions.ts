import {$, browser,By, by, element, ElementFinder} from "protractor";
import {protractor} from "protractor/built/ptor";


export class GenericFunctions {

    public async clickOnElementAndWaitForAngular(Element, elementName): Promise<void> {
        await this.clickOnElement(Element, elementName)
        await browser.waitForAngular();
    }

    public async clickOnElement(Element, elementName): Promise<void> {
        this.log("Clicking on " + elementName+".");
        await Element.isDisplayed();

        try {
            await Element.click();
        }
        catch (e) {
            browser.actions().mouseMove(Element).click().perform();
        }
    }

    public async clickOnElementWithSyncOff(Element, elementName): Promise<void> {
        this.log("Clicking on " + elementName+".");
        await Element.isDisplayed();
        await this.turnSyncOff();
        await Element.click();

    }

    public async enterTextToField(Element, text, fieldName): Promise<string> {
       this.log("Entering text - "+text+", to - "+fieldName+" field.");
        return await Element.sendKeys(text);
    }

    public async enterTextAndSubmit(Element, text, fieldName): Promise<string> {
        this.log("Entering text - "+text+", to - "+fieldName+" field.");
         return await Element.sendKeys(text).perform();
     }


    public async turnSyncOff(): Promise<void> {
        browser.ignoreSynchronization = true;
    }

    public async turnSyncOn(): Promise<void> {
        browser.ignoreSynchronization = false;
    }

    public async waitForElement(element, time): Promise<void> {
        let until = protractor.ExpectedConditions;

        try {
            await browser.wait(until.presenceOf(element), time, 'Element taking too long to appear in the DOM');
        }
        catch (e) {
            console.log('Element taking too long to appear in the DOM');
        }

    }

    public async waitForElementToBePresent(element, time): Promise<void> {
        let until = protractor.ExpectedConditions;
        await browser.wait(until.presenceOf(element), time, 'Element taking too long to appear in the DOM');
    }

    public async isElementPresentWithWait(element, time): Promise<boolean> {
        let until = protractor.ExpectedConditions;
        try {
            await browser.wait(until.presenceOf(element), time);
            return true;
        }
        catch (e) {
            console.log('Element - taking too long to appear in the DOM with time out - ' + time);
            return false;
        }


    }

    public async isElementPresent(element, elementName): Promise<boolean> {
        this.log("Check if element - " + elementName + " present on the page...");
        return await element.isPresent();
    }

    public async isElementPresentAsync(element, elementName): Promise<boolean> {
        //console.log("- Check if element - " + elementName + " present on the page...");

        this.log("Check if element - " + elementName + " present on the page...");
        await this.turnSyncOn();
        await this.turnSyncOff();
        return await element.isPresent();
    }

    public async dirtyWait(time): Promise<void> {
        await browser.driver.sleep(time);
    }

    public async getElementTextAsync(element, elementName): Promise<string> {
       // console.log("- " + message);
        await this.turnSyncOff();
        return await this.getElementText(element, elementName);

    }

    public async getElementText(element, elementName): Promise<string> {
        this.log("Get text of element - " + elementName);
        return await element.getText();
    }

    public async openPage(pageUrl): Promise<void> {
        this.log("Opening page - " + pageUrl);
        await browser.get(pageUrl);
        await browser.waitForAngular();
    }

    public log(message) {
        console.log(new Date().toLocaleTimeString() + " - " + message);
    }


    public async hasAnAttribute(element, attribute) {
        await browser.driver.sleep(2000);
        this.log("Checking element attribute - "+attribute);
        await this.turnSyncOff();
        try {
            return await element.getAttribute(attribute) == 'true';
        }
        catch (e) {
            return false;
        }
    }


    public async selectDropDownByText(text){
       var ele = browser.findElement(by.xpath(".//option[text()='"+text+"']"));
       this.log("Clicking on " + text +".");
       await ele.isDisplayed();
       try {
           await ele.click();
       }
       catch (e) {
           browser.actions().mouseMove(ele).click().perform();         
       }
       
    }

    public async selectMenuTab(tabName){
        var ele = browser.findElement(by.xpath(".//*[contains(@id,'tab"+tabName+"')]/a"));
        this.log("Clicking on " + tabName +".");
        await ele.isDisplayed();
        try {
            await ele.click();
        }
        catch (e) {
            browser.actions().mouseMove(ele).click().perform();          
        }
    }

      
    public async selectProjectByText(element,text){
        await this.clickOnElement(element,"Drop Down Arrow Item");
        var ele = browser.findElement(by.xpath(".//*[text()=' "+text+" ']"));
        this.log("Clicking on " + text +".");
        await ele.isDisplayed();
 
        try {
            await ele.click();
        }
        catch (e) {
            browser.actions().mouseMove(ele).click().perform();
           
        }
        
     }
 
 
       
    

}