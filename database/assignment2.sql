

INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark','tony@starkent.com', 'Iam1ronM@n');

UPDATE account SET account_type = 'Admin' WHERE account_id = 1;

DELETE FROM account WHERE account_id = 1;

SELECT * FROM account WHERE account_email = 'tony@starkent.com';

UPDATE inventory 
    SET inv_description = REPLACE(inv_description, 'small interiors','a huge interior')
    WHERE inv_id = 10;

SELECT inv_model, inv_make, classification.classification_name 
FROM inventory 
INNER JOIN classification 
ON  inventory.classification_id = classification.classification_id 
WHERE classification_name = 'Sport';

UPDATE inventory 
    SET inv_image = REPLACE(inv_image, '/images','/images/vehicles'),
        inv_thumbnail = REPLACE(inv_thumbnail, '/images','/images/vehicles');

