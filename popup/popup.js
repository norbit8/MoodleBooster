/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Given the name of a beast, get the URL to the corresponding image.
         */
        function beastNameToURL(beastName) {
            switch (beastName) {
                case "Remove Courses":
                    browser.tabs.executeScript({ file: "./../content_scripts/courseRemover.js" }).catch(
                        reportError
                    );
                    return;
                case "Dark Mode":
                    // TODO: implement
                    return;
                case "Enhance Page":
                    // TODO: implement
                    return;
                case "Reset":
                    // TODO: implement
                    return;
            }
        }

        /**
         * Insert the page-hiding CSS into the active tab,
         * then get the beast URL and
         * send a "beastify" message to the content script in the active tab.
         */
        //  function beastify(tabs) {
        //     browser.tabs.insertCSS({code: hidePage}).then(() => {
        //       let url = beastNameToURL(e.target.textContent);
        //       browser.tabs.sendMessage(tabs[0].id, {
        //         command: "beastify",
        //         beastURL: url
        //       });
        //     });
        //   }


        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not beastify: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.classList.contains("btn")) {
            console.log("what?");
            beastNameToURL(e.target.textContent);
            // browser.tabs.query({active: true, currentWindow: true})
            //   .then(beastify)
            //   .catch(reportError);
        }
    });
}

listenForClicks();