// Fonction pour formater un nombre en deux chiffres (ajoute un 0 devant si nécessaire)
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

// Fonction pour formater une date au format DD.MM.YYYY
function formatDate(date) {
  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// Fonction pour convertir une date au format DD.MM.YYYY en objet Date
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('.');
  return new Date(year, month - 1, day);
}

// Fonction pour calculer la différence en jours
function getDaysDifference(dateStr) {
  const inputDate = parseDate(dateStr);
  const today = new Date();

  // Normalisation des dates pour éviter les problèmes d'heures
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  // Calcul de la différence en millisecondes et conversion en jours
  const diffTime = inputDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// Récupération de la date depuis l'élément avec la classe .is-date
export function initializeDates() {
  const today = new Date();
  const timelineItems = document.querySelectorAll('[iw-element=timeline_item]');

  if (timelineItems) {
    timelineItems.forEach((timelineItem) => {
      const timelineTodayDate = timelineItem.querySelector('[iw-element=timeline_today]');
      const timelineEventDate = timelineItem.querySelector('[iw-element=timeline_date]');
      const timelineTitle = timelineItem.querySelector('[iw-element=timeline_text]');

      if (timelineTodayDate) {
        timelineTodayDate.textContent = formatDate(today);
        console.log(timelineTodayDate.textContent);
        if (timelineTitle) {
          timelineTitle.textContent = "Aujourd'hui";
        }
      }

      if (timelineEventDate) {
        const dateStr = timelineEventDate.textContent?.trim();
        const difference = getDaysDifference(dateStr);
        if (timelineTitle) {
          timelineTitle.textContent = `Dans ${difference} jours`;
        }
      }
    });
  }
}
