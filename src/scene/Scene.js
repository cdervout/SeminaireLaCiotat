import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water';
import { Character } from '../characters/Character';
import { PlayerControls } from '../controls/PlayerControls';

export class Scene {
    constructor(canvas) {
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLights();
        this.initControls();
        this.createEnvironment();
        this.createPlayer();
        this.initPlayerControls();
        
        // Démarrer la boucle de rendu
        this.animate();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Ciel bleu
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
    }

    initControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 50;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    initLights() {
        // Lumière ambiante
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        // Lumière directionnelle (soleil)
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(50, 50, 50);
        sun.castShadow = true;
        this.scene.add(sun);
    }

    createEnvironment() {
        // Sol
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 0x808080 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Piscine
        const pool = new THREE.Mesh(
            new THREE.BoxGeometry(20, 2, 20),
            new THREE.MeshStandardMaterial({
                color: 0x4444ff,
                transparent: true,
                opacity: 0.6
            })
        );
        pool.position.y = -1;
        pool.receiveShadow = true;
        this.scene.add(pool);

        // Eau
        const waterGeometry = new THREE.PlaneGeometry(20, 20);
        this.water = new THREE.Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg', function(texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7
        });
        this.water.rotation.x = -Math.PI / 2;
        this.scene.add(this.water);
    }

    createPlayer() {
        this.player = new Character(this.scene, new THREE.Vector3(0, 1, 0));
    }

    initPlayerControls() {
        this.playerControls = new PlayerControls(this.player);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update(delta) {
        // Mettre à jour les contrôles
        this.controls.update();
        
        // Mettre à jour l'eau
        if (this.water) {
            this.water.material.uniforms['time'].value += delta;
        }

        // Mettre à jour le joueur et ses contrôles
        if (this.player) {
            this.player.update(delta);
            this.playerControls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        this.update(delta);
    }
}
