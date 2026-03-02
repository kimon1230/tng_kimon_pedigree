# Kimon's Pedigree Chart

A [TNG](https://tngsitebuilding.com/index.php) (The Next Generation of Genealogy Sitebuilding by Darrin Lythgoe) mod that adds a **Kimon** display mode to the pedigree chart.

**Author:** Kimon Andreou
**Mod Version:** 1.0
**Requires:** TNG 15.x

**Note:** The display name "Kimon" is a placeholder. To change it, update the label in `mods/tng_kimon_pedigree.cfg` (search for `pedkimon`) and in `mods/tng_kimon_pedigree/kimon_pedigree.js` (search for `kimonpedlnk`).

## What It Does

Adds a "Kimon" tab to the pedigree chart display mode selector (alongside Standard, Compact, Box, etc.). The Kimon mode renders a clean, read-only ancestor chart:

- No gender images
- No hyperlinks on names (plain text only)
- No arrows (down-arrows, off-page arrows, left navigation arrow)
- Compact 35px box height with centered names
- No popups on hover

## Files

```
mods/
  tng_kimon_pedigree.cfg              # Mod manifest (patches + embedded JS)
```

## Installation

1. Copy `mods/tng_kimon_pedigree.cfg` into your TNG `mods/` directory.
2. Log in to TNG as admin.
3. Go to **Admin > Mod Manager**.
4. Find **Kimon's Pedigree Chart** in the mod list.
5. Click **Install**.

The mod installer will:
- Create the `mods/tng_kimon_pedigree/` directory
- Create `mods/tng_kimon_pedigree/kimon_pedigree.js`
- Patch `pedigree.php` (6 patches: input sanitization, link highlighting, config overrides, JS include, CSS injection, display selector link)
- Patch `languages/English/text.php` (1 patch: "Kimon" label)

## Uninstallation

1. Go to **Admin > Mod Manager**.
2. Find **Kimon's Pedigree Chart**.
3. Click **Remove**.

The mod installer will reverse all patches and delete the created files and directory.

## Usage

After installation, navigate to any person's pedigree chart. A **Kimon** link appears in the display mode selector bar (after Fan Chart). Click it, or navigate directly:

```
pedigree.php?personID=I1&tree=tree1&display=kimon&generations=4
```

## Compatibility

- Requires TNG v15.0.x
- If another display-mode mod patches the same `elseif(box)/else` block in `pedigree.php`, install this mod first

## Security

This mod includes fixes for pre-existing TNG vulnerabilities:

- **`$display` XSS sanitization** — Whitelists `$display` to lowercase alpha characters only, preventing reflected and stored XSS via JS string injection, HTML attribute injection, and JS-in-HTML handler injection
- **Client-side HTML escaping** — Escapes `&`, `<`, `>` in ancestor names before innerHTML insertion, compensating for TNG's `xmlcharacters()` not escaping angle brackets

## License

This project is provided as-is for use with TNG.
