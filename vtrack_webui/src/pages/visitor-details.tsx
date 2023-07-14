import { Browser } from "@/constants";
import NewVisitorContainer from "@/containers/NewVisitorContainer";
import { GuardedLayout } from "@/layouts";

export default function visitorDetails(): JSX.Element {
  return (
    <>
      <GuardedLayout
        title="Visitor Management | Enter Visitor Details"
        url={Browser.VISITOR_DEATILS}
        header="Enter Visitor Details"
      >
        <NewVisitorContainer />
      </GuardedLayout>
    </>
  );
}
