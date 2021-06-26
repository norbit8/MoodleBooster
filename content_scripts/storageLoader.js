"use strict";

try {
    var currentYear = document.querySelector(".page-header-headings").children[0].querySelectorAll("span")[1].innerHTML
} catch (error) {
    currentYear = ""
}
const defaultSaveSettings = {
    'RemovedCourses': [],
    'courseRemoverStatus': false,
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
    const dashboard = window.moodleBoosterDashboard;
    switch (sizeValue) {
        case "1":
            document.getElementsByTagName("body")[0].style.fontSize = "30px";
            setTableFontSize('larger');
            return;
        case "2":
            document.getElementsByTagName("body")[0].style.fontSize = "50px";
            setTableFontSize('large');
            return;
        default:
            document.getElementsByTagName("body")[0].style.fontSize = "";
            setTableFontSize('meduim');
    }
}

const setTableFontSize = (sizeValue) => {
    var tableStyle = document.getElementById('tableStyle');
    var cssStr = `table {font-size:${sizeValue};}`;
    if (!tableStyle) {
        const style = document.createElement('style');
        style.textContent = cssStr;
        style.id = 'tableStyle';
        document.head.append(style);
    } else {
        tableStyle.textContent = cssStr;
    }

}

const setContrast = (contrastValue) => {
    if (!document.getElementsByTagName("body")[0].style.filter.includes("contrast")) {
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
    if (!document.getElementsByTagName("body")[0].style.filter.includes("saturate")) {
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

function addSemesterCourses(coursesList, semesterCourses, title) {
    if (semesterCourses.length === 0) {
        return
    }
    const semesterTitle = document.createElement('li')
    semesterTitle.appendChild(document.createTextNode(title))
    coursesList.appendChild(semesterTitle)
    for (const semesterAElement of semesterCourses) {
        coursesList.appendChild(semesterAElement)
    }
}

function rearrangeCourses(parsedData) {
    if (!parsedData['userCoursesBySemester']) {
        return
    }
    const semesterA = []
    const semesterB = []
    const unknownSemester = []
    let coursesList = document.querySelector('.type_system.depth_2.contains_branch > ul')
    if (coursesList === null) {
        return
    }
    coursesList.childNodes.forEach(c => {
        const link = c.querySelector("a[href]").getAttribute("href")
        const courseID = new URL(link).searchParams.get("id")
        if (parsedData['userCoursesBySemester']['Semester A'].includes(courseID)) {
            semesterA.push(c)
        } else if (parsedData['userCoursesBySemester']['Semester B'].includes(courseID)) {
            semesterB.push(c)
        } else {
            unknownSemester.push(c)
        }
    })
    coursesList.childNodes.forEach(c => c.remove())

    addSemesterCourses(coursesList, semesterA, "Semester A")
    addSemesterCourses(coursesList, semesterB, "Semester B")
    addSemesterCourses(coursesList, unknownSemester, "Semester Unknown")
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

async function saveUserCoursesBySemester(parsedData) {
    if (parsedData['userCoursesBySemester']) {
        return
    }
    let userCoursesBySemester = {
        "Semester A": [],
        "Semester B": [],
        "Unknown": []
    }
    let courses_list = [...document.getElementsByClassName('type_course depth_3 contains_branch')];
    if (courses_list.length === 0) {
        return
    }
    for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
        const link = courses_list[courseIndex].querySelector("a[href]").getAttribute("href")
        const courseID = new URL(link).searchParams.get("id")
        const semester = await getCourseSemester(courseID)
        userCoursesBySemester[semester].push(courseID)
    }
    console.log(userCoursesBySemester)
    saveToStorage('userCoursesBySemester', userCoursesBySemester, true)
    parsedData['userCoursesBySemester'] = userCoursesBySemester
}

async function loadSave() {
    /**
     * >>> IMPORTANT <<<
     * Loads the recently saved settings of the MoodleBooster addon (if one exists,
     *  if it doesn't then it creates one)
     * and then it initialize the page according to the instructions given in the loaded settings.
     */
    var moodleBoosterData = localStorage.getItem('MoodleBooster' + currentYear);   // Load MoodleBooster's data from the localStorage
    // ---------------- SAVE NOT FOUND ----------------
    if (moodleBoosterData == null) {  // No data => init one.
        localStorage.setItem('MoodleBooster' + currentYear, JSON.stringify(defaultSaveSettings));
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
        await saveUserCoursesBySemester(parsedData)
        rearrangeCourses(parsedData)
        removeCoursesByConfiguration(parsedData);
        resetCourseRemoverStatus(parsedData);
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
    const { contrast, fontSize, saturation, cursor, lineSpacing } = payload
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
        parsedData.EnhancePage.FontSize = fontSize;
    }
    if (contrast) {
        setContrast(contrast);
        parsedData.EnhancePage.Contrast = contrast;
    }
    if (lineSpacing) {
        setLineSpacing(lineSpacing)
        parsedData.EnhancePage.lineSpacing = lineSpacing;
    }
    if (saturation) {
        setSaturation(saturation)
        parsedData.EnhancePage.Saturation = saturation;
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

function handleCourseRemoverAction(parsedData, payload) {
    parsedData.courseRemoverStatus = payload.val;
}

function resetCourseRemoverStatus(parsedData) {
    parsedData.courseRemoverStatus = false;
    localStorage.setItem('MoodleBooster' + currentYear, JSON.stringify(parsedData));
}

/**
 * Getting messages with request that contains action to be preformed and payload sent by "sendMessageToTabs" in popup
 */
function listenForBackgroundMessages() {
    browser.runtime.onMessage.addListener(({ action, payload }) => {
        let parsedData = JSON.parse(localStorage.getItem('MoodleBooster' + currentYear));
        switch (action) {
            case "DarkMode":
                handleDarkModeAction(parsedData, payload);
                break
            case "CourseRemoverStatus":
                handleCourseRemoverAction(parsedData, payload);
                break;
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
        localStorage.setItem('MoodleBooster' + currentYear, JSON.stringify(parsedData));
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
    var moodleBoosterData = localStorage.getItem('MoodleBooster' + currentYear);
    if (moodleBoosterData == null) {  // No data => init one.
        localStorage.setItem('MoodleBooster' + currentYear, JSON.stringify(defaultSaveSettings));
    }
    var parsedData = JSON.parse(moodleBoosterData);
    // TODO: make sure that the parameter is a valid one.
    if (overwrite) {
        parsedData[parameter] = data;
    } else {
        parsedData[parameter].push(data);
    }
    localStorage.setItem('MoodleBooster' + currentYear, JSON.stringify(parsedData));
}


/**
 * Send messages with request that contains action to be preformed and payload to the storageLoader
 */
async function sendMessageToBackgroundScript(action, payload = {}) {
    /**
     * Send Message to the content-script
     */
    const resp = await browser.runtime.sendMessage(
        {
            action: action,
            payload: payload
        }
    )
    return resp.response
}

/**
 * General method to scrape DOM inside html
 * @param url   The url consisting the DOM element
 * @param cssSelector   CSS selector to find the DOM element
 * @param all   Get all DOM elements matching the selector or just the first one (default false)
 * @returns {Promise<NodeListOf<Element>|Element>}  Array of dom elements in case sent with all param "true"
 *                                                   otherwise just one DOM element
 */
async function scrapeWebsiteDOM(url, cssSelector, all = false) {
    const html = await sendMessageToBackgroundScript("FetchHtml", { url: url })
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(html, 'text/html')
    return all ? htmlDoc.querySelectorAll(cssSelector) : htmlDoc.querySelector(cssSelector)
}

/**
 *  Initial scrapping functionality from Syllabus to get in which semester is a course by Syllabus content
 * @param courseId  The ID of the course to check
 * @returns {Promise<string>} "Semester A/B" for semester A and B. Unknown if course's is learnt in both semesters.
 */
async function getCourseSemester(courseId) {
    const ValidCourseIdLength = 5
    courseId = courseId.trim()
    if (courseId.length > ValidCourseIdLength) {
        courseId = courseId.substring(0, ValidCourseIdLength)
    }
    // as syllabus expecting id with 5 chars we need to add prefix of 0s so the id will be with 5 chars
    if (courseId.length < ValidCourseIdLength) {
        let numOfZero = ValidCourseIdLength - courseId.length
        courseId = "0".repeat(numOfZero) + courseId
    }

    const semester = await scrapeWebsiteDOM(
        `https://shnaton.huji.ac.il/index.php/NewSyl/${courseId}/1/2021/`,
        '.hebItem:nth-of-type(4)')

    if (semester === null || (semester.textContent.includes("ב'") && semester.textContent.includes("א'"))) {
        return 'Unknown'
    }
    const semesterContent = semester.textContent

    if (semesterContent.includes("ב'") && semesterContent.includes("א'")) {
        return 'Unknown'
    }

    return semester.textContent.includes("ב'") ? "Semester B" : "Semester A"
}


function main() {
    loadSave();
    listenForBackgroundMessages();
}

main();
