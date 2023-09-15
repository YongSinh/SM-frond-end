import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EscalatorWarningSharpIcon from '@mui/icons-material/EscalatorWarningSharp';
import { Divider } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { request } from '../../util/api'
import './Profile.css'
import { Spin } from "antd";
import { useEffect, useState } from "react";
const PageProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setdata] = useState([]);
    let role = localStorage.getItem("role")
    useEffect(() => {
        getList()
    }, []);

    const getList = () => {
        setLoading(true)
        role == "TEACHER" ? (
            request("get", "teacher/getTeacherInfo", {}).then(res => {
                setLoading(false)
                if (res.status == 200) {
                    var data = res.data
                    setdata([data.data])
                    console.log(data)
                }
            })
        )
            :
            (
                request("get", "student/getStudentInfo", {}).then(res => {
                    setLoading(false)
                    if (res.status == 200) {
                        var data = res.data
                        setdata([data.data])
                        console.log(data)
                    }
                })
            )

    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: green[500],
                fontSize: 25
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <Spin spinning={loading}>
                {role == "TEACHER" ? (
                    data && data.map((info) => (
                        <Container maxWidth="md">
                            <Box>
                                <div className="profilebk"></div>

                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{ bgcolor: green[500], width: 100, height: 100 }}  >
                                        <AccountCircle sx={{ fontSize: 70 }} />
                                    </Avatar>
                                    <div>
                                        <h2>{info.firstname} {info.lastname}</h2>
                                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            {info.email}
                                        </Typography>
                                    </div>
                                </Stack>

                                < Divider style={{ marginTop: 30, marginBottom: 30 }} />

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="First Name"
                                                id="outlined-size-small"
                                                value={info.firstname}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Last Name"
                                                id="outlined-size-small"
                                                value={info.lastname}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="ID"
                                                id="outlined-size-small"
                                                value={info.customID}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Phone Number"
                                                id="outlined-size-small"
                                                value={info.phone}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocalPhoneIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Email"
                                                id="outlined-size-small"
                                                value={info.email}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Date of birth"
                                                id="outlined-size-small"
                                                value={info.dob}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Date of join"
                                                id="outlined-size-small"
                                                value={info.date_of_join}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Password"
                                                id="outlined-size-small"
                                                value={info.password}
                                                fullWidth
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>
                        </Container>
                    )))
                    :
                    (
                        data && data.map((info) => (
                            <Container maxWidth="md">
                                <Box>
                                    <div className="profilebk"></div>

                                    <Stack direction="row" spacing={2}>
                                        <Avatar sx={{ bgcolor: green[500], width: 100, height: 100 }}  >
                                            <Avatar {...stringAvatar(`${info.firstname} `)} />
                                        </Avatar>

                                        <div>
                                            <h2>{info.firstname} {info.lastname}</h2>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                                {info.email}
                                            </Typography>
                                        </div>
                                    </Stack>

                                    < Divider style={{ marginTop: 30, marginBottom: 30 }} />

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="First Name"
                                                    id="outlined-size-small"
                                                    value={info.firstname}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Last Name"
                                                    id="outlined-size-small"
                                                    value={info.lastname}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="ID"
                                                    id="outlined-size-small"
                                                    value={info.customID}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Parents"
                                                    id="outlined-size-small"
                                                    value={info.parents}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EscalatorWarningSharpIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Phone Number"
                                                    id="outlined-size-small"
                                                    value={info.phone}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LocalPhoneIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Email"
                                                    id="outlined-size-small"
                                                    value={info.email}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EmailIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Date of birth"
                                                    id="outlined-size-small"
                                                    value={info.dob}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <DateRangeIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Date of join"
                                                    id="outlined-size-small"
                                                    value={info.date_of_join}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <DateRangeIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Password"
                                                    id="outlined-size-small"
                                                    value={info.password}
                                                    fullWidth
                                                    type={showPassword ? 'text' : 'password'}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </Box>
                            </Container>
                        ))
                    )

                }
            </Spin>
        </>
    )
}
export default PageProfile;