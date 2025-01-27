import { gsap } from 'gsap'; // Importation de la bibliothèque GSAP pour les animations
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger de GSAP
import ScrollTrigger from 'gsap/ScrollTrigger';

export function animateScrollIndicator() {
  // Sélectionner tous les éléments .YYY
  const targets = document.querySelectorAll('.container-xlarge');
  const elementToAnimate = document.querySelectorAll('.scroll-indicator_wrap');

  // Pour chaque élément .YYY
  targets.forEach((target) => {
    gsap.to(elementToAnimate, {
      width: '6rem', // Vous pouvez ajuster cette valeur selon vos besoins
      scrollTrigger: {
        trigger: target,
        start: 'top center', // Démarre quand le haut de .YYY atteint le centre de la fenêtre
        end: 'bottom center', // Se termine quand le bas de .YYY quitte le centre de la fenêtre
        scrub: false, // Animation fluide pendant le défilement
        // markers: true, // Décommentez pour le débogage
        toggleActions: 'play reverse play reverse',
      },
    });
  });

  const progressCounter = document.querySelector('[data-progress-nr]');
  console.log(progressCounter);

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100); // Calculate progress as a percentage

      // Nouvelle logique pour le formatage des nombres
      const formattedProgress = progress === 100 ? '100' : progress.toString().padStart(3, '0');

      progressCounter.textContent = formattedProgress;
    },
  });
}
