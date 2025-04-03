# Plan et spécification détaillés - Jeu "Piscine Froide Années 80"

## Table des matières
1. [Introduction et concept](#introduction-et-concept)
2. [Règles du jeu](#règles-du-jeu)
3. [Personnages et environnement](#personnages-et-environnement)
4. [Mécaniques de gameplay](#mécaniques-de-gameplay)
5. [Spécification technique](#spécification-technique)
6. [Conclusion](#conclusion)

## Introduction et concept

"Piscine Froide Années 80" est un jeu web de simulation inspiré des Sims, destiné à un public adulte. Le concept central repose sur une expérience détendue et sans objectifs où les joueurs contrôlent des personnages qui s'amusent autour et dans une piscine particulièrement froide.

L'esthétique du jeu est fortement ancrée dans les années 80, avec des couleurs vives et flashy, notamment pour les maillots de bain des personnages. Cette direction artistique crée une ambiance nostalgique et festive, rappelant les films et séries télévisées de cette époque.

Le jeu se veut une expérience relaxante et amusante, sans pression ni contrainte. Les joueurs sont libres d'explorer l'environnement, de personnaliser leurs personnages et de profiter des différentes interactions disponibles, sans avoir à se soucier d'objectifs à atteindre ou de progression à réaliser.

## Règles du jeu

### Concept général
"Piscine Froide Années 80" est un jeu web de simulation inspiré des Sims, où les joueurs contrôlent des personnages adultes qui s'amusent autour et dans une piscine particulièrement froide. L'esthétique du jeu est fortement ancrée dans les années 80, avec des couleurs vives et flashy, notamment pour les maillots de bain des personnages.

### Principes fondamentaux
1. **Liberté totale** : Aucun objectif imposé, le joueur est libre d'explorer et de s'amuser comme il le souhaite.
2. **Simulation réaliste** : Les personnages réagissent au froid de la piscine et à leur environnement de manière réaliste.
3. **Expérience détendue** : Le jeu est conçu pour être une expérience relaxante et amusante, sans pression ni contrainte.

### Règles de base

#### Contrôle des personnages
- Le joueur peut sélectionner et contrôler n'importe quel personnage présent dans la zone de la piscine.
- La navigation se fait à la souris (clic pour déplacer) ou au clavier (touches directionnelles).
- Un personnage ne peut être contrôlé que par un seul joueur à la fois.

#### Interactions avec l'environnement
- Les personnages peuvent se déplacer librement autour de la piscine.
- Ils peuvent entrer dans la piscine et en sortir à volonté.
- Différents types de plongeons peuvent être réalisés depuis les bords de la piscine ou le plongeoir.

#### Système de température
- La piscine est très froide, ce qui affecte le comportement des personnages.
- Plus un personnage reste longtemps dans l'eau, plus il ressent le froid.
- Les personnages peuvent se réchauffer en sortant de l'eau et en s'exposant au soleil ou en utilisant des serviettes.

#### Interactions sociales
- Les personnages peuvent interagir entre eux de manière simple (discuter, s'éclabousser, etc.).
- Ces interactions sont optionnelles et n'affectent pas la progression du jeu.

#### Personnalisation
- Le joueur peut personnaliser l'apparence des personnages, notamment leurs maillots de bain aux couleurs flashy typiques des années 80.
- Différents accessoires (lunettes de soleil, bracelets fluo, etc.) peuvent être ajoutés aux personnages.

### Absence de règles contraignantes
- Pas de système de points ou de score.
- Pas de limite de temps.
- Pas de conditions de victoire ou d'échec.
- Pas de progression ou de niveaux à débloquer.

Le jeu est conçu comme un bac à sable virtuel où le joueur peut simplement profiter de l'ambiance et créer ses propres moments amusants sans contrainte.

## Personnages et environnement

### Personnages

#### Caractéristiques générales
- **Âge** : Adultes uniquement (20-60 ans)
- **Style** : Fortement inspiré des années 80
- **Diversité** : Variété de morphologies, ethnies et styles pour représenter différents archétypes des années 80

#### Personnalisation des personnages
- **Coiffures** : Permanentes volumineuses, mulets, coupes dégradées, bandeaux fluo
- **Maillots de bain** : 
  * Femmes : Maillots une pièce échancrés, bikinis à motifs géométriques
  * Hommes : Shorts de bain courts, slips de bain moulants
- **Palette de couleurs** : Néon (rose fluo, vert citron, jaune canari, bleu électrique, orange vif)
- **Motifs** : Géométriques, rayures, pois, motifs tropicaux, palmiers
- **Accessoires** : 
  * Lunettes de soleil surdimensionnées
  * Bracelets et bandeaux fluo
  * Montres digitales
  * Walkman avec écouteurs
  * Chaussures de plage colorées

#### Animations des personnages
- **Déplacements** : Marche normale, course, nage (différents styles)
- **Plongeons** : 
  * Plongeon classique
  * Bombe
  * Plat (avec réaction comique)
  * Vrille
  * Saut périlleux
- **Réactions au froid** : 
  * Frissons
  * Dents qui claquent
  * Bras croisés pour se réchauffer
  * Sortie précipitée de l'eau
- **Interactions sociales** : 
  * Discussions animées
  * Éclaboussures
  * Danse au bord de la piscine
  * Bronzage

### Environnement

#### Zone de la piscine
- **Piscine principale** : 
  * Forme rectangulaire avec coins arrondis
  * Eau d'un bleu très clair pour contraster avec les couleurs vives des maillots
  * Effet visuel de reflets glacés et de vapeur froide à la surface
  * Échelle pour entrer/sortir
- **Plongeoir** : 
  * Plongeoir standard
  * Plateforme surélevée pour plongeons plus spectaculaires
- **Abords de la piscine** : 
  * Carrelage à motifs géométriques typiques des années 80
  * Surface antidérapante avec texture visible

#### Mobilier et accessoires
- **Transats** : Modèles pliants en plastique et aluminium aux couleurs vives
- **Parasols** : Grands parasols à rayures ou motifs géométriques
- **Bar de piscine** : Petit comptoir avec tabourets hauts pour servir des boissons
- **Système audio** : Ghetto-blaster/radiocassette géant diffusant de la musique
- **Décorations** : 
  * Flamants roses en plastique
  * Bouées colorées
  * Ballons de plage
  * Panneaux néon

#### Éclairage et ambiance
- **Éclairage diurne** : Soleil éclatant, ombres nettes, reflets sur l'eau
- **Éclairage nocturne** : 
  * Lumières sous-marines dans la piscine
  * Guirlandes lumineuses colorées
  * Spots colorés créant une ambiance discothèque

#### Effets visuels
- **Eau** : 
  * Animation de vagues légères
  * Éclaboussures réalistes
  * Effet de buée froide à la surface
- **Météo** : Toujours ensoleillée, ciel bleu éclatant
- **Effets spéciaux** : 
  * Gouttelettes d'eau sur la peau des personnages
  * Chair de poule visible sur les personnages dans l'eau froide
  * Vapeur sortant de l'eau pour accentuer l'effet "eau froide"

#### Interface utilisateur
- **Style graphique** : Interface aux couleurs vives et formes géométriques typiques des années 80
- **Menus** : Inspirés des interfaces informatiques de l'époque (Windows 1.0, premiers Mac)
- **Polices** : Typographie digitale et pixelisée rappelant les premiers jeux vidéo

#### Direction artistique globale
- **Palette de couleurs dominante** : Cyan, magenta, jaune fluo, vert néon, orange vif
- **Style graphique** : Légèrement stylisé, non photoréaliste mais avec des détails soignés
- **Références visuelles** : 
  * Clips musicaux des années 80
  * Publicités pour piscines et maillots de bain de l'époque
  * Films comme "Fast Times at Ridgemont High" ou "Cocktail"
  * Esthétique vaporwave/synthwave pour une touche contemporaine

## Mécaniques de gameplay

### Contrôles et interface utilisateur

#### Contrôles de base
- **Sélection de personnage** : Clic gauche sur un personnage pour le sélectionner
- **Déplacement** : 
  * Clic gauche sur une zone accessible pour s'y déplacer
  * Touches directionnelles du clavier (haut, bas, gauche, droite)
- **Caméra** : 
  * Rotation : Clic droit + déplacement de la souris
  * Zoom : Molette de la souris
  * Réinitialisation : Touche Espace

#### Interface utilisateur
- **Menu principal** : Accès aux options de personnalisation, paramètres et quitter le jeu
- **Barre d'actions** : Affiche les actions disponibles pour le personnage sélectionné
- **Indicateur de température** : Thermomètre visuel montrant la sensation de froid du personnage
- **Panneau de personnalisation** : Interface pour modifier l'apparence des personnages

### Mécaniques principales

#### Système de déplacement
- **Navigation** : Pathfinding automatique évitant les obstacles
- **Zones accessibles** : 
  * Abords de la piscine (carrelage)
  * Dans la piscine (nage)
  * Plongeoir et plateformes
  * Zone de détente (transats, bar)
- **Transitions** : Animations fluides entre marche et nage

#### Système de piscine froide
- **Température de l'eau** : Constamment froide, représentée visuellement par des effets de vapeur
- **Jauge de froid** : 
  * Augmente progressivement lorsque le personnage est dans l'eau
  * Diminue lentement lorsque le personnage est hors de l'eau
  * Affecte les animations et comportements du personnage
- **Effets du froid** : 
  * Niveau 1 (léger) : Petits frissons, expressions faciales légèrement inconfortables
  * Niveau 2 (modéré) : Dents qui claquent, bras croisés pour se réchauffer
  * Niveau 3 (intense) : Tremblements visibles, urgence de sortir de l'eau
- **Réchauffement** : 
  * Exposition au soleil (plus rapide sur un transat)
  * Utilisation de serviettes
  * Consommation de boissons chaudes au bar

#### Système de plongeons
- **Points de plongeon** : 
  * Bord de la piscine (plusieurs emplacements)
  * Plongeoir standard
  * Plateforme haute
- **Types de plongeons** : 
  * Plongeon classique : Entrée propre dans l'eau
  * Bombe : Grosse éclaboussure, affecte les personnages à proximité
  * Plat : Animation comique, effet sonore humoristique
  * Vrille : Animation élégante avec rotation
  * Saut périlleux : Animation spectaculaire avec rotation avant
- **Mécanique d'exécution** : 
  * Sélection du type de plongeon dans un menu radial
  * Animation de préparation
  * Exécution automatique du plongeon
  * Transition vers la nage après l'entrée dans l'eau

#### Interactions sociales
- **Conversations** : 
  * Discussions simples entre personnages
  * Bulles de dialogue avec icônes expressifs plutôt que du texte
  * Différents tons (amical, drôle, séducteur)
- **Interactions aquatiques** : 
  * Éclaboussures (ciblées ou aléatoires)
  * Jeux d'eau simples
  * Natation synchronisée improvisée
- **Interactions hors de l'eau** : 
  * Bronzage sur transat
  * Danse au bord de la piscine
  * Consommation de boissons au bar

#### Système d'humeur
- **États d'humeur** : 
  * Détendu
  * Amusé
  * Frigorifié
  * Énergique
  * Fatigué
- **Facteurs d'influence** : 
  * Temps passé dans l'eau froide
  * Interactions sociales
  * Activités réalisées (plongeons, danse, etc.)
- **Effets visuels** : Expressions faciales et postures correspondant à l'humeur

#### Cycle jour/nuit
- **Progression du temps** : Cycle accéléré (1 heure réelle = 1 journée dans le jeu)
- **Changements visuels** : 
  * Éclairage naturel changeant
  * Transition vers éclairage artificiel la nuit
  * Effets de néon et lumières colorées la nuit
- **Activités spécifiques** : 
  * Jour : Bronzage, plongeons actifs
  * Nuit : Ambiance discothèque, danse, effets lumineux dans la piscine

### Mécaniques secondaires

#### Personnalisation dynamique
- **Changement de tenue** : Possibilité de changer de maillot de bain et d'accessoires à tout moment
- **Cabines de change** : Zones dédiées pour modifier l'apparence des personnages
- **Collections** : Différents styles de maillots et accessoires disponibles

#### Système photo
- **Mode photo** : Possibilité de prendre des captures d'écran stylisées
- **Filtres rétro** : Effets visuels rappelant les photos des années 80
- **Poses** : Positions spéciales pour les photos de groupe

#### Système audio
- **Radio** : Possibilité de changer le style musical diffusé (pop 80s, new wave, disco)
- **Effets sonores** : Sons d'éclaboussures, réactions au froid, ambiance de piscine
- **Réactions vocales** : Exclamations et onomatopées lors des plongeons ou en réaction au froid

#### Système météo
- **Conditions de base** : Toujours ensoleillé (pas de pluie pour maintenir l'ambiance festive)
- **Variations subtiles** : 
  * Légère brise (ondulations à la surface de l'eau)
  * Chaleur intense (effet de distorsion visuelle)
  * Coucher de soleil (lumière dorée, ambiance romantique)

### Absence de progression structurée
- **Pas de niveaux** : Expérience en bac à sable sans progression linéaire
- **Pas de déblocage** : Toutes les fonctionnalités disponibles dès le début
- **Pas de score** : Aucun système de points ou classement
- **Pas de défis** : Aucun objectif imposé au joueur

### Sauvegarde et chargement
- **Sauvegarde automatique** : État du jeu sauvegardé périodiquement
- **Sauvegarde manuelle** : Possibilité de sauvegarder à tout moment
- **Configurations multiples** : Plusieurs emplacements de sauvegarde disponibles

### Accessibilité
- **Options de contrôle** : Configurations alternatives pour les contrôles
- **Paramètres visuels** : Options pour ajuster les couleurs vives et les effets visuels
- **Paramètres audio** : Réglages séparés pour musique, effets sonores et voix

## Spécification technique

### Architecture générale

#### Type d'application
- **Application web** basée sur des technologies modernes
- **Expérience monoposte** (pas de multijoueur)
- **Responsive design** avec priorité pour les ordinateurs de bureau

#### Architecture logicielle
- **Architecture MVC** (Modèle-Vue-Contrôleur)
- **Client-side rendering** pour une expérience fluide
- **Sauvegarde locale** via localStorage ou IndexedDB

### Technologies recommandées

#### Frontend
- **Framework principal** : React.js ou Vue.js
  * Composants réutilisables pour les éléments d'interface
  * État global géré via Redux (React) ou Vuex (Vue)
  * Système de routing pour les différentes sections du jeu
- **Rendu graphique** : Three.js
  * Rendu 3D WebGL pour les personnages et l'environnement
  * Shaders personnalisés pour les effets d'eau et de lumière
  * Système de particules pour les éclaboussures et effets visuels
- **Animation** : 
  * GSAP (GreenSock Animation Platform) pour les animations d'interface
  * Animation squelettique pour les personnages via Three.js
- **Gestion audio** : Howler.js
  * Lecture de plusieurs pistes audio simultanées
  * Effets sonores spatialisés
  * Gestion des transitions musicales

#### Backend léger (optionnel)
- **Node.js** avec Express pour servir l'application
- **Pas de base de données** requise (stockage local uniquement)
- **API REST minimale** pour d'éventuelles fonctionnalités futures

#### Outils de développement
- **Bundler** : Webpack ou Vite
- **Transpilation** : Babel pour la compatibilité navigateur
- **Linting** : ESLint avec configuration Airbnb
- **Tests** : Jest pour les tests unitaires, Cypress pour les tests E2E
- **Gestion des assets** : Pipeline optimisé pour les modèles 3D, textures et sons

### Spécifications techniques détaillées

#### Système de rendu
- **Résolution cible** : 1920x1080 (adaptable)
- **Framerate cible** : 60 FPS
- **Niveau de détail (LOD)** : 
  * Système dynamique ajustant la qualité selon les performances
  * Minimum de 3 niveaux de détail pour les modèles 3D
- **Post-processing** : 
  * Bloom pour les effets néon
  * Aberration chromatique légère pour l'esthétique rétro
  * Correction des couleurs pour l'ambiance années 80

#### Modèles et animations
- **Personnages** : 
  * 5000-7500 polygones par personnage
  * Squelette d'animation avec 30-40 joints
  * Système de skinning pour les déformations du maillot de bain
  * Blend shapes pour les expressions faciales
- **Environnement** : 
  * 50000-100000 polygones pour l'ensemble de la scène
  * Optimisation via instancing pour les éléments répétitifs
- **Animations** : 
  * 30-40 animations par personnage
  * Système de transition fluide entre animations
  * Animations procédurales pour les effets de l'eau et du froid

#### Système de physique
- **Simulation d'eau** : 
  * Simulation simplifiée pour les interactions avec la surface
  * Système de particules pour les éclaboussures
  * Pas de simulation fluide complète (trop intensive)
- **Collisions** : 
  * Détection de collision simplifiée avec boîtes englobantes
  * Système de réponse aux collisions pour éviter les chevauchements
- **Ragdoll** : Système léger pour les plongeons ratés (plats)

#### Interface utilisateur
- **Composants** : 
  * Menus stylisés années 80
  * Panneaux de contrôle pour les actions
  * Indicateurs d'état (thermomètre, humeur)
- **Accessibilité** : 
  * Contraste élevé malgré les couleurs vives
  * Options de redimensionnement des éléments d'interface
  * Support des lecteurs d'écran pour les menus principaux

#### Système audio
- **Musique** : 
  * 5-10 pistes musicales de style années 80
  * Système de transition entre les pistes
  * Mixage dynamique selon l'ambiance (jour/nuit)
- **Effets sonores** : 
  * 50-100 effets sonores distincts
  * Spatialisation 3D pour les sons d'environnement
  * Variations aléatoires pour éviter la répétition

#### Système de sauvegarde
- **Format** : JSON structuré
- **Données sauvegardées** : 
  * État des personnages (position, apparence, humeur)
  * État de l'environnement
  * Préférences utilisateur
- **Fréquence** : 
  * Sauvegarde automatique toutes les 5 minutes
  * Sauvegarde manuelle à la demande

### Exigences techniques

#### Navigateurs supportés
- **Navigateurs modernes** : 
  * Chrome (2 dernières versions)
  * Firefox (2 dernières versions)
  * Safari (2 dernières versions)
  * Edge (2 dernières versions)
- **Exigences minimales** : 
  * Support de WebGL 2.0
  * Support d'ECMAScript 2018+
  * Support des Web Audio API

#### Matériel recommandé
- **CPU** : Processeur dual-core 2.0 GHz ou supérieur
- **RAM** : 4 GB minimum
- **GPU** : Carte graphique avec support WebGL 2.0
- **Stockage** : 200 MB d'espace disque disponible
- **Connexion internet** : Requise uniquement pour le chargement initial

#### Performance et optimisation
- **Temps de chargement initial** : < 15 secondes sur connexion standard
- **Utilisation mémoire** : < 1 GB RAM
- **Techniques d'optimisation** : 
  * Lazy loading des assets
  * Compression des textures
  * Instancing pour les éléments répétitifs
  * Occlusion culling pour le rendu

### Feuille de route technique

#### Phase 1 : Prototype
- **Semaines 1-2** : 
  * Mise en place de l'environnement de développement
  * Création d'un personnage et d'une piscine basiques
  * Implémentation des contrôles de base
- **Semaines 3-4** : 
  * Système de déplacement et de nage
  * Première version du système de plongeons
  * Interface utilisateur temporaire

#### Phase 2 : Version alpha
- **Semaines 5-8** : 
  * Finalisation des modèles de personnages
  * Implémentation complète de l'environnement
  * Système de personnalisation
  * Mécaniques de base du gameplay

#### Phase 3 : Version bêta
- **Semaines 9-12** : 
  * Finalisation des animations
  * Implémentation des effets visuels
  * Système audio complet
  * Tests de performance et optimisations

#### Phase 4 : Finalisation
- **Semaines 13-16** : 
  * Polissage général
  * Correction des bugs
  * Optimisations finales
  * Préparation au déploiement

### Considérations techniques supplémentaires

#### Accessibilité
- **Daltonisme** : Modes de couleur alternatifs
- **Mobilité réduite** : Options de contrôle alternatives
- **Épilepsie** : Option pour réduire les effets visuels intenses

#### Internationalisation
- **Structure** : Système i18n avec fichiers de traduction JSON
- **Langues initiales** : Français, Anglais
- **Extensibilité** : Architecture permettant l'ajout facile de nouvelles langues

#### Sécurité
- **Sanitisation** : Validation des entrées utilisateur
- **Stockage local** : Chiffrement léger des données sauvegardées
- **Prévention** : Protection contre les exploits XSS courants

#### Évolutivité
- **Architecture modulaire** permettant l'ajout de nouvelles fonctionnalités
- **API interne** bien documentée pour faciliter les extensions
- **Système de plugins** pour d'éventuelles contributions communautaires

## Conclusion

Le jeu "Piscine Froide Années 80" offre une expérience unique combinant la nostalgie des années 80 avec un gameplay détendu inspiré des Sims. En se concentrant sur une esthétique visuelle forte et des mécaniques de jeu simples mais engageantes, ce jeu web propose aux joueurs adultes un espace de détente et d'amusement sans contraintes ni objectifs.

La conception détaillée présentée dans ce document couvre tous les aspects nécessaires à la réalisation du jeu, depuis les règles fondamentales jusqu'aux spécifications techniques pour l'implémentation. L'accent mis sur l'ambiance années 80, avec ses couleurs flashy et son style distinctif, crée une identité visuelle forte qui sera immédiatement reconnaissable.

Les mécaniques de gameplay, centrées autour de la piscine froide et des plongeons, offrent suffisamment de variété pour maintenir l'intérêt des joueurs tout en restant accessibles et intuitives. L'absence d'objectifs spécifiques permet aux joueurs de créer leur propre expérience et de profiter du jeu à leur rythme.

Sur le plan technique, l'utilisation de technologies web modernes comme React/Vue.js et Three.js permettra de créer une expérience fluide et visuellement attrayante, accessible directement depuis un navigateur web sans installation nécessaire.

Ce plan de conception constitue une base solide pour le développement du jeu "Piscine Froide Années 80", offrant une vision claire et détaillée du produit final tout en laissant suffisamment de flexibilité pour des ajustements et améliorations au cours du processus de développement.
