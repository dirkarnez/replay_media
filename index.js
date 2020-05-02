(function() {
    var player = document.getElementsByTagName("video")[0];
    if (!player) {
        return;
    }
    
    player.pause();

    var decodedSourceSrc = decodeURI(document.getElementsByTagName("source")[0].src);

    chrome.runtime.sendMessage({file: decodedSourceSrc}, function(response) {
        console.log(response.farewell);
    });
})();