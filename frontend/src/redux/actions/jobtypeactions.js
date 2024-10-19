import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_SUCCESS
} from '../constants/jobttypeconstant';




export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('https://listing-sites.onrender.com/api/type/jobs');
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        // Check if the error response exists and has a specific message
        const errorMessage = error.response && error.response.data 
            ? error.response.data.error 
            : error.message; // Fallback to error.message

        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: errorMessage
        });
    }
}
// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post("https://listing-sites.onrender.com/api/type/create", jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}
