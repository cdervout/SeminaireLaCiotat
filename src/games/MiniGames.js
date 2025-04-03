import * as THREE from 'three';

export class MiniGames {
    constructor(scene, characterManager) {
        this.scene = scene;
        this.characterManager = characterManager;
        this.activeGame = null;
        this.games = this.initGames();
    }

    initGames() {
        return {
            // Jeu simple : Collecte d'anneaux
            ringCollection: {
                name: "Collecte d'anneaux",
                description: "Collectez tous les anneaux flottants !",
                duration: 60,
                rings: [],
                score: 0,
                
                setup: () => {
                    // Créer 10 anneaux à collecter
                    for (let i = 0; i < 10; i++) {
                        const ring = this.createRing();
                        ring.position.set(
                            (Math.random() - 0.5) * 10,
                            0.5,
                            (Math.random() - 0.5) * 10
                        );
                        this.scene.add(ring);
                        this.activeGame.rings.push(ring);
                    }
                },
                
                update: (delta, player) => {
                    // Vérifier la collecte des anneaux
                    this.activeGame.rings = this.activeGame.rings.filter(ring => {
                        if (ring.position.distanceTo(player.position) < 1) {
                            this.scene.remove(ring);
                            this.activeGame.score += 10;
                            return false;
                        }
                        return true;
                    });

                    // Faire tourner les anneaux
                    this.activeGame.rings.forEach(ring => {
                        ring.rotation.y += delta * 2;
                    });

                    return this.activeGame.rings.length === 0;
                },
                
                cleanup: () => {
                    // Supprimer les anneaux restants
                    this.activeGame.rings.forEach(ring => {
                        this.scene.remove(ring);
                    });
                }
            },

            // Jeu simple : Course contre la montre
            timeTrial: {
                name: "Course contre la montre",
                description: "Atteignez l'arrivée le plus vite possible !",
                duration: 30,
                checkpoints: [],
                currentCheckpoint: 0,
                
                setup: () => {
                    // Créer 3 points de passage
                    const points = [
                        new THREE.Vector3(-5, 0.5, -5),
                        new THREE.Vector3(5, 0.5, 0),
                        new THREE.Vector3(0, 0.5, 5)
                    ];
                    
                    points.forEach(point => {
                        const checkpoint = this.createCheckpoint();
                        checkpoint.position.copy(point);
                        this.scene.add(checkpoint);
                        this.activeGame.checkpoints.push(checkpoint);
                    });
                },
                
                update: (delta, player) => {
                    const currentPoint = this.activeGame.checkpoints[this.activeGame.currentCheckpoint];
                    if (currentPoint && player.position.distanceTo(currentPoint.position) < 1.5) {
                        this.activeGame.currentCheckpoint++;
                        currentPoint.material.color.setHex(0x00ff00);
                    }
                    
                    return this.activeGame.currentCheckpoint >= this.activeGame.checkpoints.length;
                },
                
                cleanup: () => {
                    // Supprimer les points de passage
                    this.activeGame.checkpoints.forEach(checkpoint => {
                        this.scene.remove(checkpoint);
                    });
                }
            }
        };
    }

    createRing() {
        const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xffff00,
            emissive: 0x444400
        });
        return new THREE.Mesh(geometry, material);
    }

    createCheckpoint() {
        const geometry = new THREE.CylinderGeometry(0.7, 0.7, 2, 16);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xff0000,
            transparent: true,
            opacity: 0.6
        });
        return new THREE.Mesh(geometry, material);
    }

    startGame(gameName, player) {
        if (this.activeGame) {
            console.warn("Un jeu est déjà en cours");
            return false;
        }

        const game = this.games[gameName];
        if (!game) {
            console.error("Jeu inconnu:", gameName);
            return false;
        }

        this.activeGame = {
            ...game,
            startTime: Date.now(),
            player: player
        };

        // Configurer le jeu
        game.setup();

        // Créer l'interface
        this.createGameUI(game);

        return true;
    }

    createGameUI(game) {
        const ui = document.createElement('div');
        ui.id = 'minigame-ui';
        ui.className = 'game-panel';
        ui.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-score">Score: <span id="game-score">0</span></div>
            <div class="game-timer">Temps: <span id="game-time">${game.duration}</span>s</div>
        `;
        document.body.appendChild(ui);
    }

    updateUI() {
        if (!this.activeGame) return;

        const scoreElement = document.getElementById('game-score');
        if (scoreElement) {
            scoreElement.textContent = this.activeGame.score || 0;
        }

        const timeElement = document.getElementById('game-time');
        if (timeElement) {
            const elapsed = (Date.now() - this.activeGame.startTime) / 1000;
            const remaining = Math.max(0, this.activeGame.duration - elapsed);
            timeElement.textContent = Math.ceil(remaining);

            if (remaining <= 0) {
                this.endGame();
            }
        }
    }

    endGame() {
        if (!this.activeGame) return;

        // Nettoyer le jeu
        this.activeGame.cleanup();

        // Supprimer l'interface
        const ui = document.getElementById('minigame-ui');
        if (ui) ui.remove();

        // Afficher le score final
        const finalScore = this.activeGame.score || 0;
        alert(`Jeu terminé ! Score: ${finalScore}`);

        this.activeGame = null;
    }

    update(delta) {
        if (this.activeGame && this.activeGame.player) {
            // Mettre à jour le jeu
            const completed = this.activeGame.update(delta, this.activeGame.player);
            if (completed) {
                this.endGame();
            }

            // Mettre à jour l'interface
            this.updateUI();
        }
    }
}
