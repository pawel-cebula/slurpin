BEGIN;

CREATE TABLE place(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE person(
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE checkin(
  id uuid DEFAULT uuid_generate_v4(),
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review VARCHAR(500),
  place_id uuid NOT NULL,
  person_id uuid NOT NULL,
  FOREIGN KEY (place_id) REFERENCES place (id),
  FOREIGN KEY (person_id) REFERENCES person (id),
  PRIMARY KEY (id)
);

INSERT INTO place(name) VALUES ('Cocolo Ramen Mitte'), ('Cocolo Ramen Kreuzberg'), ('Takumi Nine'), ('Hako Ramen Boxi'), ('Buya Ramen Factory');

INSERT INTO person(username, email) VALUES ('pawel-123', 'pawel-123@gmail.com'), ('ramen-freak', 'ramenfreak123@gmail.com'), ('emptybowl', 'fake-email321@gmail.com');

INSERT INTO checkin (rating, review, place_id, person_id) VALUES
  (4, 'Pretty good tonkotsu, noodles a bit too soft though.', 'c8647c26-0c20-414a-88ca-35906b346585', '272de710-f5c5-4c23-b86f-cd64542115f3'),
  (5, 'Amazing Sapporo Miso Ramen, surprisingly good chicken thigh.', '641c205c-4576-4d69-b374-98e8f5222052', '68f6cfed-9351-4243-a74d-5512bd610447'),
  (3, 'The tantan was way too heavy, barely managed to finish it', '8ed074a3-508f-472d-879d-6021897ce608', '3b3cbff4-8472-47f5-86ca-962f38c00774');
  

END;


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