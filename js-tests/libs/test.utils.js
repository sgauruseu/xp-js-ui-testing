/**
 * Created on 6/28/2017.
 */
const launcherPanel = require('../page_objects/launcher.panel');
const homePage = require('../page_objects/home.page');
const loginPage = require('../page_objects/login.page');
const userBrowsePanel = require('../page_objects/browsepanel/userbrowse.panel');
const userStoreWizard = require('../page_objects/wizardpanel/userstore.wizard');
module.exports = {
    xpTabs: {},
    navigateToUsersApp: function (browser) {
        launcherPanel.init(browser);
        return launcherPanel.waitForPanelVisible(500).then(()=> {
            console.log("'user browse panel' should be loaded");
            return launcherPanel.clickOnUsersLink();
        }).then(()=> {
            return this.doSwitchToUsersApp(browser);
        }).catch(()=> {
            return this.doLoginAndSwitchToUsers(browser);
        })
    },

    doSwitchToUsersApp: function (browser) {
        console.log('testUtils:switching to users app...');
        return browser.getTabIds().then(tabs => {
            this.xpTabs = tabs;
            return browser.switchTab(this.xpTabs[1]);
        });
    },

    doLoginAndSwitchToUsers: function (browser) {
        loginPage.init(browser);
        return loginPage.doLogin().then(()=> {
            homePage.init(browser);
            return homePage.waitForXpTourVisible(2000);
        }).then(()=> {
            return homePage.doCloseXpTourDialog();
        }).then(()=> {
            launcherPanel.init(browser);
            return launcherPanel.clickOnUsersLink().pause(1000);
        }).then(()=> {
            return this.doSwitchToUsersApp(browser);
        });
    },

    doCloseUsersApp: function (browser) {
        return browser.close().pause(300).then(()=> {
            return browser.switchTab(this.xpTabs[0]);
        })
    },
    doAddUserStore: function (browser, userStoreData) {
        userBrowsePanel.init(browser);
        userStoreWizard.init(browser);
        return userBrowsePanel.clickOnNewButton().then(()=>userStoreWizard.typeData(userStoreData)).then(
            ()=> {
                console.log("button Save has been pressed");
                return userStoreWizard.doSave();
            }).then(()=> {
            console.log("do close the User Store tab");
            userStoreWizard.doClickOnCloseTabButton(userStoreData.displayName);
        }).catch(()=> {
            browser.saveScreenshot('err_creating_store')
            throw new Error(`User Store was not created!`);
        })
    },

    doOpenUserStoreWizard: function (browser, userStoreData) {
        userBrowsePanel.init(browser);
        userStoreWizard.init(browser);
        return userBrowsePanel.clickOnNewButton().then(()=>userStoreWizard.waitForOpened());
    },
};
