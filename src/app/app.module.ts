import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxElectronModule } from 'ngx-electron';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameOptionsComponent } from './game/options.component';
import { ScoreComponent } from './game/interface/score.component';

@NgModule({
	declarations: [
		AppComponent,
		GameComponent,
		GameOptionsComponent,
		ScoreComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		NgxElectronModule,
		MatToolbarModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatSelectModule,
		MatDividerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
