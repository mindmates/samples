
module.exports = function (stormpath, config) {
    authenticateUser=function(){
        var apiKey = new stormpath.ApiKey(
            config.stormPath.apiKeyId,
            config.stormPath.apiSecretId
        );

        var client = new stormpath.Client({ apiKey: apiKey });
        var applicationHref = config.stormPath.applicationHref;

        client.getApplication(applicationHref, function(err, application) {
            console.log('Application:', application);
            var authRequest = {
                username: 'alingaam@equinix.com',
                password: 'Equinix@123'
            };

            application.authenticateAccount(authRequest, function(err, result) {
                //if Error
                if(err){
                    console.log(err)
                }else{
                    // If successful, the authentication result will have a method,
                    // getAccount(), for getting the authenticated account.
                    result.getAccount(function(err, account) {
                        if(err){

                        }else{
                            console.log('Account:', account);
                            return account;
                        }
                    });
                }
            });
        });
    }
};
