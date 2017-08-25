function Page() {
    this.browser = null;
}

Page.prototype.init = function (browser) {
    this.browser = browser;
}

Page.prototype.getTitle = function () {
    return this.browser.getTitle();
};

Page.prototype.isVisible = function (selector) {
    return this.browser.isVisible(selector);
};

Page.prototype.isEnabled = function (selector) {
    return this.browser.isEnabled(selector);
};

Page.prototype.isDisabled = function (selector) {
    return this.browser.isDisabled(selector);
};

Page.prototype.waitForVisible = function (selector, ms) {
    return this.browser.waitForVisible(selector, ms);
};

Page.prototype.doClick = function (selector) {
    return this.browser.click(selector);
};

Page.prototype.typeTextInInput = function (selector, text) {
    return this.browser.setValue(selector, text);
};

Page.prototype.getText = function (selector) {
    return this.browser.getText(selector);
};
Page.prototype.waitForExist = function (selector, ms) {
    return this.browser.waitForExist(selector, ms);
};

Page.prototype.waitForEnabled = function (selector, ms) {
    return this.browser.waitForEnabled(selector, ms);
};

Page.prototype.getText = function (selector) {
    return this.browser.getText(selector);
};

Page.prototype.getTextFromInput = function (selector) {
    return this.browser.getAttribute(selector, 'value');
};
Page.prototype.waitForNotificationMessage = function () {
    return this.browser.waitForVisible(`//div[@class='notification-content']/span`).then(()=> {
        return this.browser.getText(`//div[@class='notification-content']/span`);
    })
};

Page.prototype.waitForErrorNotificationMessage = function () {
    var msg = "//div[contains(@id,'NotificationMessage') and @class='notification error']//div[contains(@class,'notification-content')]/span";
    return this.browser.waitForVisible(msg).then(()=> {
        return this.browser.getText(msg);
    })
};

module.exports = new Page();
