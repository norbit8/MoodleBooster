const PAGE_CONTENT_SELECTOR = "#page-content"
const HEADER_REGEX = /instance-\d-header/

// const mainDiv = document.querySelector(PAGE_CONTENT_SELECTOR);
// // let linksElements = null
// // let inputElements = null
// // let navElement = null
// // let divElements = null
// // let labelsElements = null
//
//
//
//
// const collectElements = () =>{
//     linksElements = mainDiv.querySelectorAll('a')
//     inputElements = mainDiv.querySelectorAll('input')
//     labelsElements = mainDiv.querySelectorAll('label')
//
//     divElements = mainDiv.querySelectorAll('div')
// }
//
// const removeDarkMode = () =>{
//
// }
//
// const insertDarkMode = () => {
//     for (const linksElement of linksElements) {
//         linksElement.classList.add("link-dark-mode");
//     }
//     for (const divElement of divElements) {
//         divElement.classList.add("div-dark-mode");
//     }
//     for (const labelElement of labelsElements) {
//         labelElement.classList.add("link-dark-mode");
//     }
// }

// to revisit
const darkMode = async () =>{
    console.log("dark mode executed")
    if (window.darkMode) {
        window.darkMode = false
        await browser.runtime.sendMessage('dark-mode-off');
    }
    window.darkMode = true
    // console.log(browser)
    await browser.runtime.sendMessage('dark-mode-on');
}





darkMode()
