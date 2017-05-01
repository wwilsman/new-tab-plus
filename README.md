# [WIP] NewTab+

A better new tab experience

## TODO

- [ ] **Wallpaper**: Persist cached photos in smaller chunks to fit
  chrome.storage.sync 8kb item limit and 100kb total storage limit.
- [ ] **Wallpaper**: Store photo views in another key on the state so
  they're retained after additional photo requests.
- [ ] **Wallpaper**: Keep showing the thumbnail for a photo component after aborting.
- [ ] **Shortcuts**: Create upload field component for shortcut icons.
- [ ] **Shortcuts**: Create settings page component to list predetermined shortcuts.
- [ ] **Shortcuts**: Create components that interface with the browsers
  bookmarks and apps.
- [ ] **Shortcuts**: Implement click-and-drag functionality to reorder and
  delete shortcuts.
- [ ] **Future**: Create weather-clock component and implement some settings for it.

## Installation

- `git clone git@github.com:wwilsman/new-tab-plus`
- Add Unsplash API credentials to `.env`
- `yarn && yarn build`

### Chrome

- Navigate to `chrome://extensions`
- Click "Load unpacked extension..."
- Select `new-tab-plus/build`
