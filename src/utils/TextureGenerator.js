import * as THREE from 'three';

export class TextureGenerator {
    static generateWaterNormalMap(width = 512, height = 512) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Créer un dégradé pour simuler les vagues
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const xNorm = (Math.sin(x * 0.1) + Math.sin(x * 0.05)) * 0.5;
                const yNorm = (Math.sin(y * 0.1) + Math.sin(y * 0.05)) * 0.5;
                
                const r = Math.floor(((xNorm + 1) * 0.5) * 255);
                const g = Math.floor(((yNorm + 1) * 0.5) * 255);
                const b = 255; // Hauteur constante pour l'eau
                
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    static generatePoolTileTexture(width = 512, height = 512, tileSize = 32) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Couleur de base du carrelage
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, width, height);

        // Dessiner la grille de carrelage
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x += tileSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y < height; y += tileSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    static generateSwimwearPattern(type, color, width = 256, height = 256) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Couleur de base
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        switch (type) {
            case 'geometric':
                this.drawGeometricPattern(ctx, width, height);
                break;
            case 'tropical':
                this.drawTropicalPattern(ctx, width, height);
                break;
            case 'stripes':
                this.drawStripesPattern(ctx, width, height);
                break;
            case 'dots':
                this.drawDotsPattern(ctx, width, height);
                break;
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    static drawGeometricPattern(ctx, width, height) {
        const size = 32;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x += size) {
            for (let y = 0; y < height; y += size) {
                const pattern = Math.floor(Math.random() * 4);
                
                switch (pattern) {
                    case 0: // Triangle
                        ctx.beginPath();
                        ctx.moveTo(x, y + size);
                        ctx.lineTo(x + size/2, y);
                        ctx.lineTo(x + size, y + size);
                        ctx.closePath();
                        ctx.stroke();
                        break;
                    case 1: // Carré
                        ctx.strokeRect(x + size/4, y + size/4, size/2, size/2);
                        break;
                    case 2: // Cercle
                        ctx.beginPath();
                        ctx.arc(x + size/2, y + size/2, size/4, 0, Math.PI * 2);
                        ctx.stroke();
                        break;
                    case 3: // Zigzag
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + size/2, y + size/2);
                        ctx.lineTo(x, y + size);
                        ctx.stroke();
                        break;
                }
            }
        }
    }

    static drawTropicalPattern(ctx, width, height) {
        // Dessiner des feuilles de palmier stylisées
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;

        for (let i = 0; i < 10; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 20;

            // Dessiner une feuille
            for (let j = 0; j < 5; j++) {
                const angle = (Math.PI / 3) * j - Math.PI / 3;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.quadraticCurveTo(
                    x + Math.cos(angle) * size * 0.5,
                    y + Math.sin(angle) * size * 0.5,
                    x + Math.cos(angle) * size,
                    y + Math.sin(angle) * size
                );
                ctx.stroke();
            }
        }
    }

    static drawStripesPattern(ctx, width, height) {
        const stripeWidth = 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        for (let x = 0; x < width; x += stripeWidth * 2) {
            ctx.fillRect(x, 0, stripeWidth, height);
        }
    }

    static drawDotsPattern(ctx, width, height) {
        const dotSize = 10;
        const spacing = 30;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        for (let x = spacing; x < width; x += spacing) {
            for (let y = spacing; y < height; y += spacing) {
                ctx.beginPath();
                ctx.arc(x, y, dotSize/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}
