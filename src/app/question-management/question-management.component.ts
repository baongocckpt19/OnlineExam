import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule để sử dụng ngModel

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
}

@Component({
  selector: 'app-question-management',
  standalone: true, // Đánh dấu component là standalone
  imports: [CommonModule, FormsModule], // Thêm FormsModule vào imports
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent {
  questions: Question[] = [
    { id: 1, text: '1 + 1 = ?', category: 'math', difficulty: 'easy' },
    { id: 2, text: 'Vận tốc ánh sáng là bao nhiêu?', category: 'physics', difficulty: 'medium' },
    { id: 3, text: 'Công thức hóa học của nước?', category: 'chemistry', difficulty: 'easy' },
  ];

  isEditing = false;
  editId: number | null = null;
  showModal = false; // Thêm biến để điều khiển hiển thị modal

  currentQuestion: Question = { id: 0, text: '', category: 'math', difficulty: 'easy' };

  openModal(isEditing: boolean = false, question?: Question) {
    this.showModal = true; // Hiển thị modal
    this.isEditing = isEditing;
    if (isEditing && question) {
      this.currentQuestion = { ...question };
      this.editId = question.id;
    } else {
      this.currentQuestion = { id: 0, text: '1 + 1 = ?', category: 'math', difficulty: 'easy' };
    }
  }
  closeModal() {
    this.showModal = false; // Ẩn modal
    this.isEditing = false;
    this.editId = null;
  }

  saveQuestion() {
    if (!this.currentQuestion.text || !this.currentQuestion.category || !this.currentQuestion.difficulty) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (this.isEditing && this.editId !== null) {
      const index = this.questions.findIndex(q => q.id === this.editId);
      if (index > -1) {
        this.questions[index] = { ...this.currentQuestion, id: this.editId };
      }
    } else {
      this.currentQuestion.id = this.questions.length + 1;
      this.questions.push({ ...this.currentQuestion });
    }
    this.closeModal();
  }

  deleteQuestion(id: number) {
    this.questions = this.questions.filter(q => q.id !== id);
  }
}
