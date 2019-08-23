import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, query, group } from '@angular/animations';
import { Toast, ToastService } from '@shared/services/toastr.service';

const _toastFadeAnimation = trigger('toastFade', [
  transition('invisible=>visible', [animate('250ms ease-in', keyframes([
    style({ opacity: 0, offset: 0 }),
    style({ opacity: 1, offset: 1 })
  ]))]),
  transition('visible=>invisible', [animate('250ms ease-out', keyframes([
    style({ opacity: 1, offset: 0 }),
    style({ opacity: 0, offset: 1 })
  ]))]),
]);

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    _toastFadeAnimation
  ]
})
export class ToastComponent implements OnInit, OnDestroy {

  static STATE_VISIBLE = 'visible';
  static STATE_INVISIBLE = 'invisible';

  private _messages: Toast[] = Array.of();
  private _visibility = ToastComponent.STATE_INVISIBLE;
  private _toast: Toast;
  private _nextHide: any;
  private _subscription: Subscription;

  constructor(private _toastSrv: ToastService) { }

  ngOnInit() {
    this._toastSrv.messageQueue.subscribe((toast: Toast) => {
      if (toast && toast.message && toast.message.length > 0) {
        if (this.isVisible || this._messages.length != 0) {
          this._messages.push(toast);
        } else {
          this.displayMessage(toast);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public get message(): string | undefined {
    if (this._toast) {
      return this._toast.message;
    }
  }

  public get messageType(): string | undefined {
    if (this._toast) {
      return this._toast.type ? `alert alert-${this._toast.type}` : 'alert alert-secondary';
    }
  }

  public get isVisible(): boolean {
    return this._visibility === ToastComponent.STATE_VISIBLE;
  }

  public get visibilityState(): string {
    return this._visibility;
  }

  public dismiss(): void {
    if (this._nextHide) {
      clearInterval(this._nextHide);
    }
    this.hide();
    this.nextMessage();
  }

  private displayMessage(toast: Toast): void {
    this._toast = toast;
    this._visibility = ToastComponent.STATE_VISIBLE;
    const _ = this;

    this._nextHide = this.delayOp(() => {
      _.hide();
      _.nextMessage();
    }, 5000);
  }

  private nextMessage(): void {
    if (this._messages.length != 0) {
      const _ = this;
      this.delayOp(() => _.displayMessage(_._messages.splice(0, 1)[0]), 500);
    }
  }

  private delayOp(what: Function, howMuch: number): any {
    return setTimeout(function () { what(); }, howMuch);
  }

  private hide(): void {
    this._visibility = ToastComponent.STATE_INVISIBLE;
  }
}