"use strict"

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
                case "remove-courses":
                    browser.tabs.executeScript({file: '/content_scripts/courseRemover.js'}).catch(reportError)
                    sendMessageToTabs("CourseRemoverStatus", {val: !window.courseRemoverStatus}).catch(reportError)
                    return
                case "dark-mode":
                    sendMessageToTabs("DarkMode", {val: !window.darkMode}).catch(reportError)
                    return
                case "enhance-page":
                    location.href = "./enahnceMenu.html"
                    return
                case "reset":
                    await handleReset().catch(reportError)
                    return
                case "monochrome":
                    sendMessageToTabs("MonoChrome", {val: !window.monochrome}).catch(reportError)
                    return
                case "cursor":
                    const val = window.cursor === "big" ? "normal" : "big"
                    sendMessageToTabs("EnhancePage", {cursor: val}).catch(reportError)
                    return
                case "back":
                    location.href = './index.html'
                    return
            }
        }

        if (e.target.classList.contains("btn")) {
            actionToScript(e.target.id)
        }
    })
}

async function handleReset() {
    await sendMessageToTabs("reset")
    alert("Please refresh your browser tab to apply.")
}

/**
 * Just log the error to the console.
 */
function reportError(error) {
    console.log("Something went wrong " + error)
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
    }).catch(onError)

    const res = await browser.tabs.sendMessage(
        tab.id,
        {
            action: action,
            payload: payload
        }
    )
    setBtnsStyle(res)
    window.courseRemoverStatus = res.courseRemoverStatus
    window.darkMode = res.DarkMode
    window.monochrome = res.EnhancePage.Monochrome
    window.cursor = res.EnhancePage.cursor
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
    const NOT_ACTIVE = "menu-item btn"
    const ACTIVE = "menu-item btn active"
    isActive ? document.getElementById(btnID).className = ACTIVE : document.getElementById(btnID).className = NOT_ACTIVE
}

function setSliderValue(sliderID, value) {
    document.getElementById(sliderID).value = value
}

function onError(error) {
    console.log("Error occured " + error)
}

function setIconListeners() {
    browser.tabs.onUpdated.addListener(function (tabId, change, tab) {
        if (!tab.url || tab.url.match(/.*:\/\/.*[.]ac[.]il\/.*/) === null) {
            browser.browserAction.setPopup({tabId: tabId, popup: ''});
            browser.browserAction.setIcon({path: '/images/moodlebooster_icon_disabled.png', tabId: tabId});
        } else {
            browser.browserAction.setIcon({path: '/images/moodlebooster_icon.png', tabId: tabId});
            browser.browserAction.setPopup({tabId: tabId, popup: '/popup/index.html'});
        }
    });
}

async function loader() {
    listenForContentScriptsMessages()
    setIconListeners()
    listenForClicks()
    listenForRange()
    sendMessageToTabs("")
}


/**
 * General method to scrape DOM inside html
 * @param url   The url consisting the DOM element
 * @param cssSelector   CSS selector to find the DOM element
 * @param all   Get all DOM elements matching the selector or just the first one (default false)
 * @returns {Promise<String>}  Array of dom elements in case sent with all param "true"
 *                                                   otherwise just one DOM element
 */
async function fetchHtml(url, cssSelector, all = false) {
    const CharSetInContentType = "charset="
    let response = await fetch(url)
    const contentType = response.headers.get('Content-Type')
    const charsetStartIndex = contentType.lastIndexOf(CharSetInContentType)

    // in case the charset of the html is different than utf-8 we encoding it with the correct charset format we got from Content-Type
    if (charsetStartIndex !== -1) {
        const charSet = contentType.substring(charsetStartIndex + CharSetInContentType.length)
        return new TextDecoder(charSet).decode(await response.arrayBuffer())
    } else {
        return await response.text()
    }
}


/**
 * Getting messages with request that contains action to be preformed and payload sent by "sendMessageToTabs" in popup
 */
function listenForContentScriptsMessages() {
    browser.runtime.onMessage.addListener(async ({action, payload}) => {
        console.log("got message action", action, "payload ", payload)
        switch (action) {
            case "FetchHtml":
                const res = await fetchHtml(payload.url)
                return {response: res}
        }
    });
}


loader()
