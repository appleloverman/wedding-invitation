/** 공통 아코디언 섹션 */
export function AccordionSection({ title, defaultOpen = false, children }) {
  return (
    <details
      className="group rounded-2xl bg-white shadow-sm border border-gray-200"
      open={defaultOpen}
    >
      <summary
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none
                   font-medium text-gray-800 rounded-2xl
                   [&::-webkit-details-marker]:hidden"
      >
        <span>{title}</span>
        <svg
          className="h-4 w-4 text-gray-600 transition-transform duration-200 group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-gray-100 px-4 py-4">{children}</div>
    </details>
  );
}
