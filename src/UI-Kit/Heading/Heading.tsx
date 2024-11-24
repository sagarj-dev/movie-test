import { ICssModule } from "@/types/common.types";
import React, { FC, HTMLAttributes, ElementType } from "react";

type IProps = HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: ICssModule;
};

const Heading: FC<IProps> = ({
  level,
  className = "",
  children,
  ...htmlProps
}) => {
  const Tag = `h${level}` as ElementType;
  const cssClass =
    typeof className === "string"
      ? className
      : Object.values(className || {}).join(" ");

  return (
    <Tag className={cssClass} {...htmlProps}>
      {children}
    </Tag>
  );
};

export default Heading;
