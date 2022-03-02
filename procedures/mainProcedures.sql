use ExamSystem

------------------------------------------ delete & update
--cource
CREATE PROCEDURE DeleteCource 
       @id  Int =null      
AS 
BEGIN 
    DELETE FROM dbo.Courses WHERE dbo.Courses.Crs_ID= @id;
END 
--
CREATE PROCEDURE UpdateCource 
       @id  Int =null ,
	   @Name VARCHAR(50) =NUll , 
       @Insructor_id  Int =null 
AS 
BEGIN 
   UPDATE dbo.Courses
	SET Crs_Name = @Name, Ins_ID =  @Insructor_id WHERE dbo.Courses.Crs_ID= @id;
END 
--department
CREATE PROCEDURE DeleteDepartment
       @id  Int =null      
AS 
BEGIN 
    DELETE FROM dbo.Departments WHERE dbo.Departments.Dept_ID= @id;
END 
--
CREATE PROCEDURE UpdateDepartment 
       @id  Int =null ,
	     @Name VARCHAR(50) =NUll  
       
AS 
BEGIN 
   UPDATE dbo.Departments
	SET Dept_Name =@Name WHERE dbo.Departments.Dept_ID= @id;
END
--exam
CREATE PROCEDURE DeleteExam
       @id  Int =null      
AS 
BEGIN 
    DELETE FROM dbo.Exams WHERE dbo.Exams.Exam_ID= @id;
END 
--
CREATE PROCEDURE UpdateExam
       @id  Int =null ,
	    @studentId int =NUll,
       @courseId int =NUll,
	   @duration int =null,
	   @totalMark int =null  
       
AS 
BEGIN 
   UPDATE dbo.Exams
	SET Std_ID = @studentId,Crs_ID = @courseId ,Duration = @duration,Total_Mark = @totalMark WHERE dbo.Exams.Exam_ID= @id;
END

--examQuestion
CREATE PROCEDURE DeleteExamQuestion
       @questId int =NUll,
	   @examId int =NUll    
AS 
BEGIN 
    DELETE FROM dbo.Exams_Questions WHERE Exam_ID=  @examId and Ques_ID = @questId;
END 
--
CREATE PROCEDURE UpdateExamQuestion
       @questId int =NUll,
	   @examId int =NUll,
	   @ansId int =NUll

AS 
BEGIN 
     UPDATE dbo.Exams_Questions
	SET Ans_ID =@ansId WHERE Exam_ID=  @examId and Ques_ID = @questId;
END
--instructor
CREATE PROCEDURE DeleteInstructor
       @instructorId int =NUll  
AS 
BEGIN 
    DELETE FROM dbo.Instructors WHERE Ins_ID =  @instructorId;
END 
--
CREATE PROCEDURE UpdateInstructor
       @instructorId int =NUll,
	   @deptId int =NUll

AS 
BEGIN 
     UPDATE dbo.Instructors
	SET Dept_ID=@deptId WHERE Ins_ID =  @instructorId;
END

--questions
CREATE PROCEDURE DeleteQuestion
       @Id int =NUll  
AS 
BEGIN 
    DELETE FROM dbo.Questions WHERE Ques_ID =  @Id;
END 
--
CREATE PROCEDURE UpdateQuestion
	   @Id int =NUll ,
       @body nvarchar(MAX) =null,
	   @correctAnswer nvarchar(MAX) =null,
	   @type nchar(10)=null,
	   @degree int =null,
	   @courseId int=null
AS 
BEGIN 
     UPDATE dbo.Questions
	SET Body = @body,Correct_Answer = @correctAnswer,Type = @type,Degree = @degree,Crs_ID = @courseId WHERE Ques_ID =  @Id;
END
--questionsAnswers
CREATE PROCEDURE DeleteQuestionAnswer
        @questId int=null  ,
		@ansId int = null
AS 
BEGIN 
    DELETE FROM dbo.Questions_Answers WHERE Ques_ID = @questId and Ans_ID =@ansId;
END 
--
CREATE PROCEDURE UpdateQuestionAnswer 
        @questId int=null  ,
		@ansId int = null,
	    @body nvarchar(MAX) =null        
AS 
BEGIN 
   UPDATE dbo.Questions_Answers
	SET Body =@body WHERE Ques_ID = @questId and Ans_ID =@ansId
END

--studentCources
CREATE PROCEDURE DeleteStudentCource
         @studentId int =NUll,
		 @courseId int =NUll
AS 
BEGIN 
    DELETE FROM dbo.Student_Courses WHERE Std_ID = @studentId and Crs_ID = @courseId;
END 

--student
CREATE PROCEDURE DeleteStudent
       @stdId int =NUll  
AS 
BEGIN 
    DELETE FROM dbo.Students WHERE Std_ID =  @stdId;
END 
--
CREATE PROCEDURE UpdateStudent
       @stdId int =NUll,
	   @deptId int =NUll

AS 
BEGIN 
     UPDATE dbo.Students
	SET Dept_ID=@deptId WHERE Std_ID =  @stdId;
END

--topic
CREATE PROCEDURE DeleteTopic
       @Id int =NUll  
AS 
BEGIN 
    DELETE FROM dbo.Topics WHERE Top_ID =  @Id;
END 
--
CREATE PROCEDURE UpdateTopic
		@Id int =NUll ,
        @courseId int =NUll,
	   @topName varchar(50) =NUll

AS 
BEGIN 
     UPDATE  dbo.Topics
	SET Crs_ID = @courseId,Top_Name = @topName WHERE Top_ID =  @Id;
END
--users
CREATE PROCEDURE DeleteUser
       @Id int =NUll  
