import { createFileRoute } from "@tanstack/react-router";
import { Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const links = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Email", href: "#", icon: Mail },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-12 sm:py-20">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lovable"
          alt="Profile picture"
          className="h-28 w-28 rounded-full border border-border bg-muted object-cover"
        />

        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Your Name</h1>
        <p className="mt-1 text-sm text-muted-foreground">@yourhandle</p>

        <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-sm">
          A short blurb about who you are and what you do. Replace this with
          your own bio — keep it friendly and concise.
        </p>

        <nav className="mt-8 w-full flex flex-col gap-3" aria-label="Social links">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center justify-center gap-3 w-full rounded-full border border-border bg-card px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-accent hover:scale-[1.02] active:scale-[0.99]"
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <footer className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Your Name
        </footer>
      </div>
    </main>
  );
}
