function addGradesButton() {
    if (isCsGradesAvailable() && !isButtonExist()) { //Only if exists grades in cs admin add those
        const dashboard = window.moodleBoosterDashboard;
        initCsGradesButton(dashboard);
    }

}
function isButtonExist() {
    return document.getElementById('gradesBtn') !== null;

}
function isCsGradesAvailable() {
    return !!document.getElementsByClassName("block_course_admin")[0];
}
function initCsGradesButton(dashboard) {
    dashboard.insertHtmlToDashboard('<button id="gradesBtn" class="menu-button">Show CS Admin Grades</button>', dashboard.getButtonStyle());
    document.getElementById("gradesBtn").addEventListener("click", (e) => onShowGradesClicked(e, dashboard));
}
function parseCommentsFromCsAdmin(csHtml, tableRow) {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(csHtml, 'text/html');
    var data = htmlDoc.getElementsByTagName('ul');
    if (!!data) {
        tableRow.push(`<td><ul>${htmlDoc.getElementsByTagName('ul')[0].innerHTML}</ul></td>`);
    }
    else {
        tableRow.push('<td></td>')
    }

}
async function extractDataFromTable(table) {
    let tableRows = [];

    //Build the table of grades :
    for (var i = 0, row; row = table.rows[i]; i++) {
        let tableRow = [];
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (j === 0 || j === 3) {
                continue; //empty col or date col
            }
            tableRow.push(`<td>${col.innerText}</td>`);
            if (j === 2) //Link to the comments 
            {
                const link = col.querySelector('a')
                if (!link) {
                    continue;
                }
                const url = link.href;
                if (!!url) {
                    await fetch(url).then(function (response) {
                        // When the page is loaded convert it to text
                        return response.text()
                    })
                        .then((html) => parseCommentsFromCsAdmin(html, tableRow)
                        ).catch((e)=>console.error(e));
                }
            }
        }
        tableRows.push(`<tr>${tableRow.join().replaceAll(',', '')}</tr>`);
    }
    tableRows = tableRows.join().replaceAll(',', '');
    return tableRows;
}

async function onShowGradesClicked(e, dashboard) {
    if (!!document.getElementById('gradesTable') || !!document.getElementById('loadingSpinner')) {
        return;
    }
    dashboard.addSpinner();

    const section = document.getElementsByClassName("block_course_admin")[0];
    if (!section) {
        return; //No cs grades
    }
    const table = section.querySelector('table');
    const tableRows = await extractDataFromTable(table);

    let template = getGradesTemplate(tableRows);
    let topDiv = document.getElementsByClassName("course-content")[0];
    var gradesDiv = document.createElement("div");
    gradesDiv.className = ''
    gradesDiv.innerHTML = template;
    gradesDiv.id = 'gradesTable';
    topDiv.insertBefore(gradesDiv, topDiv.childNodes[0]);
    dashboard.removeSpinner();
};
function getGradesTemplate(tableRows) {
    return `
     <h5>ציונים</h5>
     <table class="scheduale-table">
         <thead>
             <tr>
                 <th style="width: 33%;"> שם </th>
                 <th style="width: 33%;">ציון </th>
                 <th style="width: 34%;"> הערות </th>
             </tr>
         </thead>
         <tbody>
             ${tableRows}
         </tbody>
     </table>
     `;
}



addGradesButton()

