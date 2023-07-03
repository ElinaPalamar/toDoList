let backgroundMusic = document.getElementById('background-music');
let toggleButton = document.getElementById('toggle-music');
let iconPlay = document.getElementById('icon-play');
let iconPause = document.getElementById('icon-pause');
let backgroundImages = document.querySelectorAll('.background-image');
let starsContainer = document.querySelector('body');
let addSound = document.getElementById('add-sound');
let deleteSound = document.getElementById('delete-sound');
let showDate = document.getElementById("showDate");

function updateDateTime() {
    let currentDate = new Date();
    let options = { year: "numeric", month: "long", day: "numeric"};
    showDate.innerText = currentDate.toLocaleDateString("en-US", options);
}

setInterval(updateDateTime, 500);

updateDateTime();

toggleButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'inline';
    } else {
        backgroundMusic.pause();
        iconPlay.style.display = 'inline';
        iconPause.style.display = 'none';
    }
});

document.body.addEventListener('mousemove', function(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let offsetX = -mouseX / window.innerWidth * 20;
    let offsetY = -mouseY / window.innerHeight * 20;

    backgroundImages.forEach(function(image) {
        image.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
    });
});

function playDeleteSound() {
    let soundClone = deleteSound.cloneNode(true);
    soundClone.play();
}

function playAddSound() {
    let firstSoundClone = addSound.cloneNode(true);
    firstSoundClone.play();
}

document.querySelector("#push").onclick = function() {
    addTask();
    playAddSound();
};

document.querySelector("#newtask input").addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
    addTask();
    playAddSound();
    }
});

function addTask() {
    let taskInput = document.querySelector("#newtask input");
    let taskName = taskInput.value.trim();

    if (taskName.length === 0) {
        alert("Please Enter a Task");
    } else {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");

        let taskNameElement = document.createElement("span");
        taskNameElement.id = "taskname";
        taskNameElement.innerText = taskName;

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        let deleteIcon = document.createElement("ion-icon");
        deleteIcon.setAttribute("name", "trash-outline");
        deleteButton.appendChild(deleteIcon);

        taskElement.appendChild(taskNameElement);
        taskElement.appendChild(deleteButton);
        document.querySelector("#tasks").appendChild(taskElement);

        deleteButton.onclick = function() {
        taskElement.remove();
        playDeleteSound();
    };

        taskElement.onclick = function() {
        taskNameElement.classList.toggle("complete");
    };

        taskInput.value = "";
    }
}