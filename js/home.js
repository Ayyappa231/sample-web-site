// ========================================
// Romantic Website - Home Page
// ========================================


// ----------------------------------------
// Navigate to another page
// ----------------------------------------

function goTo(page) {
    window.location.href = page;
}


// ----------------------------------------
// Playful "No" button
// ----------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    const noButton = document.getElementById("noButton");
    const card = document.querySelector(".card");

    if (!noButton || !card) {
        return;
    }


    // ------------------------------------
    // Move the button
    // ------------------------------------

    function moveNoButton() {

        const cardRect = card.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        // Keep the button safely inside the card
        const padding = 25;

        const maxX =
            cardRect.width -
            buttonRect.width -
            padding;

        const maxY =
            cardRect.height -
            buttonRect.height -
            padding;

        const minX = padding;
        const minY = padding;


        // Generate a random position
        const randomX =
            Math.floor(
                Math.random() *
                Math.max(maxX - minX, 1)
            ) + minX;

        const randomY =
            Math.floor(
                Math.random() *
                Math.max(maxY - minY, 1)
            ) + minY;


        // Change button to absolute positioning
        noButton.style.position = "absolute";

        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";

        noButton.style.zIndex = "10";
    }


    // ------------------------------------
    // Desktop - mouse approaching button
    // ------------------------------------

    noButton.addEventListener("mouseenter", function () {

        moveNoButton();

    });


    // ------------------------------------
    // Mobile / touch devices
    // ------------------------------------

    noButton.addEventListener("touchstart", function (event) {

        event.preventDefault();

        moveNoButton();

    });


    // ------------------------------------
    // Also move when mouse gets close
    // ------------------------------------

    document.addEventListener("mousemove", function (event) {

        const rect = noButton.getBoundingClientRect();

        const buttonCenterX =
            rect.left + rect.width / 2;

        const buttonCenterY =
            rect.top + rect.height / 2;


        const distanceX =
            event.clientX - buttonCenterX;

        const distanceY =
            event.clientY - buttonCenterY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        // If cursor comes within 70px,
        // move the button
        if (distance < 70) {

            moveNoButton();

        }

    });


    // ------------------------------------
    // Prevent accidental click
    // ------------------------------------

    noButton.addEventListener("click", function (event) {

        // If the button has moved,
        // prevent accidental clicking.
        if (noButton.dataset.moved === "true") {

            event.preventDefault();

            noButton.dataset.moved = "false";

            return;

        }

    });


    // ------------------------------------
    // Mark button as moved
    // ------------------------------------

    const originalMove = moveNoButton;

});
