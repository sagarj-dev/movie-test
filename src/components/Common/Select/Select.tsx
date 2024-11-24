import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Select.module.scss";
import Text from "@/UI-Kit/Text/Text";

interface SelectItem<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  label: string;
  defaultValue?: T;
  options: SelectItem<T>[];
  onSelect?: (value: T) => void;
}

const Select: FC<SelectProps<string | number>> = ({
  label,
  defaultValue,
  options,
  onSelect
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectLabel = useMemo(
    () => options.find((option) => option.value === selectedValue)?.label || "",
    [selectedValue, options]
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string | number) => {
    if (onSelect) {
      onSelect(value);
    }
    setSelectedValue(value);
    setIsOpen(false);
  };
  return (
    <div className={styles.selectContainer}>
      <Text as="p">{label}</Text>
      <button
        className={styles.selectButton}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {selectLabel || "Select"}
      </button>
      {isOpen && (
        <div className={styles.optionsContainer} ref={wrapperRef}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.dropDownItem}
              onClick={() => {
                handleSelect(option.value);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
