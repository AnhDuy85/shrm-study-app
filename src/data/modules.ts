import type { ModuleDef } from '../types';

const COMPETENCY_PDFS = [
  'SHRM_2022-HR_Competencies.pdf',
  'SHRM_CP_SCP_HRcompetencies.pdf',
  'SHRM_CP-SCP_Slides.pdf',
];

export const MODULES: ModuleDef[] = [
  // --- HR Knowledge domains ---
  {
    id: 'people',
    title: 'People',
    kind: 'knowledge',
    description:
      'Lĩnh vực kiến thức về quản trị nhân sự: thu hút, phát triển và giữ chân nhân tài, quản lý hiệu suất và gắn kết nhân viên.',
    pdfs: ['SHRM_2022-People.pdf', 'SHRM_CP_SCP_People.pdf'],
  },
  {
    id: 'organization',
    title: 'Organization',
    kind: 'knowledge',
    description:
      'Lĩnh vực kiến thức về tổ chức: cấu trúc, văn hóa, quản trị thay đổi, công nghệ và hiệu quả vận hành của doanh nghiệp.',
    pdfs: ['SHRM_2022-Organization.pdf', 'SHRM_CP_SCP_Organization.pdf'],
  },
  {
    id: 'workplace',
    title: 'Workplace',
    kind: 'knowledge',
    description:
      'Lĩnh vực kiến thức về môi trường làm việc: quản trị rủi ro, pháp lý nhân sự, trách nhiệm xã hội và lực lượng lao động toàn cầu.',
    pdfs: ['SHRM_2022-Workplace.pdf', 'SHRM_CP_SCP_Workplace.pdf'],
  },
  // --- Behavioral Competency groups ---
  {
    id: 'leadership',
    title: 'Leadership',
    kind: 'competency',
    description:
      'Nhóm năng lực lãnh đạo: dẫn dắt tổ chức và thực hành đạo đức nghề nghiệp.',
    pdfs: COMPETENCY_PDFS,
    competencies: ['Leadership & Navigation', 'Ethical Practice'],
  },
  {
    id: 'interpersonal',
    title: 'Interpersonal',
    kind: 'competency',
    description:
      'Nhóm năng lực quan hệ cá nhân: xây dựng quan hệ, giao tiếp, tư duy toàn cầu và đa dạng - công bằng - hòa nhập.',
    pdfs: COMPETENCY_PDFS,
    competencies: [
      'Relationship Management',
      'Communication',
      'Global Mindset',
      'Diversity Equity & Inclusion',
    ],
  },
  {
    id: 'business',
    title: 'Business',
    kind: 'competency',
    description:
      'Nhóm năng lực kinh doanh: tư duy phân tích, nhạy bén kinh doanh, tư vấn và đánh giá phản biện.',
    pdfs: COMPETENCY_PDFS,
    competencies: [
      'Analytical Aptitude',
      'Business Acumen',
      'Consultation',
      'Critical Evaluation',
    ],
  },
];

export const MODULE_BY_ID: Record<string, ModuleDef> = Object.fromEntries(
  MODULES.map((m) => [m.id, m]),
);
