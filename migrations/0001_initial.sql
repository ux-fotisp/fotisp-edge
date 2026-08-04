-- fotisp-edge D1 Schema
-- Migration: 0001_initial

CREATE TABLE IF NOT EXISTS pages (
  id          TEXT PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  layout_json TEXT,
  meta_json   TEXT,
  updated_at  INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS posts (
  id             TEXT PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT,
  featured_image TEXT,
  author         TEXT DEFAULT 'Admin',
  categories     TEXT DEFAULT '[]',
  published_at   INTEGER DEFAULT (unixepoch())
);

CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts
  USING fts5(title, excerpt, content, content=posts, content_rowid=rowid);

CREATE TABLE IF NOT EXISTS fotisp_events (
  id             TEXT PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT,
  event_date     TEXT,
  event_time     TEXT,
  location       TEXT,
  is_recurring   INTEGER DEFAULT 0,
  recurrence     TEXT,
  category_slug  TEXT,
  featured_image TEXT,
  published_at   INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS fotisp_portfolio (
  id             TEXT PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT,
  client         TEXT,
  category_slug  TEXT,
  featured_image TEXT,
  published_at   INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS fotisp_services (
  id             TEXT PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  excerpt        TEXT,
  content        TEXT,
  icon           TEXT,
  featured_image TEXT,
  published_at   INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS fotisp_team (
  id          TEXT PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  role        TEXT,
  bio         TEXT,
  photo       TEXT,
  social_json TEXT DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS fotisp_gsections (
  id       TEXT PRIMARY KEY,
  slug     TEXT UNIQUE NOT NULL,
  title    TEXT NOT NULL,
  location TEXT NOT NULL CHECK(location IN ('header','sidebar','footer')),
  content  TEXT
);

CREATE TABLE IF NOT EXISTS navigation (
  id       TEXT PRIMARY KEY DEFAULT 'main',
  menu_json TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('site_name', 'fotisp'),
  ('theme_variation', 'convert'),
  ('top_bar_content', 'Contact us: info@example.com'),
  ('footer_credits', 'Powered by fotisp-edge · Cloudflare');
