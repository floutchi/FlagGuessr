import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlagListComponent} from "./components/flag-list/flag-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlagListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlagGuessr';
}
