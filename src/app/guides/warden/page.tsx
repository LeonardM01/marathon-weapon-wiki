import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Warden Boss Guide | How to Kill Every Warden | Marathon Weapon Wiki",
  description:
    "The complete Warden boss guide for Marathon. Learn how to find, fight, and farm the Wraith, Scorch, and Tox Wardens. Best loadouts, shell picks, and strategies for every map.",
};

/* ── reusable components ─────────────────────────────────── */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="cryo-panel p-4 text-center">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
        {label}
      </span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
  );
}

function TipBox({
  title,
  children,
  variant = "accent",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "accent" | "warning" | "danger";
}) {
  const border =
    variant === "warning"
      ? "border-warning"
      : variant === "danger"
        ? "border-danger"
        : "border-accent";
  const text =
    variant === "warning"
      ? "text-warning"
      : variant === "danger"
        ? "text-danger"
        : "text-accent";
  return (
    <div className={`my-8 rounded-r-lg border-l-4 ${border} bg-panel/50 p-6`}>
      <p
        className={`mb-2 font-display text-sm font-bold uppercase tracking-widest ${text}`}
      >
        {title}
      </p>
      <div className="text-dim text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cryo-panel group relative overflow-hidden p-5 transition-all hover:border-border-accent">
      <div className="absolute -right-3 -top-3 font-display text-[72px] font-bold leading-none text-accent/[0.06]">
        {step}
      </div>
      <span className="mb-1 inline-block rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
        Step {step}
      </span>
      <h4 className="mb-2 mt-1 font-display text-base font-bold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <p className="text-dim mb-0 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

export default function WardenGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Marathon Warden Boss Guide: Best Loadouts, Shells & Map-by-Map Strategies",
    description:
      "The complete guide to finding and defeating every Warden boss in Marathon. Covers Wraith, Scorch, and Tox Wardens with loadouts, shell selection, and pro strategies.",
    author: { "@type": "Organization", name: "Marathon Weapon Wiki" },
    datePublished: "2026-03-25",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://marathon-weapon-wiki.com/guides/warden",
    },
    hasPart: [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are Wardens in Marathon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wardens are UESC boss units that spawn randomly inside buildings on each map. There are three variants: the Wraith Warden on Perimeter, the Scorch Warden on Dire Marsh, and the Tox Warden on Outpost. They drop top-tier loot including Marathon Key Cards.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best loadout for fighting Wardens in Marathon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The BR33 Volley Rifle paired with the WSTR Combat Shotgun or Bully SMG is the meta loadout. Bring EMP grenades — they speed up every Warden fight significantly by stripping shields and disrupting mechanics like the Wraith's invisibility.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best shell for Warden fights?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For squads, Triage + Recon + Destroyer is the optimal composition. Triage sustains the team, Recon counters invisibility with Echo Pulse and watches for third-parties, and Destroyer holds the line with Riot Barricade. For solo, Assassin is the top pick.",
            },
          },
          {
            "@type": "Question",
            name: "Can you solo a Warden in Marathon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, solo Warden kills have been confirmed by the community. It requires exceptional gear, EMP grenades, self-revive kits, and a stealth shell like Assassin. Solo players should use high ground and hit-and-run tactics.",
            },
          },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto min-h-screen max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* back link */}
      <Link
        href="/guides"
        className="text-dim hover:text-accent mb-8 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide transition-colors"
      >
        &larr; Back to Guides
      </Link>

      {/* header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground heading-glow lg:text-5xl">
          Warden Boss Guide: Hunt the Hunters
        </h1>
        <div className="text-dim mt-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider">
          <span>By Marathon Weapon Wiki</span>
          <span className="rounded bg-panel px-2 py-0.5 text-accent">
            Boss Guide
          </span>
          <span>March 2026</span>
        </div>
      </div>

      {/* prose wrapper */}
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-foreground prose-p:text-dim prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-accent hover:prose-a:underline">
        <p className="text-xl italic">
          Wardens are Marathon&apos;s roaming boss encounters &mdash; brutal
          UESC units hiding inside buildings across every map. They don&apos;t
          announce themselves like Lockdown ships. They don&apos;t wait for
          you to be ready. They&apos;re just there, behind a door marked with
          yellow bars, holding some of the best loot in the game.
        </p>

        {/* ═══════════════════════════════════════════════════
            SECTION 1 — WHAT ARE WARDENS?
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">What Are Wardens?</h2>

        <p>
          Wardens are elite UESC boss enemies that spawn randomly inside
          buildings during a run. Unlike Lockdown (which is a timed,
          multi-stage event), Wardens are always present from the start of a
          match &mdash; you just need to find them. Each of Marathon&apos;s
          three main maps has its own Warden variant with unique mechanics,
          and each one drops top-tier loot including Marathon Key Cards.
        </p>

        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Maps" value="3" />
          <StatCard label="Variants" value="3" />
          <StatCard label="Spawn Type" value="Random" />
          <StatCard label="Top Drop" value="Key Cards" />
        </div>

        <TipBox title="How to Spot a Warden" variant="accent">
          <p className="mb-0">
            Look for <strong>yellow bars across building entrance
            doors</strong>. Every Warden on every map displays these
            distinctive markers, visible from a distance. If you see yellow
            bars, there&apos;s a boss inside. Prepare before you enter.
          </p>
        </TipBox>

        {/* ═══════════════════════════════════════════════════
            SECTION 2 — ALL THREE WARDENS
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          The Three Wardens: Map-by-Map Breakdown
        </h2>

        {/* — Wraith — */}
        <div className="cryo-panel my-8 overflow-hidden">
          <div className="border-b border-border bg-panel/50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="m-0 text-xl text-foreground">Wraith Warden</h3>
              <div className="flex gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  Perimeter
                </span>
                <span className="rounded bg-panel px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                  Overflow
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 p-6">
            <p className="m-0">
              The Wraith Warden is the most mechanically complex boss. It
              fights with <strong>invisibility</strong>,{" "}
              <strong>decoy clones</strong>, and a constant stream of UESC
              reinforcements. The invisibility forces you to track it
              actively, and the decoys are designed to waste your ammo. If
              you don&apos;t know the mechanics going in, you&apos;ll dump
              magazines into fakes while the real boss repositions behind
              you.
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Key Mechanic
                </span>
                <span className="text-sm font-bold text-foreground">
                  Invisibility + Decoys
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Counter
                </span>
                <span className="text-sm font-bold text-foreground">
                  Ping System + EMP
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Position
                </span>
                <span className="text-sm font-bold text-foreground">
                  2nd Floor / Rooftop
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* — Scorch — */}
        <div className="cryo-panel my-8 overflow-hidden">
          <div className="border-b border-border bg-panel/50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="m-0 text-xl text-foreground">Scorch Warden</h3>
              <div className="flex gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  Dire Marsh
                </span>
                <span className="rounded bg-panel px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                  Algae Ponds
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 p-6">
            <p className="m-0">
              The Scorch Warden spawns dead-center on the map at Algae
              Ponds, which means{" "}
              <strong>
                absolutely everyone on the server knows it&apos;s there
              </strong>
              . This turns every Scorch fight into a multi-team war &mdash;
              you&apos;re fighting the boss AND every other squad
              simultaneously. The PvP pressure here is the highest of any
              Warden encounter.
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Key Mechanic
                </span>
                <span className="text-sm font-bold text-foreground">
                  Multi-Team PvP
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Counter
                </span>
                <span className="text-sm font-bold text-foreground">
                  Speed Kill + Recon Intel
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Threat Level
                </span>
                <span className="text-sm font-bold text-foreground">
                  Extreme (PvP)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* — Tox — */}
        <div className="cryo-panel my-8 overflow-hidden">
          <div className="border-b border-border bg-panel/50 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="m-0 text-xl text-foreground">Tox Warden</h3>
              <div className="flex gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  Outpost
                </span>
                <span className="rounded bg-panel px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                  Dormitories
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 p-6">
            <p className="m-0">
              The Tox Warden is the environmental nightmare. It lobs{" "}
              <strong>toxic grenades</strong>, fires{" "}
              <strong>missile barrages</strong>, and sits behind a room
              filled with toxic spores and flowers that deal continuous
              damage. UESC reinforcements spawn constantly throughout the
              fight. On kill, it has a chance to drop the{" "}
              <strong>Master Clearance Code</strong> &mdash; the red key
              card needed to access restricted extraction sites on Outpost.
            </p>
            <div className="not-prose grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Key Mechanic
                </span>
                <span className="text-sm font-bold text-foreground">
                  Toxic AoE + Missiles
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Counter
                </span>
                <span className="text-sm font-bold text-foreground">
                  Staircase Cover + Burst
                </span>
              </div>
              <div className="rounded bg-panel p-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-accent">
                  Special Drop
                </span>
                <span className="text-sm font-bold text-foreground">
                  Master Clearance Code
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 3 — HOW TO FIGHT
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          How to Fight a Warden: Step-by-Step
        </h2>

        <p>
          Unlike Lockdown, Wardens don&apos;t have an activation sequence.
          They&apos;re always there. The challenge is preparation,
          positioning, and speed.
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          <StepCard step={1} title="Spot the Yellow Bars">
            Scan building entrances from a distance. Yellow bars across the
            door = boss inside. Toxic spores specifically signal the Tox
            Warden on Outpost.
          </StepCard>
          <StepCard step={2} title="Gear Check">
            Before you open that door, confirm: EMP grenades loaded? Healing
            stocked? Team composition set? You will not have time to
            reorganize once the fight starts.
          </StepCard>
          <StepCard step={3} title="Take High Ground">
            Never fight a Warden at ground level. Move to the second floor,
            rooftop, or elevated staircase positions. This gives you line of
            sight while reducing incoming damage.
          </StepCard>
          <StepCard step={4} title="Assign a Lookout">
            Station one squad member on the rooftop or a vantage point
            watching for incoming player squads. Your team is focused on a
            bullet sponge &mdash; you need eyes on rotations.
          </StepCard>
          <StepCard step={5} title="Engage Fast, Kill Faster">
            Every gunshot attracts other squads. The longer the fight lasts,
            the more likely you get third-partied. Open with EMP grenades,
            focus fire, and burn the boss down as quickly as possible.
          </StepCard>
          <StepCard step={6} title="Loot and Extract">
            Grab the drops immediately. Don&apos;t linger. Other squads are
            already converging on the gunfire. Secure your Marathon Key Card,
            weapons, and get out.
          </StepCard>
        </div>

        <TipBox title="The #1 Rule" variant="danger">
          <p className="mb-0">
            <strong>Speed is survival.</strong> Every second you spend
            fighting a Warden is a second another squad has to rotate onto
            your position. Kill it fast, loot it fast, leave fast. Approach
            with a plan, not optimism.
          </p>
        </TipBox>

        {/* ═══════════════════════════════════════════════════
            SECTION 4 — BEST LOADOUTS
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Best Loadouts</h2>

        <p>
          Warden fights demand high burst DPS to end the encounter quickly,
          plus enough range to fight from elevated positions. You also need
          to handle PvP at a moment&apos;s notice.
        </p>

        <h3>Primary: Burst DPS Weapons</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              S-Tier &mdash; All-Rounder
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              BR33 Volley Rifle
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Light Rounds burst rifle with incredible versatility. Shreds
              Warden shields at any range with remarkably stable recoil.
              Works as both your PvE boss-melter and PvP defense weapon.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              S-Tier &mdash; Boss Killer
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              WSTR Combat Shotgun
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              485 burst DPS in two devastating shots. With the ammo-regen
              chip mod, it becomes a sustained boss killer. Position
              correctly and nothing drops Wardens faster.
            </p>
          </div>
        </div>

        <h3>Secondary: Sustained Damage &amp; Range</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              S-Tier &mdash; Sustained Fire
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              Bully SMG
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Strongest SMG in the game. Heavy Rounds cause flinch on enemy
              Runners, giving you the edge in PvP encounters that
              inevitably happen during Warden fights.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              S-Tier &mdash; Long Range
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              Outland Sniper
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Highest single-shot damage. Non-committal charge mechanic
              builds damage over time with immediate follow-up shots. Ideal
              for sustained PvE boss damage from elevated positions.
            </p>
          </div>
        </div>

        <h3>Recommended Weapon Pairings</h3>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Pairing
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Playstyle
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "BR33 Volley + Bully SMG",
                  "Versatile pressure",
                  "All Wardens. Best general-purpose combo.",
                ],
                [
                  "WSTR Shotgun + Outland Sniper",
                  "High burst at any range",
                  "Wraith Warden. Burst through invis phases fast.",
                ],
                [
                  "BR33 Volley + Outland Sniper",
                  "Ranged dominance",
                  "Scorch Warden. Maintain distance from PvP chaos.",
                ],
                [
                  "WSTR Shotgun + Bully SMG",
                  "Aggressive CQC",
                  "Tox Warden. Push through the Dormitories.",
                ],
              ].map(([pairing, style, best], i) => (
                <tr
                  key={pairing}
                  className={i % 2 === 0 ? "bg-accent/[0.02]" : ""}
                >
                  <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                    {pairing}
                  </td>
                  <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                    {style}
                  </td>
                  <td className="border border-border px-4 py-3 text-sm text-dim">
                    {best}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── consumables ── */}
        <h3>Required Consumables</h3>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Item
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Qty
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [
                    "EMP Grenades",
                    "3–4",
                    "MANDATORY. Strips Warden shields, disrupts Wraith invisibility, clears decoys. Speeds up every fight.",
                    true,
                  ],
                  [
                    "Pangea Kit",
                    "1–2",
                    "Full heal + shield restore + removes all status effects. Your emergency button.",
                    true,
                  ],
                  [
                    "Patch Kits",
                    "3 stacks",
                    "Primary health recovery during extended boss fights.",
                    false,
                  ],
                  [
                    "Shield Charges",
                    "3 stacks",
                    "Immediate shield restore. Critical against Warden burst damage.",
                    false,
                  ],
                  [
                    "Self-Revive",
                    "1",
                    "MANDATORY for solo. Essential insurance for squads. No revive = wipe.",
                    true,
                  ],
                  [
                    "Smoke Grenades",
                    "1–2",
                    "Cover for repositioning. Especially useful for solo Assassin players.",
                    false,
                  ],
                  [
                    "Ammo (both types)",
                    "Full stacks",
                    "Wardens are bullet sponges. Running dry mid-fight is fatal.",
                    false,
                  ],
                ] as const
              ).map(([item, qty, purpose, critical], i) => (
                <tr
                  key={item}
                  className={i % 2 === 0 ? "bg-accent/[0.02]" : ""}
                >
                  <td
                    className={`border border-border px-4 py-3 text-sm font-bold ${critical ? "text-accent" : "text-foreground"}`}
                  >
                    {item}
                  </td>
                  <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                    {qty}
                  </td>
                  <td className="border border-border px-4 py-3 text-sm text-dim">
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 5 — SHELL SELECTION
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Best Shell Selection</h2>

        <h3>Squad Play: Optimal Composition</h3>
        <p>
          The ideal squad for Warden fights is{" "}
          <strong>Triage + Recon + Destroyer</strong>. Each shell covers a
          critical role: Triage sustains through the long fight, Recon
          provides anti-invisibility intel and early warning on enemy squads,
          and Destroyer holds the line and pushes through tough phases.
        </p>

        <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Triage",
              tier: "S-TIER",
              role: "Sustain",
              desc: "Med-Drone keeps the team alive through extended boss fights. Shareware.exe shares healing buffs. Reboot+ enables ranged revives when teammates go down.",
            },
            {
              name: "Recon",
              tier: "S-TIER",
              role: "Intel",
              desc: "Echo Pulse reveals invisible enemies — a direct counter to the Wraith Warden. Tracker Drone auto-eliminates UESC reinforcements. Interrogation warns when hostile squads ping you.",
            },
            {
              name: "Destroyer",
              tier: "S-TIER",
              role: "Frontline",
              desc: "Riot Barricade blocks incoming damage during boss phases. Search and Destroy launches homing missiles on sustained fire. The anchor that holds the line.",
            },
          ].map((shell) => (
            <div key={shell.name} className="cryo-panel p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {shell.tier}
                </span>
                <span className="rounded bg-panel px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                  {shell.role}
                </span>
              </div>
              <p className="mb-2 font-display text-lg font-bold uppercase tracking-wider text-foreground">
                {shell.name}
              </p>
              <p className="text-dim mb-0 text-sm leading-relaxed">
                {shell.desc}
              </p>
            </div>
          ))}
        </div>

        <h3>Solo Play: Best Shells</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Assassin",
              tier: "S-TIER",
              desc: "Active Camo allows hit-and-run tactics against the boss. Shadow Dive smoke cloud provides emergency escape. The best shell for controlling when and how you fight.",
            },
            {
              name: "Thief",
              tier: "A-TIER",
              desc: "X-Ray Visor scouts the building before entry. Grapple Device provides vertical escape if things go wrong. Pickpocket Drone can scout boss rooms safely.",
            },
            {
              name: "Rook",
              tier: "A-TIER",
              desc: "Solo-exclusive shell with a pre-built kit. Zero stash risk if you die. Recuperation slowly restores health between damage phases.",
            },
          ].map((shell) => (
            <div key={shell.name} className="cryo-panel p-5">
              <span className="mb-1 block w-fit rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                {shell.tier}
              </span>
              <p className="mb-2 mt-1 font-display text-base font-bold uppercase tracking-wider text-foreground">
                {shell.name}
              </p>
              <p className="text-dim mb-0 text-sm leading-relaxed">
                {shell.desc}
              </p>
            </div>
          ))}
        </div>

        <h3>Why Recon Counters the Wraith</h3>
        <p>
          The Wraith Warden&apos;s invisibility is its most frustrating
          mechanic. Recon&apos;s <strong>Echo Pulse</strong> directly
          counters this by revealing all nearby enemies, including cloaked
          targets. Combined with the <strong>ping system</strong> (which the
          entire squad should be using constantly), you can track the real
          Wraith through its decoy phases without wasting ammo on fakes.
        </p>

        {/* ═══════════════════════════════════════════════════
            SECTION 6 — WARDEN-SPECIFIC TACTICS
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          Warden-Specific Tactics
        </h2>

        <h3>Wraith Warden (Perimeter)</h3>
        <ul>
          <li>
            <strong>Take the second floor or rooftop.</strong> Never fight
            the Wraith at ground level. Elevated positions give you sight
            lines while reducing incoming damage from both the boss and
            reinforcements.
          </li>
          <li>
            <strong>Ping constantly.</strong> The Wraith goes invisible and
            spawns decoys. Use the ping system to mark the real one. Recon
            Echo Pulse is the hard counter.
          </li>
          <li>
            <strong>Open with EMP grenades.</strong> They strip the
            Wraith&apos;s shield, disrupt its invisibility cycle, and give
            your team a damage window. This speeds up the fight
            significantly.
          </li>
          <li>
            <strong>Post a rooftop lookout.</strong> Other squads will
            rotate toward the gunfire. Have one player watching for incoming
            threats while the other two focus the boss.
          </li>
        </ul>

        <h3>Scorch Warden (Dire Marsh)</h3>
        <ul>
          <li>
            <strong>
              Approach Algae Ponds with a plan, not optimism.
            </strong>{" "}
            If you can hear gunfire at the Ponds, there is already a fight
            happening. Decide whether to engage or wait.
          </li>
          <li>
            <strong>Kill speed is everything.</strong> The central location
            means every squad on the server can reach you quickly. Burn the
            boss down fast or you&apos;ll be fighting 2&ndash;3 teams at
            once.
          </li>
          <li>
            <strong>BR33 + Outland for range.</strong> Maintaining distance
            from the PvP chaos while still dealing boss damage is the
            optimal play here.
          </li>
        </ul>

        <h3>Tox Warden (Outpost)</h3>
        <ul>
          <li>
            <strong>Use staircases and structural cover.</strong> The Tox
            Warden&apos;s missile barrages and toxic grenades punish anyone
            standing in the open. Peek from behind walls and staircases to
            break line of sight between damage phases.
          </li>
          <li>
            <strong>Watch for environmental damage.</strong> The Dormitories
            are filled with toxic flowers and spores. You&apos;re taking
            damage just being in the room. Keep healing topped up.
          </li>
          <li>
            <strong>Hunt the Master Clearance Code.</strong> The Tox Warden
            has a good chance to drop the red key card needed for restricted
            extraction sites on Outpost. This alone makes the fight worth
            it.
          </li>
        </ul>

        {/* ═══════════════════════════════════════════════════
            SECTION 7 — REWARDS
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Warden Rewards</h2>

        <p>
          Wardens hold some of the best loot in Marathon. Along with Lockdown
          completions, Warden kills are the most consistent source of
          Marathon Key Cards &mdash; the keys to the endgame Cryo Archive
          map.
        </p>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Drop
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Rate
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-accent/[0.02]">
                <td className="border border-border px-4 py-3 text-sm font-bold text-accent">
                  Marathon Key Card
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  High chance
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  Grants access to the Cryo Archive endgame map. One of the
                  most consistent farming methods.
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                  Weapons (Deluxe–Superior)
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Guaranteed
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  Minimum Deluxe rarity. Can roll up to Superior with mods
                  attached.
                </td>
              </tr>
              <tr className="bg-accent/[0.02]">
                <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                  Shell Cores &amp; Implants
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Common
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  High-rarity cores and implants for shell builds.
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                  Rare Salvage &amp; Mods
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Common
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  Weapon mods and salvage materials for crafting.
                </td>
              </tr>
              <tr className="bg-accent/[0.02]">
                <td className="border border-border px-4 py-3 text-sm font-bold text-accent">
                  Master Clearance Code
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Tox Warden only
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  Red key card for restricted Outpost extraction sites
                  (Pinwheel). Extremely valuable.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 8 — COMMON MISTAKES
        ═══════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          Common Mistakes to Avoid
        </h2>

        <div className="bg-panel/50 my-8 rounded-r-lg border-l-4 border-danger p-6">
          <ol className="mb-0 list-decimal space-y-3 pl-5">
            <li>
              <strong className="text-foreground">
                Fighting at ground level.
              </strong>{" "}
              <span className="text-dim">
                Always take elevated positions. Second floor, rooftop,
                staircases. Ground level gets you killed by reinforcements
                and the boss simultaneously.
              </span>
            </li>
            <li>
              <strong className="text-foreground">
                Shooting Wraith decoys.
              </strong>{" "}
              <span className="text-dim">
                Use the ping system and Recon Echo Pulse to identify the
                real Wraith. Dumping ammo into clones is how you run dry
                mid-fight.
              </span>
            </li>
            <li>
              <strong className="text-foreground">
                No EMP grenades.
              </strong>{" "}
              <span className="text-dim">
                EMPs speed up every Warden fight dramatically. Not bringing
                them turns a 2-minute fight into a 5-minute one &mdash; and
                those extra 3 minutes are when rival squads arrive.
              </span>
            </li>
            <li>
              <strong className="text-foreground">
                Slow kills attracting PvP.
              </strong>{" "}
              <span className="text-dim">
                Every gunshot broadcasts your location. The longer the fight
                takes, the more squads converge. DPS is a survival stat.
              </span>
            </li>
            <li>
              <strong className="text-foreground">
                No dedicated lookout.
              </strong>{" "}
              <span className="text-dim">
                Your whole squad staring at a boss = free third-party for
                anyone rotating in. Always assign one player to watch
                flanks.
              </span>
            </li>
            <li>
              <strong className="text-foreground">
                Solo without Self-Revive.
              </strong>{" "}
              <span className="text-dim">
                No one is coming to pick you up. A Self-Revive kit is
                non-negotiable for solo Warden attempts.
              </span>
            </li>
          </ol>
        </div>

        {/* ═══════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════ */}

        <section className="mt-16 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-display uppercase tracking-widest text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What are Wardens in Marathon?
              </h4>
              <p>
                Wardens are UESC boss units that spawn randomly inside
                buildings on each map. There are three variants: the Wraith
                Warden on Perimeter (Overflow), the Scorch Warden on Dire
                Marsh (Algae Ponds), and the Tox Warden on Outpost
                (Dormitories). They&apos;re identified by yellow bars on
                building entrances and drop top-tier loot including Marathon
                Key Cards.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What is the best loadout for fighting Wardens?
              </h4>
              <p>
                The BR33 Volley Rifle paired with the WSTR Combat Shotgun
                or Bully SMG is the meta loadout. The BR33 handles range
                and sustained damage while the shotgun or SMG delivers
                close-range burst. Always bring EMP grenades &mdash; they
                speed up every Warden fight by stripping shields and
                disrupting the Wraith&apos;s invisibility.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What is the best shell for Warden fights?
              </h4>
              <p>
                For squads, Triage + Recon + Destroyer is the optimal
                composition. Triage sustains the team, Recon counters the
                Wraith&apos;s invisibility with Echo Pulse and watches for
                enemy squads, and Destroyer anchors the frontline with Riot
                Barricade. For solo, Assassin is the top pick for its
                hit-and-run camo tactics.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                Can you solo a Warden in Marathon?
              </h4>
              <p>
                Yes. Solo Warden kills have been confirmed by the community,
                including on Perimeter. It requires exceptional gear, EMP
                grenades, a Self-Revive kit, and a stealth shell like
                Assassin. Use high ground, hit-and-run tactics, and
                don&apos;t get greedy with damage windows.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What does the Tox Warden drop?
              </h4>
              <p>
                The Tox Warden on Outpost has a chance to drop the Master
                Clearance Code &mdash; the red key card required for
                restricted extraction sites like Pinwheel. It also drops
                Deluxe-to-Superior weapons, cores, implants, and Marathon
                Key Cards like all other Wardens.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                How do I track the Wraith Warden when it goes invisible?
              </h4>
              <p>
                Use the ping system constantly to mark the real Wraith among
                its decoys. Recon&apos;s Echo Pulse ability directly
                reveals invisible enemies, making Recon the hard counter to
                this boss. EMP grenades also disrupt the invisibility cycle.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
