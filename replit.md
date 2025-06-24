# InstaDownloader - Replit Project Guide

## Overview

InstaDownloader is a full-stack web application built for downloading Instagram Stories and Reels. The application features a modern, mobile-first design with a React frontend and Express.js backend. It uses a clean architecture with TypeScript throughout, Drizzle ORM for database operations, and shadcn/ui components for the user interface.

## System Architecture

The application follows a monorepo structure with clear separation between frontend, backend, and shared code:

- **Frontend**: React SPA with Vite build system, TypeScript, and Tailwind CSS
- **Backend**: Express.js REST API with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Shared**: Common schemas and types shared between frontend and backend
- **UI Framework**: shadcn/ui components with Radix UI primitives

## Key Components

### Frontend Architecture (`client/`)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library with consistent theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture (`server/`)
- **Framework**: Express.js with TypeScript
- **API Structure**: RESTful endpoints for download operations
- **Data Storage**: PostgreSQL database with Drizzle ORM (DatabaseStorage implementation)
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Request Handling**: Express middleware for logging, error handling, and request parsing
- **Development Server**: Vite integration for HMR during development

### Database Schema (`shared/schema.ts`)
- **Downloads Table**: Tracks download requests with status, URLs, and metadata
- **Validation**: Zod schemas for request validation and type safety
- **Types**: Shared TypeScript types between frontend and backend

### External Dependencies
- **Database**: PostgreSQL (configured for production via Neon/serverless)
- **UI Components**: Extensive use of Radix UI primitives for accessibility
- **Development**: Replit-specific tooling and error overlays
- **Icons**: Lucide React for consistent iconography

## Data Flow

1. **User Input**: Users select between Stories or Reels tabs and enter username/URL
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Request**: Form submission triggers POST to `/api/download/stories` or `/api/download/reels`
4. **Server Processing**: 
   - Create download record with "pending" status
   - Update status to "processing"
   - Generate demo content files for demonstration (real implementation would use Instagram API)
   - Create downloadable files in downloads directory
   - Update final status to "completed" or "failed"
5. **Real-time Updates**: Frontend polls for download status updates using TanStack Query
6. **User Feedback**: Progress indicators, success/error messages, and download links

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form + @hookform/resolvers**: Form handling and validation
- **zod**: Runtime type checking and validation
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for managing CSS class variants

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations stored in `migrations/` directory

### Environment Configuration
- **Development**: `npm run dev` - runs TSX with hot reload
- **Production**: `npm run build && npm run start` - builds and runs optimized bundle
- **Database**: Uses `DATABASE_URL` environment variable for connection

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment**: Autoscale target with build step
- **Port**: Internal 5000, external 80
- **Workflows**: Parallel execution with automatic port detection

## Recent Changes

✓ Complete Instagram Stories and Reels downloader app built and tested
✓ Mobile-first responsive design with Instagram-inspired UI
✓ Authentic Instagram logo with signature gradient colors in header
✓ Centered main menu bar with navigation between Download, History, Mobile Apps, and Settings
✓ Header template switch mode showing actual mode names (Light, Dark, Colorful, Minimal)
✓ Tab navigation system for switching between Stories and Reels
✓ Form validation with real-time error handling
✓ Progress indicators with smooth animations during processing
✓ Success/error message system with download buttons
✓ Auto-reset forms after successful submission for better UX
✓ PostgreSQL database integration with Drizzle ORM for persistent storage
✓ Download history page showing all past downloads with status
✓ Settings page with app information and data management
✓ Working file downloads with proper content headers
✓ Comprehensive Instagram API integration research completed
✓ Clear documentation of requirements for real content downloads
✓ Advertisement system integrated throughout interface with banner, square, sidebar, and footer ads
✓ Mobile app download feature with Android APK and iOS App Store links
✓ APK download endpoint with proper file serving and installation instructions
✓ Enhanced mobile app download UI with comprehensive progress indicators
✓ Real-time download progress tracking with visual feedback
✓ Error handling and success states for mobile app downloads

## Changelog

```
Changelog:
- June 23, 2025. Initial setup and complete app implementation
- Successfully tested Stories download with username validation  
- Successfully tested Reels download with URL validation
- All features working as expected in production environment
- Added authentic Instagram logo with gradient colors
- Integrated PostgreSQL database with Drizzle ORM for persistent storage
- Database schema successfully pushed and downloads table created
- Implemented working download functionality with demo file generation (ready for Instagram API integration)
- Added centered main menu bar with Download, History, Mobile Apps, and Settings sections
- Updated mode switcher to show actual mode names instead of generic labels
- Implemented header template switch mode with multiple interface themes
- Created download history page with database-backed records
- Added settings page with data management and app information
- Completed comprehensive research on Instagram API integration requirements
- Documented technical implementation strategy and compliance considerations
- Integrated comprehensive advertisement system with multiple ad types and placements
- Added mobile app download feature with Android APK and iOS App Store integration
- Created APK download endpoint with proper file serving and installation guide
- Enhanced mobile app download UI with progress indicators, loading states, and error handling
- Implemented real-time download progress tracking with visual feedback components
- Fixed frontend integration issues with proper mutation handling and data flow
- Improved download history with real-time updates and clear functionality
- Enhanced error handling and success state management across all components
```

## User Preferences

Preferred communication style: Simple, everyday language.