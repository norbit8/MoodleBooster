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
        const buttons = document.querySelectorAll(".btn-close")
        buttons.forEach(e => e.remove())
    }

    function createHoverEffect(btn) {
        btn.addEventListener("mouseover", function () {
            this.style.color = "#ff1c03";
        });
        btn.addEventListener("mouseout", function () {
            this.style.color = "#961406";
        });
    }

    async function clickListener(courses_list, courseIndex) {
        const link = courses_list[courseIndex].querySelector("a[href]").getAttribute("href")
        const courseID = new URL(link).searchParams.get("id")
        await sendMessageToBackgroundScript("SetStorageParam", {
            key: storageKey,
            param: "RemovedCourses",
            data: courseID,
            overwrite: false
        })
        await btnCleaner();
        courses_list[courseIndex].remove();
        addCourseRemovingOption(); // refresh indices.
    }

    const BUTTON_STYLE = "background-color: Transparent;border: none;overflow: hidden;color: #961406 !important;font: caption; font-size: 20px !important; transform: translate(-15px, 27px);"

    /**
     * Adds buttons that removes courses from the courses pane
     */
    async function addCourseRemovingOption() {
        const courses_list = document.getElementsByClassName('type_course depth_3 contains_branch');
        if (courses_list.length === 0) {
            return
        }
        for (let courseIndex = 0; courseIndex < courses_list.length - 1; ++courseIndex) {
            let btn = document.createElement("button");
            btn.type = "button";
            btn.id = "bruh" + courseIndex;
            btn.className = "btn-close";
            btn.style = BUTTON_STYLE
            btn.innerHTML = "✖";
            btn.addEventListener('click', () => clickListener(courses_list, courseIndex));
            createHoverEffect(btn)
            courses_list[courseIndex].insertBefore(btn, courses_list[courseIndex].firstChild);
        }
    }

    addCourseRemovingOption();
})();
