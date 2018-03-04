const port = chrome.runtime.connect();

window.addEventListener('message', ev =>
{
	if (ev.source !== window)
	{
		return;
	}

	if (ev.data.type !== 'getStreamId')
	{
		return;
	}

	port.postMessage('getStreamId');
}, false);

port.onMessage.addListener(({streamId}, sender, sendResponse) =>
{
	window.postMessage({type: 'gotStreamId', streamId}, '*');
});

const elt = document.createElement('script');

elt.innerHTML = 'window.__multipartyMeetingScreenShareExtensionAvailable__ = true;';

document.head.appendChild(elt);

window.postMessage({type: 'ScreenShareInjected'}, '*');
