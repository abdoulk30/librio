import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, Bell, Mail, Users, ChevronDown as ChevronDownNav, MessageCircle, Sun, Moon, Loader2 } from "lucide-react";
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

{/* MARKER-MAKE-KIT-INVOKED */}

type BookShelf = "read" | "currently-reading" | "want-to-read" | "did-not-finish";

interface Book {
  id: number;
  openLibraryKey?: string; 
  title: string;
  titleSort: string;
  author: string;
  authorSort: string;
  starCount: number;
  shelf: BookShelf;
  dateAdded: string;
  coverUrl: string;
  coverAlt: string;
}

interface OpenLibraryBookItem {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

const INITIAL_BOOKS: Book[] = [
  {
    id: 1,
    title: "Naruto, Vol. 1: Uzumaki Naruto",
    titleSort: "Naruto, Vol. 1: Uzumaki Naruto",
    author: "Kishimoto, Masashi",
    authorSort: "Kishimoto",
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
    starCount: 4,
    shelf: "read",
    dateAdded: "Jun 10, 2026",
    coverUrl: myHeroAcademiaCover,
    coverAlt: "My Hero Academia Vol 1 cover",
  },
];

type Shelf = "all" | "want-to-read" | "currently-reading" | "read" | "did-not-finish";
type SortField = "title" | "author" | "rating" | "dateRead" | "dateAdded" | null;
type SortDir = "asc" | "desc";

function InteractiveStarRating({ 
  bookId, 
  currentRating, 
  onRate 
}: { 
  bookId: number; 
  currentRating: number; 
  onRate: (id: number, rating: number) => void; 
}) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [justClicked, setJustClicked] = useState(false);

  const handleStarClick = (starIndex: number) => {
    onRate(bookId, starIndex);
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 400);
  };

  return (
    <span 
      style={{ display: "inline-flex", gap: 3, whiteSpace: "nowrap" }}
      onMouseLeave={() => setHoverRating(null)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        const isFilled = hoverRating !== null ? starIndex <= hoverRating : starIndex <= currentRating;
        
        return (
          <button
            key={i}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => setHoverRating(starIndex)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: isFilled ? "#e07b39" : "var(--star-empty)",
              fontSize: 19,
              lineHeight: 1,
              transition: "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.15s ease",
            }}
            className={`gr-star-icon ${justClicked && isFilled ? "gr-star-burst" : ""}`}
          >
            ★
          </button>
        );
      })}
    </span>
  );
}

