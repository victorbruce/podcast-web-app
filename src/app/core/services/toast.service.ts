// src/app/core/services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  show(type: ToastType, title: string, message: string): void {
    const content = `
    <div class="toast-layout">
      <div class="toast-icon"></div>
      <div class="toast-text">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    </div>
  `;

    this.toastr.show(content, '', {
      toastClass: `ngx-toastr toast-${type}`,
      enableHtml: true,
    });
  }
}
