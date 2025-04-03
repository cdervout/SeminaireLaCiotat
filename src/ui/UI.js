import { CustomizationUI } from './CustomizationUI';

export class UI {
    constructor(characterManager, environmentManager) {
        this.characterManager = characterManager;
        this.environmentManager = environmentManager;
        this.createUI();
        this.setupEventListeners();
    }

    createUI() {
        // Barre d'action principale
        this.actionBar = document.createElement('div');
        this.actionBar.className = 'action-bar';
        this.actionBar.innerHTML = `
            <button id="customize-btn">Personnaliser</button>
            <button id="dive-btn">Plonger</button>
            <button id="dance-btn">Danser</button>
        `;
        document.body.appendChild(this.actionBar);

        // Panneau environnement
        this.envPanel = document.createElement('div');
        this.envPanel.className = 'env-panel';
        this.envPanel.innerHTML = `
            <div class="time-control">
                <label>Heure : <span id="time-display">12:00</span></label>
                <input type="range" id="time-slider" min="0" max="24" value="12" step="0.5">
            </div>
            <div class="weather-control">
                <button id="weather-clear">Ensoleillé</button>
                <button id="weather-cloudy">Nuageux</button>
                <button id="weather-rain">Pluie</button>
            </div>
        `;
        document.body.appendChild(this.envPanel);

        // Panneau de score
        this.scorePanel = document.createElement('div');
        this.scorePanel.className = 'score-panel';
        this.scorePanel.innerHTML = `
            <div class="score">Score: <span id="score-display">0</span></div>
            <div class="objectives" id="objectives-list"></div>
        `;
        document.body.appendChild(this.scorePanel);

        // Menu de danse
        this.danceMenu = document.createElement('div');
        this.danceMenu.className = 'dance-menu hidden';
        this.danceMenu.innerHTML = `
            <button id="dance-disco">Disco Fever</button>
            <button id="dance-moonwalk">Moonwalk</button>
            <button id="dance-wave">La Vague</button>
        `;
        document.body.appendChild(this.danceMenu);

        // Thermomètre
        this.temperatureGauge = document.createElement('div');
        this.temperatureGauge.id = 'temperature-gauge';
        document.body.appendChild(this.temperatureGauge);
    }

    setupEventListeners() {
        // Contrôles de l'heure
        const timeSlider = document.getElementById('time-slider');
        const timeDisplay = document.getElementById('time-display');
        
        timeSlider.addEventListener('input', (e) => {
            const hour = parseFloat(e.target.value);
            const displayHour = Math.floor(hour);
            const displayMinutes = Math.floor((hour % 1) * 60);
            timeDisplay.textContent = `${displayHour.toString().padStart(2, '0')}:${displayMinutes.toString().padStart(2, '0')}`;
            if (this.environmentManager) {
                this.environmentManager.setTimeOfDay(hour);
            }
        });

        // Contrôles de la météo
        document.getElementById('weather-clear').addEventListener('click', () => {
            this.environmentManager?.setWeather('clear');
        });
        
        document.getElementById('weather-cloudy').addEventListener('click', () => {
            this.environmentManager?.setWeather('cloudy');
        });
        
        document.getElementById('weather-rain').addEventListener('click', () => {
            this.environmentManager?.setWeather('rain');
        });

        // Contrôles de danse
        const danceBtn = document.getElementById('dance-btn');
        danceBtn.addEventListener('click', () => {
            this.danceMenu.classList.toggle('hidden');
        });

        document.getElementById('dance-disco').addEventListener('click', () => {
            this.characterManager?.getCurrentCharacter()?.playAnimation('dance_disco');
            this.danceMenu.classList.add('hidden');
        });

        document.getElementById('dance-moonwalk').addEventListener('click', () => {
            this.characterManager?.getCurrentCharacter()?.playAnimation('dance_moonwalk');
            this.danceMenu.classList.add('hidden');
        });

        document.getElementById('dance-wave').addEventListener('click', () => {
            this.characterManager?.getCurrentCharacter()?.playAnimation('dance_wave');
            this.danceMenu.classList.add('hidden');
        });

        // Mise à jour du score
        window.addEventListener('scoreUpdate', (e) => {
            document.getElementById('score-display').textContent = e.detail.score;
        });

        // Bouton de personnalisation
        document.getElementById('customize-btn').addEventListener('click', () => {
            const customizationUI = new CustomizationUI(this.characterManager);
            customizationUI.show();
        });

        // Bouton de plongée
        document.getElementById('dive-btn').addEventListener('click', () => {
            const character = this.characterManager.getSelectedCharacter();
            if (character) {
                character.dive('classic');
            }
        });
    }

    updateObjectives(objectives) {
        const objectivesList = document.getElementById('objectives-list');
        objectivesList.innerHTML = objectives
            .map(obj => `
                <div class="objective ${obj.completed ? 'completed' : ''}">
                    <span>${obj.description}</span>
                    <span>${obj.points} pts</span>
                </div>
            `)
            .join('');
    }

    showGameUI() {
        this.temperatureGauge.style.display = 'block';
        this.actionBar.style.display = 'flex';
    }

    hideGameUI() {
        this.temperatureGauge.style.display = 'none';
        this.actionBar.style.display = 'none';
    }

    updateTemperatureGauge(temperature) {
        // La température va de 0 (très froid) à 1 (température normale)
        const height = temperature * 100;
        const color = this.getTemperatureColor(temperature);
        this.temperatureGauge.style.background = `linear-gradient(to top, ${color} ${height}%, transparent ${height}%)`;
    }

    getTemperatureColor(temperature) {
        // Transition de bleu (froid) à rouge (normal)
        const blue = Math.floor(255 * (1 - temperature));
        const red = Math.floor(255 * temperature);
        return `rgb(${red}, 0, ${blue})`;
    }

    update(gameState) {
        if (gameState.isPlaying) {
            this.updateTemperatureGauge(gameState.playerTemperature);
        }
    }
}
