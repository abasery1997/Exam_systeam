--1------> generate exam
create procedure generateExam 
		@courseId int,
		@studentId int,
		@T_F int,
		@MCQ int,
		@duration int
as
begin
	exec insertExam @studentId, @courseId, @duration
	-- get examId of last inserted exam
	declare @examId int
	select @examId = Exam_ID from Exams
	where @courseId = Crs_ID and @studentId = Std_ID
	-- select random questions
	exec chooseQuesEachType @T_F, @examId, @courseId, 'tf'
	exec chooseQuesEachType @MCQ, @examId, @courseId, 'm'
end

--2 loop for choose questions in each type
create procedure chooseQuesEachType
		@noQ int,
		@examId int,
		@courseId int,
		@type nchar(10)
as
begin
	declare @randQ int
	declare @i int = 0
	while @i < @noQ
	begin
		SELECT TOP 1 @randQ = Ques_ID FROM Questions  --
		where Type = @type and Crs_ID = @courseId 
		ORDER BY NEWID()
		begin try 
			set @i = @i + 1
			exec InsertExamQuestion @randQ, @examId
		end try
		begin catch
			set @i = @i - 1
		end catch
	end
end

--3  get exam fullmark
create procedure getFullMarkExam
		@examID int
as
begin
	select sum(Degree)as fullMark from Exams_Questions EQ inner join Questions Q
	on Q.Ques_ID = EQ.Ques_ID
	where  Exam_ID = @examID
	group by EQ.Exam_ID
end

--4 get question correct answer
create procedure GetCorrectAnswer
	@ansId int = Null
as
begin 
	select Body from Questions_Answers where Ans_ID = @ansId
end

--5 check in login
ALTER Procedure [dbo].[isAUser]
		@userName varchar(50)=Null,
		@password varchar(50)=Null,
		@type nchar(1)=Null
as
begin
	if exists (select userName from Users where userName = @userName and Password =@password and Type =@type)
		select Users.ID from Users where userName = @userName and Password =@password and Type =@type 
	else
		select 'false'
end

--6 get student completed exam
create procedure GetStdCompletedExams
	@stdId int = Null
as
begin 
select Exam_ID, Duration, Total_Mark,Courses.Crs_ID,Courses.Crs_Name from Exams inner join Courses on Exams.Crs_ID=Courses.Crs_ID where Std_ID = @stdId and Total_Mark is not null;
end

--7 get crs Name
create procedure GetCrsName
	@crsId int = Null
as
begin 
	select Crs_Name from Courses where Crs_ID = @crsId ;
end

--8 get student not completed exam
create procedure GetStdNotCompletedExams
	@stdId int = Null
as
begin 
	select Exam_ID, Duration, Courses.Crs_ID,Courses.Crs_Name from Exams inner join Courses on Exams.Crs_ID=Courses.Crs_ID 
	where Std_ID = @stdId and Total_Mark is null;
end

---9- get topics >> where courseID
create Procedure getTopicsInfo @courseID int
as
begin
	select Top_ID, Top_Name from Topics
	where Crs_ID = @courseID
end

----10 Choices in a specific question
create Procedure getQuestionChoices @questionID int
as
begin
	select Ans_ID, Body from Questions_Answers
	where Ques_ID = @questionID
end

----11 Students where courseID
create Procedure getCourseStudent @courseID int
as
begin
	select S.Std_ID from Students S, Student_Courses SC
	where S.Std_ID = SC.Std_ID and Crs_ID = @courseID
end

--12 get all instructors >>
create Procedure getInstructors
as
begin
	select Id, Name from Users
	where Type = 'i'
end

--13 getCourseQuestions
create Procedure getCourseQuestions @courseID int
as
begin
	select Ques_ID, Body, Degree, Correct_Answer, Type from Questions
	where Crs_ID = @courseID
end

--14 all student id & name
create Procedure getStudents
as
begin
	select Id, Name from Users
	where Type = 's'
end

--15-- courses for each instructor >>
create Procedure getInstructorCourses @instructorID int
as
begin
	select Crs_ID, Crs_Name from Courses
	where Ins_ID = @instructorID
end

--16-- courses for each Student
create Procedure getStudentCourses @StdID int
as
begin
	select c.Crs_ID, Crs_Name from Student_Courses sc
	inner join Courses c on  sc.Crs_ID = c.Crs_ID
	where sc.Std_ID = @StdID
end


