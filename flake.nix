{
  description = "Nix flake for running a Next.js app with pnpm (node-gyp ready)";

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
            nodejs_22
            pnpm
            git
            python3          # for node-gyp
            pkg-config       # detect libs
            libusb1
            udev
          ];

          shellHook = ''
            echo "🟢 Next.js dev environment ready!"
            echo "Use 'pnpm install' then 'pnpm dev'."
            pnpm install
          '';
        };
      });
}
