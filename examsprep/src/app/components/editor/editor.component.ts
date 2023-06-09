import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '../../../assets/js/ck-editor-math-type/ckeditor.js';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  data ='';
  msg='';
  public Editor = ClassicEditor;
  public model = {
    editorData: ''
  };
  // tslint:disable-next-line:variable-name
  constructor(private _clipboardService: ClipboardService) {

  }

  ngOnInit() {

  }

  showval() {
      console.log(this.model.editorData);
      this.data = this.model.editorData;
      this._clipboardService.copyFromContent(this.data);
      this.msg="Code copied to clipboard !!";
  }

}
