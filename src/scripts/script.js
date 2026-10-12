const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.classList.add('hero-entrance-ready');
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.focus();
    }
  });
}

const viewData = {
  overview: {
    title: 'Programme overview',
    body: `<div class="metric-grid"><article class="metric"><span>Active participants <b>↗</b></span><strong>128</strong><small>Across 4 cohorts</small></article><article class="metric"><span>On track</span><strong>86<em>%</em></strong><div class="meter"><i style="width:86%"></i></div></article><article class="metric"><span>Sessions delivered</span><strong>24 <em>/ 32</em></strong><small class="positive">↑ 3 this month</small></article></div><div class="dash-lower"><article class="chart-card"><div class="card-heading"><div><b>Programme progress</b><small>Activity across the last 8 weeks</small></div><span class="chart-legend"><i></i> Completion</span></div><div class="chart" aria-label="Illustrative upward progress chart"><div class="chart-y"><span>100%</span><span>50%</span><span>0%</span></div><div class="chart-area"><div class="gridlines"><i></i><i></i><i></i></div><svg viewBox="0 0 420 130" preserveAspectRatio="none" role="img" aria-label="Progress trends upward"><path d="M0 112 C40 104 46 80 90 87 S145 69 180 75 S225 49 270 59 S320 35 350 39 S390 22 420 16 L420 130 L0 130Z" fill="#e9efff"/><path d="M0 112 C40 104 46 80 90 87 S145 69 180 75 S225 49 270 59 S320 35 350 39 S390 22 420 16" fill="none" stroke="#2563eb" stroke-width="3" vector-effect="non-scaling-stroke"/></svg><div class="chart-x"><span>Feb 03</span><span>Feb 17</span><span>Mar 03</span><span>Mar 17</span></div></div></div></article><article class="attention-card"><div class="attention-title"><span class="alert-icon">!</span><div><b>Needs a closer look</b><small>Follow-up signals to review</small></div><span class="count">3</span></div><div class="person-row"><span class="avatar avatar-a">JL</span><span><b>Jordan Lee</b><small>Attendance below 75%</small></span><span class="severity amber">Review</span></div><div class="person-row"><span class="avatar avatar-b">SK</span><span><b>Samira Khan</b><small>2 overdue assignments</small></span><span class="severity red">Overdue</span></div><a href="#workflow" class="review-link">View follow-up signals <span>→</span></a></article></div>`
  },
  health: {
    title: 'Participant health',
    body: `<div class="metric-grid"><article class="metric"><span>On track</span><strong>110</strong><small>86% of participants</small></article><article class="metric"><span>Review signals</span><strong>14</strong><small>Across 4 cohorts</small></article><article class="metric"><span>Follow-ups open</span><strong>8</strong><small>For team review</small></article></div><div class="health-panel"><div class="card-heading"><div><b>Signals to review</b><small>Illustrative participant context</small></div><span class="chart-legend">This cohort</span></div><div class="person-row"><span class="avatar avatar-a">JL</span><span><b>Jordan Lee</b><small>Attendance · 2 sessions missed</small></span><span class="severity amber">Review</span></div><div class="person-row"><span class="avatar avatar-b">SK</span><span><b>Samira Khan</b><small>Assignments · 2 overdue</small></span><span class="severity red">Overdue</span></div><div class="person-row"><span class="avatar avatar-c">MT</span><span><b>Morgan Tate</b><small>Engagement · trending down</small></span><span class="severity amber">Review</span></div></div>`
  },
  reporting: {
    title: 'Programme reporting',
    body: `<div class="metric-grid"><article class="metric"><span>Completion</span><strong>72<em>%</em></strong><small>Across active programmes</small></article><article class="metric"><span>Attendance</span><strong>91<em>%</em></strong><small>Recorded sessions</small></article><article class="metric"><span>Assignments</span><strong>84<em>%</em></strong><small>Submitted on time</small></article></div><div class="report-panel"><div class="card-heading"><div><b>Cohort snapshot</b><small>Operational summary · illustrative</small></div><span class="period-pill">Spring cohort</span></div><div class="report-bars"><span>Progress <i><b style="width:72%"></b></i><em>72%</em></span><span>Attendance <i><b style="width:91%"></b></i><em>91%</em></span><span>Assignments <i><b style="width:84%"></b></i><em>84%</em></span></div></div>`
  }
};

document.querySelectorAll('[data-view]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    const view = viewData[tab.dataset.view];
    document.querySelector('#dashboard-title').textContent = view.title;
    document.querySelector('#dash-content').innerHTML = `${view.body}<p class="illustrative">Illustrative interface and sample data</p>`;
  });
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll('[data-view]')];
    const index = tabs.indexOf(tab);
    const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.focus();
    next.click();
  });
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const form = document.querySelector('#interest-form');
const formStatus = document.querySelector('#form-status');
const email = document.querySelector('#email');
const organisation = document.querySelector('#organisation');
const consent = document.querySelector('#consent');
const submitButton = form.querySelector('.form-submit');
let isSubmitting = false;

