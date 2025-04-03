import * as THREE from 'three';

export class CharacterModel {
    static create() {
        // Groupe principal pour le personnage
        const character = new THREE.Group();
        character.name = 'character';

        // Corps
        const body = this.createBody();
        character.add(body);

        // Tête
        const head = this.createHead();
        head.position.y = 1.6;
        character.add(head);

        // Bras
        const leftArm = this.createLimb(0.2, 0.6);
        leftArm.position.set(0.35, 1.3, 0);
        leftArm.name = 'leftArm';
        character.add(leftArm);

        const rightArm = this.createLimb(0.2, 0.6);
        rightArm.position.set(-0.35, 1.3, 0);
        rightArm.name = 'rightArm';
        character.add(rightArm);

        // Jambes
        const leftLeg = this.createLimb(0.25, 0.8);
        leftLeg.position.set(0.2, 0.4, 0);
        leftLeg.name = 'leftLeg';
        character.add(leftLeg);

        const rightLeg = this.createLimb(0.25, 0.8);
        rightLeg.position.set(-0.2, 0.4, 0);
        rightLeg.name = 'rightLeg';
        character.add(rightLeg);

        return character;
    }

    static createBody() {
        // Corps principal
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff6ec7 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.9;
        body.name = 'swimwear';

        // Torse
        const torsoGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 8);
        const torsoMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
        const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
        torso.position.y = 0.6;

        // Groupe du corps
        const bodyGroup = new THREE.Group();
        bodyGroup.add(body);
        bodyGroup.add(torso);
        bodyGroup.name = 'body';

        return bodyGroup;
    }

    static createHead() {
        const headGroup = new THREE.Group();
        headGroup.name = 'head';

        // Tête principale
        const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        headGroup.add(head);

        // Yeux
        const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(0.1, 0, 0.2);
        headGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(-0.1, 0, 0.2);
        headGroup.add(rightEye);

        // Cheveux
        const hairGeometry = new THREE.SphereGeometry(0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.rotation.x = Math.PI;
        hair.position.y = 0.1;
        hair.name = 'hair';
        headGroup.add(hair);

        return headGroup;
    }

    static createLimb(radius, height) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xffdbac });
        const limb = new THREE.Mesh(geometry, material);
        limb.position.y = -height/2;
        return limb;
    }

    static createBones() {
        const bones = [];

        // Os racine
        const rootBone = new THREE.Bone();
        rootBone.position.y = 0;
        bones.push(rootBone);

        // Os du corps
        const bodyBone = new THREE.Bone();
        bodyBone.position.y = 0.9;
        rootBone.add(bodyBone);
        bones.push(bodyBone);

        // Os de la tête
        const headBone = new THREE.Bone();
        headBone.position.y = 1.6;
        bodyBone.add(headBone);
        bones.push(headBone);

        // Os des bras
        const leftArmBone = new THREE.Bone();
        leftArmBone.position.set(0.35, 1.3, 0);
        bodyBone.add(leftArmBone);
        bones.push(leftArmBone);

        const rightArmBone = new THREE.Bone();
        rightArmBone.position.set(-0.35, 1.3, 0);
        bodyBone.add(rightArmBone);
        bones.push(rightArmBone);

        // Os des jambes
        const leftLegBone = new THREE.Bone();
        leftLegBone.position.set(0.2, 0.4, 0);
        rootBone.add(leftLegBone);
        bones.push(leftLegBone);

        const rightLegBone = new THREE.Bone();
        rightLegBone.position.set(-0.2, 0.4, 0);
        rootBone.add(rightLegBone);
        bones.push(rightLegBone);

        return {
            bones,
            rootBone
        };
    }
}
