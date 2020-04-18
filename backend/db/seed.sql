CREATE TABLE users (
  uid VARCHAR PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  balance FLOAT NOT NULL DEFAULT 5000
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  uid VARCHAR REFERENCES users(uid),
  ticker_symbol VARCHAR NOT NULL,
  transaction_type VARCHAR,
  shares INT,
  price FLOAT NOT NULL
);
INSERT INTO users( uid, username, email) VALUES
('WXYZWbkWDRPs4Bn00vwxvYVeNlr2','apples123','apples123@test.com');