function ShelfLabel({ shelf }: { shelf: BookShelf }) {
  const map = {
    "read": { label: "read" },
    "currently-reading": { label: "currently reading" },
    "want-to-read": { label: "want to read" },
    "did-not-finish": { label: "did not finish" },
  };
  const s = map[shelf];
  return (
    <span style={{ fontSize: 13, color: "var(--link-color)", fontFamily: "Arial, sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem("librio-books");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(({ avgRating, ...rest }: any) => rest);
      }
      return INITIAL_BOOKS;
    } catch (e) {
      console.error("Failed to load local books schema:", e);
      return INITIAL_BOOKS;
    }
  });

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("librio-theme");
      return (saved as "light" | "dark") || "light";
    } catch (e) {
      return "light";
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeShelf, setActiveShelf] = useState<Shelf>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  
  // Pagination State Settings
  const [currentPage, setCurrentPage] = useState(1);
  const BOOKS_PER_PAGE = 10;

  // Pagination change key trigger to restart CSS staggered animations cleanly
  const [pageTransitionKey, setPageTransitionKey] = useState(0);

  const [editingShelfBookId, setEditingShelfBookId] = useState<number | null>(null);

  const [apiSearchInput, setApiSearchInput] = useState("");
  const [apiResults, setApiResults] = useState<OpenLibraryBookItem[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [showApiDropdown, setShowApiDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [fullscreenCover, setFullscreenCover] = useState<{ url: string; alt: string } | null>(null);

  // Reset pagination to page 1 if search query or active shelf filters change
  useEffect(() => {
    setCurrentPage(1);
    setPageTransitionKey(prev => prev + 1);
  }, [searchQuery, activeShelf]);

  useEffect(() => {
    try {
      localStorage.setItem("librio-books", JSON.stringify(books));
    } catch (e) {}
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem("librio-theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFullscreenCover(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowApiDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!apiSearchInput.trim()) {
      setApiResults([]);
      setShowApiDropdown(false);
      return;
    }

    setIsSearchingApi(true);
    setShowApiDropdown(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(apiSearchInput.trim())}&limit=5`,
          {
            headers: {
              "User-Agent": "LibrioReadingApp/2.0.0 (academic-dev-client@example.com)"
            }
          }
        );
        const data = await response.json();
        setApiResults(data.docs || []);
      } catch (error) {
        console.error("Open Library connection issue:", error);
        setApiResults([]);
      } finally {
        setIsSearchingApi(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [apiSearchInput]);

  const handleRateBook = (id: number, newRating: number) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, starCount: book.starCount === newRating ? 0 : newRating } : book
      )
    );
  };

  const handleShelfChange = (id: number, newShelf: BookShelf) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, shelf: newShelf } : book
      )
    );
    setEditingShelfBookId(null);
  };

  const remove = (id: number) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    const totalFilteredNow = filtered.length - 1;
    const maxPagesNow = Math.max(1, Math.ceil(totalFilteredNow / BOOKS_PER_PAGE));
    if (currentPage > maxPagesNow) {
      setCurrentPage(maxPagesNow);
    }
  };

  const handleAddBookFromApi = (item: OpenLibraryBookItem) => {
    const isDuplicate = books.some(book => 
      (book.openLibraryKey && book.openLibraryKey === item.key) || 
      (book.title.toLowerCase().trim() === item.title.toLowerCase().trim())
    );

    if (isDuplicate) {
      alert(`"${item.title}" is already on your bookshelf!`);
      setShowApiDropdown(false);
      return;
    }

    const authorText = item.author_name ? item.author_name[0] : "Unknown Author";
    
    const authorParts = authorText.split(" ");
    const authorSort = authorParts.length > 1 
      ? `${authorParts[authorParts.length - 1]}, ${authorParts.slice(0, -1).join(" ")}`
      : authorText;

    const coverUrl = item.cover_i 
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
      : "https://openlibrary.org/images/icons/avatar_book-sm.png";

    const newBook: Book = {
      id: Date.now(),
      openLibraryKey: item.key,
      title: item.title,
      titleSort: item.title,
      author: authorText,
      authorSort: authorSort,
      starCount: 0,
      shelf: "want-to-read", 
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }),
      coverUrl: coverUrl,
      coverAlt: `${item.title} edition cover`
    };

    setBooks(prev => [newBook, ...prev]);
    setApiSearchInput("");
    setShowApiDropdown(false);
    setCurrentPage(1); 
    setPageTransitionKey(prev => prev + 1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setCurrentPage(1);
    setPageTransitionKey(prev => prev + 1);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPage(prev => Math.min(totalPages, prev + 1));
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
    setPageTransitionKey(prev => prev + 1);
  };

  const filtered = useMemo(() => {
    let rows = [...books];

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
        sortDir === "asc" ? a.titleSort.localeCompare(b.titleSort) : b.titleSort.localeCompare(a.titleSort)
      );
    } else if (sortField === "author") {
      rows.sort((a, b) =>
        sortDir === "asc" ? a.authorSort.localeCompare(b.authorSort) : b.authorSort.localeCompare(a.authorSort)
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
  }, [books, searchQuery, activeShelf, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BOOKS_PER_PAGE));
  
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filtered, currentPage]);

  const shelfCounts = {
    all: books.length,
    "want-to-read": books.filter((b) => b.shelf === "want-to-read").length,
    "currently-reading": books.filter((b) => b.shelf === "currently-reading").length,
    read: books.filter((b) => b.shelf === "read").length,
    "did-not-finish": books.filter((b) => b.shelf === "did-not-finish").length,
  };

  const iconCircle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "var(--icon-circle-bg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
    flexShrink: 0,
    transition: "background-color 0.2s ease"
  };

  const thStyle: React.CSSProperties = {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: 700,
    color: "var(--text-main)",
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    whiteSpace: "nowrap",
    background: "var(--table-header-bg)",
    transition: "all 0.2s ease"
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px 16px",
    verticalAlign: "top",
  };

  const bookLinkStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    color: "var(--link-color)",
    textDecoration: "none",
    cursor: "pointer",
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span style={{ color: "#aaa", fontSize: 11, marginLeft: 2 }}>↕</span>;
    return sortDir === "asc"
      ? <span style={{ color: "var(--text-main)", fontSize: 11, marginLeft: 2 }}>↑</span>
      : <span style={{ color: "var(--text-main)", fontSize: 11, marginLeft: 2 }}>↓</span>;
  };

  return (
    <div className={`theme-${theme}`} style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-main)", fontFamily: "Georgia, 'Times New Roman', serif", transition: "background-color 0.2s ease, color 0.2s ease" }}>
      
      <style>{`
        .theme-light {
          --bg-main: #ffffff;
          --text-main: #372213;
          --text-muted: #665246;
          --nav-bg: #f4f1ea;
          --border-color: #d6cfc4;
          --table-bg: #ffffff;
          --table-header-bg: #f9f8f6;
          --link-color: #00635d;
          --secondary-text: #888888;
          --row-hover-bg: #fcfbfa;
          --icon-circle-bg: #c9bfb5;
          --sidebar-btn-hover: #eae4d8;
          --sidebar-btn-active: #dfd5c4;
          --star-empty: #d4c9bc;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
          --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05);
          --api-dropdown-bg: #ffffff;
          --api-row-hover: #f7f5f0;
          --remove-hover-bg: #fce8e6;
          --remove-hover-txt: #c53030;
          --overlay-bg: rgba(26, 24, 21, 0.45);
        }
        .theme-dark {
          --bg-main: #121212;
          --text-main: #f5f2eb;
          --text-muted: #b5a89e;
          --nav-bg: #1c1b18;
          --border-color: #33302a;
          --table-bg: #1a1917;
          --table-header-bg: #21201d;
          --link-color: #4db6ac;
          --secondary-text: #999999;
          --row-hover-bg: #262421;
          --icon-circle-bg: #403c37;
          --sidebar-btn-hover: #2d2a25;
          --sidebar-btn-active: #3d3932;
          --star-empty: #403c37;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
          --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
          --api-dropdown-bg: #1c1b18;
          --api-row-hover: #2d2a25;
          --remove-hover-bg: #4c1d1d;
          --remove-hover-txt: #feb2b2;
          --overlay-bg: rgba(0, 0, 0, 0.75);
        }

        .gr-book-link:hover {
          text-decoration: underline !important;
        }

        .gr-sidebar-btn {
          display: block;
          font-size: 13px;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-family: Arial, sans-serif;
          margin-bottom: 4px;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }
        .gr-sidebar-btn:hover {
          background-color: var(--sidebar-btn-hover);
        }
        .gr-sidebar-btn-active {
          background-color: var(--sidebar-btn-active) !important;
          border-color: var(--border-color);
        }

        .gr-action-pill {
          font-size: 11px !important;
          text-decoration: none;
          font-family: Arial, sans-serif;
          padding: 4px 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: var(--nav-bg);
          color: var(--link-color) !important;
          transition: all 0.15s ease;
          box-shadow: var(--shadow-sm);
          white-space: nowrap;
          display: inline-block;
        }
        .gr-action-pill:hover {
          background: var(--sidebar-btn-hover);
          transform: translateY(-0.5px);
        }

        .gr-remove-btn {
          font-size: 11px !important;
          font-family: Arial, sans-serif;
          padding: 4px 8px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: var(--nav-bg);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: var(--shadow-sm);
        }
        .gr-remove-btn:hover {
          background: var(--remove-hover-bg) !important;
          color: var(--remove-hover-txt) !important;
          border-color: transparent;
        }

        .gr-modern-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: var(--table-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        /* 1. STAGGERED PAGE-FLIP ENTRY ANIMATIONS */
        .gr-table-row {
          animation: pageFlipFadeIn 0.4s cubic-bezier(0.215, 0.610, 0.355, 1) both;
        }
        .gr-table-row:hover {
          background-color: var(--row-hover-bg);
        }
        .gr-table-row:not(:last-child) td {
          border-bottom: 1px solid var(--border-color);
        }

        @keyframes pageFlipFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px) rotateX(-4deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        /* 2. ELASTIC STAR BURST EFFECT */
        .gr-star-icon:hover {
          transform: scale(1.3);
        }
        .gr-star-burst {
          animation: starElasticBurst 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.5) forwards;
        }

        @keyframes starElasticBurst {
          0% { transform: scale(1); }
          40% { transform: scale(1.6); filter: drop-shadow(0 0 6px #e07b39); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .gr-shelf-select {
          font-family: Arial, sans-serif;
          font-size: 12px;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background: var(--bg-main);
          color: var(--text-main);
          outline: none;
        }

        .gr-api-result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: background-color 0.15s ease;
          border-bottom: 1px solid var(--border-color);
        }
        .gr-api-result-item:last-child {
          border-bottom: none;
        }
        .gr-api-result-item:hover {
          background-color: var(--api-row-hover);
        }

        /* TACTILE PERSPECTIVE HOVER FOR THUMBNAILS */
        .gr-clickable-cover {
          cursor: zoom-in;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          perspective: 1000px;
        }
        .gr-clickable-cover:hover {
          transform: scale(1.04) rotateY(-5deg);
          box-shadow: 5px 6px 14px rgba(0,0,0,0.26) !important;
        }

        .gr-page-btn {
          font-family: Arial, sans-serif;
          font-size: 13px;
          padding: 6px 14px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--nav-bg);
          color: var(--link-color);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gr-page-btn:hover:not(:disabled) {
          background: var(--sidebar-btn-hover);
          transform: translateY(-1px);
        }
        .gr-page-btn:disabled {
          opacity: 0.4;
          color: var(--text-muted);
          cursor: not-allowed;
          border-color: var(--border-color);
        }

        /* 3. 3D OPEN BOOK LIGHTBOX ANIMATION FRAMEWORKS */
        .gr-lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--overlay-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center; /* Centers the container horizontally */
          z-index: 1000;
          animation: backdropBlurFade 0.25s linear both;
        }

        @keyframes backdropBlurFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gr-3d-book-container {
          perspective: 1500px;
          display: flex;
          align-items: center;
          justify-content: center; /* Centers the image inside the container */
          animation: bookOpeningReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes bookOpeningReveal {
          0% {
            opacity: 0;
            transform: scale(0.7) rotateY(-45deg) rotateX(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(-12deg) rotateX(0deg);
          }
        }
      `}</style>

      {/* TOP NAV */}
      <nav style={{
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--border-color)",
        padding: "0 32px",
        display: "flex",
        justifyContent: "center",
        height: 52,
        transition: "all 0.2s ease"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 1440,
          height: "100%",
          gap: 20,
        }}>
          {/* Logo */}
          <div style={{ marginRight: 8, flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--text-main)",
              letterSpacing: "-0.5px",
            }}>
              goodreads
            </span>
          </div>

          {/* Links Cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            {["Home", "My Books"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "var(--text-main)",
                  fontSize: 15,
                  textDecoration: "none",
                  fontWeight: label === "My Books" ? "bold" : "normal",
                  whiteSpace: "nowrap",
                  fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                {label}
              </a>
            ))}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--text-main)", fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              Browse <ChevronDownNav size={12} strokeWidth={2.5} style={{ color: "var(--text-muted)" }} />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--text-main)", fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              Community <ChevronDownNav size={12} strokeWidth={2.5} style={{ color: "var(--text-muted)" }} />
            </a>
          </div>

          {/* BIGGER GLOBAL ENGINE SEARCH CONTAINER */}
          <div ref={dropdownRef} style={{ position: "relative", display: "flex", alignItems: "center", flexGrow: 1, minWidth: 260, marginLeft: 10 }}>
            <input
              type="text"
              placeholder="Find and add books"
              value={apiSearchInput}
              onChange={(e) => setApiSearchInput(e.target.value)}
              onFocus={() => { if (apiSearchInput.trim()) setShowApiDropdown(true); }}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                padding: "7px 36px 7px 14px",
                fontSize: 14,
                width: "100%",
                background: "var(--bg-main)",
                color: "var(--text-main)",
                fontFamily: "Arial, sans-serif",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s ease"
              }}
            />
            <div style={{ position: "absolute", right: 12, display: "flex", alignItems: "center" }}>
              {isSearchingApi ? (
                <Loader2 size={18} className="animate-spin" style={{ color: "var(--link-color)" }} />
              ) : (
                <Search size={18} color="var(--text-muted)" strokeWidth={2.5} style={{ cursor: "pointer" }} />
              )}
            </div>

            {/* GLOBAL ENGINE SEARCH DROPDOWN PORTAL */}
            {showApiDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                maxWidth: 450,
                background: "var(--api-dropdown-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.15)",
                zIndex: 50,
                marginTop: 6,
                maxHeight: 400,
                overflowY: "auto"
              }}>
                {isSearchingApi && (
                  <div style={{ padding: "16px", textAlign: "center", fontSize: 13, color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}>
                    Searching live global library engine...
                  </div>
                )}
                {!isSearchingApi && apiResults.length === 0 && (
                  <div style={{ padding: "16px", textAlign: "center", fontSize: 13, color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}>
                    No catalog records found matching that query.
                  </div>
                )}
                {apiResults.map((item) => {
                  return (
                    <div 
                      key={item.key} 
                      className="gr-api-result-item"
                      onClick={() => handleAddBookFromApi(item)}
                    >
                      <img 
                        src={item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg` : "https://openlibrary.org/images/icons/avatar_book-sm.png"} 
                        alt="" 
                        style={{ width: 34, height: 48, objectFit: "cover", borderRadius: 3, border: "1px solid var(--border-color)", flexShrink: 0 }} 
                      />
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: "bold", color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "Arial, sans-serif" }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "Arial, sans-serif", marginTop: 2 }}>
                          by {item.author_name ? item.author_name[0] : "Unknown Author"}
                        </div>
                      </div>
                      <span 
                        className="gr-action-pill" 
                        style={{ fontSize: 10, padding: "3px 8px", pointerEvents: "none" }}
                      >
                        + Add
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Icon Array */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <button 
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                ...iconCircle,
                background: "var(--link-color)",
                border: "none",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)"
              }}
              title={`Switch layout context`}
            >
              {theme === "light" ? <Moon size={15} color="#fff" /> : <Sun size={15} color="#121212" />}
            </button>
            <div style={iconCircle}><Bell size={15} color="var(--bg-main)" strokeWidth={2} /></div>
            <div style={iconCircle}><MessageCircle size={15} color="var(--bg-main)" strokeWidth={2} /></div>
            <div style={iconCircle}><Mail size={15} color="var(--bg-main)" strokeWidth={2} /></div>
            <div style={iconCircle}><Users size={15} color="var(--bg-main)" strokeWidth={2} /></div>
          </div>
        </div>
      </nav>

      {/* BODY FRAME */}
      <div style={{ display: "flex", maxWidth: 1440, margin: "0 auto", padding: "32px 24px" }}>

        {/* SIDEBAR PANEL */}
        <aside style={{ width: 210, flexShrink: 0, marginRight: 48 }}>
          <h1 style={{ fontSize: 28, fontWeight: "normal", color: "var(--link-color)", margin: "0 0 20px 0", fontFamily: "Georgia, serif" }}>My Books</h1>

          {/* Bookshelves section */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingLeft: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-main)", fontFamily: "Arial, sans-serif" }}>Bookshelves</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill" style={{ fontSize: 10, padding: "2px 6px" }}>(Edit)</a>
            </div>
            {([
              ["all", `All (${shelfCounts.all})`],
              ["want-to-read", `Want to Read (${shelfCounts["want-to-read"]})`],
              ["currently-reading", `Currently Reading (${shelfCounts["currently-reading"]})`],
              ["read", `Read (${shelfCounts.read})`],
              ["did-not-finish", `Did Not Finish (${shelfCounts["did-not-finish"]})`],
            ] as [Shelf, string][]).map(([shelf, label]) => {
              const displayLabel = label.replace("Want to Read", "Want to read").replace("Currently Reading", "Currently reading").replace("Did Not Finish", "Did not finish");
              return (
                <a
                  key={shelf}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveShelf(shelf); }}
                  className={`gr-sidebar-btn ${activeShelf === shelf ? "gr-sidebar-btn-active" : ""}`}
                  style={{
                    color: activeShelf === shelf ? "var(--text-main)" : "var(--link-color)",
                    fontWeight: activeShelf === shelf ? 700 : 400,
                  }}
                >
                  {displayLabel}
                </a>
              );
            })}
            
            <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "14px 0 10px 0" }} />

            <div style={{ paddingLeft: 14 }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, color: "var(--link-color)", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>all (0)</a>
            </div>
            <div style={{ marginTop: 12, paddingLeft: 14 }}>
              <button className="gr-action-pill" style={{ cursor: "pointer", fontWeight: 500 }}>
                + Add shelf
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 20, paddingLeft: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-main)", marginBottom: 8, fontFamily: "Arial, sans-serif" }}>Your reading activity</div>
            {["Review Drafts", "Kindle Notes & Highlights", "Reading Challenge", "Year in Books", "Reading stats"].map((item) => (
              <a key={item} href="#" onClick={(e) => e.preventDefault()} className="gr-sidebar-btn" style={{ color: "var(--link-color)" }}>{item}</a>
            ))}
          </div>

          <div style={{ marginBottom: 20, paddingLeft: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-main)", marginBottom: 8, fontFamily: "Arial, sans-serif" }}>Add books</div>
            {["Amazon book purchases", "Recommendations", "Explore"].map((item) => (
              <a key={item} href="#" onClick={(e) => e.preventDefault()} className="gr-sidebar-btn" style={{ color: "var(--link-color)" }}>{item}</a>
            ))}
          </div>

          <div style={{ paddingLeft: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-main)", marginBottom: 8, fontFamily: "Arial, sans-serif" }}>Tools</div>
            {["Find duplicates", "Widgets", "Import and export"].map((item) => (
              <a key={item} href="#" onClick={(e) => e.preventDefault()} className="gr-sidebar-btn" style={{ color: "var(--link-color)" }}>{item}</a>
            ))}
          </div>
        </aside>

        {/* WORKSPACE CENTRAL WORKGROUND */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Control Strip containing the Smaller Search Input */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingBottom: 14, marginBottom: 20, borderBottom: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              
              {/* SMALLER SHELF FILTER SEARCH INPUT */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: 6,
                    padding: "5px 30px 5px 12px",
                    fontSize: 13,
                    width: 240,
                    background: "var(--bg-main)",
                    color: "var(--text-main)",
                    fontFamily: "Arial, sans-serif",
                    outline: "none",
                    transition: "all 0.2s ease"
                  }}
                />
                <Search size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>

              {["Batch Edit", "Settings", "Stats", "Print"].map((btn) => (
                <a key={btn} href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill">{btn}</a>
              ))}
            </div>
          </div>

          {/* RESPONSIVE DATA TABLE CONTAINER */}
          <div style={{ width: "100%", overflowX: "auto", borderRadius: 8 }}>
            <table className="gr-modern-table" style={{ minWidth: 950 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 40 }}></th>
                  <th style={{ ...thStyle, width: 110, textAlign: "center" }}>cover</th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none", width: "30%" }} onClick={() => handleSort("title")}>
                    title <SortIcon field="title" />
                  </th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none", width: "25%" }} onClick={() => handleSort("author")}>
                    author <SortIcon field="author" />
                  </th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none", width: 150 }} onClick={() => handleSort("rating")}>
                    your rating <SortIcon field="rating" />
                  </th>
                  <th style={{ ...thStyle, width: 160 }}>shelves</th>
                  <th style={{ ...thStyle, width: 140 }}>review</th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none", width: 110 }} onClick={() => handleSort("dateRead")}>
                    date read <SortIcon field="dateRead" />
                  </th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none", width: 130 }} onClick={() => handleSort("dateAdded")}>
                    date added <SortIcon field="dateAdded" />
                  </th>
                </tr>
              </thead>
              <tbody key={pageTransitionKey}>
                {paginatedBooks.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", fontFamily: "Arial, sans-serif", fontSize: 15 }}>
                      No books match your search.
                    </td>
                  </tr>
                ) : (
                  paginatedBooks.map((book, index) => (
                    <tr 
                      key={book.id} 
                      className="gr-table-row"
                      style={{ animationDelay: `${index * 35}ms` }}
                    >
                      <td style={{ ...tdStyle, verticalAlign: "middle", padding: "16px 8px 16px 16px", textAlign: "center" }}>
                        <button 
                          className="gr-remove-btn"
                          onClick={() => remove(book.id)}
                          title="Remove from my books"
                        >
                          ✕
                        </button>
                      </td>
                      <td style={{ ...tdStyle, padding: "8px 12px", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <img 
                            src={book.coverUrl} 
                            alt={book.coverAlt} 
                            className="gr-clickable-cover"
                            onClick={() => setFullscreenCover({ url: book.coverUrl, alt: book.coverAlt })}
                            title="Click to flip open full perspective cover"
                            style={{ 
                              width: 90,
                              height: "auto",
                              display: "block",
                              borderRadius: 4, 
                              border: "1px solid var(--border-color)", 
                              boxShadow: "2px 3px 7px rgba(0,0,0,0.16)"
                            }} 
                          />
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()} 
                          className="gr-book-link" 
                          style={{ ...bookLinkStyle, fontWeight: 700, lineHeight: 1.4 }}
                        >
                          {book.title}
                        </a>
                      </td>
                      <td style={tdStyle}>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()} 
                          className="gr-book-link" 
                          style={bookLinkStyle}
                        >
                          {book.author}
                        </a>
                      </td>
                      <td style={tdStyle}>
                        <InteractiveStarRating 
                          bookId={book.id} 
                          currentRating={book.starCount} 
                          onRate={handleRateBook} 
                        />
                      </td>
                      <td style={tdStyle}>
                        {editingShelfBookId === book.id ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <select
                              value={book.shelf}
                              onChange={(e) => handleShelfChange(book.id, e.target.value as BookShelf)}
                              onBlur={() => setEditingShelfBookId(null)}
                              className="gr-shelf-select"
                              autoFocus
                            >
                              <option value="read">read</option>
                              <option value="currently-reading">currently reading</option>
                              <option value="want-to-read">want to read</option>
                              <option value="did-not-finish">did not finish</option>
                            </select>
                            <div>
                              <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setEditingShelfBookId(null); }} 
                                className="gr-action-pill" 
                                style={{ fontSize: 9, padding: "1px 4px", background: "transparent" }}
                              >
                                cancel
                              </a>
                            </div>
                          </div>
                        ) : (
                          <>
                            <ShelfLabel shelf={book.shelf} />
                            <div style={{ marginTop: 6 }}>
                              <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setEditingShelfBookId(book.id); }} 
                                className="gr-action-pill" 
                                style={{ fontSize: 10, padding: "2px 6px", cursor: "pointer" }}
                              >
                                edit
                              </a>
                            </div>
                          </>
                        )}
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                        <a href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill" style={{ fontSize: 12 }}>Write a review</a>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>not set</div>
                        <a href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill" style={{ fontSize: 10, padding: "2px 6px" }}>edit</a>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "var(--text-main)", whiteSpace: "nowrap" }}>{book.dateAdded}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
                          <a href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill" style={{ fontSize: 10, padding: "2px 6px" }}>edit</a>
                          <span style={{ fontSize: 12, color: "var(--border-color)" }}>|</span>
                          <a href="#" onClick={(e) => e.preventDefault()} className="gr-action-pill" style={{ fontSize: 10, padding: "2px 6px" }}>view</a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE INFO & PAGINATION NAVIGATION CONTROLS */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginTop: 20, 
            padding: "0 4px"
          }}>
            <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "Arial, sans-serif", fontWeight: 500 }}>
              Showing {filtered.length === 0 ? 0 : (currentPage - 1) * BOOKS_PER_PAGE + 1}–{Math.min(currentPage * BOOKS_PER_PAGE, filtered.length)} of {filtered.length} book{filtered.length !== 1 ? "s" : ""}
              {books.length !== filtered.length && ` (filtered from ${books.length} total)`}
            </div>

            {/* Pagination Controls Right Arrow / Left Arrow Array */}
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button 
                  className="gr-page-btn" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange("prev")}
                  title="Previous page"
                >
                  ← Previous
                </button>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "var(--text-main)", fontWeight: 600 }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  className="gr-page-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange("next")}
                  title="Next page"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3D OPEN BOOK LIGHTBOX OVERLAY PORTAL */}
      {fullscreenCover && (
        <div 
          onClick={() => setFullscreenCover(null)}
          className="gr-lightbox-backdrop"
        >
          <div 
            className="gr-3d-book-container"
            style={{ position: "relative", maxWidth: "85%", maxHeight: "85%" }}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setFullscreenCover(null); }}
              style={{
                position: "absolute",
                top: -45,
                right: -10,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 28,
                cursor: "pointer",
                fontFamily: "Arial, sans-serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
              }}
              title="Close panel (Esc)"
            >
              ✕
            </button>
            <img 
              src={fullscreenCover.url} 
              alt={fullscreenCover.alt}
              onClick={(e) => e.stopPropagation()} 
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "4px 12px 12px 4px",
                boxShadow: "-15px 20px 45px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "default"
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border-color)", padding: "20px 24px", marginTop: 48, textAlign: "center", background: "var(--nav-bg)", transition: "all 0.2s ease" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Arial, sans-serif", letterSpacing: "0.2px" }}>
          Librio · Created by Dawn Brewer &amp; Abdoul Ba · Powered by Open Library
        </span>
      </div>
    </div>
  );
}