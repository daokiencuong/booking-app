import { Component } from '@angular/core';
import { StaffModel } from '../../../../../model/staff.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-staff',
  imports: [FormsModule],
  templateUrl: './list-staff.html',
  styleUrl: './list-staff.css',
})
export class ListStaff {
  staffList: StaffModel[] = [
    {
      id: 2,
      name: 'Harry',
      email: 'thehung1234@gmail.com',
      role: 'ADMIN',
      description: 'Harry is best for u',
      staffActive: true,
      createdAt: '2025-07-18T11:27:14.816234Z',
      updatedAt: '2025-07-18T11:27:18.141656Z',
      createdBy: 'daokiencuong04@gmail.com',
      updatedBy: 'daokiencuong04@gmail.com',
    }
  ];

  itemsPerPage = 5;
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.staffList.length / this.itemsPerPage);
  }

  get pagedStaff() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.staffList.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
