
// Fetch data from leetcode and display it on a graph
const API_URL = 'https://leetcode-stats-api.herokuapp.com';

const leetcodeElem = document.getElementById('leetcode-graph');

let bottomAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
bottomAxis.setAttribute('stroke', 'currentColor');
bottomAxis.setAttribute('x1', 100);
bottomAxis.setAttribute('y1', 285);
bottomAxis.setAttribute('x2', 600);
bottomAxis.setAttribute('y2', 285);

leetcodeElem.appendChild(bottomAxis);

for (let i = 100; i < 600; i += 50) {
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', i);
    tick.setAttribute('y1', 285);
    tick.setAttribute('x2', i);
    tick.setAttribute('y2', 290);
    tick.setAttribute('stroke', 'currentColor');

    const tickLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tickLabel.setAttribute('x', i - 5);
    tickLabel.setAttribute('y', 310);
    tickLabel.setAttribute('stroke', 'currentColor');
    tickLabel.textContent = i - 100;


    leetcodeElem.appendChild(tick);
    leetcodeElem.appendChild(tickLabel);
}

fetch(`${API_URL}/bcImEvil`)
  .then(res => res.json())
  .then(data => {
    const difficultyData = {
      'easy': ['green', data.easySolved],
      'medium': ['yellow', data.mediumSolved],
      'hard': ['red', data.hardSolved]
    };

    const svgHeight = 300;
    const svgWidth = 600;
    const barPadding = 30;
    // const barWidth = (svgWidth / Object.keys(difficultyData).length)
    const barHeight = (svgHeight / Object.keys(difficultyData).length);

    Object.entries(difficultyData)
      .sort((a, b) => a[1][1] - b[1][1])
      .map(([ difficulty, [color, solved] ], i) => {

        let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        bar.setAttribute('fill', 'currentColor');
        bar.setAttribute('x', 100);
        bar.setAttribute('height', barHeight - barPadding);
        bar.setAttribute('width', solved);
        bar.setAttribute('transform', `translate(0, ${barHeight * i})`);
        bar.classList.add(difficulty);

        let barText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        barText.textContent = difficulty;
        barText.setAttribute('fill', 'white');
        barText.setAttribute('x', 90 - difficulty.length * 13);
        barText.setAttribute('transform', `translate(0, ${(barHeight - 4) * i + barHeight / 2})`);


        leetcodeElem.appendChild(bar);
        leetcodeElem.appendChild(barText);
      });
    }
);



