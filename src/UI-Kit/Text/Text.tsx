import { ICssModule } from "@/types/common.types";
import React, { FC, HTMLAttributes, ElementType } from "react";

type IProps = HTMLAttributes<HTMLHeadingElement> & {
  as: "p" | "span";
  className?: ICssModule;
};

const Text: FC<IProps> = ({ as, className = "", children, ...htmlProps }) => {
  const Tag = `${as}` as ElementType;
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

export default Text;
