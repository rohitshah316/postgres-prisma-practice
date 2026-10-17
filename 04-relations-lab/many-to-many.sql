CREATE TABLE IF NOT EXISTS tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_tags(
    post_id INT NOT NULL,
    tag_id INT NOT NULL,

    PRIMARY KEY (post_id,tag_id),

    CONSTRAINT fk_post_tags_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_post_tags_tag  
        FOREIGN KEY (tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE
);

