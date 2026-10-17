import type { ModuleDef } from '../types';

export const MODULES: ModuleDef[] = [
  // --- HR Knowledge domains ---
  {
    id: 'people',
    title: 'People',
    kind: 'knowledge',
    description: {
      vi: 'Lĩnh vực kiến thức về quản trị nhân sự: thu hút, phát triển và giữ chân nhân tài, quản lý hiệu suất và gắn kết nhân viên.',
      en: 'The HR knowledge domain on managing people: attracting, developing and retaining talent, managing performance and employee engagement.',
    },
  },
  {
    id: 'organization',
    title: 'Organization',
    kind: 'knowledge',
    description: {
      vi: 'Lĩnh vực kiến thức về tổ chức: cấu trúc, văn hóa, quản trị thay đổi, công nghệ và hiệu quả vận hành của doanh nghiệp.',
      en: 'The HR knowledge domain on the organization: structure, culture, change management, technology and operational effectiveness.',
    },
  },
  {
    id: 'workplace',
    title: 'Workplace',
    kind: 'knowledge',
    description: {
      vi: 'Lĩnh vực kiến thức về môi trường làm việc: quản trị rủi ro, pháp lý nhân sự, trách nhiệm xã hội và lực lượng lao động toàn cầu.',
      en: 'The HR knowledge domain on the workplace: risk management, employment law, corporate social responsibility and a global workforce.',
    },
  },
  // --- Behavioral Competency groups ---
  {
    id: 'leadership',
    title: 'Leadership',
    kind: 'competency',
    description: {
      vi: 'Nhóm năng lực lãnh đạo: dẫn dắt tổ chức và thực hành đạo đức nghề nghiệp.',
      en: 'The Leadership competency cluster: leading the organization and practicing professional ethics.',
    },
    competencies: ['Leadership & Navigation', 'Ethical Practice'],
  },
  {
    id: 'interpersonal',
    title: 'Interpersonal',
    kind: 'competency',
    description: {
      vi: 'Nhóm năng lực quan hệ cá nhân: xây dựng quan hệ, giao tiếp, tư duy toàn cầu và đa dạng - công bằng - hòa nhập.',
      en: 'The Interpersonal competency cluster: relationship management, communication, global mindset and diversity, equity & inclusion.',
    },
    competencies: [
      'Relationship Management',
      'Communication',
      'Global Mindset',
      'Diversity, Equity & Inclusion',
    ],
  },
  {
    id: 'business',
    title: 'Business',
    kind: 'competency',
    description: {
      vi: 'Nhóm năng lực kinh doanh: tư duy phân tích, nhạy bén kinh doanh, tư vấn và đánh giá phản biện.',
      en: 'The Business competency cluster: analytical aptitude, business acumen, consultation and critical evaluation.',
    },
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
