# [WIP] NewTab+

A better new tab experience

## TODO

- [ ] Group components by function.
- [ ] Bake in settings section component into field components.
- [x] Attempt to load the next wallpaper before saving settings to prevent
  saving settings that results in an error.
- [ ] Add clear settings button to wallpaper settings.
- [ ] Create upload field component for shortcut icons.
- [ ] Create settings page component to list bookmarks and apps for new shortcuts.
- [ ] Create components that interface with the browsers bookmarks and apps.
- [ ] Implement click-and-drag functionality to reorder and delete shortcuts.
- [ ] Create weather-clock component and implement some settings for it.

## Installation

- `git clone git@github.com:wwilsman/new-tab-plus`
- Add Unsplash API credentials to `.env`
- `yarn && yarn build`

### Chrome

- Navigate to `chrome://extensions`
- Click "Load unpacked extension..."
- Select `new-tab-plus/build`
