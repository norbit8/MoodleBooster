/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Given the name of a beast, get the URL to the corresponding image.
         */
        function actionToScript(beastName) {
            switch (beastName) {
                case "Remove Courses":
                    browser.tabs.executeScript({ file: "./../content_scripts/courseRemover.js" }).catch(
                        reportError
                    );
                    return;
                case "Dark Mode":
                    darkModeSwitch().catch(e => console.log(e))
                    // browser.tabs.executeScript({ file: "./../content_scripts/darkMode.js" }).catch(
                    //     reportError
                    // );
                    return;
                case "Enhance Page":
                    // TODO: implement
                    return;
                case "Reset":
                    // TODO: implement
                    return;
            }
        }


        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Something went wrong: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.classList.contains("btn")) {
            console.log("what?");
            actionToScript(e.target.textContent);
        }
    });
}

async function darkModeSwitch(){
    if(window.darkMode){
        await browser.tabs.removeCSS({file:"./../dark-mode/dark-mode.css"})
    }else{
        await browser.tabs.insertCSS({file:"./../dark-mode/dark-mode.css"})
    }
    window.darkMode = !window.darkMode
}


// to revisit...
async function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script")
    if(request === "dark-mode-off"){
        await browser.tabs.removeCSS({file:"./../dark-mode/dark-mode.css"})
    } else if(request === "dark-mode-on"){
        await browser.tabs.insertCSS({file:"./../dark-mode/dark-mode.css"})
    }
}


browser.runtime.onMessage.addListener(handleMessage);


listenForClicks();
