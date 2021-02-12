let input = document.querySelector('input');
let taskList = document.querySelector('.taskList');
let container = document.querySelector('.container');
let warning = document.querySelector('.noTaskWarning');
let taskItems = [];
let sessionArray = sessionStorage.getItem('taskList'); // get items form session storage
let reloadCount = true;

// check sessionStorage is empty or not 
if (sessionArray !== null) {
    sessionArray = JSON.parse(sessionArray); // return to array
    taskItems = sessionArray; // update empty array from storder data
}

// Off warning if task available
if (taskItems.length > 0) {
    warning.style.display = "none";
    reloadCount = false;
    loadToUIfromSessionStorage(); // display all stored data
}

input.addEventListener('keyup', e => {
    if (e.which === 13 && input.value !== "") {
        taskItems.push(input.value);
        input.value = "";
        addToSessionStorage(); // call for update data to session storage

        if (reloadCount) {
            reload();
        }
    }
})

function addToSessionStorage() {
    let jsonArray = JSON.stringify(taskItems); // convert array to json
    sessionStorage.setItem('taskList', jsonArray) // store array in session storage
    loadToUIfromSessionStorage();
}

function loadToUIfromSessionStorage() {
    taskList.innerHTML = "";
    taskItems.forEach(e => {
        let newElement = document.createElement('li');
        newElement.innerHTML = `<span class="item">${e}</span>`;
        taskList.appendChild(newElement);
    })
    if (taskItems.length > 9) {
        container.classList.add('contaierOverflow'); // add scroll bar
    }
}

//clear button
const clearButton = document.querySelector(".clearBtn");
clearButton.addEventListener("click", () => {
    sessionStorage.clear();
    taskList.innerHTML = "";
    warning.style.display = "block";
    reload();
})

function reload() {
    window.location.reload();
}