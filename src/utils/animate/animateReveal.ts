import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Fonction pour révéler l'en-tête avec des animations
export function revealHeader() {
  // Sélectionne tous les composants d'en-tête avec l'attribut 'animate="section-header"'
  const headerComponents = document.querySelectorAll('[animate="section-header"]');
  if (headerComponents) {
    headerComponents.forEach((headerComponent) => {
      // Sélectionne les différents éléments de l'en-tête
      const headerTag = headerComponent.querySelector('[animate="header-tag"]');
      const headerTitle = headerComponent.querySelector('[animate="header-title"]') as HTMLElement;
      const headerTitleSplit = new SplitType(headerTitle, {
        types: 'lines,words,chars',
        tagName: 'span',
      });
      const headerText = headerComponent.querySelector('[animate="header-text"]') as HTMLElement;
      const headerTextSplit = new SplitType(headerText, {
        types: 'lines,words,chars',
        tagName: 'span',
      });
      const headerButtonPrimary = headerComponent.querySelector(
        '[animate="header-button-primary"]'
      );
      const headerButtonSecondary = headerComponent.querySelector(
        '[animate="header-button-secondary"]'
      );
      const headerButtonInfos = headerComponent.querySelector('[animate="header-button-infos"]');

      // Paramètres de l'animation
      const specDuration = 0.6;
      const specBaseMoveY = 8;
      const specBaseOpacity = 0.02;
      const specDelay = specDuration - 0.1;
      const specEase = 'circ.Out';

      // Création de la timeline pour les animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerComponent, // Élément déclencheur
          start: 'top 70%', // Début de l'animation
          //end: 'top 40%', // Fin de l'animation
          //scrub: true, // Animation synchronisée avec le scroll
          //markers: true, // Affiche des marqueurs pour le debug
        },
      });

      // Ajout des animations à la timeline
      tl.from(
        headerTag,
        { opacity: specBaseOpacity, duration: specDuration, ease: specEase },
        '-=' + specDelay
      )
        .from(
          headerTitleSplit.words,
          {
            opacity: specBaseOpacity,
            y: specBaseMoveY,
            stagger: 0.1,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        )
        .from(
          headerTextSplit.lines,
          {
            opacity: specBaseOpacity,
            y: specBaseMoveY,
            stagger: 0.1,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        )
        .from(
          headerButtonInfos,
          {
            opacity: specBaseOpacity,
            y: specBaseMoveY,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        )
        .from(
          headerButtonSecondary,
          {
            opacity: specBaseOpacity,
            y: specBaseMoveY,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        )
        .from(
          headerButtonPrimary,
          {
            opacity: specBaseOpacity,
            y: specBaseMoveY,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        );
    });
  }
}

// Fonction pour révéler le contenu du hub avec des animations
export function revealHubContent() {
  // Sélectionne tous les composants de contenu avec l'attribut 'animate="section-content"'
  const contentComponents = document.querySelectorAll('[animate="section-content"]');
  if (contentComponents) {
    contentComponents.forEach((contentComponent) => {
      // Sélectionne les éléments de contenu du hub
      const contentHubItems = contentComponent.querySelectorAll('[animate="content-element"]');

      // Création de la timeline pour les animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentComponent, // Élément déclencheur
          start: 'top 70%', // Début de l'animation
          //end: 'top 40%', // Fin de l'animation
          //scrub: true, // Animation synchronisée avec le scroll
          //markers: true, // Affiche des marqueurs pour le debug
        },
      });

      // Paramètres de l'animation
      const specDuration = 1;
      const specBaseMoveY = 0;
      const specBaseOpacity = 0.02;
      //const specDelay = specDuration - 0.1;
      const specEase = 'circ.Out';

      // Ajout des animations à la timeline
      tl.from(contentHubItems, {
        opacity: specBaseOpacity,
        y: specBaseMoveY,
        duration: specDuration,
        ease: specEase,
        stagger: 0.2,
      });
    });
  }
}

