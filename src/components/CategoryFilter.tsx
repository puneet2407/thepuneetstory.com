import { Category, categories } from "@/lib/data";

interface CategoryFilterProps {
  selected: Category | "all";
  onSelect: (category: Category | "all") => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
          selected === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-primary/10"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelect(category.value)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
            selected === category.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

