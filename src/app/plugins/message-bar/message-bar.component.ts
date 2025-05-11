import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import {MessageBarData} from '@webstar/types';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBarComponent {

  public data = inject<MessageBarData>(MAT_SNACK_BAR_DATA);

}
