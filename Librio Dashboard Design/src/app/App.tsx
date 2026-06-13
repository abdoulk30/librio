import React, { useState, useMemo } from "react";
import { Search, Bell, Mail, Users, ChevronDown as ChevronDownNav, MessageCircle } from "lucide-react";
import narutoCover from "../imports/naruto.png";
import onePieceCover from "../imports/onepiece.png";
import gameOfThronesCover from "../imports/agot.png";
import bleachCover from "../imports/bleach.png";
import fairyTailCover from "../imports/fairytail.png";
import wimpyKidCover from "../imports/diary.png";
import lightningThiefCover from "../imports/percy.png";
import attackOnTitanCover from "../imports/aot.png";
import batmanCover from "../imports/batman.png";
import myHeroAcademiaCover from "../imports/mha.png";
import spiderManCover from "../imports/spiderman.png";

{/* MARKER-MAKE-KIT-INVOKED */}

type BookShelf = "read" | "currently-reading" | "want-to-read" | "did-not-finish";

interface Book {
  id: number;
  title: string;
  titleSort: string;
  author: string;
  authorSort: string;
  avgRating: number;
  starCount: number;
  shelf: BookShelf;
  dateAdded: string;
  coverUrl: string;
  coverAlt: string;
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: "Naruto, Vol. 1: Uzumaki Naruto",
    titleSort: "Naruto, Vol. 1: Uzumaki Naruto",
    author: "Kishimoto, Masashi",
    authorSort: "Kishimoto",
    avgRating: 4.41,
    starCount: 5,
    shelf: "read",
    dateAdded: "Jun 08, 2026",
    coverUrl: narutoCover,
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
    shelf: "currently-reading",
    dateAdded: "Jun 08, 2026",
    coverUrl: onePieceCover,
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
    shelf: "currently-reading",
    dateAdded: "Jun 08, 2026",
    coverUrl: gameOfThronesCover,
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
    shelf: "read",
    dateAdded: "Jun 08, 2026",
    coverUrl: bleachCover,
    coverAlt: "Bleach Vol 1 cover",
  },
  {
    id: 5,
    title: "Fairy Tail, Vol. 01",
    titleSort: "Fairy Tail, Vol. 01",
    author: "Mashima, Hiro",
    authorSort: "Mashima",
    avgRating: 4.32,
    starCount: 4,
    shelf: "read",
    dateAdded: "Jun 09, 2026",
    coverUrl: fairyTailCover,
    coverAlt: "Fairy Tail Vol 01 cover",
  },
  {
    id: 6,
    title: "Diary of a Wimpy Kid (Diary of a Wimpy Kid, #1)",
    titleSort: "Diary of a Wimpy Kid (Diary of a Wimpy Kid, #1)",
    author: "Kinney, Jeff",
    authorSort: "Kinney",
    avgRating: 3.98,
    starCount: 4,
    shelf: "read",
    dateAdded: "Jun 09, 2026",
    coverUrl: wimpyKidCover,
    coverAlt: "Diary of a Wimpy Kid cover",
  },
  {
    id: 7,
    title: "The Lightning Thief (Percy Jackson and the Olympians, #1)",
    titleSort: "Lightning Thief, The (Percy Jackson and the Olympians, #1)",
    author: "Riordan, Rick",
    authorSort: "Riordan",
    avgRating: 4.31,
    starCount: 0,
    shelf: "want-to-read",
    dateAdded: "Jun 09, 2026",
    coverUrl: lightningThiefCover,
    coverAlt: "The Lightning Thief cover",
  },
  {
    id: 8,
    title: "Attack on Titan, Vol. 1",
    titleSort: "Attack on Titan, Vol. 1",
    author: "Isayama, Hajime",
    authorSort: "Isayama",
    avgRating: 4.48,
    starCount: 5,
    shelf: "read",
    dateAdded: "Jun 10, 2026",
    coverUrl: attackOnTitanCover,
    coverAlt: "Attack on Titan Vol 1 cover",
  },
  {
    id: 9,
    title: "Batman, Volume 1: The Court of Owls",
    titleSort: "Batman, Volume 1: The Court of Owls",
    author: "Snyder, Scott",
    authorSort: "Snyder",
    avgRating: 4.33,
    starCount: 0,
    shelf: "want-to-read",
    dateAdded: "Jun 10, 2026",
    coverUrl: batmanCover,
    coverAlt: "Batman Volume 1 cover",
  },
  {
    id: 10,
    title: "My Hero Academia, Vol. 1",
    titleSort: "My Hero Academia, Vol. 1",
    author: "Horikoshi, Kohei",
    authorSort: "Horikoshi",
    avgRating: 4.29,
    starCount: 4,
    shelf: "read",
    dateAdded: "Jun 10, 2026",
    coverUrl: myHeroAcademiaCover,
    coverAlt: "My Hero Academia Vol 1 cover",
  },
];

