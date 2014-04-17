# ng-smartBanner

Ng-smartBanner is an awesome and sexy directive for add smartBanner for only one store  into your Angular 1.2+ app.

## Quick Start
+ Include the required libraries

>
``` html

<link href="ng-smartBanner.css" rel="stylesheet" />

<script src="//angular/angular.min.js"></script>
<script src="//ng-smartBanner.js"></script>
```

+ Inject the `fianet.smartBanner` module into your app

>
``` javascript
angular.module('myApp', ['fianet.smartBanner'])
        .config(function(BannerOptionsProvider){
            BannerOptionsProvider.setBannerOptions({
                title: 'toto',
                author: "toto gro", // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
                price: '1 milion de dollar', // Price of the app
            })};
`

``


configure provider :

    title: '', // What the title of the app should be in the banner (required)
    author: '', // What the author of the app should be in the banner (required)
    price: 'FREE', // Price of the app
    bodyText: 'In Google Play', // Text afrter price .. (required)
    urlStore:'',//google Store ID   (required)
    icon: '', // The URL of the icon (required)
    buttonTexte: 'View', // Text for the install button
    storageName:'bannerSave', //Define key Value save in the localStorage.
    daysHidden: 15, // Duration in day to hide the banner after being closed (0 = always show banner)
    daysReminder: 90 // Duration in day to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
>
```
<fia-smart-banner></fia-smart-banner>
```

## Example
An example folder is available to help you to start : testHtml .


