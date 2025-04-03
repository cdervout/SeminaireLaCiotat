import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { gsap } from 'gsap';

export class EnvironmentManager {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.timeOfDay = 12; // Midi par défaut
        this.weather = 'clear';
        this.clouds = [];
        
        this.initSky();
        this.initLighting();
        this.initWeather();
        this.initScoreSystem();
    }

    initSky() {
        // Créer le ciel
        this.sky = new Sky();
        this.sky.scale.setScalar(450000);
        this.scene.add(this.sky);

        // Paramètres du soleil
        this.sun = new THREE.Vector3();
        this.sky.material.uniforms.sunPosition.value.copy(this.sun);

        // Paramètres atmosphériques
        this.sky.material.uniforms.rayleigh.value = 2;
        this.sky.material.uniforms.turbidity.value = 10;
        this.sky.material.uniforms.mieCoefficient.value = 0.005;
        this.sky.material.uniforms.mieDirectionalG.value = 0.8;
    }

    initLighting() {
        // Lumière ambiante
        this.ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(this.ambientLight);

        // Lumière directionnelle (soleil)
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(this.sunLight);

        // Lumière de la lune
        this.moonLight = new THREE.DirectionalLight(0x4444ff, 0.5);
        this.moonLight.intensity = 0;
        this.scene.add(this.moonLight);
    }

    initWeather() {
        // Créer le système de nuages
        const cloudTexture = new THREE.TextureLoader().load('/textures/cloud.png');
        const cloudMaterial = new THREE.SpriteMaterial({
            map: cloudTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        // Créer plusieurs nuages
        for (let i = 0; i < 20; i++) {
            const cloud = new THREE.Sprite(cloudMaterial.clone());
            cloud.scale.set(20, 10, 1);
            cloud.position.set(
                (Math.random() - 0.5) * 100,
                20 + Math.random() * 10,
                (Math.random() - 0.5) * 100
            );
            cloud.material.opacity = 0;
            this.clouds.push(cloud);
            this.scene.add(cloud);
        }
    }

    initScoreSystem() {
        this.score = 0;
        this.objectives = [
            {
                id: 'morning_swim',
                description: 'Nager à l\'aube',
                points: 100,
                completed: false
            },
            {
                id: 'night_dive',
                description: 'Plonger sous les étoiles',
                points: 150,
                completed: false
            },
            {
                id: 'dance_party',
                description: 'Danser sous la pluie',
                points: 200,
                completed: false
            }
        ];
    }

    setTimeOfDay(hour) {
        this.timeOfDay = hour;
        
        // Calculer la position du soleil
        const phi = THREE.MathUtils.degToRad(90 - ((hour / 24) * 360));
        const theta = THREE.MathUtils.degToRad(180);

        this.sun.setFromSphericalCoords(1, phi, theta);
        this.sky.material.uniforms.sunPosition.value.copy(this.sun);
        
        // Ajuster les lumières
        const dayIntensity = Math.sin(phi);
        const nightIntensity = Math.max(0, -Math.sin(phi) * 0.5);
        
        gsap.to(this.sunLight, {
            intensity: Math.max(0, dayIntensity),
            duration: 2
        });
        
        gsap.to(this.moonLight, {
            intensity: nightIntensity,
            duration: 2
        });
        
        gsap.to(this.ambientLight, {
            intensity: 0.2 + Math.max(0, dayIntensity) * 0.3,
            duration: 2
        });

        // Ajuster les couleurs du ciel
        if (hour >= 20 || hour <= 4) { // Nuit
            this.sky.material.uniforms.rayleigh.value = 3;
            this.renderer.setClearColor(0x001020);
        } else if (hour <= 6 || hour >= 18) { // Aube/Crépuscule
            this.sky.material.uniforms.rayleigh.value = 1;
            this.renderer.setClearColor(0xff8c69);
        } else { // Jour
            this.sky.material.uniforms.rayleigh.value = 2;
            this.renderer.setClearColor(0x87ceeb);
        }
    }

    setWeather(type) {
        this.weather = type;
        
        switch (type) {
            case 'clear':
                this.clouds.forEach(cloud => {
                    gsap.to(cloud.material, {
                        opacity: 0,
                        duration: 2
                    });
                });
                break;
                
            case 'cloudy':
                this.clouds.forEach(cloud => {
                    gsap.to(cloud.material, {
                        opacity: 0.6,
                        duration: 2
                    });
                });
                break;
                
            case 'rain':
                this.clouds.forEach(cloud => {
                    gsap.to(cloud.material, {
                        opacity: 0.8,
                        duration: 1
                    });
                });
                // Ajouter effet de pluie via le système de particules
                break;
        }
    }

    addPoints(amount) {
        this.score += amount;
        // Émettre un événement pour mettre à jour l'UI
        const event = new CustomEvent('scoreUpdate', { detail: { score: this.score } });
        window.dispatchEvent(event);
    }

    checkObjective(id, character) {
        const objective = this.objectives.find(obj => obj.id === id);
        if (!objective || objective.completed) return;

        switch (id) {
            case 'morning_swim':
                if (this.timeOfDay >= 5 && this.timeOfDay <= 7 && character.isInWater) {
                    objective.completed = true;
                    this.addPoints(objective.points);
                }
                break;
            case 'night_dive':
                if ((this.timeOfDay >= 21 || this.timeOfDay <= 4) && character.isInWater) {
                    objective.completed = true;
                    this.addPoints(objective.points);
                }
                break;
            case 'dance_party':
                if (this.weather === 'rain' && character.isDancing) {
                    objective.completed = true;
                    this.addPoints(objective.points);
                }
                break;
        }
    }

    update(delta) {
        // Animer les nuages
        this.clouds.forEach(cloud => {
            cloud.position.x += delta * 0.5;
            if (cloud.position.x > 50) {
                cloud.position.x = -50;
            }
        });
    }
}
