export function manageGlobalTOC() {
  // Initialisation

  const resetTOC = document.querySelector('.mod-cont_toc_reset');
  const tocElement = document.querySelector('.mod-cont_toc_component');
  const openTOC = document.querySelector('.mod-cont_toc_open-all');

  resetTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
  resetTOC.style.borderColor = 'var(--border-color--alternate-100)';
  openTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
  openTOC.style.borderColor = 'var(--border-color--alternate-0)';

  // Affichage au clic
  openTOC.addEventListener('click', function () {
    if (tocElement) {
      tocElement.classList.add('all-open');
    }
    resetTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
    resetTOC.style.borderColor = 'var(--border-color--alternate-0)';
    openTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
    openTOC.style.borderColor = 'var(--border-color--alternate-100)';
  });
  resetTOC.addEventListener('click', function () {
    if (tocElement) {
      tocElement.classList.remove('all-open');
    }
    resetTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
    resetTOC.style.borderColor = 'var(--border-color--alternate-100)';
    openTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
    openTOC.style.borderColor = 'var(--border-color--alternate-0)';
  });
}

export function manageChapterTOC() {
  // Initialisation
  const resetTOC = document.querySelector('.mod-cont_toc_reset');
  const currentChapter = document.querySelector('.mod-cont_toc_chapter_item:has(.w--current)');
  const tocChapters = document.querySelectorAll('.mod-cont_toc_chapter_item');

  // Affichage selon le module actuel
  if (currentChapter) {
    currentChapter.classList.add('is-open');
  }

  // Affichage au clic
  tocChapters.forEach((tocChapter) => {
    tocChapter.addEventListener('click', function () {
      tocChapters.forEach((tocChapter) => {
        tocChapter.classList.remove('is-open');
      });

      this.classList.toggle('is-open');
    });
  });

  // Réinitialisation
  if (resetTOC) {
    resetTOC.addEventListener('click', function () {
      // Retirer la classe .w--open de tous les dropdowns
      tocChapters.forEach((tocChapter) => {
        tocChapter.classList.remove('is-open');
      });

      // Ajouter la classe .w--open sur le dropdown w--current
      if (currentChapter) {
        currentChapter.classList.add('is-open');
      }
    });
  }
}

export function manageSubChapterTOC() {
  // Initialisation
  const resetTOC = document.querySelector('.mod-cont_toc_reset');
  const currentSubChapter = document.querySelector(
    '.mod-cont_toc_subchapter_item:has(.w--current)'
  );
  const tocSubChapters = document.querySelectorAll('.mod-cont_toc_subchapter_item');

  // Affichage selon le module actuel
  if (currentSubChapter) {
    currentSubChapter.classList.add('is-open');
  }

  // Affichage au clic
  tocSubChapters.forEach((tocSubChapter) => {
    tocSubChapter.addEventListener('click', function () {
      // Retirer la classe .w--open de tous les dropdowns
      tocSubChapters.forEach((tocSubChapter) => {
        tocSubChapter.classList.remove('is-open');
      });

      // Ajouter la classe .w--open sur le dropdown cliqué
      this.classList.add('is-open');
    });
  });

  // Réinitialisation
  if (resetTOC) {
    resetTOC.addEventListener('click', function () {
      // Retirer la classe .w--open de tous les dropdowns
      tocSubChapters.forEach((tocSubChapter) => {
        tocSubChapter.classList.remove('is-open');
      });

      // Ajouter la classe .w--open sur le dropdown w--current
      if (currentSubChapter) {
        currentSubChapter.classList.add('is-open');
      }
    });
  }
}

export function showProgression() {
  // Convertir le NodeList en tableau
  const modulesTotal = Array.from(
    document.querySelectorAll('.mod-cont_toc_chapter_component .mod-cont_toc_module_item')
  );
  const modulesSeen = Array.from(
    document.querySelectorAll(
      '.mod-cont_toc_chapter_component .mod-cont_toc_module_item:has(.is-watched)'
    )
  );

  // Compter le nombre d'éléments dans le tableau
  const countTotal = modulesTotal.length;
  const countSeen = modulesSeen.length;

  // Calcul du pourcentage de vidéos vues
  const percentageSeen = (countSeen / countTotal) * 100;
  const pourcentagSeenEntier = Math.trunc(percentageSeen);

  // Modification de la largeur de l'élément .progression-status-bar
  const progressBar = document.querySelector('.module-hero_gaming_progression_status_bar');
  progressBar.style.width = pourcentagSeenEntier + '%';

  const progressInfo = document.querySelector('.module-hero_gaming_progression_status_info');
  progressInfo.textContent = pourcentagSeenEntier + '%';
}

export function surveyProgression() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (
          mutation.target.classList.contains('is-watched') ||
          mutation.oldValue.includes('is-watched')
        ) {
          showProgression();
        }
      }
    }
  });

  // Sélectionner l'élément à observer (par exemple, le conteneur des vidéos)
  const modulesContainer = document.querySelector('.mod-cont_toc_component');

  // Options de l'observateur (observer les attributs des nœuds enfants)
  const config = { attributes: true, subtree: true, attributeOldValue: true };

  // Commencer à observer le conteneur des vidéos
  if (modulesContainer) {
    observer.observe(modulesContainer, config);
  }
}

export function manageGlobalTOC_mobile() {
  // Initialisation

  const headerTOC = document.querySelector('.mod-cont_toc_header_title');

  const resetTOC = document.querySelector('.mod-cont_toc_reset');
  const openTOC = document.querySelector('.mod-cont_toc_open-all');

  const tocElement = document.querySelector('.mod-cont_toc_component');

  resetTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
  resetTOC.style.borderColor = 'var(--border-color--alternate-100)';
  openTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
  openTOC.style.borderColor = 'var(--border-color--alternate-0)';

  let clickCount = 0;
  // Affichage au clic
  headerTOC.addEventListener('click', function () {
    clickCount++;

    if (clickCount === 1) {
      tocElement.classList.add('all-open');
      resetTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
      resetTOC.style.borderColor = 'var(--border-color--alternate-0)';
      openTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
      openTOC.style.borderColor = 'var(--border-color--alternate-100)';
    } else if (clickCount === 2) {
      tocElement.classList.remove('all-open');
      resetTOC.style.backgroundColor = 'var(--background-color--alternate-30)';
      resetTOC.style.borderColor = 'var(--border-color--alternate-100)';
      openTOC.style.backgroundColor = 'var(--background-color--alternate-15)';
      openTOC.style.borderColor = 'var(--border-color--alternate-0)';
      clickCount = 0;
    }
  });
}
