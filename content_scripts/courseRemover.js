(async function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        await btnCleaner();
        window.hasRun = false;
        return;
    }
    window.hasRun = true;

    /**
     * Cleans the added button from addCourseRemovingOption() function
     */
    async function btnCleaner() {
        btns = document.getElementsByClassName("btn-close");
        while (btns.length !== 0) {
            for (let i = 0; i < btns.length; ++i) {
                btns[i].remove();
            }
            btns = document.getElementsByClassName("btn-close");
        }
    }

    /**
     * Adds buttons that removes courses from the courses pane
     */
    async function addCourseRemovingOption() {
        var courses_list = document.getElementsByClassName('type_course depth_3 contains_branch');
        for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
            let btn = document.createElement("button");
            btn.type = "button";
            btn.id = "bruh" + courseIndex;
            btn.className = "btn-close";
            btn.addEventListener('click', async function () {
                saveToStorage("RemovedCourses", courses_list[courseIndex].innerText.substring(0, courses_list[courseIndex].innerText.indexOf(' ')), false);
                await btnCleaner();
                courses_list[courseIndex].remove();
                addCourseRemovingOption(); // refresh indecies.
            });
            courses_list[courseIndex].insertBefore(btn, courses_list[courseIndex].firstChild);
        }
    }

    addCourseRemovingOption();
})();
