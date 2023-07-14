export default function Footer(): JSX.Element {
  return (
    <footer className="bg-stone-600 text-white flex justify-center py-2 fixed bottom-0 left-0 right-0">
      <strong className="text-center">
        &copy; 1998 - {new Date().getFullYear()} Innova Solutions. All Rights
        Reserved.
      </strong>
    </footer>
  );
}
