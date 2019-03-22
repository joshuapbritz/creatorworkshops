var db = firebase.firestore();

var form = document.getElementById('courseform');
var button = document.getElementById('button');

var sending = false;

window.onload = () => {
  form.addEventListener('submit', event => {
    if (!sending) {
      sending = true;
      button.textContent = 'SAVING...';
      event.preventDefault();

      const data = new FormData(form);

      const values = Array.from(data.entries()).reduce(function(prev, curr) {
        prev[curr[0]] = curr[1];
        return prev;
      }, {});

      values.map_link = parseIframe(values.iframe);
      delete values.iframe;

      values.date_from = parseDates(values.date_from);
      values.date_to = parseDates(values.date_to);

      values.disabled = false;

      db.collection('holiday_courses')
        .add(values)
        .then(() => {
          button.textContent = 'SAVED';
          setTimeout(() => {
            form.reset();
            sending = false;
            button.textContent = 'SAVE';
          }, 2000);
        });
    }
  });
};

function parseIframe(iframe) {
  const div = document.createElement('div');
  div.innerHTML = iframe;

  const src = div.querySelector('iframe').src;

  return src;
}

function parseDates(datestring) {
  return String(datestring)
    .split('-')
    .reverse()
    .join('-');
}
