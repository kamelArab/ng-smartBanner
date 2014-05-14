describe('Unit : Test ng-smartBanner', function(){
    var elm, scope, app, theConfigProvider;
       beforeEach( module('myApp'))
        beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element('<smart-banner></smart-banner>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));


    it("should successfully transform ", function() {
        localStorage.clear();
        var viewConfig = localStorage.getItem('bannerSave');
        console.log(elm);
        console.log(viewConfig);
        expect(elm.find('#smartbanner')).toBeDefined();
    })

    it("should add value storage when click close ", function() {
        scope.closeBanner();
        var viewConfig = JSON.parse(localStorage.getItem('bannerSave'));
        expect(viewConfig.daysHiddenDate).toBeDefined();
    })

    it("Clear storage", function() {
        localStorage.clear();
    })

    it("should add value storage when click install", function() {
        scope.installBanner();
        var viewConfig = JSON.parse(localStorage.getItem('bannerSave'));
        expect(viewConfig.daysReminderDate).toBeDefined();
    })

});
