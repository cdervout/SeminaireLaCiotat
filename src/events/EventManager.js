import { gsap } from 'gsap';

export class EventManager {
    constructor(scene, environmentManager, specialEffects, audioManager) {
        this.scene = scene;
        this.environmentManager = environmentManager;
        this.specialEffects = specialEffects;
        this.audioManager = audioManager;
        this.currentEvent = null;
        this.events = this.initEvents();
    }

    initEvents() {
        return {
            poolParty: {
                name: "Pool Party",
                description: "C'est l'heure de la fête ! Dansez et plongez au rythme de la musique !",
                duration: 300, // 5 minutes
                setup: () => {
                    this.specialEffects.startDiscoMode();
                    this.specialEffects.startSpotlightShow();
                    this.audioManager.loadTrack(1); // Charger la piste "Pool Party"
                    this.audioManager.playMusic();
                    this.environmentManager.setTimeOfDay(21); // Soirée
                    this.environmentManager.setWeather('clear');
                },
                cleanup: () => {
                    this.specialEffects.stopDiscoMode();
                    this.specialEffects.stopSpotlightShow();
                    this.audioManager.loadTrack(0); // Retour à la musique normale
                    this.audioManager.playMusic();
                },
                rewards: {
                    points: 500,
                    bonus: "Maillot de bain Disco"
                }
            },
            divingContest: {
                name: "Concours de Plongeon",
                description: "Montrez vos plus beaux plongeons ! Style et technique sont notés.",
                duration: 180, // 3 minutes
                setup: () => {
                    this.specialEffects.startSpotlightShow();
                    this.environmentManager.setTimeOfDay(14); // Après-midi
                    this.environmentManager.setWeather('clear');
                },
                cleanup: () => {
                    this.specialEffects.stopSpotlightShow();
                },
                rewards: {
                    points: 300,
                    bonus: "Plongeon spécial débloqué"
                },
                scoring: (dive) => {
                    // Notation du plongeon basée sur la hauteur, la rotation et l'entrée dans l'eau
                    let score = 0;
                    if (dive.height > 3) score += 50;
                    if (dive.rotations > 1) score += 30;
                    if (dive.splash < 0.5) score += 20;
                    return score;
                }
            },
            sunsetSwim: {
                name: "Baignade au Coucher du Soleil",
                description: "Profitez d'une baignade paisible au coucher du soleil",
                duration: 240, // 4 minutes
                setup: () => {
                    this.environmentManager.setTimeOfDay(19); // Début de soirée
                    this.environmentManager.setWeather('clear');
                    this.specialEffects.playSunsetTransition();
                    this.audioManager.loadTrack(2); // Charger la piste "Retro Wave"
                    this.audioManager.playMusic();
                },
                cleanup: () => {
                    this.audioManager.loadTrack(0); // Retour à la musique normale
                    this.audioManager.playMusic();
                },
                rewards: {
                    points: 200,
                    bonus: "Photo souvenir au coucher du soleil"
                }
            }
        };
    }

    startEvent(eventName) {
        if (this.currentEvent) {
            console.warn("Un événement est déjà en cours");
            return false;
        }

        const event = this.events[eventName];
        if (!event) {
            console.error("Événement inconnu:", eventName);
            return false;
        }

        this.currentEvent = {
            ...event,
            startTime: Date.now(),
            scores: new Map()
        };

        // Lancer l'événement
        event.setup();

        // Créer l'UI de l'événement
        this.createEventUI(event);

        // Définir la fin automatique
        this.eventTimeout = setTimeout(() => {
            this.endEvent();
        }, event.duration * 1000);

        // Émettre l'événement de début
        const startEvent = new CustomEvent('eventStart', { 
            detail: { 
                name: event.name,
                description: event.description,
                duration: event.duration
            }
        });
        window.dispatchEvent(startEvent);

        return true;
    }

    endEvent() {
        if (!this.currentEvent) return;

        // Nettoyer l'événement
        this.currentEvent.cleanup();

        // Distribuer les récompenses
        this.distributeRewards();

        // Supprimer l'UI
        this.removeEventUI();

        // Réinitialiser l'état
        clearTimeout(this.eventTimeout);
        this.currentEvent = null;

        // Émettre l'événement de fin
        const endEvent = new CustomEvent('eventEnd');
        window.dispatchEvent(endEvent);
    }

    createEventUI(event) {
        const ui = document.createElement('div');
        ui.id = 'event-ui';
        ui.className = 'event-panel';
        ui.innerHTML = `
            <h2>${event.name}</h2>
            <p>${event.description}</p>
            <div class="event-timer">Temps restant: <span id="event-time">0:00</span></div>
            <div class="event-score">Score: <span id="event-score">0</span></div>
        `;
        document.body.appendChild(ui);

        // Mettre à jour le timer
        this.updateEventTimer();
    }

    removeEventUI() {
        const ui = document.getElementById('event-ui');
        if (ui) ui.remove();
    }

    updateEventTimer() {
        if (!this.currentEvent) return;

        const timeElement = document.getElementById('event-time');
        if (!timeElement) return;

        const updateTimer = () => {
            const elapsed = (Date.now() - this.currentEvent.startTime) / 1000;
            const remaining = this.currentEvent.duration - elapsed;
            
            if (remaining <= 0) return;

            const minutes = Math.floor(remaining / 60);
            const seconds = Math.floor(remaining % 60);
            timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            requestAnimationFrame(updateTimer);
        };

        updateTimer();
    }

    recordScore(characterId, score) {
        if (!this.currentEvent) return;

        const currentScore = this.currentEvent.scores.get(characterId) || 0;
        this.currentEvent.scores.set(characterId, currentScore + score);

        // Mettre à jour l'affichage du score
        const scoreElement = document.getElementById('event-score');
        if (scoreElement) {
            scoreElement.textContent = this.currentEvent.scores.get(characterId);
        }
    }

    distributeRewards() {
        if (!this.currentEvent) return;

        // Trouver le meilleur score
        let bestScore = 0;
        let winner = null;

        this.currentEvent.scores.forEach((score, characterId) => {
            if (score > bestScore) {
                bestScore = score;
                winner = characterId;
            }
        });

        if (winner) {
            // Émettre l'événement de récompense
            const rewardEvent = new CustomEvent('eventReward', {
                detail: {
                    characterId: winner,
                    points: this.currentEvent.rewards.points,
                    bonus: this.currentEvent.rewards.bonus
                }
            });
            window.dispatchEvent(rewardEvent);
        }
    }

    update(delta) {
        // Mise à jour de l'événement en cours
        if (this.currentEvent) {
            // Vérifier si l'événement doit se terminer
            const elapsed = (Date.now() - this.currentEvent.startTime) / 1000;
            if (elapsed >= this.currentEvent.duration) {
                this.endEvent();
            }
        }
    }
}
