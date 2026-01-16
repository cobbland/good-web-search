(() => {
    const START_DATE = '1983-01-01';
    const END_DATE   = '2023-01-01';

    // Check toggle state from chrome.storage
    chrome.storage.local.get(['enabled'], ({enabled}) => {
        if (enabled === false) return; // user turned it off

        const url = new URL(location.href);
        const q = url.searchParams.get('q');

        // Only act on actual searches
        if (!q) return;

        // Prevent infinite reload
        if (q.includes(START_DATE) && q.includes(END_DATE) &&
            url.searchParams.get('sa') === 'X' && url.searchParams.get('udm') === '14') return;

        // Force exact parameters
        const newUrl = new URL(location.origin + location.pathname);
        newUrl.searchParams.set('q', `${q} after:${START_DATE} before:${END_DATE}`);
        newUrl.searchParams.set('sa', 'X');
        newUrl.searchParams.set('udm', '14');

        // Redirect
        location.replace(newUrl.toString());
    });
})();
