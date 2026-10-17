2. Table Design Drill — PostgreSQL Cheatsheet
1. Create users and posts Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    age INT CHECK (age >= 13),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (length(title) > 0)
);

2. Data Types
Type	Use case	Example
TEXT	Names, emails, content	username TEXT
INT	Whole numbers	age INT
BIGINT	Large integer IDs	id BIGINT
UUID	Globally unique identifiers	id UUID
SERIAL	Auto-incrementing integer IDs	id SERIAL
TIMESTAMPTZ	Date and time with time zone awareness	created_at TIMESTAMPTZ
BOOLEAN	True/false values	published BOOLEAN
UUID vs SERIAL
-- UUID: globally unique ID
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- SERIAL: auto-incrementing integer
id SERIAL PRIMARY KEY

-- Modern alternative to SERIAL
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY

UUID: Good for distributed systems and IDs generated across multiple services.
SERIAL: Simple, compact, auto-incrementing integer IDs.
IDENTITY: Modern SQL-standard approach to auto-generated integer IDs.
gen_random_uuid() generates a UUID in modern PostgreSQL versions.
3. Constraints You Must Know
PRIMARY KEY

Uniquely identifies every row. Cannot be NULL.

id UUID PRIMARY KEY

NOT NULL

A value must be provided.

email TEXT NOT NULL

UNIQUE

Prevents duplicate values.

email TEXT NOT NULL UNIQUE

DEFAULT

Automatically supplies a value when one isn't provided.

created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
published BOOLEAN NOT NULL DEFAULT FALSE

CHECK

Enforces a condition on values.

age INT CHECK (age >= 13)
CHECK (length(title) > 0)

FOREIGN KEY

Ensures a reference points to an existing row in another table.

user_id UUID NOT NULL REFERENCES users(id)


A post cannot reference a nonexistent user.

4. Common Interview/Drill Questions

Q: Why use TIMESTAMPTZ instead of TIMESTAMP?

Use TIMESTAMPTZ for real-world event times. PostgreSQL normalizes the instant internally and displays it according to the session time zone.

Q: Can a UNIQUE column contain NULL?

Yes. By default, PostgreSQL allows multiple NULL values in a unique column. Add NOT NULL if the value is required.

Q: Does CHECK (age >= 13) reject NULL?

No. A CHECK passes when its expression is TRUE or NULL. Add NOT NULL if age is required.

Q: Does DEFAULT mean a column is required?

No. It supplies a value when omitted, but an explicit NULL is still allowed unless the column is NOT NULL.

Q: Why use user_id UUID in posts?

The foreign-key column must use a compatible type with users.id.

5. Practice Checklist
Create users with a primary key.
Add required fields using NOT NULL.
Make username and email unique.
Add a sensible DEFAULT for created_at.
Add a CHECK constraint for age.
Create posts with a foreign key to users.
Choose appropriate ID types.
Test duplicate emails, invalid ages, and nonexistent user IDs.
Golden Rule

Every column needs a deliberate type, and every constraint should protect a real data rule.

Think: What identifies this row? What must exist? What must be unique? What can be generated automatically? What values are valid? What other table does this row depend on?