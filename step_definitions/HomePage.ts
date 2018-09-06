import {$, browser,By, by, element, ElementFinder} from "protractor";
import {protractor} from "protractor/built/ptor";
import {Given, Then, When} from "cucumber";
import {async} from "q";
import {GenericFunctions} from "../pages/GenericFunctions";
import {HomePageObjects} from "../pages/HomePageObjects";
import { CommonPageObjects } from "../pages/commonPageObjects";


const expect = require("chai").use(require("chai-as-promised")).expect;
var refData = require('../../test_data/reference.json');
const genericFunctions:  GenericFunctions = new GenericFunctions();
const commonPage : CommonPageObjects = new CommonPageObjects();
const homePage: HomePageObjects = new HomePageObjects();


Then(/^User should be landed into home page$/,async()=>{ 
    await homePage.verifyHomePage();
});

Then(/^User navigates to Menu page - Testers hub$/,async()=>{
    await genericFunctions.clickOnElement(homePage.nav_Menus.get(2),'Menu link - Testers Hub');
    await commonPage.verifyPageHeader('Tester’s Hub');
});

Then(/^User navigates to Sub Menu page - Online Training$/,async()=>{
   await browser.actions().mouseMove(homePage.nav_Menus.get(3)).perform();
   await homePage.subMenu(homePage.nav_Menus.get(3),0).then(function(ele){
       genericFunctions.clickOnElement(ele,'Sub Menu link - Online Training');
   });
   await commonPage.verifyPageHeader('Online Trainings');

});