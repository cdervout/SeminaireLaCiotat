import { Howl, Howler } from 'howler';

export class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.currentTrack = null;
        this.initSounds();
    }

    initSounds() {
        // Effets sonores
        this.sounds = {
            splash: new Howl({
                src: ['/sounds/splash.mp3'],
                volume: 0.5
            }),
            shiver: new Howl({
                src: ['/sounds/shiver.mp3'],
                volume: 0.3
            }),
            bubbles: new Howl({
                src: ['/sounds/bubbles.mp3'],
                volume: 0.2,
                loop: true
            })
        };

        // Playlist de musique années 80
        this.playlist = [
            {
                title: "Summer Vibes",
                src: '/music/summer_vibes.mp3'
            },
            {
                title: "Pool Party",
                src: '/music/pool_party.mp3'
            },
            {
                title: "Retro Wave",
                src: '/music/retro_wave.mp3'
            }
        ];

remi        // Charger la père piste
        this.loadTrack(0);
    }

    loadTrack(index) {
        if (this.music) {
            this.music.unload();
        }

        this.currentTrackIndex = index;
        this.music = new Howl({
            src: [this.playlist[index].src],
            volume: 0.3,
            loop: false,
            onend: () => {
                // Passer à la piste suivante
                this.loadTrack((index + 1) % this.playlist.length);
            }
        });
    }

    playMusic() {
        if (this.music) {
            this.music.play();
        }
    }

    pauseMusic() {
        if (this.music) {
            this.music.pause();
        }
    }

    nextTrack() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(nextIndex);
        this.playMusic();
    }

    previousTrack() {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(prevIndex);
        this.playMusic();
    }

    playSplash() {
        this.sounds.splash.play();
    }

    playShiver() {
        if (!this.sounds.shiver.playing()) {
            this.sounds.shiver.play();
        }
    }

    startBubbles() {
        this.sounds.bubbles.play();
    }

    stopBubbles() {
        this.sounds.bubbles.stop();
    }

    setMasterVolume(volume) {
        Howler.volume(volume);
    }

    setMusicVolume(volume) {
        if (this.music) {
            this.music.volume(volume);
        }
    }

    setEffectsVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume(volume);
        });
    }
}
