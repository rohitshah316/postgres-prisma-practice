CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL UNIQUE,
    balance NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT balance_non_negative CHECK (balance>=0)
);

