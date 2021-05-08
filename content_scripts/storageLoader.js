"use strict";

const defaultSaveSettings = {
    'RemovedCourses': [],
    'DarkMode': "Off",
    'EnhancePage': "0",
};


let orgMoodleLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/logo"
let orgHujiLogoSrc = "https://moodle2.cs.huji.ac.il/nu20/theme/image.php/huji/core/1620448000/huji"
const HUJI_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(1)"
const MOODLE_LOGO_SELECTOR = ".page-header-headings h1 img:nth-of-type(2)"

function addDarkMode() {
    /**
     * This function inserts the dark-mode.css file into the head of the current tab.
     */
    var link = document.createElement("link");
    link.id = "DarkModeCss";
    link.href = "https://ghcdn.rawgit.org/norbit8/MoodleBooster/main/dark-mode/dark-mode.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
    let moodleLogoImg = document.querySelector(MOODLE_LOGO_SELECTOR)
    let hujiLogoImg = document.querySelector(HUJI_LOGO_SELECTOR)

    orgMoodleLogoSrc = moodleLogoImg.getAttribute("src");
    orgHujiLogoSrc = hujiLogoImg.getAttribute("src");

    moodleLogoImg.setAttribute("src","https://i.ibb.co/t3CTQ0t/moodle-logo-darkmode-withlogo.png")
    hujiLogoImg.setAttribute("src","https://i.ibb.co/6mdGRfv/moodle-huji-logo-darkmode.png")
}

function loadSave() {
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
        if (parsedData.DarkMode === "On") {
            addDarkMode();
        }
        // CourseRemover
        if (parsedData.RemovedCourses !== []) {
            var courses_list = document.getElementsByClassName('type_course depth_3 contains_branch');
            const total_length = courses_list.length;
            if (total_length <= 0) {
                return;
            }
            while (courses_list.length !== total_length - parsedData.RemovedCourses.length) {
                for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
                    if (parsedData.RemovedCourses.includes(courses_list[courseIndex].innerText)) {
                        // Remove this course
                        courses_list[courseIndex].remove();
                    }
                }
                courses_list = document.getElementsByClassName('type_course depth_3 contains_branch');
            }
        }
    }
    // --------------------------------------------
}

function removeDarkMode() {
    document.getElementById("DarkModeCss").remove();
    let moodleLogoImg = document.querySelector(MOODLE_LOGO_SELECTOR)
    let hujiLogoImg = document.querySelector(HUJI_LOGO_SELECTOR)

    moodleLogoImg.setAttribute("src",orgMoodleLogoSrc)
    hujiLogoImg.setAttribute("src",orgHujiLogoSrc)
}

function listenForBackgroundMessages() {
    browser.runtime.onMessage.addListener(request => {
        var parsedData = JSON.parse(localStorage.getItem('MoodleBooster'));
        if (request.DarkMode) {
            parsedData.DarkMode = request.DarkMode;
            if (request.DarkMode === "Off") {
                removeDarkMode();
            }
            if (request.DarkMode === "On") {
                addDarkMode();
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
    var moodleBoosterData = localStorage.getItem('MoodleBooster');   // Load MoodleBooster's data from the localStorage
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
