/**
 * Created by aaronklaser on 2/27/16.
 */
(function() {
    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'users',
                config: {
                    url: '/',
                    templateUrl: 'app/users/users.html',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Users',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-user"></i> Users'
                    }
                }
            }
        ];
    }
})();
