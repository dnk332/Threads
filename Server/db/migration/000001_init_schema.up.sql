CREATE TYPE media_types AS ENUM ('image', 'video', 'audio');

CREATE TABLE users
(
    id                  bigserial PRIMARY KEY,
    username            varchar UNIQUE NOT NULL,
    hashed_password     varchar        NOT NULL,
    created_at          timestamptz    NOT NULL DEFAULT now(),
    password_changed_at timestamptz    NOT NULL DEFAULT now(),
    is_frozen           bool           NOT NULL DEFAULT false
);

CREATE TABLE user_profiles
(
    id         bigserial PRIMARY KEY,
    user_id    bigint UNIQUE  NOT NULL REFERENCES users (id),
    name       varchar        NOT NULL,
    email      varchar UNIQUE NOT NULL,
    bio        varchar        NOT NULL DEFAULT '',
    created_at timestamptz    NOT NULL DEFAULT now(),
    updated_at timestamptz    NOT NULL DEFAULT now()
);

CREATE TABLE posts
(
    id           bigserial PRIMARY KEY,
    author_id    bigint      NOT NULL REFERENCES users (id),
    text_content text        NOT NULL DEFAULT '',
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE replies
(
    id            bigserial PRIMARY KEY,
    root_post_id  bigint NOT NULL REFERENCES posts (id),
    reply_post_id bigint NOT NULL REFERENCES posts (id),
    author_id     bigint NOT NULL REFERENCES users (id)
);

CREATE TABLE likes
(
    id         bigserial PRIMARY KEY,
    post_id    bigint      NOT NULL REFERENCES posts (id),
    author_id  bigint      NOT NULL REFERENCES users (id),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (post_id, author_id)
);

-- Function to check if object_id exists in posts or user_profiles
CREATE
OR REPLACE FUNCTION validate_object_id(reference_object varchar, reference_object_id bigint) RETURNS BOOLEAN AS $$
BEGIN
    IF
reference_object = 'post' THEN
        RETURN EXISTS (SELECT 1 FROM posts WHERE id = reference_object_id);
    ELSIF
reference_object = 'user_profile' THEN
        RETURN EXISTS (SELECT 1 FROM user_profiles WHERE id = reference_object_id);
ELSE
        RETURN FALSE;
END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TABLE medias
(
    id                  bigserial PRIMARY KEY,
    link                varchar     NOT NULL,
    type                media_types NOT NULL,
    order_column        int         NOT NULL DEFAULT 0,
    created_at          timestamptz NOT NULL DEFAULT now(),
    reference_object    varchar(50) NOT NULL CHECK (reference_object IN ('post', 'user_profile')),
    reference_object_id bigint      NOT NULL,
    CONSTRAINT check_object_reference CHECK (validate_object_id(reference_object, reference_object_id))
);

CREATE TABLE reposts
(
    id           bigserial PRIMARY KEY,
    root_post_id bigint NOT NULL REFERENCES posts (id),
    reposts_id   bigint NOT NULL REFERENCES posts (id),
    UNIQUE (root_post_id, reposts_id)
);

CREATE TABLE followings
(
    id           bigserial PRIMARY KEY,
    following_id bigint NOT NULL REFERENCES users (id),
    follower_id  bigint NOT NULL REFERENCES users (id),
    UNIQUE (following_id, follower_id)
);

CREATE INDEX ON users (username);
CREATE INDEX ON users (created_at);
CREATE INDEX ON user_profiles (email);
CREATE INDEX ON user_profiles (user_id);
CREATE INDEX ON posts (author_id);
CREATE INDEX ON posts (created_at);
CREATE INDEX ON posts (updated_at);
CREATE INDEX ON replies (root_post_id);
CREATE INDEX ON replies (reply_post_id);
CREATE INDEX ON replies (root_post_id, reply_post_id);
CREATE INDEX ON reposts (root_post_id);
