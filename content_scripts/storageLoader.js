"use strict";

const defaultSaveSettings = {
    'RemovedCourses': [],
    'DarkMode': false,
    'EnhancePage': {
        'Monochrome': false,
        'FontSize': "0",
        'Contrast': "2",
        'Saturation': "2",
        'lineSpacing': "2",
        'cursor': "normal"
    },
};

const repoVersion = "latest"
const repo = `MoodleBooster@${repoVersion}`

let orgMoodleLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/logo"
let orgHujiLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/huji"
const HUJI_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(1)"
const MOODLE_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(2)"

const DARK_MODE_CSS_CDN = `https://cdn.jsdelivr.net/gh/norbit8/${repo}/dark-mode/dark-mode.css`
const MONOCHROME_CSS_CDN = `https://cdn.jsdelivr.net/gh/norbit8/${repo}/enhance-page/monochrome.css`

const MOODLE_LOGO_DARK_MODE_URL = "https://i.ibb.co/t3CTQ0t/moodle-logo-darkmode-withlogo.png"
const HUJI_LOGO_DARK_MODE_URL = "https://i.ibb.co/6mdGRfv/moodle-huji-logo-darkmode.png"
const CURSOR_CSS = `https://cdn.jsdelivr.net/gh/norbit8/${repo}/enhance-page/biggerCursor.css`

function addDarkMode() {
    /**
     * This function inserts the dark-mode.css file into the head of the current tab.
     */
    addCssToPage("DarkModeCss", DARK_MODE_CSS_CDN);

    let moodleLogoImg = document.querySelector(MOODLE_LOGO_SELECTOR)
    let hujiLogoImg = document.querySelector(HUJI_LOGO_SELECTOR)

    orgMoodleLogoSrc = moodleLogoImg.getAttribute("src");
    orgHujiLogoSrc = hujiLogoImg.getAttribute("src");

    moodleLogoImg.setAttribute("src", MOODLE_LOGO_DARK_MODE_URL)
    hujiLogoImg.setAttribute("src", HUJI_LOGO_DARK_MODE_URL)
}


function addCssToPage(id, href) {
    var link = document.createElement("link");
    link.id = id;
    link.href = href;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

const setMonochrome = () => {
    addCssToPage("MonochromeCss", MONOCHROME_CSS_CDN);
}

const makeCursorBigger = () => {
    addCssToPage("biggerCursor", CURSOR_CSS);
}

const setFontSize = (sizeValue) => {
    switch (sizeValue) {
        case "1":
            document.getElementsByTagName("body")[0].style.fontSize = "30px";
            return;
        case "2":
            document.getElementsByTagName("body")[0].style.fontSize = "50px;";
            return;
        default:
            document.getElementsByTagName("body")[0].style.fontSize = "";
    }
}

const setContrast = (contrastValue) => {
    if(!document.getElementsByTagName("body")[0].style.filter.includes("contrast")){
        document.getElementsByTagName("body")[0].style.filter += "contrast(1)";
    }
    let value = document.getElementsByTagName("body")[0].style.filter;
    const REGEX = /(contrast\(\d+\.?\d*?\))/g
    switch (contrastValue) {
        case "0":
            value = value.replace(REGEX, "contrast(0.70)");
            break;
        case "1":
            value = value.replace(REGEX, "contrast(0.75)");
            break;
        case "3":
            value = value.replace(REGEX, "contrast(1.25)");
            break;
        case "4":
            value = value.replace(REGEX, "contrast(1.5)");
            break;
        default:
            value = value.replace(REGEX, "contrast(1)");
            break;
    }
    document.getElementsByTagName("body")[0].style.filter = value;
}

const setSaturation = (saturationValue) => {
    if(!document.getElementsByTagName("body")[0].style.filter.includes("saturate")){
        document.getElementsByTagName("body")[0].style.filter += "saturate(1)";
    }
    let value = document.getElementsByTagName("body")[0].style.filter;
    const REGEX = /(saturate\(\d+\.?\d*?\))/g
    switch (saturationValue) {
        case "0":
            value = value.replace(REGEX, "saturate(0.70)");
            break;
        case "1":
            value = value.replace(REGEX, "saturate(0.75)");
            break;
        case "3":
            value = value.replace(REGEX, "saturate(1.25)");
            break;
        case "4":
            value = value.replace(REGEX, "saturate(1.5)");
            break;
        default:
            value = value.replace(REGEX, "saturate(1)");
            break;
    }
    document.getElementsByTagName("body")[0].style.filter = value;
}

const setLineSpacing = (lineSpacingValue) => {
    switch (lineSpacingValue) {
        case "0":
            document.getElementsByTagName("body")[0].style.lineHeight = "1";
            return;
        case "1":
            document.getElementsByTagName("body")[0].style.lineHeight = "1.25";
            return;
        case "3":
            document.getElementsByTagName("body")[0].style.lineHeight = "1.75";
            return;
        case "4":
            document.getElementsByTagName("body")[0].style.lineHeight = "2";
            return;
        default:
            document.getElementsByTagName("body")[0].style.lineHeight = "1.5";
    }
}

function removeCoursesByConfiguration(parsedData) {
    if (parsedData.RemovedCourses.length !== 0) {
        var courses_list = [...document.getElementsByClassName('type_course depth_3 contains_branch')];
        if (courses_list.length <= 0) {
            return;
        }
        for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
            const link = courses_list[courseIndex].querySelector("a[href]").getAttribute("href")
            const courseID = new URL(link).searchParams.get("id")
            if (parsedData.RemovedCourses.includes(courseID)) {
                courses_list[courseIndex].remove()
            }
        }
    }
}

