import useAccessCard from "./useAccessCard";
import useAuth from "./useAuth";
import useCategory from "./useCatergory";
import useRecordSubmit from "./useVisitor";
import useNidtypes from "./useNidtypes";
import { useDispatch, useSelector } from "react-redux";

const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;

export { useAccessCard, useAuth, useAppDispatch, useAppSelector, useCategory, useNidtypes, useRecordSubmit };
