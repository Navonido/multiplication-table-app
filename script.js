let multiplicand, multiplier;

window.onload = function() {
    generateQuestion();
}

function generateQuestion() {
    multiplicand = Math.floor(Math.random() * 10) + 1;
    multiplier = Math.floor(Math.random() * 10) + 1;
    
    document.getElementById('multiplicand').textContent = multiplicand;
    document.getElementById('multiplier').textContent = multiplier;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';

    createVisualization(multiplicand, multiplier);
}

function createVisualization(multiplicand, multiplier) {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';
    visualization.style.gridTemplateColumns = `repeat(${multiplier}, auto)`;

    for (let i = 0; i < multiplicand * multiplier; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        visualization.appendChild(circle);
    }
}

function checkAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    if (answer === multiplicand * multiplier) {
        showSuccess();
    } else {
        document.getElementById('feedback').textContent = "כמעט! נסה שוב.";
        document.getElementById('feedback').style.color = 'red';
    }
}

function showSuccess() {
    document.getElementById('feedback').textContent = "כל הכבוד!";
    document.getElementById('feedback').style.color = 'green';

    const sound = document.getElementById('correct-sound');
    sound.play();

    triggerFireworks();

    setTimeout(generateQuestion, 4000);
}

function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.style.display = 'block';

    for (let i = 0; i < 10; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            fireworksContainer.removeChild(firework);
        }, 1000);
    }

    setTimeout(() => {
        fireworksContainer.style.display = 'none';
    }, 2000);
}
