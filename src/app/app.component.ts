import { Component, HostListener } from '@angular/core';

enum arrows {
  down, up, left, right
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === 38) {//up
      this.move(arrows.up);
    }
    if (event.keyCode === 37) {//left
      this.move(arrows.left);
    }
    if (event.keyCode === 39) {//right
      this.move(arrows.right);
    }
    if (event.keyCode === 40) {//down
      this.move(arrows.down);
    }


  }
  start() {
    this.gametatus = 1;
    this.array = [];
    this.score = 0;
    for (let i = 0; i < this.size; i++) {
      let temp = [];
      for (let j = 0; j < this.size; j++) {
        temp.push(this.getRandom());
      }
      this.array.push(temp);
    }
  }
  gametatus = 0;
  size = 4;
  score = 0;
  array: number[][] = [];
  getRandom() {
    if (Math.random() > 0.5) {
      let x = Math.ceil(Math.random() * 3) - 1;
      return x;
    }
    return 0;
  }
  constructor() {
  }
  lastMove: arrows = null;
  renderRow(e: number[]) {

    if (e[0] == e[1]) {
      e[0] = e[0] * 2;
      e.splice(1, 1);
    }
    else if (e[0] == 0) {
      e.splice(0, 1);
    }
    else {
      for (var i = 0; i < e.length-1; i++) {
        if (e[i] == e[i + 1]) {
          e[i] = e[i] * 2;
          e.splice(1+1, 1);
          break;
        }
        if (e[i] == 0) {
          e.splice(i, 1);
          break;
        }
      }
    }

    for (var i = e.length; i < this.size; i++) {
      e.push(0)//4 0 0 0
    }
    if (e[this.size - 1] == 0) {
      e[this.size - 1] = this.getRandom();
    }

    return e;
  }

  //renderRow(e: number[]) {
  //  console.log(e)//2 0 2 4
  //  e = e.filter(c => c != 0);//2 2 4
  //  if (e.length == 0) return new Array(this.size).fill(0);
  //  for (var i = 0; i < e.length - 1; i++) {
  //    if (e[i] == e[i + 1]) {
  //      e[i] = e[i] * 2;
  //      this.score = this.score + e[i];
  //      e[i + 1] = 0; //4 4
  //      e = e.filter(c => c != 0);//4  
  //      i = -1;
  //    }
  //  }
  //  for (var i = e.length; i < this.size; i++) {
  //    e.push(0)//4 0 0 0
  //  }
  //  if (e[this.size - 1] == 0) {
  //    e[this.size - 1] = this.getRandom();
  //  }

  //  return e;
  //}


  checkLose() {
    for (let i = 1; i < this.size - 1; i++) {
      //4*4
      
      for (let j = 1; j < this.size - 1; j++) {
        if (this.array[i][j] == this.array[i + 1][j]) {
          return false;
        }
        if (this.array[i][j] == this.array[i - 1][j]) {
          return false;
        }

        if (this.array[i][j] == this.array[i][j - 1]) {
          return false;
        }
        if (this.array[i][j] == this.array[i][j + 1]) {
          return false;
        }



      }
    }
    return true;
  }

  move(e: arrows) {

    if (this.checkLose()) {
      this.gametatus = 3;
      return;
    }



    for (let i = 0; i < this.size; i++) {
      let temp = [];
      if (e == arrows.down) {
        for (let j = 0; j < this.size; j++) {
          temp.push(this.array[this.size - j - 1][i]);
        }
        temp = this.renderRow(temp);
        for (let j = 0; j < this.size; j++) {
          this.array[this.size - j - 1][i] = temp[j];
        }
      }



      if (e == arrows.up) {
        for (let j = 0; j < this.size; j++) {
          temp.push(this.array[j][i]);
        }
        temp = this.renderRow(temp);
        for (let j = 0; j < this.size; j++) {
          this.array[j][i] = temp[j];
        }
      }


      if (e == arrows.left) {
        for (let j = 0; j < this.size; j++) {
          temp.push(this.array[i][j]);
        }
        temp = this.renderRow(temp);
        for (let j = 0; j < this.size; j++) {
          this.array[i][j] = temp[j];
        }
      }

      if (e == arrows.right) {
        for (let j = 0; j < this.size; j++) {
          temp.push(this.array[i][this.size - 1 - j]);
        }
        temp = this.renderRow(temp);
        for (let j = 0; j < this.size; j++) {
          this.array[i][j] = temp[this.size - 1 - j];
        }
      }



    }

  }


}
