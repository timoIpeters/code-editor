import { Component } from '@angular/core';
import { materialize } from 'rxjs';

const defaults = {
  'text/javascript': `const string = 'Hello World';
console.log(string);\n`,
  'text/html': `<p>Hello World!</p>\n`,
  'text/css': `body {
    color: red;
  }\n`
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  readOnly = false;
  mode: keyof typeof defaults = 'text/javascript';
  options = {
    lineNumbers: true,
    theme: 'material',
    gutter: true,
    mode: this.mode,
  };
  defaults = defaults;

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }
}