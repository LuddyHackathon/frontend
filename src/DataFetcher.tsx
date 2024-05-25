import { API_URL } from '@env';

export type LanguageResult = {
  text: string,
  terminal: string,
  grammar: string
};

export function fetchLanguageResult(fileName: string | null, token: string, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/grammar?file=${fileName}`);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    console.error(xhr.response, xhr.status);
    done(JSON.parse(xhr.response));
  };
  xhr.send();
};

export type RecommenderResult = {
  keywords: Array<string>,
  recommendation: string
};

export function fetchRecommenderResult(text: string, token: string, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  formData.append('text', text);
  xhr.open('POST', `${API_URL}/recommender`);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    console.error(xhr.response, xhr.status);
    done(JSON.parse(xhr.response));
  };
  xhr.send(formData);
};

export type AuthenticationResult = {
  message: string,
  token: string
};

export function fetchAuthenticationResult(email: string, password: string, endpoint: string, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  xhr.open('POST', `${API_URL}/${endpoint}`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    console.error(xhr.response, xhr.status);
    done(JSON.parse(xhr.response));
  };
  xhr.send(formData);
};

export function uploadFile(file: any, endpoint: string, formName: string, token: string, done: CallableFunction) {
  let formData = new FormData();
  formData.append(formName, file);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/${endpoint}`);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.onload = function () {
    done(null, xhr.status);
  };
  xhr.onerror = function () {
    console.error(xhr.response + xhr.status);
    done(xhr.response);
  };
  xhr.send(formData);
};

export type QuestionsResult = {
  technical_questions: Array<string>,
  hr_questions: {
    general: string,
    experience: string,
    management: string,
    motivation: string
  }
}

export function fetchQuestions(endpoint: string, params: string, token: string, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/${endpoint}${params ? '/?' + params : ''}`);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    console.error(xhr.response + xhr.status);
    done(JSON.parse(xhr.response));
  };
  xhr.send();
};
