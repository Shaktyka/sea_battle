const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const againBtn = document.getElementById('again');

// Состояние игры
const play = {
  record: 0,
  shot: 0,
  hit: 0,
  dead: 0,
  set updateData(data) {
    this[data] += 1;
    this.render();
  },
  render() {
    record.textContent = this.record;
    shot.textContent = this.shot;
    hit.textContent = this.hit;
    dead.textContent = this.dead;
  },
  restart() {
    this.play = 0;
    this.record = 0;
    this.shot = 0;
    this.dead = 0;
  }
};

// Реакция на выстрел
const show = {
  hit(elem) {
    if (!elem.classList.contains('hit')) {
      this.changeClass(elem, 'hit');
      // play.updateData = 'shot';
    }
  },
  miss(elem) {
    if (!elem.classList.contains('miss')) {
      this.changeClass(elem, 'miss');
      // play.updateData = 'shot';
    }
  },
  dead(elem) {
    if (!elem.classList.contains('dead')) {
      this.changeClass(elem, 'dead');
      // play.updateData = 'shot';
    }
  },
  changeClass(elem, classValue) {
    elem.className = classValue;
  }
};

// Выстрел
const fire = (evt) => {
    const target = evt.target;

    if (target.classList.length > 0 || target.tagName !== 'TD') return;

    show.miss(target);
    play.updateData = 'shot';
};

// Очистка поля
const clearField = () => {
  const tds = enemy.querySelectorAll('td');
  tds.forEach((td) => {
    td.className = '';
  });
};

// Рестарт игры
const restart = (evt) => {
  evt.preventDefault();
  clearField();

  play.restart();
  play.render();
};

// Старт игры
const init = () => {
  enemy.addEventListener('click', fire);

  againBtn.addEventListener('click', restart);
};

init();