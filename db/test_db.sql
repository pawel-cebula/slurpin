DROP DATABASE IF EXISTS slurpin_test;
CREATE DATABASE slurpin_test WITH ENCODING='UTF8';

\c slurpin_test

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  email VARCHAR(254) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TYPE bowl_type AS ENUM ('Tonkotsu', 'Shio', 'Shoyu', 'Miso', 'TanTan', 'Tsukemen', 'Other');

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

INSERT INTO person(username, email, id, password) VALUES ('admin', 'admin@gmail.com', '5eca6b63-1e5a-4f41-8acd-ebd947a04ec6', '$2a$10$PIDtbKljU57OgHr3zP7eS.0E20Vo/RmQcAWEw4FLFN9dgy1Fg2/aG'), ('pawel-123', 'pawel-123@gmail.com', '272de710-f5c5-4c23-b86f-cd64542115f3', 'dummy hash'), ('ramen-freak', 'ramenfreak123@gmail.com', '68f6cfed-9351-4243-a74d-5512bd610447', 'dummy hash'), ('emptybowl', 'fake-email321@gmail.com', '3b3cbff4-8472-47f5-86ca-962f38c00774', 'dummy hash');

INSERT INTO checkin (bowl, rating, review, place_id, person_id, id) VALUES
  ('Tonkotsu', 4, 'Pretty good tonkotsu, noodles a bit too soft though.', 'c8647c26-0c20-414a-88ca-35906b346585', '272de710-f5c5-4c23-b86f-cd64542115f3', '92d19c1b-0641-4616-bec8-2ebc9275b6c5'),
  ('Miso', 5, 'Amazing Sapporo Miso Ramen, surprisingly good chicken thigh.', '641c205c-4576-4d69-b374-98e8f5222052', '68f6cfed-9351-4243-a74d-5512bd610447', 'ab789563-6e6c-4dfc-96fe-e202a5b74e81'),
  ('TanTan', 3, 'The tantan was way too heavy, barely managed to finish it', '8ed074a3-508f-472d-879d-6021897ce608', '3b3cbff4-8472-47f5-86ca-962f38c00774', 'a9b08437-b1ef-4e8b-9afc-531558ca6594'),
  ('TanTan', 4, 'Still one of my favorite tantans in Berlin, not too heavy but still very flavorful', '7181dafc-b2ca-48bf-8d09-a743bd4b2897', '272de710-f5c5-4c23-b86f-cd64542115f3', 'a3a75c27-705a-4906-ae14-528238ad9ebb'),
  ('Other', 4, 'Very interesting stamina ramen, not sure what kind of broth it is. Lots of pork belly and quite spicy.', 'f902d778-5d57-4c24-911e-4d6da1813460', '68f6cfed-9351-4243-a74d-5512bd610447', '50b55991-426b-4a36-8d19-96142652d101');

INSERT INTO checkin_like (checkin_id, person_id) VALUES 
  ('92d19c1b-0641-4616-bec8-2ebc9275b6c5', '68f6cfed-9351-4243-a74d-5512bd610447'), 
  ('50b55991-426b-4a36-8d19-96142652d101', '68f6cfed-9351-4243-a74d-5512bd610447'),
  ('50b55991-426b-4a36-8d19-96142652d101', '5eca6b63-1e5a-4f41-8acd-ebd947a04ec6');