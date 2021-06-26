class Dashboard {
    constructor() {
        this.container = this.createContainer()
    }

    createContainer() {
        try {
            const prevContainer = document.querySelector('.dashboard-container')
            if (prevContainer !== null) {
                prevContainer.remove()
            }
            const main = document.querySelector('[id="region-main-box"]')
            var moodleBoosterContainer = document.createElement("div");
            moodleBoosterContainer.id = 'dashboard-container';
            moodleBoosterContainer.className = 'dashboard-container'
            main.insertBefore(moodleBoosterContainer, main.firstChild)
            this.addDashboardContainerStyle()
            this.addSpinnerStyle();
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

    addSpinner() {
        if (!!document.getElementById('spinner')) {
            return;
        }
        var spinnerDiv = document.createElement('div');
        spinnerDiv.className = 'loader';
        spinnerDiv.id = 'spinner';
        var board = document.getElementById('dashboard-container');
        if (!!board) {
            board.appendChild(spinnerDiv);
        }
    }

    removeSpinner() {
        document.getElementById('spinner').outerHTML = "";
    }
    getButtonStyle() {
        return `
        .menu-button{
            background-color: #269CE9;
            border: none;
            color: white;
            padding: 6px 28px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 5px;
            font-size: 14px;
            border-radius: 5px;
            font-weight: bold;
          }
          
        .menu-button:hover{
            background-color: #70B9E8;
        }
        
        .menu-button:active{
            background: #269CE9;
        }
        `
    };

    addSpinnerStyle() {
        this.addStyle(`
        .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`)
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

    insertHtmlToDashboard(strictHtml, style, where = 'beforeend') {
        try {
            if (typeof strictHtml === "string") {
                this.container.insertAdjacentHTML(where, strictHtml);
            } else {
                this.container.insertAdjacentElement(where, strictHtml)
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


if (isInCourseView()) {
    createDashboard()
}
//TODO add more html content with dashboard.insertHtmlToDashboard()
