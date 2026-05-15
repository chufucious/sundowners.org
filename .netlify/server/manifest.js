export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","2023/android-chrome-192x192.png","2023/android-chrome-512x512.png","2023/apple-touch-icon.png","2023/favicon-16x16.png","2023/favicon-32x32.png","2023/favicon.ico","2023/mstile-150x150.png","2023/safari-pinned-tab.svg","2023/site.webmanifest","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","robots.txt","site.webmanifest","sitemap.xml"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".xml":"text/xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.aEs2PmaW.js",app:"_app/immutable/entry/app.BM6Fe_z8.js",imports:["_app/immutable/entry/start.aEs2PmaW.js","_app/immutable/chunks/CNAkIyX9.js","_app/immutable/chunks/Dxs0pAKF.js","_app/immutable/entry/app.BM6Fe_z8.js","_app/immutable/chunks/Dxs0pAKF.js","_app/immutable/chunks/BcgnSMxp.js","_app/immutable/chunks/DXLwiZ0H.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/jagged-balls-of-rolling-chaos",
				pattern: /^\/jagged-balls-of-rolling-chaos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {"_app/immutable/assets/jagged-balls-of-rolling-chaos.DUfbQsiD.png":3481222}
	}
}
})();
