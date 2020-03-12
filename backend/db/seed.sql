DROP DATABASE IF EXISTS stonks;
CREATE DATABASE stonks;


\c stonks;

CREATE TABLE users (
  uid VARCHAR PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  balance FLOAT NOT NULL DEFAULT 5000

);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  uid VARCHAR REFERENCES users(id),
  ticker_symbol VARCHAR NOT NULL,
  transaction_type VARCHAR,
  shares INT,
  price FLOAT NOT NULL
);