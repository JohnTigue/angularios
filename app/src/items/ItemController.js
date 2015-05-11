// Straight out of https://github.com/angular/material-start/blob/master/app/src/users/UserController.js

(function(){

  angular
       .module('items')
       .controller('ItemController', [
          'itemService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          ItemController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function ItemController( itemService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = null;
    self.items        = [ ];
    self.selectItem   = selectItem;
    self.toggleList   = toggleItemsList;
    self.share        = share;

    // Load all registered users

    itemService
          .loadAllItems()
          .then( function( items ) {
            self.items    = [].concat(itemss);
            self.selected = items[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleItemssList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectItem ( user ) {
      self.selected = angular.isNumber(item) ? $scope.items[item] : item;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/src/items/view/descriptionSheet.html', 
          controller: [ '$mdBottomSheet', ItemSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) { //the word "clickedItem" was in the original source, not tweaked by JFT
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function ItemSheetController( $mdBottomSheet ) {
          this.item = item;
          this.items = [ // again "items" was in the original src. not a JFT thing
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
