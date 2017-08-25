/**
 * Created on 5/30/2017.
 */
const chai = require('chai');
var expect = chai.expect;
const assert = chai.assert;
const webdriverio = require('webdriverio');
var userStoreWizard = require('../page_objects/wizardpanel/userstore.wizard');
var userBrowsePanel = require('../page_objects/browsepanel/userbrowse.panel');
const testUtils = require('../libs/test.utils');

describe('login page with page object spec ', function () {
    this.timeout(70000);
    var client;
    before(function () {
        client = webdriverio.remote({desiredCapabilities: {browserName: 'chrome', platform: 'WINDOWS'}});
        userBrowsePanel.init(client);
        return client.init().url('http://localhost:8080/admin/tool');
    });

    it('GIVEN users app is opened WHEN `New` button has been pressed THEN `User Store Wizard` should be present', () => {
        return client.click(userBrowsePanel.newButton).waitForVisible(userStoreWizard.displayNameInput).then(result=> {
            assert.isTrue(result, 'display name input should be present');
        });
    });

    beforeEach(() => testUtils.navigateToUsersApp(client));
    afterEach(() => testUtils.doCloseUsersApp(client));
    after(() => client.end());
});



