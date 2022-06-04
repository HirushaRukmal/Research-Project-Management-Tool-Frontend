//save login response > (student id and token) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {
        // sessionStorage.setItem('token', JSON.stringify(accessToken));
        sessionStorage.setItem('student_id', JSON.stringify(response.data._id));
    }
    next();
};

export const setSupervisor = (response) => {
    if (window !== 'undefined') {
        if (response != null)
            sessionStorage.setItem('supervisor', JSON.stringify(response.data));
        else
            sessionStorage.setItem('supervisor', JSON.stringify(null));
    }
};

export const setCoSupervisor = (response) => {
    if (window !== 'undefined') {
        sessionStorage.setItem('cosupervisor', JSON.stringify(response.data));
    }
};

export const getSupervisor = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('supervisor')) {
            return JSON.parse(sessionStorage.getItem('supervisor'));
        } else {
            return false;
        }
    }
};

export const getCoSupervisor = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('cosupervisor')) {
            return JSON.parse(sessionStorage.getItem('cosupervisor'));
        } else {
            return false;
        }
    }
};

//access access name from session storage
// export const getToken = () => {
//     if (window !== 'undefined') {
//         if (sessionStorage.getItem('token')) {
//             return JSON.parse(sessionStorage.getItem('token'));
//         } else {
//             return false;
//         }
//     }
// };

//access student id from session storage
export const getStudentId = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('student_id')) {
            return JSON.parse(sessionStorage.getItem('student_id'));
        } else {
            return false;
        }
    }
};

//remove token from session storage
export const logout = () => {
    if (window !== 'undefined') {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('student_id');
    }
};
