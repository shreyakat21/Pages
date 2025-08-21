# Pages

Hi! This is **Pages**, our book tracking web app.  

Here’s what I’ve done so far and how you can set it up to start working on it.  
The app has a cozy library look using the *Playfair Display* font.  

---

## What’s Done So Far

### Login / Sign-Up
- `/login` page with **Supabase Auth UI** for signing in.  
- Added **Sign Out** button to switch accounts (test different emails).  
- `/signup` page (may need setup) for new users.  

### Book Search
- `/search` page to find books by **title** or **ISBN** and add them to your shelf.  
- Includes a **Back** button to return to the previous page.  

### Profile
- `/profile` shows your books in tabs:  
  - **Read**  
  - **Currently Reading**  
  - **Want to Read**  
- Displays reading stats.  
- Added **Sign Out** button next to **Back** button.  
- Fixed TypeScript issues for book data display.  

### Theme
- Cozy library style with `#3c2f2f`, `#4a3728`, `emerald-600`, etc.  
- Uses **Playfair Display** font for headings.  
- Consistent **Pages** branding across all pages.  

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
