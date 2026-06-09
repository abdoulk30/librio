# Product Requirements Document (PRD)

## Goodreads Clone

**Build Name:** Goodreads Clone
**Owner:** Dawn Brewer and Abdoul Ba
**Date:** June 8, 2026

---

# 1. Problem

Readers viewing a large catalog of books on a digital inventory dashboard struggle to quickly isolate specific titles or reorder their layout without robust search and sorting mechanisms. Lacking active on-page filtering tools makes finding a specific book, author, or entry pattern tedious when scrolling through an unmanaged list.

## 1a. Opportunity

Recreate a single-page web utility that showcases the core desktop library data management experience of Goodreads.

By focusing exclusively on on-page table manipulation (text search filtering and column header sorting), this project provides a lightweight, highly accurate demonstration of localized array operations within a mirrored user interface layout.

## 1b. Users & Needs

### Primary User

A reader interacting with a digital bookshelf catalog who needs to reorder or subset their table rows on demand.

### User Needs

* As a reader, I need to type text into an on-page search box so that the book rows automatically filter down to match my query.
* As a reader, I need to click on a column header (such as Title or Author) so that the matching list of books instantly sorts in ascending or descending order based on that metric.

---

# 2. Proposed Solution

Goodreads Clone is a web-based single-page application that accurately replicates the layout of the Goodreads **"My Books"** workspace.

The top navigation menu and left sidebar are rendered statically to preserve the visual identity of the platform. Functional scope is intentionally limited to the **Interactive Table Filtering & Sorting Engine**, which consists of:

* The **"Search and add books"** input field
* Clickable **Title** and **Author** table headers

Typing a keyword narrows visible rows in real time, while clicking a column header instantly sorts the active dataset between ascending (A–Z) and descending (Z–A) order.

## 2a. Value Proposition

Readers use Goodreads Clone to display a personal collection, quickly locate specific records through text filtering, and reorder data instantly through sorting interactions.

Unlike generalized reading trackers, the application focuses on delivering a pixel-accurate recreation of the desktop bookshelf experience while limiting functionality to localized filtering and sorting behaviors.

## 2b. Core MVP Value Proposition

### Interactive Features (Fully Functional)

#### Text Search Filtering

An active text box labeled **"Search and add books"** is positioned directly above the table.

Typing text:

* Runs a live query against the dataset
* Matches title and author fields
* Updates visible rows in real time

#### Column Header Sorting

Clickable column headers include:

* Title
* Author

Clicking a header:

* Sorts the dataset locally
* Toggles between ascending and descending order
* Updates immediately without refreshing the page

### Static Interface Components (Visual Only)

The following UI elements are rendered for visual fidelity only:

* Top navigation bar
* Goodreads-style logo area
* Global search container
* Bookshelf sidebar

  * All
  * Want to Read
  * Currently Reading
  * Read
* Average rating column
* Review column
* Date added column

---

## 2c. Goals & Non-Goals

### Goals

* Replicate the layout, geometry, text placement, and visual structure of the Goodreads "My Books" screen.
* Populate the table with the baseline bookshelf dataset.
* Deliver fully operational search filtering.
* Deliver fully operational title and author sorting.

### Non-Goals

* Functional bookshelf navigation
* Database-backed add/delete functionality
* Dynamic book creation
* Authentication or account systems
* Edit workflows
* Reading challenges
* Social activity feeds
* Community reviews
* External APIs
* Modal workflows

---

## 2d. Success Metrics

| Goal               | Signal                                     | Metric                         | Target                              |
| ------------------ | ------------------------------------------ | ------------------------------ | ----------------------------------- |
| Visual Replication | Layout mirrors Goodreads workspace         | Structural alignment parity    | 100% visual replication match       |
| Functional Parity  | Search and sorting update rows dynamically | Data manipulation success rate | 100% filtering and sorting accuracy |

---

# 3. Requirements

## User Journey 1: Viewing the "My Books" Layout

### Context

The user opens a dashboard that visually functions as an exact snapshot of the Goodreads desktop workspace.

### Sub-Journey: Primary Container Layouts

#### [P0]

User can view a top navigation banner containing:

* Brand logo
* Home
* My Books
* Browse
* Community
* Static global search container

#### [P0]

User can view a complete left sidebar containing:

**Bookshelves**

* All
* Want to Read
* Currently Reading
* Read

**Additional Sections**

* Your Reading Activity
* Tools

---

### Sub-Journey: Inventory Table Display

#### [P0]

User can view a multi-column inventory table containing:

* Cover
* Title
* Author
* Avg Rating
* Shelves
* Review
* Date Added

#### [P0]

User can view rows populated with the following titles:

* *Naruto, Vol. 1: Uzumaki Naruto* — Kishimoto, Masashi
* *One Piece, Volume 1: Romance Dawn* — Oda, Eiichiro
* *A Game of Thrones* — Martin, George R.R.
* *Bleach, Vol. 1* — Kubo, Tite

---

## User Journey 2: Filtering and Sorting Rows

### Context

The user interacts with the search field and sortable column headers to modify the visible table configuration.

### Sub-Journey: Inline Search Text Filtering

#### [P0]

User can type into the interactive **"Search and add books"** input field.

#### [P0]

System evaluates user input in real time and hides rows that do not contain matching strings in either:

* Title
* Author

#### [P0]

System immediately restores all rows when the search field is cleared.

---

### Sub-Journey: Interactive Column Sorting

#### [P0]

User can click the **Title** header.

#### [P0]

User can click the **Author** header.

#### [P0]

When the Title header is clicked:

* Rows sort alphabetically by title
* Second click reverses the order
* Toggle switches between A–Z and Z–A

#### [P0]

When the Author header is clicked:

* Rows sort alphabetically by author
* Second click reverses the order
* Toggle switches between A–Z and Z–A

#### [P0]

User can view a visual indicator showing:

* Active sort column
* Current sort direction

---

# 4. Appendix

## Build Parameters

### Static Scope

Every button, link, and control outside of the search field and sortable table headers functions strictly as a non-interactive visual element.

### Figma Make Deployment Stack

The application uses a reactive local array dataset to power filtering and sorting operations.

All interactions:

* Execute within local state
* Update instantly
* Require no page reloads
* Require no backend services
* Require no external API calls

---

## Technical Summary

### Architecture

* Single-Page Application (SPA)
* Client-side state management
* Localized dataset processing
* Reactive UI updates

### Functional Scope

**Interactive Components**

* Search input
* Title sort header
* Author sort header

**Static Components**

* Navigation bar
* Sidebar
* Bookshelf links
* Ratings
* Reviews
* Date metadata
* Decorative interface controls

### Dataset

| Title                             | Author              |
| --------------------------------- | ------------------- |
| Naruto, Vol. 1: Uzumaki Naruto    | Kishimoto, Masashi  |
| One Piece, Volume 1: Romance Dawn | Oda, Eiichiro       |
| A Game of Thrones                 | Martin, George R.R. |
| Bleach, Vol. 1                    | Kubo, Tite          |
|                                   |                     |
