const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const againBtn = document.getElementById('again');
const title = document.querySelector('.header');

const game = {
  ships: [
    {
      location: ['26', '36', '46', '56'],
      hit: ['', '', '', '']
    },
    {
      location: ['11', '12', '13'],
      hit: ['', '', '']
    },
    {
      location: ['69', '79'],
      hit: ['', '']
    },
    {
      location: ['90'],
      hit: ['']
    }
  ],
  shipCount: 4
};

// Состояние игры
const play = {
  record: localStorage.getItem('seaBattleRecord') || 0,
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
    this.record = localStorage.getItem('seaBattleRecord') || 0;
    this.shot = 0;
    this.hit = 0;
    this.dead = 0;
    this.shipCount = 4;
  }
};

// Реакция на выстрел
const show = {
  hit(elem) {
    this.changeClass(elem, 'hit');
  },
  miss(elem) {
    this.changeClass(elem, 'miss');
  },
  dead(elem) {
    this.changeClass(elem, 'dead');
  },
  changeClass(elem, classValue) {
    elem.className = classValue;
  }
};

// Выстрел
const fire = (evt) => {
    const target = evt.target;

    if (
        target.classList.length > 0 || 
        target.tagName !== 'TD' ||
        !game.shipCount
    ) return;

    show.miss(target);
    play.updateData = 'shot';

    // Проверяет, не попали ли в корабль
    for (let i = 0; i < game.ships.length; i++) {
      const ship = game.ships[i];
      const index = ship.location.indexOf(target.id); // индекс элемента массива из location корабля
      
      if (index >= 0) {
        show.hit(target);
        play.updateData = 'hit';
        ship.hit[index] = 'x';

        const life = ship.hit.indexOf('');
        if (life < 0) {
          play.updateData = 'dead';
          for (const id of ship.location) {
            show.dead(document.getElementById(id));
          }

          game.shipCount -= 1;

          if (!game.shipCount) {
            title.textContent = 'Игра окончена!';
            title.style.color = 'red';

            if (play.shot < play.record || play.record === 0) {
              localStorage.setItem('seaBattleRecord', play.shot);
              play.record = play.shot;
              play.render();
            }
          }
        }
      }
    }
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

  title.textContent = 'SEA BATTLE';
  title.style.color = 'black';

  // Самое простое:
  // location.reload();
};

// Старт игры
const init = () => {
  enemy.addEventListener('click', fire);
  againBtn.addEventListener('click', restart);
  play.render();
};

init();