import { Component, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
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

  srcDoc: string | null = `
  <html>
    <head></head>
    <body>${this.htmlContent}</body>
  </html>`;

  constructor(public sanitizer: DomSanitizer) {}

  setInitialContent(initialContent: DefaultsInterface) {
    this.onChanged({
      mode: 'text/html',
      change: initialContent['text/html'],
    });
  }

  onChanged(newContent: ChangedContent) {
    switch(newContent.mode) {
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
  }
}
