import { Loader } from "@/components/icons"
import { IProps } from "@/components/icons/Loader/types";

export default function PageLoaderContainer(props: IProps): JSX.Element {
  return (
    <div className="grid h-screen place-items-center">
      <Loader
        height={props.height}
        width={props.width}
        color={props.color}
      ></Loader>
    </div>
  );
}
