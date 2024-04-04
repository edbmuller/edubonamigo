function getLangFromElement(element) {
  if (element && element.lang) {
    return element.lang;
  } else {
    return null; // Or handle the case where no lang is found
  }
}

// Example usage
const myElement = document.querySelector('html');
const langCode = getLangFromElement(myElement);
const date = new Date();
const month = date.toLocaleString(langCode, { month: 'long' });
const year = date.getFullYear()

document.getElementById('month').innerText = month
document.getElementById('year').innerText = year