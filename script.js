// Pet object
const pet = {
    hunger: 50,
    happiness: 50,
    energy: 50,
    existentialDread: 50,
    state: 'idle',
    lastUpdate: Date.now()
};

// Update pet stats
function updatePetStats() {
    const now = Date.now();
    const timePassed = (now - pet.lastUpdate) / 1000; // in seconds

    pet.hunger = Math.max(0, Math.min(100, pet.hunger - timePassed * 0.1));
    pet.happiness = Math.max(0, Math.min(100, pet.happiness - timePassed * 0.05));
    pet.energy = Math.max(0, Math.min(100, pet.energy - timePassed * 0.08));
    pet.existentialDread = Math.max(0, Math.min(100, pet.existentialDread + timePassed * 0.03));

    pet.lastUpdate = now;

    updatePetState();
    updatePetSprite();
    updateUI();
}

// Update pet state based on stats
function updatePetState() {
    if (pet.hunger < 20 || pet.happiness < 20 || pet.energy < 20 || pet.existentialDread > 80) {
        pet.state = 'sad';
    } else if (pet.hunger > 80 && pet.happiness > 80 && pet.energy > 80 && pet.existentialDread < 20) {
        pet.state = 'happy';
    } else {
        pet.state = 'idle';
    }
}

// Update pet sprite based on state
function updatePetSprite() {
    const petElement = document.getElementById('pet');
    petElement.className = pet.state;
}

// Interaction functions
function feedPet(food) {
    switch(food) {
        case 'cosmic-burger':
            pet.hunger = Math.min(100, pet.hunger + 30);
            pet.existentialDread = Math.max(0, pet.existentialDread - 10);
            break;
        case 'quantum-pizza':
            pet.hunger = Math.min(100, pet.hunger + 20);
            pet.happiness = Math.min(100, pet.happiness + 10);
            break;
        case 'etheric-salad':
            pet.hunger = Math.min(100, pet.hunger + 10);
            pet.energy = Math.min(100, pet.energy + 20);
            break;
    }
    pet.state = 'eating';
    updatePetSprite();
    showThought("Yum! Cosmic deliciousness!");
    setTimeout(() => {
        pet.state = 'idle';
        updatePetSprite();
    }, 3000);
}

function petPet() {
    pet.happiness = Math.min(100, pet.happiness + 15);
    pet.existentialDread = Math.max(0, pet.existentialDread - 5);
    pet.state = 'happy';
    updatePetSprite();
    showThought("Ah, the beauty of quantum entanglement!");
    setTimeout(() => {
        pet.state = 'idle';
        updatePetSprite();
    }, 2000);
}

function playWithPet() {
    pet.happiness = Math.min(100, pet.happiness + 25);
    pet.energy = Math.max(0, pet.energy - 15);
    pet.existentialDread = Math.max(0, pet.existentialDread - 10);
    pet.state = 'run';
    updatePetSprite();
    showThought("Woohoo! Astral projection time!");
    setTimeout(() => {
        pet.state = 'idle';
        updatePetSprite();
    }, 5000);
    startMiniGame();
}

// Mini-game function
function startMiniGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    const target = document.createElement('div');
    target.style.width = '20px';
    target.style.height = '20px';
    target.style.backgroundColor = 'red';
    target.style.position = 'absolute';
    gameArea.appendChild(target);

    function moveTarget() {
        const x = Math.random() * (gameArea.offsetWidth - 20);
        const y = Math.random() * (gameArea.offsetHeight - 20);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    moveTarget();

    target.onclick = () => {
        pet.energy = Math.min(100, pet.energy + 5);
        pet.happiness = Math.min(100, pet.happiness + 5);
        moveTarget();
        updateUI();
    };

    document.getElementById('miniGame').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('miniGame').classList.add('hidden');
    }, 10000);
}

// UI update function
function updateUI() {
    document.getElementById('hungerBar').style.width = `${pet.hunger}%`;
    document.getElementById('happinessBar').style.width = `${pet.happiness}%`;
    document.getElementById('energyBar').style.width = `${pet.energy}%`;
    document.getElementById('dreadBar').style.width = `${pet.existentialDread}%`;
}

// Thought bubble function
function showThought(thought) {
    const thoughtBubble = document.getElementById('thoughtBubble');
    const thoughtText = document.getElementById('petThoughts');
    thoughtText.textContent = thought;
    thoughtBubble.classList.remove('hidden');
    setTimeout(() => {
        thoughtBubble.classList.add('hidden');
    }, 3000);
}

// Event listeners
document.getElementById('feedBtn').addEventListener('click', () => {
    document.getElementById('feedMenu').classList.toggle('hidden');
});

document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const food = e.currentTarget.getAttribute('data-food');
        feedPet(food);
        document.getElementById('feedMenu').classList.add('hidden');
    });
});

document.getElementById('petBtn').addEventListener('click', petPet);
document.getElementById('playBtn').addEventListener('click', playWithPet);

// Game loop
function gameLoop() {
    updatePetStats();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

// Random thoughts
setInterval(() => {
    const thoughts = [
        "Is this the real life? Is this just fantasy?",
        "I think, therefore I am... I think.",
        "What if we're all just code in a cosmic computer?",
        "Meow... I mean, beep boop!",
        "I wonder if Schrödinger's cat is hiring."
    ];
    if (Math.random() < 0.3) { // 30% chance of a random thought
        showThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
    }
}, 15000);
