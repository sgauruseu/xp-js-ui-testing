/**
 * Created on 6/30/2017.
 */
module.exports = {
    generateRandomName: function (part) {
        return part + Math.round(Math.random() * 1000000);
    },
    buildUserStore: function (displayName, description, providerName) {
        return {
            displayName: displayName,
            description: description,
            providerName: providerName,
        };
    },
};
