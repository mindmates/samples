/**
 * Created by kishore on 12/11/15.
 */
angular.module('admin').controller('appBundleController', AppBundleController);

AppBundleController.$inject = ['$scope', '$http', '$state', '$stateParams','appBundleService'];

function AppBundleController($scope, $http,$state, $stateParams ,appBundleService) {

    $scope.appBundles;
    $scope.appBundleVersions;
    $scope.appBundleId;
    $scope.fetchAppBundles = fetchAppBundles;
    $scope.deleteAppBundle = deleteAppBundle;
    $scope.deleteAppBundleVersion = deleteAppBundleVersion;
    $scope.versionChanged = versionChanged;
    $scope.setCurrentVersion = setCurrentVersion;
    $scope.updateAppBundleStatus = updateAppBundleStatus;

    $scope.appBundle = {mobileEnabled: true};

    $scope.saveAppBundle = saveAppBundle;

    $scope.findAppBundle = findAppBundle;

    if ($state.current.name == "appBundles.list")
        fetchAppBundles();
    if ($state.current.name == "appBundleVersion.list"){
        fetchAppBundleVersions();
        $scope.appBundleId = $stateParams.appBundleId;
    }

    function fetchAppBundles() {
        appBundleService.fetchAppBundles().then(function (result) {
            $scope.appBundles = result.data;
        }, function (err) {

        });
    }

    function updateAppBundleStatus(appBundleId){
        angular.forEach($scope.appBundles, function(value,key){
            if(value._id==appBundleId){
                appBundleService.saveAppBundle(value).then(function(result){
                    $(".alert").removeClass("hidden");
                    $(".alert").addClass("alert-success");
                    $(".alert").text("AppBundle is updated successfully");
                },function(err){

                });
            }
        });
    }

    function versionChanged(versionId){
        angular.forEach($scope.appBundleVersions, function(value,key){
           if(value._id!=versionId){
               value.enabled = false;
           }
        });
    }

    function setCurrentVersion(){
        angular.forEach($scope.appBundleVersions, function(value,key){
            if(value.enabled){
                appBundleService.setAsCurrentVersion(value._id).then(function(result){
                    $(".alert").removeClass("hidden");
                    $(".alert").addClass("alert-success");
                    $(".alert").text("Current version is updated");
                }, function(err){

                });
            }
        });
    }

    function deleteAppBundle(appBundleId){
        appBundleService.deleteAppBundle(appBundleId).then(function (result) {
            fetchAppBundles();
        }, function (err) {

        })
    }

    function deleteAppBundleVersion(appBundleId){
        appBundleService.deleteAppBundleVersion(appBundleId).then(function (result) {
            fetchAppBundleVersions();
        }, function (err) {

        })
    }

    function fetchAppBundleVersions(){
        appBundleService.fetchAppBundleVersions($stateParams.appBundleId).then(function (result) {
            $scope.appBundleVersions = result.data;
        }, function (err) {

        });
    }

    if ($state.current.name == "appBundles.edit" || $state.current.name == "appBundles.permissions") {
        $scope.findAppBundle($stateParams.appBundleId);
    }
    if ($state.current.name == "appBundleVersion.new") {
        findAppBundle($stateParams.appBundleId, true);
    }
    if ($stateParams.appBundleVersionId) {
        findAppBundleVersion($stateParams.appBundleVersionId);
    }

    function saveAppBundle() {
        if ($scope.appBundle.appBundleId) {
            appBundleService.saveAppBundleVersion($scope.appBundle).then(function (result) {
                $(".alert").removeClass("hidden");
                $(".alert").addClass("alert-success");
                $(".alert").text("Component version is updated");
            }, function (err) {

            });
        } else {
            appBundleService.saveAppBundle($scope.appBundle).then(function (result) {
                $(".alert").removeClass("hidden");
                $(".alert").addClass("alert-success");
                $(".alert").text("Component is updated");
            }, function (err) {

            });
        }

    }

    function findAppBundle(appBundleId, reset) {
        appBundleService.findAppBundle(appBundleId).then(function (result) {
            $scope.appBundle = result.data;
            if (reset) {
                $scope.appBundle._id = undefined;
                $scope.appBundle.version = "";
                $scope.appBundle.enabled = false;
                $scope.appBundle.appBundleId = $stateParams.appBundleId;
            }
        }, function (err) {

        })
    }


    function findAppBundleVersion(versionId) {
        appBundleService.findAppBundleVersion(versionId).then(function (result) {
            $scope.appBundle = result.data;

        }, function (err) {

        })
    }

    initializeDemoPermissionData();

    function initializeDemoPermissionData() {

        $scope.groups = [
            {name: 'Admin', id: '001'},
            {name: 'Users',id: '002'},
            {name: 'Finance', id: '003'},
            {name: 'Maintenance', id: '004'},
            {name: 'Service', id: '005'},
            {name: 'Operations', id: '006'},
            {name: 'Infrastructure', id: '007'}
        ];

        $scope.orgs = [
            {name: 'Equinix', id: '001'},
            {name: 'LinkedIn',id: '002'},
            {name: 'Google', id: '003'},
            {name: 'Amazon', id: '004'},
            {name: 'Facebook', id: '005'},
            {name: 'Twitter', id: '006'},
            {name: 'Box', id: '007'}
        ];

        $scope.regions = [
            {name: 'EMEA', id: '001'},
            {name: 'AMER',id: '002'},
            {name: 'GLOBAL', id: '003'}
        ];
    }

}
