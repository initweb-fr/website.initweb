import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function revealSection() {
  const sectionElements = document.querySelectorAll('[animate="section"]');

  sectionElements.forEach((sectionElement) => {
    // Section of Elements

    const headerComponent = sectionElement.querySelector('[animate="section-header"]');
    const headerTag = sectionElement.querySelector('[animate="header-tag"]');
    const headerTitle = sectionElement.querySelector('[animate="header-title"]');
    const headerTitleSplit = new SplitType(headerTitle, {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    const headerText = sectionElement.querySelector('[animate="header-text"]');
    const headerTextSplit = new SplitType(headerText, {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    const headerButtonPrimary = sectionElement.querySelector('[animate="header-button-primary"]');
    const headerButtonSecondary = sectionElement.querySelector(
      '[animate="header-button-secondary"]'
    );
    const headerButtonInfos = sectionElement.querySelector('[animate="header-button-infos"]');

    const contentComponent = sectionElement.querySelector('[animate="section-content"]');

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
        end: 'top 40%', // Fin de l'animation
        scrub: true, // Animation synchronisée avec le scroll
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
      )
      .from(
        contentComponent,
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

export function revealSupHeading() {
  const supHeading = document.querySelector('[animate="supheading"]');

  gsap.from(supHeading, {
    opacity: 0.05,
    duration: 1,
    delay: 0.6,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: supHeading,
      start: 'top 65%',
      end: 'bottom 30%',
      scrub: true,
    },
  });
}

export function revealHeaderText() {
  const textTargets = document.querySelectorAll('[animate="header-text"]');
  textTargets.forEach((textTarget) => {
    const textSplit = new SplitType(textTarget, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    const textSplitLines = textSplit.lines;
    //console.log(textSplitWord)

    gsap.from(textSplitLines, {
      opacity: 0.05,
      ease: 'power1.out',
      stagger: 0.1,
      scrub: true,
      scrollTrigger: {
        trigger: textSplitLines,
        start: 'top 65%',
        end: 'bottom 30%',
        scrub: true,
      },
    });
  });
}

export function revealHeaderHeading() {
  const headingTargets = document.querySelectorAll('[animate="header-heading"]');

  //console.log(headingTargets);
  headingTargets.forEach((headingTarget) => {
    const headingSplit = new SplitType(headingTarget, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    const headingSplitWord = headingSplit.words;
    //console.log(headingSplitWord)

    gsap.from(headingSplitWord, {
      opacity: 0.05,
      stagger: 0.1,
      ease: 'power1.out',
      scrub: true,
      scrollTrigger: {
        trigger: headingSplitWord,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
      },
    });
  });
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
