import { Component, OnInit } from '@angular/core';
import { ContactService } from '../common/contact.service';
import { Contact } from '../common/contact.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  
    /**
     * Contact List
     */
    contactList: Contact[];
  
    constructor(
      private contactService: ContactService,
      private toastr: ToastrService
    ) { }

    ngOnInit() {
        const x = this.contactService.getData();
      
        x.snapshotChanges().subscribe(item => {
          
            this.contactList = [];
          
            item.forEach(elem => {
                const y = elem.payload.toJSON();
                y['$key'] = elem.key;
                this.contactList.push(y as Contact);
            });
        });
    }

    /**
     * On update event
     *
     * @method onUpdate
     * @param cont { Contact } cont
     * @returns void
     */
    public onUpdate(cont: Contact): void {
        this.contactService.selectedContact = Object.assign({}, cont);
    }

    /**
     * On remove event
     *
     * @method onRemove
     * @param key { string } key
     * @returns void
     */
    onRemove(key: string): void {
        if (confirm('Your are by removing a contact! Are you sure?') === true) {
            this.contactService.removeContact(key);
            this.toastr.warning('Removed successfully', 'Contact removed', {
                timeOut: 200
            });
        }
    }
}
