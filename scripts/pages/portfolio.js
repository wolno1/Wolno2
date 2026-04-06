'use strict';

(function() {
    const rawPortfolioItems = [
        { year: 2026, month: 2, day: 2, file: '26-02-01.png', caption: 'Taking a Picture.' },

        { year: 2025, month: 12, day: 30, file: '25-12-29.jfif', caption: 'Jezabel.' },
        { year: 2025, month: 11, day: 14, file: '25-11-13.jpeg', caption: 'Inu in the dark - Acrylic on Canvas.' },
        { year: 2025, month: 11, day: 6, file: '25-11-05.jpeg', caption: 'Alice and Chloe hugging, Birthday gift for Waffu.',captionHtml: 'Alice and Chloe hugging, Birthday gift for <a href="https://x.com/waffl3k4t" target="_blank" rel="noopener noreferrer">Waffu</a>.'},
        { year: 2025, month: 10, day: 26, file: '25-10-25.jpeg', caption: 'Chloe dressed as Honey the Cat.' },
        { year: 2025, month: 10, day: 22, file: '25-10-21.png', caption: 'Cheerleader Isabelle.' },
        { year: 2025, month: 10, day: 19, file: '25-10-18.jpeg', caption: 'JK-chan, Birthday gift for EL-K.',captionHtml: 'JK-chan, Birthday gift for <a href="https://x.com/EL_K_8187" target="_blank" rel="noopener noreferrer">EL-K</a>.'},
        { year: 2025, month: 9, day: 31, file: '25-09-30.jpeg', caption: 'Mati, Birthday gift for Hazardous Peach.',captionHtml: 'Mati, Birthday gift for <a href="https://x.com/hazardous_peach" target="_blank" rel="noopener noreferrer">Hazardous Peach</a>.'},
        { year: 2025, month: 7, day: 31, file: '25-07-30.jpeg', caption: 'Clunker and Fenna, Artfight attack for TheBlackHex.',captionHtml: 'Clunker and Fenna, Artfight attack for <a href="https://x.com/TheBlackHex" target="_blank" rel="noopener noreferrer">TheBlackHex</a>.'},
        { year: 2025, month: 7, day: 24, file: '25-07-23.jpeg', caption: 'Snow, Artfight attack for HeroKing.',captionHtml: 'Snow, Artfight attack for <a href="https://x.com/HeroKing7077" target="_blank" rel="noopener noreferrer">HeroKing</a>.'},
        { year: 2025, month: 7, day: 23, file: '25-07-22.jpeg', caption: 'Matcha, Artfight attack for DougieFluff.',captionHtml: 'Matcha, Artfight attack for <a href="https://x.com/DougieFluff" target="_blank" rel="noopener noreferrer">DougieFluff</a>.'},
        { year: 2025, month: 7, day: 21, file: '25-07-20.png', caption: 'Mystik, Artfight attack for Acinaces.',captionHtml: 'Mystik, Artfight attack for <a href="https://x.com/Tartifondue" target="_blank" rel="noopener noreferrer">Acinaces</a>.'},
        { year: 2025, month: 6, day: 29, file: '25-06-28.jpeg', caption: 'JK-chan, gift for EL-K.',captionHtml: 'JK-chan, Birthday for <a href="https://x.com/EL_K_8187" target="_blank" rel="noopener noreferrer">EL-K</a>.'},
        { year: 2025, month: 6, day: 25, file: '25-06-24.png', caption: 'Inu, For the inside cover of Inu-sual Feelings Chapter 2' },
        { year: 2025, month: 6, day: 25, file: '25-06-24 2.png', caption: 'Inu, For a panel of Inu-sual Feelings Chapter 2' },
        { year: 2025, month: 5, day: 5, file: '25-05-04.jpeg', caption: 'Laika, in the style of Pinky and Pepper Forever' },
        { year: 2025, month: 4, day: 29, file: '25-04-28.jpeg', caption: 'Chiyo-chan, gift for TheBlackHex.',captionHtml: 'Chiyo-chan, gift for <a href="https://x.com/TheBlackHex" target="_blank" rel="noopener noreferrer">TheBlackHex</a>.'},
        { year: 2025, month: 4, day: 7, file: '25-04-06.PNG', caption: 'Snow, gift for HeroKing.',captionHtml: 'Snow, gift for <a href="https://x.com/HeroKing7077" target="_blank" rel="noopener noreferrer">HeroKing</a>.'},
        { year: 2025, month: 2, day: 19, file: '25-02-18.PNG', caption: 'Birthday gift for Kookix.',captionHtml: 'Birthday gift for <a href="https://x.com/_Kookix_" target="_blank" rel="noopener noreferrer">Kookix</a>.'},

        { year: 2024, month: 11, day: 4, file: '24-11-03.png', caption: 'Alice, Birthday gift for Waffu.',captionHtml: 'Alice, Birthday gift for <a href="https://x.com/waffl3k4t" target="_blank" rel="noopener noreferrer">Waffu</a>.'},
        { year: 2024, month: 10, day: 21, file: '24-10-20.png', caption: 'Chloe, Twirling' },
        { year: 2024, month: 8, day: 26, file: '24-08-25.png', caption: 'Inu, sitting' },
        { year: 2024, month: 8, day: 19, file: '24-08-18.png', caption: 'Kae, Art trade with Etcha Sketchy.',captionHtml: 'Kae, Art trade with <a href="https://x.com/EtchaSketchy" target="_blank" rel="noopener noreferrer">Etcha Sketchy</a>.'},
        { year: 2024, month: 8, day: 12, file: '24-08-11.png', caption: 'Laika' },
        { year: 2024, month: 6, day: 17, file: '24-06-16.png', caption: 'Abigail, Dress up' },
        { year: 2024, month: 5, day: 28, file: '24-05-27.png', caption: 'Abigail, partial reference sheet' },
        { year: 2024, month: 3, day: 20, file: '24-03-19.png', caption: 'Inu, sitting' },
        { year: 2024, month: 3, day: 8, file: '24-03-07.jpeg', caption: 'Roxxie, Birthday gift for Cloudi.',captionHtml: 'Roxxy, Birthday gift for <a href="https://x.com/CloudiDoodles" target="_blank" rel="noopener noreferrer">Cloudi</a>.'},
        { year: 2024, month: 2, day: 14, file: '24-02-13.jpeg', caption: 'Wolno and Laika, Stargazing' },
        { year: 2024, month: 1, day: 15, file: '24-01-14.jpeg', caption: 'Birthday gift for Acinaces.',captionHtml: 'Birthday gift for <a href="https://x.com/Tartifondue" target="_blank" rel="noopener noreferrer">Acinaces</a>.'},

        { year: 2023, month: 12, day: 30, file: '23-12-29.png', caption: 'Gift for Marin Cat.',captionHtml: 'Gift for <a href="https://x.com/MarinCatArt" target="_blank" rel="noopener noreferrer">Marin Cat</a>.'},
        { year: 2023, month: 12, day: 29, file: '23-12-28.jpeg', caption: 'Inu, New Year\'s Eve' },
        { year: 2023, month: 12, day: 24, file: '23-12-23.jpeg', caption: 'Chloe (And Laika), Christmas' },
        { year: 2023, month: 12, day: 21, file: '23-12-20.jpeg', caption: 'Phoebe, gift for TheBlackHex.',captionHtml: 'Phoebe, gift for <a href="https://x.com/TheBlackHex" target="_blank" rel="noopener noreferrer">TheBlackHex</a>.'},
        { year: 2023, month: 12, day: 17, file: '23-12-16.jpeg', caption: 'Yui, art trade with Yona.',captionHtml: 'Yui, art trade with <a href="https://bsky.app/profile/templetandrum.bsky.social" target="_blank" rel="noopener noreferrer">Yona</a>.'},
        { year: 2023, month: 12, day: 14, file: '23-12-13.jpeg', caption: 'Zhen' },
        { year: 2023, month: 12, day: 7, file: '23-12-06.jpeg', caption: 'Roxanne, prom dress' },
        { year: 2023, month: 12, day: 5, file: '23-12-04.jpeg', caption: 'Katherine, commission for Joey.',captionHtml: 'Katherine, commission for <a href="https://x.com/JoeiRabito" target="_blank" rel="noopener noreferrer">Joey</a>.'},
        { year: 2023, month: 11, day: 21, file: '23-11-20.jpeg', caption: 'Inu, Retrowave' },
        { year: 2023, month: 10, day: 3, file: '23-10-02.jpeg', caption: 'Cutesona, Birthday art for Gonenannurs.',captionHtml: 'Cutesona, Birthday art for <a href="https://x.com/Gonenannurs" target="_blank" rel="noopener noreferrer">Gonenannurs</a>.'},
        { year: 2023, month: 7, day: 5, file: '23-07-04.jpeg', caption: 'Barbie, Artfight Attack for Anonwithabandana.',captionHtml: 'Barbie, Artfight Attack for <a href="https://toyhou.se/Anonwithabandana" target="_blank" rel="noopener noreferrer">Anonwithabandana</a>.'},
        { year: 2023, month: 6, day: 23, file: '23-06-22.jpeg', caption: 'Inu, Sleepover' },
        { year: 2023, month: 5, day: 20, file: '23-05-19.jpeg', caption: 'Laika, the way I see the world' },
        { year: 2023, month: 3, day: 8, file: '23-03-07.jpeg', caption: 'Inu, Sailor Scout' },

        { year: 2022, month: 12, day: 12, file: '22-12-11.jpeg', caption: 'Inu, Wind' },
        { year: 2022, month: 11, day: 21, file: '22-11-20.jpeg', caption: 'Wolno, The Fool' },
        { year: 2022, month: 9, day: 2, file: '22-09-01.jpeg', caption: 'Chloe, Pureness' },
        { year: 2022, month: 8, day: 4, file: '22-08-03.jpeg', caption: 'Chloe, Beach' },
        { year: 2022, month: 6, day: 21, file: '22-06-20.jpeg', caption: 'Chloe, first art' },

        { year: 2021, month: 10, day: 26, file: '21-10-25.jpeg', caption: 'Ralsei' },
        { year: 2021, month: 9, day: 19, file: '21-09-18.jpeg', caption: 'Ralsei' },
        { year: 2021, month: 9, day: 11, file: '21-09-10.jpeg', caption: 'DIBUJAME, fanart for Moondara.',captionHtml: 'DIBUJAME, fanart for <a href="https://www.instagram.com/moondaraglam" target="_blank" rel="noopener noreferrer">Moondara</a>.'},
        { year: 2021, month: 9, day: 8, file: '21-09-07.jpeg', caption: 'Martha Speaks' },
        { year: 2021, month: 7, day: 18, file: '21-07-17.jpeg', caption: 'Goth Sable' },
        { year: 2021, month: 7, day: 16, file: '21-07-15.jpeg', caption: 'Gothabelle' },
        { year: 2021, month: 7, day: 12, file: '21-07-11.jpeg', caption: 'Inu sits' },
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const groupsContainer = document.getElementById('portfolioGroups');
    const lightbox = document.getElementById('portfolioLightbox');
    const yearList = document.getElementById('portfolioYearList');

        if (!groupsContainer || !lightbox) {
            return;
        }

        const items = buildItems(rawPortfolioItems);
        const state = {
            items,
            currentIndex: -1,
            lastTrigger: null,
            keyListener: null,
            render: null,
            close: null,
            showPrev: null,
            showNext: null
        };

        if (!items.length) {
            groupsContainer.innerHTML = '<p class="portfolio-empty">New artwork coming soon.</p>';
            return;
        }

        renderGroups(groupsContainer, state);
        setupLightbox(lightbox, state);
        setupYearPanel(state, {
            yearList,
            groupsContainer
        });
    });

    function buildItems(rawItems) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const items = rawItems.map((item) => {
            const date = new Date(Date.UTC(item.year, item.month - 1, item.day));
            const displayDate = formatter.format(date);
            const path = `../assets/images/portfolio/${item.year}/${item.file}`;

            return {
                year: item.year,
                dateValue: date.getTime(),
                displayDate,
                src: encodeURI(path),
                alt: item.alt || `Portfolio artwork from ${displayDate}`,
                caption: item.caption || 'Add description here.',
                captionHtml: item.captionHtml || null,
                file: item.file
            };
        });

        items.sort((a, b) => b.dateValue - a.dateValue);
        items.forEach((item, index) => {
            item.index = index;
        });

        return items;
    }

    function renderGroups(container, state) {
        container.innerHTML = '';
        const years = [...new Set(state.items.map((item) => item.year))].sort((a, b) => b - a);

        years.forEach((year) => {
            const group = document.createElement('article');
            group.className = 'portfolio-year-group';
            group.id = `portfolio-year-${year}`;

            const heading = document.createElement('h2');
            heading.className = 'portfolio-year-heading';
            heading.textContent = String(year);
            group.appendChild(heading);

            const grid = document.createElement('div');
            grid.className = 'portfolio-grid';

            state.items.filter((item) => item.year === year).forEach((item) => {
                const figure = document.createElement('figure');
                figure.className = 'portfolio-item';

                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'portfolio-item-button';
                button.dataset.index = String(item.index);
                button.dataset.date = item.displayDate;
                button.setAttribute('aria-label', `Open artwork from ${item.displayDate}`);
                button.addEventListener('click', (event) => {
                    openLightbox(state, Number(button.dataset.index), event.currentTarget);
                });

                const image = document.createElement('img');
                image.src = item.src;
                image.alt = item.alt;
                image.loading = 'lazy';
                image.decoding = 'async';

                button.appendChild(image);
                figure.appendChild(button);
                grid.appendChild(figure);
            });

            group.appendChild(grid);
            container.appendChild(group);
        });
    }

    function setupYearPanel(state, widgets) {
        const years = [...new Set(state.items.map((item) => item.year))].sort((a, b) => b - a);

        if (widgets.yearList) {
            populateYearList(widgets.yearList, years);
        }
        }

        function populateYearList(listElement, years) {
        listElement.innerHTML = '';

        years.forEach((year) => {
            const item = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
                button.textContent = year;
                button.dataset.year = String(year);
            button.addEventListener('click', () => {
                    setActiveYearButton(listElement, String(year));
                scrollToYear(year);
            });
            item.appendChild(button);
            listElement.appendChild(item);
        });

            const firstYear = years[0];
            if (firstYear !== undefined) {
                setActiveYearButton(listElement, String(firstYear));
            }
    }

    function scrollToYear(year) {
        const target = document.getElementById(`portfolio-year-${year}`);
        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightYearGroup(target);

        const listElement = document.getElementById('portfolioYearList');
        if (listElement) {
            setActiveYearButton(listElement, String(year));
        }
    }

    function setActiveYearButton(listElement, yearValue) {
        const buttons = listElement.querySelectorAll('button');
        buttons.forEach((button) => {
            const isActive = button.dataset.year === yearValue;
            button.classList.toggle('is-active', isActive);
        });
    }

    function highlightYearGroup(groupElement) {
        groupElement.classList.add('is-highlighted');
        window.clearTimeout(groupElement._highlightTimeout);
        groupElement._highlightTimeout = window.setTimeout(() => {
            groupElement.classList.remove('is-highlighted');
        }, 1500);
    }

    function setupLightbox(lightbox, state) {
        const image = document.getElementById('lightboxImage');
        const description = document.getElementById('lightboxDescription');
        const dateLabel = document.getElementById('lightboxDate');
        const prevButton = lightbox.querySelector('.lightbox-prev');
        const nextButton = lightbox.querySelector('.lightbox-next');
        const closeButton = lightbox.querySelector('.lightbox-close');

        if (!image || !description || !dateLabel || !prevButton || !nextButton || !closeButton) {
            return;
        }

        state.render = () => renderLightbox(state, image, description, dateLabel, prevButton, nextButton);
        state.close = () => closeLightbox(lightbox, state);
        state.showPrev = () => navigateLightbox(state, -1);
        state.showNext = () => navigateLightbox(state, 1);

        prevButton.addEventListener('click', state.showPrev);
        nextButton.addEventListener('click', state.showNext);
        closeButton.addEventListener('click', state.close);

        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                state.close();
            }
        });
    }

    function openLightbox(state, index, trigger) {
        const lightbox = document.getElementById('portfolioLightbox');
        if (!lightbox || typeof state.render !== 'function') {
            return;
        }

        state.currentIndex = index;
        state.lastTrigger = trigger;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('portfolio-lightbox-open');

        state.render();

        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.focus();
        }

        state.keyListener = (event) => {
            if (event.key === 'Escape') {
                state.close();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                state.showPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                state.showNext();
            }
        };

        document.addEventListener('keydown', state.keyListener);
    }

    function closeLightbox(lightbox, state) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('portfolio-lightbox-open');

        if (state.keyListener) {
            document.removeEventListener('keydown', state.keyListener);
            state.keyListener = null;
        }

        state.currentIndex = -1;

        if (state.lastTrigger && typeof state.lastTrigger.focus === 'function') {
            state.lastTrigger.focus();
        }
    }

    function renderLightbox(state, image, description, dateLabel, prevButton, nextButton) {
        const item = state.items[state.currentIndex];
        if (!item) {
            return;
        }

        image.src = item.src;
        image.alt = item.alt;
        if (item.captionHtml) {
            description.innerHTML = item.captionHtml;
        } else {
            description.textContent = item.caption;
        }
        dateLabel.textContent = item.displayDate;

        if (state.items.length <= 1) {
            prevButton.disabled = true;
            nextButton.disabled = true;
        } else {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    }

    function navigateLightbox(state, direction) {
        if (state.currentIndex === -1 || !state.items.length) {
            return;
        }

        const total = state.items.length;
        let nextIndex = (state.currentIndex + direction) % total;
        if (nextIndex < 0) {
            nextIndex = total - 1;
        }

        state.currentIndex = nextIndex;
        if (typeof state.render === 'function') {
            state.render();
        }
    }
})();
