DROP TABLE IF EXISTS redfin_data;

CREATE TABLE redfin_data (
    ID int NOT NULL,
    property_type VARCHAR,
    address VARCHAR,
 	city VARCHAR,
 	state VARCHAR,
 	zip VARCHAR,
 	price INT,
 	beds FLOAT,
 	baths FLOAT,
 	neighborhood VARCHAR,
 	sqfoot FLOAT,
 	price_sqfoot FLOAT,
 	hoa_month FLOAT,
 	latitude VARCHAR,
 	longitude VARCHAR,
 	built_year VARCHAR(4),
	coordinates VARCHAR,
	PRIMARY KEY (ID)
);

SELECT * FROM redfin_data;

-- SELECT DISTINCT(property_type) 
-- FROM redfin;
