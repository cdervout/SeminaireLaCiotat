import { Character } from './Character';
import * as THREE from 'three';

export class CharacterManager {
    constructor(scene) {
        this.scene = scene;
        this.characters = new Map();
        this.selectedCharacter = null;
    }

    createCharacter(id, position = new THREE.Vector3(0, 0, 0)) {
        const character = new Character(this.scene, position);
        this.characters.set(id, character);
        return character;
    }

    selectCharacter(id) {
        const character = this.characters.get(id);
        if (character) {
            this.selectedCharacter = character;
            return true;
        }
        return false;
    }

    getSelectedCharacter() {
        return this.selectedCharacter;
    }

    updateCharacters(delta) {
        for (const character of this.characters.values()) {
            character.update(delta);
        }
    }

    // Personnalisation des personnages
    customizeCharacter(id, options) {
        const character = this.characters.get(id);
        if (!character || !character.model) return;

        const { swimwearColor, accessoryType, hairStyle } = options;

        // Mettre à jour la couleur du maillot de bain
        if (swimwearColor) {
            const swimwear = character.model.getObjectByName('swimwear');
            if (swimwear) {
                swimwear.material.color.set(swimwearColor);
            }
        }

        // Ajouter/modifier les accessoires
        if (accessoryType) {
            this.updateAccessory(character, accessoryType);
        }

        // Changer la coiffure
        if (hairStyle) {
            this.updateHairStyle(character, hairStyle);
        }
    }

    updateAccessory(character, accessoryType) {
        // Retirer l'ancien accessoire s'il existe
        const oldAccessory = character.model.getObjectByName('accessory');
        if (oldAccessory) {
            character.model.remove(oldAccessory);
        }

        // Charger et ajouter le nouvel accessoire
        // Note: Cette partie nécessiterait des modèles 3D d'accessoires
        // Pour l'instant, nous utilisons des formes géométriques basiques
        let accessory;
        switch (accessoryType) {
            case 'sunglasses':
                accessory = this.createSunglasses();
                break;
            case 'hat':
                accessory = this.createHat();
                break;
            case 'walkman':
                accessory = this.createWalkman();
                break;
        }

        if (accessory) {
            accessory.name = 'accessory';
            character.model.add(accessory);
        }
    }

    createSunglasses() {
        const geometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
        const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const sunglasses = new THREE.Mesh(geometry, material);
        sunglasses.position.set(0, 0.1, 0.1);
        return sunglasses;
    }

    createHat() {
        const geometry = new THREE.ConeGeometry(0.1, 0.1, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const hat = new THREE.Mesh(geometry, material);
        hat.position.set(0, 0.2, 0);
        return hat;
    }

    createWalkman() {
        const geometry = new THREE.BoxGeometry(0.05, 0.08, 0.02);
        const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
        const walkman = new THREE.Mesh(geometry, material);
        walkman.position.set(0.1, 0, 0);
        return walkman;
    }

    updateHairStyle(character, hairStyle) {
        // Cette fonction nécessiterait des modèles 3D de coiffures
        // Pour l'instant, nous utilisons une forme géométrique basique
        const oldHair = character.model.getObjectByName('hair');
        if (oldHair) {
            character.model.remove(oldHair);
        }

        const hairGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.name = 'hair';
        hair.position.set(0, 0.15, 0);
        character.model.add(hair);
    }
}