type Shelf = "all" | "want-to-read" | "currently-reading" | "read" | "did-not-finish";
type SortField = "title" | "author" | "avgRating" | "rating" | "dateRead" | "dateAdded" | null;
type SortDir = "asc" | "desc";

function StarDisplay({ filled }: { filled: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < filled ? "#e07b39" : "#d4c9bc", fontSize: 16, lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

function ShelfLabel({ shelf }: { shelf: BookShelf }) {
  const map = {
    "read": { label: "read", color: "#00635d" },
    "currently-reading": { label: "currently-reading", color: "#00635d" },
    "want-to-read": { label: "want to read", color: "#00635d" },
    "did-not-finish": { label: "did not finish", color: "#00635d" },
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
    } else if (sortField === "avgRating") {
      rows.sort((a, b) =>
        sortDir === "asc" ? a.avgRating - b.avgRating : b.avgRating - a.avgRating
      );
    } else if (sortField === "rating") {
      rows.sort((a, b) =>
        sortDir === "asc" ? a.starCount - b.starCount : b.starCount - a.starCount
      );
    } else if (sortField === "dateAdded") {
      rows.sort((a, b) => {
        const timeA = new Date(a.dateAdded).getTime();
        const timeB = new Date(b.dateAdded).getTime();
        return sortDir === "asc" ? timeA - timeB : timeB - timeA;
      });
    } else if (sortField === "dateRead") {
      rows.sort((a, b) => (sortDir === "asc" ? a.id - b.id : b.id - a.id));
    }

    return rows;
  }, [searchQuery, activeShelf, sortField, sortDir]);

  const shelfCounts = {
    all: BOOKS.length,
    "want-to-read": BOOKS.filter((b) => b.shelf === "want-to-read").length,
    "currently-reading": BOOKS.filter((b) => b.shelf === "currently-reading").length,
    read: BOOKS.filter((b) => b.shelf === "read").length,
    "did-not-finish": BOOKS.filter((b) => b.shelf === "did-not-finish").length,
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

  const bookLinkStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    fontSize: 13,
    color: "#00635d",
    textDecoration: "none",
    cursor: "pointer",
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span style={{ color: "#aaa", fontSize: 11, marginLeft: 2 }}>↕</span>;
    return sortDir === "asc"
      ? <span style={{ color: "#372213", fontSize: 11, marginLeft: 2 }}>↑</span>
      : <span style={{ color: "#372213", fontSize: 11, marginLeft: 2 }}>↓</span>;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      
      {/* Dynamic style block to control title/author hover decorations globally */}
      <style>{`
        .gr-book-link:hover {
          text-decoration: underline !important;
        }
      `}</style>

      {/* TOP NAV */}
      <nav style={{
        background: "#f4f1ea",
        borderBottom: "1px solid #d6cfc4",
        padding: "0 20px",
        display: "flex",
        justifyContent: "center",
        height: 50,
      }}>
        {/* Centered container wrapping all elements sequentially with no dead-space dividers */}
        <div style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 960,
          height: "100%",
          gap: 16,
        }}>
          {/* Logo - Shifted left smoothly using relative positioning so "Home" stays perfectly anchored */}
          <div style={{ marginRight: 8, flexShrink: 0, position: "relative", left: -16 }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#372213",
              letterSpacing: "-0.5px",
              fontStyle: "normal",
            }}>
              goodreads
            </span>
          </div>

          {/* Links Cluster with precise close formatting */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            {["Home", "My Books"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "#372213",
                  fontSize: 15,
                  textDecoration: "none",
                  fontWeight: "normal",
                  whiteSpace: "nowrap",
                  fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                {label}
              </a>
            ))}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#372213", fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              Browse <ChevronDownNav size={12} strokeWidth={2.5} style={{ color: "#555" }} />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#372213", fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              Community <ChevronDownNav size={12} strokeWidth={2.5} style={{ color: "#555" }} />
            </a>
          </div>

          {/* Flexible Search Container that fills the space between links and profile action items */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", flexGrow: 1, minWidth: 200, marginLeft: 6 }}>
            <input
              type="text"
              placeholder="Search books"
              style={{
                border: "1px solid #e0dbd1",
                borderRadius: "3px",
                padding: "6px 36px 6px 12px",
                fontSize: 14,
                width: "100%",
                background: "#fff",
                color: "#372213",
                fontFamily: "Arial, sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <Search size={18} color="#000" strokeWidth={2.5} style={{ position: "absolute", right: 10, cursor: "pointer" }} />
          </div>

          {/* Icons Group sitting cleanly on the right border margin */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={iconCircle}><Bell size={15} color="#fff" strokeWidth={2} /></div>
            <div style={iconCircle}><MessageCircle size={15} color="#fff" strokeWidth={2} /></div>
            <div style={iconCircle}><Mail size={15} color="#fff" strokeWidth={2} /></div>
            <div style={iconCircle}><Users size={15} color="#fff" strokeWidth={2} /></div>
            <div style={{ ...iconCircle, background: "#c9bfb5" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#fff" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE BODY */}
      <div style={{ display: "flex", maxWidth: 960, margin: "0 auto", padding: "16px 12px" }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: 168, flexShrink: 0, marginRight: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: "normal", color: "#00635d", margin: "0 0 12px 0", fontFamily: "Georgia, serif" }}>My Books</h1>

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
              ["did-not-finish", `Did Not Finish (${shelfCounts["did-not-finish"]})`],
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
            
            <hr style={{ border: "none", borderTop: "1px solid #d6cfc4", margin: "10px 0 6px 0" }} />

            <div>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#00635d", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>all (0)</a>
            </div>
            <div style={{ marginTop: 8 }}>
              <button style={{
                fontSize: 11,
                color: "#333",
                border: "1px solid #d3c9bc",
                background: "#f4f1ea",
                borderRadius: 4,
                padding: "3px 10px",
                cursor: "default",
                fontFamily: "Arial, sans-serif",
              }}>
                Add shelf
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
        <main style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingBottom: 10, marginBottom: 12, borderBottom: "1px solid #d6cfc4", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("avgRating")}>
                  avg<br />rating <SortIcon field="avgRating" />
                </th>
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("rating")}>
                  rating <SortIcon field="rating" />
                </th>
                <th style={thStyle}>shelves</th>
                <th style={thStyle}>review</th>
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("dateRead")}>
                  date<br />read <SortIcon field="dateRead" />
                </th>
                <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("dateAdded")}>
                  date<br />added <SortIcon field="dateAdded" />
                </th>
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
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()} 
                        className="gr-book-link" 
                        style={{ ...bookLinkStyle, fontWeight: 700, lineHeight: 1.3 }}
                      >
                        {book.title}
                      </a>
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()} 
                        className="gr-book-link" 
                        style={bookLinkStyle}
                      >
                        {book.author}
                      </a>
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