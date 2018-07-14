document.addEventListener("DOMContentLoaded", function() {
   function Furry(x,y,direction) {
       this.x = 0;
       this.y = 0;
       this.direction = 'right'
   }

   function Coin(x,y) {
       this.x = Math.floor(Math.random()*(9-0+1)+0);
       this.y = Math.floor(Math.random()*(9-0+1)+0);
   }

   function Game() {
       const self = this;
       this.index = function (x, y) {
           return x + (y * 10);
       };
       this.board = document.querySelectorAll('#board div');
       this.furry = new Furry();
       this.coin = new Coin();
       this.score = 0;
       this.showFurry = function () {
           this.hideVisibleFurry();
           this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
       };
       this.showCoin = function () {
           this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
       };
       this.startGame = function () {
           this.idSetInterval = setInterval(() => {
               this.moveFurry()
           }, 250);
       };
       this.moveFurry = function () {
           if (this.furry.direction === "right") {
               this.furry.x = this.furry.x + 1;
           } else if (this.furry.direction === "left") {
               this.furry.x = this.furry.x - 1;
           } else if (this.furry.direction === "up") {
               this.furry.y = this.furry.y - 1;
           } else if (this.furry.direction === "down") {
               this.furry.y = this.furry.y + 1;
           }
           if ( this.gameOver() === false) {
               this.showFurry();
               this.checkCoinCollision();
           }
       };
       this.hideVisibleFurry = function () {
           if (document.querySelector('.furry') !== null) {
               document.querySelector('.furry').classList.remove('furry');
           }
       };
       this.turnFurry = function(event) {
           switch (event.which) {
               case 37:
                   self.furry.direction = 'left';
                   break;
               case 38:
                   self.furry.direction = 'up';
                   break;
               case 39:
                   self.furry.direction = 'right';
                   break;
               case 40:
                   self.furry.direction = 'down';
                   break;
           }
       };
       this.checkCoinCollision = function() {
           if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
               document.querySelector('.coin').classList.remove('coin');
               this.score++;
               document.querySelector('strong').innerText = this.score;
               this.coin = new Coin();
               this.showCoin();
           }
       };
       this.gameOver = function() {
           if (this.furry.x < 0 || this.furry.x > 9 ||
               this.furry.y < 0 || this.furry.y > 9) {
               clearInterval(this.idSetInterval);
               this.hideVisibleFurry();
               board.style.display = 'none';
               document.querySelector('#score').style.display = 'none';
               document.querySelector('.invisible').innerText = "GAME OVER";
               document.querySelector('.invisible').style.display = 'flex';
               const finalScore = document.createElement('div');
               document.querySelector('.invisible').appendChild(finalScore);
               finalScore.innerText = "Your score: " + this.score;
               return true;
           }
           return false
       };
   }

   document.addEventListener('keydown', function(event){
       game.turnFurry(event);
   });

   const game = new Game();
       game.showFurry();
       game.showCoin();
       game.startGame();
       game.hideVisibleFurry();

});