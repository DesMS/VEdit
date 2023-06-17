(async () => {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, isNaN(parseFloat(ms)) ? 0 : parseFloat(ms)));
	window.replit = typeof window.replit == `undefined` ? replit : window.replit;
	const defaultTheme = Object.fromEntries(Object.entries({accentNegativeDefault: "#E52222", accentNegativeDimmer: "#A60808", accentNegativeDimmest: "#660000", accentNegativeStronger: "#FF6666", accentNegativeStrongest: "#FFCFCF", accentPositiveDefault: "#009118", accentPositiveDimmer: "#046113", accentPositiveDimmest: "#044A10", accentPositiveStronger: "#6CD97E", accentPositiveStrongest: "#BFFFCA", accentPrimaryDefault: "#0079F2", accentPrimaryDimmer: "#0053A6", accentPrimaryDimmest: "#004182", accentPrimaryStronger: "#57ABFF", accentPrimaryStrongest: "#B2D9FF", backgroundDefault: "#1C2333", backgroundHigher: "#2B3245", backgroundHighest: "#3C445C", backgroundOverlay: "#0e1525A0", backgroundRoot: "#0E1525", black: "#0E1525", blueDefault: "#0079F2", blueDimmer: "#0053A6", blueDimmest: "#004182", blueStronger: "#57ABFF", blueStrongest: "#B2D9FF", blurpleDefault: "#795EFF", blurpleDimmer: "#5239CC", blurpleDimmest: "#39298A", blurpleStronger: "#A694FF", blurpleStrongest: "#CEC4FF", brownDefault: "#A3765C", brownDimmer: "#75503B", brownDimmest: "#594031", brownStronger: "#D49877", brownStrongest: "#FFC8A8", foregroundDefault: "#F5F9FC", foregroundDimmer: "#C2C8CC", foregroundDimmest: "#9DA2A6", greenDefault: "#009118", greenDimmer: "#046113", greenDimmest: "#044A10", greenStronger: "#6CD97E", greenStrongest: "#7AEB8D", greyDefault: "#808080", greyDimmer: "#545454", greyDimmest: "#404040", greyStronger: "#A6A6A6", greyStrongest: "#D4D4D4", limeDefault: "#5A8700", limeDimmer: "#3D5C00", limeDimmest: "#314A00", limeStronger: "#87B825", limeStrongest: "#C4E581", magentaDefault: "#C73AC7", magentaDimmer: "#8A218A", magentaDimmest: "#6B1A6B", magentaStronger: "#F562F5", magentaStrongest: "#FFBFFF", orangeDefault: "#AD5700", orangeDimmer: "#703800", orangeDimmest: "#542A00", orangeStronger: "#D4781C", orangeStrongest: "#FFBD7A", outlineDefault: "#4E5569", outlineDimmer: "#3C445C", outlineDimmest: "#2B3245", outlineStronger: "#5F677A", outlineStrongest: "#70788C", pinkDefault: "#D4359F", pinkDimmer: "#8F226B", pinkDimmest: "#6E1B52", pinkStronger: "#FF70CF", pinkStrongest: "#FFBAE8", purpleDefault: "#A64DFF", purpleDimmer: "#7633B8", purpleDimmest: "#582987", purpleStronger: "#C78FFF", purpleStrongest: "#E2C4FF", redDefault: "#E52222", redDimmer: "#A60808", redDimmest: "#660000", redStronger: "#FF6666", redStrongest: "#FFCFCF", tealDefault: "#0093B0", tealDimmer: "#006073", tealDimmest: "#004452", tealStronger: "#27B9D6", tealStrongest: "#69D9F0", white: "#FCFCFC", yellowDefault: "#967D00", yellowDimmer: "#635300", yellowDimmest: "#4D4000", yellowStronger: "#BFA730", yellowStrongest: "#F2E088"}));
	const root = document.querySelector(`:root`);
	const ontheme = (theme) => {
		var keys = Object.keys(theme);
		var newtheme = {};
		for (const key of keys) {
			var value = theme[key];
			if (!key.startsWith(`__`)) {
				var newkey = [];
				for (const char of key) {
					if (char.toString().toLowerCase() == char.toString()) {
						newkey.push(char.toString());
					} else {
						newkey.push(`-${char.toString().toLowerCase()}`);
					};
				};
				newkey = `--${newkey.join(``)}`;
				root.style.setProperty(newkey, value);
			};
		};
		return;
	};
	try {
		await window.replit.init();
	} catch (err) {
		try {
			await window.replit.init();
		} catch (err) {};
	};
	var themed = false;
	try {
		if (window.replit.themes.getCurrentThemeValues) {
			ontheme((await window.replit.themes.getCurrentThemeValues()));
		} else {
			themed = true;
		};
	} catch (err) {
		themed = true;
	};
	if (!themed) {
		try {
			if (window.replit.themes.onThemeChangeValues) {
				await window.replit.themes.onThemeChangeValues(ontheme);
			};
		} catch (err) {};
	} else {
		ontheme(defaultTheme);
	};
	var file = await window.replit.me.filePath();
	if (file == null) {
		// todo
		return;
	};
	try {
		await window.replit.fs.createDir(`.config`);
	} catch (err) {};
	try {
		await window.replit.fs.createDir(`.config/.vedit`);
	} catch (err) {};
	try {
		var out = await window.replit.fs.readFile(`.config/.vedit/install.txt`);
		if (out.content == null || out.error == `NOT_FOUND`) {
			throw ``;
		};
		await delay(0);
		await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; chmod 777 ./ffmpeg`);
		await window.replit.messages.showConfirm(`Found FFMPEG`, 2000);
	} catch (err) {
		try {
			await window.replit.messages.showWarning(`FFMPEG not installed, installing..`, 10000);
			var msg = await window.replit.messages.showNotice(`Starting install...`, 10000);
			await delay(0);
			await delay((Math.random() * 500) + 500); // People don't trust instant programs
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Getting FFMPEG`, 10000);
			await delay(0);
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; rm -rf ./* &>/dev/null; curl -G -L -o ffmpeg.tar.gz https://raw.githubusercontent.com/DesMS/VEdit/main/ffmpeg.tar.gz`); 
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Unpacking FFMPEG`, 10000);
			await delay(0);
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; tar -xzf ./ffmpeg.tar.gz`);
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Removing extra files`, 10000);
			await delay(0);
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; rm -rf ./ffmpeg.tar.gz`);
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Changing file permissions`, 10000);
			await delay(0);
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; chmod 777 ./ffmpeg`);
			await window.replit.messages.hideMessage(msg);
			await window.replit.messages.showConfirm(`Successfully installed FFMPEG`, 2000);
		} catch (err) {
			await window.replit.messages.showError(`Unable to install FFMPEG`, 5000);
			throw err;
			return;
		};
	};
	await window.replit.messages.showNotice(`Made by 804kn`, 2000);
	const execffmpeg = (args) => new Promise(async (resolve, reject) => {
		var o = [];
		var out = (await window.replit.exec.spawn({
			'splitStderr': false,
			'args': [`bash`, `-c`, `/home/runner/\$REPL_SLUG/.config/.vedit/ffprobe ${typeof args == `string` ? args : args.join(` `)}`],
			'onOutput': (e) => o.push(e)
		}));
		var code = (await out.resultPromise).exitCode;
		var g = o.join(``).toString().replaceAll(`\r\n`, `\n`).split(`\n`),
			n = ``;
		for (const line of g) {
			if (!line.startsWith(`ffprobe version`) && !line.startsWith(`  built with`) && !line.startsWith(`  configuration`) && !line.startsWith(`  lib`)) {
				n += `${line}\n`;
			};
		};
		resolve({
			'output': n,
			'exitcode': code
		});
		return;
	});
	await delay(0);
	const loadFile = (path) => {
		return new Promise(async (resolve, reject) => {
			var out = await execffmpeg([`-i`, path]);
			if (out.output.includes(`Invalid data found when processing input`)) {
				await window.replit.messages.showError(`Invalid file, ${path}`, 10000);
				resolve();
				return;
			};
			console.log(out.output);
			resolve();
			return;
		});
	};
	await loadFile(file);
	return;
})();