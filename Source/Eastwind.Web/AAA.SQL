USE [iSIS]
GO
BEGIN TRANSACTION
SELECT CurriculumInstructor.[Curriculum_ID]
	,Curriculum.Course
      ,CurriculumInstructor.[Instructor]
      ,CurriculumInstructor.[Instructor_ID]
	  ,Curriculum.Quarter
	  , Curriculum.Section
	  ,subjectLK.Subject_Dept
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
     iNNER JOIN [iSIS].[dbo].[lk_Subject] AS subjectLK ON SUBSTRING(Curriculum.Course,0,8) = subjectLK.Subject_Code
  WHERE  Curriculum.Quarter >= 20184 AND NOT EXISTS
  (SELECT * FROM [Isis].dbo.Workload_Credits AS WorkCredits WHERE  
  WorkCredits.Quarter = Curriculum.Quarter 
  AND WorkCredits.Course=Curriculum.Course
  AND WorkCredits.Instructor_ID = CurriculumInstructor.Instructor_ID) ORDER BY Curriculum.Quarter, Curriculum.Course, Curriculum.Section

GO
                                      
INSERT INTO [dbo].[Workload_Credits]
           ([Quarter]
           ,[Instructor_ID]
           ,[Course]
           ,[Section]
		   ,Credit_Department
		  ,Credit_Department_Freeze
           ,[System_Update_Date])
           (SELECT Curriculum.Quarter,
		   CurriculumInstructor.[Instructor_ID]
		   ,Curriculum.Course
		   	, Curriculum.Section,
			subjectLK.Subject_Dept,
			subjectLK.Subject_Dept
	  ,GETDATE()
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
     iNNER JOIN [iSIS].[dbo].[lk_Subject] AS subjectLK ON SUBSTRING(Curriculum.Course,0,8) = subjectLK.Subject_Code
  WHERE  Curriculum.Quarter >= 20184 AND NOT EXISTS
  (SELECT * FROM [Isis].dbo.Workload_Credits AS WorkCredits WHERE  
  WorkCredits.Quarter = Curriculum.Quarter 
  AND WorkCredits.Course=Curriculum.Course
  AND WorkCredits.Instructor_ID = CurriculumInstructor.Instructor_ID))
GO         
                                                           
SELECT CurriculumInstructor.[Curriculum_ID]
	,Curriculum.Course
      ,CurriculumInstructor.[Instructor]
      ,CurriculumInstructor.[Instructor_ID]
	  ,Curriculum.Quarter
	  , Curriculum.Section
	  ,subjectLK.Subject_Dept
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
     iNNER JOIN [iSIS].[dbo].[lk_Subject] AS subjectLK ON SUBSTRING(Curriculum.Course,0,8) = subjectLK.Subject_Code
  WHERE  Curriculum.Quarter >= 20184 AND CurriculumInstructor.Instructor_ID IS NOT nuLL AND NOT EXISTS
  (SELECT * FROM [Isis].dbo.Workload_Credits AS WorkCredits WHERE  
  WorkCredits.Quarter = Curriculum.Quarter 
  AND WorkCredits.Course=Curriculum.Course
  AND WorkCredits.Instructor_ID = CurriculumInstructor.Instructor_ID) ORDER BY Curriculum.Quarter, Curriculum.Course, Curriculum.Section

GO


 SELECT * FROM [Isis].dbo.Workload_Credits AS WorkCredits WHERE  
   WorkCredits.Quarter >= 20184 
 AND NOT EXISTS
 (SELECT CurriculumInstructor.[Curriculum_ID]
	,Curriculum.Course
      ,CurriculumInstructor.[Instructor]
      ,CurriculumInstructor.[Instructor_ID]
	  ,Curriculum.Quarter
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
  WHERE  WorkCredits.Quarter = Curriculum.Quarter and   WorkCredits.Course=Curriculum.Course
  AND WorkCredits.Instructor_ID = CurriculumInstructor.Instructor_ID)  ORDER BY WorkCredits.Quarter, WorkCredits.Course, WorkCredits.Section
  GO
    DELETE FROM [Isis].dbo.Workload_Credits  WHERE 
   [Isis].dbo.Workload_Credits.Quarter >= 20184 
 AND NOT EXISTS
 (SELECT CurriculumInstructor.[Curriculum_ID]
	,Curriculum.Course
      ,CurriculumInstructor.[Instructor]
      ,CurriculumInstructor.[Instructor_ID]
	  ,Curriculum.Quarter
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
  WHERE  [Isis].dbo.Workload_Credits.Quarter = Curriculum.Quarter and   [Isis].dbo.Workload_Credits.Course=Curriculum.Course
  AND [Isis].dbo.Workload_Credits.Instructor_ID = CurriculumInstructor.Instructor_ID) 
  GO

   SELECT * FROM [Isis].dbo.Workload_Credits AS WorkCredits WHERE  
   WorkCredits.Quarter >= 20184 
 AND NOT EXISTS
 (SELECT CurriculumInstructor.[Curriculum_ID]
	,Curriculum.Course
      ,CurriculumInstructor.[Instructor]
      ,CurriculumInstructor.[Instructor_ID]
	  ,Curriculum.Quarter
  FROM [iSIS].[dbo].[Curriculum_Instructor] AS CurriculumInstructor 
  INNER JOIN [iSIS].[dbo].[Curriculum] AS Curriculum ON Curriculum.Curriculum_ID = CurriculumInstructor.Curriculum_ID
  WHERE  WorkCredits.Quarter = Curriculum.Quarter and   WorkCredits.Course=Curriculum.Course
  AND WorkCredits.Instructor_ID = CurriculumInstructor.Instructor_ID)  ORDER BY WorkCredits.Quarter, WorkCredits.Course, WorkCredits.Section
  GO
  ROLLBACK TRANSACTION
GO