class Dashboard{
    constructor(){
        this.container = this.createContainer()
    }
    createContainer(){
        try{
            const main = document.querySelector('[id="region-main-box"]')
            var moodleBoosterContainer = document.createElement("div");
            moodleBoosterContainer.className = 'dashboard-container'
            main.insertBefore(moodleBoosterContainer,main.firstChild)
            this.addDashboardContainerStyle()
            return moodleBoosterContainer;
        }catch(err){
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
            min-height:225px;
            border-radius:5px;
            background-color: #CCF2FF;
        }
        `);
    }
    insertHtmlToDashboard(strictHtml,style){
        try{
            this.container.insertAdjacentHTML('beforeend',strictHtml );
            this.addStyle(style);
        }catch(err){
            console.log(err)
        }
    }
}
const dashboard = new Dashboard()
dashboard.insertHtmlToDashboard('<h1 class="title">MoodleBooster Dashboard</h1>',`.title{font-family:Arial;}`)
//TODO add more html content with dashboard.insertHtmlToDashboard()