# Product Context

## Problem it Solves
Provides a digital, contactless menu for restaurant customers and a web presence for the business. 

## How it should work
- Customers scan QR -> mobile-first web app opens.
- Features a navigation bar (Desktop: Top, Mobile: Hamburger/Sidebar): Home, Corporate (About, Gallery, Videos dropdown), Menu, Contact.
- "Hemen Sipariş Ver" CTA button linking to `tel:+90...`.
- Admin panel accessible at `/admin` (protected via Firebase Auth) for menu CRUD operations. Non-admins redirect to `/login`.
