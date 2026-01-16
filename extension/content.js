(async () => {
    const { webEnabled, dateEnabled, aiEnabled } =
        await chrome.storage.local.get(['webEnabled', 'dateEnabled', 'aiEnabled']);

    const webMode = webEnabled === true;
    const before  = dateEnabled === true;
    const noAI = aiEnabled === true;

    const url = new URL(location.href);
    const newUrl = new URL(location.origin + location.pathname);
    const q = url.searchParams.get('q');

    let changed = false;

    if (!q) return;

    const cleanQ = q
        .replace(/\s+-ai\b/g, '')
        .replace(/\s+before:2023\b/g, '')
        .trim();

    let finalQ = cleanQ;
    if (url.hostname.includes('google') || url.hostname.includes('ecosia.org')) {
        finalQ += `${noAI ? ' -ai' : ''}${before ? ' before:2023' : ''}`;
        if (webMode && url.hostname.includes('google')) {
            if (url.searchParams.get('sa') !== 'X' && url.searchParams.get('udm') !== '14') {
                newUrl.searchParams.set('sa', 'X');
                newUrl.searchParams.set('udm', '14');
                changed = true;
            }
    }
    } else if (url.hostname.includes('bing')) {
        finalQ += noAI ? ' -ai' : '';

        if (before) {
            const currentQft = url.searchParams.get('qft');
            const dateParam = 'before:2023-01-01';

            if (currentQft !== dateParam) {
                newUrl.searchParams.set('q', finalQ);
                newUrl.searchParams.set('qft', dateParam);
                location.replace(newUrl.toString());
                return;
            }
        }
    } else {
        finalQ += `${noAI ? ' -ai' : ''}`;
    }

    if (finalQ === q && !changed) return;

    newUrl.searchParams.set('q', finalQ);

    location.replace(newUrl.toString());
})();
