import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

    private debugMode: boolean = true;

    constructor(
        private readonly toastr: ToastrService
    ) {
    }

    error(err: Error) {
        this.toastr.error(err.message, 'Error');
    }

    debugInfoCategory(category: string) {
        if(this.debugMode) {
            this.toastr.success(`Category '${category}' selected.`, '[Debug] Category');
        }
    }

    debugInfoPageRequest(pageNumber: number) {
        if(this.debugMode) {
            this.toastr.info(`Send request for page '${pageNumber}'.`, '[Debug] Page Number');
        }
    }

    debugInfoPageResult(pageNumber: number) {
        if(this.debugMode) {
            this.toastr.success(`Result for page '${pageNumber}' received.`, '[Debug] Page Number');
        }
    }

    debugInfoNoMorePages(pageCount: number) {
        if(this.debugMode) {
            this.toastr.info(`No more products after ${pageCount} pages.`, '[Debug] No More Products');
        }
    }
}
