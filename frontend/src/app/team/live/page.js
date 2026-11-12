import TeamLive from "@/components/TeamLive/TeamLive";

// Private team page: website chat inbox + visitor analytics (BBV Live).
// Data needs the key in the link (#k=...), so the page itself shows nothing without it.
export const metadata = {
  title: "BBV Live · Team",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <TeamLive />;
}
