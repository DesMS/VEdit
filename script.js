(async () => {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, isNaN(parseFloat(ms)) ? 0 : parseFloat(ms)));
	window.replit = typeof window.replit == `undefined` ? replit : window.replit;
	const defaultTheme = Object.fromEntries(Object.entries({accentNegativeDefault: "#E52222", accentNegativeDimmer: "#A60808", accentNegativeDimmest: "#660000", accentNegativeStronger: "#FF6666", accentNegativeStrongest: "#FFCFCF", accentPositiveDefault: "#009118", accentPositiveDimmer: "#046113", accentPositiveDimmest: "#044A10", accentPositiveStronger: "#6CD97E", accentPositiveStrongest: "#BFFFCA", accentPrimaryDefault: "#0079F2", accentPrimaryDimmer: "#0053A6", accentPrimaryDimmest: "#004182", accentPrimaryStronger: "#57ABFF", accentPrimaryStrongest: "#B2D9FF", backgroundDefault: "#1C2333", backgroundHigher: "#2B3245", backgroundHighest: "#3C445C", backgroundOverlay: "#0e1525A0", backgroundRoot: "#0E1525", black: "#0E1525", blueDefault: "#0079F2", blueDimmer: "#0053A6", blueDimmest: "#004182", blueStronger: "#57ABFF", blueStrongest: "#B2D9FF", blurpleDefault: "#795EFF", blurpleDimmer: "#5239CC", blurpleDimmest: "#39298A", blurpleStronger: "#A694FF", blurpleStrongest: "#CEC4FF", brownDefault: "#A3765C", brownDimmer: "#75503B", brownDimmest: "#594031", brownStronger: "#D49877", brownStrongest: "#FFC8A8", foregroundDefault: "#F5F9FC", foregroundDimmer: "#C2C8CC", foregroundDimmest: "#9DA2A6", greenDefault: "#009118", greenDimmer: "#046113", greenDimmest: "#044A10", greenStronger: "#6CD97E", greenStrongest: "#7AEB8D", greyDefault: "#808080", greyDimmer: "#545454", greyDimmest: "#404040", greyStronger: "#A6A6A6", greyStrongest: "#D4D4D4", limeDefault: "#5A8700", limeDimmer: "#3D5C00", limeDimmest: "#314A00", limeStronger: "#87B825", limeStrongest: "#C4E581", magentaDefault: "#C73AC7", magentaDimmer: "#8A218A", magentaDimmest: "#6B1A6B", magentaStronger: "#F562F5", magentaStrongest: "#FFBFFF", orangeDefault: "#AD5700", orangeDimmer: "#703800", orangeDimmest: "#542A00", orangeStronger: "#D4781C", orangeStrongest: "#FFBD7A", outlineDefault: "#4E5569", outlineDimmer: "#3C445C", outlineDimmest: "#2B3245", outlineStronger: "#5F677A", outlineStrongest: "#70788C", pinkDefault: "#D4359F", pinkDimmer: "#8F226B", pinkDimmest: "#6E1B52", pinkStronger: "#FF70CF", pinkStrongest: "#FFBAE8", purpleDefault: "#A64DFF", purpleDimmer: "#7633B8", purpleDimmest: "#582987", purpleStronger: "#C78FFF", purpleStrongest: "#E2C4FF", redDefault: "#E52222", redDimmer: "#A60808", redDimmest: "#660000", redStronger: "#FF6666", redStrongest: "#FFCFCF", tealDefault: "#0093B0", tealDimmer: "#006073", tealDimmest: "#004452", tealStronger: "#27B9D6", tealStrongest: "#69D9F0", white: "#FCFCFC", yellowDefault: "#967D00", yellowDimmer: "#635300", yellowDimmest: "#4D4000", yellowStronger: "#BFA730", yellowStrongest: "#F2E088"})); // Default theme
	const root = document.querySelector(`:root`); // Root selector (css)
	const ontheme = (theme) => {
		var keys = Object.keys(theme); // Get the theme
		var newtheme = {};
		for (const key of keys) {
			var value = theme[key]; // Get the value
			if (!key.startsWith(`__`)) { // Check if it's a valid key
				var newkey = [];
				for (const char of key) { // Go through every char
					if (char.toString().toLowerCase() == char.toString()) { // localize
						newkey.push(char.toString()); // add it
					} else {
						newkey.push(`-${char.toString().toLowerCase()}`); // add but more localized
					};
				};
				newkey = `--${newkey.join(``)}`; // newkey
				root.style.setProperty(newkey, value); // Add property to css
			};
		};
		return;
	};
	try {
		await window.replit.init(); // Initialize replit
	} catch (err) {
		try {
			await window.replit.init(); // Incase first init fails
		} catch (err) {};
	};
	var themed = false;
	try {
		if (window.replit.themes.getCurrentThemeValues) { // Check if there's getCurrentThemeValues
			ontheme((await window.replit.themes.getCurrentThemeValues())); // Change the theme
		} else {
			themed = true; // No theme
		};
	} catch (err) {
		themed = true; // No theme
	};
	if (!themed) {
		try {
			if (window.replit.themes.onThemeChangeValues) { // Check if replit supports onThemeChangeValues
				await window.replit.themes.onThemeChangeValues(ontheme); // onThemeChangeValues, change the theme
			};
		} catch (err) {};
	} else {
		ontheme(defaultTheme); // We don't have a theme (Maybe broken), use default
	};
	var file = await window.replit.me.filePath(); // Get the file path
	if (file == null) { // How did we get here? (Will implement a tool later)
		// todo
		return;
	};
	try {
		await window.replit.fs.createDir(`.config`); // Create .config, if already created, do nothing
	} catch (err) {};
	try {
		await window.replit.fs.createDir(`.config/.vedit`); // Create .config/.vedit, if already created, do nothing
	} catch (err) {};
	try {
		var out = await window.replit.fs.readFile(`.config/.vedit/install.txt`); // Check if install.txt is found
		if (out.content == null || out.error == `NOT_FOUND`) { // Check if it didn't error, but did error
			throw ``; // Throw to goto catch
		};
		await delay(0);
		await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; chmod 777 ./ffmpeg`); // Change permissions for ffmpeg to avoid error
		await window.replit.messages.showConfirm(`Found FFMPEG`, 2000); // Let them know it was found
	} catch (err) {
		try {
			await window.replit.messages.showWarning(`FFMPEG not installed, installing..`, 10000); // Uh oh, ffmpeg not installed
			var msg = await window.replit.messages.showNotice(`Starting install...`, 10000); // Message to display to the user
			await delay(0); // Little delay
			await delay((Math.random() * 500) + 500); // People don't trust instant programs
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Getting FFMPEG`, 10000); // Message to display to the user
			await delay(0); // Little delay
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; rm -rf ./* &>/dev/null; curl -G -L -o ffmpeg.tar.gz https://raw.githubusercontent.com/DesMS/VEdit/main/ffmpeg.tar.gz`); // Get's the ffmpeg tar.gz from the github page
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Unpacking FFMPEG`, 10000); // Message to display to the user
			await delay(0); // Little delay
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; tar -xzf ./ffmpeg.tar.gz`);
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Removing extra files`, 10000);
			await delay(0); // Little delay
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; rm -rf ./ffmpeg.tar.gz`);
			await window.replit.messages.hideMessage(msg);
			msg = await window.replit.messages.showNotice(`Changing file permissions`, 10000);
			await delay(0); // Little delay
			await window.replit.exec.exec(`cd ~/\$REPL_SLUG/.config/.vedit; chmod 777 ./ffmpeg`);
			await window.replit.messages.hideMessage(msg);
			await window.replit.messages.showConfirm(`Successfully installed FFMPEG`, 2000);
		} catch (err) {
			await window.replit.messages.showError(`Unable to install FFMPEG`, 5000);
			throw err;
			return;
		};
	};
	await window.replit.messages.showNotice(`Made by 804kn`, 2000); // Show a notice of who made it (yours truly)
	const execffmpeg = (args) => new Promise(async (resolve, reject) => { // Promise
		var o = ``;
		var out = (await window.replit.exec.spawn({
			'splitStderr': false, // We don't want it split, just get all the output
			'args': [`bash`, `-c`, `/home/runner/\$REPL_SLUG/.config/.vedit/ffprobe ${typeof args == `string` ? args : args.join(` `)}`], // Similar to exec, just better
			'onOutput': (e) => o += e // On output, add it
		}));
		var code = (await out.resultPromise).exitCode; // get the exit code
		var g = o.toString().replaceAll(`\r\n`, `\n`).split(`\n`), // Replace all \r\n with \n (linux), then split
			n = ``;
		for (const line of g) { // Go through every line
			if (!line.startsWith(`ffprobe version`) && !line.startsWith(`  built with`) && !line.startsWith(`  configuration`) && !line.startsWith(`  lib`)) { // Check if it's some debug information that can be ignored
				n += `${line}\n`; // Add the correct line
			};
		};
		resolve({
			'output': n, // output text
			'exitcode': code // output code
		}); // Resolve the output code (We do this as to not get an unresolvable error with exec)
		return;
	});
	await delay(0); // Little delay
	const loadFile = (path) => {
		return new Promise(async (resolve, reject) => {
			var out = await execffmpeg([`-i`, path]); // Get file info
			if (out.output.includes(`Invalid data found when processing input`)) { // Check if there was an error
				await window.replit.messages.showError(`Invalid file, ${path}`, 10000); // Tell them, there was an error
				resolve();
				return;
			};
			console.log(out.output);
			resolve();
			return;
		});
	};
	await loadFile(file); // load default file (Will be used to load other files, soon (tm))
	return;
})();