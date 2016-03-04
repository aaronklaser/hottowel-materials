(function(){

  angular
       .module('app.users')
       .controller('UsersController', ['$q', 'dataservice', 'logger', '$mdBottomSheet',
           UsersController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param
   * @constructor
   */
  function UsersController( $q, dataservice, logger, $mdBottomSheet) {
      var vm = this;

      vm.people = [];
      vm.title = 'Users';
      vm.makeContact = makeContact;

      activate();

      function activate() {
          var promises = [getPeople()];
          return $q.all(promises).then(function() {
              logger.info('Activated User View');
          });
      }

      function getPeople() {
          return dataservice.getPeople().then(function (data) {
              vm.people = data;
              return vm.people;
          });
      }

      function makeContact(selectedUser) {

          $mdBottomSheet.show({
              controllerAs  : "cp",
              templateUrl   : 'contactSheet.html',
              controller    : [ '$mdBottomSheet', ContactSheetController],
              parent        : angular.element(document.getElementById('content'))
          }).then(function(clickedItem) {
              logger.info( clickedItem.name + ' clicked!');
          });

          /**
           * User ContactSheet controller
           */
          function ContactSheetController( $mdBottomSheet ) {
              this.user = selectedUser;
              this.actions = [
                  { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
                  { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
                  { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
                  { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
              ];
              this.contactUser = function(action) {
                  // The actually contact process has not been implemented...
                  // so just hide the bottomSheet

                  $mdBottomSheet.hide(action);
              };
          }
      }
  }
})();
