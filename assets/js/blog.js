document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".blog-filter-btn");
    const blogCards = document.querySelectorAll(".blog-card");

    if (!filterButtons.length || !blogCards.length) {
        return;
    }

    /* ==========================================
       GET FILTER FROM URL
    ========================================== */
    const urlParams = new URLSearchParams(window.location.search);
    const savedFilter = urlParams.get("filter");

    /* ==========================================
       VALID FILTERS
    ========================================== */
    const validFilters = ["all", "bangla", "english"];
    const initialFilter = validFilters.includes(savedFilter) ? savedFilter : "all";

    document.documentElement.dataset.blogFilter = initialFilter;

    /* ==========================================
       APPLY FILTER
    ========================================== */
    function applyFilter(selectedLanguage) {
        document.documentElement.dataset.blogFilter = selectedLanguage;

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.filter === selectedLanguage;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        blogCards.forEach(function (card) {
            const cardLanguage = card.dataset.language;
            const shouldShow = selectedLanguage === "all" || cardLanguage === selectedLanguage;

            card.hidden = !shouldShow;
        });
    }

    /* ==========================================
       SAVE FILTER TO URL
    ========================================== */
    function updateURL(selectedLanguage) {
        const url = new URL(window.location.href);

        if (selectedLanguage === "all") {
            url.searchParams.delete("filter");
        } else {
            url.searchParams.set("filter", selectedLanguage);
        }

        window.history.replaceState({}, "", url);
    }

    /* ==========================================
       BUTTON CLICK
    ========================================== */
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedLanguage = button.dataset.filter;

            applyFilter(selectedLanguage);
            updateURL(selectedLanguage);
        });
    });

    /* ==========================================
       INITIAL FILTER
    ========================================== */
    applyFilter(initialFilter);
});
