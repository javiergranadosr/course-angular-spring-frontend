import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public title: string = 'Create client';
  public formClient: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    surnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  public clientId!: number;
  public errors: string[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    this.clientId = this.activateRoute.snapshot.params['id'];
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe((data) => {
        this.formClient.get('name')?.setValue(data.name);
        this.formClient.get('surnames')?.setValue(data.surnames);
        this.formClient.get('email')?.setValue(data.email);
      });
    }
  }

  public create(): void {
    if (this.formClient.valid) {
      this.clientService.createClient(this.formClient.value).subscribe({
        next: ({ message, data }) => {
          this.router.navigateByUrl('/clients');
          Swal.fire({
            title: 'Success!',
            text: `${message} ${data?.name}`,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        error: (err) => {
          this.errors = err;
          console.log('Errors: ', err);
        },
      });
    } else {
      console.log('Form client is not valid by create');
    }
  }

  public updateClient(): void {
    if (this.formClient.valid) {
      this.clientService
        .updateClient(this.formClient.value, this.clientId)
        .subscribe({
          next: ({ message, data }) => {
            this.router.navigateByUrl('/clients');
            Swal.fire({
              title: 'Success!',
              text: `${message} ${data?.name} `,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          },
          error: (err) => {
            this.errors = err;
            console.log('Errors: ', err);
          },
        });
    } else {
      console.log('Form client is not valid by update');
    }
  }

  public validateField(field: string, error: string): void {
    return (
      this.formClient.get(field)?.getError(error) &&
      this.formClient.get(field)?.touched
    );
  }
}
