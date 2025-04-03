export class GameState {
    constructor() {
        this.isPlaying = false;
        this.playerTemperature = 1; // 1 = normal, 0 = très froid
        this.selectedCharacter = null;
        this.characters = [];
    }

    start() {
        this.isPlaying = true;
        this.playerTemperature = 1;
    }

    update(delta) {
        if (!this.isPlaying) return;

        // Mettre à jour la température du joueur s'il est dans l'eau
        if (this.selectedCharacter && this.selectedCharacter.isInWater) {
            this.playerTemperature = Math.max(0, this.playerTemperature - delta * 0.1);
        } else {
            this.playerTemperature = Math.min(1, this.playerTemperature + delta * 0.05);
        }

        // Mettre à jour tous les personnages
        for (const character of this.characters) {
            character.update(delta);
        }
    }
}