AS 
BEGIN 
    DELETE FROM dbo.Users WHERE ID =  @Id;
END 
--
CREATE PROCEDURE UpdateUser
		@Id int =NUll ,
         @Name VARCHAR(50) =NUll,
       @userName VARCHAR(50) =NUll,
	   @type nchar(1)=null,
	   @password nvarchar(MAX) =null

AS 
BEGIN 
     UPDATE  dbo.Users
	SET Name =@Name,userName = @userName,Password = @password,Type = @type WHERE ID =  @Id;
END

------------------------------------------ selectAll
--course
CREATE PROCEDURE SelectAllCourse   
AS 
BEGIN 
     Select * from dbo.Courses; 
END 
--department
CREATE PROCEDURE SelectAllDepartment 
AS 
BEGIN 
     Select * from dbo.Departments; 
END 
--exam
CREATE PROCEDURE SelectAllExam 
AS 
BEGIN 
     Select * from dbo.Exams; 
END 
--examQuestion
CREATE PROCEDURE SelectAllExamQuestion
AS 
BEGIN 
     Select * from dbo.Exam_Questions; 
END 
--instructor
CREATE PROCEDURE SelectAllInstructor
AS 
BEGIN 
     Select * from dbo.Instructors; 
END 
--questions
CREATE PROCEDURE SelectAllQuestion
AS 
BEGIN 
     Select * from dbo.Questions; 
END 
--questionsAnswers
CREATE PROCEDURE SelectAllQuestionAnswer
AS 
BEGIN 
     Select * from dbo.Questions_Answers; 
END 
--studentCources
CREATE PROCEDURE SelectAllStudentCource
AS 
BEGIN 
     Select * from dbo.Student_Courses; 
END 
--student
CREATE PROCEDURE SelectAllStudent
AS 
BEGIN 
     Select * from dbo.Students; 
END 
--topic
CREATE PROCEDURE SelectAllTopic
AS 
BEGIN 
     Select * from dbo.Topics; 
END 
--users
CREATE PROCEDURE SelectAllUser
AS 
BEGIN 
     Select * from dbo.Users; 
END 

------------------------------------------ insert
--cource
CREATE PROCEDURE InsertCourse 
       @Name VARCHAR(50) =NUll , 
       @Insructor_id  Int =null      
AS 
BEGIN 
     INSERT INTO dbo.Courses(Crs_Name,Ins_ID) 
     VALUES( @Name,@Insructor_id) 
END 

--department
CREATE PROCEDURE InsertDepartment 
       @Name VARCHAR(50) =NUll 
AS 
BEGIN 
     INSERT INTO dbo.Departments(Dept_Name) 
     VALUES( @Name) 
END 

--exam
create PROCEDURE InsertExam 
       @studentId int =NUll,
       @courseId int =NUll,
	   @duration int =null,
	   @totalMark int =null
AS 
BEGIN 
     INSERT INTO dbo.Exams(Std_ID,Crs_ID,Duration,Total_Mark ) 
     VALUES( @studentId,@courseId,@duration,@totalMark ) 
END

--examQuestion
create PROCEDURE InsertExamQuestion
       @questId int =NUll,
	   @examId int =NUll,
	   @ansId int =NUll

AS 
BEGIN 
     INSERT INTO dbo.Exams_Questions(Ques_ID,Exam_ID,Ans_ID) 
     VALUES( @questId,@examId, @ansId) 
END

--instructor
CREATE PROCEDURE InsertInstructor
       @instructorId int =NUll,
	   @deptId int =NUll
AS 
BEGIN 
     INSERT INTO dbo.Instructors(Ins_ID,Dept_ID) 
     VALUES( @instructorId,@deptId) 
END

--questions
alter PROCEDURE InsertQuestion
	   @body nvarchar(MAX) =null,
	   @correctAnswer int =null,
	   @type nchar(10)=null,
	   @degree int =null,
	   @courseId int=null
   
AS 
BEGIN 
     INSERT INTO dbo.Questions(Body,Correct_Answer,Type,Degree,Crs_ID) 
     VALUES(@body,@correctAnswer,@type,@degree,@courseId) 
END

--questionsAnswers
CREATE PROCEDURE InsertQuestionAnswer
	   @questId int=null,
	   @body nvarchar(MAX) =null
   
AS 
BEGIN 
     INSERT INTO dbo.Questions_Answers(Ques_ID,Body) 
     VALUES( @questId,@body) 
END

--studentCources
CREATE PROCEDURE InsertStudentCource
       @studentId int =NUll,
       @courseId int =NUll
AS 
BEGIN 
     INSERT INTO dbo.Student_Courses(Std_ID,Crs_ID) 
     VALUES( @studentId,@courseId) 
END

--student
CREATE PROCEDURE InsertStudent
       @studentId int =NUll,
	   @deptId int =NUll
AS 
BEGIN 
     INSERT INTO dbo.Students(Std_ID,Dept_ID) 
     VALUES( @studentId,@deptId) 
END

--topic
CREATE PROCEDURE InsertTopic
       @courseId int =NUll,
	   @topName varchar(50) =NUll
AS 
BEGIN 
     INSERT INTO dbo.Topics(Crs_ID,Top_Name) 
     VALUES( @courseId,@topName) 
END

--users
CREATE PROCEDURE InsertUser
       @Name VARCHAR(50) =NUll,
       @userName VARCHAR(50) =NUll,
	   @type nchar(1)=null,
	   @password nvarchar(MAX) =null
   
AS 
BEGIN 
     INSERT INTO dbo.Users(Name,userName,Password,Type) 
     VALUES( @Name, @userName,@password,@type) 
END
