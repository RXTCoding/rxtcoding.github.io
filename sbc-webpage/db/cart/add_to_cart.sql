INSERT INTO sbc_prod_cart_junct
(cart_id, product_id, quantity)
VALUES
($1,$2,$3);
SELECT * FROM sbc_prod_cart_junct pc
JOIN sbc_products p ON pc.product_id= p.product_id
WHERE pc.cart_id= $1
ORDER BY pc.product_id;