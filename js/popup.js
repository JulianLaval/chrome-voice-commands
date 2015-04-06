/* CREATE POPUP */

var popupOuter = document.createElement('div');
popupOuter.id = 'chrome-vc';
popupOuter.className = 'cleanslate';

var popupImg = document.createElement('img');
popupImg.id = 'chrome-vc-img';

var popupText = document.createElement('div');
popupText.id = 'chrome-vc-text';

var popupExit = document.createElement('img');
popupExit.id = 'chrome-vc-exit';
popupExit.src = chrome.extension.getURL("img/close-icon.png");
popupExit.title ="Cancel";

var popupSettings = document.createElement('img');
popupSettings.id = 'chrome-vc-settings';
popupSettings.src = chrome.extension.getURL("img/settings-icon.png");
popupSettings.title ="Settings";

popupOuter.appendChild(popupSettings);
popupOuter.appendChild(popupExit);
popupOuter.appendChild(popupImg);
popupOuter.appendChild(popupText);
document.body.appendChild(popupOuter);

var dots = 1;
var dotsArray = [' ', '.', '..', '...']
function dotFunction(){
    dots = dots % 4;
    popupText.innerHTML = "Listening" + dotsArray[dots];
    dots += 1;
}

var loadingDots;

function startPopup(){
    dots = 1;
    popupText.innerHTML = "Listening";
    popupImg.style.display = "block";
    popupOuter.style.display = 'block';
    popupImg.src = chrome.extension.getURL("img/popup-listening.png");
    loadingDots = setInterval(dotFunction, 500);
}
function hidePopup(){
    popupOuter.style.display = 'none';
    clearInterval(loadingDots);
}
function timeoutPopup(){
    clearInterval(loadingDots);
    popupText.innerHTML = "Didn't quite catch that!";    
    popupImg.src = chrome.extension.getURL("img/popup-retry.png");
}
function pausePopup(){
    clearInterval(loadingDots);
    popupText.innerHTML = "Paused";
    popupImg.src = chrome.extension.getURL("img/popup-retry.png");
}
function errorPopup(){
    clearInterval(loadingDots);
    popupText.innerHTML = "Uh-oh! No network connection!";
    popupImg.src = chrome.extension.getURL("img/popup-retry.png");
}
function blockedPopup(){
    clearInterval(loadingDots);
    popupText.innerHTML = "Uh-oh! Please make sure the extension has access to your microphone. <a href=''>Go to settings</a>";
    popupImg.style.display = "none";
}
startPopup();

// POPUP CONTROLS

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.type == "toggle"){
        if(popupOuter.style.display == "none"){
            startPopup();
            sendResponse({visible : true});            
        }
        else {
            hidePopup();
            sendResponse({visible : false});  
        }
    }
    else if(request.type == "hide"){
        hidePopup();
    }
    else if(request.type == "retry"){
        timeoutPopup();
    }
    else if(request.type == "error"){
        errorPopup();
    }
    else if(request.type == "blocked"){
        blockedPopup();
    }
});

function messageBackground(messageType){
    chrome.runtime.sendMessage({type: messageType});
}

popupImg.addEventListener("click", function(){
    // if timeout mode
    if(popupImg.src == chrome.extension.getURL("img/popup-retry.png")){
        startPopup();
        messageBackground("reset");
    }
    // else pause
    else {
        pausePopup();
        messageBackground("pause");
    }
});

document.body.addEventListener("click", function(e){
    
    // if popup not visible, ignore
    if(popupOuter.style.display == 'none') return false;
    
    // if not inside popup or children
    if(e.target.id == "chrome-vc" || (e.target.parentNode.id == "chrome-vc" && e.target.id != "chrome-vc-exit" && e.target.id != "chrome-vc-settings")){ e.stopPropagation(); return false; }
        
    hidePopup();
     
    // if settings
    if(e.target.id == "chrome-vc-settings" || e.target.parentNode.id == "chrome-vc-text") messageBackground("settings");
    else messageBackground("kill");
});