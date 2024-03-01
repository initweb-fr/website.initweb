import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function revealSupHeading() {
  const supHeading = document.querySelector('[animate="supheading"]');

  gsap.from(supHeading, {
    opacity: 0.15,
    duration: 1,
    delay: 0.6,
    ease: 'power1.out',
  });
}

export function revealSubHeading() {
  const supHeadingTargets = document.querySelectorAll('[animate="subheading"]');
  supHeadingTargets.forEach((supHeadingTarget) => {
    gsap.from(supHeadingTarget, {
      opacity: 0.15,
      duration: 1,
      delay: 0.3,
      ease: 'power1.out',
    });
  });
}

export function revealText() {
  const textTargets = document.querySelectorAll('[animate="text"]');
  textTargets.forEach((textTarget) => {
    const textSplit = new SplitType(textTarget, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    const textSplitWord = textSplit.words;
    //console.log(textSplitWord)

    gsap.from(textSplitWord, {
      opacity: 0.15,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.1,

      scrollTrigger: {
        trigger: textSplitWord,
        start: 'top 65%',
        end: 'bottom 30%',
        scrub: true,
      },
    });
  });
}

export function revealHeading() {
  const headingTargets = document.querySelectorAll('[animate="heading"]');
  //console.log(headingTargets);
  headingTargets.forEach((headingTarget) => {
    const headingSplit = new SplitType(headingTarget, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    const headingSplitWord = headingSplit.words;
    //console.log(headingSplitWord)

    gsap.from(headingSplitWord, {
      opacity: 0.15,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power1.out',

      scrollTrigger: {
        trigger: headingSplitWord,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
      },
    });
  });
}
