import { Component, Inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaffCreateModel } from '../../../../../model/staff-create.model';

@Component({
  selector: 'modal-new-staff',
  imports: [FormsModule],
  templateUrl: './new-staff.html',
  styleUrl: './new-staff.css',
})
export class NewStaff {
  close = output();
  create = output<StaffCreateModel>();
  showPassword = signal<boolean>(false);

  staff = {
    name: '',
    email: '',
    password: '',
    role: 'MEMBER',
    description: '',
    staffActive: true,
  };

  closeDialog() {
    this.close.emit();
  }

  submit() {
    if (
      this.staff.email === '' ||
      this.staff.name === '' ||
      this.staff.password === ''
    ) {
      
    } else {
      this.create.emit(this.staff);
      this.closeDialog();
    }
  }

  onShowPassword() {
    this.showPassword.update((showPassword) => !showPassword);
  }
}
