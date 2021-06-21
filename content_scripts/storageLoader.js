"use strict";

const defaultSaveSettings = {
    'RemovedCourses': [],
    'DarkMode': "Off",
    'EnhancePage': {
        'Monochrome': "Off",
        'FontSize': "0",
        'Contrast': "2",
        'Saturation': "2",
        'cursor': "normal"
    },
};


let orgMoodleLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/logo"
let orgHujiLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/huji"
const HUJI_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(1)"
const MOODLE_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(2)"

const DARK_MODE_CSS_CDN = "https://cdn.jsdelivr.net/gh/norbit8/MoodleBooster/dark-mode/dark-mode.css"
const MONOCHROME_CSS_CDN = "https://cdn.jsdelivr.net/gh/norbit8/MoodleBooster/enhance-page/monochrome.css"

const MOODLE_LOGO_DARK_MODE_URL = "https://i.ibb.co/t3CTQ0t/moodle-logo-darkmode-withlogo.png"
const HUJI_LOGO_DARK_MODE_URL = "https://i.ibb.co/6mdGRfv/moodle-huji-logo-darkmode.png"
const CURSOR_CSS = "https://cdn.jsdelivr.net/gh/norbit8/MoodleBooster/enhance-page/biggerCursor.css"

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
            document.getElementsByTagName("body")[0].style = "font-size:30px;";
            return;
        case "2":
            document.getElementsByTagName("body")[0].style = "font-size:50px;";
            return;
        default:
            document.getElementsByTagName("body")[0].style = "";
    }
}

const setContrast = (contrastValue) => {
    switch (contrastValue) {
        case "0":
            document.getElementsByTagName("body")[0].style = "filter:contrast(0.70);";
            return;
        case "1":
            document.getElementsByTagName("body")[0].style = "filter:contrast(0.75);";
            return;
        case "3":
            document.getElementsByTagName("body")[0].style = "filter:contrast(1.25)";
            return;
        case "4":
            document.getElementsByTagName("body")[0].style = "filter:contrast(1.5)";
            return;
        default:
            document.getElementsByTagName("body")[0].style = "filter:contrast(1)";
    }
}

const setSaturation = (saturationValue) => {
    switch (saturationValue) {
        case "0":
            document.getElementsByTagName("body")[0].style = "filter:saturate(0.70);";
            return;
        case "1":
            document.getElementsByTagName("body")[0].style = "filter:saturate(0.75);";
            return;
        case "3":
            document.getElementsByTagName("body")[0].style = "filter:saturate(1.25)";
            return;
        case "4":
            document.getElementsByTagName("body")[0].style = "filter:saturate(1.5)";
            return;
        default:
            document.getElementsByTagName("body")[0].style = "filter:saturate(1)";
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
        if (parsedData.DarkMode == "On") {
            addDarkMode();
        }
        // EnhancePage
        if (parsedData.EnhancePage.Monochrome === "On") {
            setMonochrome();
        }
        if (parsedData.EnhancePage.cursor === "big") {
            makeCursorBigger();
        }
        setFontSize(parsedData.EnhancePage.FontSize);
        setContrast(parsedData.EnhancePage.Contrast);
        setSaturation(parsedData.EnhancePage.Saturation);
        // CourseRemover
        if (parsedData.RemovedCourses.length !== 0) {
            var courses_list = [...document.getElementsByClassName('type_course depth_3 contains_branch')];
            const total_length = courses_list.length;
            if (total_length <= 0) {
                return;
            }
            for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
                for(let course of parsedData.RemovedCourses){
                    if(courses_list[courseIndex].innerText.startsWith(course)){
                        courses_list[courseIndex].remove()
                    }
                }
            }
            courses_list = document.getElementsByClassName('type_course depth_3 contains_branch');
        }
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

function listenForBackgroundMessages() {
    browser.runtime.onMessage.addListener(request => {
        var parsedData = JSON.parse(localStorage.getItem('MoodleBooster'));
        if (request.DarkMode) {
            parsedData.DarkMode = request.DarkMode;
            if (request.DarkMode == "Off") {
                removeDarkMode();
            }
            if (request.DarkMode == "On") {
                addDarkMode();
            }
        }
        if (request.EnhancePage) {
            console.log(request)
            if (request.EnhancePage?.cursor == "big") {
                makeCursorBigger();
                parsedData.EnhancePage.cursor = "big"
            }
            if (request.EnhancePage?.cursor == "normal") {
                document.getElementById("biggerCursor").remove();
                parsedData.EnhancePage.cursor = "normal"
            }
            if (request.EnhancePage?.Monochrome == "On") {
                setMonochrome();
                parsedData.EnhancePage.Monochrome = "On" // Should we save prefferences?
            }
            if (request.EnhancePage?.Monochrome == "Off") {
                document.getElementById("MonochromeCss").remove();
                parsedData.EnhancePage.Monochrome = "Off" // Should we save prefferences?
            }
            if (request.EnhancePage?.FontSize) {
                setFontSize(request.EnhancePage.FontSize);
                // parsedData.EnhancePage.FontSize = request.EnhancePage.FontSize; // TODO: Need to see how to set slider value dynamically (React app?)
            }
            if (request.EnhancePage?.Contrast) {
                setContrast(request.EnhancePage.Contrast);
                // parsedData.EnhancePage.Contrast = request.EnhancePage.Contrast; // TODO: Need to see how to set slider value dynamically (React app?)
            }
            if(request.EnhancePage?.Saturation){
                setSaturation(request.EnhancePage.Saturation)
            }
        }
        if (request.reset) {
            parsedData = defaultSaveSettings;
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
