let controllerIndex = null;

window.addEventListener("gamepadconnected", (event) => {
    handleConnectDisconnect(event, true);
});

window.addEventListener("gamepaddisconnected", (event) => {
    handleConnectDisconnect(event, false);
});

function handleConnectDisconnect(event, connected) {
    const controllerAreaNotConnected = document.getElementById("controller-not-connected-area");
    const controllerAreaConnected = document.getElementById("controller-connected-area");

    const gamepad = event.gamepad;
    console.log(gamepad);

    if (connected) {
        controllerIndex = gamepad.index;
        controllerAreaNotConnected.style.display = "none";
        controllerAreaConnected.style.display = "block";
        createButtonLayout(gamepad.buttons);
    } else {
        controllerIndex = null;
        controllerAreaNotConnected.style.display = "block";
        controllerAreaConnected.style.display = "none";
    }
};

function createButtonLayout(buttons) {
    const buttonArea = document.getElementById("buttons");
    buttonArea.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
        buttonArea.innerHTML += createButtonHtml(i, 0);
    }
};

function createButtonHtml(index, value) {
    return `<div class="button" id="button-${index}">
                <svg width="10px" height="50px">
                    <rect width="10px" height="50px" fill="grey"></rect>
                    <rect
                        class="button-meter"
                        width="10px"
                        x="0"
                        y="50"
                        data-original-y-position="50"
                        height="50px"
                        fill="rgb(60, 61, 60)"
                    ></rect>
                </svg>
                <div class="button-text-area">
                    <div class="button-name">B${index}</div>
                    <div class="button-value">${value.toFixed(2)}</div>
                </div>
            </div>`;
};

function updateButtonOnGrid(index, value) {
    const buttonArea = document.getElementById(`button-${index}`);
    const buttonValue = buttonArea.querySelector(".button-value");
    buttonValue.innerHTML = value.toFixed(2);

    const buttonMeter = buttonArea.querySelector(".button-meter");
    const meterHeight = Number(buttonMeter.dataset.originalYPosition);
    const meterPosition = meterHeight - (meterHeight / 100) * (value * 100);
    buttonMeter.setAttribute('y', meterPosition);
};

function updateControllerButton(index, value) {
    const button = document.getElementById(`controller-b${index}`);
    const selectedButtonClass = "selected-button";

    if (button) {
        if (value > 0) {
            button.classList.add(selectedButtonClass);
            button.style.filter = `contrast(${value * 200}%)`;
        } else {
            button.classList.remove(selectedButtonClass);
            button.style.filter = 'contrast(100%)';
        }
    }
};

function handleButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        const buttonValue = buttons[i].value;
        updateButtonOnGrid(i, buttonValue);
        updateControllerButton(i, buttonValue);
    }
};

function gameLoop() {
    if (controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex];
        handleButtons(gamepad.buttons);
    }
    requestAnimationFrame(gameLoop);
};

gameLoop();