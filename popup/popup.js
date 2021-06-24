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
                    browser.tabs.executeScript({code: cr}).catch(reportError);
                    sendMessageToTabs("CourseRemoverStatus", {val: !window.courseRemoverStatus}).catch(reportError)
                    return;
                case "dark-mode":
                    sendMessageToTabs("DarkMode", {val: !window.darkMode}).catch(reportError)
                    return;
                case "enhance-page":
                    location.href = "./enahnceMenu.html"
                    return;
                case "reset":
                    await handleReset().catch(reportError);
                    return;
                case "monochrome":
                    sendMessageToTabs("MonoChrome", {val: !window.monochrome}).catch(reportError);
                    return;
                case "cursor":
                    const val = window.cursor === "big" ? "normal" : "big"
                    sendMessageToTabs("EnhancePage", {cursor: val}).catch(reportError);
                    return;
                case "back":
                    location.href = './index.html'
                    return;
            }
        }

        if (e.target.classList.contains("btn")) {
            actionToScript(e.target.id);
        }
    });
}

async function handleReset() {
    const confirm = window.confirm("Are you sure? reset is an irreversible action")
    if (confirm) {
        sendMessageToTabs("reset")
        alert("Please refresh your browser tab to apply.");
    }
}

/**
 * Just log the error to the console.
 */
function reportError(error) {
    console.log("Something went wrong " + error);
}

function listenForRange() {
    document.addEventListener('input', e => {
        switch (e.target.id) {
            case "font-range":
                sendMessageToTabs("EnhancePage", {fontSize: e.target.value}).catch(reportError)
                break
            case "contrast-range":
                sendMessageToTabs("EnhancePage", {contrast: e.target.value}).catch(reportError)
                break
            case "saturation-range":
                sendMessageToTabs("EnhancePage", {saturation: e.target.value}).catch(reportError)
                break
            case "line-spacing-range":
                sendMessageToTabs("EnhancePage", {"lineSpacing": e.target.value}).catch(reportError)
                break
        }
    })
}

/**
 * Send messages with request that contains action to be preformed and payload to the storageLoader
 */
async function sendMessageToTabs(action, payload = {}) {
    /**
     * Send Message to the content-script
     */
    const [tab] = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);

    const res = await browser.tabs.sendMessage(
        tab.id,
        {
            action: action,
            payload: payload
        }
    )
    setBtnsStyle(res)
    window.courseRemoverStatus = res.courseRemoverStatus;
    window.darkMode = res.DarkMode;
    window.monochrome = res.EnhancePage.Monochrome;
    window.cursor = res.EnhancePage.cursor;
    return res
}

const setBtnsStyle = (localStorageData) => {
    if (window.location.href.includes("enahnceMenu.html")) {
        setBtnStyle("monochrome", localStorageData.EnhancePage.Monochrome)
        setSliderValue("font-range", localStorageData.EnhancePage.FontSize)
        setSliderValue("contrast-range", localStorageData.EnhancePage.Contrast)
        setSliderValue("saturation-range", localStorageData.EnhancePage.Saturation)
        setSliderValue("line-spacing-range", localStorageData.EnhancePage.lineSpacing)
        setBtnStyle("cursor", localStorageData.EnhancePage.cursor === "big")
    } else {
        setBtnStyle("dark-mode", localStorageData.DarkMode)
        setBtnStyle("remove-courses", localStorageData.courseRemoverStatus)
    }
}

function setBtnStyle(btnID, isActive) {
    const NOT_ACTIVE = "menu-item btn";
    const ACTIVE = "menu-item btn active";
    isActive ? document.getElementById(btnID).className = ACTIVE : document.getElementById(btnID).className = NOT_ACTIVE
}

function setSliderValue(sliderID, value) {
    document.getElementById(sliderID).value = value;
}

function onError(error) {
    console.log("Error occured " + error)
}

async function loader() {
    listenForClicks();
    listenForRange();
    sendMessageToTabs("");
}


loader();
