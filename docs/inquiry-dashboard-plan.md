# Inquiry And Client Dashboard Plan

## 1. Feature Planning

### Public inquiry intake
- Guided contact form with project type, timeline, budget, priorities, and detailed scope.
- Server-side validation, normalized payload handling, and persistent storage.
- Automatic client creation or client matching by email.

### Admin dashboard
- Secure admin login with signed session cookie.
- Dashboard overview with inquiry counts, reminder health, and conversion signals.
- Inquiry inbox with search, status filters, source tracking, and next follow-up visibility.
- Inquiry detail view with project brief, status history, internal notes, and reminders.

### Pipeline and follow-up
- Status update workflow for each inquiry.
- Reminder scheduling for calls, quotes, nudges, and check-ins.
- Overdue reminder surfacing on the dashboard and inquiry list.

### Client management
- Dedicated client records linked to inquiries.
- Stage tracking for leads, qualified clients, active clients, and past clients.
- Quick notes and latest activity visibility per client.

### Analytics
- Pipeline distribution by inquiry status.
- Client stage distribution.
- Service demand breakdown.
- Recent inquiry volume trend.
- Reminder health: pending, due soon, overdue.

## 2. Database Design

### `clients`
- `id`
- `name`
- `email`
- `company`
- `website`
- `stage`
- `notes`
- `source_page`
- `created_at`
- `updated_at`

### `inquiries`
- `id`
- `client_id`
- `title`
- `service_id`
- `timeline_id`
- `budget_id`
- `priorities_json`
- `pages_scope`
- `details`
- `status`
- `source_page`
- `client_ip`
- `user_agent`
- `submitted_at`
- `last_status_changed_at`
- `updated_at`

### `inquiry_status_history`
- `id`
- `inquiry_id`
- `from_status`
- `to_status`
- `note`
- `created_at`

### `inquiry_notes`
- `id`
- `inquiry_id`
- `body`
- `created_at`

### `follow_up_reminders`
- `id`
- `inquiry_id`
- `client_id`
- `title`
- `note`
- `due_at`
- `status`
- `completed_at`
- `created_at`
- `updated_at`

### Migration strategy
- Keep the existing `project_requests` table intact.
- Migrate old rows into the new relational structure on startup.
- Reuse the legacy primary key as the new inquiry ID where possible.

## 3. Dashboard Page Structure

### `/admin`
- KPI cards
- Status pipeline
- Client stage distribution
- Service demand breakdown
- Recent inquiries
- Urgent follow-ups

### `/admin/inquiries`
- Search and filters
- Inquiry summary cards
- Status badge
- Next reminder state
- Quick link to inquiry detail

### `/admin/inquiries/[id]`
- Client summary
- Project brief
- Status update form
- Internal notes form and note history
- Reminder scheduler and reminder list
- Status history

### `/admin/follow-ups`
- Pending reminders
- Overdue reminders
- Complete and dismiss actions

### `/admin/clients`
- Client summary cards
- Stage filter
- Latest inquiry
- Stage update
- Internal client notes

## 4. API Planning

### Public
- `POST /api/inquiries`
  - Accepts public contact form payload.
  - Validates, creates or updates client, creates inquiry.

### Admin auth
- `GET /api/admin/session`
  - Returns current session state.
- `POST /api/admin/session`
  - Validates credentials and sets session cookie.
- `POST /api/admin/logout`
  - Clears session cookie.

### Admin domain actions
- Server actions handle status changes, note creation, reminder updates, and client updates.
- Direct server-side data access is used for SSR dashboard pages to avoid unnecessary network hops.

## 5. UI Component Breakdown

### Shared admin chrome
- Admin sidebar navigation
- Dashboard header
- Metric card
- Section card

### Inquiry UI
- Inquiry status badge
- Inquiry filter bar
- Inquiry list card
- Inquiry brief panel
- Inquiry timeline section

### Reminder UI
- Reminder status badge
- Reminder card
- Reminder action buttons

### Client UI
- Client stage badge
- Client summary card
- Client quick-edit forms

### Analytics UI
- KPI grid
- Horizontal distribution bars
- Recent activity list
