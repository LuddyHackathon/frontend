export function fetchLanguageResult(fileName: string | null, done: CallableFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `http://192.168.1.168/grammar?file=${fileName}`);
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
  xhr.open('POST', `http://192.168.1.168/recommender?text=${text}`);
  xhr.onload = function () {
    console.log(xhr.response);
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    done(JSON.parse(xhr.response));
  };
  xhr.send();
}
