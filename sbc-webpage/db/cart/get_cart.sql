SELECT *
FROM sbc_carts
WHERE sbc_user_id =$1 AND active=TRUE;