let multiplicand, multiplier;
let attempts = 0;
let backgroundImages = ['background1.jpg', 'background2.jpg'];
let currentBackgroundIndex = 0;

window.onload = function() {
    generateQuestion();
}

function generateQuestion() {
    const maxMultiplicand = parseInt(document.getElementById('max-multiplicand').value);
    const maxMultiplier = parseInt(document.getElementById('max-multiplier').value);

    multiplicand = Math.floor(Math.random() * maxMultiplicand) + 1;
    multiplier = Math.floor(Math.random() * maxMultiplier) + 1;

    document.getElementById('multiplicand').textContent = multiplicand;
    document.getElementById('multiplier').textContent = multiplier;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-question').style.display = 'none';
    attempts = 0;

    createVisualization(multiplicand, multiplier);
    toggleBackgroundImage();
}

function toggleBackgroundImage() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    if (currentBackgroundIndex === 1) {
        document.body.classList.add('tile');  // Apply TILE layout for background2
    } else {
        document.body.classList.remove('tile');  // Remove TILE layout for other backgrounds
    }
    document.body.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
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
    attempts++;
    if (answer === multiplicand * multiplier) {
        showSuccess();
    } else {
        document.getElementById('feedback').textContent = "כמעט! נסה שוב.";
        document.getElementById('feedback').style.color = 'red';
        if (attempts > 0) {
            document.getElementById('next-question').style.display = 'inline-block';
        }
    }
}

function showSuccess() {
    document.getElementById('feedback').textContent = "כל הכבוד!";
    document.getElementById('feedback').style.color = 'green';

    const sound = document.getElementById('correct-sound');
    sound.play();

    triggerFireworks();
    
    setTimeout(generateQuestion, 3000);  // Automatically generate next question after 3 seconds
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

function showAnswer() {
    document.getElementById('feedback').textContent = 'התשובה הנכונה מוצגת. ראה את הסכימה הגרפית:';
    document.getElementById('feedback').style.color = 'blue';

    animateSumVisualization(multiplicand, multiplier);
}

function animateSumVisualization(multiplicand, multiplier) {
    const visualization = document.getElementById('visualization');
    let sum = 0;
    let currentRow = 0;

    const interval = setInterval(() => {
        const rowStartIndex = currentRow * multiplier;
        const rowEndIndex = rowStartIndex + multiplier;

        // Color the current row circles
        for (let i = rowStartIndex; i < rowEndIndex; i++) {
            const circle = visualization.children[i];
            circle.style.backgroundColor = 'yellow';
        }

        sum += multiplier;

        // Display cumulative sum to the left of the current row
        const sumElement = document.createElement('div');
        sumElement.className = 'sum-element';
        sumElement.textContent = `סך הכל עד כה: ${sum}`;
        sumElement.style.color = 'white';
        sumElement.style.gridColumn = `1 / span ${multiplier}`;
        sumElement.style.gridRow = `${currentRow + 1}`;
        sumElement.style.justifySelf = 'start';

        visualization.appendChild(sumElement);

        currentRow++;

        if (currentRow >= multiplicand) {
            clearInterval(interval);
            document.getElementById('feedback').textContent += ` סך הכל: ${sum}`;
        }
    }, 1000);
}

function confirmNextQuestion() {
    if (confirm("האם אתה בטוח שברצונך לעבור לשאלה הבאה?")) {
        generateQuestion();
    }
}
