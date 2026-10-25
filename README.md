# Pages

Hi! This is **Pages**, our book tracking web app.  

---

### Login / Sign-Up
- `/login` page with **Supabase Auth UI** for signing in.
- `/signup` page for new users, using the same Auth UI pre-set to its sign-up view.
- **Sign Out** is always available from the avatar menu in the top nav (desktop and mobile).

### Book Search
- `/search` page to find books by **title**, **author**, or **ISBN** and add them to your shelf.
- Debounced search with loading, empty, and error states.
- Includes a **Back** button to return to the previous page.

### Home
- Live **Trending Right Now** section pulling today's trending titles straight from Open Library, with one-click "Add to Shelf".

### Profile
- `/profile` shows your books in tabs:
  - **Read**
  - **Currently Reading**
  - **Want to Read**
- Displays reading stats with progress bars.
- Change a book's shelf status (Want → Currently Reading → Read) right from its card.
- Remove a book from your shelf.

### Notifications
- In-app toast notifications (success / error / info) replace browser `alert()` popups across the app.

### Theme
- Cozy library style with `#3c2f2f`, `#4a3728`, `emerald-600`, etc.
- **Playfair Display** serif font for all headings, Inter for body text.
- Consistent **Pages** branding across all pages via a single shared Navbar/Footer.

### Database
- Supabase tables (`books`, `shelves`) to store books and user shelves.
- Security rules for user-specific data.

---

## Setup Instructions

### 1. Get Tools
- Install **Node.js** (18.x or higher, includes npm).  
- Install **Git**.  
- Sign up at [supabase.com](https://supabase.com) for a free account.  

### 2. Clone the Project
```bash
git clone https://github.com/shreyakat21/Pages.git
cd Pages
