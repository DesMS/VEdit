{ pkgs }: {
	deps = [
		pkgs.nodePackages.vscode-langservers-extracted
		pkgs.nodePackages.typescript-language-server
		pkgs.wget
		pkgs.unzip
	];
}