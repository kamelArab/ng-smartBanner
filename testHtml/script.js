


var myAppModule = angular.module('myApp', ['ng-smartBanner'])
    .config(function(BannerOptionsProvider){
        BannerOptionsProvider.setBannerOptions(
        {
            title: 'toto', // What the title of the app should be in the banner (defaults to <title>)
            author: "toto gro", // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
            price: '1 milion de dollar', // Price of the app

            icon: 'icon-app.png', // The URL of the icon (defaults to <meta name="apple-touch-icon">)

            button: 'TELECHARGER', // Text for the install button
            urlStore: 'http://www.google.de', // The URL for the button. Keep null if you want the button to link to the app store.
            scale: 'auto', // Scale based on viewport size (set to 1 to disable)
            speedIn: 300, // Show animation speed of the banner
            speedOut: 400, // Close animation speed of the banner
            daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
            daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
            force: null // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
        }
    );
     });

// configure the module.
// in this example we will create a greeting filter
myAppModule.filter('greet', function() {
    return function(name) {
        return 'Hello, ' + name + '!';
    };
});
