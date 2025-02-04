import { gsap } from 'gsap'; // Importation de la bibliothèque GSAP pour les animations
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger de GSAP
import ScrollTrigger from 'gsap/ScrollTrigger'; // Importation du plugin ScrollTrigger de GSAP
import SplitType from 'split-type'; // Importation de la bibliothèque SplitType pour diviser le texte en lignes, mots et caractères

// Fonction pour révéler les en-têtes avec des animations
export function revealHeader() {
  const headerComponents = document.querySelectorAll('[iw-animate="header"]'); // Sélection de tous les éléments avec l'attribut 'animate="section-header"'
  if (headerComponents) {
    headerComponents.forEach((headerComponent) => {
      // Sélection des différents éléments de l'en-tête
      const headerTag = headerComponent.querySelector('[iw-animate="header_tag"]');
      const headerTitle = headerComponent.querySelector(
        '[iw-animate="header_title"]'
      ) as HTMLElement;
      const headerTitleSplit = new SplitType(headerTitle, {
        types: 'lines,words,chars',
        tagName: 'span',
      }); // Division du titre en lignes, mots et caractères
      const headerText = headerComponent.querySelector('[iw-animate="header_text"]') as HTMLElement;
      const headerTextSplit = new SplitType(headerText, {
        types: 'lines,words,chars',
        tagName: 'span',
      }); // Division du texte en lignes, mots et caractères
      const headerButtons = headerComponent.querySelectorAll('[iw-animate="header_button"]');
      const headerButtonInfos = headerComponent.querySelector('[iw-animate="header_proof"]');

      // Spécifications des animations
      const specDuration = 1;
      //const specBaseMoveY = 8;
      const specBaseOpacity = 0.1;
      const specDelay = specDuration - 0.1;
      const specDelayHigh = specDuration - 0.5;
      const specEase = 'circ.Out';

      // Création d'une timeline GSAP avec ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerComponent,
          start: 'top 70%',
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
            stagger: 0.1,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelayHigh
        )
        .from(
          headerTextSplit.lines,
          {
            opacity: specBaseOpacity,
            stagger: 0.1,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelayHigh
        )
        .from(
          headerButtonInfos,
          {
            opacity: specBaseOpacity,
            duration: specDuration,
            ease: specEase,
          },
          '-=' + specDelay
        )
        .from(
          headerButtons,
          {
            opacity: specBaseOpacity,
            duration: specDuration,
            ease: specEase,
            stagger: '0.2',
          },
          '-=' + specDelay
        );
    });
  }
}

// Fonction pour révéler le contenu du hub avec des animations
export function revealHubContent() {
  const contentComponents = document.querySelectorAll('[animate="section-content"]'); // Sélection de tous les éléments avec l'attribut 'animate="section-content"'
  if (contentComponents) {
    contentComponents.forEach((contentComponent) => {
      const contentHubItems = contentComponent.querySelectorAll('[animate="content-element"]'); // Sélection des éléments de contenu

      // Création d'une timeline GSAP avec ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentComponent,
          start: 'top 70%',
        },
      });

      // Spécifications des animations
      const specDuration = 1;
      const specBaseMoveY = 0;
      const specBaseOpacity = 0.02;
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

/**
export function revealFormaHero() {
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

  const specDuration = 0.6;
  const specBaseMoveY = 64;
  const specBaseOpacity = 0;
  const specBaseScaleX = 0;
  const specTargetMoveY = 0;
  const specTargetOpacity = 1;
  const specTargetScaleX = 1;
  const specDelay = specDuration - 0.1;
  const specEase = 'expo.Out';

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

  const tl = gsap.timeline();

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
