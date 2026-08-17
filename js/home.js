// ========================================
// Romantic Website - Home Page
// ========================================

function goTo(page) {
    window.location.href = page;
}


document.addEventListener("DOMContentLoaded", function () {

    const noButton = document.getElementById("noButton");
    const card = document.getElementById("homeCard");

    if (!noButton || !card) {
        return;
    }


    // ----------------------------------------
    // Move No button inside the card
    // ----------------------------------------

    function moveNoButton() {

        const cardRect = card.getBoundingClientRect();

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Space from card edges
        const padding = 20;

        // Maximum allowed position
        const maxLeft =
            card.clientWidth -
            buttonWidth -
            padding;

        const maxTop =
            card.clientHeight -
            buttonHeight -
            padding;

        // Minimum allowed position
        const minLeft = padding;
        const minTop = padding;


        // Generate random position
        const randomLeft =
            Math.floor(
                Math.random() *
                (maxLeft - minLeft + 1)
            ) + minLeft;

        const randomTop =
            Math.floor(
                Math.random() *
                (maxTop - minTop + 1)
            ) + minTop;


        // Change to absolute positioning
        noButton.style.position = "absolute";

        noButton.style.left = randomLeft + "px";

        noButton.style.top = randomTop + "px";

        noButton.style.zIndex = "100";
    }


    // ----------------------------------------
    // Desktop
    // ----------------------------------------

    noButton.addEventListener("mouseenter", function () {

        moveNoButton();

    });


    // ----------------------------------------
    // Mobile
    // ----------------------------------------

    noButton.addEventListener("touchstart", function (event) {

        event.preventDefault();

        moveNoButton();

    });


    // ----------------------------------------
    // Move when cursor gets close
    // ----------------------------------------

    document.addEventListener("mousemove", function (event) {

        const buttonRect =
            noButton.getBoundingClientRect();

        const buttonCenterX =
            buttonRect.left +
            buttonRect.width / 2;

        const buttonCenterY =
            buttonRect.top +
            buttonRect.height / 2;


        const distanceX =
            event.clientX - buttonCenterX;

        const distanceY =
            event.clientY - buttonCenterY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        // Cursor is close to button
        if (distance < 70) {

            moveNoButton();

        }

    });


});