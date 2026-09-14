"use strict";

const printButton = document.getElementById("print");
const themeButton = document.getElementById("theme");
const progressBar = document.getElementById("reading-progress");
const backToTopButton = document.getElementById("back-to-top");
const chapterSearch = document.getElementById("chapter-search");
const searchStatus = document.getElementById("search-status");
const indexItems = [...document.querySelectorAll("#indice ol li")];
const imageDialog = document.getElementById("image-dialog");
const dialogImage = document.getElementById("image-dialog-content");
const dialogClose = document.getElementById("image-dialog-close");

printButton?.addEventListener("click", () => window.print());

function applyTheme(useContrast) {
  document.documentElement.toggleAttribute("data-theme", useContrast);
  if (useContrast) document.documentElement.dataset.theme = "contrast";
  themeButton?.setAttribute("aria-pressed", String(useContrast));
  themeButton?.setAttribute(
    "aria-label",
    useContrast ? "Activar tema claro" : "Activar tema de alto contraste",
  );
  if (themeButton)
    themeButton.textContent = useContrast ? "Tema claro" : "Contraste";
}

let savedTheme = false;
try {
  savedTheme = localStorage.getItem("oxigenoterapia-theme") === "contrast";
} catch {
  savedTheme = false;
}
applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
  const useContrast = themeButton.getAttribute("aria-pressed") !== "true";
  applyTheme(useContrast);
  try {
    localStorage.setItem(
      "oxigenoterapia-theme",
      useContrast ? "contrast" : "light",
    );
  } catch {
    // El ebook también funciona cuando el navegador bloquea el almacenamiento local.
  }
});

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

chapterSearch?.addEventListener("input", () => {
  const query = normalizeText(chapterSearch.value.trim());
  let visibleCount = 0;

  for (const item of indexItems) {
    const isVisible = normalizeText(item.textContent || "").includes(query);
    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  if (searchStatus) {
    searchStatus.textContent = query
      ? `${visibleCount} ${visibleCount === 1 ? "capítulo encontrado" : "capítulos encontrados"}`
      : `${indexItems.length} capítulos disponibles`;
  }
});

let scrollFrame;
function updateReadingState() {
  scrollFrame = undefined;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  if (backToTopButton) backToTopButton.hidden = window.scrollY < 700;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateReadingState);
  },
  { passive: true },
);
window.addEventListener("resize", updateReadingState);
updateReadingState();

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navigationLinks = [
  ...document.querySelectorAll('.topbar nav a[href^="#"]'),
];
if ("IntersectionObserver" in window) {
  const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      for (const link of navigationLinks) {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    },
    { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.75] },
  );
  observedSections.forEach((section) => sectionObserver.observe(section));
}

if (imageDialog && dialogImage && typeof imageDialog.showModal === "function") {
  document.querySelectorAll("figure a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const image = link.querySelector("img");
      if (!image) return;
      event.preventDefault();
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      imageDialog.showModal();
      dialogClose?.focus();
    });
  });

  dialogClose?.addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  imageDialog.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
  });
}

const inserSaveButton = document.getElementById("inserGuardar");
const inserShareButton = document.getElementById("inserCompartir");
const inserFeedback = document.getElementById("inserFeedback");

function showInserFeedback(message) {
  if (inserFeedback) inserFeedback.textContent = message;
}

inserSaveButton?.addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:INSER SALUD",
    "ORG:INSER SALUD",
    "TITLE:Equipos respiratorios — venta y alquiler",
    "TEL;TYPE=CELL:+5493512065320",
    "EMAIL:inser.salud@gmail.com",
    "URL:https://insersalud.com",
    "NOTE:CPAP · BiPAP · Oxígeno · Máscaras · Accesorios. Instagram: @insersalud",
    "END:VCARD",
  ].join("\r\n");
  const contactFile = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(contactFile);
  downloadLink.download = "INSER-SALUD.vcf";
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadLink.href), 1000);
  showInserFeedback("Contacto listo para guardar en tu teléfono.");
});

inserShareButton?.addEventListener("click", async () => {
  const shareData = {
    title: "INSER SALUD · Equipos respiratorios",
    text: "CPAP, BiPAP, oxígeno, máscaras y accesorios. Venta y alquiler.",
    url: "https://insersalud.com/tarjeta",
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showInserFeedback("Tarjeta compartida.");
    } catch (error) {
      if (error?.name !== "AbortError")
        showInserFeedback("No se pudo abrir el menú para compartir.");
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(shareData.url);
    showInserFeedback("Enlace copiado al portapapeles.");
  } catch {
    showInserFeedback("Compartí: insersalud.com/tarjeta");
  }
});
