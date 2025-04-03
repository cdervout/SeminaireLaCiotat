import * as THREE from 'three';
import { gsap } from 'gsap';

export class Character {
    constructor(scene, position = new THREE.Vector3(0, 0, 0)) {
        this.scene = scene;
        this.position = position;
        this.velocity = new THREE.Vector3();
        this.isInWater = false;
        this.isMoving = false;
        
        this.createModel();
    }

    createModel() {
        // Corps du personnage
        const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.model = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.model.position.copy(this.position);
        this.model.castShadow = true;
        
        // Groupe pour le personnage complet
        this.group = new THREE.Group();
        this.group.add(this.model);
        
        // Ajouter à la scène
        this.scene.add(this.group);
    }

    move(direction) {
        const speed = this.isInWater ? 5 : 8;
        this.velocity.x = direction.x * speed;
        this.velocity.z = direction.z * speed;
        
        if (direction.length() > 0) {
            this.isMoving = true;
            // Rotation du modèle dans la direction du mouvement
            this.model.rotation.y = Math.atan2(direction.x, direction.z);
        } else {
            this.isMoving = false;
        }
    }

    dive() {
        if (!this.isInWater) {
            // Animation de plongeon
            const jumpHeight = 2;
            const jumpDuration = 1000; // ms
            
            // Position initiale
            const startY = this.group.position.y;
            
            // Animation avec GSAP
            gsap.timeline()
                .to(this.group.position, {
                    y: startY + jumpHeight,
                    duration: jumpDuration / 2000,
                    ease: "power1.out"
                })
                .to(this.group.rotation, {
                    x: -Math.PI * 2,
                    duration: jumpDuration / 1000,
                    ease: "none"
                }, 0)
                .to(this.group.position, {
                    y: 0,
                    duration: jumpDuration / 2000,
                    ease: "power1.in",
                    onComplete: () => {
                        this.isInWater = true;
                        this.createSplash(1.0);
                    }
                });
        }
    }

    exitPool() {
        if (this.isInWater) {
            // Animation de sortie
            gsap.to(this.group.position, {
                y: 1,
                duration: 0.5,
                ease: "power1.out",
                onComplete: () => {
                    this.isInWater = false;
                    this.createSplash(0.5);
                }
            });
        }
    }

    createSplash(intensity = 1.0) {
        // Créer des particules d'eau
        const particleCount = Math.floor(20 * intensity);
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Position initiale
            particle.position.copy(this.group.position);
            
            // Vélocité aléatoire
            const angle = (Math.random() * Math.PI * 2);
            const speed = 2 + Math.random() * 3;
            const velocityX = Math.cos(angle) * speed;
            const velocityZ = Math.sin(angle) * speed;
            const velocityY = 3 + Math.random() * 2;
            
            this.scene.add(particle);
            
            // Animation de la particule
            gsap.timeline()
                .to(particle.position, {
                    x: particle.position.x + velocityX,
                    y: particle.position.y + velocityY,
                    z: particle.position.z + velocityZ,
                    duration: 1,
                    ease: "power1.out"
                })
                .to(particle.position, {
                    y: 0,
                    duration: 0.5,
                    ease: "power1.in",
                    onComplete: () => {
                        this.scene.remove(particle);
                    }
                }, ">-0.5")
                .to(particle.material, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.in"
                }, ">-0.5");
        }
    }

    update(delta) {
        // Mettre à jour la position
        this.group.position.x += this.velocity.x * delta;
        this.group.position.z += this.velocity.z * delta;
        
        // Friction
        this.velocity.multiplyScalar(0.95);
        
        // Créer des éclaboussures en mouvement dans l'eau
        if (this.isInWater && this.isMoving && Math.random() < 0.1) {
            this.createSplash(0.3);
        }
        
        // Mise à jour de la position interne
        this.position.copy(this.group.position);
    }
}
