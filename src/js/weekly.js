var db = firebase.firestore();

var container = document.getElementById('courses');

window.addEventListener('load', async () => {
  var data = await db.collection('weekly_courses').get();

  var courses = [];
  data.forEach(doc => courses.push(doc.data()));

  layout(courses);
});

function layout(courses) {
  container.innerHTML = '';
  for (var course of courses) {
    console.log(course.disabled);
    if (!course.disabled) {
      var ARTICLE = document.createElement('ARTICLE');
      ARTICLE.className = 'course-item';

      var TITLE = document.createElement('DIV');
      TITLE.className = 'item-title';
      TITLE.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
        `;

      ARTICLE.appendChild(TITLE);

      var TIME = document.createElement('DIV');
      TIME.className = 'item-datetime';
      TIME.innerHTML = `
            <div class="time"><strong>Time:</strong> ${course.time}</div>
            <div class="time"><strong>Day:</strong> ${generateDay(
              course.day
            )}</div>
            <div class="price"><strong>Price:</strong> ${parsePrice(
              course.price_per_term
            )}</div>
    `;

      ARTICLE.appendChild(TIME);

      // <iframe src="" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
      ARTICLE.appendChild(document.createElement('HR'));

      var LOCATION = document.createElement('DIV');
      LOCATION.className = 'item-location';
      LOCATION.innerHTML = `
            <h4 class="text-center">${course.map_name}</h4>
            <iframe src="${
              course.map_link
            }" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
        `;

      ARTICLE.appendChild(LOCATION);

      container.appendChild(ARTICLE);
    }
  }

  if (container.innerHTML === '') {
    container.innerHTML = `
    <div class="loader-wrapper">
        <div class="loader">Nothing found</div>
    </div>
    `;
  }
}

function parsePrice(price) {
  console.log(price);

  return `R ${Number(price).toLocaleString()}.00/person per term`;
}

function generateDay(day) {
  return day;
}

function parseDate(datestring) {
  var parts = String(datestring)
    .split('-')
    .reverse()
    .map(Number);

  console.log(parts);
  return new Date(parts[0], parts[1] - 1, parts[2]).toDateString();
}
