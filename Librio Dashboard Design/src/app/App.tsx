import React, { useState, useMemo } from "react";
import { Search, Bell, Mail, Users, ChevronDown as ChevronDownNav, MessageCircle } from "lucide-react";

{/* MARKER-MAKE-KIT-INVOKED */}

const BOOKS = [
  {
    id: 1,
    title: "Naruto, Vol. 1: Uzumaki Naruto",
    titleSort: "Naruto, Vol. 1: Uzumaki Naruto",
    author: "Kishimoto, Masashi",
    authorSort: "Kishimoto",
    avgRating: 4.41,
    starCount: 5,
    shelf: "read" as const,
    dateAdded: "Jun 08, 2026",
    coverUrl: "https://images.unsplash.com/photo-1594007759138-855170ec8dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    coverAlt: "Naruto Vol 1 cover",
  },
  {
    id: 2,
    title: "One Piece, Volume 1: Romance Dawn",
    titleSort: "One Piece, Volume 1: Romance Dawn",
    author: "Oda, Eiichiro",
    authorSort: "Oda",
    avgRating: 4.49,
    starCount: 5,
    shelf: "currently-reading" as const,
    dateAdded: "Jun 08, 2026",
    coverUrl: "https://images.unsplash.com/photo-1741825209068-ffb66c82e302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    coverAlt: "One Piece Vol 1 cover",
  },
  {
    id: 3,
    title: "A Game of Thrones",
    titleSort: "A Game of Thrones",
    author: "Martin, George R.R.",
    authorSort: "Martin",
    avgRating: 4.45,
    starCount: 5,
    shelf: "currently-reading" as const,
    dateAdded: "Jun 08, 2026",
    coverUrl: "https://images.unsplash.com/photo-1515255384510-23e8b6a6ca3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    coverAlt: "A Game of Thrones cover",
  },
  {
    id: 4,
    title: "Bleach, Vol. 1",
    titleSort: "Bleach, Vol. 1",
    author: "Kubo, Tite",
    authorSort: "Kubo",
    avgRating: 4.27,
    starCount: 3,
    shelf: "read" as const,
    dateAdded: "Jun 08, 2026",
    coverUrl: "https://images.unsplash.com/photo-1709675577966-6231e5a2ac43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    coverAlt: "Bleach Vol 1 cover",
  },
];

type Shelf = "all" | "want-to-read" | "currently-reading" | "read";
type SortField = "title" | "author" | null;
type SortDir = "asc" | "desc";

