let DEGREES = 0;
const DEGREES_TO_REVERSE = 180;

//TODO: Move CSS to CDN.
const addButtonStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
    .reverse-button{
        background-color: #269CE9;
        border: none;
        color: white;
        padding: 6px 28px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        border-radius: 5px;
        font-weight: bold;
      }
      
    .reverse-button:hover{
        background-color: #70B9E8;
    }
    
    .reverse-button:active{
        background: #269CE9;
    }
    `;
    document.head.append(style);
}

const addCourseReverse = () => {
    let courseContent = document.getElementsByClassName("course-content");
    if (courseContent) {
        addButtonStyle();
        let topDiv = courseContent[0];
        var reverseCourseBtn = document.createElement("button");
        reverseCourseBtn.innerHTML = 'Reverse topics order';
        reverseCourseBtn.className = 'reverse-button';
        reverseCourseBtn.addEventListener('click', async function () {
            DEGREES += DEGREES_TO_REVERSE;
            document.getElementsByClassName("section main clearfix")[0].parentElement.style.transform = `rotate(${DEGREES}deg)`;
            allTopics = document.getElementsByClassName("section main clearfix");
            for (let topicIndex = 0; topicIndex < allTopics.length; ++topicIndex) {
                allTopics[topicIndex].style.transform = `rotate(${DEGREES}deg)`;
            }
        });
        topDiv.insertBefore(reverseCourseBtn, topDiv.childNodes[0]);
    }
}

addCourseReverse();
