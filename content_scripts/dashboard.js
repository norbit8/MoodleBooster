class Dashboard {
    constructor() {
        this.container = this.createContainer()
    }

    createContainer() {
        try {
            const prevContainer = document.querySelector('.dashboard-container')
            if(prevContainer !== null){
                prevContainer.remove()
            }
            const main = document.querySelector('[id="region-main-box"]')
            var moodleBoosterContainer = document.createElement("div");
            moodleBoosterContainer.className = 'dashboard-container'
            main.insertBefore(moodleBoosterContainer, main.firstChild)
            this.addDashboardContainerStyle()
            return moodleBoosterContainer;
        } catch (err) {
            return null;
        }
    }

    /**
     * Utility function to add CSS in multiple passes.
     * @param {string} styleString
     */
    addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

    addDashboardContainerStyle() {
        this.addStyle(`
        .dashboard-container{
            border: 1px solid #c6bda8; 
            display: flex;
            flex-direction: column;
            align-items:center;
            margin-left: 30px;
            margin-right:30px;
            border-radius:5px;
            padding: 20px;
            background-color: #CCF2FF;
        }
        `);
    }

    insertHtmlToDashboard(strictHtml, style) {
        try {
            if (typeof strictHtml === "string") {
                this.container.insertAdjacentHTML('beforeend', strictHtml);
            } else {
                this.container.insertAdjacentElement('beforeend', strictHtml)
            }
            this.addStyle(style);
        } catch (err) {
            console.log(err)
        }
    }
}

function isInCourseView() {
    let url = new URL(window.location.href)
    return url.searchParams.get("id") !== null && url.pathname.includes("course/view.php")
}

async function createDashboard() {
    const dashboard = new Dashboard()
    window.moodleBoosterDashboard = dashboard
    dashboard.insertHtmlToDashboard('<h1 class="title">MoodleBooster Dashboard</h1>', `.title{font-family:Arial; margin-bottom:15px;}`)
}


function main() {
    if (isInCourseView()) {
        createDashboard()
    }
}

if(ContentScriptsEnabled){
    main()
}
