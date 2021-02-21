import _ from 'lodash';
import createDataContext from '../hooks/createDataContext';
import {
	FETCH_JOBS,
	LIKE_JOB,
	CLEAR_LIKED_JOBS,
	LOAD_PREVIOUS_JOBS
} from '../actions/jobActions';
import response from '../data/jobs.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
	jobs: [],
	likedJobs: []
};

const jobReducer = (state, action) => {
	switch (action.type) {
		case FETCH_JOBS:
			return { ...state, jobs: action.payload };
		case LIKE_JOB:
			const likedJobs = _.uniqBy(
				[action.payload, ...state.likedJobs],
				'jobkey'
			);

			AsyncStorage.setItem('likedJobs', JSON.stringify(likedJobs));

			return {
				...state,
				likedJobs
			};
		case CLEAR_LIKED_JOBS:
			return { ...state, likedJobs: [] };
		case LOAD_PREVIOUS_JOBS:
			return { ...state, likedJobs: action.payload };
		default:
			return state;
	}
};

const fetchJobs = dispatch => (region, callback) => {
	let { results } = response;
	dispatch({ type: FETCH_JOBS, payload: _.shuffle(results) });
	callback();
};

const likeJob = dispatch => job => {
	dispatch({ type: LIKE_JOB, payload: job });
};

const clearLikedJobs = dispatch => () => {
	dispatch({ type: CLEAR_LIKED_JOBS });
};

const loadPreviousLikedJobs = dispatch => async () => {
	const prevJobs = JSON.parse(await AsyncStorage.getItem('likedJobs'));
	if (prevJobs) {
		dispatch({ type: LOAD_PREVIOUS_JOBS, payload: prevJobs });
	}
};

export const { Context, Provider } = createDataContext(
	jobReducer,
	{
		fetchJobs,
		likeJob,
		clearLikedJobs,
		loadPreviousLikedJobs
	},
	INITIAL_STATE
);
