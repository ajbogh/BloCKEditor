var container = document.createElement('div');
container.contentEditable = true;
container.className = "BloCKEditor";
container.id = "BloCKEditor";
container.style.backgroundColor = "white";
container.style.width = "100%";
container.style.height = "100%";
container.style.padding = "20px";

/* Create an observer instance */
var htmlBoxWrapper;
var observer = new MutationObserver(function(mutations) {
    if(htmlBoxWrapper){
        return;
    }
    for(var i = 0; i < mutations.length; i++){
        var mutation = mutations[i];
        var select = mutation.target.querySelectorAll(".htmlBoxWrapper");

    	if(select.length > 0){
            htmlBoxWrapper = select[0];
            break;
        }
    }
    if(htmlBoxWrapper){
        //hide the normal toolbar
        document.querySelector(".toolbarHolder").style.display = "none";

        addEditorDiv();

        addResources().then(function(){
            console.log("-----test addResources done");
        });
    }
});

/* Config info for the observer */
var config = {
    "childList": true, 
    "subtree": true
};

/* Observe the body and its (descendants) for "childList" changes */
observer.observe(document.body, config);

/* Adds the container to the htmlBox */
function addEditorDiv(){
    console.log("Appending Child...");
    var htmlBox = htmlBoxWrapper.querySelector(".htmlBox");
    console.log(htmlBox);
    //htmlBox.style.display = "none";
    //htmlBoxWrapper.appendChild(container);
}

function addResources(){
    //DEV
    //https://rawgit.com/ajbogh/Scroll/master/lib/ckeditor/ckeditor.js
    //https://rawgit.com/ajbogh/Scroll/master/lib/scroll/scroll.js

    

    //PROD
    //https://cdn.rawgit.com/ajbogh/Scroll/master/lib/ckeditor/ckeditor.js
    //https://cdn.rawgit.com/ajbogh/Scroll/master/lib/scroll/scroll.js

    var promise = loadScript(chrome.extension.getURL('lib/ckeditor/ckeditor.js')) //"//rawgit.com/ajbogh/Scroll/master/lib/ckeditor/ckeditor.js"
        .then(function(){
            return loadScript(chrome.extension.getURL('lib/ckeditor/config.js'));
        })
        .then(function(){
            console.log("------config loaded!");
            return Promise.all([
                loadScript("//code.jquery.com/jquery-2.1.4.min.js"),
                loadScript(chrome.extension.getURL('lib/Scroll.js'))
            ]);
        })
        .then(function(){
            console.log("------scripts all loaded!");
            initializeScroll();
        });
    return promise;
}

function loadScript(url){
    var promise = new Promise(function(resolve, reject){
        var script = document.createElement('script');

        script.src = url;

        script.onload = function () {
            resolve();
        };
        script.onerror = function(error){
            reject(error);
        };

        document.head.appendChild(script); //or something of the likes
    });
    return promise;
}

function initializeScroll(){
    loadScript(chrome.extension.getURL('initiator.js'))
}
