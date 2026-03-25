import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lockdown Event Guide | How to Complete All 3 Ships | Marathon Weapon Wiki",
  description:
    "The definitive Lockdown event guide for Marathon. Best loadouts, shell selection, step-by-step walkthrough, consumables checklist, and pro strategies for completing all 3 ships in Dire Marsh.",
};

/* ── tiny reusable bits ─────────────────────────────────── */

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
    <div
      className={`my-8 rounded-r-lg border-l-4 ${border} bg-panel/50 p-6`}
    >
      <p className={`mb-2 font-display text-sm font-bold uppercase tracking-widest ${text}`}>
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

function WaveRow({
  wave,
  enemies,
  strategy,
  highlight,
}: {
  wave: string;
  enemies: string;
  strategy: string;
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-accent/[0.04]" : ""}>
      <td className="whitespace-nowrap border border-border px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-accent">
        {wave}
      </td>
      <td className="border border-border px-4 py-3 text-sm text-foreground">
        {enemies}
      </td>
      <td className="border border-border px-4 py-3 text-dim text-sm">
        {strategy}
      </td>
    </tr>
  );
}

/* ── page ────────────────────────────────────────────────── */

export default function LockdownGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Marathon Lockdown Event Guide: Best Loadouts, Shells & Step-by-Step Walkthrough",
    description:
      "The definitive guide to completing the Lockdown event in Marathon. Covers loadouts, shell selection, required items, enemy waves, and extraction strategies.",
    author: { "@type": "Organization", name: "Marathon Weapon Wiki" },
    datePublished: "2026-03-25",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://marathon-weapon-wiki.com/guides/lockdown",
    },
    hasPart: [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the Lockdown event in Marathon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Lockdown is the highest-stakes PvE event in Marathon, exclusive to Dire Marsh. Three UESC ships spawn over different POIs roughly 10-15 minutes into a match. Players insert a Lockdown Drive, fight three waves of bots, and collect top-tier loot from each ship.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best loadout for Marathon Lockdown?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The meta loadout is the BR33 Volley Rifle paired with the Bully SMG for versatility, or the WSTR Combat Shotgun paired with the Longshot Sniper for maximum burst damage.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best shell for Lockdown in Marathon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Triage is the best squad shell for Lockdown thanks to Med-Drone healing and Shareware.exe sharing Anti-Virus Pack buffs. For solo, Assassin with Active Camo is the top pick.",
            },
          },
          {
            "@type": "Question",
            name: "How many Anti-Virus Packs do you need for Lockdown?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bring 3-4 Anti-Virus Packs per squad. Each pack provides approximately 90 seconds of Data Corruption protection. A Triage player with Shareware.exe can share the buff to reduce total consumption.",
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
          Lockdown Event: The Definitive Guide
        </h1>
        <div className="text-dim mt-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider">
          <span>By Marathon Weapon Wiki</span>
          <span className="rounded bg-panel px-2 py-0.5 text-accent">
            Event Guide
          </span>
          <span>March 2026</span>
        </div>
      </div>

      {/* prose wrapper — matches existing guides */}
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-foreground prose-p:text-dim prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-accent hover:prose-a:underline">
        <p className="text-xl italic">
          Lockdown is the single most rewarding &mdash; and most dangerous
          &mdash; event in Marathon. Three UESC ships, three multi-wave
          defense encounters, and loot that makes every other activity on Dire
          Marsh look like pocket change. Here&apos;s everything you need to
          dominate it.
        </p>

        {/* ══════════════════════════════════════════════════════
            SECTION 1 — WHAT IS LOCKDOWN?
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">What Is a Lockdown Event?</h2>

        <p>
          Lockdown is a late-game PvE event exclusive to the <strong>Dire
          Marsh</strong> map. Roughly 10&ndash;15&nbsp;minutes into a match,
          three massive UESC Security Cache ships unfold over different Points
          of Interest. A towering blue laser beam marks each location, visible
          from anywhere on the map &mdash; which means every squad on the
          server knows exactly where the action is.
        </p>
        <p>
          Each ship is surrounded by a <strong>Data Corruption
          field</strong> that deals continuous damage unless you&apos;re
          protected by an <strong>Anti-Virus Pack</strong>. You activate the
          encounter by inserting a Lockdown Drive, fight through three waves
          of UESC bots, and crack open a reward chest. Complete all three
          ships and you walk out with the best loot in the entire game.
        </p>

        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Map" value="Dire Marsh" />
          <StatCard label="Ships" value="3" />
          <StatCard label="Waves / Ship" value="3" />
          <StatCard label="Time Limit" value="~13 min" />
        </div>

        <TipBox title="PvP Warning" variant="danger">
          <p className="mb-0">
            Every squad on the server sees the ships spawn. The biggest danger
            in Lockdown isn&apos;t the AI waves &mdash; it&apos;s getting
            third-partied while you&apos;re fighting bots. Clear nearby
            threats <strong>before</strong> you activate.
          </p>
        </TipBox>

        {/* ══════════════════════════════════════════════════════
            SECTION 2 — STEP-BY-STEP
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          Step-by-Step Walkthrough
        </h2>

        <h3>Phase 1 &mdash; Pre-Event Prep (First 10 Minutes)</h3>
        <p>
          Don&apos;t rush. The ships won&apos;t appear for at least 10
          minutes. Use that time wisely:
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          <StepCard step={1} title="Gear Up">
            Equip a close-range + long-range weapon combo. Stock all
            consumables (see the full checklist below). Prioritize
            Anti-Virus Packs above everything else.
          </StepCard>
          <StepCard step={2} title="Clear PvP Threats">
            Eliminate nearby squads before the event spawns. Fighting bots AND
            players simultaneously is the #1 cause of failed Lockdowns.
          </StepCard>
          <StepCard step={3} title="Position Centrally">
            Stage near Algae Ponds or Intersection &mdash; both are roughly
            central on Dire Marsh, letting you reach any ship quickly.
          </StepCard>
          <StepCard step={4} title="Watch the Sky">
            When the massive blue square ship unfolds and vertical laser beams
            appear, the event is live. Move to the nearest beam immediately.
          </StepCard>
        </div>

        <h3>Phase 2 &mdash; Ship 1: Activation</h3>

        <div className="not-prose my-6 grid gap-4">
          <StepCard step={1} title="Use Anti-Virus Pack">
            Pop it before entering the red Data Corruption zone. Each pack
            gives ~90 seconds of protection (yellow bar above your shield).
          </StepCard>
          <StepCard step={2} title="Find the Lockdown Drive">
            It&apos;s a yellow item on the ground near the UESC Security
            Cache terminal.
          </StepCard>
          <StepCard step={3} title="Insert the Drive">
            Interact with the blue terminal to begin the encounter. This
            triggers the first of three enemy waves.
          </StepCard>
          <StepCard step={4} title="Survive Three Waves">
            Enemies spawn in three escalating waves. The final wave includes a
            Purple-Shielded Commander (see tactics below).
          </StepCard>
          <StepCard step={5} title="Loot &amp; Grab the Next Drive">
            Open the reward chest, grab loot, and pick up the next Lockdown
            Drive from inside the chest. This drive is required for Ship 2.
          </StepCard>
        </div>

        <h3>Phase 3 &mdash; Ships 2 &amp; 3: Rotation</h3>
        <p>
          Carry the Lockdown Drive to the next ship and repeat the process.
          The drive does <strong>not</strong> spawn on the ground at Ships 2
          and 3 &mdash; it only comes from the previous chest. Use{" "}
          <strong>Cardio Kicks</strong> for a speed burst during rotation.
          Time is everything.
        </p>
        <p>
          Each subsequent ship features harder waves but dramatically better
          rewards. Ship 3&apos;s chest contains the best loot available in
          the entire game.
        </p>

        <h3>Enemy Wave Breakdown</h3>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Wave
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Enemies
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Strategy
                </th>
              </tr>
            </thead>
            <tbody>
              <WaveRow
                wave="Wave 1"
                enemies="Standard UESC units"
                strategy="Conserve ammo. Establish positioning. Quick clear with semi-auto weapons."
              />
              <WaveRow
                wave="Wave 2"
                enemies="Increased count, more aggressive AI"
                strategy="Reposition often. Monitor your Anti-Virus timer. Use cover and callouts."
              />
              <WaveRow
                wave="Wave 3"
                enemies="Purple-Shielded Commander + heavy support"
                strategy="Open with EMP grenades to strip shields. Focus fire the Commander. Use explosives on clusters."
                highlight
              />
            </tbody>
          </table>
        </div>

        <TipBox title="Timing Tip" variant="warning">
          <p className="mb-0">
            You have approximately 13 minutes to complete all three ships
            before final extraction closes. Aim for ~4 minutes per ship to
            leave buffer time for rotation and unexpected PvP.
          </p>
        </TipBox>

        {/* ══════════════════════════════════════════════════════
            SECTION 3 — BEST LOADOUTS
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Best Loadouts</h2>

        <p>
          The meta strategy is simple: pair a dominant close-range weapon
          with a dominant long-range weapon. You need close-range for clearing
          bot waves in tight spaces, and long-range for PvP and picking off
          enemies at distance.
        </p>

        <h3>Loadout A: Shotgun + Sniper (Highest Burst)</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Close Range
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              WSTR Combat Shotgun
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Double-barreled, fires MIPS rounds. Two devastating shots per
              reload. Melts bot shields and deletes aggressive runners.
              485&nbsp;burst DPS.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Long Range
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              Longshot Sniper Rifle
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Semi-automatic with forgiving follow-up shots. Best overall
              sniper for ranged PvP and safely picking off bots from
              distance.
            </p>
          </div>
        </div>

        <h3>Loadout B: Burst Rifle + SMG (Most Versatile)</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              All Range
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              BR33 Volley Rifle
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Light Rounds burst rifle. Most sought-after weapon in the game.
              Shreds shields at any range. Pair with Lockout Muzzle Brake
              prestige mod for hip-fire accuracy.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Close-Mid Range
            </span>
            <p className="mb-2 text-lg font-bold text-foreground">
              Bully SMG
            </p>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Heavy Rounds SMG with the best sustained DPS in its class.
              Flinch effect cripples opponents. Rodeo Mag prestige mod turns
              it into a sustained-fire monster.
            </p>
          </div>
        </div>

        <h3>S-Tier Weapons Quick Reference</h3>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Weapon
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Lockdown Role
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BR33 Volley Rifle", "Burst Rifle (Light)", "Best all-rounder. PvE wave clear + PvP versatility."],
                ["WSTR Combat Shotgun", "Shotgun (MIPS)", "Highest close-range burst. Ideal for wave clearing."],
                ["Longshot", "Sniper Rifle", "Forgiving semi-auto. PvP threat management."],
                ["Bully SMG", "SMG (Heavy)", "Best sustained DPS for wave clearing."],
                ["V85 Circuit Breaker", "Volt Shotgun", "One-shots PvE enemies when fully charged."],
                ["M77 Assault Rifle", "Assault Rifle", "Reliable workhorse. Best all-round handling."],
              ].map(([weapon, type, role], i) => (
                <tr key={weapon} className={i % 2 === 0 ? "bg-accent/[0.02]" : ""}>
                  <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                    {weapon}
                  </td>
                  <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                    {type}
                  </td>
                  <td className="border border-border px-4 py-3 text-sm text-dim">
                    {role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── consumables ── */}
        <h3>Required Consumables Checklist</h3>
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
              {[
                ["Anti-Virus Pack", "3–4 per squad", "MANDATORY. Prevents Data Corruption death (~90s each).", true],
                ["Patch Kits", "3 stacks", "Primary health restoration during and between waves.", false],
                ["Shield Charges", "3 stacks", "Immediate shield restoration. Survives burst damage.", false],
                ["EMP Grenades", "2–4", "Strips Purple Commander shields. Clears bot clusters.", true],
                ["Cardio Kicks", "2–3", "Movement speed burst for rotating between ships.", false],
                ["Energy Amp", "1–2", "Boosts ability recharge. Huge for Triage Med-Drone uptime.", false],
                ["Ammo (both types)", "Full stacks", "You will burn through more than you expect. Stock heavy.", false],
              ].map(([item, qty, purpose, critical], i) => (
                <tr key={item as string} className={i % 2 === 0 ? "bg-accent/[0.02]" : ""}>
                  <td className={`border border-border px-4 py-3 text-sm font-bold ${critical ? "text-accent" : "text-foreground"}`}>
                    {item as string}
                  </td>
                  <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                    {qty as string}
                  </td>
                  <td className="border border-border px-4 py-3 text-sm text-dim">
                    {purpose as string}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TipBox title="Where to Get Anti-Virus Packs" variant="accent">
          <p className="mb-0">
            Purchase from <strong>MIDA Faction Upgrades</strong> at Rank 5
            for 1,500 Credits + 23 Unstable Lead. They can also drop rarely
            from Lockboxes and lootable containers, but don&apos;t count on
            RNG &mdash; buy them.
          </p>
        </TipBox>

        {/* ══════════════════════════════════════════════════════
            SECTION 4 — SHELL SELECTION
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Best Shell Selection</h2>

        <p>
          Your Runner Shell choice can make or break a Lockdown attempt. The
          right pick depends on whether you&apos;re running with a squad or
          going solo.
        </p>

        <h3>Squad Play: Best Shells</h3>
        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          {[
            {
              name: "Triage",
              tier: "S-TIER",
              desc: "The Lockdown MVP. Med-Drone heals the whole team. Shareware.exe shares Anti-Virus buffs to the entire squad. Reboot+ enables ranged revives. Fundamentally reduces your squad's resource consumption.",
            },
            {
              name: "Recon",
              tier: "S-TIER",
              desc: "Echo Pulse pings nearby enemies, preventing ambushes from rival squads. Tracker Drone can auto-eliminate bots to save ammo. Essential intel for staying alive between ships.",
            },
            {
              name: "Destroyer",
              tier: "A-TIER",
              desc: "Frontline combat specialist. Creates space and dictates fight pace. Strong for pushing through the Purple Commander in Wave 3.",
            },
            {
              name: "Thief",
              tier: "A-TIER",
              desc: "X-Ray Visor scouts loot through walls. Grapple Device provides vertical escape routes when you get third-partied between ships.",
            },
          ].map((shell) => (
            <div key={shell.name} className="cryo-panel p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                  {shell.name}
                </span>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                    shell.tier === "S-TIER"
                      ? "bg-accent/10 text-accent"
                      : "bg-panel text-dim"
                  }`}
                >
                  {shell.tier}
                </span>
              </div>
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
              desc: "Active Camo is a game-changer for solo. Sneak past geared squads, pick your fights, escape danger. Minus Sights core grants invisibility after aiming.",
            },
            {
              name: "Thief",
              tier: "S-TIER",
              desc: "X-Ray Visor + Grapple Device = maximum value extraction with unmatched escape options.",
            },
            {
              name: "Rook",
              tier: "S-TIER",
              desc: "Solo-exclusive shell that drops with a pre-built kit. Zero stash risk if you die. Excellent economy.",
            },
          ].map((shell) => (
            <div key={shell.name} className="cryo-panel p-5">
              <span className="mb-1 block rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent w-fit">
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

        <h3>Triage Deep Dive: The Lockdown MVP</h3>
        <p>
          Triage fundamentally changes how your squad approaches Lockdown. A
          skilled Triage player reduces the entire squad&apos;s consumable
          burn rate and keeps everyone in the fight longer.
        </p>

        <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
          <div className="cryo-panel p-5">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Tactical &mdash; Med-Drone
            </span>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Floating medical drone that attaches to crewmates, restoring HP
              and shields over time. Deploy it <strong>before</strong> waves
              start, not after someone&apos;s already hurt. Proactive healing
              is far more efficient.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Prime &mdash; Reboot+
            </span>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Ranged revive via Capacitive Gauntlets. Can also be used
              offensively as an EMP against hostile targets. In a 3-ship
              Lockdown run, at least one teammate will go down. This saves the
              attempt.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Trait &mdash; Shareware.exe
            </span>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              <strong>The game-changer.</strong> Shares consumable effects
              (including Anti-Virus protection) with all crewmates who have
              the Med-Drone attached. One Anti-Virus Pack can protect the
              entire squad.
            </p>
          </div>
          <div className="cryo-panel p-5">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-accent">
              Trait &mdash; Battery Overcharge
            </span>
            <p className="text-dim mb-0 text-sm leading-relaxed">
              Boosts weapon performance by redirecting cooling energy. Triggers
              an EMP effect when breaking enemy shields with Volt weapons
              &mdash; excellent synergy with the V85 Circuit Breaker.
            </p>
          </div>
        </div>

        <div className="cryo-panel my-8 p-6">
          <h4 className="mb-4 mt-0 font-display text-sm font-bold uppercase tracking-widest text-accent">
            Optimal Squad Composition
          </h4>
          <div className="not-prose grid gap-3 md:grid-cols-3">
            <div className="rounded bg-panel p-3 text-center">
              <span className="block text-lg font-bold text-foreground">Triage</span>
              <span className="text-dim text-xs">Sustain &amp; Anti-Virus</span>
            </div>
            <div className="rounded bg-panel p-3 text-center">
              <span className="block text-lg font-bold text-foreground">Recon</span>
              <span className="text-dim text-xs">Intel &amp; PvP Warning</span>
            </div>
            <div className="rounded bg-panel p-3 text-center">
              <span className="block text-lg font-bold text-foreground">Thief</span>
              <span className="text-dim text-xs">Loot Scouting &amp; Escape</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            SECTION 5 — REWARDS
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">Lockdown Rewards</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-panel">
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Ship
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Difficulty
                </th>
                <th className="border border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-accent">
                  Rewards
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                  Ship 1
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Moderate
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  High-tier weapons with mods, shield upgrades, cores.
                </td>
              </tr>
              <tr className="bg-accent/[0.02]">
                <td className="border border-border px-4 py-3 text-sm font-bold text-foreground">
                  Ship 2
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs text-dim">
                  Hard
                </td>
                <td className="border border-border px-4 py-3 text-sm text-dim">
                  Purple-tier weapons, improved cores, better implants.
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 text-sm font-bold text-accent">
                  Ship 3
                </td>
                <td className="border border-border px-4 py-3 font-mono text-xs font-bold text-accent">
                  Very Hard
                </td>
                <td className="border border-border px-4 py-3 text-sm text-foreground">
                  <strong>Best loot in the game.</strong> Superior cores,
                  purple weapons with prestige mods, rare implants, possible
                  Cryo Archive Key Card.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <TipBox title="Cryo Archive Access" variant="accent">
          <p className="mb-0">
            The <strong>Cryo Archive Key Card</strong> is one of the rarest
            and most valuable drops from Ship 3. It grants access to the Cryo
            Archive &mdash; Marathon&apos;s endgame map with the
            highest-value loot in the entire game.
          </p>
        </TipBox>

        {/* ══════════════════════════════════════════════════════
            SECTION 6 — PRO STRATEGIES
        ══════════════════════════════════════════════════════ */}

        <h2 className="mt-16 text-2xl text-accent">
          Pro Strategies &amp; Tips
        </h2>

        <h3>During the Event</h3>
        <ul>
          <li>
            <strong>Deploy Triage Med-Drone immediately</strong> when waves
            start. Proactive healing + Anti-Virus sharing is far more
            effective than reactive healing.
          </li>
          <li>
            <strong>Focus fire the Purple Shield Commander</strong> in Wave 3.
            Open with EMP grenades to strip the shield, then coordinate fire.
            This is the skill check for the entire event.
          </li>
          <li>
            <strong>Don&apos;t split up.</strong> Stay within Med-Drone range.
            Isolated players get overwhelmed and the Triage can&apos;t sustain
            everyone.
          </li>
          <li>
            <strong>Use semi-auto fire when possible</strong> to conserve
            ammo. Full-auto LMGs chew through stacks fast and you have three
            full ships to clear.
          </li>
        </ul>

        <h3>Between Ships</h3>
        <ul>
          <li>
            <strong>Pop Cardio Kicks</strong> the moment you finish a ship.
            The movement speed burst is critical.
          </li>
          <li>
            <strong>Don&apos;t lose the Lockdown Drive.</strong> Ships 2 and 3
            require the drive from the previous chest. If you die with it, the
            attempt is over.
          </li>
          <li>
            <strong>Plan escape routes.</strong> Use Thief&apos;s Grapple for
            vertical escapes or Assassin&apos;s Camo to disengage from PvP.
          </li>
        </ul>

        <h3>Common Mistakes to Avoid</h3>
        <div className="bg-panel/50 my-8 rounded-r-lg border-l-4 border-danger p-6">
          <ol className="mb-0 list-decimal space-y-3 pl-5">
            <li>
              <strong className="text-foreground">Entering without Anti-Virus Packs.</strong>{" "}
              <span className="text-dim">You will die to Data Corruption. No exceptions.</span>
            </li>
            <li>
              <strong className="text-foreground">Activating with hostile squads nearby.</strong>{" "}
              <span className="text-dim">The #1 cause of failed Lockdown attempts.</span>
            </li>
            <li>
              <strong className="text-foreground">Not bringing enough ammo.</strong>{" "}
              <span className="text-dim">3 ships &times; 3 waves = a lot of shooting. Running dry mid-wave is a death sentence.</span>
            </li>
            <li>
              <strong className="text-foreground">Attempting solo without being overgeared.</strong>{" "}
              <span className="text-dim">Lockdown is designed for squads. Solo requires exceptional gear, skill, and the right shell.</span>
            </li>
            <li>
              <strong className="text-foreground">Spending too long looting between ships.</strong>{" "}
              <span className="text-dim">Grab essentials, take the Drive, and move. Admire your loot after extraction.</span>
            </li>
          </ol>
        </div>

        {/* ══════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════ */}

        <section className="mt-16 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-display uppercase tracking-widest text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What is the Lockdown event in Marathon?
              </h4>
              <p>
                Lockdown is the highest-stakes PvE event in Marathon,
                exclusive to Dire Marsh. Three UESC ships spawn over
                different POIs roughly 10&ndash;15 minutes into a match.
                Players insert a Lockdown Drive, fight three waves of bots
                per ship, and collect top-tier loot that escalates with each
                completion.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What is the best loadout for Marathon Lockdown?
              </h4>
              <p>
                The meta loadout is the BR33 Volley Rifle paired with the
                Bully SMG for versatility, or the WSTR Combat Shotgun paired
                with the Longshot Sniper for maximum burst damage. Both
                combos give you close-range wave clearing and long-range PvP
                capability.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                What is the best shell for Lockdown?
              </h4>
              <p>
                For squads, Triage is the undisputed best thanks to
                Med-Drone healing and Shareware.exe sharing Anti-Virus Pack
                protection with the whole team. For solo play, Assassin with
                Active Camo is the top pick for its ability to avoid
                unwanted PvP encounters.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                How many Anti-Virus Packs do you need for Lockdown?
              </h4>
              <p>
                Bring 3&ndash;4 per squad. Each provides ~90 seconds of Data
                Corruption protection. A Triage player with Shareware.exe
                can share the buff, dramatically reducing total consumption.
                Purchase them from MIDA Faction Upgrades at Rank 5.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-foreground">
                Can you solo Lockdown in Marathon?
              </h4>
              <p>
                It&apos;s possible but extremely difficult. You need to be
                overgeared, bring extra consumables, and play Assassin or
                Rook. Most experienced players recommend running Lockdown
                with at least a 3-player squad for the best chance of
                completing all three ships.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
