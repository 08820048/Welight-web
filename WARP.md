# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `npm run dev` (runs on http://localhost:3000)
- **Build production**: `npm run build`
- **Preview production build**: `npm run preview`

### Code Quality
- **Lint and fix**: `npm run lint` (ESLint with Vue 3 + auto-fix)
- **Format code**: `npm run format` (Prettier on src/ directory)

### Testing
- **Test files**: Located in `src/tests/` directory
- **Service status test**: Open `src/tests/service-status-test.html` in browser
- **Credit system test**: Open `src/test-credits.html` and `src/test-modal.html`

## Architecture Overview

### Tech Stack
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite 5 with hot reload
- **Styling**: Tailwind CSS + custom CSS
- **State Management**: Pinia stores
- **Routing**: Vue Router 4 with lazy loading
- **Email Service**: EmailJS integration
- **HTTP Requests**: Native fetch API

### Project Structure

#### Core Directories
- `src/components/` - Vue components (20+ components including modals, purchase flows)
- `src/views/` - Page-level components (11 pages: Home, Download, Pricing, etc.)
- `src/services/` - API services (credits, licensing, download stats, service status)
- `src/stores/` - Pinia stores (theme management)
- `src/utils/` - Utilities (analytics, message system)
- `src/data/` - Static data and configuration
- `src/composables/` - Vue composables for reusable logic

#### Key Components
- `Navbar.vue` - Main navigation with responsive design
- `CreditsPurchase.vue` - Complex credit purchase flow with multiple payment methods
- `MonthlyCardPurchase.vue` - Subscription purchase interface
- `PromotionBanner.vue` - Dynamic promotional content system
- `AnnouncementModal.vue` - System announcements and updates

### Service Architecture

#### Service Layer Pattern
All API interactions use dedicated service modules:
- `creditsService.js` - Credit purchase and management
- `licenseService.js` - Software license operations
- `monthlyCardService.js` - Subscription management
- `downloadStats.js` - Download statistics tracking
- `serviceStatusService.js` - Service health monitoring

#### Service Status System
- Dynamic service availability checking (5-minute intervals)
- Auto-disable purchase buttons during maintenance
- Real-time status updates with toast notifications
- Fallback to normal operation if status API fails

### State Management
- **Theme Store** (`stores/theme.js`): Dark/light theme with localStorage persistence and system preference detection
- **Global State**: Managed through Pinia with reactive composition API pattern

### Routing Strategy
- **Lazy Loading**: All routes except Home use dynamic imports
- **Scroll Behavior**: Auto-scroll to top on route changes with savedPosition support
- **Pages**: Home, Download, Pricing, Monthly Cards, Donation, Community, Legal pages

## Development Guidelines

### Component Development
- Use Composition API with `<script setup>` syntax
- Follow component naming: PascalCase for components, kebab-case for props
- Place large components (>500 lines) in separate files
- Use Tailwind CSS classes primarily, custom CSS in `src/style.css` for global styles

### Service Integration
- Use try-catch for all async operations with console error logging
- Implement fallback behaviors for failed API calls
- Follow the established service pattern for new APIs
- Add proper TypeScript-style JSDoc comments for service methods

### Purchase Flow Patterns
The app has complex e-commerce features:
- Multiple payment methods (WeChat Pay, Alipay, manual codes)
- Credit system with package tiers
- Monthly subscription cards
- License purchasing with activation codes
- Service status integration for purchase button management

### Styling Approach
- **Primary Colors**: Blue (#0ea5e9) and purple gradients
- **Theme System**: Automatic dark/light mode with manual override
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Components**: Consistent button styles, modal patterns, card layouts

### API Integration
- **Base URLs**: Multiple endpoints for different services
- **Error Handling**: User-friendly messages via `utils/message.js`
- **Status Management**: Service availability checks before purchases
- **Analytics**: Custom analytics tracking for user interactions

## Important Patterns

### Modal System
- Consistent modal structure with backdrop blur
- Confirmation dialogs for purchases
- Success/error feedback modals
- Loading states during API operations

### Purchase Workflows
- Multi-step purchase processes with validation
- Real-time status updates during payment
- Comprehensive error handling and user feedback
- Integration with service status for availability checks

### Configuration Management
- EmailJS configuration for contact forms
- Service status monitoring configuration
- Promotional content management system
- Download statistics integration

### Development Workflow
1. Use `npm run dev` for development with hot reload
2. Test purchase flows using provided test pages
3. Check service integrations via status monitoring
4. Run linting before commits
5. Build and preview before deployment

### File Organization
- Keep components focused and under 500 lines when possible
- Use descriptive component names that match their purpose
- Place related functionality in appropriate service modules
- Maintain consistent import patterns and file structure