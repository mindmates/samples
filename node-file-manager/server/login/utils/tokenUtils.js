/**
 * Created by alingaam on 12/16/2015.
 */
module.exports= function(config) {
    var path = require('path'),
        jwt = require('jsonwebtoken'),
        propertiesReader = require('properties-reader');

    var properties=propertiesReader(config.tokenConfPath);
    var messages= propertiesReader(config.messagesConfPath);

    var secretKey = properties.get('secret');
    var claimsArr = ['audience', 'issuer', 'expiresIn'];
    var errorList = new Error();



    return{
        getToken : function(inputData,getTokenCallback){
            console.log("Inside get token: =>");
            var JWT = {};
            var claims = getClaims(errorList, getTokenCallback);
            try{
                console.log("printing the secret key: "+secretKey +" claims: "+claims);
                JWT.token = jwt.sign(inputData, secretKey ,claims);
            }finally {
                console.log("finally printing  token: "+JWT.token);
                getTokenCallback(null, JWT);
            }
        },
        validateToken: function(inputData,validateTokenCallback){
            console.log("Inside validate token function: =>");
            if(secretKey==null){
                var error="secret key not found";
                validateTokenCallback(error,null)
            }else{
                jwt.verify(inputData.token, secretKey, function (err, decoded){
                    if(err) {
                        console.log("Error occurred while verifying the jwt token");
                        if (err.name == 'JsonWebTokenError') {
                            errorList.addError('jwtError');
                        }
                        else if (err.name == 'TokenExpiredError') {
                            var payload = jwt.decode(inputData.body.token);
                            console.log('Token may be expired. Token issued at: ' + payload.iat + ". Token Expires at: " + payload.exp);
                            errorList.addError('tokenExpiredError');
                        }
                        else {
                            errorList.addError('jwtValidationError');
                        }
                        validateTokenCallback(errorList,null)
                    }else{
                        //console.log("Inside JWT verify token => decoded value: "+JSON.stringify(decoded));
                        validateTokenCallback(err,decoded);
                    }

                })
            }
        }
    };

    function getTokenCallBack(err,tokenResult){
        if(err){
            console.log("printing error in get token callback: "+err);
        }else{
            return tokenResult;
        }
    }

    function validateTokenCallback(err,decodedToken){
        if(err) console.log("printing the error while decoding");
        return decodedToken;
    }

    function getClaims(errorList, getTokenCallback) {
        var claims = {};
        var isPropertiesMissing = false;
        if (properties == null) {
            console.log('Properties are not present');
            errorList.add('fileNotFound');
            getTokenCallback(errorList, null);
        }
        var refreshInMinutes = properties.get('refreshInMinutes');

        if (secretKey == null || refreshInMinutes == null) {
            console.log('Properties are not present');
            errorList.addError('propertiesNotFound');
            getTokenCallback(errorList, null);
        }

        for (var i = 0; i < claimsArr.length; i++)
            claims[claimsArr[i]] = properties.get(claimsArr[i]);

        var keys = Object.keys(claims);
        for (var key in claims) {
            if (claims.hasOwnProperty(key) && (claims[key] === null || claims[key] === 0)) {
                console.log('The claim ', key, 'is either not present or empty. Value of', key, 'is', claims[key]);
                isPropertiesMissing = true;
            }
        }
        if (isPropertiesMissing == true) {
            console.log('getToken creation error: properties not found');
            errorList.addError('propertiesNotFound');
            getTokenCallback(errorList, null);
        }

        console.log('propertiesCount: ' + properties.length);
        console.log(JSON.stringify(claims));
        return claims;
    }
};


