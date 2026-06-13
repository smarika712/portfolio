/* ===== PORTFOLIO MAIN JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL STATE =====
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
      scrollTopBtn?.classList.add('visible');
    } else {
      navbar?.classList.remove('scrolled');
      scrollTopBtn?.classList.remove('visible');
    }

    // Active nav link on scroll
    highlightActiveNav();
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== ACTIVE NAV HIGHLIGHT =====
  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let current = '';

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  // ===== MOBILE NAV CLOSE ON CLICK =====
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse?.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        toggler?.click();
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => observer.observe(el));

  // ===== TYPEWRITER EFFECT =====
  const typeEl = document.querySelector('.typed-role');
  if (typeEl) {
    const roles = typeEl.dataset.roles ? JSON.parse(typeEl.dataset.roles) : ['Professional'];
    let ri = 0, ci = 0, deleting = false;

    function typeStep() {
      const word = roles[ri];
      if (!deleting) {
        typeEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(typeStep, 1800); return; }
      } else {
        typeEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeStep, 300); return; }
      }
      setTimeout(typeStep, deleting ? 60 : 90);
    }
    typeStep();
  }

  // ===== SKILL BARS =====
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct || '0';
        entry.target.style.width = pct + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.counter-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1800;
    const step = 16;
    const inc = target / (dur / step);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target);
      el.textContent = Math.round(cur) + suffix;
      if (cur >= target) clearInterval(t);
    }, step);
  }

  counters.forEach(c => counterObserver.observe(c));

  // ===== PROJECT FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      projectItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.display = match ? '' : 'none';
          if (match) {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          }
        }, 200);
      });
    });
  });

  // ===== BLOG FILTER =====
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogItems = document.querySelectorAll('.blog-item');

  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      blogItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // ===== BLOG MODAL =====
  const blogModal = document.getElementById('blogModal');
  const blogModalOverlay = document.getElementById('blogModalOverlay');

  document.querySelectorAll('[data-blog-open]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const id = trigger.dataset.blogOpen;
      const data = getBlogData(id);
      if (!data || !blogModal) return;
      populateBlogModal(data);
      blogModalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('blogModalClose')?.addEventListener('click', closeBlogModal);
  blogModalOverlay?.addEventListener('click', e => { if (e.target === blogModalOverlay) closeBlogModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBlogModal(); });

  function closeBlogModal() {
    blogModalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function populateBlogModal(data) {
    if (!blogModal) return;
    blogModal.querySelector('.blog-modal-category').textContent = data.category;
    blogModal.querySelector('.blog-modal-title').textContent = data.title;
    blogModal.querySelector('.blog-modal-date').textContent = data.date;
    blogModal.querySelector('.blog-modal-readtime').textContent = data.readTime;
    blogModal.querySelector('.blog-modal-author').textContent = data.author;
    blogModal.querySelector('.blog-modal-content-text').innerHTML = data.content;
    const img = blogModal.querySelector('.blog-modal-header-img');
    if (img) img.innerHTML = data.emoji || '📝';
  }

  function getBlogData(id) {
    const blogs = {
      '1': {
        category: 'Technology',
        title: 'The Future of Web Development: Trends to Watch in 2025',
        date: 'December 15, 2024',
        readTime: '8 min read',
        author: 'S. Thapa',
        emoji: '💻',
        content: `
          <p>Web development continues to evolve at a rapid pace. From AI-powered tools to new JavaScript frameworks, developers must stay ahead of the curve to remain competitive.</p>
          <h3>AI-Assisted Development</h3>
          <p>Artificial intelligence is transforming how we write code. Tools like GitHub Copilot and Claude are helping developers write better code faster, reducing boilerplate and catching bugs before they reach production.</p>
          <h3>Web Components & Micro-Frontends</h3>
          <p>The shift towards component-based architectures continues. Web Components are gaining traction as a framework-agnostic solution for building reusable UI elements.</p>
          <h3>Edge Computing</h3>
          <p>Running code closer to users at the network edge is becoming the new normal. Platforms like Cloudflare Workers and Vercel Edge Functions enable ultra-low latency applications.</p>
          <h3>Key Takeaways</h3>
          <ul>
            <li>Embrace AI tools to boost your productivity</li>
            <li>Learn the fundamentals of Web Components</li>
            <li>Explore edge computing platforms</li>
            <li>Focus on Core Web Vitals and performance</li>
          </ul>
          <p>The developers who thrive will be those who can adapt quickly and continuously learn. Stay curious, build things, and share your knowledge with the community.</p>
        `
      },
      '2': {
        category: 'Design',
        title: 'Designing for Accessibility: A Practical Guide',
        date: 'November 28, 2024',
        readTime: '6 min read',
        author: 'S. Thapa',
        emoji: '🎨',
        content: `
          <p>Accessibility isn't a feature — it's a fundamental requirement. Building inclusive products means more users can access your work, and it often improves usability for everyone.</p>
          <h3>Color Contrast</h3>
          <p>WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Use tools like WebAIM's contrast checker to verify your palette.</p>
          <h3>Keyboard Navigation</h3>
          <p>Every interactive element must be reachable and operable via keyboard. Test your site without a mouse — you'll quickly discover pain points that screen reader users face daily.</p>
          <h3>Semantic HTML</h3>
          <p>Using the correct HTML elements communicates meaning to assistive technologies. A button should be a <code>&lt;button&gt;</code>, not a styled <code>&lt;div&gt;</code>.</p>
          <h3>Practical Steps</h3>
          <ul>
            <li>Run automated checks with Axe or Lighthouse</li>
            <li>Add ARIA labels where HTML semantics fall short</li>
            <li>Provide text alternatives for all images</li>
            <li>Ensure focus indicators are clearly visible</li>
          </ul>
          <p>Accessibility is not a one-time checklist — it's an ongoing commitment to your users. Make it part of your design process from day one.</p>
        `
      },
      '3': {
        category: 'Career',
        title: 'How to Build a Portfolio That Gets You Hired',
        date: 'October 10, 2024',
        readTime: '5 min read',
        author: 'S. Thapa',
        emoji: '🚀',
        content: `
          <p>Your portfolio is your most powerful career asset. It's living proof of your skills, taste, and work ethic. A great portfolio does three things: shows your best work, tells a coherent story, and makes it effortless for hiring managers to say yes.</p>
          <h3>Quality Over Quantity</h3>
          <p>Three exceptional projects beat ten mediocre ones every time. Curate ruthlessly. Each project should demonstrate a specific skill or problem-solving approach.</p>
          <h3>Tell the Story Behind Each Project</h3>
          <p>Don't just show screenshots. Explain the problem, your process, the decisions you made, and what you learned. Hiring managers want to see how you think.</p>
          <h3>Make It Personal</h3>
          <p>Your personality and values should come through. Generic portfolios are forgettable. Let your authentic voice shape the copy, the design choices, the projects you choose to feature.</p>
          <h3>Checklist</h3>
          <ul>
            <li>Clear statement of who you are and what you do</li>
            <li>3–5 case studies with context and outcomes</li>
            <li>Easy contact method</li>
            <li>Mobile-responsive and fast-loading</li>
            <li>Up-to-date resume / CV download</li>
          </ul>
        `
      }
    };
    return blogs[id] || null;
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) { formSuccess.style.display = 'block'; }
    }, 1500);
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== TICKER DUPLICATE FOR INFINITE SCROLL =====
  const tickerWrap = document.querySelector('.ticker-wrap');
  if (tickerWrap) {
    tickerWrap.innerHTML += tickerWrap.innerHTML;
  }

});
