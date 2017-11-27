function loadScripts(urls, length, success){
        if(length > 0){
            script = document.createElement("SCRIPT");
            script.src = urls[length-1];
            console.log();
            script.onload = function() {
                console.log('%c Script: ' + urls[length-1] + ' loaded!', 'color: #4CAF50');
                loadScripts(urls, length-1, success);
            };
            document.getElementsByTagName("body")[0].appendChild(script);
        }
        else
            if(success)
                success();
    }
    loadScripts(urls, urls.length, function(){
      $('.timeago').timeago();
  });