--17 check password
create Procedure isCorrectPassword @userName varchar(50)
as
begin
	if exists (select Password from Users where userName = @userName)
		select Type from Users where userName = @userName
	else
		select null
end

--18 create new Course with it's topics
create procedure CreateCourse
		 @Name VARCHAR(50) =NUll , 
       @Insructor_id  Int =null  ,
	   @FirstTopName varchar(50) =NUll,
	    @SecondTopName varchar(50) =NUll
		as
begin
	exec InsertCourse @Name, @Insructor_id
	declare @courseId int
	SELECT  @courseId = Crs_ID FROM Courses where Crs_Name like  @Name
	exec InsertTopic @courseId,@FirstTopName 
	exec InsertTopic @courseId,@SecondTopName 
end

--19 exam answers
create procedure examAnswers
		@examId int,
		@ansId1 int,
		@ansId2 int,
		@ansId3 int,
		@ansId4 int,
		@ansId5 int,
		@ansId6 int,
		@ansId7 int,
		@ansId8 int,
		@ansId9 int,
		@ansId10 int
as
begin
	exec answerEachQues @examId, 1, @ansId1
	exec answerEachQues @examId, 2, @ansId2
	exec answerEachQues @examId, 3, @ansId3
	exec answerEachQues @examId, 4, @ansId4
	exec answerEachQues @examId, 5, @ansId5
	exec answerEachQues @examId, 6, @ansId6
	exec answerEachQues @examId, 7, @ansId7
	exec answerEachQues @examId, 8, @ansId8
	exec answerEachQues @examId, 9, @ansId9
	exec answerEachQues @examId, 10, @ansId10
end

--20 add answer for each question
create procedure answerEachQues
		@examId int,
		@QuesIndex int,
		@ansId int
as
begin
	declare @curQuestionID int
	select Top (@QuesIndex) @curQuestionID = Ques_ID from Exams_Questions where Exam_ID = @examId
	exec UpdateExamQuestion @curQuestionID, @examId, @ansId
end

--21 exam correction
create procedure examCorrection
		@examId int
as
begin
	declare @studentDegree int
	select @studentDegree = sum(Degree) from Questions Q, Exams_Questions EQ
	where Correct_Answer = Ans_ID and Q.Ques_ID = EQ.Ques_ID and Exam_ID = @examId

	exec setTotalMark @studentDegree, @examId
end

--22 total mark >> exam where examId
create procedure setTotalMark
		@totalMark int,
		@examID int
as
begin
	update Exams
	set Total_Mark = @totalMark
	where Exam_ID = @examID
end

--23 return student degree
create procedure getStudentDegree
		@examId int
as
begin
	select Total_Mark from Exams 
	where Exam_ID = @examId
end

--24 add true & false choices
create Procedure addTFChoices
as
begin
	declare @QuesId int
	--QuesId
	select @QuesId = max(Ques_ID) from Questions
	--add choices
	exec InsertQuestionAnswer @QuesId, True
	exec InsertQuestionAnswer @QuesId, False
end

--25 add mcq choices
create Procedure addMCQChoices
		@ansBody1 nvarchar(MAX) =null,
		@ansBody2 nvarchar(MAX) =null,
		@ansBody3 nvarchar(MAX) =null
as
begin
	declare @QuesId int
	--QuesId
	select @QuesId = max(Ques_ID) from Questions
	--add choices
	exec InsertQuestionAnswer @QuesId, @ansBody1
	exec InsertQuestionAnswer @QuesId, @ansBody2
	exec InsertQuestionAnswer @QuesId, @ansBody3
end

--26 set correct answer id from choices ids
create Procedure setCorrectAnswerId
		@correctAnswer nvarchar(MAX) =null
as
begin
	declare @QuesId int
	--QuesId
	select @QuesId = max(Ques_ID) from Questions
	-- get correctAnswerId
	declare @AnsId int
	select @AnsId = Ans_ID from Questions_Answers
	where Ques_ID = @QuesId and Body = @correctAnswer
	--update ans id
	update Questions
	set Correct_Answer = @AnsId
	where Ques_ID = @QuesId
end

----------------------- exam
--27 duration >> where examId 
create Procedure getExamDuration 
		@examID int
as
begin
	select Duration from Exams
	where Exam_ID = @examID
end

--28 questions Body & id & degree >> where examID
alter Procedure getExamQuestions 
		@examID int
as
begin
	select E.Ques_ID, Body from Questions E, Exams_Questions EQ
	where E.Ques_ID = EQ.Ques_ID and Exam_ID = @examID
end

