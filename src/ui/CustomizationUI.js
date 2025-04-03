import { gsap } from 'gsap';

export class CustomizationUI {
    constructor(characterManager) {
        this.characterManager = characterManager;
        this.createUI();
    }

    createUI() {
        const container = document.createElement('div');
        container.id = 'customization-panel';
        container.className = 'hidden';
        container.innerHTML = `
            <div class="customization-content">
                <h2>Personnalisation</h2>
                <div class="section">
                    <h3>Maillot de bain</h3>
                    <div class="color-picker">
                        <button class="color-btn" data-color="#ff6ec7" style="background-color: #ff6ec7"></button>
                        <button class="color-btn" data-color="#00f7ff" style="background-color: #00f7ff"></button>
                        <button class="color-btn" data-color="#f7ff00" style="background-color: #f7ff00"></button>
                        <button class="color-btn" data-color="#39ff14" style="background-color: #39ff14"></button>
                    </div>
                    <div class="pattern-picker">
                        <button class="pattern-btn" data-pattern="geometric">Géométrique</button>
                        <button class="pattern-btn" data-pattern="tropical">Tropical</button>
                        <button class="pattern-btn" data-pattern="stripes">Rayures</button>
                        <button class="pattern-btn" data-pattern="dots">Pois</button>
                    </div>
                </div>
                <div class="section">
                    <h3>Accessoires</h3>
                    <div class="accessory-picker">
                        <button class="accessory-btn" data-accessory="sunglasses">Lunettes de soleil</button>
                        <button class="accessory-btn" data-accessory="hat">Chapeau</button>
                        <button class="accessory-btn" data-accessory="walkman">Walkman</button>
                    </div>
                </div>
                <div class="section">
                    <h3>Coiffure</h3>
                    <div class="hairstyle-picker">
                        <button class="hairstyle-btn" data-hairstyle="mullet">Mulet</button>
                        <button class="hairstyle-btn" data-hairstyle="perm">Permanente</button>
                        <button class="hairstyle-btn" data-hairstyle="mohawk">Mohawk</button>
                    </div>
                </div>
                <button id="close-customization">Terminer</button>
            </div>
        `;

        document.body.appendChild(container);
        this.setupEventListeners();
        this.addStyles();
    }

    addStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #customization-panel {
                position: fixed;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                border: 4px solid var(--neon-blue);
                border-radius: 20px 0 0 20px;
                padding: 20px;
                color: white;
                width: 300px;
                z-index: 1000;
            }

            #customization-panel.hidden {
                display: none;
            }

            .customization-content h2 {
                color: var(--neon-pink);
                text-align: center;
                margin-bottom: 20px;
                font-family: 'VT323', monospace;
                font-size: 2em;
            }

            .section {
                margin-bottom: 20px;
            }

            .section h3 {
                color: var(--neon-yellow);
                margin-bottom: 10px;
                font-family: 'VT323', monospace;
            }

            .color-picker, .pattern-picker, .accessory-picker, .hairstyle-picker {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin-bottom: 15px;
            }

            .color-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid white;
                cursor: pointer;
            }

            .color-btn:hover {
                transform: scale(1.1);
            }

            .pattern-btn, .accessory-btn, .hairstyle-btn {
                font-family: 'VT323', monospace;
                padding: 8px;
                background: transparent;
                border: 2px solid var(--neon-green);
                color: var(--neon-green);
                border-radius: 5px;
                cursor: pointer;
            }

            .pattern-btn:hover, .accessory-btn:hover, .hairstyle-btn:hover {
                background: var(--neon-green);
                color: black;
            }

            #close-customization {
                width: 100%;
                padding: 10px;
                background: transparent;
                border: 2px solid var(--neon-pink);
                color: var(--neon-pink);
                font-family: 'VT323', monospace;
                font-size: 1.2em;
                cursor: pointer;
                margin-top: 20px;
            }

            #close-customization:hover {
                background: var(--neon-pink);
                color: black;
            }

            .selected {
                box-shadow: 0 0 10px white;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(styles);
    }

    setupEventListeners() {
        const panel = document.getElementById('customization-panel');

        // Gestionnaire de couleurs
        panel.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                this.updateCharacterCustomization({ swimwearColor: color });
                this.updateSelection(btn, '.color-btn');
            });
        });

        // Gestionnaire de motifs
        panel.querySelectorAll('.pattern-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const pattern = btn.dataset.pattern;
                this.updateCharacterCustomization({ swimwearPattern: pattern });
                this.updateSelection(btn, '.pattern-btn');
            });
        });

        // Gestionnaire d'accessoires
        panel.querySelectorAll('.accessory-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const accessory = btn.dataset.accessory;
                this.updateCharacterCustomization({ accessoryType: accessory });
                this.updateSelection(btn, '.accessory-btn');
            });
        });

        // Gestionnaire de coiffures
        panel.querySelectorAll('.hairstyle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const hairstyle = btn.dataset.hairstyle;
                this.updateCharacterCustomization({ hairStyle: hairstyle });
                this.updateSelection(btn, '.hairstyle-btn');
            });
        });

        // Bouton de fermeture
        document.getElementById('close-customization').addEventListener('click', () => {
            this.hide();
        });
    }

    updateSelection(selectedBtn, selector) {
        document.querySelectorAll(selector).forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedBtn.classList.add('selected');
    }

    updateCharacterCustomization(options) {
        const selectedCharacter = this.characterManager.getSelectedCharacter();
        if (selectedCharacter) {
            this.characterManager.customizeCharacter(selectedCharacter.id, options);
        }
    }

    show() {
        const panel = document.getElementById('customization-panel');
        panel.classList.remove('hidden');
        gsap.from(panel, {
            x: 300,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    hide() {
        const panel = document.getElementById('customization-panel');
        gsap.to(panel, {
            x: 300,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                panel.classList.add('hidden');
                panel.style.transform = 'translateY(-50%)';
            }
        });
    }
}
