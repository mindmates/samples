angular.module('admin', ['ui.router', 'frapontillo.bootstrap-switch', 'ui.select', 'ngFileUpload']);

angular.module('admin').config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('users', {
            url: "/users",
            templateUrl: "/template-container.html"
        }).state('users.list', {
            url: "/list",
            templateUrl: "/js/user/user-list.html",
            controller: "userController"
        }).state('users.new', {
            url: "/new",
            templateUrl: "/js/user/user.html",
            controller: "userController"
        }).state('users.edit', {
            url: "/edit/:userId",
            templateUrl: "/js/user/user.html",
            controller: "userController"
        }).state('appBundles', {
            url: "/appBundles",
            templateUrl: "/template-container.html"
        })
        .state('appBundles.new', {
            url: "/new",
            templateUrl: "/js/appManager/appBundle-details.html",
            controller: "appBundleController"
        }).state('appBundles.edit', {
            url: "/edit/:appBundleId",
            templateUrl: "/js/appManager/appBundle-details.html",
            controller: "appBundleController"
        })
        .state('appBundles.list', {
            url: "/list",
            templateUrl: "/js/appManager/appBundle-list.html",
            controller: "appBundleController"
        }).state('appBundleVersion', {
            url: "/appBundles-version",
            templateUrl: "/template-container.html"
        })
        .state('appBundleVersion.new', {
            url: "/new/:appBundleId",
            templateUrl: "/js/appManager/appBundle-version-details.html",
            controller: "appBundleController"
        }).state('appBundleVersion.edit', {
            url: "/edit/:appBundleVersionId",
            templateUrl: "/js/appManager/appBundle-version-details.html",
            controller: "appBundleController"
        })
        .state('appBundleVersion.list', {
            url: "/list/:appBundleId",
            templateUrl: "/js/appManager/appBundle-version-list.html",
            controller: "appBundleController"
        })

    ;
});
