const hostname = [
	'*.example.com',
	'*.test.com'
];

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

hostname.forEach((host) =>
{
	chrome.tabs.query({
		status : 'complete',
		url    : `*://${host}/*`,
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
});
