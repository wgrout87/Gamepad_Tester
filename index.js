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
        createAxesLayout(gamepad.axes);
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

function createAxesLayout(axes) {
    const buttonsArea = document.getElementById("buttons");
    for (let i = 0; i < axes.length; i++) {
        buttonsArea.innerHTML += createAxesHtml(axes, i);
    }
};

function createAxesHtml(axes, index) {
    console.log(axes);
    return `<div id='axis-${index}' class='axis'>
                <div class='axis-name'>AXIS ${index}</div>
                <div class='axis-value'>${axes[index].toFixed(4)}</div>
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

function updateStick(elementId, leftRightAxis, upDownAxis) {
    const multiplier = 25;
    const leftRightAxisMovement = leftRightAxis > .2 || leftRightAxis < -.2 ? leftRightAxis : 0;
    const upDownAxisMovement = upDownAxis > .2 || upDownAxis < -.2 ? upDownAxis : 0;
    const stickLeftRight = leftRightAxisMovement * multiplier;
    const stickUpDown = upDownAxisMovement * multiplier;

    const stick = document.getElementById(elementId);
    const x = Number(stick.dataset.originalXPosition);
    const y = Number(stick.dataset.originalYPosition);

    stick.setAttribute('cx', x + stickLeftRight);
    stick.setAttribute('cy', y + stickUpDown);
};

function updateAxesGrid(axes) {
    for (let i = 0; i < axes.length; i++) {
        const axis = document.querySelector(`#axis-${i} .axis-value`);
        const value = axes[i];
        if (value > .1 || value < -0.1) {
            axis.innerHTML = value.toFixed(4);
        }
    }
};

function handleSticks(axes) {
    updateAxesGrid(axes);
    updateStick("controller-b10", axes[0], axes[1]);
    updateStick("controller-b11", axes[2], axes[3]);
};

function gameLoop() {
    if (controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex];
        handleButtons(gamepad.buttons);
        handleSticks(gamepad.axes);
    }
    requestAnimationFrame(gameLoop);
};

gameLoop();