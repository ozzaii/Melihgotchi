// Pet object
const pet = {
    hunger: 50,
    happiness: 50,
    energy: 50,
    existentialDread: 50,
    state: 'idle',
    lastUpdate: Date.now()
};

// Update this function in script.js
function updatePetSprite() {
    const petElement = document.getElementById('pet');
    if (pet.state === 'run') {
        petElement.src = 'run.lq.gif';
        petElement.classList.remove('idle-animation');
    } else {
        petElement.src = 'idle.lq.gif';
        petElement.classList.add('idle-animation');
    }
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
    const foodElement = event.currentTarget.querySelector('img');
    foodElement.classList.add('feeding');
    
    setTimeout(() => {
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
        pet.state = 'happy';
        updatePetSprite();
        showThought("Yum! Cosmic deliciousness!");
        updateUI();
        
        foodElement.classList.remove('feeding');
        document.getElementById('feedMenu').classList.add('hidden');
    }, 1000);
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
    updateUI();
}

function playWithPet() {
    pet.happiness = Math.min(100, pet.happiness + 25);
    pet.energy = Math.max(0, pet.energy - 15);
    pet.existentialDread = Math.max(0, pet.existentialDread - 10);
    startMiniGame();
}

function doCosmiccardio() {
    console.log("Cosmic cardio started!");
    pet.state = 'run';
    updatePetSprite();
    showThought("Time to outrun my existential dread!");
    pet.energy = Math.max(0, pet.energy - 20);
    pet.happiness = Math.min(100, pet.happiness + 10);
    updateUI();
    
    setTimeout(() => {
        pet.state = 'idle';
        updatePetSprite();
        showThought("Phew! That was a cosmic workout!");
    }, 4000);
}

// Mini-game function
function startMiniGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    const target = document.createElement('div');
    target.style.width = '20px';
    target.style.height = '20px';
    target.style.backgroundColor = 'red';
    target.style.borderRadius = '50%';
    target.style.position = 'absolute';
    gameArea.appendChild(target);

    function moveTarget() {
        const x = Math.random() * (gameArea.offsetWidth - 20);
        const y = Math.random() * (gameArea.offsetHeight - 20);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    moveTarget();

    let hits = 0;
    const maxHits = 5;
    
    target.onclick = () => {
        hits++;
        pet.energy = Math.min(100, pet.energy + 5);
        pet.happiness = Math.min(100, pet.happiness + 5);
        moveTarget();
        updateUI();
        
        if (hits >= maxHits) {
            document.getElementById('miniGame').classList.add('hidden');
            showThought("Woohoo! Astral projection mastered!");
        }
    };

    document.getElementById('miniGame').classList.remove('hidden');
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
    thoughtBubble.classList.add('visible');
    setTimeout(() => {
        thoughtBubble.classList.remove('visible');
        thoughtBubble.classList.add('hidden');
    }, 3000);
}

// Event listeners
document.getElementById('feedBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('feedMenu').classList.toggle('hidden');
});

document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const food = e.currentTarget.getAttribute('data-food');
        feedPet(food);
    });
});

document.getElementById('playBtn').addEventListener('click', (e) => {
    e.preventDefault();
    playWithPet();
});

document.getElementById('sportBtn').addEventListener('click', (e) => {
    e.preventDefault();
    doCosmiccardio();
});

// Tap to pet (works on both mobile and desktop)
const petElement = document.getElementById('pet');
petElement.addEventListener('click', (e) => {
    e.preventDefault();
    petPet();
});

// Prevent default touch behavior on the entire game container
document.querySelector('.game-container').addEventListener('touchstart', (e) => {
    e.preventDefault();
}, { passive: false });

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
        "I wonder if Schrödinger's cat is hiring.",
        "Do androids dream of electric sheep?",
        "To be, or not to be... that is the quantum question.",
        "I'm not lazy, I'm on energy-saving mode.",
        "Error 404: Meaning of life not found.",
        "I'm not antisocial, I'm selectively social."
    ];
    if (Math.random() < 0.3) { // 30% chance of a random thought
        showThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
    }
}, 15000);
