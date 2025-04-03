import * as THREE from 'three';
import { gsap } from 'gsap';

export class NPCManager {
    constructor(scene, characterManager) {
        this.scene = scene;
        this.characterManager = characterManager;
        this.npcs = new Map();
        this.behaviors = new Map();
        this.initBehaviors();
    }

    initBehaviors() {
        // Maître-nageur
        this.behaviors.set('lifeguard', {
            name: "Maître-nageur",
            update: (npc, delta) => {
                // Patrouiller autour de la piscine
                this.patrolPool(npc, delta);
                
                // Vérifier la sécurité
                this.checkSafety(npc);
            },
            interactions: [
                {
                    name: "Demander conseil",
                    action: (npc, player) => {
                        return {
                            type: 'dialog',
                            text: "N'oubliez pas de bien vous échauffer avant de plonger !",
                            options: [
                                "Merci du conseil !",
                                "Comment faire un bon plongeon ?"
                            ]
                        };
                    }
                },
                {
                    name: "Prendre un cours",
                    action: (npc, player) => {
                        return {
                            type: 'challenge',
                            name: 'diving_lesson',
                            description: "Apprenez les techniques de plongeon"
                        };
                    }
                }
            ]
        });

        // DJ
        this.behaviors.set('dj', {
            name: "DJ",
            update: (npc, delta) => {
                // Animer le DJ
                this.animateDJ(npc, delta);
            },
            interactions: [
                {
                    name: "Demander une chanson",
                    action: (npc, player) => {
                        return {
                            type: 'music_request',
                            options: [
                                "Disco Inferno",
                                "Summer Nights",
                                "Holiday"
                            ]
                        };
                    }
                },
                {
                    name: "Danser",
                    action: (npc, player) => {
                        return {
                            type: 'dance',
                            style: 'disco'
                        };
                    }
                }
            ]
        });

        // Vendeur de glaces
        this.behaviors.set('ice_cream_vendor', {
            name: "Vendeur de glaces",
            update: (npc, delta) => {
                // Déplacer le vendeur
                this.moveVendor(npc, delta);
            },
            interactions: [
                {
                    name: "Acheter une glace",
                    action: (npc, player) => {
                        return {
                            type: 'shop',
                            items: [
                                { name: "Glace vanille", price: 50 },
                                { name: "Glace chocolat", price: 50 },
                                { name: "Sorbet citron", price: 45 }
                            ]
                        };
                    }
                }
            ]
        });

        // Nageur régulier
        this.behaviors.set('regular_swimmer', {
            name: "Nageur",
            update: (npc, delta) => {
                // Nager des longueurs
                this.swim(npc, delta);
            },
            interactions: [
                {
                    name: "Discuter",
                    action: (npc, player) => {
                        return {
                            type: 'dialog',
                            text: "Belle journée pour nager, n'est-ce pas ?",
                            options: [
                                "Absolument !",
                                "L'eau est bonne ?"
                            ]
                        };
                    }
                },
                {
                    name: "Faire la course",
                    action: (npc, player) => {
                        return {
                            type: 'challenge',
                            name: 'swimming_race',
                            description: "Faites la course sur 50m"
                        };
                    }
                }
            ]
        });
    }

    createNPC(type, position) {
        const behavior = this.behaviors.get(type);
        if (!behavior) {
            console.error(`Type de PNJ inconnu: ${type}`);
            return null;
        }

        // Créer le personnage avec le modèle approprié
        const npc = this.characterManager.createCharacter(
            `npc_${type}_${Date.now()}`,
            position,
            this.scene.effects,
            this.scene.audio
        );

        // Configurer le PNJ
        npc.isNPC = true;
        npc.behavior = behavior;
        npc.state = {
            currentAction: null,
            targetPosition: position.clone(),
            interactionRadius: 3,
            lastInteractionTime: 0,
            currentPath: [],
            waitTime: 0
        };

        // Ajouter des animations spécifiques
        this.addNPCAnimations(npc, type);

        // Ajouter au gestionnaire
        this.npcs.set(npc.id, npc);

        return npc;
    }

    addNPCAnimations(npc, type) {
        switch(type) {
            case 'lifeguard':
                npc.addAnimation('whistle', '/animations/whistle.fbx');
                npc.addAnimation('point', '/animations/point.fbx');
                break;
            case 'dj':
                npc.addAnimation('mix', '/animations/dj_mix.fbx');
                npc.addAnimation('dance', '/animations/dj_dance.fbx');
                break;
            case 'ice_cream_vendor':
                npc.addAnimation('serve', '/animations/serve.fbx');
                npc.addAnimation('wave', '/animations/wave.fbx');
                break;
            case 'regular_swimmer':
                npc.addAnimation('freestyle', '/animations/freestyle.fbx');
                npc.addAnimation('breaststroke', '/animations/breaststroke.fbx');
                break;
        }
    }

