BEGIN;

CREATE TABLE place(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE person(
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TYPE bowl_type AS ENUM ('Tonkotsu', 'Shio', 'Shoyu', 'Miso', 'TanTan', 'Other');

CREATE TABLE checkin(
  id uuid DEFAULT uuid_generate_v4(),
  bowl bowl_type NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review VARCHAR(500),
  likes INTEGER NOT NULL DEFAULT 0 CHECK (likes >= 0),
  place_id uuid NOT NULL,
  person_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (place_id) REFERENCES place (id),
  FOREIGN KEY (person_id) REFERENCES person (id),
  PRIMARY KEY (id)
);

CREATE TABLE checkin_like(
  id uuid DEFAULT uuid_generate_v4(),
  checkin_id uuid NOT NULL,
  person_id uuid NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (checkin_id) REFERENCES checkin (id),
  FOREIGN KEY (person_id) REFERENCES person (id),
  PRIMARY KEY (id),
  UNIQUE (checkin_id, person_id)
);

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER as $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON place
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON person
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON checkin
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE FUNCTION trigger_add_like()
RETURNS TRIGGER as $$
BEGIN
  UPDATE checkin SET likes = likes + 1 WHERE id = NEW.checkin_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_like
AFTER INSERT ON checkin_like
FOR EACH ROW
EXECUTE PROCEDURE trigger_add_like();

CREATE FUNCTION trigger_delete_like()
RETURNS TRIGGER as $$
BEGIN
  UPDATE checkin SET likes = likes - 1 WHERE id = OLD.checkin_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_like
AFTER DELETE ON checkin_like
FOR EACH ROW
EXECUTE PROCEDURE trigger_delete_like();


INSERT INTO place(name, id) VALUES ('Cocolo Ramen Mitte', 'c8647c26-0c20-414a-88ca-35906b346585'), ('Cocolo Ramen Kreuzberg', '7181dafc-b2ca-48bf-8d09-a743bd4b2897'), ('Takumi Nine', '641c205c-4576-4d69-b374-98e8f5222052'), ('Hako Ramen Boxi', '8ed074a3-508f-472d-879d-6021897ce608'), ('Makoto Ramen', 'f902d778-5d57-4c24-911e-4d6da1813460');

INSERT INTO person(username, email, id) VALUES ('pawel-123', 'pawel-123@gmail.com', '272de710-f5c5-4c23-b86f-cd64542115f3'), ('ramen-freak', 'ramenfreak123@gmail.com', '68f6cfed-9351-4243-a74d-5512bd610447'), ('emptybowl', 'fake-email321@gmail.com', '3b3cbff4-8472-47f5-86ca-962f38c00774');

INSERT INTO checkin (bowl, rating, review, place_id, person_id) VALUES
  ('Tonkotsu', 4, 'Pretty good tonkotsu, noodles a bit too soft though.', 'c8647c26-0c20-414a-88ca-35906b346585', '272de710-f5c5-4c23-b86f-cd64542115f3'),
  ('Miso', 5, 'Amazing Sapporo Miso Ramen, surprisingly good chicken thigh.', '641c205c-4576-4d69-b374-98e8f5222052', '68f6cfed-9351-4243-a74d-5512bd610447'),
  ('TanTan', 3, 'The tantan was way too heavy, barely managed to finish it', '8ed074a3-508f-472d-879d-6021897ce608', '3b3cbff4-8472-47f5-86ca-962f38c00774'),
  ('TanTan', 4, 'Still one of my favorite tantans in Berlin, not too heavy but still very flavorful', '7181dafc-b2ca-48bf-8d09-a743bd4b2897', '272de710-f5c5-4c23-b86f-cd64542115f3'),
  ('Other', 4, 'Very interesting stamina ramen, not sure what kind of broth it is. Lots of pork belly and quite spicy.', 'f902d778-5d57-4c24-911e-4d6da1813460', '68f6cfed-9351-4243-a74d-5512bd610447');

INSERT INTO checkin_like (checkin_id, person_id) VALUES ('f31ce9f7-3723-459c-bd7d-650aa22f746c', '68f6cfed-9351-4243-a74d-5512bd610447');

END;

('Tonkotsu', 3, 'Very heavy and fishy tonkotsu, not my favorite, almost too intense.', '8ed074a3-508f-472d-879d-6021897ce608', '272de710-f5c5-4c23-b86f-cd64542115f3');


-- checkins with place and username
SELECT c.id, rating, review, place_id, name AS place, person_id, username AS person_usernam
FROM checkin c 
LEFT JOIN place ON c.place_id = place.id
LEFT JOIN person ON c.person_id = person.id;

-- checkin with place and username
SELECT c.id, rating, review, place_id, name AS place, person_id, username AS person_username
FROM checkin c 
LEFT JOIN place ON c.place_id = place.id
LEFT JOIN person ON c.person_id = person.id
WHERE c.id = $1;

-- number of checkins by person
SELECT p.id AS person_id, p.username, COUNT (c.id) AS checkins
FROM person p
LEFT JOIN checkin c ON p.id = c.person_id
GROUP BY p.id;

-- checkins ordered by person.id
SELECT p.id AS person_id, p.username
FROM person p
LEFT JOIN checkin c ON p.id = c.person_id
ORDER BY p.id;

-- persons with json_agg array of checkins (replaces [null] with [] if no checkins)
SELECT p.id, username, email, COALESCE(json_agg(c) FILTER (WHERE c.person_id IS NOT NULL), '[]'::json) AS checkins
FROM person p
LEFT JOIN checkin c ON p.id = c.person_id
GROUP BY p.id

-- same as above but for single person
SELECT p.id, username, email, COALESCE(json_agg(c) FILTER (WHERE c.person_id IS NOT NULL), '[]'::json) AS checkins
FROM person p
LEFT JOIN checkin c ON p.id = c.person_id
WHERE p.id = '272de710-f5c5-4c23-b86f-cd64542115f3'
GROUP BY p.id

-- places with json_agg array of checkins (replaces [null] with [] if no checkins)
SELECT p.id, name, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
FROM place p
LEFT JOIN checkin c ON p.id = c.place_id
GROUP BY p.id

-- same as above but for single place
SELECT p.id, name, COALESCE(json_agg(c) FILTER (WHERE c.place_id IS NOT NULL), '[]'::json) AS checkins
FROM place p
LEFT JOIN checkin c ON p.id = c.place_id
WHERE p.id = $1
GROUP BY p.id

-- join data after an insert

WITH inserted AS (
  INSERT INTO checkin(bowl, rating, review, place_id, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *
)
SELECT inserted.*, place.name AS place_name, person.username AS person_username
FROM inserted
LEFT JOIN place ON inserted.place_id = place.id
LEFT JOIN person ON inserted.person_id = person.id