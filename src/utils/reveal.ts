import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function revealHeader() {
  const headerComponents = document.querySelectorAll('[animate="section-header"]');
  if (headerComponents) {
    headerComponents.forEach((headerComponent) => {
      const headerTag = headerComponent.querySelector('[animate="header-tag"]');
      const headerTitle = headerComponent.querySelector('[animate="header-title"]');
      const headerTitleSplit = new SplitType(headerTitle, {
        types: 'lines, words, chars',
        tagName: 'span',
      });
      const headerText = headerComponent.querySelector('[animate="header-text"]');
      const headerTextSplit = new SplitType(headerText, {
        types: 'lines, words, chars',
        tagName: 'span',
      });
      const headerButtonPrimary = headerComponent.querySelector(
        '[animate="header-button-primary"]'
      );
      const headerButtonSecondary = headerComponent.querySelector(
        '[animate="header-button-secondary"]'
      );
      const headerButtonInfos = headerComponent.querySelector('[animate="header-button-infos"]');

      const specDuration = 0.6;
      const specBaseMoveY = 8;
      const specBaseOpacity = 0.02;
      const specDelay = specDuration - 0.1;
      const specEase = 'circ.Out';

      // Timeline Creation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerComponent, // Élément déclencheur
          start: 'top 70%', // Début de l'animation
          //end: 'top 40%', // Fin de l'animation
          //scrub: true, // Animation synchronisée avec le scroll
          //markers: true, // Affiche des marqueurs pour le debug
        },
      });

      // Animations of Timeline
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

export function revealHubContent() {
  const contentComponents = document.querySelectorAll('[animate="section-content"]');
  if (contentComponents) {
    contentComponents.forEach((contentComponent) => {
      const contentHubItems = contentComponent.querySelectorAll('[animate="hub-card"]');

      // Timeline Creation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentComponent, // Élément déclencheur
          start: 'top 70%', // Début de l'animation
          //end: 'top 40%', // Fin de l'animation
          //scrub: true, // Animation synchronisée avec le scroll
          //markers: true, // Affiche des marqueurs pour le debug
        },
      });

      const specDuration = 1;
      const specBaseMoveY = 0;
      const specBaseOpacity = 0.02;
      //const specDelay = specDuration - 0.1;
      const specEase = 'circ.Out';

      // Animations of Timeline
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

export function revealHomeHero() {
  const subsectionHomeHero = document.querySelector('[animate="subsection-home-hero"]');

  if (subsectionHomeHero) {
    const subsectionBackground = subsectionHomeHero.querySelector('.section_background');
    if (subsectionBackground) {
      const rect = subsectionBackground.getBoundingClientRect();
      const { width } = rect;

      const specTargetWidth = width - 64;

      // Timeline Creation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: subsectionHomeHero,
          start: 'bottom 100%',
          end: 'bottom 90%',
          scrub: true,
          //markers: true,
        },
      });

      // Animations of Timeline
      tl.to(subsectionBackground, { borderRadius: '48px', width: specTargetWidth, x: 32 });
    }
  }
}

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

  // Ajoute des animations à la timeline
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
