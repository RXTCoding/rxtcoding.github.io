UPDATE sbc_prod_cart_junct
SET quantity= $3
WHERE cart_id= $1 AND product_id=$2;
SELECT * FROM sbc_prod_cart_junct pc
JOIN sbc_products p ON pc.product_id= p.product_id
WHERE pc.cart_id= $1
ORDER BY pc.product_id;