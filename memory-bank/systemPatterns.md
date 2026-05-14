# System Patterns

## System Architecture
- **Frontend**: Next.js App Router, React, Tailwind CSS
- **Backend/DB**: Firebase Firestore, Firebase Storage (for images), Firebase Auth
- **Styling**: Tailwind CSS with custom fonts (Lora for headers/buttons, Outfit for text) and custom colors.

## Database Design (Firestore)
- **Categories**: `id`, `name`, `order`, `isActive`, `image`
- **Products**: `id`, `categoryIds` (array of category IDs since a product can be in multiple), `name`, `description`, `price` (single price), `imageUrl`, `isAvailable`, `order`
