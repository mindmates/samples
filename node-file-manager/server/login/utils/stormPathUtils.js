/**
 * Created by alingaam on 12/16/2015.
 */

module.exports = function(config){
    var stormpath = require('stormpath'),
        propertiesReader = require('properties-reader');

    var messages= propertiesReader(config.messagesConfPath);

    return{
        validateUserInfo:function(userInfo,stormCallback){
            var apiKey = new stormpath.ApiKey(
                config.stormPath.apiKeyId,
                config.stormPath.apiSecretId
            );
            var client = new stormpath.Client({apiKey: apiKey});
            var applicationHref = config.stormPath.applicationHref;

            client.getApplication(applicationHref, function (err, application) {
                var authRequest = {
                    username: userInfo.username,
                    password: userInfo.password
                };

                application.authenticateAccount(authRequest, function (err, result) {
                    //if Error
                    if (err) {
                        console.log("Error occurred while authenticating the account: " + err);
                        stormCallback(err,null);
                    } else {
                        // If successful, the authentication result will have a method,
                        // getAccount(), for getting the authenticated account.
                        result.getAccount(function (err, account) {
                            if (err) {
                                console.log("Error occurred in getting the user account: " + err);
                                stormCallback(err,null);
                            } else {
                                console.log('printing the account details:', account);
                                stormCallback(null,account);
                            }
                        });
                    }
                });
            });
        }
    };

    /*function stormCallback(err,account){
        if(err){
            return err;
        }else{
            return account;
        }
    }*/
};
