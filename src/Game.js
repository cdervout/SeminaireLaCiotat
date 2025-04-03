import { Scene } from './scene/Scene.js';

export class Game {
    constructor(canvas) {
        // Initialiser la scène
        this.scene = new Scene(canvas);
        
        // Gérer les erreurs WebGL
        this.handleWebGLErrors();
    }

    handleWebGLErrors() {
        const canvas = this.scene.renderer.domElement;
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.error('WebGL non supporté');
            alert('WebGL n\'est pas supporté par votre navigateur');
            return;
        }

        // Vérifier les erreurs WebGL
        const extension = gl.getExtension('WEBGL_lose_context');
        if (extension) {
            gl.getExtension('WEBGL_debug_renderer_info');
            console.log('Renderer:', gl.getParameter(gl.RENDERER));
            console.log('Vendor:', gl.getParameter(gl.VENDOR));
            console.log('Version:', gl.getParameter(gl.VERSION));
        }
    }

    onWindowResize() {
        if (this.scene) {
            this.scene.onWindowResize();
        }
    }
}
