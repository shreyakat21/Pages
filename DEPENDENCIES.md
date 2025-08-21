Dependencies
Below is a list of dependencies used in the Pages project, based on the current package.json, along with their purposes and versions as of August 20, 2025.
Production Dependencies

next@14.0.0
Purpose: React framework for server-side rendering, static site generation, and client-side rendering.
Usage: Powers the application’s routing, pages (login, signup, search, profile), and build process.


react@18.3.1
Purpose: JavaScript library for building user interfaces.
Usage: Core library for React components in login, signup, search, and profile pages.


react-dom@18.0.0
Purpose: Provides DOM-specific methods for React.
Usage: Renders React components to the browser.


@supabase/supabase-js@2.53.0
Purpose: JavaScript client for Supabase API.
Usage: Handles authentication (signIn, signOut, getSession) and database operations (books, shelves tables).


@supabase/auth-ui-react@0.4.7
Purpose: Prebuilt React components for Supabase authentication UI.
Usage: Provides the login form in login/page.tsx.


@supabase/auth-ui-shared@0.1.8
Purpose: Shared utilities for @supabase/auth-ui-react.
Usage: Supports styling and configuration of the Auth UI.


@supabase/ssr@0.6.1
Purpose: Supabase utilities for server-side rendering in Next.js.
Usage: Manages server-side authentication in Next.js App Router.


lucide-react@0.540.0
Purpose: Icon library for React.
Usage: Provides icons like ArrowLeft, LogOut, Mail, Lock for buttons and UI elements.


@fontsource/playfair-display@5.2.6
Purpose: Self-hosted Playfair Display font.
Usage: Applies a serif font for headings or text to enhance the cozy library aesthetic.



Development Dependencies

typescript@5.0.0
Purpose: Adds static types to JavaScript.
Usage: Ensures type safety for Book, ShelfEntry, and Supabase queries.


@types/node@20.0.0
Purpose: Type definitions for Node.js.
Usage: Supports TypeScript in a Node.js environment.


@types/react@18.0.0
Purpose: Type definitions for React.
Usage: Provides type safety for React components and hooks.


autoprefixer@10.4.21
Purpose: Adds vendor prefixes to CSS rules.
Usage: Ensures cross-browser compatibility for Tailwind styles.


postcss@8.5.6
Purpose: CSS post-processor.
Usage: Processes Tailwind CSS in globals.css.


tailwindcss@3.4.17
Purpose: Utility-first CSS framework.
Usage: Styles the application with the cozy library theme (#3c2f2f, emerald-600, etc.).



Installation
Install all dependencies using npm (or pnpm if preferred):
npm install

or
pnpm install

Notes

The versions listed match the current package.json. Ensure compatibility when upgrading.
Check package.json for updates:{
  "dependencies": {
    "@fontsource/playfair-display": "^5.2.6",
    "@supabase/auth-ui-react": "^0.4.7",
    "@supabase/auth-ui-shared": "^0.1.8",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.53.0",
    "lucide-react": "^0.540.0",
    "next": "^14.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.0.0"
  }
}


Run npm install or pnpm install after updating package.json.
