export function manageModuleTOC() {
  // trouver tous les Chapitres
  const tocChapters = document.querySelectorAll('.mod-cont_toc_chapter_component');

  // trouver le Chapitre actuel
  const currentChapter = document.querySelector(
    '.mod-cont_toc_chapter_component:has(.mod-cont_toc_chapter_modules_link.w--current)'
  );
  if (currentChapter) {
    currentChapter.classList.add('is-active');
  }
  // ajouter une class w--open sur ce DD

  tocChapters.forEach((tocChapter) => {
    tocChapter.addEventListener('click', function () {
      // Retirer la classe .w--open de tous les dropdowns
      tocChapters.forEach((tocChapter) => {
        tocChapter.classList.remove('is-active');
      });

      // Ajouter la classe .w--open sur le dropdown cliqué
      this.classList.add('is-active');
    });
  });
}
