const hostname = '*';

chrome.runtime.onConnect.addListener(port =>
{
	port.onMessage.addListener(message =>
	{
		if (message === 'getStreamId')
		{
			chrome.desktopCapture.chooseDesktopMedia(
				['screen', 'window'],
				port.sender.tab,
				streamId =>
				{
					port.postMessage({ streamId });
				}
			);
		}
	});
});

chrome.tabs.query({
	status : 'complete',
	url    : `https://${hostname}/*`,
}, tabs =>
{
	tabs.forEach(tab =>
	{
		chrome.tabs.executeScript(tab.id, {
			file  : 'content.js',
			runAt : 'document_start',
		});
	});
});
