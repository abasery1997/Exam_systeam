•	Database Dictionary

schema_nm	  table_nm	obj_typ	ord_pos	keys	column_nm	data_typ	nullable

ExamSystem	Courses	TBL	1	PK	Crs_ID	int(10)	NOT NULL
		                  	2	 	Crs_Name	varchar(50)	NOT NULL
		                  	3	FK	Ins_ID	int(10)	NOT NULL

	Departments	TBL	1	PK	Dept_ID	int(10)	NOT NULL
	            		2	 	Dept_Name	varchar(50)	NOT NULL

	Exams	TBL	1	PK	Exam_ID	int(10)	NOT NULL
		      	2	FK,UK	Std_ID	int(10)	NOT NULL
			      3	FK,UK	Crs_ID	int(10)	NOT NULL
			      4	 	Duration	int(10)	NULL
			      5	 	Total_Mark	int(10)	NULL

	Exams_Questions	TBL	1	FK,PK	Ques_ID	int(10)	NOT NULL
			                2	FK,PK	Exam_ID	int(10)	NOT NULL
		                	3	 	Ans_ID	int(10)	NULL

	Instructors	TBL	1	FK,PK	Ins_ID	int(10)	NOT NULL
	            		2	FK	Dept_ID	int(10)	NULL

	Questions	TBL	1	PK	Ques_ID	int(10)	NOT NULL
                2	 	Body	nvarchar(-1)	NOT NULL
                3	 	Correct_Answer	int(10)	NULL
                4	 	Type	nchar(10)	NOT NULL
                5	 	Degree	int(10)	NOT NULL
                6	FK	Crs_ID	int(10)	NOT NULL

	Questions_Answers	TBL	1	PK	Ans_ID	int(10)	NOT NULL
                        2	FK	Ques_ID	int(10)	NOT NULL
                        3	 	Body	nvarchar(-1)	NOT NULL

	Student_Courses	TBL	1	FK,PK	Std_ID	int(10)	NOT NULL
	                		2	FK,PK	Crs_ID	int(10)	NOT NULL

	Students	TBL	1	FK,PK	Std_ID	int(10)	NOT NULL
          			2	FK	Dept_ID	int(10)	NULL

	sysdiagrams	TBL	1	UK	name	nvarchar(128)	NOT NULL
                  2	UK	principal_id	int(10)	NOT NULL
                  3	PK	diagram_id	int(10)	NOT NULL
                  4	 	version	int(10)	NULL
                  5	 	definition	varbinary(-1)	NULL

	Topics	TBL	1	PK	Top_ID	int(10)	NOT NULL
              2	FK,UK	Crs_ID	int(10)	NOT NULL
              3	UK	Top_Name	varchar(50)	NOT NULL

	Users	TBL	1	PK	ID	int(10)	NOT NULL
            2	 	Name	varchar(50)	NOT NULL
            3	 	userName	varchar(50)	NOT NULL
            4	 	Type	nchar(1)	NOT NULL
            5	 	Password	nvarchar(-1)	NOT NULL
