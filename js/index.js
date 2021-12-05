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
  }
};

// Реакция на выстрел
const show = {
  hit() {

  },
  miss(elem) {
    if (!elem.classList.contains('miss')) {
      this.changeClass(elem, 'miss');
      play.updateData = 'shot';
    }
  },
  dead() {

  },
  changeClass(elem, classValue) {
    elem.className = classValue;
  }
};

// Выстрел
const fire = (evt) => {
    const target = evt.target;
    show.miss(target);
};

// Старт игры
const init = () => {
  enemy.addEventListener('click', fire);
};

init();