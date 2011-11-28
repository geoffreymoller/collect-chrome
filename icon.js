var icon = {
    setOn: function(){
        chrome.browserAction.setIcon({'path':'icon_luke_alt.jpg'});
    },
    setOff: function(){
        chrome.browserAction.setIcon({'path':'icon_luke.png'});
    },
    paint: function(previouslySaved){
        if(previouslySaved){
            icon.setOn();
        }
        else{
            icon.setOff();
        }
    }
}
