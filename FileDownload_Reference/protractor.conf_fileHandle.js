const path = require('path');
var downloadloc = path.join(__dirname,'\\Downloads');
var uploadloc = path.join(__dirname,'\\Uploads');

var refData = require('./test_data/reference.json');
/*var os = require('os');
os.tmpDir = os.tmpdir;*/
exports.config = {
    baseUrl: '',
    projectName: 'eBuilder Test Automation',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'features/*.feature'
    ],

    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 240000,
    getPageTimeout: 240000,

    exclude: [],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),


    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: ["typeScript/step_definitions/**/*.js", "typeScript/support/*.js"],
        //format:  ['pretty'],
        format: 'json:Reports/results.json',
        tags: ["@MyTest"]
    },


    seleniumArgs: ['-Dwebdriver.edge.driver=../../driver/MicrosoftWebDriver.exe'],

    localSeleniumStandaloneOpts: {
        jvmArgs: ['-Dwebdriver.edge.driver=../../driver/MicrosoftWebDriver.exe',
        ]
    },

    splitTestsBetweenCapabilities: false,
    capabilities: 
        {
            'browserName': 'chrome',
           // marionette: true,
           // "moz:webdriverClick":false,


            metadata: {
                device: 'PC',
                platform: {
                    name: 'windows'
                }
            },

            
            chromeOptions: {
                'args': ['--no-sandbox', '--test-type=browser'],
                'prefs': {
                    'download': {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory':downloadloc
                    }
                }

            } 
        },
        /* {
             'browserName': 'firefox',
             metadata: {
                 device: 'PC',
               platform: {
                     name: 'windows'
                 }
             }
         }, */
        //
        // {
        //     'browserName': 'MicrosoftEdge',
        //     metadata: {
        //         device: 'PC',
        //         platform: {
        //             name: 'windows'
        //         }
        //     }
        // },
        // {
        //             'browserName': 'internet explorer',
        //             'ignoreProtectedModeSettings': true,
        //             'version': 11,
        //             'nativeEvents': false,
        //             'unexpectedAlertBehaviour': 'accept',
        //             'enablePersistentHover': true,
        //             'disable-popup-blocking': true,
        //             metadata: {
        //                 device: 'PC',
        //                 platform: {
        //                     name: 'windows'
        //                 }
        //             }
        //         },
    

    maxSessions: 4,

   plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            // read the options part
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            reportName: "Bidders Portal E2E Test Suite - " + new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        }
    }],

   // restartBrowserBetweenTests: true,
   ignoreUncaughtExceptions: true,
    getPageTimeout: 60000,
    onPrepare: () => {

        refData.getDownloadLocation = downloadloc;
        refData.getUploadLocation = uploadloc;
        global.globalData = require('./test_data/global.ts');



       /* if(globalData.isApplicationAngular){

            browser.ignoreSynchronization = false;
        }else{
            browser.ignoreSynchronization = true;
        } */
        browser.ignoreSynchronization = true;

        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        global.expect = chai.expect;
        var fs = require('fs');
       function rmDir (dirPath) {
            try { var files = fs.readdirSync(dirPath); }
            catch(e) { return; }
            if (files.length > 0)
            {
                for (var i = 0; i < files.length; i++) {
                    var filePath = dirPath + '/' + files[i];
                    if (fs.statSync(filePath).isFile())
                    {
                        fs.unlinkSync(filePath);
                    }
                    else
                        rmDir(filePath);
                }
            }
           if(downloadloc!==dirPath)
           {
           fs.rmdirSync(dirPath);
           }
        };
        rmDir(downloadloc);

    },

    beforeLaunch: () => {
       console.log("\nStarting tests");
    },

    afterLaunch: () => {

    },

    onComplete: () => {
    },

    onCleanUp: () => {

    },

};
