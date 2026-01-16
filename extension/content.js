(async () => {
    const { webEnabled, dateEnabled, aiEnabled } =
        await chrome.storage.local.get(['webEnabled', 'dateEnabled', 'aiEnabled']);

    const webMode = webEnabled  === true;
    const before  = dateEnabled === true;
    const noAI    = aiEnabled   === true;

    const url = new URL(location.href);
    const q = url.searchParams.get('q');

    if (!q) return;
    if (url.searchParams.get('good') === 'true') return;

    const newUrl = new URL(location.origin + location.pathname);

    newUrl.searchParams.set(
        'q',
        `${q}${noAI ? ' -ai' : ''}${before ? ' before:2023' : ''}`
    );

    if (webMode) {
        newUrl.searchParams.set('sa', 'X');
        newUrl.searchParams.set('udm', '14');
    }

    newUrl.searchParams.set('good', 'true');

    location.replace(newUrl.toString());
})();
