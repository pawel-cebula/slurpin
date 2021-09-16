-- Variations of queries used in routes for reference

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