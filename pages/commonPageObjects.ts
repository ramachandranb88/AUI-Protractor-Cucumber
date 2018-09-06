import {$, browser, By, by, element, ElementFinder, ElementArrayFinder} from "protractor";
import {GenericFunctions} from "./GenericFunctions";
import {protractor} from "protractor/built/ptor";

const expect = require("chai").use(require("chai-as-promised")).expect;


export class CommonPageObjects extends GenericFunctions{

    public pageHeader   : ElementFinder = element(By.className("page_heading"));

    public async verifyPageHeader(headerText):Promise<void>{
       await this.pageHeader.getText().then(function(text){
            console.log('Page Header - '+text);
            expect(text,'Page Header not displayed or Text mismatch').equal(headerText);
        });
    }




}