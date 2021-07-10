const DAYS_MAPPING = {
    'א': 'sun',
    'ב': 'mon',
    'ג': 'tue',
    'ד': 'wed',
    'ה': 'thu',
}

const TYPES_MAPPING = {
    'תרג': 'T',
    'סדנה': 'S',
    'שעור': 'C',
    'שות': 'Q'
}

/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

function isPageInEnglish() {
    return document.querySelector('.dropdown-toggle.nav-link').innerText.trim() === "English"
}

const getTemplate = (minTime, maxTime) => {
    let days = ["sun", "mon", "tue", "wed", "thu"];
    let tableRows = [];
    for (let time = minTime; time <= maxTime; time++) {
        let dayRow = `<td>${time}:00</td>`
        days.forEach(day => {
            dayRow += `<td id=${day}-${time}></td>`
        })
        tableRows.push(`<tr>${dayRow}</tr>`);
    }
    tableRows = tableRows.join().replaceAll(',', '');
    const isHebrew = !isPageInEnglish()
    return `
    <h5>${isHebrew ? 'זמני הקורס' : 'Course Schedule'}</h5>
    <table class="scheduale-table">
        <thead>
            <tr>
                <th style="width: 3%;"></th>
                <th style="width: 19%;"> ${isHebrew ? 'ראשון' : 'Sunday'} </th>
                <th style="width: 19%;"> ${isHebrew ? 'שני' : 'Monday'} </th>
                <th style="width: 19%;"> ${isHebrew ? 'שלישי' : 'Tuesday'} </th>
                <th style="width: 19%;"> ${isHebrew ? 'רביעי' : 'Wednesday'} </th>
                <th style="width: 19%;"> ${isHebrew ? 'חמישי' : 'Thursday'} </th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>
    `;
}

const STYLE = `
    .scheduale-area{
        border-bottom: 1px solid #dee2e6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
        margin-bottom: 5px;
        width:100%;
    }
    .scheduale-area h5{
            font-size: 20px;
            font-weight: 500;
    }
    .scheduale-table{
        width: 100%;
        text-align: center;
    }

    .scheduale-table td{
        border: 1px solid black;
    }

    .scheduale-table th{
        border: 1px solid black;
    }

    .scheduale-table thead{
        background-color: #e2e2e2;
    }
    `

const getMinMaxTimes = (data) => {
    let minTime = 20;
    let maxTime = 8;
    for (let item of data) {
        let min = Math.min(item["startTime"], item["endTime"]);
        let max = Math.max(item["startTime"], item["endTime"]);
        if (min < minTime) {
            minTime = min;
        }
        if (max > maxTime) {
            maxTime = max
        }
    }
    return {minTime, maxTime};
}

const isScheduleExist = () => {
    let element = document.querySelector('.scheduale-area')
    return element !== null
}

const addCourseScheduale = () => {
    let dashboard = window.moodleBoosterDashboard
    if (dashboard && !isScheduleExist()) {
        let dataToAdd = getSchedualeData();
        let {minTime, maxTime} = getMinMaxTimes(dataToAdd);
        let courseSchedule = document.createElement("div");
        courseSchedule.className = 'scheduale-area'
        courseSchedule.innerHTML = getTemplate(minTime, maxTime);
        dashboard.insertHtmlToDashboard(courseSchedule, STYLE)
        addDataToScheduale(dataToAdd);
    }
}

const addDataToScheduale = (dataToAdd) => {
    const isHebrew = !isPageInEnglish()
    for (let data of dataToAdd) {
        let typeColor = '#e2e2e2';
        let typeName = 'סוג לא ידוע';
        switch (data["type"]) {
            case 'T':
                typeColor = '#ffd359';
                typeName = isHebrew ? 'תרגול' : "Tirgul";
                break;
            case 'S':
                typeColor = '#ff78df';
                typeName = isHebrew ? 'סדנה' : "Workshop";
                break;
            case 'C':
                typeColor = '#9aff91';
                typeName = isHebrew ? 'שיעור' : "Lecture";
                break;
            case 'Q':
                typeColor = '#9ef0ff';
                typeName = 'שות'
                break;
        }
        for (let i = 0; i < data["endTime"] - data["startTime"]; i++) {
            let cell = document.getElementById(`${data["day"]}-${data["startTime"] + i}`);
            cell.style.backgroundColor = typeColor;
            cell.innerHTML = `
                <div>${typeName}</div>
                <div>${isHebrew ? "קבוצה:" : "Group:"} ${data["group"]}</div>
                <div>${isHebrew ? "מרצה:" : "Teacher:"} ${data["teacher"]}</div>
                ${data["location"] !== "Unknown" ? `<div>${data["location"]}</div>` : ""}
            `
        }
    }
}

const getSchedualeData = () => {
    let shnatonArea = document.getElementById("shnaton-body");
    let rows = shnatonArea.childNodes[0].childNodes;
    let schedualeRawData = {};
    for (let row in rows) {
        if (row > 4) {
            let dataIndex = Object.keys(schedualeRawData).length;
            schedualeRawData[dataIndex] = [];
            let cellIndex = 0;
            for (let cell of rows[row].childNodes) {
                let data = cell?.childNodes[0]?.data
                if (data) {
                    schedualeRawData[dataIndex].push(data.trim());
                } else {
                    data = cell?.childNodes[0]?.childNodes[0]?.data;
                    if (data) {
                        let startTime = data.substring(data.indexOf('-') + 1, data.lastIndexOf(':'));
                        let endTime = data.substring(0, data.indexOf(':'));
                        schedualeRawData[dataIndex].push(parseInt(startTime));
                        schedualeRawData[dataIndex].push(parseInt(endTime) + 1);

                    } else {
                        switch (cellIndex) {
                            case 0:
                                schedualeRawData[dataIndex].push("Unknown")
                                break;
                            case 3:
                                schedualeRawData[dataIndex].push("קבוצה לא ידועה")
                                break;
                            case 4:
                                schedualeRawData[dataIndex].push("סוג לא ידוע")
                                break;
                            case 5:
                                schedualeRawData[dataIndex].push("מורה לא ידוע")
                                break;
                        }
                    }
                }
                cellIndex += 1;
            }
            if (schedualeRawData[dataIndex].length == 0) {
                delete schedualeRawData[dataIndex];
            }
        }
    }
    let schedualeData = [];
    for (let rawData in schedualeRawData) {
        if (schedualeRawData[rawData].length > 6) {
            let item = {};
            item["location"] = schedualeRawData[rawData][0];
            item["startTime"] = schedualeRawData[rawData][1];
            item["endTime"] = schedualeRawData[rawData][2];
            item["day"] = DAYS_MAPPING[schedualeRawData[rawData][3]];
            item["group"] = schedualeRawData[rawData][5];
            item["type"] = TYPES_MAPPING[schedualeRawData[rawData][6]];
            item["teacher"] = schedualeRawData[rawData].length == 8 ? schedualeRawData[rawData][7] : schedualeData[schedualeData.length - 1]["teacher"]
            schedualeData.push(item);
        }
    }
    return schedualeData;
}


function main(){
    addCourseScheduale()
}

if(window.RunContentScripts){
    main()
}
