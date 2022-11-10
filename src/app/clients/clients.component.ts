import { Component, OnInit } from '@angular/core';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  public clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data) => (this.clients = data));
  }

  public deleteClient(client: Client): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you want to delete this client: ${client.name} ${client.surnames}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete client!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id!).subscribe(({message}) => {
          this.clients = this.clients.filter((c) => c.id !== client.id);
          Swal.fire('Deleted!', message, 'success');
        });
      }
    });
  }
}
