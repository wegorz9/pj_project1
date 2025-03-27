drop table if exists verification_token;
CREATE TABLE verification_token
(
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,

    PRIMARY KEY (identifier, token)
);

drop table if exists accounts;
CREATE TABLE accounts
(
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,

    PRIMARY KEY (id)
);

drop table if exists sessions;
CREATE TABLE sessions
(
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

drop table if exists users;
CREATE TABLE users
(
    id SERIAL,
    name VARCHAR(255),
    email VARCHAR(255),
    "emailVerified" TIMESTAMPTZ,
    image TEXT,

    PRIMARY KEY (id)
);

drop table if exists rentals;
CREATE TABLE rentals(
    id SERIAL,
    price decimal(10,2),
    rent decimal(10,2),
    title varchar(511),
    location varchar(511),
    rooms integer,
    meterage integer,
    description TEXT,

    primary key (id)
);

drop table if exists rental_images;
CREATE TABLE rental_images(
    id SERIAL,
    rental_id integer,
    image TEXT,
    primary key (id),
    foreign key (rental_id) references rentals(id)
);

