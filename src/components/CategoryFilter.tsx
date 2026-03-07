import type { Category } from "@/lib/post-types";
import { categories } from "@/lib/post-types";

interface CategoryFilterProps {
  selected: Category | "all";
  onSelect: (category: Category | "all") => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
          selected === "all"
            ? "bg-pine text-white"
            : "bg-white text-muted-foreground border border-[#e5e5e5] hover:border-pine/40 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelect(category.value)}
          className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
            selected === category.value
              ? "bg-pine text-white"
              : "bg-white text-muted-foreground border border-[#e5e5e5] hover:border-pine/40 hover:text-foreground"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
