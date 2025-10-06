{
  description = "Nix flake for running a Next.js app with pnpm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          name = "nextjs-dev";

          packages = with pkgs; [
            nodejs_22     # or nodejs_20 if you prefer LTS
            pnpm
            git
          ];

          shellHook = ''
            echo "🟢 Next.js dev environment ready!"
            echo "Use 'pnpm install' to install deps, then 'pnpm dev' to start your server."
          '';
        };
      });
}
