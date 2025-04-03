import * as THREE from 'three';

export class PlayerControls {
    constructor(player) {
        this.player = player;
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false
        };
        
        this.direction = new THREE.Vector3();
        
        this.initListeners();
    }
    
    initListeners() {
        // Gestion des touches
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
    }
    
    onKeyDown(event) {
        switch(event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.forward = true;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.keys.backward = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.keys.right = true;
                break;
            case 'Space':
                if (!this.keys.space) {
                    this.keys.space = true;
                    this.player.dive();
                }
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                if (!this.keys.shift) {
                    this.keys.shift = true;
                    this.player.exitPool();
                }
                break;
        }
    }
    
    onKeyUp(event) {
        switch(event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.forward = false;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.keys.backward = false;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.keys.right = false;
                break;
            case 'Space':
                this.keys.space = false;
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.keys.shift = false;
                break;
        }
    }
    
    update() {
        // Réinitialiser la direction
        this.direction.set(0, 0, 0);
        
        // Calculer la direction en fonction des touches pressées
        if (this.keys.forward) this.direction.z -= 1;
        if (this.keys.backward) this.direction.z += 1;
        if (this.keys.left) this.direction.x -= 1;
        if (this.keys.right) this.direction.x += 1;
        
        // Normaliser la direction si elle n'est pas nulle
        if (this.direction.length() > 0) {
            this.direction.normalize();
        }
        
        // Appliquer le mouvement au joueur
        this.player.move(this.direction);
    }
}
