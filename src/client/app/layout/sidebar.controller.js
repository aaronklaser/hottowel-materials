(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper', '$mdSidenav'];
    /* @ngInject */
    function SidebarController($state, routerHelper, $mdSidenav) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.toggleList   = toggleList;
        vm.selectRoute = selectRoute;

        activate();

        function activate() {
            getNavRoutes();
        }

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleList() {
            $mdSidenav('left').toggle();
        }

        function selectRoute ( route ) {
            $state.go(route);
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
