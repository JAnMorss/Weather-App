export function Footer() {
  return (
    <footer className="w-full bg-background/80 border-t border-border shadow-inner mt-8 p-4 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} John Anthony Morales — Asp.Net Core Developer, Dumaguete City
      </p>
    </footer>
  );
}
