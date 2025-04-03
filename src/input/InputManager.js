import * as THREE from 'three';

export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedObject = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Gestion du clic de souris
        this.canvas.addEventListener('click', (event) => this.onMouseClick(event));
        
        // Gestion du mouvement de la souris
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        
        // Gestion des touches du clavier
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onMouseClick(event) {
        // Calculer la position de la souris en coordonnées normalisées (-1 à +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Émettre un événement personnalisé pour le clic
        const clickEvent = new CustomEvent('game-click', {
            detail: {
                mouse: this.mouse.clone(),
                originalEvent: event
            }
        });
        this.canvas.dispatchEvent(clickEvent);
    }

    onMouseMove(event) {
        // Mettre à jour la position de la souris
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onKeyDown(event) {
        // Émettre un événement personnalisé pour la touche pressée
        const keyEvent = new CustomEvent('game-keydown', {
            detail: {
                key: event.key,
                originalEvent: event
            }
        });
        this.canvas.dispatchEvent(keyEvent);
    }

    onKeyUp(event) {
        // Émettre un événement personnalisé pour la touche relâchée
        const keyEvent = new CustomEvent('game-keyup', {
            detail: {
                key: event.key,
                originalEvent: event
            }
        });
        this.canvas.dispatchEvent(keyEvent);
    }

    update(camera, scene) {
        // Mettre à jour le raycaster avec la position actuelle de la souris
        this.raycaster.setFromCamera(this.mouse, camera);

        // Calculer les intersections
        const intersects = this.raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            this.selectedObject = intersects[0].object;
        } else {
            this.selectedObject = null;
        }
    }
}
