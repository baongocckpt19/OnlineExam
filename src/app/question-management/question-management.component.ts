import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule

@Component({
  selector: 'app-question-management',
  standalone: true, // <-- Đánh dấu component là Standalone
  imports: [FormsModule, CommonModule], // <-- Thêm CommonModule vào mảng imports
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {
  questions: { text: string }[] = [];
  currentQuestion = { text: '' };
  isEditing = false;
  editIndex: number | null = null;

  saveQuestion() {
    if (this.isEditing && this.editIndex !== null) {
      this.questions[this.editIndex] = { ...this.currentQuestion };
    } else {
      this.questions.push({ ...this.currentQuestion });
    }
    this.resetForm();
  }

  editQuestion(index: number) {
    this.currentQuestion = { ...this.questions[index] };
    this.isEditing = true;
    this.editIndex = index;
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.currentQuestion = { text: '' };
    this.isEditing = false;
    this.editIndex = null;
  }
}
