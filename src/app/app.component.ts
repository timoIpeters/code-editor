import {
  Component,
  OnChanges,
  OnInit,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface DefaultsInterface {
  [key: string]: string;
}

interface ChangedContent {
  mode: string;
  change: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  htmlContent: string = '<p>Paragraph</p>';
  cssContent: string = '';
  scriptContent: string = '';

  srcDoc: string = '';
  output: SafeHtml = '';

  constructor(public sanitizer: DomSanitizer) {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
    });
  }

  setInitialContent(initialContent: DefaultsInterface) {
    this.onChanged({
      mode: 'text/html',
      change: initialContent['text/html'],
    });

    this.onChanged({
      mode: 'text/css',
      change: initialContent['text/css'],
    });

    this.onChanged({
      mode: 'text/javascript',
      change: initialContent['text/javascript'],
    });
  }

  onChanged(newContent: ChangedContent) {
    switch (newContent.mode) {
      case 'text/html':
        this.htmlContent = newContent.change;
        break;
      case 'text/css':
        this.cssContent = newContent.change;
        break;
      case 'text/javascript':
        this.scriptContent = newContent.change;
        break;
    }

    this.srcDoc = `
    <html>
      <head></head>
      <body>${this.htmlContent}</body>
      <style>${this.cssContent}</style>
      <script>${this.scriptContent}</script>
    </html>`;

    this.output = this.sanitizer.bypassSecurityTrustHtml(`
<iframe
    srcdoc="${this.srcDoc}"
    sandbox="allow-scripts"
    frameborder="0"
    width="100%"
    height="100%"
  ></iframe>`);
  }
}
