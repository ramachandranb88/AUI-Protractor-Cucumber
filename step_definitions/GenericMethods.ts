import {$, browser,By, by, element, ElementFinder} from "protractor";
import {protractor} from "protractor/built/ptor";
import {Given, Then, When} from "cucumber";
import {async} from "q";

const expect = require("chai").use(require("chai-as-promised")).expect;



Given(/^User accesses the test url "([^"]*)"$/,async (testURL)=>{
  await  browser.get(testURL).then(function () {
         browser.waitForAngularEnabled(false);      
         });
});
