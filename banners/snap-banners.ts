import fs from 'fs/promises';
import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { createServer } from 'vite';

const screenshotNode = async (
	client: CDP.Client,
	nodeId: number,
) => {
	const { model } = await client.DOM.getBoxModel({ nodeId });
	const [x, y] = model.border;
	const screenshot = await client.Page.captureScreenshot({
		format: 'webp',
		captureBeyondViewport: true,
		clip: {
			x,
			y,
			width: model.width,
			height: model.height,
			scale: 2,
		},
	});

	return Buffer.from(screenshot.data, 'base64');
};

(async () => {
	const root = new URL('.', import.meta.url).pathname;
	const server = await createServer({
		root,
		server: {
			port: 1337,
		},
	});
	await server.listen();

	const chrome = await launch({
		chromeFlags: [
			'--headless',
			'--disable-gpu',
		],
	});

	const browserClient = await CDP({
		port: chrome.port,
	});

	const { targetId } = await browserClient.Target.createTarget({
		url: server.resolvedUrls!.local[0],
	});

	const tabClient = await CDP({
		port: chrome.port,
		target: targetId,
	});

	await tabClient.Page.enable();
	await tabClient.Page.loadEventFired();

	// Set transparent bg for screenshot
	tabClient.Emulation.setDefaultBackgroundColorOverride({
		color: {
			r: 0,
			g: 0,
			b: 0,
			a: 0,
		},
	});

	const document = await tabClient.DOM.getDocument();
	const banners = await tabClient.DOM.querySelectorAll({
		nodeId: document.root.nodeId,
		selector: '.banner',
	});

	for (const banner of banners.nodeIds) {
		const { attributes } = await tabClient.DOM.getAttributes({ nodeId: banner });
		const idIndex = attributes.indexOf('id');
		const id = attributes[idIndex + 1];

		const snapshot = await screenshotNode(tabClient, banner);
		await fs.writeFile(`./banners/assets/${id}.webp`, snapshot);
	}

	await tabClient.close();
	await browserClient.close();
	await chrome.kill();
	await server.close();
})();
