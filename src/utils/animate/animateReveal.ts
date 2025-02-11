import { gsap } from 'gsap'; // Importation de la bibliothèque GSAP pour les animations
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger de GSAP
import ScrollTrigger from 'gsap/ScrollTrigger'; // Importation du plugin ScrollTrigger de GSAP
import SplitType from 'split-type'; // Importation de la bibliothèque SplitType pour diviser le texte en lignes, mots et caractères

export function revealElements() {
  const specDuration = 1;
  const specBaseMoveYLow = 16;
  const specStaggerWords = 0.05;
  const specStaggerLines = 0.1;
  const specBaseOpacity0 = 0;
  const specBaseOpacity10 = 0.1;
  const specEase = 'power2.out';

  const animatedElements = document.querySelectorAll('[iw-animate-style]');

  animatedElements.forEach((element) => {
    const specStyle = element.getAttribute('iw-animate-style');
    const specDelay = parseFloat(element.getAttribute('iw-animate-delay') || '0') / 1000;
    let elementSlice: SplitType | undefined;

    const scrollTriggerConfig = {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none ',
    };

    // Initialiser SplitType si nécessaire
    if (specStyle?.includes('words')) {
      elementSlice = new SplitType(element as HTMLElement, { types: 'words' });
    } else if (specStyle?.includes('lines')) {
      elementSlice = new SplitType(element as HTMLElement, { types: 'lines' });
    }

    switch (specStyle) {
      case 'slide-up':
        gsap.fromTo(
          element,
          { y: specBaseMoveYLow, opacity: specBaseOpacity0 },
          {
            duration: specDuration,
            y: 0,
            opacity: 1,
            ease: specEase,
            delay: specDelay,
            scrollTrigger: scrollTriggerConfig,
          }
        );
        break;

      case 'fade-in':
        gsap.fromTo(
          element,
          { opacity: specBaseOpacity0 },
          {
            duration: specDuration,
            opacity: 1,
            ease: specEase,
            delay: specDelay,
            scrollTrigger: scrollTriggerConfig,
          }
        );
        break;

      case 'words-slide-up':
        if (elementSlice?.words) {
          gsap.fromTo(
            elementSlice.words,
            { y: specBaseMoveYLow, opacity: specBaseOpacity0 },
            {
              duration: specDuration,
              y: 0,
              opacity: 1,
              stagger: specStaggerWords,
              ease: specEase,
              delay: specDelay,
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }
        break;

      case 'lines-slide-up':
        if (elementSlice?.lines) {
          gsap.fromTo(
            elementSlice.lines,
            { y: specBaseMoveYLow, opacity: specBaseOpacity0 },
            {
              duration: specDuration,
              y: 0,
              opacity: 1,
              stagger: specStaggerLines,
              ease: specEase,
              delay: specDelay,
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }
        break;
      case 'lines-fade-in':
        if (elementSlice?.lines) {
          gsap.fromTo(
            elementSlice.lines,
            { y: specBaseMoveYLow, opacity: specBaseOpacity10 },
            {
              duration: specDuration,
              y: 0,
              opacity: 1,
              stagger: specStaggerLines,
              ease: specEase,
              delay: specDelay,
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }
        break;
    }
  });
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
