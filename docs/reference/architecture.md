# Architecture Reference

> This document is part of the [App Framework Documentation](../../README_V2.md#documentation)

<br />

**Folder Structure**

The following project folder structure will be created by default after installation:

```
├── app/                        # App source folder
│   ├── images/                 # App images
│   ├── lang/                   # App language files
│   ├── pages/                  # App page components
│   ├── app.vue                 # App main component
│   ├── config.js               # App configuration
│   ├── icon.png                # App icon file (minimum size is 1024 pixel)
│   └── routes.json             # App routes configuration
├── build/                      # Build files (created after first build)
├── design/                     # Design templates (PDF, Power Point)
├── node_modules/               # Installed node modules (do not modify)
├── snapshots/                  # Project snapshots (for rollback)
├── .eslintrc                   # ESLint configuration file (do not modify)
├── .gitignore                  # List of ignored files for Git commits (do not modify)
├── .npmignore                  # List of ignored files for NPM publishing (do not modify)
├── .npmrc                      # NPM configuration file (do not modify)
├── package-lock.json           # Installation information (do not modify)
└── package.json                # Project information
```
