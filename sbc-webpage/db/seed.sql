CREATE TABLE sbc_users ( --SBC=shidasbroomcloset
  sbc_user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(2000)
);

CREATE TABLE sbc_products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  product_description VARCHAR(1000),
  product_image VARCHAR(2000)
  price VARCHAR(50)
);

CREATE TABLE sbc_carts (
  cart_id SERIAL PRIMARY KEY,
  sbc_user_id INT REFERENCES sbc_users(sbc_user_id),
  active BOOLEAN
);

CREATE TABLE sbc_prod_cart_junct (
  product_cart_id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES sbc_carts(cart_id),
  product_id INT REFERENCES sbc_products(product_id),
  quantity INT
);

-- ALTER TABLE sbc_products
-- ADD COLUMN price VARCHAR(50);

-- UPDATE users
-- SET name = 'Matias'
-- WHERE id = 1;

-- INSERT INTO
-- sbc_products (product_name, product_description,product_image)
-- VALUES
-- ('Labradorite', '1 Raw Labradorite crystal. CHEMICAL MAKE UP: Sodium calcium aluminium silicate. LABRADORITE PROPERTITIES: This Semi-Opaque peacock like, iridescent crystal inspires creativityAssists in clearing mental fog and promotes mental clarity. It is associated with the thrid-eye chakra which makes it great for those starting new projects and creative ventures. Increases psychic abilities, dream interpretations and accessing inner knowledge. Promotes ease when dealing with change, fear and frustration.', 
-- 'https://shidas-broom-closet.s3.us-east-2.amazonaws.com/Labradorite+5.jpeg'); <---this is the updated image must change in table in SQL