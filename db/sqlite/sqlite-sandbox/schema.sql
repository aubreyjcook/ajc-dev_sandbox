CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL
);

INSERT INTO notes (body) VALUES ('hello from sqlite');
