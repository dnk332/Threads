CREATE TYPE "media_types" AS ENUM ('image', 'video', 'audio');
CREATE TABLE "users" (
    "id" bigserial PRIMARY KEY,
    "username" varchar UNIQUE NOT NULL,
    "hashed_password" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "password_changed_at" timestamptz NOT NULL DEFAULT (now()),
    "is_frozen" bool NOT NULL DEFAULT false
);
CREATE TABLE "user_profiles" (
    "id" bigserial PRIMARY KEY,
    "user_id" bigserial UNIQUE NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar UNIQUE NOT NULL,
    "bio" varchar NOT NULL DEFAULT '',
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "posts" (
    "id" bigserial PRIMARY KEY,
    "author_id" bigserial NOT NULL,
    "text_content" text NOT NULL DEFAULT '',
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "replies" (
    "id" bigserial PRIMARY KEY,
    "root_post_id" bigserial NOT NULL,
    "reply_post_id" bigserial NOT NULL,
    "author_id" bigserial NOT NULL
);
CREATE TABLE "likes" (
    "id" bigserial PRIMARY KEY,
    "post_id" bigserial NOT NULL,
    "author_id" bigserial NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "medias" (
    "id" bigserial PRIMARY KEY,
    "content" varchar NOT NULL,
    "type" media_types NOT NULL,
    "order_column" int NOT NULL DEFAULT 0,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "post_id" bigserial,
    "user_profiles_id" bigserial
);
CREATE TABLE "reposts" (
    "id" bigserial PRIMARY KEY,
    "root_post_id" bigserial NOT NULL,
    "reposts_id" bigserial NOT NULL
);
-- noinspection SqlNoDataSourceInspection
CREATE TABLE "followings" (
    "id" bigserial PRIMARY KEY,
    "following_id" bigserial NOT NULL,
    "follower_id" bigserial NOT NULL
);
CREATE INDEX ON "users" ("username");
CREATE INDEX ON "users" ("created_at");
CREATE INDEX ON "user_profiles" ("email");
CREATE INDEX ON "user_profiles" ("user_id");
CREATE INDEX ON "posts" ("author_id");
CREATE INDEX ON "posts" ("text_content");
CREATE INDEX ON "posts" ("created_at");
CREATE INDEX ON "posts" ("updated_at");
CREATE INDEX ON "replies" ("root_post_id");
CREATE INDEX ON "replies" ("reply_post_id");
CREATE INDEX ON "replies" ("root_post_id", "reply_post_id");
CREATE UNIQUE INDEX ON "likes" ("post_id", "author_id");
CREATE INDEX ON "reposts" ("root_post_id");
CREATE UNIQUE INDEX ON "reposts" ("root_post_id", "reposts_id");
CREATE UNIQUE INDEX ON "followings" ("following_id", "follower_id");
ALTER TABLE "user_profiles"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "posts"
ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");
ALTER TABLE "replies"
ADD FOREIGN KEY ("root_post_id") REFERENCES "posts" ("id");
ALTER TABLE "replies"
ADD FOREIGN KEY ("reply_post_id") REFERENCES "posts" ("id");
ALTER TABLE "replies"
ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");
ALTER TABLE "likes"
ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");
ALTER TABLE "likes"
ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");
ALTER TABLE "medias"
ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");
ALTER TABLE "medias"
ADD FOREIGN KEY ("user_profiles_id") REFERENCES "user_profiles" ("id");
ALTER TABLE "reposts"
ADD FOREIGN KEY ("root_post_id") REFERENCES "posts" ("id");
ALTER TABLE "reposts"
ADD FOREIGN KEY ("reposts_id") REFERENCES "posts" ("id");
ALTER TABLE "followings"
ADD FOREIGN KEY ("following_id") REFERENCES "users" ("id");
ALTER TABLE "followings"
ADD FOREIGN KEY ("follower_id") REFERENCES "users" ("id");