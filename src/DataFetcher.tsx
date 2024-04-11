import React from 'react';

export function fetchLanguageResult(fileName: string | null, setLanguageResult: CallableFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `http://192.168.1.168/grammar?file=${fileName}`);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      setLanguageResult(xhr.responseText)
      console.log(xhr.responseText)
      return xhr.responseText
    }
  }
}
