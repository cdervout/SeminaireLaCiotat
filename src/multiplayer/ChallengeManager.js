import { gsap } from 'gsap';

export class ChallengeManager {
    constructor(scene, characterManager, eventManager) {
        this.scene = scene;
        this.characterManager = characterManager;
        this.eventManager = eventManager;
        this.challenges = new Map();
        this.activeChallenge = null;
        
        this.initChallenges();
        this.setupEventListeners();
    }

    initChallenges() {
        // Défi de danse
        this.challenges.set('danceOff', {
            name: "Dance Battle",
            description: "Montrez vos meilleurs pas de danse !",
            minPlayers: 2,
            maxPlayers: 4,
            duration: 180,
            setup: (players) => {
                // Positionner les joueurs en cercle
                const radius = 3;
                players.forEach((player, index) => {
                    const angle = (index / players.length) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    player.moveTo({ x, y: 0, z });
                });

                // Démarrer la musique et les effets
                this.scene.specialEffects.startDiscoMode();
                this.scene.audio.loadTrack('dance_battle');
                this.scene.audio.playMusic();
            },
            update: (players, time) => {
                players.forEach(player => {
                    // Changer aléatoirement les danses
                    if (Math.random() < 0.01) {
                        const dances = ['dance_disco', 'dance_moonwalk', 'dance_wave'];
                        const randomDance = dances[Math.floor(Math.random() * dances.length)];
                        player.playAnimation(randomDance);
                    }
                });
            },
            score: (player) => {
                // Score basé sur la variété des danses et le timing
                return Math.floor(Math.random() * 100);
            }
        });

        // Water Polo
        this.challenges.set('waterPolo', {
            name: "Water Polo",
            description: "Marquez des buts dans l'eau !",
            minPlayers: 4,
            maxPlayers: 6,
            duration: 300,
            setup: (players) => {
                // Créer les buts
                this.createWaterPoloGoals();
                
                // Diviser les joueurs en équipes
                const midPoint = Math.floor(players.length / 2);
                this.teams = {
                    blue: players.slice(0, midPoint),
                    red: players.slice(midPoint)
                };
                
                // Positionner les équipes
                this.teams.blue.forEach((player, i) => {
                    player.moveTo({ x: -5, y: 0, z: i * 2 - 2 });
                });
                this.teams.red.forEach((player, i) => {
                    player.moveTo({ x: 5, y: 0, z: i * 2 - 2 });
                });
                
                // Créer le ballon
                this.createWaterPoloBall();
            },
            update: (players, time) => {
                this.updateWaterPoloBall();
                this.checkGoals();
            },
            score: (team) => {
                return this.teams[team].goals || 0;
            }
        });

        // Course de relais
        this.challenges.set('relay', {
            name: "Course de Relais",
            description: "Nagez vite et passez le relais !",
            minPlayers: 4,
            maxPlayers: 8,
            duration: 240,
            setup: (players) => {
                // Créer les couloirs
                this.createRelayLanes(players.length);
                
                // Positionner les joueurs
                players.forEach((player, index) => {
                    player.moveTo({ x: -10, y: 0, z: index * 2 - players.length });
                });
            },
            update: (players, time) => {
                // Vérifier les passages de relais
                this.checkRelayHandoffs();
            },
            score: (player) => {
                return player.lapTime || Infinity;
            }
        });
    }

    createWaterPoloGoals() {
        const goalGeometry = new THREE.BoxGeometry(0.5, 2, 4);
        const goalMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        this.goals = {
            blue: new THREE.Mesh(goalGeometry, goalMaterial),
            red: new THREE.Mesh(goalGeometry, goalMaterial)
        };

        this.goals.blue.position.set(-12, 1, 0);
        this.goals.red.position.set(12, 1, 0);

        this.scene.add(this.goals.blue);
        this.scene.add(this.goals.red);
    }

