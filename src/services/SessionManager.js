//save login response > (student id and token) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {
        // sessionStorage.setItem('token', JSON.stringify(accessToken));
        sessionStorage.setItem('student_id', JSON.stringify(response.data._id));
    }
    next();
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
export const logout = (next) => {
    if (window !== 'undefined') {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('student_id');
    }
    next();
};
