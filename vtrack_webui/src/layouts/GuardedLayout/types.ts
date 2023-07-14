import { ReactNode } from "react";

export interface IProps{
    title: string;
    url: string;
    header: string;
    children: ReactNode;
}