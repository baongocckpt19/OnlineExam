import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
interface Exam {
  id: string;
  name: string;
  subject: string;
  duration: number;
  questionCount: number;
  creator: string;
  createdDate: Date;
  status: string;
}

@Component({
  selector: 'app-de-thi',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.css']
})
export class DeThiComponent implements OnInit {
  exams: Exam[] = [];
  filteredExams: Exam[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    // Mock data - replace with actual API call
    this.exams = [
      {
        id: '1',
        name: 'Đề thi Toán giữa kỳ',
        subject: 'Toán',
        duration: 90,
        questionCount: 40,
        creator: 'Nguyễn Văn A',
        createdDate: new Date('2023-10-15'),
        status: 'PUBLISHED'
      },
      // Add more exams...
    ];
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredExams = this.exams.filter(exam =>
      exam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredExams.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  // Pagination methods
  getPages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  // Exam actions
  createNewExam(): void {
    // Implement create logic
  }

  viewExam(id: string): void {
    // Implement view logic
  }

  editExam(id: string): void {
    // Implement edit logic
  }

  deleteExam(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa đề thi này?')) {
      this.exams = this.exams.filter(exam => exam.id !== id);
      this.applyFilter();
    }
  }

  exportExam(id: string): void {
    // Implement export logic
  }
}
