import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Urodziny Pawła';

  buttonEscapes = 0;
  won = false;

  private readonly escapePositions = [
    { top: '20%', left: '75%' },
    { top: '70%', left: '20%' },
    { top: '35%', left: '50%' }
  ];

  buttonPosition = {
    top: '50%',
    left: '50%'
  };

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  escapeButton(): void {
    if (this.buttonEscapes < 3) {
      const position = this.escapePositions[this.buttonEscapes];

      this.buttonPosition = position;
      this.buttonEscapes++;
      return;
    }

    this.won = true;
  }

  get buttonMessage(): string {
    switch (this.buttonEscapes) {
      case 0:
        return 'ODBIERAM';
      case 1:
        return 'NIE TAK ŁATWO 😈';
      case 2:
        return 'PRAWIE! 😂';
      case 3:
        return 'JESZCZE RAZ!';
      default:
        return 'ODBIERAM';
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.won) {
      this.escapeButton();
    }
  }
}
