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
		captureBeyondViewport: true,
		clip: {
			x,
			y,
			width: model.width,
			height: model.height,
			scale: 1,
		},
	});

	return Buffer.from(screenshot.data, 'base64');
};

(async () => {
	// // tsx bugs out on this. Need to come back to it
	// const server = await createServer({
	// 	configFile: false,
	// 	root: __dirname,
	// 	server: {
	// 		port: 1337,
	// 	},
	// });
	// await server.listen();

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
		url: 'http://localhost:5173',
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
			r: 0, g: 0, b: 0, a: 0,
		},
	});

	const { root } = await tabClient.DOM.getDocument();
	const banners = await tabClient.DOM.querySelectorAll({
		nodeId: root.nodeId,
		selector: '.banner',
	});

	for (const banner of banners.nodeIds) {
		const { attributes } = await tabClient.DOM.getAttributes({ nodeId: banner });
		const idIndex = attributes.indexOf('id');
		const id = attributes[idIndex + 1];

		const snapshot = await screenshotNode(tabClient, banner);
		await fs.writeFile(`./placeholder-banners/pngs/${id}.png`, snapshot);
	}

	await tabClient.close();
	await browserClient.close();
	await chrome.kill();
})();