// Displays N filled stars + (5-N) empty stars — no partial stars
function StarDisplay({ filled }: { filled: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < filled ? "#e07b39" : "#d4c9bc", fontSize: 16, lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

function ShelfLabel({ shelf }: { shelf: "read" | "currently-reading" | "want-to-read" }) {
  const map = {
    "read": { label: "read", color: "#00635d" },
    "currently-reading": { label: "currently-reading", color: "#00635d" },
    "want-to-read": { label: "want to read", color: "#00635d" },
  };
  const s = map[shelf];
  return (
    <span style={{ fontSize: 13, color: s.color, fontFamily: "Arial, sans-serif" }}>
      {s.label}
    </span>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeShelf, setActiveShelf] = useState<Shelf>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...BOOKS];

    if (activeShelf !== "all") {
      rows = rows.filter((b) => b.shelf === activeShelf);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    if (sortField === "title") {
      rows.sort((a, b) =>
        sortDir === "asc"
          ? a.titleSort.localeCompare(b.titleSort)
          : b.titleSort.localeCompare(a.titleSort)
      );
    } else if (sortField === "author") {
      rows.sort((a, b) =>
        sortDir === "asc"
          ? a.authorSort.localeCompare(b.authorSort)
          : b.authorSort.localeCompare(a.authorSort)
      );
    }

    return rows;
  }, [searchQuery, activeShelf, sortField, sortDir]);

  const shelfCounts = {
    all: BOOKS.length,
    "want-to-read": BOOKS.filter((b) => b.shelf === "want-to-read").length,
    "currently-reading": BOOKS.filter((b) => b.shelf === "currently-reading").length,
    read: BOOKS.filter((b) => b.shelf === "read").length,
  };

  const iconCircle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#c9bfb5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
    flexShrink: 0,
  };

  const thStyle: React.CSSProperties = {
    padding: "6px 10px",
    textAlign: "left",
    fontWeight: 700,
    color: "#372213",
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    whiteSpace: "nowrap",
    background: "transparent",
  };

  const tdStyle: React.CSSProperties = {
    padding: "10px 10px",
    verticalAlign: "top",
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span style={{ color: "#aaa", fontSize: 11, marginLeft: 2 }}>↕</span>;
    return sortDir === "asc"
      ? <span style={{ color: "#372213", fontSize: 11, marginLeft: 2 }}>↑</span>
      : <span style={{ color: "#372213", fontSize: 11, marginLeft: 2 }}>↓</span>;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* TOP NAV — beige background only */}
      <nav style={{
        background: "#f4f1ea",
        borderBottom: "1px solid #d6cfc4",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        height: 44,
        gap: 0,
      }}>
        {/* Logo — Playfair Display serif, upright bold, matches Goodreads wordmark style */}
        <div style={{ marginRight: 20, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24,
            fontWeight: 400,
            color: "#372213",
            letterSpacing: "0px",
            fontStyle: "normal",
          }}>
            goodreads
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, flex: 1 }}>
          {["Home", "My Books"].map((label) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: "#372213",
                fontSize: 13,
                padding: "0 12px",
                height: 44,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                borderBottom: label === "My Books" ? "2px solid #372213" : "2px solid transparent",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {label}
            </a>
          ))}
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#372213", fontSize: 13, padding: "0 12px", height: 44, display: "flex", alignItems: "center", textDecoration: "none", gap: 3, fontFamily: "Arial, sans-serif" }}>
            Browse <ChevronDownNav size={12} />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#372213", fontSize: 13, padding: "0 12px", height: 44, display: "flex", alignItems: "center", textDecoration: "none", gap: 3, fontFamily: "Arial, sans-serif" }}>
            Community <ChevronDownNav size={12} />
          </a>
        </div>

        {/* Search bar — wide, like Goodreads */}
        <div style={{ position: "relative", marginRight: 10, flex: "0 0 340px" }}>
          <input
            type="text"
            placeholder="Search books"
            style={{
              border: "1px solid #c9bfb5",
              borderRadius: 3,
              padding: "5px 34px 5px 10px",
              fontSize: 13,
              width: "100%",
              background: "#fff",
              color: "#372213",
              fontFamily: "Arial, sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 34, background: "#e8e1d9", borderLeft: "1px solid #c9bfb5", borderRadius: "0 3px 3px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
            <Search size={14} color="#5d4e3c" />
          </div>
        </div>

        {/* Right icons — beige circles, no username */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {/* Bell */}
          <div style={iconCircle}><Bell size={14} color="#fff" strokeWidth={1.8} /></div>
          {/* Messaging — speech bubble style */}
          <div style={iconCircle}><MessageCircle size={14} color="#fff" strokeWidth={1.8} /></div>
          {/* Mail */}
          <div style={iconCircle}><Mail size={14} color="#fff" strokeWidth={1.8} /></div>
          {/* Friends */}
          <div style={iconCircle}><Users size={14} color="#fff" strokeWidth={1.8} /></div>
          {/* Profile — lighter circle to indicate logged-in user */}
          <div style={{ ...iconCircle, background: "#c9bfb5" }}>
            {/* person reading silhouette approximated with SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#fff" />
            </svg>
          </div>
        </div>
      </nav>

      {/* PAGE BODY */}
      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", padding: "16px 12px" }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: 168, flexShrink: 0, marginRight: 24 }}>

          {/* "My Books" heading sits above Bookshelves, left-aligned */}
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a7b6e", margin: "0 0 12px 0", fontFamily: "Arial, sans-serif" }}>My Books</h1>

          {/* Bookshelves */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#372213", fontFamily: "Arial, sans-serif" }}>Bookshelves</span>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>(Edit)</a>
            </div>
            {([
              ["all", `All (${shelfCounts.all})`],
              ["want-to-read", `Want to Read (${shelfCounts["want-to-read"]})`],
              ["currently-reading", `Currently Reading (${shelfCounts["currently-reading"]})`],
              ["read", `Read (${shelfCounts.read})`],
            ] as [Shelf, string][]).map(([shelf, label]) => (
              <div key={shelf} style={{ marginBottom: 1 }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveShelf(shelf); }}
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: activeShelf === shelf ? "#372213" : shelf === "all" ? "#999" : "#00635d",
                    fontWeight: activeShelf === shelf ? 700 : 400,
                    textDecoration: "none",
                    padding: "1px 0",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {label}
                </a>
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>all (0)</a>
            </div>
            <div style={{ marginTop: 6 }}>
              <button style={{
                fontSize: 11,
                color: "#555",
                border: "1px solid #c9bfb5",
                background: "#fff",
                borderRadius: 3,
                padding: "2px 8px",
                cursor: "default",
                fontFamily: "Arial, sans-serif",
              }}>
                + Add shelf
              </button>
            </div>
          </div>

          {/* Your reading activity */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#372213", marginBottom: 5, fontFamily: "Arial, sans-serif" }}>Your reading activity</div>
            {["Review Drafts", "Kindle Notes & Highlights", "Reading Challenge", "Year in Books", "Reading stats"].map((item) => (
              <div key={item} style={{ marginBottom: 1 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>{item}</a>
              </div>
            ))}
          </div>

          {/* Add books */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#372213", marginBottom: 5, fontFamily: "Arial, sans-serif" }}>Add books</div>
            {["Amazon book purchases", "Recommendations", "Explore"].map((item) => (
              <div key={item} style={{ marginBottom: 1 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>{item}</a>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#372213", marginBottom: 5, fontFamily: "Arial, sans-serif" }}>Tools</div>
            {["Find duplicates", "Widgets", "Import and export"].map((item) => (
              <div key={item} style={{ marginBottom: 1 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>{item}</a>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Top actions bar — search + Batch Edit / Settings / Stats / Print / view icons, with separator below */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingBottom: 10, marginBottom: 12, borderBottom: "1px solid #d6cfc4", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Search and add books */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search and add books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: "1px solid #c9bfb5",
                    borderRadius: 3,
                    padding: "3px 26px 3px 7px",
                    fontSize: 12,
                    width: 180,
                    background: "#fff",
                    color: "#372213",
                    fontFamily: "Arial, sans-serif",
                    outline: "none",
                  }}
                />
                <Search size={12} style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", color: "#888" }} />
              </div>
              {["Batch Edit", "Settings", "Stats", "Print"].map((btn) => (
                <a key={btn} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>{btn}</a>
              ))}
              {/* View mode icons */}
              <div style={{ display: "flex", gap: 2 }}>
                <div style={{ width: 22, height: 22, border: "1px solid #c9bfb5", background: "#e8e1d9", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, cursor: "default" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,5px)", gap: 1 }}>
                    {[0,1,2,3].map(i => <div key={i} style={{ width: 5, height: 5, background: "#8b7355", borderRadius: 1 }} />)}
                  </div>
                </div>
                <div style={{ width: 22, height: 22, border: "1px solid #c9bfb5", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, cursor: "default" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 10, height: 2, background: "#c9bfb5" }} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE — no outer border, no column dividers, only horizontal row lines */}
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #d6cfc4" }}>
                <th style={thStyle}>cover</th>
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("title")}>
                  title <SortIcon field="title" />
                </th>
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("author")}>
                  author <SortIcon field="author" />
                </th>
                <th style={thStyle}>avg<br />rating</th>
                <th style={thStyle}>rating</th>
                <th style={thStyle}>shelves</th>
                <th style={thStyle}>review</th>
                <th style={thStyle}>date<br />read</th>
                <th style={thStyle}>date<br />added</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: "24px", textAlign: "center", color: "#888", fontFamily: "Arial, sans-serif", fontSize: 13 }}>
                    No books match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr key={book.id} style={{ borderBottom: "1px solid #d6cfc4" }}>
                    <td style={tdStyle}>
                      <img src={book.coverUrl} alt={book.coverAlt} style={{ width: 40, height: 56, objectFit: "cover", display: "block", border: "1px solid #d6cfc4" }} />
                    </td>
                    <td style={{ ...tdStyle, maxWidth: 200 }}>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#372213", fontWeight: 600, lineHeight: 1.3 }}>{book.title}</div>
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#372213" }}>{book.author}</span>
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#372213" }}>{book.avgRating.toFixed(2)}</span>
                    </td>
                    <td style={tdStyle}>
                      <StarDisplay filled={book.starCount} />
                    </td>
                    <td style={tdStyle}>
                      <ShelfLabel shelf={book.shelf} />
                      <div style={{ marginTop: 2 }}>
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>[edit]</a>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>Write a review</a>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: "#888" }}>not<br />set</div>
                      <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>[edit]</a>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#372213", whiteSpace: "nowrap" }}>{book.dateAdded}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>edit</a>
                        <span style={{ fontSize: 11, color: "#aaa" }}>✕</span>
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>view</a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer info */}
          <div style={{ marginTop: 10, fontSize: 11, color: "#888", fontFamily: "Arial, sans-serif" }}>
            Showing {filtered.length} of {BOOKS.length} book{BOOKS.length !== 1 ? "s" : ""}
          </div>
        </main>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #d6cfc4", padding: "12px 24px", marginTop: 32, textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "#888", fontFamily: "Arial, sans-serif" }}>
          Librio · Created by Dawn Brewer &amp; Abdoul Ba · Powered by goodreads
        </span>
      </div>
    </div>
  );
}
