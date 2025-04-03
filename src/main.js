import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene } from './scene/Scene.js';
import { UI } from './ui/UI';
import { GameState } from './state/GameState';
import { InputManager } from './input/InputManager';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ui = new UI();
        this.scene = new Scene(this.canvas);
        this.gameState = new GameState();
        this.inputManager = new InputManager(this.canvas);
        
        this.init();
    }

    init() {
        // Initialiser les gestionnaires d'événements
        this.setupEventListeners();
        
        // Démarrer la boucle de rendu
        this.animate();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => {
            document.getElementById('main-menu').classList.add('hidden');
            this.startGame();
        });

        // Gestionnaire de redimensionnement
        window.addEventListener('resize', () => {
            this.scene.onWindowResize();
        });
    }

    startGame() {
        this.gameState.start();
        this.ui.showGameUI();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.scene.clock.getDelta();
        
        // Mettre à jour la logique du jeu
        this.gameState.update(delta);
        
        // Mettre à jour les visuels
        this.scene.update(delta);
        
        // Mettre à jour l'interface utilisateur
        this.ui.update(this.gameState);
    }
}

// Attendre que tout soit chargé
window.addEventListener('load', () => {
    // Vérifier le support de WebGL
    if (!window.WebGLRenderingContext) {
        alert('Votre navigateur ne supporte pas WebGL');
        return;
    }
    
    // Démarrer le jeu
    window.game = new Game();
});