    patrolPool(npc, delta) {
        const patrolPoints = [
            new THREE.Vector3(-10, 0, -10),
            new THREE.Vector3(10, 0, -10),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(-10, 0, 10)
        ];

        if (npc.state.currentPath.length === 0) {
            // Choisir le prochain point de patrouille
            const nextPoint = patrolPoints[Math.floor(Math.random() * patrolPoints.length)];
            npc.state.targetPosition.copy(nextPoint);
            npc.state.currentPath = this.calculatePath(npc.position, nextPoint);
        }

        // Suivre le chemin
        this.followPath(npc, delta);
    }

    checkSafety(npc) {
        // Vérifier les joueurs à proximité
        const players = this.characterManager.getCharacters();
        players.forEach(player => {
            if (!player.isNPC && player.isInWater) {
                const distance = player.position.distanceTo(npc.position);
                if (distance < 15) {
                    // Surveiller le joueur
                    npc.lookAt(player.position);
                    if (player.isInDanger) {
                        this.startRescue(npc, player);
                    }
                }
            }
        });
    }

    startRescue(npc, player) {
        npc.state.currentAction = 'rescue';
        npc.playAnimation('swim_fast');
        
        // Se déplacer rapidement vers le joueur
        gsap.to(npc.position, {
            x: player.position.x,
            z: player.position.z,
            duration: 1,
            onComplete: () => {
                // Sauvetage
                player.isInDanger = false;
                npc.playAnimation('rescue');
                setTimeout(() => {
                    npc.state.currentAction = null;
                }, 3000);
            }
        });
    }

    animateDJ(npc, delta) {
        // Animer en fonction du rythme de la musique
        const beat = this.scene.audio.getCurrentBeat();
        if (beat) {
            npc.playAnimation('mix');
            // Faire bouger les bras en rythme
            const amplitude = 0.2;
            npc.arms.rotation.z = Math.sin(beat * Math.PI * 2) * amplitude;
        }
    }

    moveVendor(npc, delta) {
        if (npc.state.waitTime > 0) {
            npc.state.waitTime -= delta;
            return;
        }

        // Choisir un nouveau point aléatoire autour de la piscine
        if (npc.state.currentPath.length === 0) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 3;
            const target = new THREE.Vector3(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );
            npc.state.targetPosition.copy(target);
            npc.state.currentPath = this.calculatePath(npc.position, target);
            npc.state.waitTime = 10 + Math.random() * 20; // Attendre 10-30 secondes
        }

        // Suivre le chemin
        this.followPath(npc, delta);
    }

    swim(npc, delta) {
        if (npc.state.currentPath.length === 0) {
            // Choisir un nouveau point de destination dans la piscine
            const poolPoints = [
                new THREE.Vector3(-5, 0, 0),
                new THREE.Vector3(5, 0, 0),
                new THREE.Vector3(0, 0, -5),
                new THREE.Vector3(0, 0, 5)
            ];
            const target = poolPoints[Math.floor(Math.random() * poolPoints.length)];
            npc.state.targetPosition.copy(target);
            npc.state.currentPath = this.calculatePath(npc.position, target);
        }

        // Nager vers la destination
        this.followPath(npc, delta);
        
        // Alterner les styles de nage
        if (Math.random() < 0.01) {
            npc.playAnimation(Math.random() < 0.5 ? 'freestyle' : 'breaststroke');
        }
    }

    calculatePath(start, end) {
        // Système de pathfinding simplifié
        // Pour une meilleure implémentation, utiliser A* ou NavMesh
        return [end];
    }

    followPath(npc, delta) {
        if (npc.state.currentPath.length === 0) return;

        const target = npc.state.currentPath[0];
        const direction = target.clone().sub(npc.position);
        const distance = direction.length();

        if (distance < 0.1) {
            // Point atteint
            npc.state.currentPath.shift();
            return;
        }

        // Déplacer le PNJ
        direction.normalize();
        npc.position.add(direction.multiplyScalar(delta * 2));
        npc.lookAt(target);
    }

    handleInteraction(npc, player, interactionName) {
        const behavior = npc.behavior;
        const interaction = behavior.interactions.find(i => i.name === interactionName);
        
        if (!interaction) return null;

        // Vérifier le délai entre les interactions
        const now = Date.now();
        if (now - npc.state.lastInteractionTime < 1000) return null;
        npc.state.lastInteractionTime = now;

        // Exécuter l'interaction
        return interaction.action(npc, player);
    }

    update(delta) {
        this.npcs.forEach(npc => {
            // Mettre à jour le comportement
            if (npc.behavior && npc.behavior.update) {
                npc.behavior.update(npc, delta);
            }

            // Mettre à jour les animations
            if (npc.mixer) {
                npc.mixer.update(delta);
            }
        });
    }
}
