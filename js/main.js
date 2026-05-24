const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => observer.observe(item));

const forms = document.querySelectorAll("[data-contact-form]");
const faqLists = document.querySelectorAll("[data-faq-list]");

if (window.lucide) {
  window.lucide.createIcons();
}

faqLists.forEach((faqList) => {
  const items = [...faqList.querySelectorAll("details")];

  const setAnswerHeight = (item) => {
    const answer = item.querySelector(".faq-answer");
    if (!answer) return;
    answer.style.height = item.open ? `${answer.scrollHeight}px` : "0px";
  };

  items.forEach((item) => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");
    if (!summary || !answer) return;

    setAnswerHeight(item);

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (item.open) {
        answer.style.height = `${answer.scrollHeight}px`;
        item.classList.add("is-closing");

        window.requestAnimationFrame(() => {
          answer.style.height = "0px";
        });

        window.setTimeout(() => {
          item.open = false;
          item.classList.remove("is-closing");
        }, 360);
      } else {
        item.open = true;
        answer.style.height = "0px";

        window.requestAnimationFrame(() => {
          answer.style.height = `${answer.scrollHeight}px`;
        });
      }
    });
  });

  window.addEventListener("resize", () => {
    items.forEach(setAnswerHeight);
  });
});

const serviceAccordion = document.querySelector("[data-service-accordion]");

if (serviceAccordion) {
  const items = [...serviceAccordion.querySelectorAll(".service-accordion-item")];
  const activateItem = (item) => {
    items.forEach((entry) => {
      const isCurrent = entry === item;
      entry.classList.toggle("is-active", isCurrent);
      entry.querySelector(".service-trigger")?.setAttribute("aria-expanded", String(isCurrent));
    });
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".service-trigger");

    item.addEventListener("mouseenter", () => activateItem(item));
    trigger?.addEventListener("focus", () => activateItem(item));

    trigger?.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const index = items.indexOf(item);
      const nextIndex = event.key === "ArrowDown"
        ? (index + 1) % items.length
        : (index - 1 + items.length) % items.length;
      items[nextIndex].querySelector(".service-trigger")?.focus();
    });
  });
}

const pricingToggle = document.querySelector("[data-pricing-toggle]");

if (pricingToggle) {
  const buttons = [...pricingToggle.querySelectorAll("[data-period]")];
  const prices = [...document.querySelectorAll("[data-monthly][data-yearly]")];
  const labels = [...document.querySelectorAll("[data-period-label]")];
  const formatPrice = (value) => `\u20ac${Number(value).toLocaleString("en-US")}`;

  const setPeriod = (period) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.period === period;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    prices.forEach((price) => {
      price.textContent = formatPrice(price.dataset[period]);
    });

    labels.forEach((label) => {
      label.textContent = period === "yearly" ? "/year" : "/month";
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setPeriod(button.dataset.period));
  });
}

const testimonialSlider = document.querySelector("[data-testimonials]");

if (testimonialSlider) {
  const track = testimonialSlider.querySelector(".testimonial-track");
  const cards = [...testimonialSlider.querySelectorAll(".testimonial-card")];
  const dotsWrap = testimonialSlider.querySelector(".testimonial-dots");
  const prev = testimonialSlider.querySelector("[data-testimonial-prev]");
  const next = testimonialSlider.querySelector("[data-testimonial-next]");
  let index = 0;
  let timer;

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track?.appendChild(clone);
  });

  cards.forEach((_, dotIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show testimonial ${dotIndex + 1}`);
    dot.addEventListener("click", () => {
      setSlide(dotIndex);
      restartAutoPlay();
    });
    dotsWrap?.appendChild(dot);
  });

  const dots = dotsWrap ? [...dotsWrap.querySelectorAll("button")] : [];
  const allCards = track ? [...track.querySelectorAll(".testimonial-card")] : [];

  const getStep = () => {
    const first = allCards[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const updateDots = () => {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index % cards.length);
    });
  };

  const moveTrack = (animate = true) => {
    if (!track) return;
    track.style.transitionDuration = animate ? "" : "0ms";
    track.style.transform = `translateX(${-getStep() * index}px)`;
    updateDots();
  };

  const setSlide = (nextIndex) => {
    index = nextIndex < 0 ? cards.length - 1 : nextIndex;
    moveTrack(true);

    if (index >= cards.length) {
      window.setTimeout(() => {
        index = 0;
        moveTrack(false);
        window.requestAnimationFrame(() => {
          if (track) track.style.transitionDuration = "";
        });
      }, 640);
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    timer = window.setInterval(() => setSlide(index + 1), 4200);
  };

  const stopAutoPlay = () => {
    window.clearInterval(timer);
  };

  const restartAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  prev?.addEventListener("click", () => {
    setSlide(index - 1);
    restartAutoPlay();
  });

  next?.addEventListener("click", () => {
    setSlide(index + 1);
    restartAutoPlay();
  });

  testimonialSlider.addEventListener("focusin", stopAutoPlay);
  testimonialSlider.addEventListener("focusout", startAutoPlay);
  window.addEventListener("resize", () => moveTrack(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  moveTrack(false);
  startAutoPlay();
}

forms.forEach((form) => {
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (status) status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      const data = await response.json();
      if (status) {
        status.textContent = data.message || "Thank you. We will get back to you shortly.";
      }

      if (response.ok) {
        form.reset();
      }
    } catch (error) {
      if (status) {
        status.textContent = "Something went wrong. Please email support@dolmidigital.com.";
      }
    }
  });
});
