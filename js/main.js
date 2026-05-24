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

const cookieStorageKey = "dolmi_cookie_preferences";

const getCookiePreferences = () => {
  try {
    return JSON.parse(localStorage.getItem(cookieStorageKey));
  } catch (error) {
    return null;
  }
};

const setCookiePreferences = (preferences) => {
  localStorage.setItem(cookieStorageKey, JSON.stringify({
    ...preferences,
    updatedAt: new Date().toISOString()
  }));
};

const initCookieBanner = () => {
  const existingPreferences = getCookiePreferences();
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Cookie preferences");
  banner.hidden = Boolean(existingPreferences);
  banner.innerHTML = `
    <h2>Cookie preferences</h2>
    <p>We use essential cookies to keep the website working. With your consent, we may also use analytics and marketing cookies to improve the site and measure campaigns. Read our <a href="cookie.html">Cookie Policy</a>.</p>
    <div class="cookie-options">
      <label class="cookie-option">
        <span><strong>Essential</strong><span>Required for forms, security and basic website operation.</span></span>
        <input type="checkbox" checked disabled>
      </label>
      <label class="cookie-option">
        <span><strong>Analytics</strong><span>Helps us understand aggregate website usage.</span></span>
        <input type="checkbox" name="analytics">
      </label>
      <label class="cookie-option">
        <span><strong>Marketing</strong><span>Helps measure advertising and remarketing where enabled.</span></span>
        <input type="checkbox" name="marketing">
      </label>
    </div>
    <div class="cookie-actions">
      <button type="button" data-cookie-reject>Reject optional</button>
      <button type="button" data-cookie-customize>Customize</button>
      <button type="button" data-cookie-save>Save choices</button>
      <button type="button" data-cookie-accept>Accept all</button>
    </div>
  `;

  document.body.appendChild(banner);

  const analytics = banner.querySelector('input[name="analytics"]');
  const marketing = banner.querySelector('input[name="marketing"]');

  const closeBanner = (preferences) => {
    setCookiePreferences(preferences);
    banner.hidden = true;
  };

  banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    closeBanner({ essential: true, analytics: true, marketing: true });
  });

  banner.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
    closeBanner({ essential: true, analytics: false, marketing: false });
  });

  banner.querySelector("[data-cookie-customize]")?.addEventListener("click", () => {
    banner.classList.add("is-customizing");
  });

  banner.querySelector("[data-cookie-save]")?.addEventListener("click", () => {
    closeBanner({
      essential: true,
      analytics: Boolean(analytics?.checked),
      marketing: Boolean(marketing?.checked)
    });
  });

  const footerLegalNav = document.querySelector(".footer-bottom nav");
  if (footerLegalNav && !footerLegalNav.querySelector("[data-cookie-settings]")) {
    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "cookie-settings-button";
    settingsButton.dataset.cookieSettings = "true";
    settingsButton.textContent = "Cookie settings";
    settingsButton.addEventListener("click", () => {
      const preferences = getCookiePreferences();
      analytics.checked = Boolean(preferences?.analytics);
      marketing.checked = Boolean(preferences?.marketing);
      banner.hidden = false;
      banner.classList.add("is-customizing");
    });
    footerLegalNav.appendChild(settingsButton);
  }
};

initCookieBanner();

const siteSearch = document.querySelector(".header-search");

