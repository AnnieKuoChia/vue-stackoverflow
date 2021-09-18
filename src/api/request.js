import req from './api';

export const getTags = () => req('get', 'tags?order=desc&sort=popular&site=stackoverflow');
export const getQuestions = () => req('get', 'questions?order=desc&sort=activity&site=stackoverflow');
