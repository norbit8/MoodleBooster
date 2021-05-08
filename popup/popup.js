"use strict";

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
async function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Given the name of a beast, get the URL to the corresponding image.
         */
        async function actionToScript(beastName) {
            switch (beastName) {
                // TODO: maybe implement your own css or take the class you need from bootstrap for buttons instead of injecting bootstrap css to the page
                case "Remove Courses":
                    browser.tabs.executeScript({ file: "./../content_scripts/courseRemover.js" }).catch(
                        reportError
                    );
                    return;
                case "Dark Mode":
                    darkModeSwitch().catch(e => console.log(e));
                    return;
                case "Enhance Page":
                    // TODO: implement
                    location.href = "./enahnceMenu.html"
                    return;
                case "Reset":
                    // TODO: implement
                    const tabs = await browser.tabs.query({
                        currentWindow: true,
                        active: true
                    }).catch(onError);
                    sendMessageToTabs(tabs, { "reset": "true" });
                    alert("Please refresh your browser tab to apply.");
                    return;
                case "Monochrome":
                    monochromeSwitch().catch(e=>console.log(e));
                    return;
                case "Back":
                    location.href = './index.html'
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

function listenForRange(){
    document.addEventListener('input', e => {
        if(e.target.id == "font-range"){
            changeFont(e);
        }
        if(e.target.id == 'contrast-range'){
            changeContrast(e);
        }
    })
}

function sendMessageToTabs(tabs, data) {
    /**
     * Send Message to the content-script
     */
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            data
        ).then(response => {
            // alert(JSON.stringify(response));
            console.log(JSON.stringify(response))
            window.darkMode = ((response.DarkMode) != "Off");
            window.monochrome = ((response.EnhancePage.Monochrome) != "Off");
        }).catch(onError);
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}

async function darkModeSwitch() {
    if (window.darkMode) {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, { "DarkMode": "Off" });
    } else {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, { "DarkMode": "On" });
    }
}

async function monochromeSwitch() {
    if (window.monochrome) {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, { "EnhancePage": {"Monochrome": "Off" }});
    } else {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, { "EnhancePage": {"Monochrome": "On" }});
    }
}


async function changeFont(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, { "EnhancePage": {"FontSize": e.target.value }});
}

async function changeContrast(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, { "EnhancePage": {"Contrast": e.target.value }});
}

// to revisit... (I don't think we need this anymore)
async function handleMessage(request, sender, sendResponse) {
    if (request === "dark-mode-off") {
        await browser.tabs.removeCSS({ file: "./../dark-mode/dark-mode.css" })
    } else if (request === "dark-mode-on") {
        await browser.tabs.insertCSS({ file: "./../dark-mode/dark-mode.css" })
    }
}

async function loader() {
    browser.runtime.onMessage.addListener(handleMessage);
    listenForClicks();
    listenForRange();
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, {});
}

loader();
