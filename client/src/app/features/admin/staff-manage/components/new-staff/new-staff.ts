import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StaffService } from '../../../../../core/services/staff-service';
import { StaffCreateModel } from '../../../../../model/request/staff/staff-create.model';

@Component({
  selector: 'modal-new-staff',
  imports: [ReactiveFormsModule],
  templateUrl: './new-staff.html',
  styleUrls: ['./new-staff.css'],
})
export class NewStaff {
  close = output();
  created = output();
  showPassword = signal<boolean>(false);

  constructor(private staffService: StaffService) {}

  staffCreateForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('MEMBER'),
    description: new FormControl<string>(''),
    staffActive: new FormControl<boolean>(false),
  });

  closeDialog() {
    this.close.emit();
  }

  onShowPassword() {
    this.showPassword.update((showPassword) => !showPassword);
  }

  onSubmit() {
    const staff: StaffCreateModel = {
      name: this.staffCreateForm.value.name ?? '',
      email: this.staffCreateForm.value.email ?? '',
      password: this.staffCreateForm.value.password ?? '',
      role: this.staffCreateForm.value.role ?? '',
      description: this.staffCreateForm.value.description ?? '',
      staffActive: this.staffCreateForm.value.staffActive ?? false,
    };

    this.staffService.createNewUser(staff).subscribe({
      next: () => {
        this.created.emit();
        console.log('Created');
        this.closeDialog();
      },
    });
  }
}
