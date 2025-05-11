import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageBarComponent} from '@webstar/app/plugins/message-bar/message-bar.component';
import {MessageBarData} from '@webstar/types';

@Injectable()
export class MessageService {

  public snackBar = inject(MatSnackBar);

  errorBar(message: string, title: string): void {
    this.snackBar.openFromComponent<MessageBarComponent, MessageBarData>(MessageBarComponent, {
      duration: 5000,
      panelClass: ['errorBar'],
      data: {
        title,
        message,
      },
    });
  }

}
