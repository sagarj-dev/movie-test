import { ReactNode } from "react";

export interface TabItem {
  title: string;
  children?: ReactNode | string;
  key: string;
}
