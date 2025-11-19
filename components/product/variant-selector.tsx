"use client";

import { ProductOption } from "@/types/shopify";

interface VariantSelectorProps {
  options: ProductOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
  availableOptions?: Record<string, string[]>;
}

export function VariantSelector({
  options,
  selectedOptions,
  onOptionChange,
  availableOptions,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {option.name}:{" "}
            <span className="font-semibold">
              {selectedOptions[option.name]}
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable =
                !availableOptions ||
                availableOptions[option.name]?.includes(value);

              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 border rounded-md text-sm font-medium transition-all
                    ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : isAvailable
                        ? "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                        : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
