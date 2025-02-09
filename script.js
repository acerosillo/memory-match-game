const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
let cards = [...images, ...images]; // Duplicate images for pairs
let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let board = document.getElementById("gameBoard");
let statusMessage = document.getElementById("statusMessage");
let pairsLeftMessage = document.getElementById("pairsLeftMessage");

// Shuffle function
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Create game board
function setupGame() {
    board.innerHTML = "";
    shuffledCards = shuffle(cards);
    matchedCards = [];
    flippedCards = [];

    shuffledCards.forEach((image, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);

        let img = document.createElement("img");
        img.src = `images/${image}`;
        img.alt = "Memory Card";
        card.appendChild(img);

        board.appendChild(card);
    });

    statusMessage.textContent = "Find all the matching pairs!";
    statusMessage.style.opacity = "1";
    updatePairsLeft();
}

// Flip card function
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Check for match
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        matchedCards.push(card1, card2);
        animateStatusMessage("Great! It's a match!");
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        animateStatusMessage("Try again!");
    }

    flippedCards = [];
    updatePairsLeft();

    // Check for win
    if (matchedCards.length === cards.length) {
        animateStatusMessage("Congratulations! You won!");
    }
}

// Animate status message
function animateStatusMessage(message) {
    statusMessage.textContent = message;
    statusMessage.style.opacity = "1";
    statusMessage.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    statusMessage.style.transform = "scale(1.2)";

    setTimeout(() => {
        statusMessage.style.opacity = "1";
        statusMessage.style.transform = "scale(1)";
    }, 500);
}

// Update pairs left message
function updatePairsLeft() {
    let pairsLeft = (cards.length / 2) - (matchedCards.length / 2);
    pairsLeftMessage.textContent = `${pairsLeft} pairs left to find `;
}

// Restart game
document.getElementById("restartButton").addEventListener("click", setupGame);

// Start the game
setupGame();
