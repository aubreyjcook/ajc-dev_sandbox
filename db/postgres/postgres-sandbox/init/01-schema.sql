CREATE TABLE IF NOT EXISTS notes (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  body text NOT NULL
);

INSERT INTO notes (body) VALUES ('hello from postgres');
