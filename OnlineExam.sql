USE master; -- Chuyển sang database master
GO

-- Đặt database vào chế độ SINGLE_USER để ngắt tất cả kết nối
ALTER DATABASE OnlineExam SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO
-- Xóa database cũ (nếu cần)
USE master;
GO
DROP DATABASE IF EXISTS OnlineExam;
GO

-- Tạo database mới
CREATE DATABASE OnlineExam;
GO

-- Sử dụng database vừa tạo
USE OnlineExam;
GO

-- Tạo bảng users (Người dùng)
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
	Full_name VARCHAR(100) NOT NULL UNIQUE,
	Birthday DATE,
	Class VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student')),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Tạo bảng exams (Bài thi)
CREATE TABLE exams (
    exam_id INT IDENTITY(1,1) PRIMARY KEY,
    exam_name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL, -- Thời gian làm bài (phút)
    created_at DATETIME DEFAULT GETDATE(),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
GO

-- Tạo bảng question_bank (Kho câu hỏi)
CREATE TABLE question_bank (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    question_text TEXT NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
GO

-- Tạo bảng questions (Liên kết câu hỏi từ kho câu hỏi với bài thi)
CREATE TABLE questions (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    exam_id INT NOT NULL,
    question_bank_id INT NOT NULL, -- Tham chiếu đến question_bank
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (question_bank_id) REFERENCES question_bank(question_id)
);
GO

-- Tạo bảng results (Kết quả)
CREATE TABLE results (
    result_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score INT NOT NULL,
    submitted_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);
GO

-- Tạo bảng user_answers (Câu trả lời của thí sinh)
CREATE TABLE user_answers (
    answer_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option INT NOT NULL, -- Lưu trữ số thứ tự của đáp án mà thí sinh chọn (1, 2, 3, 4)
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);
GO

-- Tạo bảng exam_attempts (Lần thi)
CREATE TABLE exam_attempts (
    attempt_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    attempt_number INT NOT NULL,
    start_time DATETIME DEFAULT GETDATE(),
    end_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);
GO

-- Thêm dữ liệu mẫu vào bảng users
INSERT INTO users (username, password_hash, email, Full_name, Birthday, Class, role, created_at)  
VALUES  
('admin01', 'hashed_password_1', 'admin01@example.com', 'Nguyen Van A', '1990-01-01', 'Admin', 'admin', GETDATE()),  
('student01', 'hashed_password_2', 'student01@example.com', 'Tran Thi B', '2002-05-15', 'Class A', 'student', GETDATE()),  
('student02', 'hashed_password_3', 'student02@example.com', 'Le Van C', '2001-08-20', 'Class B', 'student', GETDATE()),  
('student03', 'hashed_password_4', 'student03@example.com', 'Pham Minh D', '2003-11-30', 'Class C', 'student', GETDATE()),  
('student04', 'hashed_password_5', 'student04@example.com', 'Hoang Bao E', '2000-02-10', 'Class D', 'student', GETDATE()),  
('student05', 'hashed_password_6', 'student05@example.com', 'Doan Thi F', '2002-07-25', 'Class E', 'student', GETDATE()),  
('student06', 'hashed_password_7', 'student06@example.com', 'Nguyen Huu G', '2001-12-05', 'Class F', 'student', GETDATE()),  
('student07', 'hashed_password_8', 'student07@example.com', 'Bui Van H', '2003-04-18', 'Class G', 'student', GETDATE()),  
('student08', 'hashed_password_9', 'student08@example.com', 'Dang Thi I', '2000-09-22', 'Class H', 'student', GETDATE()),  
('student09', 'hashed_password_10', 'student09@example.com', 'Vo Minh K', '2002-06-14', 'Class I', 'student', GETDATE());  
GO


-- Thêm dữ liệu mẫu vào bảng exams
INSERT INTO exams (exam_name, description, duration, created_by)
VALUES 
('Toán cơ bản', 'Bài thi toán cơ bản dành cho học sinh lớp 10', 60, 1),
('Vật lý cơ bản', 'Bài thi vật lý cơ bản dành cho học sinh lớp 10', 45, 1);
GO

-- Thêm dữ liệu mẫu vào bảng question_bank
INSERT INTO question_bank (question_text, option1, option2, option3, option4, correct_option, created_by)
VALUES 
('2 + 2 = ?', '3', '4', '5', '6', 2, 1),
('5 * 5 = ?', '20', '25', '30', '35', 2, 1),
('Lực hấp dẫn được tính bằng công thức nào?', 'F = ma', 'F = mg', 'F = mv', 'F = mgh', 2, 1);
GO

-- Thêm dữ liệu mẫu vào bảng questions (liên kết với question_bank)
INSERT INTO questions (exam_id, question_bank_id)
VALUES 
(1, 1), -- Bài thi 1, câu hỏi 1 từ kho câu hỏi
(1, 2), -- Bài thi 1, câu hỏi 2 từ kho câu hỏi
(2, 3); -- Bài thi 2, câu hỏi 3 từ kho câu hỏi
GO

-- Thêm dữ liệu mẫu vào bảng results
INSERT INTO results (user_id, exam_id, score)
VALUES 
(2, 1, 90),
(3, 1, 85),
(2, 2, 95);
GO

-- Thêm dữ liệu mẫu vào bảng user_answers
INSERT INTO user_answers (user_id, exam_id, question_id, selected_option)
VALUES 
(2, 1, 1, 2),
(2, 1, 2, 2),
(3, 1, 1, 2),
(3, 1, 2, 1);
GO

-- Thêm dữ liệu mẫu vào bảng exam_attempts
INSERT INTO exam_attempts (user_id, exam_id, attempt_number, start_time, end_time)
VALUES 
(2, 1, 1, GETDATE(), DATEADD(MINUTE, 60, GETDATE())),
(3, 1, 1, GETDATE(), DATEADD(MINUTE, 55, GETDATE()));
GO
USE OnlineExamDB;
GO

-- Select từng bảng
SELECT 'users' AS TableName, * FROM users;
SELECT 'exams' AS TableName, * FROM exams;
SELECT 'question_bank' AS TableName, * FROM question_bank;
SELECT 'questions' AS TableName, * FROM questions;
SELECT 'results' AS TableName, * FROM results;
SELECT 'user_answers' AS TableName, * FROM user_answers;
SELECT 'exam_attempts' AS TableName, * FROM exam_attempts;
GO