function setButtonLabel(button, text) {
  const labels = button.querySelectorAll('.button-label');
  if (labels.length) {
    labels.forEach((label) => { label.textContent = text; });
  } else {
    button.textContent = text;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (isSubmitting) return;

  formStatus.className = 'form-status';
  formStatus.textContent = '';
  const emailError = document.querySelector('#email-error');
  const orgError = document.querySelector('#org-error');
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  const orgValid = organisation.value.trim().length > 0;
  const consentValid = consent.checked;
  email.setAttribute('aria-invalid', String(!emailValid));
  organisation.setAttribute('aria-invalid', String(!orgValid));
  emailError.textContent = emailValid ? '' : (email.value.trim() ? 'Enter a valid email address.' : 'Enter your work email.');
  orgError.textContent = orgValid ? '' : 'Enter your organisation name.';
  if (!emailValid || !orgValid || !consentValid) {
    (!emailValid ? email : !orgValid ? organisation : consent).focus();
    formStatus.textContent = 'Check the highlighted fields and try again.';
    return;
  }

  isSubmitting = true;
  submitButton.disabled = true;
  setButtonLabel(submitButton, 'Sending…');
  form.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      // A successful HTTP response without JSON is still a confirmed success.
    }

    const hasServerErrors = Array.isArray(result?.errors) && result.errors.length > 0;
    if (!response.ok || result?.ok === false || hasServerErrors) {
      throw new Error('Formspree submission failed.');
    }

    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thanks — your interest has been submitted. We’ll be in touch.';
    form.reset();
    email.removeAttribute('aria-invalid');
    organisation.removeAttribute('aria-invalid');
  } catch {
    formStatus.className = 'form-status';
    formStatus.textContent = 'We couldn’t submit your details just now. Your information is still here; please try again.';
  } finally {
    isSubmitting = false;
    submitButton.disabled = false;
    setButtonLabel(submitButton, 'Register interest');
    form.removeAttribute('aria-busy');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

(() => {
  const sequence = document.querySelector('#workflow [data-loop-sequence]');
  if (!sequence) return;

  const sticky = sequence.querySelector('.loop-sticky');
  const stages = [...sequence.querySelectorAll('[data-stage]')];
  const visuals = [...sequence.querySelectorAll('[data-visual]')];
  const arcs = [...sequence.querySelectorAll('[data-progress-arc]')];
  const title = sequence.querySelector('[data-loop-title]');
  const description = sequence.querySelector('[data-loop-description]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 680px)');
  const staticMode = () => reduceMotion.matches || mobileLayout.matches;
  const content = [
    {
      name: 'Run',
      description: 'Organise programmes, cohorts, people, and planned activities.'
    },
    {
      name: 'Track',
      description: 'Keep sessions, attendance, and assignments in view as work happens.'
    },
    {
      name: 'Detect',
      description: 'Notice patterns and signals that may need a closer look.'
    },
    {
      name: 'Act',
      description: 'Coordinate a considered follow-up with the right people.'
    },
    {
      name: 'Report',
      description: 'Bring operational details together into useful summaries.'
    }
  ];

  const arcLengths = arcs.map((arc) => arc.getTotalLength());
  arcs.forEach((arc, index) => {
    if (arcLengths[index] > 0) arc.setAttribute('pathLength', '1');
  });
  const transitionCount = arcs.length;

  let activeIndex = -1;
  let frameRequested = false;

  const setActiveStage = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;

    stages.forEach((stage, stageIndex) => {
      const active = stageIndex === index;
      stage.classList.toggle('is-active', active);
      if (active) stage.setAttribute('aria-current', 'step');
      else stage.removeAttribute('aria-current');
    });

    visuals.forEach((visual, visualIndex) => {
      const active = visualIndex === index;
      visual.classList.toggle('is-active', active);
      visual.setAttribute('aria-hidden', String(!active));
    });

    title.textContent = content[index].name;
    description.textContent = content[index].description;
  };

  const setCompletedStages = (position) => {
    const completedThrough = Math.min(
      stages.length - 1,
      Math.max(0, Math.floor(position))
    );
    stages.forEach((stage, index) => {
      stage.classList.toggle('is-complete', index <= completedThrough);
    });
  };

  const setArcProgress = (position) => {
    const boundedPosition = Math.min(transitionCount, Math.max(0, position));
    const completedTransitions = Math.floor(boundedPosition);
    const currentArc = Math.min(arcs.length - 1, completedTransitions);
    const currentProgress = boundedPosition - completedTransitions;

    arcs.forEach((arc, index) => {
      const fraction = index < completedTransitions
        ? 1
        : index === currentArc
          ? currentProgress
          : 0;

      if (fraction === 1) {
        arc.removeAttribute('stroke-dasharray');
        arc.removeAttribute('stroke-dashoffset');
      } else {
        arc.setAttribute('stroke-dasharray', '1 1');
        arc.setAttribute('stroke-dashoffset', String(1 - fraction));
      }
      arc.style.visibility = fraction === 0 ? 'hidden' : 'visible';
      arc.classList.toggle('is-current', index === currentArc && fraction > 0 && fraction < 1);
      arc.classList.toggle('is-complete', fraction === 1);
    });
  };

  const updateFromScroll = () => {
    frameRequested = false;
    if (staticMode()) return;

    const bounds = sequence.getBoundingClientRect();
    // Begin progress when the sequence reaches the sticky inset.
    const stickyInset = Number.parseFloat(getComputedStyle(sticky).top) || 0;
    const travel = sequence.offsetHeight - sticky.offsetHeight;
    const progress = Math.min(1, Math.max(0, (stickyInset - bounds.top) / Math.max(1, travel)));
    const position = progress * transitionCount;
    const stageIndex = Math.min(content.length - 1, Math.floor(position));

    setActiveStage(stageIndex);
    setCompletedStages(position);
    setArcProgress(position);
  };

  const requestUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateFromScroll);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('load', requestUpdate, { once: true });
  reduceMotion.addEventListener('change', requestUpdate);
  mobileLayout.addEventListener('change', requestUpdate);
  requestUpdate();
})();
