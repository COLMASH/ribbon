## Directory Layout

Here's an outline of the main directories and their intended use:

-   `public` - Static assets such as icons, images, etc.
-   `src/app` - Root directory for source files and Built-in Next.js folder for routing.
-   `src/lib` - All code not related with ui.
    -   `hooks/` - Custom hooks.
    -   `redux/` - Redux store and related files.
        -   `features/` - Store slices.
        -   `services/` - Services to call endpoints.
    -   `routes/` - Contains an object of route names to avoid typos when calling routes.
    -   `types/` - Contains main app types.
    -   `utils/` - Utility functions that can be reused across the app.
-   `src/ui` - All code related with ui
    -   `components/` - Reusable UI components are grouped here by category, e.g., `Buttons/`, `Cards/`, `Forms/`, etc
    -   `styles/` - Main styles for the project.
        -   `ThemeRegistry/` - MaterialUI theme and style defaults setup.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then be sure that git hooks are ready (this will allow pre-commit format, linter, types and build checks):

```bash
npm run prepare
```

Then you could run the development server:

```bash
npm run dev
```

Or if you want to run the production server:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result .
