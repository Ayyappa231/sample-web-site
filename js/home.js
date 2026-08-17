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
    // Move No button around lower portion
    // of the card only
    // ----------------------------------------

    function moveNoButton() {

        const cardWidth = card.clientWidth;
        const cardHeight = card.clientHeight;

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Horizontal padding from card edges
        const sidePadding = 25;

        // Keep the button in the lower part
        // of the card.
        const lowerStart = cardHeight * 0.62;

        // Bottom padding
        const bottomPadding = 25;


        // ------------------------------------
        // Calculate safe boundaries
        // ------------------------------------

        const minLeft = sidePadding;

        const maxLeft =
            cardWidth -
            buttonWidth -
            sidePadding;


        const minTop = lowerStart;

        const maxTop =
            cardHeight -
            buttonHeight -
            bottomPadding;


        // ------------------------------------
        // Generate random position
        // ------------------------------------

        const randomLeft =
            Math.floor(
                Math.random() *
                Math.max(maxLeft - minLeft, 1)
            ) + minLeft;


        const randomTop =
            Math.floor(
                Math.random() *
                Math.max(maxTop - minTop, 1)
            ) + minTop;


        // ------------------------------------
        // Apply position
        // ------------------------------------

        noButton.style.position = "absolute";

        noButton.style.left =
            randomLeft + "px";

        noButton.style.top =
            randomTop + "px";

        noButton.style.zIndex = "100";
    }


    // ----------------------------------------
    // Desktop
    // ----------------------------------------

    noButton.addEventListener(
        "mouseenter",
        function () {

            moveNoButton();

        }
    );


    // ----------------------------------------
    // Mobile / Touch
    // ----------------------------------------

    noButton.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            moveNoButton();

        }
    );


    // ----------------------------------------
    // Detect cursor approaching button
    // ----------------------------------------

    document.addEventListener(
        "mousemove",
        function (event) {

            const buttonRect =
                noButton.getBoundingClientRect();


            const buttonCenterX =
                buttonRect.left +
                buttonRect.width / 2;


            const buttonCenterY =
                buttonRect.top +
                buttonRect.height / 2;


            const distanceX =
                event.clientX -
                buttonCenterX;


            const distanceY =
                event.clientY -
                buttonCenterY;


            const distance =
                Math.sqrt(
                    distanceX * distanceX +
                    distanceY * distanceY
                );


            // Move when cursor comes close
            if (distance < 70) {

                moveNoButton();

            }

        }
    );

});
