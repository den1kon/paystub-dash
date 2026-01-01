import { FieldDemo } from "./field-demo";

export default function Page() {
  return (
    <div className="p-0 md:p-4 lg:p-10 m-0 w-full h-full flex flex-col gap-5 items-center justify-center">
        <FieldDemo />
    </div>
  );
  // return <ComponentExample />;
}