    createWaterPoloBall() {
        const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const ballMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load('/textures/water_polo_ball.png')
        });

        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ball.position.set(0, 1, 0);
        this.scene.add(this.ball);

        // Physique simplifiée du ballon
        this.ballVelocity = new THREE.Vector3();
    }

    updateWaterPoloBall() {
        // Mise à jour de la position du ballon avec physique basique
        this.ball.position.add(this.ballVelocity);
        this.ballVelocity.multiplyScalar(0.98); // Friction
        this.ballVelocity.y -= 0.01; // Gravité

        // Rebonds sur l'eau
        if (this.ball.position.y < 0.3) {
            this.ball.position.y = 0.3;
            this.ballVelocity.y *= -0.5;
        }
    }

    createRelayLanes(numLanes) {
        const laneGeometry = new THREE.PlaneGeometry(20, 1);
        const laneMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2
        });

        this.lanes = [];
        for (let i = 0; i < numLanes; i++) {
            const lane = new THREE.Mesh(laneGeometry, laneMaterial);
            lane.rotation.x = -Math.PI / 2;
            lane.position.set(0, 0.1, i * 2 - numLanes);
            this.scene.add(lane);
            this.lanes.push(lane);
        }
    }

    startChallenge(challengeId, players) {
        const challenge = this.challenges.get(challengeId);
        if (!challenge) return false;

        if (players.length < challenge.minPlayers || players.length > challenge.maxPlayers) {
            console.warn(`Nombre de joueurs incorrect pour ${challenge.name}`);
            return false;
        }

        this.activeChallenge = {
            ...challenge,
            players: players,
            startTime: Date.now(),
            scores: new Map()
        };

        // Configuration du défi
        challenge.setup(players);

        // Créer l'interface
        this.createChallengeUI(challenge);

        // Démarrer le timer
        setTimeout(() => {
            this.endChallenge();
        }, challenge.duration * 1000);

        return true;
    }

    endChallenge() {
        if (!this.activeChallenge) return;

        // Calculer les scores finaux
        const finalScores = new Map();
        this.activeChallenge.players.forEach(player => {
            const score = this.activeChallenge.score(player);
            finalScores.set(player.id, score);
        });

        // Trouver le gagnant
        let highestScore = -Infinity;
        let winner = null;
        finalScores.forEach((score, playerId) => {
            if (score > highestScore) {
                highestScore = score;
                winner = playerId;
            }
        });

        // Distribuer les récompenses
        if (winner) {
            this.eventManager.distributeRewards({
                challengeName: this.activeChallenge.name,
                winner: winner,
                score: highestScore
            });
        }

        // Nettoyer
        this.cleanupChallenge();
        this.activeChallenge = null;
    }

    createChallengeUI(challenge) {
        const ui = document.createElement('div');
        ui.id = 'challenge-ui';
        ui.className = 'challenge-panel';
        ui.innerHTML = `
            <h2>${challenge.name}</h2>
            <p>${challenge.description}</p>
            <div class="challenge-timer">Temps: <span id="challenge-time">0:00</span></div>
            <div class="challenge-scores" id="challenge-scores"></div>
        `;
        document.body.appendChild(ui);

        this.updateChallengeTimer();
    }

    updateChallengeTimer() {
        if (!this.activeChallenge) return;

        const timeElement = document.getElementById('challenge-time');
        if (!timeElement) return;

        const updateTimer = () => {
            const elapsed = (Date.now() - this.activeChallenge.startTime) / 1000;
            const remaining = this.activeChallenge.duration - elapsed;
            
            if (remaining <= 0) return;

            const minutes = Math.floor(remaining / 60);
            const seconds = Math.floor(remaining % 60);
            timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            requestAnimationFrame(updateTimer);
        };

        updateTimer();
    }

    cleanupChallenge() {
        // Supprimer les éléments 3D spécifiques au défi
        if (this.goals) {
            this.scene.remove(this.goals.blue);
            this.scene.remove(this.goals.red);
        }
        if (this.ball) {
            this.scene.remove(this.ball);
        }
        if (this.lanes) {
            this.lanes.forEach(lane => this.scene.remove(lane));
        }

        // Supprimer l'interface
        const ui = document.getElementById('challenge-ui');
        if (ui) ui.remove();
    }

    update(delta) {
        if (this.activeChallenge) {
            this.activeChallenge.update(this.activeChallenge.players, delta);
        }
    }
}
