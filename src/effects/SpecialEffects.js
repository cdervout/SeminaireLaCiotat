import * as THREE from 'three';
import { gsap } from 'gsap';

export class SpecialEffects {
    constructor(scene) {
        this.scene = scene;
        this.effects = new Map();
        this.initEffects();
    }

    initEffects() {
        // Lumières disco
        this.createDiscoLights();
        // Projecteurs
        this.createSpotlights();
        // Effets de transition jour/nuit
        this.createSunsetEffect();
    }

    createDiscoLights() {
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00];
        const lights = [];

        for (let i = 0; i < 5; i++) {
            const light = new THREE.PointLight(colors[i], 0, 10);
            light.position.set(
                (Math.random() - 0.5) * 10,
                5,
                (Math.random() - 0.5) * 10
            );
            this.scene.add(light);
            lights.push(light);
        }

        this.effects.set('disco_lights', {
            lights: lights,
            active: false,
            animation: null
        });
    }

    createSpotlights() {
        const spotlights = [];
        const positions = [
            new THREE.Vector3(-5, 8, -5),
            new THREE.Vector3(5, 8, -5),
            new THREE.Vector3(0, 8, 5)
        ];

        positions.forEach(pos => {
            const spotlight = new THREE.SpotLight(0xffffff, 0, 15, Math.PI / 6, 0.5, 1);
            spotlight.position.copy(pos);
            spotlight.target.position.set(0, 0, 0);
            this.scene.add(spotlight);
            this.scene.add(spotlight.target);
            spotlights.push(spotlight);
        });

        this.effects.set('spotlights', {
            lights: spotlights,
            active: false,
            animation: null
        });
    }

    createSunsetEffect() {
        // Créer un plan semi-transparent pour l'effet de coucher de soleil
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff8c69,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });

        const sunset = new THREE.Mesh(geometry, material);
        sunset.position.y = 20;
        sunset.rotation.x = Math.PI / 2;
        this.scene.add(sunset);

        this.effects.set('sunset', {
            mesh: sunset,
            active: false
        });
    }

    startDiscoMode() {
        const discoLights = this.effects.get('disco_lights');
        if (!discoLights || discoLights.active) return;

        discoLights.active = true;
        discoLights.lights.forEach(light => {
            light.intensity = 2;
            
            // Animation de mouvement
            gsap.to(light.position, {
                y: '+=1',
                duration: 0.5 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: 'power1.inOut'
            });

            // Animation d'intensité
            gsap.to(light, {
                intensity: 0.5,
                duration: 0.2 + Math.random() * 0.3,
                yoyo: true,
                repeat: -1,
                ease: 'power1.inOut'
            });
        });
    }

    stopDiscoMode() {
        const discoLights = this.effects.get('disco_lights');
        if (!discoLights || !discoLights.active) return;

        discoLights.active = false;
        discoLights.lights.forEach(light => {
            gsap.killTweensOf(light.position);
            gsap.killTweensOf(light);
            light.intensity = 0;
        });
    }

    startSpotlightShow() {
        const spotlights = this.effects.get('spotlights');
        if (!spotlights || spotlights.active) return;

        spotlights.active = true;
        spotlights.lights.forEach((light, index) => {
            light.intensity = 2;

            // Animation de rotation
            const radius = 5;
            const speed = 1 + index * 0.2;
            const phase = (index * Math.PI * 2) / spotlights.lights.length;

            gsap.to(light.target.position, {
                x: radius * Math.cos(phase),
                z: radius * Math.sin(phase),
                duration: speed,
                repeat: -1,
                ease: 'none'
            });
        });
    }

    stopSpotlightShow() {
        const spotlights = this.effects.get('spotlights');
        if (!spotlights || !spotlights.active) return;

        spotlights.active = false;
        spotlights.lights.forEach(light => {
            gsap.killTweensOf(light.target.position);
            light.intensity = 0;
        });
    }

    playSunsetTransition() {
        const sunset = this.effects.get('sunset');
        if (!sunset || sunset.active) return;

        sunset.active = true;
        const material = sunset.mesh.material;

        // Séquence de transition
        gsap.timeline()
            .to(material, {
                opacity: 0.3,
                duration: 2,
                ease: 'power1.inOut'
            })
            .to(material.color, {
                r: 1,
                g: 0.2,
                b: 0,
                duration: 2,
                ease: 'power1.inOut'
            })
            .to(material, {
                opacity: 0,
                duration: 2,
                ease: 'power1.inOut',
                onComplete: () => {
                    sunset.active = false;
                }
            });
    }

    update(delta) {
        // Mettre à jour les effets actifs
        for (const [name, effect] of this.effects) {
            if (effect.active) {
                // Les animations sont gérées par GSAP
            }
        }
    }
}
