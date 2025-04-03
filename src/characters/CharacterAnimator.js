import * as THREE from 'three';
import gsap from 'gsap';

export class CharacterAnimator {
    constructor(character) {
        this.character = character;
        this.currentAnimation = null;
        this.animationMixer = new THREE.AnimationMixer(character);
        this.animations = {};
        this.setupAnimations();
    }

    setupAnimations() {
        // Créer les différentes animations
        this.animations = {
            idle: this.createIdleAnimation(),
            walk: this.createWalkAnimation(),
            swim: this.createSwimAnimation(),
            dive_classic: this.createDiveAnimation('classic'),
            dive_bomb: this.createDiveAnimation('bomb'),
            shiver: this.createShiverAnimation()
        };
        this.createDanceAnimations();
    }

    createIdleAnimation() {
        const times = [0, 1, 2];
        const values = [
            // Position initiale
            ...this.character.getObjectByName('leftArm').position.toArray(),
            ...this.character.getObjectByName('rightArm').position.toArray(),
            // Position légèrement modifiée
            ...new THREE.Vector3(0.35, 1.35, 0).toArray(),
            ...new THREE.Vector3(-0.35, 1.35, 0).toArray(),
            // Retour à la position initiale
            ...this.character.getObjectByName('leftArm').position.toArray(),
            ...this.character.getObjectByName('rightArm').position.toArray()
        ];

        const track = new THREE.VectorKeyframeTrack(
            '.position',
            times,
            values
        );

        return new THREE.AnimationClip('idle', 2, [track]);
    }

    createWalkAnimation() {
        const times = [0, 0.5, 1];
        const leftLegValues = [
            // Position initiale
            0, 0, 0,
            // Position levée
            0, 0.2, 0.3,
            // Retour à la position initiale
            0, 0, 0
        ];

        const rightLegValues = [
            // Position initiale
            0, 0, 0,
            // Position baissée
            0, -0.2, -0.3,
            // Retour à la position initiale
            0, 0, 0
        ];

        const leftLegTrack = new THREE.VectorKeyframeTrack(
            'leftLeg.rotation',
            times,
            leftLegValues
        );

        const rightLegTrack = new THREE.VectorKeyframeTrack(
            'rightLeg.rotation',
            times,
            rightLegValues
        );

        return new THREE.AnimationClip('walk', 1, [leftLegTrack, rightLegTrack]);
    }

    createSwimAnimation() {
        const times = [0, 0.5, 1];
        const armValues = [
            // Position initiale
            0, 0, 0,
            // Position étendue
            0.5, 0, -0.5,
            // Retour à la position initiale
            0, 0, 0
        ];

        const legValues = [
            // Position initiale
            0, 0, 0,
            // Position étendue
            -0.3, 0, 0.3,
            // Retour à la position initiale
            0, 0, 0
        ];

        const tracks = [
            new THREE.VectorKeyframeTrack('leftArm.rotation', times, armValues),
            new THREE.VectorKeyframeTrack('rightArm.rotation', times, armValues.map(v => -v)),
            new THREE.VectorKeyframeTrack('leftLeg.rotation', times, legValues),
            new THREE.VectorKeyframeTrack('rightLeg.rotation', times, legValues.map(v => -v))
        ];

        return new THREE.AnimationClip('swim', 1, tracks);
    }

    createDiveAnimation(type) {
        const times = [0, 0.5, 1];
        let rotationValues;

        if (type === 'classic') {
            rotationValues = [
                0, 0, 0,
                -Math.PI / 2, 0, 0,
                -Math.PI, 0, 0
            ];
        } else { // bomb
            rotationValues = [
                0, 0, 0,
                0, Math.PI, 0,
                0, Math.PI * 2, 0
            ];
        }

        const track = new THREE.VectorKeyframeTrack(
            '.rotation',
            times,
            rotationValues
        );

        return new THREE.AnimationClip(`dive_${type}`, 1, [track]);
    }

    createShiverAnimation() {
        const times = [0, 0.1, 0.2, 0.3, 0.4];
        const values = [
            0, 0, 0,
            0.1, 0, 0,
            0, 0, 0,
            -0.1, 0, 0,
            0, 0, 0
        ];

        const track = new THREE.VectorKeyframeTrack(
            '.rotation',
            times,
            values
        );

        return new THREE.AnimationClip('shiver', 0.4, [track]);
    }

    createDanceAnimations() {
        const danceClips = {
            disco: this.createDiscoAnimation(),
            moonwalk: this.createMoonwalkAnimation(),
            wave: this.createWaveAnimation()
        };
        
        Object.assign(this.animations, danceClips);
    }

    createDiscoAnimation() {
        const times = [0, 0.25, 0.5, 0.75, 1];
        const values = [
            // Position initiale
            0, 0, 0,
            // Bras levés
            Math.PI / 4, 0, Math.PI / 4,
            // Position John Travolta
            -Math.PI / 4, 0, Math.PI / 2,
            // Rotation des hanches
            0, Math.PI / 4, Math.PI / 4,
            // Retour position initiale
            0, 0, 0
        ];

        const track = new THREE.VectorKeyframeTrack(
            '.rotation',
            times,
            values
        );

        return new THREE.AnimationClip('dance_disco', 1, [track]);
    }

    createMoonwalkAnimation() {
        const times = [0, 0.5, 1];
        const posValues = [
            // Avancer
            0, 0, 0,
            0, 0.1, -0.2,
            0, 0, -0.4
        ];

        const rotValues = [
            // Rotation du corps
            0, Math.PI / 8, 0,
            0, -Math.PI / 8, 0,
            0, Math.PI / 8, 0
        ];

        const tracks = [
            new THREE.VectorKeyframeTrack('.position', times, posValues),
            new THREE.VectorKeyframeTrack('.rotation', times, rotValues)
        ];

        return new THREE.AnimationClip('dance_moonwalk', 1, tracks);
    }

    createWaveAnimation() {
        const times = [0, 0.25, 0.5, 0.75, 1];
        const leftArmValues = [
            // Vague du bras gauche
            0, 0, 0,
            Math.PI / 4, 0, 0,
            Math.PI / 2, 0, 0,
            Math.PI / 4, 0, 0,
            0, 0, 0
        ];

        const rightArmValues = [
            // Vague du bras droit (décalée)
            Math.PI / 4, 0, 0,
            Math.PI / 2, 0, 0,
            Math.PI / 4, 0, 0,
            0, 0, 0,
            Math.PI / 4, 0, 0
        ];

        const tracks = [
            new THREE.VectorKeyframeTrack('leftArm.rotation', times, leftArmValues),
            new THREE.VectorKeyframeTrack('rightArm.rotation', times, rightArmValues)
        ];

        return new THREE.AnimationClip('dance_wave', 1, tracks);
    }

    playAnimation(name, options = {}) {
        const animation = this.animations[name];
        if (!animation) return;

        if (this.currentAnimation) {
            this.currentAnimation.fadeOut(options.fadeTime || 0.5);
        }

        const action = this.animationMixer.clipAction(animation);
        action.reset();
        action.fadeIn(options.fadeTime || 0.5);
        action.play();
        this.currentAnimation = action;
    }

    update(delta) {
        if (this.animationMixer) {
            this.animationMixer.update(delta);
        }
    }
}