// Fonction pour révéler le héros de la page d'accueil avec des animations
export function revealHomeHero() {
  // Définition du point de rupture pour le mode bureau
  const breakpointDesktop = window.matchMedia('(min-width: 992px)');

  // Fonction pour gérer le redimensionnement de la fenêtre
  const handleResize = () => {
    if (breakpointDesktop.matches) {
      initRevealHomeHero(); // Initialiser l'animation si en mode bureau
    } else {
      // Gérer le cas mobile si nécessaire
    }
  };

  handleResize(); // Appel initial pour configurer l'état correct au chargement
  window.addEventListener('resize', handleResize); // Écouter l'événement de redimensionnement

  // Fonction pour initialiser l'animation du héros de la page d'accueil
  function initRevealHomeHero() {
    const subsectionHomeHero = document.querySelector('[animate="subsection-home-hero"]');

    if (subsectionHomeHero) {
      const subsectionBackground = subsectionHomeHero.querySelector('.section_background');
      if (subsectionBackground) {
        const rect = subsectionBackground.getBoundingClientRect();
        const { width } = rect;

        const specTargetWidth = width - 64;

        // Création de la timeline pour les animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: subsectionHomeHero,
            start: 'bottom 100%',
            end: 'bottom 90%',
            scrub: true,
            //markers: true,
          },
        });

        // Ajout des animations à la timeline
        tl.to(subsectionBackground, { width: specTargetWidth, x: 32, borderRadius: 64 });
      }
    }
  }
}

/**
// Fonction pour révéler le héros de la formation avec des animations
export function revealFormaHero() {
  // Sélection des différents éléments du héros de la formation
  const formaHeroTag = document.querySelector('[animate="forma-hero-tag"]');
  const formaHeroH1 = document.querySelector('[animate="forma-hero-h1"]');

  const formaHeroInfos = document.querySelector('[animate="forma-hero-infos"]');
  const formaHeroStars = document.querySelector('[animate="forma-hero-stars"]');
  const formaHeroButtonSecondary = document.querySelector(
    '[animate="forma-hero-button-secondary"]'
  );
  const formaHeroButtonPrimary = document.querySelector('[animate="forma-hero-button-primary"]');

  const formaHeroLogos = document.querySelector('[animate="forma-hero-logos"]');

  const formaHeroVideoAmorce = document.querySelector('[animate="forma-hero-video-amorce"]');
  const formaHeroVideoTags = document.querySelectorAll('[animate="forma-hero-video-tags"]');

  const formaHeroVideoGradient = document.querySelector('[animate="forma-hero-video-gradient"]');
  const formaHeroVideo = document.querySelector('[animate="forma-hero-video"]');

  // Paramètres de l'animation
  const specDuration = 0.6;
  const specBaseMoveY = 64;
  const specBaseOpacity = 0;
  const specBaseScaleX = 0;
  const specTargetMoveY = 0;
  const specTargetOpacity = 1;
  const specTargetScaleX = 1;
  const specDelay = specDuration - 0.1;
  const specEase = 'expo.Out';

  // Initialisation des propriétés des éléments
  gsap.set(formaHeroTag, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroH1, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroInfos, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroStars, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroButtonSecondary, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroButtonPrimary, { opacity: specBaseOpacity, y: specBaseMoveY });
  gsap.set(formaHeroLogos, { opacity: specBaseOpacity });
  gsap.set(formaHeroVideoAmorce, { opacity: specBaseOpacity, y: specBaseMoveY });
  formaHeroVideoTags.forEach((formaHeroVideoTag) => {
    gsap.set(formaHeroVideoTag, { opacity: specBaseOpacity, y: specBaseMoveY });
  });
  gsap.set(formaHeroVideoGradient, {
    scaleX: specBaseScaleX,
    opacity: specBaseOpacity,
    y: specBaseMoveY,
  });
  gsap.set(formaHeroVideo, { opacity: specBaseOpacity, y: specBaseMoveY });

  // Création de la timeline pour les animations
  const tl = gsap.timeline();

  // Ajout des animations à la timeline
  tl.to(formaHeroTag, {
    duration: specDuration,
    y: specTargetMoveY,
    opacity: specTargetOpacity,
    ease: specEase,
  })
    .to(
      formaHeroH1,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )

    .to(
      formaHeroInfos,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroStars,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroButtonSecondary,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroButtonPrimary,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroLogos,
      { duration: specDuration, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroVideo,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=' + specDelay
    )
    .to(
      formaHeroVideoGradient,
      {
        duration: specDuration,
        y: specTargetMoveY,
        ease: specEase,
      },
      '-=' + specDuration
    )
    .to(
      formaHeroVideoGradient,
      {
        duration: specDuration * 3,
        opacity: specTargetOpacity,
        scaleX: specTargetScaleX,
        ease: specEase,
      },
      '-=0'
    )
    .to(
      formaHeroVideoAmorce,
      { duration: specDuration, y: specTargetMoveY, opacity: specTargetOpacity, ease: specEase },
      '-=1'
    );
  formaHeroVideoTags.forEach((formaHeroVideoTag) => {
    tl.to(
      formaHeroVideoTag,
      {
        duration: specDuration,
        stagger: 0.1,
        y: specTargetMoveY,
        opacity: specTargetOpacity,
        ease: specEase,
      },
      '-=' + specDelay
    );
  });

  tl.play();
}

**/
