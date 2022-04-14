import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface DefaultsInterface {
  [key: string]: string;
}

const defaults: DefaultsInterface = {
  'text/javascript': `const string = 'Hello World';
console.log(string);\n`,
  'text/html': `<p>Hello World!</p>\n`,
  'text/css': `p {
    background-color: red;
  }\n`,
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Input() editorName: string = '';
  @Input() mode: string = '';
  @Output() contentChange = new EventEmitter();
  @Output() initialContent = new EventEmitter();

  readOnly: boolean = false;
  options: any = {};
  defaults: DefaultsInterface = defaults;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      lineNumbers: true,
      theme: 'material',
      gutter: true,
      mode: this.mode,
    };
    this.initialContent.emit(defaults);
  }

  handleChange(change: string): void {
    this.contentChange.emit({mode: this.mode, change: change});
  }
}