async function loadSave() {
    /**
     * >>> IMPORTANT <<<
     * Loads the recently saved settings of the MoodleBooster addon (if one exists,
     *  if it doesn't then it creates one)
     * and then it initialize the page according to the instructions given in the loaded settings.
     */
    var moodleBoosterData = localStorage.getItem('MoodleBooster');   // Load MoodleBooster's data from the localStorage
    // ---------------- SAVE NOT FOUND ----------------
    if (moodleBoosterData == null) {  // No data => init one.
        localStorage.setItem('MoodleBooster', JSON.stringify(defaultSaveSettings));
    }
        // -------------------------------------------
    // ---------------- SAVE FOUND ---------------
    else {  // Found MoodleBooster data on the localStorage (Yay!)
        var parsedData = JSON.parse(moodleBoosterData);
        // DarkMode
        if (parsedData.DarkMode) {
            addDarkMode();
        }
        // EnhancePage
        if (parsedData.EnhancePage.Monochrome) {
            setMonochrome();
        }
        if (parsedData.EnhancePage.cursor === "big") {
            makeCursorBigger();
        }
        setFontSize(parsedData.EnhancePage.FontSize);
        setContrast(parsedData.EnhancePage.Contrast);
        setSaturation(parsedData.EnhancePage.Saturation);
        setLineSpacing(parsedData.EnhancePage.lineSpacing)
        // CourseRemover
        removeCoursesByConfiguration(parsedData);
    }
    // --------------------------------------------
}

function removeDarkMode() {
    document.getElementById("DarkModeCss").remove();
    let moodleLogoImg = document.querySelector(MOODLE_LOGO_SELECTOR)
    let hujiLogoImg = document.querySelector(HUJI_LOGO_SELECTOR)

    moodleLogoImg.setAttribute("src", orgMoodleLogoSrc)
    hujiLogoImg.setAttribute("src", orgHujiLogoSrc)
}

function handleEnhancePageAction(parsedData, payload) {
    const {contrast, fontSize, saturation, cursor,lineSpacing} = payload
    if (cursor === "big") {
        makeCursorBigger();
        parsedData.EnhancePage.cursor = "big"
    }
    if (cursor === "normal") {
        document.getElementById("biggerCursor").remove();
        parsedData.EnhancePage.cursor = "normal"
    }
    if (fontSize) {
        setFontSize(fontSize);
        // parsedData.EnhancePage.FontSize = payload.EnhancePage.FontSize; // TODO: Need to see how to set slider value dynamically (React app?)
    }
    if (contrast) {
        setContrast(contrast);
        // parsedData.EnhancePage.Contrast = payload.EnhancePage.Contrast; // TODO: Need to see how to set slider value dynamically (React app?)
    }
    if(lineSpacing){
        setLineSpacing(lineSpacing)
    }
    if (saturation) {
        setSaturation(saturation)
    }
}

function handleMonoChromeAction(parsedData, payload) {
    parsedData.EnhancePage.Monochrome = payload.val
    if (payload.val) {
        setMonochrome();
    } else {
        document.getElementById("MonochromeCss").remove();
    }
}

function handleDarkModeAction(parsedData, payload) {
    parsedData.DarkMode = payload.val;
    if (parsedData.DarkMode) {
        addDarkMode();
    } else {
        removeDarkMode();
    }
}

/**
 * Getting messages with request that contains action to be preformed and payload sent by "sendMessageToTabs" in popup
 */
function listenForBackgroundMessages() {
    browser.runtime.onMessage.addListener(({action, payload}) => {
        let parsedData = JSON.parse(localStorage.getItem('MoodleBooster'));
        switch (action) {
            case "DarkMode":
                handleDarkModeAction(parsedData, payload);
                break
            case "MonoChrome":
                handleMonoChromeAction(parsedData, payload);
                break
            case "EnhancePage":
                handleEnhancePageAction(parsedData, payload);
                break
            case "reset":
                parsedData = defaultSaveSettings;
                break
        }
        localStorage.setItem('MoodleBooster', JSON.stringify(parsedData));
        return Promise.resolve(parsedData);
    });
}

function saveToStorage(parameter, data, overwrite = true) {
    /**
     * This function loads MoodleBooster save from the localStorage and then
     * appends or overwrites the data inside the specific parameter with the given data.
     * > parameter: Parameter to add the data into.
     * > data: Self-explanatory.
     * > overwrite: Should the function overwrite the current data with the given one?
     */
    var moodleBoosterData = localStorage.getItem('MoodleBooster');
    if (moodleBoosterData == null) {  // No data => init one.
        localStorage.setItem('MoodleBooster', JSON.stringify(defaultSaveSettings));
    }
    var parsedData = JSON.parse(moodleBoosterData);
    // TODO: make sure that the parameter is a valid one.
    if (overwrite) {
        parsedData[parameter] = data;
    } else {
        parsedData[parameter].push(data);
    }
    localStorage.setItem('MoodleBooster', JSON.stringify(parsedData));
}

function main() {
    loadSave();
    listenForBackgroundMessages();
}

main();
