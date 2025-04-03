import * as THREE from 'three';
import { gsap } from 'gsap';

export class VisualEffects {
    constructor(scene) {
        this.scene = scene;
        this.particleSystems = new Map();
        this.initParticleSystems();
    }

    initParticleSystems() {
        // Système de particules pour les éclaboussures
        this.createSplashSystem();
        // Système de particules pour les bulles
        this.createBubbleSystem();
    }

    createSplashSystem() {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Préparer 100 particules
        const positions = new Float32Array(300); // 100 particules * 3 coordonnées
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particles = new THREE.Points(geometry, material);
        this.particleSystems.set('splash', {
            system: particles,
            positions: positions,
            active: false
        });
        this.scene.add(particles);
    }

    createBubbleSystem() {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        // Préparer 50 bulles
        const positions = new Float32Array(150); // 50 particules * 3 coordonnées
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particles = new THREE.Points(geometry, material);
        this.particleSystems.set('bubbles', {
            system: particles,
            positions: positions,
            active: false
        });
        this.scene.add(particles);
    }

    createSplash(position) {
        const splash = this.particleSystems.get('splash');
        if (!splash || splash.active) return;

        splash.active = true;
        const positions = splash.positions;

        // Créer des particules en cercle
        for (let i = 0; i < 100; i++) {
            const angle = (Math.PI * 2 / 100) * i;
            const radius = 0.2 + Math.random() * 0.3;
            const height = 0.3 + Math.random() * 0.2;
            
            positions[i * 3] = position.x + Math.cos(angle) * radius;
            positions[i * 3 + 1] = position.y + height;
            positions[i * 3 + 2] = position.z + Math.sin(angle) * radius;
        }

        splash.system.geometry.attributes.position.needsUpdate = true;

        // Animation des particules
        gsap.to(splash.system.material, {
            opacity: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
                splash.active = false;
                splash.system.material.opacity = 0.8;
            }
        });
    }

    createBubbles(position, duration = 2) {
        const bubbles = this.particleSystems.get('bubbles');
        if (!bubbles || bubbles.active) return;

        bubbles.active = true;
        const positions = bubbles.positions;

        // Initialiser les positions des bulles
        for (let i = 0; i < 50; i++) {
            const offset = {
                x: (Math.random() - 0.5) * 0.5,
                y: Math.random() * 0.2,
                z: (Math.random() - 0.5) * 0.5
            };
            
            positions[i * 3] = position.x + offset.x;
            positions[i * 3 + 1] = position.y + offset.y;
            positions[i * 3 + 2] = position.z + offset.z;
        }

        bubbles.system.geometry.attributes.position.needsUpdate = true;

        // Animation des bulles
        const animate = () => {
            if (!bubbles.active) return;

            for (let i = 0; i < 50; i++) {
                positions[i * 3] += (Math.random() - 0.5) * 0.01;
                positions[i * 3 + 1] += 0.01;
                positions[i * 3 + 2] += (Math.random() - 0.5) * 0.01;
            }

            bubbles.system.geometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(animate);
        };

        animate();

        // Arrêter l'animation après la durée spécifiée
        setTimeout(() => {
            bubbles.active = false;
        }, duration * 1000);
    }

    createRipple(position) {
        const geometry = new THREE.CircleGeometry(0.5, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });

        const ripple = new THREE.Mesh(geometry, material);
        ripple.rotation.x = -Math.PI / 2;
        ripple.position.copy(position);
        ripple.position.y = 0.01; // Légèrement au-dessus de l'eau

        this.scene.add(ripple);

        // Animation d'expansion et de disparition
        gsap.to(ripple.scale, {
            x: 3,
            y: 3,
            duration: 1.5,
            ease: "power1.out"
        });

        gsap.to(material, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.out",
            onComplete: () => {
                this.scene.remove(ripple);
                geometry.dispose();
                material.dispose();
            }
        });
    }

    update(delta) {
        // Mettre à jour les systèmes de particules actifs
        for (const [name, system] of this.particleSystems) {
            if (system.active) {
                // Les animations sont gérées par GSAP ou requestAnimationFrame
            }
        }
    }
}
