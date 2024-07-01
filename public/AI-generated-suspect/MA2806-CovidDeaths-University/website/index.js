function onHeaderBtnClicked(e) {
  const sectionName = e.innerHTML.toLowerCase() + 'Header';
  document.getElementById(sectionName).scrollIntoView();
}

function mapInit() {
  var L = window.L;
  var map = L.map('map').setView([30, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var ukMarker = L.marker([51.5072, -0.1275]).addTo(map);
  // ukMarker.bindPopup('UK');
  ukMarker.on('click', function (e) {
    document.getElementById('ukTimelineHeader').scrollIntoView();
  });

  var pakistanMarker = L.marker([30.3753, 69.3451]).addTo(map);
  // pakistanMarker.bindPopup('Pakistan');
  pakistanMarker.on('click', function (e) {
    document.getElementById('pkTimelineHeader').scrollIntoView();
  });
}

const data = [
  {
    country: 'uk',
    data: [
      {
        date: 'Jan 5, 2020',
        non_vaccinated: 80,
        vaccinated: 0,
        weighted_average: 80,
      },
      {
        date: 'Aug 8, 2020',
        non_vaccinated: 73,
        vaccinated: 16,
        weighted_average: 67,
      },
      {
        date: 'Feb 24, 2021',
        non_vaccinated: 50,
        vaccinated: 26,
        weighted_average: 45,
      },
      {
        date: 'Sep 12, 2021',
        non_vaccinated: 27,
        vaccinated: 14,
        weighted_average: 24,
      },
      {
        date: 'Mar 31, 2022',
        non_vaccinated: 7,
        vaccinated: 5,
        weighted_average: 7,
      },
      {
        date: 'Dec 31, 2022',
        non_vaccinated: 1,
        vaccinated: 1,
        weighted_average: 1,
      },
    ],
  },
  {
    country: 'pakistan',
    data: [
      {
        date: 'Jan 5, 2020',
        non_vaccinated: 67,
        vaccinated: 0,
        weighted_average: 67,
      },
      {
        date: 'Aug 8, 2020',
        non_vaccinated: 58,
        vaccinated: 0,
        weighted_average: 58,
      },
      {
        date: 'Feb 24, 2021',
        non_vaccinated: 53,
        vaccinated: 23,
        weighted_average: 47,
      },
      {
        date: 'Sep 12, 2021',
        non_vaccinated: 50,
        vaccinated: 27,
        weighted_average: 45,
      },
      {
        date: 'Mar 31, 2022',
        non_vaccinated: 57,
        vaccinated: 33,
        weighted_average: 51,
      },
      {
        date: 'Dec 31, 2022',
        non_vaccinated: 55,
        vaccinated: 38,
        weighted_average: 51,
      },
    ],
  },
];

const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const parseDate = d3.timeParse('%b %d, %Y');

function createChart(countryData, chartId) {
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3
    .select(`#${chartId}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const nonVaccinatedLine = d3
    .line()
    .x((d) => x(parseDate(d.date)))
    .y((d) => y(d.non_vaccinated));

  const vaccinatedLine = d3
    .line()
    .x((d) => x(parseDate(d.date)))
    .y((d) => y(d.vaccinated));

  const weightedAvgLine = d3
    .line()
    .x((d) => x(parseDate(d.date)))
    .y((d) => y(d.weighted_average));

  x.domain(d3.extent(countryData.data, (d) => parseDate(d.date)));
  y.domain([
    0,
    d3.max(countryData.data, (d) =>
      d3.max([d.non_vaccinated, d.vaccinated, d.weighted_average])
    ),
  ]);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  svg
    .append('path')
    .datum(countryData.data)
    .attr('class', 'line non-vaccinated')
    .attr('d', nonVaccinatedLine);

  svg
    .append('path')
    .datum(countryData.data)
    .attr('class', 'line vaccinated')
    .attr('d', vaccinatedLine);

  svg
    .append('path')
    .datum(countryData.data)
    .attr('class', 'line weighted-average')
    .attr('d', weightedAvgLine);
}

data.forEach((countryData) => {
  createChart(
    countryData,
    `${countryData.country.replace(/\s+/g, '-').toLowerCase()}-chart`
  );
});

function init() {
  mapInit();
  chartInit();
}

window.onload = function () {
  init();
};
