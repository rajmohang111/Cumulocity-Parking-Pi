(function () {
  'use strict';

  angular
    .module('device')
    .controller('DevicesController',DevicesController);

  /* @ngInject */
  function DevicesController(
    $scope,
    $q,
    c8yInventory,
    c8yBinary
  ) {
    $scope.all=[];
    var getDevicesAndBinaries = {
      devices: getDevicesWithLocation(),
      binaries: c8yBinary.list({})
    };
    $q.all(getDevicesAndBinaries).then(placeTypes);

    function getDevicesWithLocation() {
      var filters = {fragmentType: 'c8y_Position' };
      return c8yInventory.list(filters);
    }

    function placeTypes(devicesAndBinaries) {
      var devicesOfType = createTypeMap(devicesAndBinaries.devices);
      var iconOfType = createIconMap(devicesAndBinaries.binaries);
      angular.forEach(devicesOfType, _.curry(placeType)(iconOfType));
    }

    function placeType(iconOfType, devices, type) {
      var icon = iconOfType[type];
      if (icon) {
        var placeDevices = _.curry(place)(devices);
        c8yBinary.downloadAsDataUri(icon).then(placeDevices);
      } else {
        place(devices);
      }
    }

    function createTypeMap(devices) {
      var typeMap = {};
      angular.forEach(devices, _.curry(addDeviceToTypeMap)(typeMap));
      return typeMap;
    }

    function addDeviceToTypeMap(typeMap, device) {
      var hw = 'default';
      if (device.c8y_Hardware && device.c8y_Hardware.model) {
        hw = device.c8y_Hardware.model;
      }

      if (!typeMap[hw]) {
        typeMap[hw] = [];
      }

      typeMap[hw].push(device);
    }

    function createIconMap(binaries) {
      var iconMap = {};
      angular.forEach(binaries, _.curry(addIconToIconMap)(iconMap));
      return iconMap;
    }

    function addIconToIconMap(iconMap, icon) {
      if (c8yBinary.isImage(icon)) {
        var name = icon.name;
        name = name.substring(0, name.lastIndexOf('.'));
        iconMap[name] = icon;
      }
    }

    function place(devices, uri) {
      angular.forEach(devices, _.curry(placeDevice)(_, uri));
    }

    function placeDevice(device, uri) {
      var pos = device.c8y_Position;
      console.log(pos);
      console.log("saravana");

      var details={
        serialNo: $scope.all.length+1,
        lat: pos.lat,
        lng: pos.lng,
        name: device.name,
        deviceId:device.id
      };
      if (device.c8y_Connection) {
        details.status = device.c8y_Connection.status;
      }
      else{
        details.status = "UNKNOWN";
      }
      $scope.all.push(details);
    }
  }



}());
