//#region src/lib/assets/jagged-balls-of-rolling-chaos.png?w=1200&format=png&as=src
var jagged_balls_of_rolling_chaos_default = "/_app/immutable/assets/jagged-balls-of-rolling-chaos.DUfbQsiD.png";
//#endregion
//#region src/routes/jagged-balls-of-rolling-chaos/+page.server.ts
var load = () => {
	const imageUrl = Array.isArray("/_app/immutable/assets/jagged-balls-of-rolling-chaos.DUfbQsiD.png") ? jagged_balls_of_rolling_chaos_default[0] : jagged_balls_of_rolling_chaos_default;
	return { ogImage: new URL(imageUrl, "https://sundowners.org").href };
};
//#endregion
export { load };
