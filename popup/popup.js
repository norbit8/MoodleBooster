"use strict";

// minified courseRemover.js to be chrome compatible.
const cr = '!async function(){if(window.hasRun)return await e(),void(window.hasRun=!1);async function e(){for(btns=document.getElementsByClassName("btn-close");0!==btns.length;){for(let e=0;e<btns.length;++e)btns[e].remove();btns=document.getElementsByClassName("btn-close")}}window.hasRun=!0,async function t(){var n=document.getElementsByClassName("type_course depth_3 contains_branch");for(let s=0;s<n.length-1;++s){let o=document.createElement("button");o.type="button",o.id="bruh"+s,o.className="btn-close",o.addEventListener("click",async function(){const o=n[s].querySelector("a[href]").getAttribute("href"),a=new URL(o).searchParams.get("id");saveToStorage("RemovedCourses",a,!1),await e(),n[s].remove(),t()}),n[s].insertBefore(o,n[s].firstChild)}}()}();'

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
                    browser.tabs.executeScript({code: cr}).catch(
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
                case "cursor":
                    cursorSwitch().catch(e => console.log(e));
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
            console.log("Something went wrong " + error);
        }

        if (e.target.classList.contains("btn")) {
            actionToScript(e.target.id);
        }
    });
}

async function handleReset() {
    const confirm = window.confirm("Are you sure? reset is an irreversible action")
    if (confirm) {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        }).catch(onError);
        sendMessageToTabs(tabs, "reset")
        alert("Please refresh your browser tab to apply.");
    }
}

function listenForRange() {
    document.addEventListener('input', e => {
        if (e.target.id === "font-range") {
            changeFont(e);
        }
        if (e.target.id === 'contrast-range') {
            changeContrast(e);
        }
        if (e.target.id === 'saturation-range') {
            changeSaturation(e);
        }
        if(e.target.id === 'line-spacing-range'){
            changeLineSpacing(e)
        }
    })
}

/**
 * Send messages with request that contains action to be preformed and payload to the storageLoader
 */
function sendMessageToTabs(tabs, action, payload = {}) {
    /**
     * Send Message to the content-script
     */
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {
                action: action,
                payload: payload
            }
        ).then(response => {
            window.darkMode = response.DarkMode;
            window.monochrome = response.EnhancePage.Monochrome;
            window.cursor = response.EnhancePage.cursor;
        }).catch(onError);
    }
}

function onError(error) {
    console.log("Error occured " + error)
}

async function darkModeSwitch() {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "DarkMode", {val: !window.darkMode})
}

async function monochromeSwitch() {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "MonoChrome", {val: !window.monochrome})
}


async function cursorSwitch() {
    const val = window.cursor === "big" ? "normal" : "big"
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "EnhancePage", {cursor: val})
}

async function changeFont(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "EnhancePage", {fontSize: e.target.value})
}

async function changeContrast(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "EnhancePage", {contrast: e.target.value})
}

async function changeSaturation(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "EnhancePage", {saturation: e.target.value})
}

async function changeLineSpacing(e) {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "EnhancePage", {"lineSpacing": e.target.value})
}


async function loader() {
    listenForClicks();
    listenForRange();
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "");
}


loader();
