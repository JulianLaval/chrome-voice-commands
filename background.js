(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=!1,l=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,n=/(\(\?)?:\w+/g,o=/\*\w+/g,p=/[\-{}\[\]+?.,\\\^$|#]/g,q=function(a){return a=a.replace(p,"\\$&").replace(l,"(?:$1)?").replace(n,function(a,b){return b?a:"([^\\s]+)"}).replace(o,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},r=function(a){a.forEach(function(a){a.callback.apply(a.context)})},s=function(){t()||b.annyang.init({},!1)},t=function(){return d!==a};b.annyang={init:function(l,m){m=m===a?!0:!!m,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous="http:"===b.location.protocol,d.lang="en-US",d.onstart=function(){r(g.start)},d.onerror=function(a){switch(r(g.error),a.error){case"network":r(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,r((new Date).getTime()-h<200?g.errorPermissionBlocked:g.errorPermissionDenied)}},d.onend=function(){if(r(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){if(k)return i&&b.console.log("Speech heard, but annyang is paused"),!1;r(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,l=f.length;l>h;h++){var m=f[h].command.exec(c);if(m){var n=m.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),n.length&&b.console.log("with parameters",n)),f[h].callback.apply(this,n),r(g.resultMatch),!0}}}return r(g.resultNoMatch),!1},m&&(f=[]),l.length&&this.addCommands(l)},start:function(c){k=!1,s(),c=c||{},e=c.autoRestart!==a?!!c.autoRestart:!0,c.continuous!==a&&(d.continuous=!!c.continuous),h=(new Date).getTime();try{d.start()}catch(f){i&&b.console.log(f.message)}},abort:function(){e=!1,t&&d.abort()},pause:function(){k=!0},resume:function(){b.annyang.start()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){s(),d.lang=a},addCommands:function(a){var c,d;s();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=q(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(b){return b===a?void(f=[]):(b=Array.isArray(b)?b:[b],void(f=f.filter(function(a){for(var c=0;c<b.length;c++)if(b[c]===a.originalPhrase)return!1;return!0})))},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);
var commands = {
    '(open) (new) tab': newTab,
    'new tab (search for) (google) pictures of *item': newTabImgSearch,
    'new tab (search for) (google) images of *item': newTabImgSearch,
    'new tab (go to) (goto) (open) *website': newTabWebsite,
    'new tab (search for) (google) *search': newTabGoogleSearch,   
    'go to *website': goToWebsite,
    'goto *website': goToWebsite,
    'open *website': goToWebsite,
    'reload (current) (tab)': reloadTab, // optimise group
    'refresh (current) (tab)': reloadTab, // optimise group
    'close (current) tab': closeTab, // optimise group
    'exit (current) tab': closeTab, // optimise group
    'duplicate (current) tab': copyTab, // optimise group
    'copy (current) tab': copyTab, // optimise group
    'close all tabs': closeChrome,
    'exit (chrome)': closeChrome,
    'close (chrome)': closeChrome,
    // '(create) (add) (new) bookmark (page)': newBookmark,
    // 'remove bookmark': removeBookmark,
    // 'delete bookmark': removeBookmark,
    '(open) chrome :settings': chromeSettings,
    'about (extension)': extensionSettings,
    'extension settings': extensionSettings,
    'extension options': extensionSettings,
    'who are you': easterEgg,
    'what is your name': easterEgg,
    '(search for) (google) pictures of *item': imgSearch,
    '(search for) (google) images of *item': imgSearch,
    '(search for) (google) *search': googleSearch
    // 'capture (screen) (tab)'
};
annyang.addCommands(commands);  

var websites = {
    "facebook": "https://www.facebook.com",
    "face book": "https://www.facebook.com",
    "google": "https://www.google.com",
    "twitter": "https://www.twitter.com",
    "wikipedia": "https://en.wikipedia.org/wiki/Main_Page",
    "youtube": "https://www.youtube.com",
    "you tube": "https://www.youtube.com",
    "linkedin" : "https://www.linkedin.com",
    "linked in" : "https://www.linkedin.com",
    "stackoverflow" : "https://www.stackoverflow.com",
    "stack overflow" : "https://www.stackoverflow.com",
    "outlook" : "https://www.outlook.com",
    "out look" : "https://www.outlook.com",
    "reddit" : "https://www.reddit.com",
    "read it" : "https://www.reddit.com",
    "gmail" : "https://mail.google.com",
    "g mail" : "https://mail.google.com",
    "gee mail" : "https://mail.google.com",
    "slashdot" : "https://www.slashdot.org",
    "slash dot" : "https://www.slashdot.org",
    "github" : "https://www.github.com",
    "git hub" : "https://www.github.com",
    "get hub" : "https://www.github.com", // github
    "slack" : "https://www.slack.com",
    "amazon" : "https://www.amazon.com",
    "dribble" : "https://www.dribbble.com",
    "google drive" : "https://drive.google.com",
    "drive" : "https://drive.google.com",
    "dropbox" : "https://www.dropbox.com",
    "drop box" : "https://www.dropbox.com",
    "quora" : "https://www.quora.com",
    "tumblr" : "https://www.tumblr.com",
    "tumbler" : "https://www.tumblr.com",
    "soundcloud" : "https://www.soundcloud.com",
    "sound cloud" : "https://www.soundcloud.com",
    "spotify" : "https://play.spotify.com/"
}

// ANNYANG CALLBACKS
annyang.addCallback('resultNoMatch', timeoutPopup);
annyang.addCallback('resultMatch', stopPopup);
annyang.addCallback('errorPermissionBlocked', annyangBlocked);
annyang.addCallback('errorPermissionDenied', annyangBlocked);
annyang.addCallback('errorNetwork', annyangError);

function annyangBlocked(){
    // message popup if injected
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        if(tabsInjected.indexOf(tabs[0].id) > -1) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "blocked"});
        }
    });   
    stopPopup();     
}
function annyangError(){
    // message popup if injected
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        if(tabsInjected.indexOf(tabs[0].id) > -1) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "error"});
        }
    });   
    stopPopup();     
}

