/**
 * Created by alingaam on 12/16/2015.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports=function(app,config,cache){
    var path = require('path'),
        stormPathUtil = require('../utils/stormPathUtils')(config),
        tokenUtil= require('../utils/tokenUtils')(config);

    return{
        renderLoginPage : function(req,res){
            res.render('defaults/login',{error:null});
        },

        postLoginCall : function(req,res){
            console.log("Inside post login call: =>"+JSON.stringify(req.body));
            //first check cookie exists
            if(req.cookies.token==null){
                stormPathUtil.validateUserInfo(req.body,function(err,result){
                    if(err){
                        console.log("Printing the Error inside validate user info: "+err);
                        res.render('defaults/login',{error:err})
                    }else{
                        console.log("printing result: "+JSON.stringify(result));

                        addUserToCache(result.email);

                        //generating the token for the storm account
                        tokenUtil.getToken(result,function(err,tokenResult){
                            console.log("printing the token result: "+JSON.stringify(tokenResult));
                            //setting token result as cookie
                            res.cookie('token', tokenResult, {
                                expires: new Date(Date.now() + 1800000),
                                httpOnly: false
                            });
                            if(req.originalUrl.indexOf('mobile')!=-1){
                                res.json(tokenResult);
                            }else{
                                res.redirect(config.noAccessPath);
                            }
                        })

                    }
                });
            }else{
                var token= req.cookies.token;
                console.log("cookie exists so just validate cookie: "+JSON.stringify(token));
                //validate token if token exists in cookie
                tokenUtil.validateToken(token,function(err,decodedToken){
                    console.log("printing the decoded token: "+JSON.stringify(decodedToken));

                    addUserToCache(decodedToken.email);
                    if(req.originalUrl.indexOf('mobile')!=-1){
                        res.json(decodedToken);
                    }else{
                        res.redirect(config.noAccessPath);
                    }
                })
            }

        }

    }

    function addUserToCache(userEmail){
        User.findOne({email: userEmail}, function (err, user) {
            if (err) {
                res.status(500).json({
                    "error": "could not load component"
                });
            }
            cache.hmset("users", userEmail, JSON.stringify(user._doc));
        });
    }
};