/* =========================================================
   JAIN UNIVERSITY — ACADEMIC PORTAL
   SCRIPT.JS
   
   Handles:
   1. Mobile navigation menu toggle
   2. Active navigation link on scroll (IntersectionObserver)
   3. Scroll-cue button (smooth jump to programmes)
   4. Course category filtering (All / UG / PG / Research)
   5. Real-time course search input
   6. Structured Course Details Modal
   7. Academic Event Details Modal
   8. University Highlight Details Modal
   9. Scroll-reveal entrance animations
   10. Back-to-top floating button
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
     --------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile drawer when any link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Keep the academic ticker continuously filled while it loops. */
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    marqueeTrack.querySelectorAll('.marquee-item').forEach(function (item) {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    });
  }

  /* ---------------------------------------------------------
     2. ACTIVE NAVIGATION INDICATOR ON SCROLL
     --------------------------------------------------------- */
  const trackedSections = document.querySelectorAll('main section[id], .site-footer[id]');
  const navItems = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && trackedSections.length > 0) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navItems.forEach(function (a) {
            a.classList.toggle('active', a.dataset.section === activeId);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    trackedSections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  /* ---------------------------------------------------------
     3. SCROLL-CUE BUTTON (Hero -> Courses)
     --------------------------------------------------------- */
  const scrollCue = document.getElementById('scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', function () {
      const coursesSection = document.getElementById('courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---------------------------------------------------------
     4. COURSE FILTERING & REAL-TIME SEARCH
     --------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  const courseSearchInput = document.getElementById('course-search');
  const searchClearBtn = document.getElementById('course-search-clear');
  const noCoursesNotice = document.getElementById('no-courses-found');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Core combined filter function: applies active category tab + search query
  function applyCourseFilters() {
    let visibleCount = 0;
    const cleanQuery = currentSearchQuery.trim().toLowerCase();

    courseCards.forEach(function (card) {
      // 1. Category check
      const cardCategory = card.dataset.category || '';
      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);

      // 2. Search query check (title, tag, description, degree, school)
      let matchesSearch = true;
      if (cleanQuery.length > 0) {
        const cardTitle = card.querySelector('.course-name')?.textContent.toLowerCase() || '';
        const cardTag = card.querySelector('.course-tag')?.textContent.toLowerCase() || '';
        const cardDesc = card.querySelector('.course-desc')?.textContent.toLowerCase() || '';
        const cardDegree = (card.dataset.degree || '').toLowerCase();
        const cardSchool = (card.dataset.school || '').toLowerCase();

        const searchableContent = `${cardTitle} ${cardTag} ${cardDesc} ${cardDegree} ${cardSchool}`;
        matchesSearch = searchableContent.includes(cleanQuery);
      }

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hide');
        visibleCount++;
      } else {
        card.classList.add('hide');
      }
    });

    // Handle empty search results state
    if (noCoursesNotice) {
      noCoursesNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Toggle clear search button visibility
    if (searchClearBtn) {
      searchClearBtn.style.display = cleanQuery.length > 0 ? 'block' : 'none';
    }
  }

  // Category Tab Click
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentCategory = btn.dataset.filter || 'all';
      applyCourseFilters();
    });
  });

  // Real-time Search Input Listener
  if (courseSearchInput) {
    courseSearchInput.addEventListener('input', function (e) {
      currentSearchQuery = e.target.value;
      applyCourseFilters();
    });
  }

  // Clear Search Button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', function () {
      if (courseSearchInput) {
        courseSearchInput.value = '';
        courseSearchInput.focus();
      }
      currentSearchQuery = '';
      applyCourseFilters();
    });
  }

  // Reset Filter & Search Button in empty state
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', function () {
      currentCategory = 'all';
      currentSearchQuery = '';
      if (courseSearchInput) courseSearchInput.value = '';

      filterButtons.forEach(function (b) {
        const isAll = b.dataset.filter === 'all';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-selected', String(isAll));
      });

      applyCourseFilters();
    });
  }

  /* ---------------------------------------------------------
     5. MODAL HELPERS (Scroll Lock & Accessibility)
     --------------------------------------------------------- */
  let activeModalTrigger = null;

  function openModal(overlay, trigger) {
    if (!overlay) return;
    activeModalTrigger = trigger || document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    const focusTarget = overlay.querySelector('.modal-close') || overlay.querySelector('[tabindex="-1"]');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (activeModalTrigger && typeof activeModalTrigger.focus === 'function') {
      activeModalTrigger.focus();
    }
    activeModalTrigger = null;
  }

  /* ---------------------------------------------------------
     6. STRUCTURED COURSE DETAILS MODAL
     --------------------------------------------------------- */
  const courseDetailsData = {
    'cse-btech': {
      degree: 'B.Tech (Honours / Standard)',
      school: 'Faculty of Engineering & Technology (FET)',
      level: 'Undergraduate (4 Years)',
      overview: 'A rigorous four-year engineering degree grounded in systems architecture, algorithm design, software engineering, and mathematical computing. Students can pursue specialized tracks in Artificial Intelligence & Machine Learning, Cyber Security, Cloud Computing, and Data Science, supported by cutting-edge university computing laboratories and industry co-op internships.'
    },
    'bba-digital': {
      degree: 'BBA (Honours)',
      school: 'School of Management',
      level: 'Undergraduate (3 / 4 Years)',
      overview: 'An industry-aligned business degree focusing on contemporary digital commercial ecosystems, performance marketing, platform economics, fintech disruption, and omnichannel product strategy. The curriculum develops entrepreneurial acumen and data-backed managerial capabilities.'
    },
    'bcom-acca': {
      degree: 'B.Com (Honours)',
      school: 'School of Commerce',
      level: 'Undergraduate (3 / 4 Years)',
      overview: 'An internationally accredited commerce honours curriculum formally integrated with the Association of Chartered Certified Accountants (ACCA), UK qualification framework. Enables students to prepare for strategic corporate reporting, international taxation, and audit leadership roles globally.'
    },
    'ba-journalism': {
      degree: 'BA (Professional)',
      school: 'School of Humanities & Social Sciences',
      level: 'Undergraduate (3 Years)',
      overview: 'A hands-on professional degree spanning multi-platform news reporting, broadcast journalism, podcast production, digital publishing, media law, and institutional communication. Features dedicated multimedia newsroom studios.'
    },
    'bsc-data-science': {
      degree: 'B.Sc. (Honours)',
      school: 'School of Sciences',
      level: 'Undergraduate (3 / 4 Years)',
      overview: 'Combines pure mathematical foundations, stochastic probability, inferential statistics, and high-performance computing. Students undertake practical laboratory projects in predictive analytics, econometrics, and computational modeling.'
    },
    'bca-aiml': {
      degree: 'BCA (Honours)',
      school: 'School of Computer Science & IT',
      level: 'Undergraduate (3 / 4 Years)',
      overview: 'An applied computing degree designed specifically for intelligent application design. Covers neural network architectures, computer vision frameworks, natural language processing pipelines, and scalable cloud application development.'
    },
    'bdes-comm': {
      degree: 'B.Design',
      school: 'School of Design, Media & Creative Arts',
      level: 'Undergraduate (4 Years)',
      overview: 'A four-year professional design degree focused on visual branding systems, human-centered UI/UX design, motion graphics, and narrative typography. Supported by specialized design labs and annual industry graduate exhibitions.'
    },
    'bballb': {
      degree: 'BBA.LL.B. (Honours)',
      school: 'School of Law',
      level: 'Undergraduate (5 Years Integrated)',
      overview: 'A five-year dual-qualification curriculum harmonizing commercial business administration with comprehensive jurisprudence, moot court simulations, corporate governance, and legal compliance practices recognized by the Bar Council of India.'
    },
    'mtech-ai': {
      degree: 'M.Tech',
      school: 'Faculty of Engineering & Technology (FET)',
      level: 'Postgraduate (2 Years)',
      overview: 'An advanced postgraduate engineering discipline exploring autonomous AI models, deep generative pipelines, edge computing, distributed neural optimization, and real-world industrial deployments.'
    },
    'mba-analytics': {
      degree: 'MBA (Single / Dual Specialisation)',
      school: 'School of Management',
      level: 'Postgraduate (2 Years)',
      overview: 'Premier business administration master\'s programme empowering future corporate leaders with data-driven strategic planning, predictive econometric modeling, business intelligence systems, and supply chain analytics.'
    },
    'mcom-ey': {
      degree: 'M.Com (Industry Integrated)',
      school: 'School of Commerce',
      level: 'Postgraduate (2 Years)',
      overview: 'Postgraduate finance and commerce degree conducted in direct academic collaboration with Ernst & Young (EY). Focuses on advanced corporate valuation, financial risk analytics, merger advisory, and forensic accounting.'
    },
    'ma-journalism': {
      degree: 'MA',
      school: 'School of Humanities & Social Sciences',
      level: 'Postgraduate (2 Years)',
      overview: 'A postgraduate media master’s curriculum emphasizing investigative research, documentary production, media sociology, critical communication theory, and media governance.'
    },
    'msc-data-science': {
      degree: 'M.Sc.',
      school: 'School of Sciences',
      level: 'Postgraduate (2 Years)',
      overview: 'Graduate-level mathematical, statistical, and algorithmic study of big data architectures, distributed machine learning, bio-informatics modeling, and computational neural analytics.'
    },
    'mca-aiml': {
      degree: 'MCA (Specialisation)',
      school: 'School of Computer Science & IT',
      level: 'Postgraduate (2 Years)',
      overview: 'A master’s level computer applications curriculum preparing software architects to build secure, enterprise-scale intelligent software systems and machine learning pipelines.'
    },
    'llm': {
      degree: 'Master of Laws (LL.M.)',
      school: 'School of Law',
      level: 'Postgraduate (1 / 2 Years)',
      overview: 'Advanced legal scholarship offering specialized doctoral-prep research tracks in corporate and commercial law, intellectual property rights, and international dispute resolution.'
    },
    'phd-engg': {
      degree: 'Ph.D. in Engineering & Technology',
      school: 'Faculty of Engineering & Technology (FET)',
      level: 'Doctoral Research (3 - 5 Years)',
      overview: 'Original doctoral research supervised by experienced university research faculty across computing systems, aerospace mechanics, renewable energy, and nanotechnologies.'
    },
    'phd-mgmt': {
      degree: 'Ph.D. in Management & Commerce',
      school: 'School of Management & Commerce',
      level: 'Doctoral Research (3 - 5 Years)',
      overview: 'Doctoral inquiries into global marketing strategies, behavioural economics, supply chain resilience, corporate finance, and disruptive organisational design.'
    },
    'phd-sci': {
      degree: 'Ph.D. in Sciences & Humanities',
      school: 'School of Sciences & Humanities',
      level: 'Doctoral Research (3 - 5 Years)',
      overview: 'Doctoral programmes facilitating fundamental scientific and interdisciplinary inquiries spanning environmental sciences, biotechnology, psychology, and cognitive humanities.'
    }
  };

  const courseModalOverlay = document.getElementById('course-modal-overlay');
  const courseModalTitle = document.getElementById('course-modal-title');
  const courseModalTag = document.getElementById('course-modal-tag');
  const courseModalLevel = document.getElementById('course-modal-level');
  const courseModalDegree = document.getElementById('course-modal-degree');
  const courseModalSchool = document.getElementById('course-modal-school');
  const courseModalLevelVal = document.getElementById('course-modal-level-val');
  const courseModalBody = document.getElementById('course-modal-body');
  const courseModalClose = document.getElementById('course-modal-close');

  document.querySelectorAll('.course-details-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = btn.closest('.course-card');
      const courseKey = btn.dataset.course;
      const data = courseDetailsData[courseKey];

      const cardTitle = card.querySelector('.course-name')?.textContent || 'Programme Details';
      const cardTag = card.querySelector('.course-tag')?.textContent || 'Programme';
      const cardLevel = card.dataset.level || 'Academic Programme';
      const cardDegree = card.dataset.degree || 'Degree';
      const cardSchool = card.dataset.school || 'Faculty';

      if (courseModalTitle) courseModalTitle.textContent = cardTitle;
      if (courseModalTag) courseModalTag.textContent = cardTag;
      if (courseModalLevel) courseModalLevel.textContent = cardLevel;
      if (courseModalDegree) courseModalDegree.textContent = data ? data.degree : cardDegree;
      if (courseModalSchool) courseModalSchool.textContent = data ? data.school : cardSchool;
      if (courseModalLevelVal) courseModalLevelVal.textContent = data ? data.level : cardLevel;
      if (courseModalBody) {
        courseModalBody.textContent = data ? data.overview : 'Detailed syllabus, fee structure, and eligibility requirements are maintained on the official university portal.';
      }

      openModal(courseModalOverlay, btn);
    });
  });

  // Clicking on course card opens modal as well
  courseCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.course-details-btn')) return; // handled by button listener
      const btn = card.querySelector('.course-details-btn');
      if (btn) btn.click();
    });
  });

  if (courseModalClose) {
    courseModalClose.addEventListener('click', function () {
      closeModal(courseModalOverlay);
    });
  }

  if (courseModalOverlay) {
    courseModalOverlay.addEventListener('click', function (e) {
      if (e.target === courseModalOverlay) {
        closeModal(courseModalOverlay);
      }
    });
  }

  /* ---------------------------------------------------------
     7. ACADEMIC EVENT DETAILS MODAL
     --------------------------------------------------------- */
  const eventDetailsData = {
    'ia1-exam': {
      tag: 'Examinations',
      title: 'IA 1 Examination — 21 September 2026',
      body: 'First Internal Assessment (IA 1) examinations commence on 21 September 2026 across all undergraduate and postgraduate programmes. Students must verify subject timetables, classroom allocations, and reporting times via the student portal.'
    },
    'sem-exam': {
      tag: 'Examinations',
      title: 'Semester Examination — 4 December 2026',
      body: 'Semester-end examinations commence on 4 December 2026 across all university schools. Official hall tickets, detailed course schedules, and seating layouts will be published on the student portal.'
    },
    'infinity': {
      tag: 'The Annual Techno Program',
      title: 'INFINITY — 22–30 April 2027',
      body: 'An annual technology-focused programme celebrating innovation, creativity, problem-solving and student talent.'
    }
  };

  const modalOverlay = document.getElementById('modal-overlay');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function triggerEventModal(eventId, trigger) {
    const data = eventDetailsData[eventId];
    if (!data) return;
    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.textContent = data.body;
    openModal(modalOverlay, trigger);
  }

  document.querySelectorAll('.event-more').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      triggerEventModal(btn.dataset.eventId, btn);
    });
  });

  document.querySelectorAll('.event-card').forEach(function (card) {
    card.addEventListener('click', function () {
      triggerEventModal(card.dataset.event, card.querySelector('.event-more'));
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      closeModal(modalOverlay);
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal(modalOverlay);
    });
  }

  /* ---------------------------------------------------------
     8. UNIVERSITY HIGHLIGHT DETAILS MODAL
     --------------------------------------------------------- */
  const highlightDetailsData = {
    'academic-excellence': {
      category: 'Academic Excellence',
      description: 'JAIN (Deemed-to-be University) offers a broad academic ecosystem across undergraduate, postgraduate and research programmes, with an emphasis on contemporary learning and practical application.',
      points: ['Undergraduate programmes', 'Postgraduate programmes', 'Research and doctoral opportunities', 'Industry-relevant and contemporary learning', 'Interdisciplinary academic opportunities']
    },
    'research-innovation': {
      category: 'Research & Innovation',
      description: "Research is an important part of JAIN's academic mission, with multidisciplinary research centres and opportunities for students and faculty to engage in research and innovation.",
      points: ['Multidisciplinary research', 'Dedicated research centres', 'Student research opportunities', 'Faculty research', 'Innovation and entrepreneurship support']
    },
    'placements': {
      category: 'Placements',
      description: "JAIN's Student Career Advisory and Placement Support provides students with career guidance, skill development and preparation for recruitment.",
      statistics: [
        ['7,065', 'Students placed', '2025–26 Talent Pool'],
        ['98.01%', 'B.Tech placement', '2026'],
        ['₹8.23 LPA', 'Average CTC', 'B.Tech 2026'],
        ['₹60 LPA', 'Highest CTC', 'B.Tech 2026']
      ],
      pointsHeading: 'Career Support',
      points: ['Career guidance', 'Placement preparation', 'Industry interaction', 'Workshops and training', 'Interview preparation']
    },
    'career-outcomes': {
      category: 'Career Outcomes',
      description: 'Students are supported through career-oriented learning, skill development and preparation for professional opportunities.',
      points: ['Career planning', 'Skill development', 'Placement preparation', 'Industry exposure', 'Interview and recruitment preparation']
    },
    'industry-connect': {
      category: 'Industry Connect',
      description: 'JAIN works to connect academic learning with industry expectations through interaction, training and professional exposure.',
      points: ['Industry interactions', 'Guest lectures', 'Conferences and seminars', 'Workshops', 'Industry visits', 'Industry-recognised certifications', 'Internship opportunities']
    },
    'global-opportunities': {
      category: 'Global Opportunities',
      description: 'JAIN provides opportunities for international exposure through collaborations, global academic connections and a multicultural learning environment.',
      points: ['International academic collaborations', 'Global learning opportunities', 'International student community', 'Cross-cultural exposure', 'Exchange/collaborative opportunities where applicable']
    },
    'innovation-entrepreneurship': {
      category: 'Innovation & Entrepreneurship',
      description: 'JAIN encourages students to explore entrepreneurship, innovation and the development of ideas into practical ventures.',
      points: ['Entrepreneurship development', 'Innovation activities', 'Startup incubation', 'Student ideas and projects', 'Venture development opportunities']
    },
    'student-life': {
      category: 'Student Life',
      description: 'Student life at JAIN extends beyond academics through clubs, associations, sports, cultural activities and community engagement.',
      points: ['Student clubs and associations', 'Sports activities', 'Cultural events', 'Student communities', 'Community outreach', 'Campus experiences']
    }
  };

  const highlightModalOverlay = document.getElementById('highlight-modal-overlay');
  const highlightModalBox = highlightModalOverlay ? highlightModalOverlay.querySelector('.highlight-modal-box') : null;
  const highlightModalCategory = document.getElementById('highlight-modal-category');
  const highlightModalTitle = document.getElementById('highlight-modal-title');
  const highlightModalDescription = document.getElementById('highlight-modal-description');
  const highlightModalStatistics = document.getElementById('highlight-modal-statistics');
  const highlightModalPointsHeading = document.getElementById('highlight-modal-points-heading');
  const highlightModalPoints = document.getElementById('highlight-modal-points');
  const highlightModalClose = document.getElementById('highlight-modal-close');
  const highlightModalDone = document.getElementById('highlight-modal-done');

  function openHighlightModal(data, trigger) {
    if (!highlightModalOverlay || !data) return;
    highlightModalCategory.textContent = data.category;
    highlightModalTitle.textContent = data.category;
    highlightModalDescription.textContent = data.description;
    highlightModalPointsHeading.textContent = data.pointsHeading || 'What You Can Explore';
    highlightModalPoints.replaceChildren();
    data.points.forEach(function (point) {
      const item = document.createElement('li');
      item.textContent = point;
      highlightModalPoints.appendChild(item);
    });

    highlightModalStatistics.replaceChildren();
    if (data.statistics) {
      data.statistics.forEach(function (statistic) {
        const statCard = document.createElement('div');
        statCard.className = 'highlight-stat-card';
        statCard.innerHTML = '<strong>' + statistic[0] + '</strong><span>' + statistic[1] + '</span><small>' + statistic[2] + '</small>';
        highlightModalStatistics.appendChild(statCard);
      });
      highlightModalStatistics.hidden = false;
    } else {
      highlightModalStatistics.hidden = true;
    }
    openModal(highlightModalOverlay, trigger);
  }

  document.querySelectorAll('.highlight-explore').forEach(function (button) {
    button.addEventListener('click', function () {
      const card = button.closest('.highlight-card');
      openHighlightModal(highlightDetailsData[card.dataset.highlight], button);
    });
  });

  if (highlightModalClose) highlightModalClose.addEventListener('click', function () {
    closeModal(highlightModalOverlay);
  });
  if (highlightModalDone) highlightModalDone.addEventListener('click', function () {
    closeModal(highlightModalOverlay);
  });
  if (highlightModalOverlay) highlightModalOverlay.addEventListener('click', function (e) {
    if (e.target === highlightModalOverlay) closeModal(highlightModalOverlay);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modalOverlay && !modalOverlay.hidden) closeModal(modalOverlay);
      if (courseModalOverlay && !courseModalOverlay.hidden) closeModal(courseModalOverlay);
      if (highlightModalOverlay && !highlightModalOverlay.hidden) closeModal(highlightModalOverlay);
    }
    if (e.key === 'Tab' && highlightModalOverlay && !highlightModalOverlay.hidden) {
      const focusable = highlightModalBox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     8. SCROLL-REVEAL ENTRANCE ANIMATIONS
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.course-card, .highlight-card, .event-card, .campus-media, .campus-details, .section-head'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ---------------------------------------------------------
     9. BACK-TO-TOP BUTTON
     --------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 450);
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
