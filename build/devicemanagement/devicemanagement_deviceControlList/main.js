/* devicemanagement_deviceControlList 9.3.0 2018-03-26T16:25:06+00:00 796b68a031b1+ (release/9.3.0) tip */
!function(){"use strict";function n(n,t,e){var i="c8y-device-control",o=e("Operations"),a=e("Overviews"),l="devicecontrol",s="devicemanagement_deviceControlList/views/";n.addNavigation({parent:a,name:e("Device control"),priority:1360,icon:i,path:l}),t.when("/"+l,{name:o,icon:i,templateUrl:s+"index.html"})}angular.module("c8y.parts.deviceControlList",[]).config(["c8yNavigatorProvider","c8yViewsProvider","gettext",n])}(),function(){"use strict";function n(n,t,e,i,o,a,l,s,r,c,d,u,p,g,v,m,f){function b(){gn?n.switchRealtime():(y(),W())}function y(){return C().then(w).then(k).then(function(){return S()})}function h(){return w().then(_.partialRight(k,!0)).then(function(){return S()})}function C(){var n=i.when();return t.deviceId&&(n=v.directParentAssets(t.deviceId).then(function(n){return _.map(n,"id")}).then(function(n){rn=n})),n}function w(n){var t=O(n);return a.list(t)}function O(n){var e=o.timeOrderFilter(n||{});return _.assign(e,t),e.revert=!0,e}function k(t,e){return n.operations&&!e||(n.operations=[],dn={},un={}),n.paging=t.paging,i.all(_.map(t,D))}function S(n){var t=I(n);return l.list(t).then(function(n){return i.all(_.map(n,x))})}function I(n){var e=_.defaults(n||{},{pageSize:1e3,withDeleted:!0});return _.assign(e,t),e.status=l.getMappedSingleOpStatus(e.status),e}function D(t){var e=i.when();return ln(t)?dn[t.id]?e:E(t).then(function(i){return t.deviceName=i,dn[t.id]=t,dn[t.id].bulkOperationId&&L()?e=A(dn[t.id].bulkOperationId,t):n.operations.push(dn[t.id]),e}):e}function E(n){return i.when(n.deviceName||g.detail(n.deviceId).then(o.getResData).then(_.partial(_.pick,"name")))}function L(){return!t.deviceId&&o.checkIfModulesExist(["c8y.deviceBulkControl"])}function A(n,t){return un[n]&&(N(un[n],[t]),nn(t)),R(n).then(x)}function R(n){return l.detail(n).then(o.getResData)}function x(t){var e=i.when();return ln(t)?un[t.id]?e:(un[t.id]=t,B(t).then(_.partial(N,t)).then(function(){n.operations.push(t)})):e}function B(n){return a.list({bulkOperationId:n.id})}function N(n,t){_.forEach(t,function(t){dn[t.id]=t,n.operations=n.operations||[],n.operations.push(dn[t.id])})}function U(n){return moment(n.creationTime||n.startDate).toDate()}function F(n){var t=[],e=function(n){t=t.concat(n)},i=function(){return t};return a.listPaged(n).then(i,_.noop,e)}function $(t){n.paging.loading=!0;var e=t?w({pageSize:t}):n.paging.next().then(k);e.finally(function(){n.paging.loading=!1})}function P(n){return a.getStyle(n).cls}function T(n){return a.getStyle(n).icon}function G(){n.refreshLoading=!0,n.realtimeAnimation=!1,h().finally(function(){n.refreshLoading=!1,n.realtimeAnimation=!0})}function M(n){var t=(n||"").toUpperCase();e.search("status",t||null)}function H(n){return t.status===n}function K(){r({templateUrl:"devicemanagement_deviceControlList/views/cancelAllModal.html",title:m("Confirm cancelling all pending operations"),body:m("Do you really want to cancel all pending operations?")}).then(_.partial(F,{status:a.status.PENDING,deviceId:t.deviceId})).then(j)}function j(n){var t=n.map(function(n){return _.partial(a.cancel,n)}),e=m("Cancelling pending operations");return t.length?(pn=!0,void s.run(t,e).result.then(function(){pn=!1}).then(G,G)):void u.warning(m("There are no pending operations"))}function z(){var t=_.get(n,"operations.length");return _.isUndefined(t)?"":f.getPlural(t,"1 loaded","{{$count}} loaded",{})}function X(){return!t.deviceId}function W(){d.addAction({text:m("Cancel all pending operations"),action:function(){K()}})}function q(){n.realtimeAnimation=!1,h(),W()}function V(t,e){n.realtimeAnimation=!0,D(e)}function J(n,t){dn[t.id]?ln(t)?Z(t):Q(t):D(t)}function Q(t){Y(n.operations,t),t.bulkOperationId&&Y(un[t.bulkOperationId].operations,t),delete dn[t.id]}function Y(n,t){_.remove(n,function(n){return n.id===t.id})}function Z(n){dn[n.id]=_.assign(dn[n.id],n),nn(n)}function nn(n){n.bulkOperationId&&R(n.bulkOperationId).then(tn)}function tn(n){un[n.id]=_.assign(un[n.id],n)}function en(n,t){Q(t)}function on(n){return!_.isUndefined(n.deviceId)}function an(n){return!_.isUndefined(n.groupId)}function ln(e){var i=!e.groupId||!rn||_.includes(rn,e.groupId)&&_.some(n.operations,{bulkOperationId:e.id}),o=!(t.status&&t.status!==e.status&&!l.doesMatchSingleOpStatus(e,t.status));return i&&o}function sn(){return{showDetails:!1,showDeviceLink:!t.deviceId,showGroupLink:!t.deviceId,showEditable:!0}}var rn,cn=this,dn={},un={},pn=!1,gn=!1;n.singleOperations=dn,n.bulkOperations=un,n.statusClass=P,n.statusIcon=T,n.loadNext=$,n.getStandardKeys=a.getStandardKeys,n.refresh=G,n.changeFilter=M,n.btnActive=H,n.cancel=a.cancel,n.cancelAllPending=K,n.realtimeAnimation=!1,cn.realtimeChannel=n.realtimeChannel="/operations/"+(void 0!==t.deviceId?t.deviceId:"*"),n.getDisplayOptions=sn,n.isSingleOperation=on,n.isBulkOperation=an,n.sortOperationsListByTime=U,cn.subTitle=z,cn.showTitle=X,cn.realtimeSubscriberId=n.$id,p.addListener(n.$id,n.realtimeChannel,n.$id+"-subscribed",q),p.addListener(n.$id,n.realtimeChannel,"CREATE",V),p.addListener(n.$id,n.realtimeChannel,"UPDATE",J),p.addListener(n.$id,n.realtimeChannel,"DELETE",en),b()}n.$inject=["$scope","$routeParams","$location","$q","c8yBase","c8yDeviceControl","c8yDeviceBulkControl","c8yBatchOp","c8yModal","c8yTitle","c8yActions","c8yAlert","c8yRealtime","c8yDevices","c8yInventory","gettext","gettextCatalog"],angular.module("c8y.parts.deviceControlList").controller("deviceControlCtrl",n)}(),function(){"use strict";function n(){return{restrict:"A",replace:!0,scope:{operation:"=",displayOptions:"="},templateUrl:"devicemanagement_deviceControlList/views/singleOperationRowSummary.html",controller:"deviceControlSingleOperationRowSummaryCtrl"}}angular.module("c8y.parts.deviceControlList").directive("deviceControlSingleOperationRowSummary",n)}(),function(){"use strict";function n(n,t,e,i,o){function a(){l()}function l(){s(),r()}function s(){i.shouldShowGlobalSmartRules().then(function(e){if(m=!1,n.smartRulesEnabled=!1,e)try{m=t.get("smartRulesSvc"),n.smartRulesEnabled=!0,n.smartRulesSvc=m}catch(n){}})}function r(){try{f=t.get("deviceBulkControlSvc"),n.deviceBulkControlEnabled=!0}catch(t){f=!1,n.deviceBulkControlEnabled=!1}}function c(n){return e.getStyle(n).cls}function d(n){return e.getStyle(n).icon}function u(){n.displayOptions.showDetails=!n.displayOptions.showDetails}function p(n){if(f&&f.createBulkOperationFromExistingOp)return f.createBulkOperationFromExistingOp(n)}function g(n){if(m&&m.addNewForOutputOperationWithUI)return m.addNewForOutputOperationWithUI(n)}function v(n){return n.description||o("no description available")}var m,f;n.statusClass=c,n.statusIcon=d,n.toggle=u,n.cancel=e.cancel,n.createSmartRule=g,n.createBulkOperation=p,n.getOperationDesc=v,a()}n.$inject=["$scope","$injector","c8yDeviceControl","c8ySmartRulesAvailability","gettext"],angular.module("c8y.parts.deviceControlList").controller("deviceControlSingleOperationRowSummaryCtrl",n)}(),function(){"use strict";function n(){return{restrict:"A",replace:!0,scope:{operation:"="},templateUrl:"devicemanagement_deviceControlList/views/singleOperationRowDetails.html",controller:"deviceControlSingleOperationRowDetailsCtrl"}}angular.module("c8y.parts.deviceControlList").directive("deviceControlSingleOperationRowDetails",n)}(),function(){"use strict";function n(n,t,e){function i(){o()}function o(){a()}function a(){try{s=t.get("deviceBulkControlSvc"),n.deviceBulkControlEnabled=!0}catch(t){s=!1,n.deviceBulkControlEnabled=!1}}function l(t){if(s&&s.getBulkOperationHref)return s.getBulkOperationHref(t.bulkOperationId).then(function(t){n.bulkOperationHref=t})}var s;n.getStandardKeys=e.getStandardKeys,n.loadBulkOperationHref=l,i()}angular.module("c8y.parts.deviceControlList").controller("deviceControlSingleOperationRowDetailsCtrl",["$scope","$injector","c8yDeviceControl",n])}(),function(){"use strict";function n(n){var t;t='<div class="modal-header" data-ng-show="title">\n    <h3 ng-bind="title | translate"></h3>\n</div>\n<div class="modal-body">\n    <p ng-bind="body | translate"></p>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-danger" ng-click="close(1)" translate>Cancel all pending operations</button>\n    <button class="btn btn-default" ng-click="dismiss()" translate>Cancel</button>\n</div>\n',n.put("devicemanagement_deviceControlList/views/cancelAllModal.html",t),n.put("/apps/devicemanagement/deviceControlList/views/cancelAllModal.html",t),t='<div ng-controller="deviceControlCtrl as vm">\n <c8y-ui-title-set ng-if="vm.showTitle()" title="\'Device operations\'| translate" subtitle="vm.subTitle()"></c8y-ui-title-set>\n\n  <c8y-ui-action-bar-set>\n    <li class="btn-group" action-bar-position="left">\n\n      <button type="button" class="btn btn-default" uib-tooltip="{{\'Pending\' | translate}}" tooltip-placement="bottom" tooltip-append-to-body="true" ng-click="changeFilter(\'PENDING\')" ng-class="{active: btnActive(\'PENDING\')}">\n        <i c8y-icon="{{statusIcon(\'pending\')}}" ng-class="statusClass(\'pending\')"></i>\n        <span ng-show="btnActive(\'PENDING\')">{{\'Pending\' | translate}}</span>\n      </button>\n\n      <button type="button" class="btn btn-default" uib-tooltip="{{\'Executing\' | translate}}" tooltip-placement="bottom" tooltip-append-to-body="true" ng-click="changeFilter(\'EXECUTING\')" ng-class="{active: btnActive(\'EXECUTING\')}">\n        <i c8y-icon="{{statusIcon(\'executing\')}}" ng-class="statusClass(\'executing\')"></i>\n        <span ng-show="btnActive(\'EXECUTING\')">{{\'Executing\' | translate}}</span>\n      </button>\n\n      <button type="button" class="btn btn-default" uib-tooltip="{{\'Successful\' | translate}}" tooltip-placement="bottom" tooltip-append-to-body="true" ng-click="changeFilter(\'SUCCESSFUL\')" ng-class="{active: btnActive(\'SUCCESSFUL\')}">\n        <i c8y-icon="{{statusIcon(\'successful\')}}" ng-class="statusClass(\'successful\')"></i>\n        <span ng-show="btnActive(\'SUCCESSFUL\')">{{\'Successful\' | translate}}</span>\n      </button>\n\n      <button type="button" class="btn btn-default" uib-tooltip="{{\'Failed\' | translate}}" tooltip-placement="bottom" tooltip-append-to-body="true" ng-click="changeFilter(\'FAILED\')" ng-class="{active: btnActive(\'FAILED\')}">\n        <i c8y-icon="{{statusIcon(\'failed\')}}" ng-class="statusClass(\'failed\')"></i>\n        <span ng-show="btnActive(\'FAILED\')">{{\'Failed\' | translate}}</span>\n      </button>\n\n      <button type="button" class="btn btn-default" ng-click="changeFilter()" ng-class="{active: btnActive()}" translate>All\n      </button>\n    </li>\n\n    <li ng-show="btnActive(\'PENDING\')">\n      <button type="button" class="btn btn-link" ng-click="cancelAllPending()">\n        <i c8y-icon="times"></i> {{\'Cancel all\' | translate}}\n      </button>\n    </li>\n\n    <c8y-realtime-btn channel-name="vm.realtimeChannel" subscriber-id="vm.realtimeSubscriberId"></c8y-realtime-btn>\n\n    <c8y-refresh-btn></c8y-refresh-btn>\n\n  </c8y-ui-action-bar-set>\n\n  <div class="c8y-empty-state text-center" ng-show="operations.length == 0">\n    <h1 class="c8y-icon c8y-icon-energy c8y-icon-duocolor"></h1>\n    <h3 translate>No operations found.</h3>\n  </div>\n\n  <div class="list-group">\n\n    <div class="list-group-item collapsible" ng-class="{\'expanded\': displayOptions.showDetails}" ng-repeat="op in operations | orderBy:sortOperationsListByTime:true track by op.id" ng-init="displayOptions = getDisplayOptions()">\n      <div ng-if="isSingleOperation(op)" device-control-single-operation-row-summary operation="op" display-options="displayOptions">\n      </div>\n\n      <div ng-if="isSingleOperation(op) && displayOptions.showDetails" device-control-single-operation-row-details operation="op">\n      </div>\n\n      <div ng-if="isBulkOperation(op)" device-control-bulk-operation-row-summary operation="op" display-options="displayOptions">\n      </div>\n\n      <div ng-if="isBulkOperation(op) && displayOptions.showDetails" device-control-bulk-operation-row-details operation="op">\n      </div>\n\n    </div>\n\n  </div>\n  <c8y-load-more change-page-size></c8y-load-more>\n</div>\n',n.put("devicemanagement_deviceControlList/views/index.html",t),n.put("/apps/devicemanagement/deviceControlList/views/index.html",t),t='<div class="row bottom-m-md">\n  <div class="col-sm-3">\n    <div class="legend form-block" translate>Details</div>\n\n    <dl class="dl-inline small text-muted" style="margin-bottom: 0" ng-if="operation.bulkOperationId" ng-init="loadBulkOperationHref(operation)">\n      <dt translate>Bulk operation</dt>\n      <dd><a ng-href="{{bulkOperationHref}}" translate>See details</a></dd>\n    </dl>\n    <dl class="dl-inline small text-muted" style="margin-bottom: 0" data-ng-repeat="(key, label) in getStandardKeys(operation)">\n      <dt>{{label | translate}}</dt>\n      <dd>{{operation[key] | translateServerMessage}}</dd>\n    </dl>\n    <dl class="dl-inline small text-muted" style="margin-bottom: 0" data-ng-repeat="key in getNonStandardKeys(operation)">\n      <dt>{{key | humanize2}}</dt>\n      <dd>{{operation[key] | json}}</dd>\n    </dl>\n  </div>\n  <div class="col-sm-9">\n    <div class="legend form-block" translate>\n      History of changes\n    </div>\n    <c8y-audit-list filter="{source: operation.id}"></c8y-audit-list>\n  </div>\n</div>',n.put("devicemanagement_deviceControlList/views/singleOperationRowDetails.html",t),n.put("/apps/devicemanagement/deviceControlList/views/singleOperationRowDetails.html",t),t='<div class="flex-row" ng-class="{\'realtime-animation-list\': realtimeAnimation}">\n\n  <div class="list-item-actions">\n    <button type="button" title="{{\'Expand\' | translate}}" class="collapse-btn" ng-class="{\'active\':isOpen}" ng-click="toggle(operation); isOpen = !isOpen">\n      <i c8y-icon="chevron-down"></i>\n    </button>\n    <span class="dropdown settings" is-open="isopen" uib-dropdown>\n      <button class="dropdown-toggle c8y-dropdown btn-link" uib-dropdown-toggle>\n          <i c8y-icon="ellipsis-v"></i>\n      </button>\n      <ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>\n        <li>\n          <a href="" ng-click="createBulkOperation(operation)" ng-show="deviceBulkControlEnabled">\n            <i c8y-icon="hdd-o"></i> {{\'Execute for whole group\' | translate}}\n          </a>\n        </li>\n        <li c8y-if-allowed cfg="smartRulesSvc.permissionsCfgs.create">\n          <a href="" ng-click="createSmartRule(operation)" ng-show="smartRulesEnabled">\n            <i c8y-icon="sliders"></i> {{\'Create Smart Rule\' | translate}}\n          </a>\n        </li>\n        <li ng-if="operation.status === \'PENDING\'">\n          <a href="" ng-click="cancel(operation)">\n            <i c8y-icon="times"></i> {{\'Cancel operation\' | translate}}\n          </a>\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <div class="list-item-icon">\n    <i c8y-icon="{{statusIcon(operation)}}" ng-class="statusClass(operation)" uib-tooltip="{{operation.status | translate}}"></i>\n  </div>\n\n  <div class="list-item-body">\n    <div class="row">\n      <div class="col-sm-8">\n        <span class="interact" ng-click="toggle(operation);isOpen = !isOpen">{{getOperationDesc(operation) | translate}}</span><br>\n        <a class="text-muted" ng-href="#/device/{{operation.deviceId}}" ng-show="displayOptions.showDeviceLink">\n          <small><i c8y-icon="cog"></i>{{\'Device\' | translate}}: {{operation.deviceName}}</small>\n        </a>\n      </div>\n      <div class="col-sm-4" ng-click="toggle(operation);isOpen = !isOpen">\n        <small><i c8y-icon="calendar"></i>{{operation.creationTime|absoluteDate}}</small>\n      </div>\n    </div>\n  </div>\n\n</div>',n.put("devicemanagement_deviceControlList/views/singleOperationRowSummary.html",t),n.put("/apps/devicemanagement/deviceControlList/views/singleOperationRowSummary.html",t)}angular.module("c8y.parts.deviceControlList").run(["$templateCache",n])}();