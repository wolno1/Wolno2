'use strict';

(function () {
    const BEST_TAG = 'Best works';
    const FILTER_TAGS = [
        'Digital Art',
        'Traditional Art',
        'OC',
        'Inu-sual Feelings',
        'Hop-E',
        'ArtFight',
        "Other's OCs",
        'Fanart',
        'Splatoon',
        'Bulletin Board Art',
        'Commissions'
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.getElementById('portfolioGrid');
        const filters = document.getElementById('portfolioTagFilters');
        const count = document.getElementById('portfolioResultCount');
        const empty = document.getElementById('portfolioEmpty');
        const clear = document.getElementById('portfolioClearFilters');
        const lightbox = document.getElementById('portfolioLightbox');

        if (!grid || !filters || !count || !empty || !clear || !lightbox) return;

        const state = {
            items: buildItems(Array.isArray(window.portfolioItems) ? window.portfolioItems : []),
            visibleItems: [],
            mode: 'best',
            selectedTags: new Set(),
            currentIndex: -1,
            lastTrigger: null,
            keyListener: null
        };

        renderFilterOptions(filters, state, () => renderGallery(grid, count, empty, state));
        document.querySelectorAll('input[name="portfolioMode"]').forEach((input) => {
            input.addEventListener('change', () => {
                if (input.checked) state.mode = input.value;
                renderGallery(grid, count, empty, state);
            });
        });
        clear.addEventListener('click', () => {
            state.selectedTags.clear();
            filters.querySelectorAll('input').forEach((input) => { input.checked = false; });
            renderGallery(grid, count, empty, state);
        });

        setupLightbox(lightbox, state);
        renderGallery(grid, count, empty, state);
    });

    function buildItems(rawItems) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
        });

        return rawItems.map((item, sourceIndex) => {
            const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(item.date || '')
                ? Date.parse(`${item.date}T00:00:00Z`)
                : 0;
            return {
                ...item,
                sourceIndex,
                dateValue,
                displayDate: dateValue ? formatter.format(new Date(dateValue)) : 'Date to edit',
                src: encodeURI(`../assets/images/portfolio/${item.file}`),
                alt: item.alt || `Portfolio artwork from ${item.date || 'an unknown date'}`,
                description: item.description || 'Description to edit.',
                tags: Array.isArray(item.tags) ? item.tags : []
            };
        }).sort((a, b) => b.dateValue - a.dateValue || a.sourceIndex - b.sourceIndex);
    }

    function renderFilterOptions(container, state, onChange) {
        FILTER_TAGS.forEach((tag) => {
            const label = document.createElement('label');
            label.className = 'filter-option';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = tag;
            input.addEventListener('change', () => {
                if (input.checked) state.selectedTags.add(tag);
                else state.selectedTags.delete(tag);
                onChange();
            });
            const text = document.createElement('span');
            text.textContent = tag;
            label.append(input, text);
            container.appendChild(label);
        });
    }

    function renderGallery(grid, count, empty, state) {
        state.visibleItems = state.items.filter((item) => {
            const matchesMode = state.mode === 'all' || item.tags.includes(BEST_TAG);
            const matchesTags = state.selectedTags.size === 0 ||
                item.tags.some((tag) => state.selectedTags.has(tag));
            return matchesMode && matchesTags;
        });

        grid.replaceChildren();
        const years = new Map();
        state.visibleItems.forEach((item, index) => {
            const year = item.date ? item.date.slice(0, 4) : 'Undated';
            if (!years.has(year)) years.set(year, []);
            years.get(year).push({ item, index });
        });

        years.forEach((entries, year) => {
            const group = document.createElement('section');
            group.className = 'portfolio-year-group';
            group.setAttribute('aria-labelledby', `portfolio-year-${year}`);

            const heading = document.createElement('h2');
            heading.className = 'portfolio-year-heading';
            heading.id = `portfolio-year-${year}`;
            heading.textContent = year;

            const yearGrid = document.createElement('div');
            yearGrid.className = 'portfolio-year-grid';
            entries.forEach(({ item, index }) => {
                const figure = document.createElement('figure');
                figure.className = 'portfolio-item';
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'portfolio-item-button';
                button.dataset.date = item.displayDate;
                button.setAttribute('aria-label', `Open artwork from ${item.displayDate}`);
                button.addEventListener('click', () => openLightbox(state, index, button));
                const image = document.createElement('img');
                image.src = item.src;
                image.alt = item.alt;
                image.loading = 'lazy';
                image.decoding = 'async';
                button.appendChild(image);
                figure.appendChild(button);
                yearGrid.appendChild(figure);
            });

            group.append(heading, yearGrid);
            grid.appendChild(group);
        });

        const total = state.visibleItems.length;
        count.textContent = `${total} ${total === 1 ? 'artwork' : 'artworks'}`;
        empty.hidden = total !== 0;
        grid.hidden = total === 0;
    }

    function setupLightbox(lightbox, state) {
        const image = document.getElementById('lightboxImage');
        const description = document.getElementById('lightboxDescription');
        const date = document.getElementById('lightboxDate');
        const previous = lightbox.querySelector('.lightbox-prev');
        const next = lightbox.querySelector('.lightbox-next');
        const close = lightbox.querySelector('.lightbox-close');
        if (!image || !description || !date || !previous || !next || !close) return;

        const render = () => {
            const item = state.visibleItems[state.currentIndex];
            if (!item) return;
            image.src = item.src;
            image.alt = item.alt;
            description.textContent = item.description;
            date.textContent = item.displayDate;
            const disabled = state.visibleItems.length <= 1;
            previous.disabled = disabled;
            next.disabled = disabled;
        };
        const navigate = (direction) => {
            if (state.currentIndex < 0 || !state.visibleItems.length) return;
            state.currentIndex = (state.currentIndex + direction + state.visibleItems.length) % state.visibleItems.length;
            render();
        };
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('portfolio-lightbox-open');
            if (state.keyListener) document.removeEventListener('keydown', state.keyListener);
            state.keyListener = null;
            state.currentIndex = -1;
            if (state.lastTrigger) state.lastTrigger.focus();
        };

        previous.addEventListener('click', () => navigate(-1));
        next.addEventListener('click', () => navigate(1));
        close.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) closeLightbox();
        });

        state.openLightbox = (index, trigger) => {
            state.currentIndex = index;
            state.lastTrigger = trigger;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('portfolio-lightbox-open');
            render();
            close.focus();
            state.keyListener = (event) => {
                if (event.key === 'Escape') closeLightbox();
                if (event.key === 'ArrowLeft') navigate(-1);
                if (event.key === 'ArrowRight') navigate(1);
            };
            document.addEventListener('keydown', state.keyListener);
        };
    }

    function openLightbox(state, index, trigger) {
        if (typeof state.openLightbox === 'function') state.openLightbox(index, trigger);
    }
})();
