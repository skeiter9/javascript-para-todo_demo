'use strict';

function DashboardController($scope, $mdToast, $state, agregados, listFormate, layoutData, yeActions) {
  var dashboardVm = this;
  layoutData.appbar.title = 'dashboard';

  //var modulesAbaibles = modulesForThisUser;
  dashboardVm.modules = [
    {
      name: 'comic',
      pluralName: 'comics',
      cread: true,
      read: true,
      update: true,
      delete: false
    }
  ];

  dashboardVm.actions = yeActions(dashboardVm.modules);

}

module.exports = DashboardController;
