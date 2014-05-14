

/*!
 * Angular Smart Banner
 * Author : Kamel Arab
 * License: MIT
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 * and fork to  jquery.smartbanner  https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js
 */
angular.module('ng-smartBanner',[])
    .provider("BannerOptions", function(){
        this.bannerOptions={};
        this.$get = function(){
            var bannerOptions = this.bannerOptions;
            return{
                 options : function(){
                     var options = angular.extend({
                         title: '', // What the title of the app should be in the banner (defaults to <title>)
                         author: '', // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
                         price: 'FREE', // Price of the app
                         bodyText: 'In Google Play', // Text of price for Android
                         urlStore:'',//google Store ID
                         icon: '', // The URL of the icon (defaults to <meta name="apple-touch-icon">)
                         buttonTexte: 'View', // Text for the install button
                         storageName:'bannerSave', //Define key Value save in the localStorage.
                         daysHidden: 15, // Duration in day to hide the banner after being closed (0 = always show banner)
                         daysReminder: 90 // Duration in day to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
                     }, bannerOptions);
                     return options;
                 }
            };
        };
        this.setBannerOptions = function(bannerOptions) {
            this.bannerOptions = bannerOptions;
        };

    })
    .directive('smartBanner',
    function($compile, $document, BannerOptions) {
        function link(scope, element) {

            var options = BannerOptions.options();

            var viewConfig = JSON.parse(localStorage.getItem(options.storageName));
            scope.showBanner = true;

            if(viewConfig){
                if((options.daysHidden && options.daysHidden !== 0 )||( options.daysReminder && options.daysReminder !==0) ){
                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    if(viewConfig.daysHiddenDate){
                        var millisBetween = new Date().getTime()  - viewConfig.daysHiddenDate;
                        if((millisBetween / millisecondsPerDay) < options.daysHidden){
                            return
                        }
                    }
                    if(viewConfig.daysReminderDate){
                        var millisBetween = new Date().getTime()  - viewConfig.daysReminderDate;
                        if((millisBetween / millisecondsPerDay) < options.daysReminder){
                            return
                        }
                    }
                }
            }

            scope.closeBanner = function(){
                localStorage.setItem(options.storageName,JSON.stringify({daysHiddenDate:new Date().getTime()}));
                scope.showBanner = false;
            }

            scope.installBanner = function(){
                localStorage.setItem(options.storageName,JSON.stringify({daysReminderDate:new Date().getTime()}));
            }

            if(options.title === '' || options.author ==='' || options.icon === ''){
                throw new Error('title, author, icon must be defined');
            }

            if(options.urlStore ==='' ){
                throw new Error('You must defined url of store (urlStore)');
            }



            var smartBannerContainerStr = '<div class="shown" id="smartbanner" style="top: 0px;" ng-show="showBanner"><div class="sb-container"><a class="sb-close" ng-click="closeBanner()" >&times;</a>'
            var iconStr = (options.icon)?'<span class="sb-icon" style="background-image: url(&quot;'+options.icon +'&quot;);"></span>' :'';
            var globalTitle = '<div class="sb-info"><strong>'+options.title+'</strong><span>'+options.author+'</span>';
            globalTitle = globalTitle + '<span>' +  options.price+' - '+options.bodyText+'</span>'+'</div>'
            var buttomStr ='<a href="'+options.urlStore+'" ng-click="installBanner()" class="sb-button"><span>'+options.buttonTexte+'</span></a>'
            var smartBannerContainer = angular.element(smartBannerContainerStr+iconStr+globalTitle+buttomStr+'</div></div>');
            element.append(smartBannerContainer);
            $compile(element.contents())(scope);

        }
        return {
            restrict: 'E',
            replace: true,
            link: link
        };
    });
