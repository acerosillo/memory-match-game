// Array of random win messages
const winMessages = [
    "You’re like a WiFi signal—sometimes weak, but I still can’t live without you.",
    "I’d be lost without you... just like my will to live some days.",
    "If love is a battlefield, then we’re both the casualties.",
    "I don’t need therapy; I have you... oh wait, now I probably do need therapy.",
    "I’d say you’re my sunshine, but you’re more like that flickering light in the basement that I keep ignoring."
];


const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
let cards = [...images, ...images]; // Duplicate images for pairs
let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let board = document.getElementById("gameBoard");
let statusMessage = document.getElementById("statusMessage");
let pairsLeftMessage = document.getElementById("pairsLeftMessage");

// Sound effects
const correctSound = new Audio('./audio/correct.mp3'); // Path to the correct match sound
const incorrectSound = new Audio('./audio/incorrect.mp3'); // Path to the incorrect match sound

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
        correctSound.play(); // Play correct sound
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        animateStatusMessage("Try again!");
        incorrectSound.play(); // Play incorrect sound
    }

    flippedCards = [];
    updatePairsLeft();

    // Check for win
    if (matchedCards.length === cards.length) {
        showWinScreen();
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

// Show win screen with delay and fade-out effect
function showWinScreen() {
    // Fade out the game board and status message before showing win screen
    board.style.transition = "opacity 1s ease-out";
    statusMessage.style.transition = "opacity 1s ease-out";
    board.style.opacity = "0";
    statusMessage.style.opacity = "0";

    // Delay to allow fade-out effect
    setTimeout(() => {
        // Play MP3 sound
        let audio = new Audio('./audio/spin.mp3'); // Replace with the correct file path
        audio.loop = true;  // Enable looping
        audio.play();

        // Randomly select a win message
        const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)];

        // Show win screen
        document.body.innerHTML = "<div style='text-align:center; font-size:24px; margin-top:120px;'>" +
            `<h1 class='random-msg'>${randomMessage}</h1><div class='image-baby-wrapper'><span class='heart-shape'></span></div>` +
            "<h2>Happy Valentines!!</h2><button onclick='location.reload()' class='cta-btn'>Play Again</button>" +
            "</div>";

        // Fade in the win screen content
        const winScreen = document.querySelector('div');
        winScreen.style.opacity = "0";
        winScreen.style.transition = "opacity 1s ease-in";
        winScreen.style.opacity = "1";

    }, 2300);  // Delay for 1 second before showing the win screen
}

// Update pairs left message
function updatePairsLeft() {
    let pairsLeft = (cards.length / 2) - (matchedCards.length / 2);
    pairsLeftMessage.textContent = `Pairs left to find: ${pairsLeft}`;
}

// Restart game
document.getElementById("restartButton").addEventListener("click", setupGame);

// Start the game
setupGame();
