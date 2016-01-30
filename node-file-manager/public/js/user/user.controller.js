/**
 * Created by kishore on 12/11/15.
 */
angular.module('admin').controller('userController', UserController);

UserController.$inject = ['$scope', '$http', '$state', '$stateParams','userService'];

function UserController($scope, $http,$state, $stateParams ,userService) {

    $scope.users;
    $scope.user ={status: true};
    $scope.userId;
    $scope.fetchUsers = fetchUsers;
    $scope.deleteUser = deleteUser;
    $scope.saveUser = saveUser;
    $scope.findUser = findUser;

    if ($stateParams.userId) {
        findUser($stateParams.userId);
    }else{
        fetchUsers();
    }

    function fetchUsers() {
        userService.fetchUsers().then(function (result) {
            $scope.users = result.data;
        }, function (err) {

        });
    }

    function deleteUser(userId){
        userService.deleteUser(userId).then(function (result) {
            fetchUsers();
        }, function (err) {

        })
    }

    function saveUser() {
        userService.saveUser($scope.user).then(function (result) {
            $(".alert").removeClass("hidden");
            $(".alert").addClass("alert-success");
            $(".alert").text("User is updated");
        }, function (err) {

        });
    }

    function findUser(userId) {
        userService.findUser(userId).then(function (result) {
            $scope.user= result.data;
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

        $scope.roles = [
            {name: 'User', id: '001'},
            {name: 'Moderator',id: '002'},
            {name: 'Admin', id: '003'}];
    }

}
