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