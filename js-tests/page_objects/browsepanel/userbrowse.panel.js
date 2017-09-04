/**
 * Created on 5/31/2017.
 */
var page = require('../page');
var panel = {
    toolbar: `//div[contains(@id,'UserBrowseToolbar')]`,
    grid: `//div[@class='grid-canvas']`,
    rowByName: function (name) {
        return `//div[contains(@id,'NamesView') and child::p[contains(@class,'sub-name') and contains(.,'${name}')]]`
    },
    expanderIconByName: function (name) {
        return this.rowByName(name) +
               `/ancestor::div[contains(@class,'slick-cell')]/span[contains(@class,'collapse') or contains(@class,'expand')]`;

    },
    closeItemTabButton: function (name) {
        return `//div[contains(@id,'AppBar')]//li[contains(@id,'AppBarTabMenuItem') and child::a[@class='label' and text() ='${name}']]/button`;
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
    waitForUsersGridLoaded: {
        value: function (ms) {
            return this.waitForVisible(`${panel.grid}`, ms).then(()=> {
                return this.waitForSpinnerNotVisible();
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    waitForSpinnerNotVisible: {
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
            return this.waitForVisible(displayNameXpath, 2000).then(()=> {
                return this.doClick(displayNameXpath);
            }).catch(()=> {
                throw Error('Row with the name ' + name + ' was not found')
            })
        }
    },
    doClickOnCloseTabButton: {
        value: function (displayName) {
            return this.doClick(`${panel.closeItemTabButton(displayName)}`);
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


