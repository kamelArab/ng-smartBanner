

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
                         appStoreLanguage: 'us', // Language code for App Store
                         inAppStore: 'On the App Store', // Text of price for iOS
                         inGooglePlay: 'In Google Play', // Text of price for Android
                         inWindowsStore: 'In the Windows Store', // Text of price for Windows
                         GooglePlayParams: null, // Additional parameters for the market
                         bodyText: 'In Google Play', // Text of price for Android
                         urlStore:'',//if force true
                         icon: '', // The URL of the icon (defaults to <meta name="apple-touch-icon">)
                         buttonTexte: 'View', // Text for the install button
                         force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
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
            var type, urlStore;
            var options = BannerOptions.options();
            var metaStore = {

            }
            var standalone = navigator.standalone // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
                , UA = navigator.userAgent






            function _getIdMetaStore(){
                var metas = $document.find('meta');
                var metaTmp;
                for (var i=0; i<metas.length; i++) {
                    metaTmp =metas[i].getAttribute('property');
                    switch (metaTmp){
                        case 'apple-itunes-app':
                            metaStore.iphoneId = metas[i].getAttribute('content'); break;
                        case 'google-play-app':
                            metaStore.googleId = metas[i].getAttribute('content'); break;
                        case 'windows-store-app':
                            metaStore.windowsId = metas[i].getAttribute('content');break;
                    }
                }
            }

            _getIdMetaStore();

            if (options.force) {
                type = this.options.force;
                if( options.urlStore !== ''){urlStore = options.urlStore;}else{ throw new Error('You must defined url of store (urlStore) if force = true');}
            } else if (UA.match(/iPhone|iPod/i) != null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
                if (UA.match(/Safari/i) != null && (UA.match(/CriOS/i) != null || window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)){
                    type = 'ios' // Check webview and native smart banner support (iOS 6+)
                    urlStore = 'https://itunes.apple.com/' + options.appStoreLanguage + '/app/id' + metaStore.iphoneId
                }
            } else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
                type = 'kindle';
                urlStore = 'amzn://apps/android?p='+ metaStore.googleId+'&showAll=1';
            } else if (UA.match(/Android/i) != null) {
                type = 'android'
                urlStore = 'market://details?id=' + metaStore.googleId;
            } else if ((UA.match(/Windows NT 6.2/i) != null ||UA.match(/Windows phone/i) != null || UA.match(/iemobile/i)!= null) && UA.match(/Touch/i) !== null) {
                type = 'windows';
                urlStore = "microsoftStore.com/non.mais.serieux=" + metaStore.windowsId;
            }
            console.log("Type = "+type);
            console.log("URLSTORE = "+urlStore);
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
              //  localStorage.setItem(options.storageName,JSON.stringify({daysHiddenDate:new Date().getTime()}));
                scope.showBanner = false;
            }

            scope.installBanner = function(){
               // localStorage.setItem(options.storageName,JSON.stringify({daysReminderDate:new Date().getTime()}));
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
            var buttomStr ='<a href="'+urlStore+'" ng-click="installBanner()" class="sb-button"><span>'+options.buttonTexte+'</span></a>'
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
