import {NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/module.d-CnjH8Dlt';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NguCarousel, NguCarouselConfig, NguCarouselDefDirective, NguCarouselPointDirective, NguTileComponent} from '@ngu/carousel';
import {FooterComponent} from '@webstar/app/plugins/footer/footer.component';
import {HeaderComponent} from '@webstar/app/plugins/header/header.component';
import {BreakWordsPipe} from '@webstar/break-words.pipe';
import {CharacterService} from '@webstar/services/character.service';
import {MessageService} from '@webstar/services/message.service';
import {SidePipe} from '@webstar/side.pipe';
import {CharactersDTO} from '@webstar/types';

@UntilDestroy()
@Component({
  selector: 'app-characters',
  imports: [
    SidePipe,
    BreakWordsPipe,
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatButtonModule,
    NguCarousel,
    NguTileComponent,
    NguCarouselPointDirective,
    NguCarouselDefDirective,
    NgTemplateOutlet,
  ],
  providers: [
    CharacterService,
    MessageService,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit {

  private characterSrv = inject(CharacterService);
  private messageService = inject(MessageService);
  public characters = signal<CharactersDTO[]>([]);
  public carousel = viewChild<NguCarousel<CharactersDTO>>('carousel');
  public carouselConfig: NguCarouselConfig = {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    loop: false,
    touch: true,
    velocity: 0,
    interval: {
      timing: 0,
    },
    speed: 400,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };

  ngOnInit(): void {
    this.characterSrv.getCharacters().pipe(untilDestroyed(this)).subscribe({
      next: ({characters}) => {
        this.characters.set(characters);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.errorBar(err.status === 500 ? err.error : '', 'Nem sikerült betölteni a karaktereket!');
      },
    });
  }

}
