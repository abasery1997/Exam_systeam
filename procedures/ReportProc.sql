

-- 1 -- Students byy ID 
Create or alter procedure getStudentByDepartmentID (@deptID int)
as
	select U.ID , U.Name , U.userName , D.Dept_Name from Students S 
	inner join Users U on U.ID = S.Std_ID
	--and S.Dept_ID = @deptID 
	inner join Departments D on S.Dept_ID = D.Dept_ID  and S.Dept_ID = @deptID 

exec getStudentByDepartmentID 1


-- 2 -- Report that takes the student ID and returns the grades of the student in all courses. %
-- function to get fullmark
create OR ALTER function Mark (@exId int)
returns int 
	begin 
		declare @fullMark int ;
		select @fullMark = sum(Degree)  from Exams_Questions EQ inner join Questions Q
		on Q.Ques_ID = EQ.Ques_ID
		where  Exam_ID = @exId
		group by EQ.Exam_ID

		return @fullMark
	End

	select dbo.Mark(15) as "full"
	--Report that takes the student id and return grades of all courses
create OR Alter proc getStudentGradesOfAllCourses (@stdID int)
as 
	begin   
		select U.Name ,C.Crs_ID ,C.Crs_Name  ,e.Total_Mark ,concat ( (convert(float , E.Total_Mark) / dbo.Mark(E.Exam_ID))*100 , '%' )  As "Grade" 
		from Exams E inner join Students  S on S.Std_ID = E.Std_ID and S.Std_ID = @stdID 
		inner join Student_Courses SC on SC.Std_ID = E.Std_ID and SC.Crs_ID = E.Crs_ID 
		inner join Courses C on C.Crs_ID = E.Crs_ID
		inner join Users U on U.ID = S.Std_ID
		group by  U.Name ,E.Exam_ID,C.Crs_ID ,C.Crs_Name ,E.Total_Mark
	end

getStudentGradesOfAllCourses 1
-- 3 -- Report that takes the instructor ID and returns the name of the courses that he teaches and the number of student per course

Create or alter procedure getInstructorCoursesAndNumberOfStudentsPerCourse (@insID int)
as
	select C.Crs_ID , C.Crs_Name , U.Name , COUNT (SC.Std_ID) as "NumberOFStudents" 
	from Student_Courses SC right outer join Courses C
	on C.Crs_ID = SC.Crs_ID inner join Instructors I
	on C.Ins_ID = I.Ins_ID and I.Ins_ID = @insID
	inner join Users U on U.ID = @insID
	group by C.Crs_ID ,I.Ins_ID , U.Name , SC.Crs_ID , C.Crs_Name 

getInstructorCoursesAndNumberOfStudentsPerCourse 11


-- 4 -- Report that takes course ID and returns its topics
create or alter proc getTopicsByCourseID (@crsID int)
as
	select T.Top_ID , T.Top_Name ,C.Crs_Name from Topics T  
	inner join Courses C on C.Crs_ID = T.Crs_ID 
	and C.Crs_ID = @crsID

getTopicsByCourseID 5

-- 5 -- Report that takes exam number and returns the Questions in it and chocies [freeform report]

create or alter proc getExamQuestionAndChoices (@examID int)
as
		SELECT	QA.Body Answer, Q.Body AS Question
		FROM	Exams AS E INNER JOIN
                Exams_Questions AS Ex ON E.Exam_ID = Ex.Exam_ID AND E.Exam_ID = @examID INNER JOIN
                Questions AS Q ON Ex.Ques_ID = Q.Ques_ID INNER JOIN
                Questions_Answers AS QA ON Q.Ques_ID = QA.Ques_ID -- A body
		group by Q.Body ,QA.Body

getExamQuestionAndChoices 13


-- 6 -- Report that takes exam number and the student ID then returns the Questions in this exam with the student answers.
Create OR alter proc getStudetnQuestionsAndAnswers (@stdID int , @exID int)
as
	select Q.Body as "Question" , QA.Body as "Answer" , U.Name from Exams_Questions  EQ
	inner join Questions Q on Q.Ques_ID = EQ.Ques_ID
	inner join Questions_Answers QA on EQ.Ans_ID = QA.Ans_ID
	inner join Exams E on E.Exam_ID = EQ.Exam_ID and E.Exam_ID =  @exID
	and E.Std_ID = @stdID
	inner join Users U on U.ID = E.Std_ID and E.Std_ID = @stdID

getStudetnQuestionsAndAnswers 2 , 3