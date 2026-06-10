# Librio - Table Filter & Sort Engine

**Project Contributors:** Dawn Brewer and Abdoul Ba
**Environment:** Figma Make Sandbox

A pixel-accurate desktop interface clone of the Goodreads **"My Books"** dashboard workspace, developed inside the Figma Make sandbox environment.

Librio strips away platform clutter—including social activity feeds, recommendation algorithms, and community reviews—to deliver a hyper-focused, single-page utility dashboard. The primary goal of the project is to demonstrate localized array manipulation through real-time text filtering and dual-direction column sorting on a structured dataset representing a user's digital bookshelf.

---
## Local Development

See [SETUP.md](./SETUP.md) for detailed installation and development instructions.

## 🚀 Core Features

### 1. Interactive Table Filtering & Sorting Engine

#### Real-Time Text Search Filtering

Using the **"Search and add books"** input field located directly above the data grid, users can instantly filter bookshelf entries by typing a keyword.

* Supports partial string matching
* Searches both book titles and author names
* Updates results in real time as the user types
* Clearing the search field immediately restores the full dataset

#### Bi-Directional Column Sorting

Users can click the **Title** or **Author** table headers to sort the bookshelf alphabetically.

* First click sorts in ascending order (A–Z)
* Second click toggles to descending order (Z–A)
* Active sort direction is displayed using a visual indicator icon
* Sorting is performed entirely on the client-side dataset

---

## 🖥️ Static Desktop Interface Blueprint

To preserve the visual identity and structural layout of Goodreads, surrounding interface components are rendered as static, non-interactive UI elements.

### Global Layout Frame

Includes:

* Goodreads-inspired logo area
* Static global search bar
* Navigation links:

  * Home
  * Browse
  * Community

### Bookshelf Sidebar

Displays a stylized bookshelf navigation panel featuring:

* All
* Want to Read
* Currently Reading
* Read

Additional informational sections include:

* Your Reading Activity
* Tools

### Static Table Elements

The table preserves the appearance of the original platform by displaying:

* Cover thumbnails
* Average rating values
* Shelf status labels
* Review text placeholders
* Date-added metadata

These elements are visual only and contain no interactive functionality.

---

## 📊 Baseline Dataset

The application ships with a localized bookshelf dataset containing the following titles:

| Cover | Title                             | Author              | Avg Rating | Shelf             |
| ----- | --------------------------------- | ------------------- | ---------- | ----------------- |
| 📙    | Naruto, Vol. 1: Uzumaki Naruto    | Kishimoto, Masashi  | 4.41       | Read              |
| 📘    | One Piece, Volume 1: Romance Dawn | Oda, Eiichiro       | 4.49       | Currently Reading |
| 📕    | A Game of Thrones                 | Martin, George R.R. | 4.45       | Currently Reading |
| 📗    | Bleach, Vol. 1                    | Kubo, Tite          | 4.27       | Read              |

---

## 🛠️ Build & Architecture

### Deployment Stack

Librio is implemented as a responsive **Single-Page Application (SPA)** within the Figma Make sandbox environment.

### State Management

All data operations are handled using localized state variables:

* Search input events update visible dataset entries
* Sort events transform array ordering
* No page refreshes occur during interaction
* No backend services are required

### Data Manipulation Scope

All filtering and sorting operations occur entirely in local memory.

The application:

1. Captures user interactions
2. Processes the bookshelf dataset in memory
3. Updates the rendered table view
4. Preserves a smooth, single-page experience

### No External Dependencies

The project intentionally avoids:

* External APIs
* Database connections
* Authentication systems
* Server-side processing
* Third-party data sources

---

## 🎯 Project Constraints

To maintain a focused project scope and satisfy development constraints:

* Only the search field and table header controls are interactive.
* All other buttons, links, and interface elements are decorative.
* The application serves as a demonstration of client-side filtering and sorting logic rather than a full bookshelf management platform.

---

## Learning Objectives

This project demonstrates:

* Client-side state management
* Array filtering techniques
* Array sorting algorithms
* Event-driven UI updates
* Interactive data presentation
* Pixel-accurate interface replication
* Single-page application architecture

---

## Future Enhancements

Potential future improvements include:

* Multi-column sorting
* Shelf filtering
* Dynamic book addition/removal
* Persistent local storage
* Pagination
* Mobile-responsive layouts
* Advanced search options
* Editable book metadata

---

## Authors

**Dawn Brewer**
**Abdoul Ba**
