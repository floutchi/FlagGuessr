import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlagService } from '../../services/flag.service';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  styleUrls: ['./flag-list.component.css'],
  imports: [
    CommonModule,
    NgForOf,
    HttpClientModule,
    FormsModule
  ],
  standalone: true
})
export class FlagListComponent implements OnInit {
  countries: any[] = [];
  selectedLanguage: string = 'fra'; // Langue par défaut
  languages: { code: string; name: string }[] = [
    { code: 'fra', name: 'Français' },
    { code: 'en', name: 'English' }
  ];
  foundCountriesCount: number = 0;
  @ViewChildren('countryInput') countryInputs!: QueryList<ElementRef>;

  constructor(private flagService: FlagService) {
    this.loadFlags();
  }

  loadFlags() {
    this.flagService.getFlags().subscribe((data: any) => {
      this.countries = data.map((country: any) => ({
        ...country,
        userInput: '',
        guessed: false,
        nameInSelectedLanguage: this.getCountryNameInSelectedLanguage(country)
      }));
    });
  }

  getCountryNameInSelectedLanguage(country: any): string {
    return country.translations[this.selectedLanguage]?.common || country.name.common;
  }

  changeLanguage() {
    this.countries.forEach(country => {
      country.nameInSelectedLanguage = this.getCountryNameInSelectedLanguage(country);
    });
  }

  checkGuess(country: any, index: number) {
    if (country.userInput?.toLowerCase() === country.nameInSelectedLanguage.toLowerCase()) {
      country.guessed = true;
      // this.focusNextInput(index-this.foundCountriesCount);
      // this.foundCountriesCount++; //TODO: DEBUG
    }
  }

  focusNextInput(currentIndex: number) {
    for (let i = currentIndex++; i < this.countries.length; i++) {
      if (!this.countries[i].guessed) { // Trouve le prochain pays non deviné
        const nextInput = this.countryInputs.toArray()[i];
        if (nextInput) {
          nextInput.nativeElement.focus();
        }
        break; // Sortie de la boucle après avoir trouvé le prochain input
      }
    }
  }

  revealAnswer(country: any) {
    country.guessed = true;
  }

  ngOnInit(): void {
  }
}
