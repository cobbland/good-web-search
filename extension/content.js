(async () => {
    const { webEnabled, dateEnabled, aiEnabled } =
        await chrome.storage.local.get(['webEnabled', 'dateEnabled', 'aiEnabled']);

    const webMode = webEnabled  === true;
    const before  = dateEnabled === true;
    const noAI    = aiEnabled   === true;

    const url = new URL(location.href);
    const q = url.searchParams.get('q');

    if (!q) return;

    const cleanQ = q
        .replace(/\s+-ai\b/g, '')
        .replace(/\s+before:2023\b/g, '')
        .trim();

    let finalQ = cleanQ +
        `${noAI ? ' -ai' : ''}${before ? ' before:2023' : ''}`


    if (finalQ === q) return;

    const newUrl = new URL(location.origin + location.pathname);

    newUrl.searchParams.set('q', finalQ);

    if (webMode) {
        newUrl.searchParams.set('sa', 'X');
        newUrl.searchParams.set('udm', '14');
    }

    location.replace(newUrl.toString());
})();
