import {$, browser, By, by, element, ElementFinder, ElementArrayFinder} from "protractor";
import {GenericFunctions} from "./GenericFunctions";
import {protractor} from "protractor/built/ptor";

const expect = require("chai").use(require("chai-as-promised")).expect;


export class HomePageObjects extends GenericFunctions{

       public closeSubscribe: ElementFinder= element(By.id("close-icon"));
       public homePage_Logo: ElementFinder = element(By.css("div.logo_img a img"));
       public nav_Menus   : ElementArrayFinder = element.all(By.xpath(".//*[@id='menu']/ul/li"));
       public nav_SubMenus : ElementArrayFinder = element.all(By.xpath(".//*[@class='sub-menu']/li"));

       public async verifyHomePage(): Promise<void> {
        await this.waitForElement(this.homePage_Logo,5000)
        await this.homePage_Logo.getAttribute("alt").then(function(text){
              console.log('Home page logo text - '+text);
              expect(text,'Home page Logo not displayed or Text mismatch').equal('GlobalSQA');
        });
    }

    public async subMenu(element,linkIndex):Promise<Element>{
        return await element.all(By.xpath(".//*[@class='sub-menu']/li")).get(linkIndex);
    }

}