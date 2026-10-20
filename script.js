const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionLinks = [...document.querySelectorAll('a[href^="#"]')];
sectionLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const currentSection = () => {
  const sections = [...document.querySelectorAll('main section[id]')];
  const scrollPosition = window.scrollY + 120;

  let activeId = '#inicio';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = `#${section.id}`;
    }
  });

  navItems.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('is-active', href === activeId);
  });
};

window.addEventListener('scroll', currentSection, { passive: true });
currentSection();
