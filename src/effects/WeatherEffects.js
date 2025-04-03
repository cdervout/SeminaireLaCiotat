import * as THREE from 'three';
import { gsap } from 'gsap';

export class WeatherEffects {
    constructor(scene) {
        this.scene = scene;
        this.effects = new Map();
        this.initEffects();
    }

    initEffects() {
        // Système d'étoiles
        this.createStarfield();
        // Système d'étoiles filantes
        this.createShootingStars();
        // Arc-en-ciel
        this.createRainbow();
        // Système de nuages volumétriques
        this.createVolumetricClouds();
    }

    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });

        // Créer 1000 étoiles
        const starVertices = [];
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = Math.random() * 100 + 50;
            const z = (Math.random() - 0.5) * 200;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute('position', 
            new THREE.Float32BufferAttribute(starVertices, 3));

        this.starfield = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starfield);
        
        this.effects.set('stars', {
            mesh: this.starfield,
            active: false
        });
    }

    createShootingStars() {
        const shootingStarMaterial = new THREE.LineDashedMaterial({
            color: 0xffffff,
            linewidth: 1,
            scale: 1,
            dashSize: 0.3,
            gapSize: 0.1,
            transparent: true,
            opacity: 0
        });

        this.shootingStars = [];
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.BufferGeometry();
            const line = new THREE.Line(geometry, shootingStarMaterial);
            this.scene.add(line);
            this.shootingStars.push(line);
        }

        this.effects.set('shootingStars', {
            lines: this.shootingStars,
            active: false,
            nextStarTime: 0
        });
    }

    createRainbow() {
        const rainbowGeometry = new THREE.TorusGeometry(20, 0.1, 16, 100, Math.PI);
        const rainbowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform float time;
                
                vec3 rainbow(float t) {
                    vec3 c = 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
                    return c * smoothstep(0.0, 0.1, t) * smoothstep(1.0, 0.9, t);
                }
                
                void main() {
                    vec3 color = rainbow(vUv.x + time);
                    gl_FragColor = vec4(color, 0.7);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.rainbow = new THREE.Mesh(rainbowGeometry, rainbowMaterial);
        this.rainbow.rotation.x = Math.PI / 2;
        this.rainbow.position.y = 10;
        this.rainbow.visible = false;
        this.scene.add(this.rainbow);

        this.effects.set('rainbow', {
            mesh: this.rainbow,
            active: false,
            time: 0
        });
    }

    createVolumetricClouds() {
        const cloudGeometry = new THREE.BoxGeometry(5, 2, 5);
        const cloudMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                noiseTexture: { value: new THREE.TextureLoader().load('/textures/noise.png') }
            },
            vertexShader: `
                varying vec3 vPos;
                varying vec2 vUv;
                
                void main() {
                    vPos = position;
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform sampler2D noiseTexture;
                varying vec3 vPos;
                varying vec2 vUv;
                
                float fbm(vec3 p) {
                    float f = 0.0;
                    float amp = 0.5;
                    for(int i = 0; i < 4; i++) {
                        f += amp * texture2D(noiseTexture, p.xz * 0.1 + time * 0.05).r;
                        p *= 2.0;
                        amp *= 0.5;
                    }
                    return f;
                }
                
                void main() {
                    float density = fbm(vPos + vec3(time * 0.1));
                    density *= smoothstep(1.0, 0.8, length(vPos.xz) / 2.5);
                    density *= smoothstep(1.0, 0.8, abs(vPos.y));
                    gl_FragColor = vec4(vec3(1.0), density * 0.5);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.clouds = [];
        for (let i = 0; i < 10; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial.clone());
            cloud.position.set(
                (Math.random() - 0.5) * 40,
                20 + Math.random() * 10,
                (Math.random() - 0.5) * 40
            );
            cloud.rotation.y = Math.random() * Math.PI * 2;
            cloud.visible = false;
            this.scene.add(cloud);
            this.clouds.push(cloud);
        }

        this.effects.set('volumetricClouds', {
            meshes: this.clouds,
            active: false,
            time: 0
        });
    }

    showStars(show = true) {
        const stars = this.effects.get('stars');
        if (!stars) return;

        stars.active = show;
        gsap.to(stars.mesh.material, {
            opacity: show ? 0.8 : 0,
            duration: 2
        });
    }

    updateShootingStars(time) {
        const shootingStars = this.effects.get('shootingStars');
        if (!shootingStars || !shootingStars.active) return;

        if (time > shootingStars.nextStarTime) {
            // Créer une nouvelle étoile filante
            const star = shootingStars.lines[Math.floor(Math.random() * shootingStars.lines.length)];
            
            // Position de départ aléatoire
            const startPos = new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                50 + Math.random() * 30,
                (Math.random() - 0.5) * 100
            );
            
            // Direction de la chute
            const endPos = startPos.clone().add(
                new THREE.Vector3(
                    -2 - Math.random() * 4,
                    -4 - Math.random() * 4,
                    -2 - Math.random() * 4
                )
            );

            // Mettre à jour la géométrie
            const positions = new Float32Array([
                startPos.x, startPos.y, startPos.z,
                endPos.x, endPos.y, endPos.z
            ]);
            star.geometry.setAttribute('position', 
                new THREE.Float32BufferAttribute(positions, 3));
            
            // Animation
            gsap.to(star.material, {
                opacity: 0.8,
                duration: 0.2,
                onComplete: () => {
                    gsap.to(star.material, {
                        opacity: 0,
                        duration: 0.5
                    });
                }
            });

            // Planifier la prochaine étoile filante
            shootingStars.nextStarTime = time + 2 + Math.random() * 3;
        }
    }

    showRainbow(show = true) {
        const rainbow = this.effects.get('rainbow');
        if (!rainbow) return;

        rainbow.active = show;
        rainbow.mesh.visible = show;

        if (show) {
            // Animation d'apparition
            gsap.fromTo(rainbow.mesh.material.uniforms.opacity,
                { value: 0 },
                { value: 0.7, duration: 2 }
            );
        }
    }

    updateRainbow(delta) {
        const rainbow = this.effects.get('rainbow');
        if (!rainbow || !rainbow.active) return;

        rainbow.time += delta;
        rainbow.mesh.material.uniforms.time.value = rainbow.time * 0.1;
    }

    showVolumetricClouds(show = true) {
        const clouds = this.effects.get('volumetricClouds');
        if (!clouds) return;

        clouds.active = show;
        clouds.meshes.forEach(cloud => {
            cloud.visible = show;
        });
    }

    updateVolumetricClouds(delta) {
        const clouds = this.effects.get('volumetricClouds');
        if (!clouds || !clouds.active) return;

        clouds.time += delta;
        clouds.meshes.forEach(cloud => {
            cloud.material.uniforms.time.value = clouds.time;
            
            // Déplacement des nuages
            cloud.position.x += delta * 0.5;
            if (cloud.position.x > 50) {
                cloud.position.x = -50;
            }
        });
    }

    update(delta) {
        const time = performance.now() * 0.001;

        // Mettre à jour les étoiles filantes
        this.updateShootingStars(time);
        
        // Mettre à jour l'arc-en-ciel
        this.updateRainbow(delta);
        
        // Mettre à jour les nuages volumétriques
        this.updateVolumetricClouds(delta);
    }
}
