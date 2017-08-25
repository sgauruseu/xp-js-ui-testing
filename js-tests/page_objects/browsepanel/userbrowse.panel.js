/**
 * Created on 5/31/2017.
 */
var page = require('../page');
var panel = {
    toolbar: `//div[contains(@id,'UserBrowseToolbar')]`,
    rowByName: function (name) {
        return `//div[contains(@id,'NamesView') and child::p[contains(@class,'sub-name') and contains(.,'${name}')]]`
    },
    expanderIconByName: function (name) {
        return this.rowByName(name) +
               `/ancestor::div[contains(@class,'slick-cell')]/span[contains(@class,'collapse') or contains(@class,'expand')]`;

    },
}
var userBrowsePanel = Object.create(page, {

    waitForPanelVisible: {
        value: function (ms) {
            return this.waitForVisible(`${panel.toolbar}`, ms);
        }
    },
    isExist: {
        value: function (itemName) {
            return this.waitForVisible(`${panel.rowByName(itemName)}`, 1000).catch(()=> {
                console.log("item was not found:" + itemName);
                return false;
            });
        }
    },
    waitForFolderUsersVisible: {
        value: function () {
            return this.waitForVisible(`${panel.rowByName('users')}`, 1000).catch(()=> {
                console.log("element is not visible: row with Users");
                throw new Error(`element was not found! Users folder was not found! `);
            });
        }
    },
    newButton: {
        get: function () {
            return `${panel.toolbar}/*[contains(@id, 'ActionButton') and child::span[text()='New']]`
        }
    },
    editButton: {
        get: function () {
            return `${panel.toolbar}/*[contains(@id, 'ActionButton') and child::span[text()='Edit']]`;
        }
    },

    deleteButton: {
        get: function () {
            return `${panel.toolbar}/*[contains(@id, 'ActionButton') and child::span[text()='Delete']]`;
        }
    },

    clickOnNewButton: {
        value: function () {
            return this.doClick(this.newButton);
        }
    },
    clickOnEditButton: {
        value: function () {
            return this.doClick(this.editButton);
        }
    },
    clickOnDeleteButton: {
        value: function () {
            return this.doClick(this.deleteButton);
        }
    },

    waitForNewButtonEnabled: {
        value: function () {
            return this.waitForEnabled(this.newButton, 3000);
        }
    },
    isDeleteButtonEnabled: {
        value: function () {
            return this.isEnabled(this.deleteButton);
        }
    },
    isEditButtonEnabled: {
        value: function () {
            return this.isEnabled(this.editButton);
        }
    },
    clickOnRowByName: {
        value: function (name) {
            var displayNameXpath = panel.rowByName(name);
            return this.doClick(displayNameXpath);
        }
    },
    clickOnExpanderIcon: {
        value: function (name) {
            var expanderIcon = panel.expanderIconByName(name);
            return this.doClick(expanderIcon);
        }
    }
});
module.exports = userBrowsePanel;


