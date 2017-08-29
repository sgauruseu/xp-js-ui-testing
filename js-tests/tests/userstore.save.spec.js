/**
 * Created on 6/29/2017.
 */
const chai = require('chai');
const assert = chai.assert;
const webdriverio = require('webdriverio');
const userBrowsePanel = require('../page_objects/browsepanel/userbrowse.panel');
const userStoreWizard = require('../page_objects/wizardpanel/userstore.wizard');
const testUtils = require('../libs/test.utils');
const userItemsBuilder = require('../libs/userItems.builder.js');

describe('User Store saving and deleting spec', function () {
    this.timeout(70000);
    var client;
    var userStore;
    before(function () {
        client = webdriverio.remote({desiredCapabilities: {browserName: 'chrome', platform: 'WINDOWS'}});
        userBrowsePanel.init(client);
        return client.init().url('http://localhost:8080/admin/tool');
    });

    it(`GIVEN User Store wizard is opened WHEN name has been typed AND Save button pressed THEN correct notification message should be present`,
        () => {
            userStore = userItemsBuilder.buildUserStore(userItemsBuilder.generateRandomName('store'), 'test user store');
            userStoreWizard.init(client);
            return userBrowsePanel.clickOnNewButton().then(()=>userStoreWizard.waitForOpened())
                .then(()=>userStoreWizard.typeDisplayName(userStore.displayName)).then(()=> {
                    return userStoreWizard.doSave();
                }).then(()=> {
                    return userStoreWizard.waitForNotificationMessage();
                }).then(result=> {
                    assert.strictEqual(result, 'User store was created');
                })
        });

    it(`GIVEN 'user store' wizard is opened WHEN the name that already in use has been typed THEN correct notification message should be present`,
        ()=> {
            return userBrowsePanel.clickOnNewButton().then(()=>userStoreWizard.waitForOpened())
                .then(()=>userStoreWizard.typeDisplayName(userStore.displayName)).then(()=> {
                    return userStoreWizard.doSave();
                }).then(()=> {
                    return userStoreWizard.waitForErrorNotificationMessage();
                }).then(result=> {
                    var msg = `User Store [` + userStore.displayName + `] could not be created. A User Store with that name already exists`
                    assert.strictEqual(result, msg);
                })
        });


    it(`GIVEN User Store wizard is opened WHEN data has been typed and 'Save' button pressed AND the wizard has been closed THEN new User Store should be listed`,
        () => {
            userStore = userItemsBuilder.buildUserStore(userItemsBuilder.generateRandomName('store'), 'test user store');
            return testUtils.doAddUserStore(client, userStore).pause(2000)
                .then(()=>userBrowsePanel.isExist(userStore.displayName)).then(result=> {
                    assert.isTrue(result, 'new user store should be present in the grid');
                })
        });

    it(`GIVEN existing 'User Store' WHEN it has been selected and opened THEN correct description should be present`, () => {
        return userBrowsePanel.clickOnRowByName(userStore.displayName).pause(300).then(()=> {
            return userBrowsePanel.clickOnEditButton();
        }).then(()=> {
            userStoreWizard.init(client);
            return userStoreWizard.waitForOpened();
        }).then(()=> userStoreWizard.getDescription()).then(result=> {
            assert.strictEqual(result, userStore.description);
        })
    });

    beforeEach(() => testUtils.navigateToUsersApp(client));
    afterEach(() => testUtils.doCloseUsersApp(client));
    after(() => client.end());
})
;