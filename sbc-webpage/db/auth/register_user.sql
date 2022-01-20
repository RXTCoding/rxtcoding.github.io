INSERT INTO sbc_users
(email, password)
VALUES
($1,$2) RETURNING *;