if (siteSearch) {
  const searchIndex = [
    {
      title: "Home",
      category: "Page",
      url: "index.html",
      excerpt: "Full-cycle digital studio for websites, funnels, campaigns and measurable growth.",
      keywords: "home main dolmi digital studio agency growth websites funnels campaigns"
    },
    {
      title: "About Dolmi",
      category: "Page",
      url: "about.html",
      excerpt: "How Dolmi works across strategy, design, development, launch and support.",
      keywords: "about company studio team strategy design development support"
    },
    {
      title: "Services",
      category: "Page",
      url: "services.html",
      excerpt: "Six compact services covering brand, websites, marketing, launch care, landing pages and SEO.",
      keywords: "services list offer brand web marketing support landing seo"
    },
    {
      title: "Process",
      category: "Page",
      url: "service-detail.html",
      excerpt: "The practical project flow from discovery and design to development, launch and iteration.",
      keywords: "process workflow discovery design build launch project"
    },
    {
      title: "Contact",
      category: "Page",
      url: "contact.html",
      excerpt: "Send a project enquiry to Dolmi through the contact form.",
      keywords: "contact form email support enquiry project bratislava"
    },
    {
      title: "Brand Systems",
      category: "Service",
      url: "brand-systems.html",
      excerpt: "Identity direction, messaging rules and reusable visual systems for digital touchpoints.",
      keywords: "brand branding identity logo messaging visual system style"
    },
    {
      title: "Web Platforms",
      category: "Service",
      url: "web-platforms.html",
      excerpt: "Responsive website systems with UX structure, frontend, backend, forms and analytics.",
      keywords: "website web platform frontend backend ux ui development forms analytics"
    },
    {
      title: "Performance Marketing",
      category: "Service",
      url: "performance-marketing.html",
      excerpt: "Paid traffic, landing page alignment, tracking setup and campaign reporting.",
      keywords: "performance marketing ads ppc meta google tracking analytics campaigns"
    },
    {
      title: "Launch Support",
      category: "Service",
      url: "launch-support.html",
      excerpt: "Website care, QA, updates, maintenance and steady improvement after launch.",
      keywords: "launch support maintenance updates qa care website support"
    },
    {
      title: "Landing Pages",
      category: "Service",
      url: "landing-pages.html",
      excerpt: "Focused campaign pages with clear message, form flow and conversion-ready structure.",
      keywords: "landing page campaign conversion form lead capture offer"
    },
    {
      title: "SEO Systems",
      category: "Service",
      url: "seo-systems.html",
      excerpt: "Technical SEO foundations, page structure, metadata and search visibility planning.",
      keywords: "seo search google metadata content structure organic visibility"
    },
    {
      title: "Privacy Policy",
      category: "Legal",
      url: "privacy.html",
      excerpt: "How the website handles privacy and personal information.",
      keywords: "privacy legal data policy"
    },
    {
      title: "Terms",
      category: "Legal",
      url: "terms.html",
      excerpt: "Website terms and general usage conditions.",
      keywords: "terms legal conditions"
    },
    {
      title: "Cookie Policy",
      category: "Legal",
      url: "cookie.html",
      excerpt: "Cookie information for the Dolmi website.",
      keywords: "cookies cookie legal tracking"
    }
  ];

  siteSearch.innerHTML = `
    <form class="site-search-form" role="search" autocomplete="off">
      <span class="search-icon" aria-hidden="true"></span>
      <label class="sr-only" for="site-search-input">Search the site</label>
      <input id="site-search-input" type="search" placeholder="Search" aria-label="Search the site" aria-expanded="false">
    </form>
    <div class="site-search-results" role="listbox" aria-label="Search results"></div>
  `;

  const searchForm = siteSearch.querySelector(".site-search-form");
  const searchInput = siteSearch.querySelector("input");
  const resultsPanel = siteSearch.querySelector(".site-search-results");

  const normalize = (value) => value.toLowerCase().trim();

  const getMatches = (query) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return searchIndex.slice(0, 6);

    return searchIndex
      .map((item) => {
        const haystack = normalize(`${item.title} ${item.category} ${item.excerpt} ${item.keywords}`);
        const title = normalize(item.title);
        const score = terms.reduce((total, term) => {
          if (title.includes(term)) return total + 4;
          if (haystack.includes(term)) return total + 1;
          return total;
        }, 0);
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);
  };

  const closeSearch = () => {
    siteSearch.classList.remove("is-open");
    searchInput?.setAttribute("aria-expanded", "false");
  };

  const renderResults = (query = "") => {
    if (!resultsPanel) return;
    const matches = getMatches(query);
    const isEmptyQuery = normalize(query).length === 0;

    siteSearch.classList.add("is-open");
    searchInput?.setAttribute("aria-expanded", "true");

    if (!matches.length) {
      resultsPanel.innerHTML = '<p class="site-search-empty">No results found. Try services, SEO, website, contact or marketing.</p>';
      return;
    }

    resultsPanel.innerHTML = matches
      .map((item) => `
        <a class="site-search-result" role="option" href="${item.url}">
          <span>${item.category}</span>
          <strong>${item.title}</strong>
          <p>${isEmptyQuery ? item.excerpt : item.excerpt}</p>
        </a>
      `)
      .join("");
  };

  siteSearch.addEventListener("click", (event) => {
    if (event.target.closest(".site-search-result")) return;
    if (document.activeElement !== searchInput) {
      siteSearch.classList.add("is-open");
      window.requestAnimationFrame(() => searchInput?.focus());
    }
  });

  searchInput?.addEventListener("focus", () => renderResults(searchInput.value));
  searchInput?.addEventListener("input", () => renderResults(searchInput.value));
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      searchInput.blur();
    }
  });

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const [firstMatch] = getMatches(searchInput?.value || "");
    if (firstMatch) {
      window.location.href = firstMatch.url;
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteSearch.contains(event.target)) {
      closeSearch();
    }
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
