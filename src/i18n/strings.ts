import type { Lang } from '../types';
import { assertStrings } from './assertStrings';

// The single source of truth for UI chrome keys. NOT derived from the dictionary,
// NOT defined in types.ts (see design §7.2).
export type UiKey =
  | 'app.title' | 'app.exam'
  | 'nav.aria' | 'nav.dashboard' | 'nav.openMenu' | 'nav.closeMenu'
  | 'lang.toggleAria' | 'lang.vi' | 'lang.en'
  | 'dash.title' | 'dash.intro' | 'dash.reset'
  | 'dash.domainKnowledge' | 'dash.domainCompetency'
  | 'dash.studied' | 'dash.notStudied'
  | 'dash.cardsReviewed' | 'dash.progressLabel'
  | 'dash.bestScore' | 'dash.questionCount'
  | 'dash.resetTitle' | 'dash.resetBody' | 'dash.cancel' | 'dash.confirmReset'
  | 'module.back' | 'module.markStudied' | 'module.tablistAria'
  | 'tab.lesson' | 'tab.flashcards' | 'tab.quiz' | 'tab.notes'
  | 'lesson.objectives' | 'lesson.keyPoints' | 'lesson.diagram'
  | 'lesson.applications' | 'lesson.diagramAria' | 'lesson.diagramFallback'
  | 'fc.empty' | 'fc.progressLabel' | 'fc.counter' | 'fc.reviewed'
  | 'fc.front' | 'fc.back' | 'fc.flipFrontAria' | 'fc.flipBackAria'
  | 'fc.flipHint' | 'fc.levelGroupAria' | 'fc.known' | 'fc.learning'
  | 'fc.prev' | 'fc.next'
  | 'quiz.empty' | 'quiz.counter' | 'quiz.bestScore'
  | 'quiz.prev' | 'quiz.next' | 'quiz.submit'
  | 'quiz.resultTitle' | 'quiz.resultScore' | 'quiz.reviewWrong'
  | 'quiz.yourAnswer' | 'quiz.blank' | 'quiz.correctAnswer' | 'quiz.perfect'
  | 'quiz.restart'
  | 'notes.label' | 'notes.placeholder' | 'notes.saved' | 'notes.autosave'
  | 'nf.title' | 'nf.body' | 'nf.back';

