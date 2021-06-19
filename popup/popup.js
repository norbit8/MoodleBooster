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
        async function actionToScript(id) {
            switch (id) {
                // TODO: maybe implement your own css or take the class you need from bootstrap for buttons instead of injecting bootstrap css to the page
                case "remove-courses":
                    browser.tabs.executeScript({file: "./../content_scripts/courseRemover.js"}).catch(
                        reportError
                    );
                    return;
                case "dark-mode":
                    darkModeSwitch().catch(e => console.log(e));
                    return;
                case "enhance-page":
                    location.href = "./enahnceMenu.html"
                    return;
                case "reset":
                    await handleReset();
                    return;
                case "monochrome":
                    monochromeSwitch().catch(e => console.log(e));
                    return;
                case "back":
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

        if (e.target.classList.contains("btn")) {
            actionToScript(e.target.id);
        }
    });
}

async function handleReset() {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, {"reset": "true"});
    alert("Please refresh your browser tab to apply.");
}

function listenForRange() {
    document.addEventListener('input', e => {
        if (e.target.id == "font-range") {
            changeFont(e);
        }
        if (e.target.id == 'contrast-range') {
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
        sendMessageToTabs(tabs, {"DarkMode": "Off"});
    } else {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, {"DarkMode": "On"});
    }
}

async function monochromeSwitch() {
    if (window.monochrome) {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, {"EnhancePage": {"Monochrome": "Off"}});
    } else {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, {"EnhancePage": {"Monochrome": "On"}});
    }
}


async function changeFont(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, {"EnhancePage": {"FontSize": e.target.value}});
}

async function changeContrast(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, {"EnhancePage": {"Contrast": e.target.value}});
}


async function loader() {
    listenForClicks();
    listenForRange();
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, {});
}


loader();
