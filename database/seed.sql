INSERT INTO users (name,email,password_hash,role) VALUES
('Abhay Rana','admin@test.com','$2b$10$PcAa9T2ovO.yDCLK.JO0XuWMnihPmwVsT7Wb.Kv4ToqZ0.6Jh9rD6','ADMIN'),
('Sales User','sales@test.com','$2b$10$EotEtVfaZLZI98yMeW2d0eyNnJC1w/qT3z/L6vBr.Rs.NCIw7pOsO','SALES'),
('Warehouse User','warehouse@test.com','$2b$10$yp3jwyjgcM9bz0T6oNdkYehfAif6HEWPzjO7b4PZyEguRK8OyBjbS','WAREHOUSE'),
('Accounts User','accounts@test.com','$2b$10$kL/kethyg3730j4G8oP6r.6msXu6oQGGbhBwEDHecPbql0j7C1sk6','ACCOUNTS'),
('Admin User','admin@gmail.com','$2b$10$PcAa9T2ovO.yDCLK.JO0XuWMnihPmwVsT7Wb.Kv4ToqZ0.6Jh9rD6','ADMIN'),
('Sales Manager','sales@gmail.com','$2b$10$EotEtVfaZLZI98yMeW2d0eyNnJC1w/qT3z/L6vBr.Rs.NCIw7pOsO','SALES'),
('Warehouse Lead','warehouse@gmail.com','$2b$10$yp3jwyjgcM9bz0T6oNdkYehfAif6HEWPzjO7b4PZyEguRK8OyBjbS','WAREHOUSE'),
('Accounts Head','accounts@gmail.com','$2b$10$kL/kethyg3730j4G8oP6r.6msXu6oQGGbhBwEDHecPbql0j7C1sk6','ACCOUNTS');

INSERT INTO customers (name,mobile,email,business_name,gst_number,customer_type,address,status,follow_up_date,notes) VALUES
('ABC Enterprises','9876543210','abc@example.com','ABC Enterprises','24ABCDE1234F1Z5','RETAIL','123 MG Road, Delhi - 110001','ACTIVE','2026-08-15','Regular customer'),
('Sharma Traders','9812345678','sharma@example.com','Sharma Traders','24SHAR1234F1Z2','WHOLESALE','Ahmedabad, Gujarat','ACTIVE','2026-08-12','High volume account'),
('Global Supplies','9922334455','global@example.com','Global Supplies',NULL,'DISTRIBUTOR','Mumbai, Maharashtra','ACTIVE','2026-08-20','Distributor lead'),
('Kumar Agencies','9654789123','kumar@example.com','Kumar Agencies',NULL,'RETAIL','Vadodara, Gujarat','LEAD','2026-08-18','Call next week'),
('R.K. Distributors','9898989899','rk@example.com','R.K. Distributors','24RKDI1234F1Z8','WHOLESALE','Surat, Gujarat','ACTIVE',NULL,'Key account'),
('Pooja Enterprises','9123456780','pooja@example.com','Pooja Enterprises',NULL,'RETAIL','Rajkot, Gujarat','ACTIVE','2026-08-22','');

INSERT INTO products (name,sku,category,unit_price,current_stock,min_stock,location) VALUES
('LED TV 32 Inch','LED-32','Electronics',15000,25,5,'Main Warehouse'),
('LED TV 43 Inch','LED-43','Electronics',25000,18,5,'Main Warehouse'),
('Washing Machine 6kg','WM-6KG','Home Appliances',18000,12,4,'Main Warehouse'),
('Refrigerator 256L','REF-256','Home Appliances',28500,8,3,'Main Warehouse'),
('Mixer Grinder 500W','MIX-500','Home Appliances',2500,40,10,'Main Warehouse'),
('USB Keyboard','KEY-002','Computer Accessories',500,10,3,'Main Warehouse'),
('Wireless Mouse','MOU-101','Computer Accessories',750,22,5,'Main Warehouse');

INSERT INTO stock_movements(product_id,quantity,movement_type,reason,created_by)
SELECT id, current_stock, 'IN', 'Opening stock', 1 FROM products;

INSERT INTO followups(customer_id,follow_up_date,type,note,status,created_by) VALUES
(1,'2026-08-15','CALL','Discussed about new product range','COMPLETED',2),
(2,'2026-08-12','MEETING','Meeting with customer','COMPLETED',2),
(4,'2026-08-18','CALL','Intro call','PENDING',2);
