# Ad-Screen Application Requirement Document

## 1. Project Overview
**Application Name**: Ad-Screen
**Purpose**: A comprehensive web-based platform for advertising agencies and businesses to discover, book, and manage outdoor advertising screens (billboards, digital displays, etc.) in various locations (Kuwait, Saudi Arabia, etc.).

## 2. Technology Stack
- **Frontend**: React.js (Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid) with a custom "Glassmorphism" light-mode theme.
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 3. Core Features & Functional Requirements

### 3.1 Authentication
- **Login Page**: Secure entry point requiring Tenant ID, Email, and Password.
- **Validation**: Checks for empty fields and valid email format.
- **Mock Authentication**: Simulates a login process storing user session.

### 3.2 Dashboard
- **Overview Statistics**: Real-time summary cards displaying counts for:
  - Submitted Campaigns
  - Booked Campaigns
  - Running Campaigns
  - Completed Campaigns
- **Recent Activity**: A tabular view of the most recent campaigns with status badges.
- **Responsive Layout**: Adapts to mobile and desktop screens.

### 3.3 Campaign Management
- **Campaign List**: A searchable and filterable table view of all campaigns.
- **Filtering**: Filter by Campaign Status (All, Submitted, Booked, Running, Completed).
- **Navigation**: "View" button to access detailed campaign information.
- **Campaign Details Page**:
  - **Status Timeline**: Visual progress bar showing the campaign's lifecycle.
  - **Two-Column Layout**: Left side for general info, right side for financial breakdown and selected screens.
  - **Dynamic UI**: Status badges and colors update based on the current state.

### 3.4 Campaign Creation Wizard
A guided 6-step process to book new ads:
1.  **Campaign Basics**: Input Campaign Name and Duration (Start/End Dates).
2.  **Select Screens (Discovery)**:
    - **Filter Bar**: Fixed at the top (Search, Country, Type, Location).
    - **Screen Grid**: Scrollable list of available screens with images and specs.
    - **View Modes**: List View and Mock Map View.
    - **Selection**: Add/Remove screens to the cart.
    - **Detail View**: Pop-up or expanded view for screen technical specifications (Resolution, Size).
3.  **Slot Selection**: Choose specific time slots for the selected screens.
4.  **Pricing Review**: Detailed cost breakdown (Base Cost, VAT, Total) in **KWD** currency.
5.  **Media Upload**: Interface to upload creative assets (Images/Videos).
6.  **Final Review**: Summary of all data before submission.

### 3.5 User Profile
- **User Info**: Displays Name, Email, Tenant ID, and Role.
- **Security Settings**: Feature to update the user's password with validation (simulated).

## 4. UI/UX Design Requirements
- **Theme**: "Premium" Light Mode with monochrome aesthetics (Black/White/Greys).
- **Layout**:
  - **Sidebar Navigation**: Collapsible left sidebar (Text + Icons on Desktop, Icons only on Tablet/Mobile).
  - **Responsive Design**: Tables scroll horizontally on mobile; Layouts stack vertically on smaller screens.
- **Fixed Elements**: In the Wizard (Step 2), the Header and Footer are fixed to ensure controls are always visible while the content scrolls.

## 5. Login Credentials (Demo/Mock)
Use the following credentials to access the application:

| Field | Value |
| :--- | :--- |
| **Tenant ID** | `AGENCY_01` |
| **Email** | `user@demo.com` |
| **Password** | *Any non-empty string* (e.g., `password123`) |

## 7. Theme & Design System

### 7.1 Visual Style
The application utilizes a **Light Mode High-Contrast Monochrome** theme. It relies heavily on "Glassmorphism" to create depth and a premium feel.
- **Glassmorphism**: Panels and Cards use a semi-transparent white background with a blur backdrop filter (`backdrop-filter: blur(12px)`) and a subtle white border.
- **Shadows**: Soft, multi-layered shadows are used to lift elements off the page (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)`).

### 7.2 Color Details
The system uses **HSL (Hue, Saturation, Lightness)** variables for precise control.

| Variable Name | HSL Value | Hex Approx | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `0 0% 0%` | `#000000` | Main buttons, Active states, Headings |
| **Background** | `0 0% 98%` | `#FAFAFA` | Global Page Background |
| **Card Background** | `0 0% 100%` | `#FFFFFF` | Cards, Panels, Modals |
| **Text Main** | `0 0% 9%` | `#171717` | Primary text content |
| **Text Muted** | `0 0% 40%` | `#666666` | Secondary labels, descriptions |
| **Border** | `0 0% 90%` | `#E5E5E5` | Structural dividers |
| **Status Success** | `142 76% 36%` | `#16A34A` | "Completed" badges |
| **Status Warning** | `24 90% 55%` | `#F97316` | "Submitted/Pending" badges |
| **Status Running** | `217 91% 60%` | `#3B82F6` | "Running" badges |

### 7.3 Typography
- **Font Family**: System Sans-Serif stack (`Inter`, `system-ui`, `sans-serif`).
- **Weights**:
  - **Regular (400)**: Body text
  - **Medium (500)**: Navigation links, buttons
  - **Semi-Bold (600)**: Section headers, emphatic text
  - **Bold (700)**: Page Titles, critical numbers
