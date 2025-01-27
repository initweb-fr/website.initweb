import { gsap } from 'gsap'; // Importation de la bibliothèque GSAP pour les animations
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger de GSAP
import ScrollTrigger from 'gsap/ScrollTrigger';

export function animateScrollIndicator() {
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
