import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserPage from '../../Pages/Users/PageUser';
import InboxIcon from '@mui/icons-material/Inbox';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Typography from '@mui/material/Typography';
import HomePage from '../../Pages/HomePage/HomePage';
import TeacherPage from '../../Pages/Teacher/PageTeacher';
import PageStudent from '../../Pages/student/PageStudent';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import ClassroomPage from '../../Pages/Classroom/ClassroomPage';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import GradePage from '../../Pages/grade/GradePage';
import PageCourse from '../../Pages/Container/PageContainer';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AttemdancePage from '../../Pages/Attemdance/AttemdancePage';
import PageExam from '../../Pages/exam/PageExam';
import PageExamType from '../../Pages/examType/PageExamType';
import PageExamResult from '../../Pages/examResult/PageExamResult';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Studattendances from '../../Pages/view/StudendView/Studattendances';
import StudExamResults from '../../Pages/view/StudendView/StudExamResults';
import TeacherClassroomPage from '../../Pages/TeacherClassroom/TeacherClassroom';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
let role = localStorage.getItem("role") || ""
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function Content() {
  const location = useLocation();
  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {location.pathname}
    </Typography>
  );
}

export default function ListRouter() {
  return (

    <Box sx={{ width: 360 }}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          {role.includes("ADMIN") ? (
             <>
             <ListItemLink to="/inbox" primary="Inbox" element={<HomePage />} icon={<InboxIcon />} />
             <ListItemLink to="/user" primary="Users" element={<UserPage />} icon={<PeopleIcon />} />
             <ListItemLink to="/teacher" primary="Teacher" element={<TeacherPage />} icon={<GroupAddIcon />} />
             <ListItemLink to="/student" primary="Student" element={<PageStudent />} icon={<SchoolIcon />} />
             <ListItemLink to="/classroom" primary="Classroom" element={<ClassroomPage />} icon={<ClassIcon />} />
             <ListItemLink to="/grade" primary="Grade" element={<GradePage />} icon={<GradeIcon />} />
             <ListItemLink to="/course" primary="Course" element={<PageCourse />} icon={<AddToPhotosIcon />} />
             <ListItemLink to="/attendance" primary="Attendance" element={<AttemdancePage />} icon={<AccessAlarmsIcon />} />
             <ListItemLink to="/exam" primary="Exam" element={<PageExam />} icon={<AddToPhotosIcon />} />
             <ListItemLink to="/examType" primary="Exam Type" element={<PageExamType />} icon={<AddToPhotosIcon />} />
             <ListItemLink to="/examResult" primary="Exam Result" element={<PageExamResult />} icon={< FactCheckIcon/>} />
             
             </>
          ) 
            :
            (
              <>
              <ListItemLink to="/teacher/student" primary="Student" element={<PageStudent />} icon={<SchoolIcon />} />
              <ListItemLink to="/teacher/attendance" primary="Attendance" element={<AttemdancePage />} icon={<AccessAlarmsIcon />} />
              <ListItemLink to="/teacher/exam" primary="Exam" element={<PageExam />} icon={<AddToPhotosIcon />} />
              <ListItemLink to="/teacher/examType" primary="Exam Type" element={<PageExamType />} icon={<NoteAddIcon />} />
              <ListItemLink to="/teacher/examResult" primary="Exam Result" element={<PageExamResult />} icon={< FactCheckIcon/>} />
              <ListItemLink to="/teacher/classroom" primary="Classroom" element={<TeacherClassroomPage />} icon={<ClassIcon />} />
            </>
             
            )
          }
        </List>
      </Paper>
    </Box>

  );
}