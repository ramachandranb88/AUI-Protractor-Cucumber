const path = require('path');
var downloadloc = path.join(__dirname, '\\Downloads');
var refData = require('./test_data/reference.json');
var os = require('os');
os.tmpDir = os.tmpdir;
exports.config = {
    baseUrl: '',
    projectName: 'Protractor Demo Test Automation',
    specs: [
        'features/*.feature'
    ],

    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 40000,
    getPageTimeout: 120000,
    exclude: [],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),


    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: ["typeScript/step_definitions/**/*.js", "typeScript/support/*.js"],
        //format:  ['pretty'],
        format: 'json:Reports/results.json',
        tags: ["@SmokeTest"]
    },


    seleniumArgs: ['-Dwebdriver.edge.driver=../../driver/MicrosoftWebDriver.exe'
    ],

    localSeleniumStandaloneOpts: {
        jvmArgs: ['-Dwebdriver.edge.driver=../../driver/MicrosoftWebDriver.exe',
        ]
    },

    seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  /*  multiCapabilities: [
        {
            'browserName': 'chrome',
            'browserstack.user': 'fnlondon1',
            'browserstack.key': '9khcGxJHkCsq92kVbndG',
            'browserstack.local': false,
            'browserstack.debug': true,
            'build': 'Demo-Build',
            'project': 'Demo-Project'
        },

        {
            'browserstack.user': 'fnlondon1',
            'browserstack.key': '9khcGxJHkCsq92kVbndG',
            'browserName': 'Safari',
            'device': 'iPhone 7',
            'realMobile': 'true',
            'os_version': '10.3',
            'browserstack.debug': true,
            'build': 'Demo-Build',
            'project': 'Demo-Project'
        },

        {
            'browserstack.user': 'fnlondon1',
            'browserstack.key': '9khcGxJHkCsq92kVbndG',
            'browserName': 'chrome',
            'device': 'Samsung Galaxy S9',
            'realMobile': 'true',
            'os_version': '8.0',
            'browserstack.debug': true,
            'build': 'Demo-Build',
            'project': 'Demo-Project'
        }


    ],*/ 

     splitTestsBetweenCapabilities: false,
        seleniumAddress: 'http://localhost:4444/wd/hub',
       multiCapabilities: [
           {
               'browserName': 'chrome',
   
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
     ],

    maxSessions: 4,

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            // read the options part
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            reportName: "Protractor Demo Test Suite - " + new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        }
    }],

    onPrepare: () => {

        refData.getDownloadLocation = downloadloc;
        global.globalData = require('./test_data/global.js');
        browser.manage().timeouts().pageLoadTimeout(120000);
        browser.manage().timeouts().implicitlyWait(25000);

        browser.ignoreSynchronization = true;

        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        global.expect = chai.expect;
        var fs = require('fs');
        function rmDir(dirPath) {
            try { var files = fs.readdirSync(dirPath); }
            catch (e) { return; }
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var filePath = dirPath + '/' + files[i];
                    if (fs.statSync(filePath).isFile()) {
                        fs.unlinkSync(filePath);
                    }
                    else
                        rmDir(filePath);
                }
            }
            if (downloadloc !== dirPath) {
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