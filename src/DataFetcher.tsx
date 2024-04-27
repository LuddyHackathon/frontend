import { API_URL } from '@env';

export function fetchLanguageResult(fileName: string | null, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/grammar?file=${fileName}`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    done(JSON.parse(xhr.response));
  };
  xhr.send();
};

export function fetchRecommenderResult(text: string, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  formData.append('text', text);
  xhr.open('POST', `${API_URL}/recommender`);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    done(JSON.parse(xhr.response));
  };
  xhr.send(formData);
}

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
    done(JSON.parse(xhr.response));
  };
  xhr.send(formData);
}
