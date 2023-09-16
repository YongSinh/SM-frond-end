import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Dashboard from './Pages/dashboard/Dashboard';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/auth/Login';
import TeacherPage from './Pages/Teacher/PageTeacher';
import UserPage from './Pages/Users/PageUser';
import PageStudent from './Pages/student/PageStudent';
import GradePage from './Pages/grade/GradePage';
import ClassroomPage from './Pages/Classroom/ClassroomPage';
import PageCourse from './Pages/Course/PageCourse.js';
import AttemdancePage from './Pages/Attemdance/AttemdancePage';
import PageExam from './Pages/exam/PageExam';
import PageExamType from './Pages/examType/PageExamType';
import PageExamResult from './Pages/examResult/PageExamResult';
import PageProfile from './Pages/profile/ProfilePage';
import ViewExamResults from './Pages/view/ViewExamResults/ViewExamResults';
import Viewattendances from './Pages/view/Viewattendances/Viewattendances';
import ViewClassroom from './Pages/view/ViewClassroom/ViewClassroom';
import Studattendances from './Pages/view/StudendView/Studattendances';
import StudExamResults from './Pages/view/StudendView/StudExamResults';
import TeacherClassroomPage from './Pages/TeacherClassroom/TeacherClassroom';
import PageStudentInClass from './Pages/StudentInClass/StudentInClass';
import ResponsiveAppBar from './Pages/dashboard/Studentdashborad/StudentDashboard';
function App() {

  const isLogin = localStorage.getItem("is_login") == "1"; // true
  let role = localStorage.getItem("role")
  console.log( role.includes("ADMIN"))
  return (
    <>
      <BrowserRouter path="/">
        <div>
          {!isLogin ? (
            <Routes>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          ) 
          : 
          (

            role.includes("ADMIN") ? (
              <Dashboard>
              <Routes>
                <Route path="/inbox" element={<HomePage />} />
                <Route path="/teacher" element={<TeacherPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/student" element={<PageStudent />} />
                <Route path="/classroom" element={<ClassroomPage />} />
                <Route path="/grade" element={<GradePage />} />
                <Route path="/course" element={<PageCourse />} />
                <Route path="/attendance" element={<AttemdancePage />} />
                <Route path="/exam" element={<PageExam />} />
                <Route path="/examType" element={<PageExamType />} />
                <Route path="/examResult" element={<PageExamResult />} />
                <Route path='/profile' element={<PageProfile />}></Route>
                <Route path='/ViewExamResults/:id' element={<ViewExamResults />}></Route>
                <Route path='/attendances/:id' element={<Viewattendances />}></Route>
                <Route path='/ViewClassroom/:id' element={<ViewClassroom />}></Route>
                <Route path='/Student/attendances' element={<Studattendances />}></Route>
                <Route path='/Student/ExamResults' element={<StudExamResults />}></Route>
                <Route path='/teacherclassroom' element={<TeacherClassroomPage />}></Route>
                <Route path='/studentInClass/:id' element={<PageStudentInClass />}></Route>
              </Routes>
            </Dashboard>

            )
              :
            role.includes("TEACHER")  ?
                (
                  <Dashboard>
                  <Routes>
                    <Route path="/teacher/student" element={<PageStudent />} />
                    <Route path="/teacher/attendance" element={<AttemdancePage />} />
                    <Route path="/teacher/exam" element={<PageExam />} />
                    <Route path="/teacher/examType" element={<PageExamType />} />
                    <Route path="/teacher/examResult" element={<PageExamResult />} />
                    <Route path='/profile' element={<PageProfile />}></Route>
                    <Route path='/ViewExamResults/:id' element={<ViewExamResults />}></Route>
                    <Route path='/attendances/:id' element={<Viewattendances />}></Route>
                    <Route path='/ViewClassroom/:id' element={<ViewClassroom />}></Route>
                    <Route path='/Student/attendances' element={<Studattendances />}></Route>
                    <Route path='/Student/ExamResults' element={<StudExamResults />}></Route>
                    <Route path='/teacher/classroom' element={<TeacherClassroomPage />}></Route>
                    <Route path='/studentInClass/:id' element={<PageStudentInClass />}></Route>
                  </Routes>
                </Dashboard>

                )
                :
                (
                  <ResponsiveAppBar>
                  <Routes>
                    <Route path="/inbox" element={<HomePage />} />
                    <Route path='/profile' element={<PageProfile />}></Route>
                    <Route path='/Student/attendances' element={<Studattendances />}></Route>
                    <Route path='/Student/ExamResults' element={<StudExamResults />}></Route>
                  </Routes>

                </ResponsiveAppBar>
                  
                )




          )
          }
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
