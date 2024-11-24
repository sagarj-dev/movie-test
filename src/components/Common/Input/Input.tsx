import stlyes from "./Input.module.scss";
import React, { FC, InputHTMLAttributes } from "react";
import Text from "@/UI-Kit/Text/Text";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  preFix?: React.ReactNode;
  postFix?: React.ReactNode;
  label: string;
}
const Input: FC<InputProps> = ({ preFix, postFix, label, ...otherProps }) => {
  return (
    <div>
      <Text as="p">{label}</Text>
      <div className={stlyes.inputContainer}>
        {preFix && <div className={stlyes.iconContainer}>{preFix}</div>}
        <input className={stlyes.input} {...otherProps} />
        {postFix && <div className={stlyes.iconContainer}>{postFix}</div>}
      </div>
    </div>
  );
};

export default Input;
