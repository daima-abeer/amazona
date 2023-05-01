
# Amazona

E-Commerce Website Using NodeJS, PUG, ExpressJS, Multer, &amp; MySQL

  

# Database
Following settings can be changed by modifying app.js file
> Database Name: estore
> Database User: root
> Database Password: 
> Database Host: localhost

## Database Tables Structure

### Table: addresses

| Column                  | Data Type     | Constraints       |
|-------------------------|--------------|-------------------|
| id                      | int(11)      | NOT NULL          |
| customer_id             | int(11)      | DEFAULT NULL      |
| street_address          | varchar(255) | DEFAULT NULL      |
| city                    | varchar(255) | DEFAULT NULL      |
| state_province_region   | varchar(255) | DEFAULT NULL      |
| country                 | varchar(255) | DEFAULT NULL      |
| postal_code             | varchar(255) | DEFAULT NULL      |
| type                    | enum         | 'shipping', 'billing' |

### Table: orders

| Column                  | Data Type     | Constraints                                   |
|-------------------------|--------------|-----------------------------------------------|
| id                      | int(11)      | NOT NULL                                      |
| customer_id             | int(11)      | NOT NULL                                      |
| order_date              | datetime     | NOT NULL, DEFAULT current_timestamp()         |
| total                   | decimal(10,2)| NOT NULL                                      |
| status                  | enum         | 'pending', 'processing', 'shipped', 'delivered', 'cancelled', DEFAULT 'pending' |
| payment_method          | enum         | 'credit_card', 'paypal', 'cash_on_delivery', NOT NULL, DEFAULT 'cash_on_delivery' |
| payment_status          | enum         | 'pending', 'paid', NOT NULL, DEFAULT 'pending' |
| created_at              | timestamp    | NOT NULL, DEFAULT current_timestamp()         |
| updated_at              | timestamp    | NOT NULL, DEFAULT current_timestamp(), ON UPDATE current_timestamp() |

### Table: order_details

| Column                  | Data Type     | Constraints                                   |
|-------------------------|--------------|-----------------------------------------------|
| id                      | int(11)      | NOT NULL                                      |
| order_id                | int(11)      | NOT NULL                                      |
| product_id              | int(11)      | NOT NULL                                      |
| quantity                | int(11)      | NOT NULL                                      |
| price                   | decimal(10,2)| NOT NULL                                      |
| created_at              | timestamp    | NOT NULL, DEFAULT current_timestamp()         |
| updated_at              | timestamp    | NOT NULL, DEFAULT current_timestamp(), ON UPDATE current_timestamp() |

### Table: products

| Column                  | Data Type     | Constraints       |
|-------------------------|--------------|-------------------|
| id                      | int(11)      | NOT NULL          |
| name                    | varchar(255) | NOT NULL          |
| rating                  | float        | DEFAULT 0         |
| thumbnail               | varchar(255) | NOT NULL          |
| price                   | float        | NOT NULL          |

### Table: users

| Column                  | Data Type     | Constraints       |
|-------------------------|--------------|-------------------|
| id                      | int(11)      | NOT NULL          |
| name                    | varchar(255) | NOT NULL          |
| email                   | varchar(255) | NOT NULL, UNIQUE  |
| username                | varchar(255) | NOT NULL, UNIQUE  |
| password                | varchar(255) | NOT NULL          |


