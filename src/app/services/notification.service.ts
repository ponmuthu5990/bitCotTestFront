import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class NotificationService {

    constructor(private messageService:MessageService) {
           }

    success(heading: string, message: string) {
        this.messageService.add({severity:'success', summary:heading, detail:message});
    }

    error(heading: string, message: string) {
        this.messageService.add({severity:'error', summary:heading, detail:message});
    }

    info(heading: string, message: string) {
        this.messageService.add({severity:'info', summary:heading, detail:message});
    }

    warn(heading: string, message: string) {
        this.messageService.add({severity:'warn', summary:heading, detail:message});
    }

    clear() {
        this.messageService.clear();
    }
}