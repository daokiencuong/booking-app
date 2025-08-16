import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-select-staff',
  imports: [],
  templateUrl: './select-staff.html',
  styleUrl: './select-staff.css',
})
export class SelectStaff {
  isCardOpen = signal<boolean>(false);
  staffIdSelected = signal<number>(0);

  onClick() {
    this.isCardOpen.update((prev) => !prev);
  }

  isSeleted(id: number){
    return id === this.staffIdSelected();
  }

  onSelected(id: number){
    this.staffIdSelected.set(id);
  }

  listStaff = [
    {
      id: 2,
      name: 'Harry',
      email: 'thehung1234@gmail.com',
      role: 'ADMIN',
      description: 'Harry specializes in Solar, Arcylic, Bio and Hybrid gel, Dipping service. He pays attention on a small details and make your nails perfect. He love to do long & design Nails set. You won’t regret booking with him',
      staffActive: true,
      createdAt: '2025-07-18T11:27:14.816234Z',
      updatedAt: '2025-07-18T11:27:18.141656Z',
      createdBy: 'daokiencuong04@gmail.com',
      updatedBy: 'daokiencuong04@gmail.com',
    },
    {
      id: 1,
      name: 'Đào Kiên Cường',
      email: 'daokiencuong04@gmail.com',
      role: 'ADMIN',
      description: 'Lion, he’s always up for the perfect look. You can trust him with your nails and your pedicure. He make it full flawless. He is sweet that you will love his personalities as well. Very details and very gentle man !',
      staffActive: false,
      createdAt: '2025-07-18T11:26:57.762403Z',
      updatedAt: '2025-07-29T08:16:10.945941Z',
      createdBy: 'daokiencuong04@gmail.com',
      updatedBy: 'daokiencuong04@gmail.com',
    },
    {
      id: 1,
      name: 'Đào Kiên Cường',
      email: 'daokiencuong04@gmail.com',
      role: 'ADMIN',
      description: 'Lion, he’s always up for the perfect look. You can trust him with your nails and your pedicure. He make it full flawless. He is sweet that you will love his personalities as well. Very details and very gentle man !',
      staffActive: false,
      createdAt: '2025-07-18T11:26:57.762403Z',
      updatedAt: '2025-07-29T08:16:10.945941Z',
      createdBy: 'daokiencuong04@gmail.com',
      updatedBy: 'daokiencuong04@gmail.com',
    },
    {
      id: 1,
      name: 'Đào Kiên Cường',
      email: 'daokiencuong04@gmail.com',
      role: 'ADMIN',
      description: 'Lion, he’s always up for the perfect look. You can trust him with your nails and your pedicure. He make it full flawless. He is sweet that you will love his personalities as well. Very details and very gentle man !',
      staffActive: false,
      createdAt: '2025-07-18T11:26:57.762403Z',
      updatedAt: '2025-07-29T08:16:10.945941Z',
      createdBy: 'daokiencuong04@gmail.com',
      updatedBy: 'daokiencuong04@gmail.com',
    },
  ];
}