// ANNYANG FUNCTIONS

function chromeSettings(setting){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        if(setting == "settings") chrome.tabs.create({url: "chrome://settings/"});
        else if(setting == "history") chrome.tabs.create({url: "chrome://history/"});
        else if(setting == "bookmarks") chrome.tabs.create({url: "chrome://bookmarks"});
        else if(setting == "extensions") chrome.tabs.create({url: "chrome://extensions/"});
        else if(setting == "downloads") chrome.tabs.create({url: "chrome://downloads/"});
        else if(setting == "about" || setting == "help") chrome.tabs.create({url: "chrome://help/"});
        else timeoutPopup();
    });  
}
function extensionSettings(){
    chrome.tabs.create({url: chrome.extension.getURL("options.html")});  
}
function easterEgg(){
    chrome.tabs.create({url: 'https://www.google.co.uk/search?q=Julian%20Laval'});
}
function newTab(){
    chrome.tabs.create({});
    annyang.abort();
}
function reloadTab(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.reload(tabs[0].id);
    });    
}
function copyTab(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.duplicate(tabs[0].id);
    });    
}
function closeTab(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.remove(tabs[0].id);
    });  
}
function closeChrome(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.windows.remove(tabs[0].windowId);
    });  
}
function newTabWebsite(website){
    website = website.toLowerCase();
    if(typeof websites[website] !== "undefined") chrome.tabs.create({url: websites[website]});
    else timeoutPopup();
}
function goToWebsite(website){
    website = website.toLowerCase();
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        if(typeof websites[website] !== "undefined") chrome.tabs.update(tabs[0].id, {url: websites[website]});
        else timeoutPopup();
    });  
}
function imgSearch(item){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.update(tabs[0].id, {url: 'https://www.google.co.uk/search?q='+item+'&tbm=isch'});
    }); 
}
function newTabImgSearch(item){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.create({url: 'https://www.google.co.uk/search?q='+item+'&tbm=isch'});
    }); 
}
function googleSearch(item){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.update(tabs[0].id, {url: 'https://www.google.co.uk/search?q='+item});
    }); 
}
function newTabGoogleSearch(item){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.create({url: 'https://www.google.co.uk/search?q='+item});
    }); 
}

// POPUP INTERACTION

var tabsInjected = [];
var listenTimeout;

function timeoutPopup(){
    stopPopup();
    
    // message popup
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {type: "retry"});
    });
}
function startPopup(){
    annyang.start({ autoRestart: false, continuous: false });
    listenTimeout = setTimeout(timeoutPopup, 5000);
}
function stopPopup(){
    annyang.abort();
    clearTimeout(listenTimeout);
}
    
function togglePopup(){ 
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        
        if(typeof tabs[0] === "undefined") return false;
        
        // make sure fully loaded
        if(tabs[0].status != "complete") return false;
        
        // make sure allowed
        if(tabs[0].url.indexOf("http://") > -1 || tabs[0].url.indexOf('https://') > -1){
        
            // inject & show        
            if(tabsInjected.indexOf(tabs[0].id) == -1){
            
                // add to injected tabs
                chrome.tabs.insertCSS(tabs[0].id, {file: 'css/cleanslate.css'});
                chrome.tabs.insertCSS(tabs[0].id, {file: 'css/popup.css'});
                chrome.tabs.executeScript(tabs[0].id, {file: 'js/popup.js'});
                tabsInjected.push(tabs[0].id);
                
                startPopup();
            }
            else {
                // toggle popup and get state from popup
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
                    // console.log(tabs);
                    chrome.tabs.sendMessage(tabs[0].id, {type: "toggle"}, function(response){
                        if(response.visible){
                            startPopup();
                        }
                        else {
                            stopPopup();
                        }
                    });
                });               
            }
        }
    });
}

chrome.tabs.onActivated.addListener(function(activeInfo){
    if(tabsInjected.indexOf(activeInfo.tabId) > -1) chrome.tabs.sendMessage(activeInfo.tabId, {type: "hide"});
    stopPopup(); 
});

chrome.tabs.onUpdated.addListener(function(tabID){
    var tabIndex = tabsInjected.indexOf(tabID);
    if (tabIndex > -1) tabsInjected.splice(tabIndex, 1);
    stopPopup();
});

chrome.browserAction.onClicked.addListener(togglePopup);
chrome.commands.onCommand.addListener(function(command){
    if(command == "trigger_popup") togglePopup();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // if start from timeout
    if(request.type == "reset"){
        startPopup();
    }
    // else if pause or kill
    else if (request.type == "pause" || request.type == "kill"){
        stopPopup();
    }
    // else if settings
    else if (request.type == "settings"){
        stopPopup();
        chrome.tabs.create({url: chrome.extension.getURL("options.html")});  
    }
});