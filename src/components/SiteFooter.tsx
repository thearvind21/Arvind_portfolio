export default function SiteFooter() {
  return (
    <footer className="bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div
            aria-hidden="true"
            className="h-px w-40 mx-auto bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 opacity-50 rounded"
          />
          <p className="text-sm md:text-base font-medium" style={{ color: 'rgba(var(--fg-rgb,255,255,255),0.7)' }}>
            © {new Date().getFullYear()} Arvind Padyachi. All rights reserved.
          </p>
         
          
        </div>
      </div>
    </footer>
  );
}
