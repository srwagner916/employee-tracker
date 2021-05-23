-- ===== Seed departments =====
INSERT INTO departments (name)
VALUES
('sales'),
('engineering'),
('legal'),
('finance');

-- ===== Seed Roles =====
INSERT INTO role (title, salary, department_id)
VALUES
('junior salesperson', 50000, 1),
('senior salesperson', 60000, 1),
('manager of sales', 80000, 1),
('junior engineer', 50000, 2),
('senior engineer', 60000, 2),
('engineering lead', 80000, 2),
('engineering lead assistant', 65000, 2),
('legal operations analyst', 90000, 3),
('legal operations specialist', 100000, 3),
('director of legal operations', 120000, 3),
('accounting clerk', 60000, 4),
('accountant', 80000, 4),
('accounting manager', 95000, 4);

-- ===== Seed Employees =====
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Randolph', 'Stokes', 3, null),
('Evan', 'Marsh', 6, null),
('Sergio', 'Jennings', 10, null),
('Melba', 'Owens', 13, null),
('Marion', 'Manning', 11, 4),
('Lowell', 'Little', 2, 1),
('Marcella', 'Lowe', 11, 4),
('Wesley', 'Singleton', 4, 2),
('Antoinette', 'Morrison', 9, 4),
('Christion', 'McGuire', 1, 1),
('Lawrence', 'Clark', 12, 4),
('Alton', 'Bates', 12, 4),
('Ronald', 'Haynes', 8, 3),
('Abel', 'Ross', 2, 1),
('Bertha', 'Bell', 4, 2),
('Josefina', 'Vasquez', 1, 1),
('Willie', 'Patterson', 12, 4),
('Hector', 'James', 7, 2),
('Harvey', 'Arnold', 12, 4),
('Matt', 'McKinney', 4, 2),
('Rudolph', 'Carpenter', 8, 3),
('Bryant', 'Boyd', 1, 1),
('Charlie', 'Ruiz', 1, 1),
('Dianna', 'Schneider', 1, 1),
('Jerimiah', 'Allison', 8, 3),
('Jane', 'Barnes', 5, 2),
('Gerald', 'Wong', 5, 2),
('Elvira', 'Herrera', 11, 4),
('Pamela', 'Todd', 4, 2),
('Hubert', 'Richardson', 9, 3),
('Tommy', 'Patrick', 2, 1);