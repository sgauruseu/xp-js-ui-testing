/**
 * Created  on 6/29/2017.
 */
var page = require('./page')
var dialog = {
    container: `//div[contains(@id,'ConfirmationDialog')]`,
};
var confirmationDialog = Object.create(page, {

    warningMessage: {
        get: function () {
            return `${dialog.container}//h6[text()='There are unsaved changes, do you want to save them before closing?']`;
        }
    },

    waitForDialogVisible: {
        value: function (ms) {
            return this.waitForVisible(`${dialog.container}`, ms);
        }
    },
    isWarningMessageVisible: {
        value: function (ms) {
            return this.isVisible(this.warningMessage, ms);
        }
    },
    noButton: {
        value: function () {
            return `${dialog.container}//div[@class='dialog-buttons']//button/span[text()='No']`
        }
    },

    yesButton: {
        value: function () {
            return `${dialog.container}//button[contains(@id,'DialogButton') and child::span[text()='Yes']]`

        }
    },

    clickOnYesButton: {
        value: function () {
            return this.doClick(this.yesButton);
        }
    },

    clickOnNoButton: {
        value: function () {
            return this.doClick(this.noButton);
        }
    },
});
module.exports = confirmationDialog;




