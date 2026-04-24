import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helpers (unchanged)
export function getStatusColor(status) {
  const colors = {
    draft: 'bg-yellow-100 text-yellow-800',
    working: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    prunned: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getNextStatusLabel(current) {
  if (current === 'draft') return '→ Start Working';
  if (current === 'working') return '→ Mark Completed';
  if (current === 'completed') return '→ Back to Draft';
  return 'Change Status';
}
