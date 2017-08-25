/**
 * Created by on 6/26/2017.
 */
var page = require('./page');
var panel = {
    container: `div[class^='launcher-main-container']`
};

var launcherPanel = Object.create(page, {
    /**
     * define elements
     */
    homeLink: {
        get: function () {
            return `${panel.container} input[id^='password-input']`;
        }
    },
    applications: {
        value: function (userName) {
            return this.typeTextInInput(this.usernameInput, userName);
        }
    },
    contentStudioLink: {
        get: function () {
            return `button[id^='login-button']`
        }
    },
    usersLink: {
        get: function () {
            return `${panel.container} a[data-id*='app.users']`
        }
    },

    clickOnUsersLink: {
        value: function () {
            return this.doClick(this.usersLink);
        }
    },
    isVisible: {
        value: function (ms) {
            return this.waitForExist(this.usernameInput, ms);
        }
    },
    waitForPanelVisible: {
        value: function (ms) {
            return this.waitForVisible(`${panel.container}`, ms);
        }
    },

});
module.exports = launcherPanel;
