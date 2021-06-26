
function isGenButtonExist() {
    return document.getElementById('genDownloadsBtn') !== null;
}
function initGenDownloadsButton(dashboard) {
    dashboard.insertHtmlToDashboard('<button id="genDownloadsBtn" class="menu-button btn-primary">Generate Download Buttons</button>', dashboard.getButtonStyle());
    document.getElementById("genDownloadsBtn").addEventListener("click", (e) => onGenerateDownloadsClicked(dashboard));
}

function getDownloadLinksFromSection(section) {
    const bullets = section.getElementsByClassName('activity resource modtype_resource');
    let urls = []
    if (!bullets) {
        return;
    }
    for (const bullet of bullets) {
        const links = bullet.getElementsByTagName('a');
        if (!links) {
            continue;
        }
        for (let link of links) {
            urls.push(link.href);
        }
    }
    return urls;
}
function downloadAll(urls) {

    for (let url of urls) {
        var download = document.createElement('a')
        download.href = url;
        download.target = "_blank"
        download.download = " "

        download.click();
    }

}

function createSectionDownloadLink(section, urls) {
    var div = document.createElement('div');
    div.style.paddingLeft = "30px";
    var link = document.createElement('a');
    link.innerHTML = "Download all files in this section";
    link.href = "javascript:void(0);"
    div.appendChild(link)
    section.getElementsByClassName('content')[0].childNodes[0].insertAdjacentElement('afterend', div)
    link.addEventListener('click', (_) => downloadAll(urls));

}

function onGenerateDownloadsClicked(dashboard) {
    document.getElementById("genDownloadsBtn").disabled = true;
    const sections = document.getElementsByClassName('section main clearfix');
    let allUrls = []
    if (!sections) {
        return;
    }
    for (let section of sections) {
        let links = getDownloadLinksFromSection(section);
        allUrls.push(links);

        if (!links || links.length == 0) {
            continue;
        }
        createSectionDownloadLink(section, links);
    }

}


function addOneClickDownloadBtn() {
    if (isInCourseView() && !isGenButtonExist()) {
        const dashboard = window.moodleBoosterDashboard;
        initGenDownloadsButton(dashboard);
    }
}

addOneClickDownloadBtn();