export const UI_STRINGS: Record<Lang, Record<UiKey, string>> = {
  vi: {
    'app.title': 'SHRM Study App',
    'app.exam': 'SHRM-CP / SCP',
    'nav.aria': 'Danh sách mô-đun học',
    'nav.dashboard': 'Dashboard',
    'nav.openMenu': 'Mở menu',
    'nav.closeMenu': 'Đóng menu',
    'lang.toggleAria': 'Chọn ngôn ngữ',
    'lang.vi': 'VI',
    'lang.en': 'EN',
    'dash.title': 'Dashboard',
    'dash.intro':
      'Ôn luyện SHRM-CP / SCP theo từng mô-đun. Mọi tiến độ được lưu cục bộ trên trình duyệt của bạn.',
    'dash.reset': 'Đặt lại tiến độ',
    'dash.domainKnowledge': 'HR Knowledge',
    'dash.domainCompetency': 'Behavioral Competencies',
    'dash.studied': 'Đã học',
    'dash.notStudied': 'Chưa học',
    'dash.cardsReviewed': 'Thẻ đã ôn',
    'dash.progressLabel': 'Tiến độ ôn thẻ của {group}',
    'dash.bestScore': 'Điểm quiz cao nhất: {pct}',
    'dash.questionCount': '{n} câu hỏi',
    'dash.resetTitle': 'Đặt lại toàn bộ tiến độ?',
    'dash.resetBody':
      'Hành động này sẽ xóa tất cả tiến độ, ghi chú, kết quả quiz và trạng thái thẻ ghi nhớ khỏi trình duyệt. Không thể hoàn tác.',
    'dash.cancel': 'Hủy',
    'dash.confirmReset': 'Đặt lại',
    'module.back': '‹ Về Dashboard',
    'module.markStudied': 'Đánh dấu đã học',
    'module.tablistAria': 'Nội dung mô-đun',
    'tab.lesson': 'Nội dung học',
    'tab.flashcards': 'Flashcards',
    'tab.quiz': 'Quiz',
    'tab.notes': 'Notes',
    'lesson.objectives': 'Mục tiêu học tập',
    'lesson.keyPoints': 'Ý chính',
    'lesson.diagram': 'Sơ đồ',
    'lesson.applications': 'Áp dụng thực tiễn',
    'lesson.diagramAria': 'Sơ đồ nội dung mô-đun {group}',
    'lesson.diagramFallback':
      'Không thể hiển thị sơ đồ. Dưới đây là định nghĩa sơ đồ để bạn tham khảo:',
    'fc.empty': 'Chưa có thẻ ghi nhớ nào.',
    'fc.progressLabel': 'Tiến độ ôn thẻ ghi nhớ',
    'fc.counter': 'Thẻ {n} / {total}',
    'fc.reviewed': 'Đã ôn: {n} / {total}',
    'fc.front': 'Thuật ngữ',
    'fc.back': 'Định nghĩa',
    'fc.flipFrontAria': 'Mặt trước của thẻ: {term}. Nhấn để xem định nghĩa.',
    'fc.flipBackAria': 'Mặt sau của thẻ: {term}. Nhấn để lật lại.',
    'fc.flipHint': 'Nhấn (hoặc Enter / Space) để lật thẻ',
    'fc.levelGroupAria': 'Đánh dấu mức độ thuộc thẻ',
    'fc.known': 'Đã thuộc',
    'fc.learning': 'Đang học',
    'fc.prev': '‹ Thẻ trước',
    'fc.next': 'Thẻ sau ›',
    'quiz.empty': 'Chưa có câu hỏi nào.',
    'quiz.counter': 'Câu {n} / {total}',
    'quiz.bestScore': 'Điểm cao nhất: {pct}',
    'quiz.prev': '‹ Câu trước',
    'quiz.next': 'Câu sau ›',
    'quiz.submit': 'Nộp bài',
    'quiz.resultTitle': 'Kết quả',
    'quiz.resultScore': 'Đạt {pct}',
    'quiz.reviewWrong': 'Xem lại câu sai',
    'quiz.yourAnswer': 'Bạn chọn: {answer}',
    'quiz.blank': '(bỏ trống)',
    'quiz.correctAnswer': 'Đáp án đúng: {answer}',
    'quiz.perfect': 'Xuất sắc! Bạn trả lời đúng tất cả các câu.',
    'quiz.restart': 'Làm lại',
    'notes.label': 'Ghi chú của bạn',
    'notes.placeholder': 'Viết ghi chú ôn tập của bạn tại đây… (tự động lưu)',
    'notes.saved': 'Đã lưu lúc {time}',
    'notes.autosave': 'Tự động lưu vào trình duyệt',
    'nf.title': '404',
    'nf.body': 'Không tìm thấy trang bạn yêu cầu.',
    'nf.back': 'Về Dashboard',
  },
  en: {
    'app.title': 'SHRM Study App',
    'app.exam': 'SHRM-CP / SCP',
    'nav.aria': 'Study module list',
    'nav.dashboard': 'Dashboard',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'lang.toggleAria': 'Select language',
    'lang.vi': 'VI',
    'lang.en': 'EN',
    'dash.title': 'Dashboard',
    'dash.intro':
      'Study for SHRM-CP / SCP by module. All progress is saved locally in your browser.',
    'dash.reset': 'Reset progress',
    'dash.domainKnowledge': 'HR Knowledge',
    'dash.domainCompetency': 'Behavioral Competencies',
    'dash.studied': 'Studied',
    'dash.notStudied': 'Not studied',
    'dash.cardsReviewed': 'Cards reviewed',
    'dash.progressLabel': 'Flashcard progress for {group}',
    'dash.bestScore': 'Best quiz score: {pct}',
    'dash.questionCount': '{n} questions',
    'dash.resetTitle': 'Reset all progress?',
    'dash.resetBody':
      'This clears all progress, notes, quiz results, and flashcard states from your browser. This cannot be undone.',
    'dash.cancel': 'Cancel',
    'dash.confirmReset': 'Reset',
    'module.back': '‹ Back to Dashboard',
    'module.markStudied': 'Mark as studied',
    'module.tablistAria': 'Module content',
    'tab.lesson': 'Lesson',
    'tab.flashcards': 'Flashcards',
    'tab.quiz': 'Quiz',
    'tab.notes': 'Notes',
    'lesson.objectives': 'Learning objectives',
    'lesson.keyPoints': 'Key points',
    'lesson.diagram': 'Diagram',
    'lesson.applications': 'Practical applications',
    'lesson.diagramAria': 'Content diagram for module {group}',
    'lesson.diagramFallback':
      'The diagram could not be rendered. Its definition is shown below for reference:',
    'fc.empty': 'No flashcards yet.',
    'fc.progressLabel': 'Flashcard review progress',
    'fc.counter': 'Card {n} / {total}',
    'fc.reviewed': 'Reviewed: {n} / {total}',
    'fc.front': 'Term',
    'fc.back': 'Definition',
    'fc.flipFrontAria': 'Front of card: {term}. Press to see the definition.',
    'fc.flipBackAria': 'Back of card: {term}. Press to flip back.',
    'fc.flipHint': 'Press (or Enter / Space) to flip the card',
    'fc.levelGroupAria': 'Mark how well you know this card',
    'fc.known': 'Known',
    'fc.learning': 'Learning',
    'fc.prev': '‹ Previous card',
    'fc.next': 'Next card ›',
    'quiz.empty': 'No questions yet.',
    'quiz.counter': 'Question {n} / {total}',
    'quiz.bestScore': 'Best score: {pct}',
    'quiz.prev': '‹ Previous',
    'quiz.next': 'Next ›',
    'quiz.submit': 'Submit',
    'quiz.resultTitle': 'Result',
    'quiz.resultScore': 'Scored {pct}',
    'quiz.reviewWrong': 'Review incorrect answers',
    'quiz.yourAnswer': 'Your answer: {answer}',
    'quiz.blank': '(left blank)',
    'quiz.correctAnswer': 'Correct answer: {answer}',
    'quiz.perfect': 'Excellent! You answered every question correctly.',
    'quiz.restart': 'Retry',
    'notes.label': 'Your notes',
    'notes.placeholder': 'Write your study notes here… (autosaved)',
    'notes.saved': 'Saved at {time}',
    'notes.autosave': 'Autosaved to your browser',
    'nf.title': '404',
    'nf.body': 'The page you requested was not found.',
    'nf.back': 'Back to Dashboard',
  },
};

// Surface any empty UI string / module description at module load (build/runtime).
assertStrings();
