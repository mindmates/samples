/**
 * Created by kishore on 12/11/15.
 */
angular.module("admin").factory("appBundleService", AppBundleService);

AppBundleService.$inject = [ "$http", 'Upload' ];

function AppBundleService($http, Upload) {
    var appBundleService = {
        saveAppBundle : saveAppBundle,
        fetchAppBundles : fetchAppBundles,
        findAppBundle : findAppBundle,
        deleteAppBundle: deleteAppBundle,
        saveAppBundleVersion : saveAppBundleVersion,
        fetchAppBundleVersions : fetchAppBundleVersions,
        fetchNavigationAppBundles: fetchNavigationAppBundles,
        findAppBundleVersion : findAppBundleVersion,
        deleteAppBundleVersion: deleteAppBundleVersion,
        setAsCurrentVersion : setAsCurrentVersion
    }

    return appBundleService;

    function saveAppBundle(appBundle) {
        if(appBundle['_id']){
            return $http.put("/api/appBundle/"+appBundle['_id'], appBundle);
        }else
            return  $http.post("/api/appBundle/save", appBundle);
    }
    function fetchAppBundles() {
        return  $http.get("/api/appBundle/list");
    }
    function fetchNavigationAppBundles() {
        return  $http.get("/api/appBundle/navigation/list");
    }
    function findAppBundle(appBundleId){
        return $http.get("/api/appBundle/"+appBundleId);
    }
    function deleteAppBundle(appBundleId) {
        return $http.delete("/api/appBundle/"+appBundleId);
    }

    function saveAppBundleVersion(appBundleVersion) {
        if(appBundleVersion['_id']){
            return Upload.upload({
                url: "/api/appBundle-version/"+appBundleVersion['_id'],
                data: appBundleVersion
            });
            //return $http.put("/api/appBundle-version/"+appBundleVersion['_id'], appBundleVersion);
        }else {
            return Upload.upload({
                url: "/api/appBundle-version/save",
                data: appBundleVersion
            });
            //return $http.post("/api/appBundle-version/save", appBundleVersion);
        }
    }
    function fetchAppBundleVersions(appBundleId) {
        return  $http.get("/api/appBundle-version/list/"+appBundleId);
    }
    function findAppBundleVersion(versionId){
        return $http.get("/api/appBundle-version/"+versionId);
    }
    function deleteAppBundleVersion(versionId) {
        return $http.delete("/api/appBundle-version/"+versionId);
    }

    function setAsCurrentVersion(versionId) {
        return $http.put("/api/appBundle-version/setCurrent/"+versionId);
    }
}