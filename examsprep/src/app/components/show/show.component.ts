import { Component, OnInit } from '@angular/core';
import {MathContent} from '../../math/math-content';
import {MathModule} from '../../math/math.module';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  data='';
  mathMl: MathContent = {
    mathml: ''
  };
  constructor() { }

  ngOnInit() {
    this.data=this.getFileMlData();
    this.mathMl.mathml = this.data;
  }
  getFileMlData(){
    return `Thsi is my testing <math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><msup><mn>4</mn><mn>2</mn></msup></msqrt><mo>&nbsp;</mo><mfenced><mtable><mtr><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd></mtr></mtable></mfenced><mo>&nbsp;</mo><mstyle displaystyle="false"><munderover><mo>∑</mo><mn>5</mn><mn>9</mn></munderover></mstyle></math>
            <math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mfenced close="]" open="["><mi>x</mi></mfenced><mn>4</mn></msup></math></p>`;
  }

}
