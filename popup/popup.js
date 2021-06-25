"use strict";

// minified courseRemover.js to be chrome compatible.
const cr = '!async function(){if(window.hasRun)return await e(),void(window.hasRun=!1);async function e(){for(btns=document.getElementsByClassName("btn-close");0!==btns.length;){for(let e=0;e<btns.length;++e)btns[e].remove();btns=document.getElementsByClassName("btn-close")}}window.hasRun=!0,async function n(){const t=document.getElementsByClassName("type_course depth_3 contains_branch");for(let o=0;o<t.length-1;++o){let s=document.createElement("button");s.type="button",s.id="bruh"+o,s.className="btn-close",s.style="background-color: Transparent;border: none;overflow: hidden;color: #ca3120 !important;font: caption;",s.innerHTML="✖",s.addEventListener("click",async function(){const s=t[o].querySelector("a[href]").getAttribute("href"),a=new URL(s).searchParams.get("id");saveToStorage("RemovedCourses",a,!1),await e(),t[o].remove(),n()}),t[o].insertBefore(s,t[o].firstChild)}}()}();'

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
                    courseRemoverSwitch().catch(e => console.log(e));
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
            setBtnsStyle(response)
            window.courseRemoverStatus = response.courseRemoverStatus;
            window.darkMode = response.DarkMode;
            window.monochrome = response.EnhancePage.Monochrome;
            window.cursor = response.EnhancePage.cursor;
        }).catch(onError);
    }
}

const setBtnsStyle = (localStorageData) => {
    if(window.location.href.includes("enahnceMenu.html")){
        setBtnStyle("monochrome", localStorageData.EnhancePage.Monochrome)
        setSliderValue("font-range", localStorageData.EnhancePage.FontSize)
        setSliderValue("contrast-range", localStorageData.EnhancePage.Contrast)
        setSliderValue("saturation-range", localStorageData.EnhancePage.Saturation)
        setSliderValue("line-spacing-range", localStorageData.EnhancePage.lineSpacing)
        setBtnStyle("cursor", localStorageData.EnhancePage.cursor === "big")
    }
    else{
        setBtnStyle("dark-mode", localStorageData.DarkMode)
        setBtnStyle("remove-courses", localStorageData.courseRemoverStatus)
    }
}

function setBtnStyle(btnID, isActive){
    const NOT_ACTIVE = "menu-item btn";
    const ACTIVE = "menu-item btn active";
    isActive ? document.getElementById(btnID).className = ACTIVE : document.getElementById(btnID).className = NOT_ACTIVE
}

function setSliderValue(sliderID, value){
    document.getElementById(sliderID).value = value;
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

async function courseRemoverSwitch(){
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
    sendMessageToTabs(tabs, "CourseRemoverStatus", {val: !window.courseRemoverStatus})
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
