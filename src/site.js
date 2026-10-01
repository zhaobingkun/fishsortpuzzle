(function () {
  const levels = Array.isArray(window.FISH_LEVELS) ? window.FISH_LEVELS : [];

  function findLevel(value) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 1) return null;
    return levels.find((entry) => entry.level === number) || null;
  }

  function bindSearch(form) {
    const input = form.querySelector('[data-level-input]');
    const message = form.parentElement.querySelector('[data-search-message]');
    if (!input) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const entry = findLevel(input.value);
      if (entry) {
        window.location.href = `/level/${entry.level}/`;
        return;
      }
      if (message) {
        const requested = input.value ? `Level ${input.value}` : 'That level';
        const requestedNumber = Number(input.value);
        const nearby = levels
          .slice()
          .sort((left, right) => Math.abs(left.level - requestedNumber) - Math.abs(right.level - requestedNumber))
          .slice(0, 2)
          .map((entry) => `Level ${entry.level}`)
          .join(' or ');
        message.textContent = `${requested} does not have a verified video page yet.${nearby ? ` Try ${nearby}.` : ''}`;
      }
    });
  }

  document.querySelectorAll('[data-level-search]').forEach(bindSearch);

  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      const isOpen = mobileMenu.dataset.open === 'true';
      mobileMenu.dataset.open = String(!isOpen);
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.textContent = isOpen ? 'Menu' : 'Close';
    });
  }

  document.querySelectorAll('[data-video-id]').forEach(function (shell) {
    const button = shell.querySelector('button');
    if (!button) return;
    button.addEventListener('click', function () {
      const videoId = shell.dataset.videoId;
      const title = shell.dataset.videoTitle || 'Fish Sort Puzzle walkthrough';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      shell.replaceChildren(iframe);
    });
  });

  const gameStage = document.querySelector('[data-game-stage]');
  const fullscreenButton = document.querySelector('[data-game-fullscreen]');
  if (gameStage && fullscreenButton) {
    fullscreenButton.addEventListener('click', async function () {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await gameStage.requestFullscreen();
        }
      } catch (_error) {
        fullscreenButton.textContent = 'Fullscreen unavailable';
        fullscreenButton.disabled = true;
      }
    });

    document.addEventListener('fullscreenchange', function () {
      fullscreenButton.textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Fullscreen';
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
