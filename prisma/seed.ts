import { PrismaClient, Prisma } from "../generated/prisma";

const db = new PrismaClient();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const weapons = [
  // === ASSAULT RIFLES ===
  {
    name: "Overrun AR",
    type: "ASSAULT_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    price: 50,
    description: "Light assault rifle with high rate of fire.",
    firepower: 14.7,
    damage: 10.5,
    precisionMultiplier: 1.4,
    rateOfFire: 720,
    range: 40,
    accuracy: 50.3,
    hipfireSpread: 2.32,
    adsSpread: 0.94,
    crouchSpreadBonus: 87.5,
    movingInaccuracy: 90.9,
    handling: 46,
    equipSpeed: 0.94,
    adsSpeed: 0.43,
    reloadSpeed: 2.37,
    weight: 32,
    recoil: 78.3,
    aimAssist: 1.68,
    magazineSize: 20,
    zoom: 1.2,
  },
  {
    name: "M77 Assault Rifle",
    type: "ASSAULT_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    price: 1200,
    description:
      "Ballistic assault rifle. Toggle the built-in flip scope for high precision.",
    firepower: 24,
    damage: 16,
    precisionMultiplier: 1.5,
    rateOfFire: 450,
    range: 46,
    accuracy: 59.3,
    hipfireSpread: 2.15,
    adsSpread: 0.98,
    crouchSpreadBonus: 80,
    movingInaccuracy: 32.7,
    handling: 38,
    equipSpeed: 0.94,
    adsSpeed: 0.5,
    reloadSpeed: 2.6,
    weight: 32,
    recoil: 114,
    aimAssist: 1.96,
    magazineSize: 24,
    zoom: 1.2,
  },
  {
    name: "Impact HAR",
    type: "ASSAULT_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description:
      "The Impact HAR is a semi-automatic Assault Rifle that uses Heavy Rounds. This slower-firing weapon emphasizes stability and higher damage per shot.",
    firepower: 38.4,
    damage: 24,
    precisionMultiplier: 1.6,
    rateOfFire: 400,
    range: 60,
    accuracy: 48.5,
    hipfireSpread: 3.3,
    adsSpread: 0.48,
    crouchSpreadBonus: 80,
    movingInaccuracy: 90.9,
    handling: 36,
    equipSpeed: 0.9,
    adsSpeed: 0.8,
    reloadSpeed: 3.3,
    weight: 32,
    recoil: 100,
    aimAssist: 0.9,
    magazineSize: 18,
    zoom: 1.2,
  },
  {
    name: "V75 Scar",
    type: "ASSAULT_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "VOLT_BATTERY" as const,
    rarity: "Standard",
    description:
      "Volt-actuated assault rifle with tracking projectiles. Sustained fire overheats the weapon, lowering its rate of fire.",
    firepower: 20.3,
    accuracy: 59.3,
    handling: 42,
    range: 46,
    zoom: 1.2,
    voltDrain: 2.5,
  },

  // === SUBMACHINE GUNS ===
  {
    name: "Bully SMG",
    type: "SMG" as const,
    slot: "PRIMARY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description: "Heavy ballistic submachine gun with brutal reputation.",
    firepower: 22.5,
    damage: 15,
    precisionMultiplier: 1.5,
    rateOfFire: 540,
    range: 27,
    accuracy: 62,
    hipfireSpread: 1.55,
    adsSpread: 1.36,
    crouchSpreadBonus: 80,
    movingInaccuracy: 17.7,
    handling: 47,
    equipSpeed: 0.9,
    adsSpeed: 0.35,
    reloadSpeed: 2.76,
    weight: 27.5,
    recoil: 82,
    aimAssist: 2.59,
    magazineSize: 23,
    zoom: 1.1,
  },
  {
    name: "V22 Volt Thrower",
    type: "SMG" as const,
    slot: "PRIMARY" as const,
    ammoType: "VOLT_BATTERY" as const,
    rarity: "Standard",
    description: "Volt-actuated submachine gun with smart lock-on system",
    firepower: 21,
    damage: 21,
    precisionMultiplier: 1.0,
    rateOfFire: 507,
    range: 11,
    accuracy: 74.1,
    hipfireSpread: 0.98,
    adsSpread: 0.45,
    crouchSpreadBonus: 80,
    movingInaccuracy: 20.5,
    handling: 42,
    equipSpeed: 0.9,
    adsSpeed: 0.4,
    reloadSpeed: 3.1,
    weight: 30,
    recoil: 98,
    aimAssist: 1.78,
    zoom: 1.4,
    voltDrain: 1.2,
  },
  {
    name: "BRRT SMG",
    type: "SMG" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Compact submachine gun with five-round burst firing mechanism.",
    firepower: 16.1,
    damage: 11,
    precisionMultiplier: 1.4,
    rateOfFire: 1000,
    range: 16,
    accuracy: 60.5,
    hipfireSpread: 1.93,
    adsSpread: 1.16,
    crouchSpreadBonus: 85,
    movingInaccuracy: 17.7,
    handling: 35,
    equipSpeed: 0.9,
    adsSpeed: 0.35,
    reloadSpeed: 3.0,
    weight: 27.5,
    recoil: 143.6,
    aimAssist: 2.44,
    magazineSize: 35,
    zoom: 1.1,
  },
  {
    name: "Copperhead RF",
    type: "SMG" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description: "Light submachine gun with rapid semiautomatic fire.",
    firepower: 16.8,
    accuracy: 49.1,
    handling: 46,
    range: 15,
    magazineSize: 21,
    zoom: 1.1,
  },

  // === LIGHT MACHINE GUNS ===
  {
    name: "Conquest LMG",
    type: "LMG" as const,
    slot: "HEAVY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Light machine gun with ramping rate of fire. Stability is increased while firing from crouched position.",
    firepower: 22.4,
    damage: 16,
    precisionMultiplier: 1.4,
    rateOfFire: 540,
    range: 60,
    accuracy: 49.9,
    hipfireSpread: 2.8,
    adsSpread: 0.85,
    crouchSpreadBonus: 70,
    movingInaccuracy: 90.9,
    handling: 22,
    equipSpeed: 1.2,
    adsSpeed: 0.8,
    reloadSpeed: 6.4,
    weight: 47.5,
    recoil: 90,
    aimAssist: 1.4,
    magazineSize: 36,
    zoom: 1.2,
  },
  {
    name: "Demolition HMG",
    type: "LMG" as const,
    slot: "HEAVY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description: "Heavy machine gun with moderate rate of fire.",
    firepower: 47.25,
    damage: 31.5,
    precisionMultiplier: 1.5,
    rateOfFire: 225,
    range: 33,
    accuracy: 47.34,
    hipfireSpread: 1.52,
    adsSpread: 1.16,
    crouchSpreadBonus: 80,
    movingInaccuracy: 20.5,
    handling: 31,
    equipSpeed: 1.2,
    adsSpeed: 0.76,
    reloadSpeed: 5.46,
    weight: 47.5,
    recoil: 57.5,
    aimAssist: 1.78,
    magazineSize: 20,
    zoom: 1.2,
  },
  {
    name: "Retaliator LMG",
    type: "LMG" as const,
    slot: "HEAVY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description: "Belt-fed light machine gun with high rate of fire.",
    firepower: 16.4,
    range: 51,
    accuracy: 49.8,
    handling: 25,
    magazineSize: 44,
    zoom: 1.2,
  },

  // === PISTOLS ===
  {
    name: "CE Tactical Sidearm",
    type: "PISTOL" as const,
    slot: "SECONDARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Light ballistic pistol with standard semiautomatic fire.",
    firepower: 36.0,
    damage: 20,
    precisionMultiplier: 1.8,
    rateOfFire: 300,
    range: 21,
    accuracy: 56.3,
    hipfireSpread: 1.47,
    adsSpread: 1.03,
    crouchSpreadBonus: 90,
    movingInaccuracy: 81.8,
    handling: 58,
    equipSpeed: 0.8,
    adsSpeed: 0.33,
    reloadSpeed: 2.1,
    weight: 26,
    recoil: 43,
    aimAssist: 1.55,
    magazineSize: 18,
    zoom: 1.1,
  },
  {
    name: "Magnum MC",
    type: "PISTOL" as const,
    slot: "SECONDARY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Heavy pistol equipped with modular muzzle and optics rail.",
    firepower: 66.0,
    damage: 33,
    precisionMultiplier: 2.1,
    rateOfFire: 138,
    range: 21,
    accuracy: 58.3,
    hipfireSpread: 1.39,
    adsSpread: 0.38,
    crouchSpreadBonus: 90,
    movingInaccuracy: 90.9,
    handling: 50,
    equipSpeed: 0.8,
    adsSpeed: 0.38,
    reloadSpeed: 1.9,
    weight: 28,
    recoil: 81.5,
    aimAssist: 1.28,
    magazineSize: 12,
    zoom: 1.4,
  },
  {
    name: "V11 Punch",
    type: "PISTOL" as const,
    slot: "SECONDARY" as const,
    ammoType: "VOLT_BATTERY" as const,
    rarity: "Standard",
    price: 25,
    description:
      "Volt-actuated pistol. Tap for semiautomatic fire or hold to build and release a high-damage burst.",
    firepower: 37.5,
    damage: 25,
    precisionMultiplier: 1.5,
    rateOfFire: 600,
    range: 21,
    accuracy: 36,
    hipfireSpread: 3.13,
    adsSpread: 1.72,
    crouchSpreadBonus: 90,
    movingInaccuracy: 100,
    handling: 49,
    equipSpeed: 0.8,
    adsSpeed: 0.3,
    reloadSpeed: 3.6,
    weight: 26,
    recoil: 76.5,
    aimAssist: 2.45,
    zoom: 1.1,
    voltDrain: 4.5,
  },

  // === SNIPER RIFLES ===
  {
    name: "Longshot",
    type: "SNIPER_RIFLE" as const,
    slot: "SECONDARY" as const,
    ammoType: "MIPS_ROUNDS" as const,
    rarity: "Standard",
    description:
      "The Longshot is a Sniper Rifle that uses MIPS Rounds. It excels at long range assassinations.",
    firepower: 140,
    damage: 70,
    precisionMultiplier: 2.0,
    rateOfFire: 50,
    range: 175,
    accuracy: 74.8,
    hipfireSpread: 6.75,
    adsSpread: 0,
    crouchSpreadBonus: 60,
    movingInaccuracy: 90.9,
    handling: 29,
    equipSpeed: 1.7,
    adsSpeed: 1.1,
    reloadSpeed: 4.7,
    weight: 38,
    recoil: 60,
    aimAssist: 0.3,
    magazineSize: 3,
    zoom: 4.0,
  },
  {
    name: "V99 Channel Rifle",
    type: "SNIPER_RIFLE" as const,
    slot: "SECONDARY" as const,
    ammoType: "VOLT_CELL" as const,
    rarity: "Standard",
    description:
      "Powerful volt sniper rifle that charges up for increased damage while scoped. Hits almost instantly at long range.",
    firepower: 120.0,
    accuracy: 71.2,
    handling: 29,
    range: 175,
    zoom: 4.0,
    voltDrain: 29,
  },
  {
    name: "Outland",
    type: "SNIPER_RIFLE" as const,
    slot: "SECONDARY" as const,
    ammoType: "MIPS_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Ballistic bolt-action sniper rifle. Extreme damage and range.",
  },

  // === SHOTGUNS ===
  {
    name: "WSTR Combat Shotgun",
    type: "SHOTGUN" as const,
    slot: "SECONDARY" as const,
    ammoType: "MIPS_ROUNDS" as const,
    rarity: "Standard",
    description:
      "The WSTR Combat Shotgun is a double-barrel Shotgun that uses MIPS Rounds. It packs high damage in close quarters.",
    firepower: 172.5,
    damage: 11,
    precisionMultiplier: 1.5,
    rateOfFire: 1.3,
    range: 8,
    accuracy: 50,
    hipfireSpread: 45,
    handling: 45,
    equipSpeed: 0.9,
    adsSpeed: 0.42,
    reloadSpeed: 2.6,
    weight: 36,
    recoil: 73,
    aimAssist: 3.15,
    magazineSize: 2,
    zoom: 1.1,
    pelletCount: 10,
    spreadAngle: 2.4,
  },
  {
    name: "Misriah 2442",
    type: "SHOTGUN" as const,
    slot: "SECONDARY" as const,
    ammoType: "MIPS_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Pump-action shotgun kept for close encounters. Reloads one MIPS cartridge at a time.",
  },
  {
    name: "V85 Circuit Breaker",
    type: "SHOTGUN" as const,
    slot: "SECONDARY" as const,
    ammoType: "VOLT_CELL" as const,
    rarity: "Standard",
    description:
      "Fixed-pattern heavy volt shotgun. Can be charged up to three levels.",
    firepower: 220.0,
    handling: 42,
    range: 14,
    spreadAngle: 1.7,
    zoom: 1.1,
  },

  // === PRECISION RIFLES ===
  {
    name: "Hardline PR",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Single-round semiautomatic precision rifle with high rate of fire",
    firepower: 50.4,
    damage: 28,
    precisionMultiplier: 1.8,
    rateOfFire: 275,
    range: 69,
    accuracy: 65.1,
    hipfireSpread: 2.35,
    adsSpread: 0.44,
    crouchSpreadBonus: 60,
    movingInaccuracy: 20.5,
    handling: 36,
    equipSpeed: 0.94,
    adsSpeed: 0.45,
    reloadSpeed: 3.6,
    weight: 37,
    recoil: 103.2,
    aimAssist: 1.01,
    magazineSize: 16,
    zoom: 1.2,
  },
  {
    name: "Repeater HPR",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Lever-action heavy precision rifle. Reloads one round at a time.",
    firepower: 48,
    damage: 48,
    precisionMultiplier: 2.0,
    rateOfFire: 86,
    range: 37,
    accuracy: 60.4,
    hipfireSpread: 2.65,
    adsSpread: 0.92,
    crouchSpreadBonus: 60,
    movingInaccuracy: 20.5,
    handling: 52,
    equipSpeed: 0.9,
    adsSpeed: 0.34,
    reloadSpeed: 0.9,
    weight: 37,
    recoil: 57.8,
    aimAssist: 1.01,
    magazineSize: 9,
    zoom: 1.2,
  },
  {
    name: "Twin Tap HBR",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "HEAVY_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Burst-fire heavy ballistic precision rifle with dual-round delivery system.",
    firepower: 25,
    damage: 13,
    precisionMultiplier: 1.6,
    rateOfFire: 420,
    range: 48,
    accuracy: 59.8,
    hipfireSpread: 2.24,
    adsSpread: 1.29,
    crouchSpreadBonus: 0,
    movingInaccuracy: 81.8,
    handling: 51,
    equipSpeed: 0.94,
    adsSpeed: 0.35,
    reloadSpeed: 2.37,
    weight: 37.5,
    recoil: 44.9,
    aimAssist: 1.1,
    magazineSize: 20,
    zoom: 1.4,
  },
  {
    name: "Stryder M1T",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    description: "Fine-tuned semiautomatic precision rifle.",
    firepower: 46.5,
    accuracy: 59.4,
    handling: 39,
    range: 84,
    magazineSize: 12,
    zoom: 1.4,
  },
  {
    name: "V66 Lookout",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "VOLT_BATTERY" as const,
    rarity: "Standard",
    description:
      "Volt-actuated precision rifle with tracking projectiles. Sustained fire overheats the weapon, lowering its rate of fire.",
    firepower: 46.8,
    range: 88,
    accuracy: 66,
    handling: 46,
    zoom: 1.4,
    voltDrain: 3.4,
  },
  {
    name: "B33 Volley Rifle",
    type: "PRECISION_RIFLE" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Standard",
    price: 480,
    description:
      "Semiautomatic precision rifle with three-round burst fire.",
    firepower: 20.7,
    damage: 14.8,
    precisionMultiplier: 1.4,
    rateOfFire: 900,
    range: 49,
    accuracy: 61.2,
    hipfireSpread: 2.2,
    adsSpread: 0.96,
    crouchSpreadBonus: 80,
    movingInaccuracy: 16.4,
    handling: 45,
    equipSpeed: 0.94,
    adsSpeed: 0.4,
    weight: 28,
    recoil: 87.3,
    aimAssist: 1.94,
    reloadSpeed: 3.0,
    magazineSize: 27,
    zoom: 1.4,
  },

  // === RAILGUNS ===
  {
    name: "V00 Zeus RG",
    type: "RAILGUN" as const,
    slot: "HEAVY" as const,
    ammoType: "VOLT_CELL" as const,
    rarity: "Standard",
    description:
      "Anti-materiel railgun. Fires automatically once fully charged.",
    firepower: 196.5,
    damage: 120,
    precisionMultiplier: 1.5,
    rateOfFire: 90,
    range: 155,
    accuracy: 74.8,
    hipfireSpread: 4.1,
    adsSpread: 0,
    crouchSpreadBonus: 60,
    movingInaccuracy: 90.9,
    handling: 49,
    equipSpeed: 0.9,
    adsSpeed: 0.55,
    reloadSpeed: 3.5,
    weight: 20,
    recoil: 100,
    aimAssist: 1.65,
    zoom: 2.5,
    voltDrain: 50,
    chargeTime: 0.75,
  },
  {
    name: "Ares RG",
    type: "RAILGUN" as const,
    slot: "HEAVY" as const,
    ammoType: "MIPS_ROUNDS" as const,
    rarity: "Standard",
    description:
      "Heavy ballistic railgun. Charges up to fire massive projectile at extreme velocity.",
    firepower: 159.9,
    accuracy: 100.0,
    handling: 47,
    range: 55,
    magazineSize: 4,
    zoom: 2.5,
  },
];

// === UNIQUE WEAPON VARIANTS ===
// These are fixed-stat variants found in Cryo Archive with no mod swapping.
const uniqueWeapons = [
  {
    name: "V99 Watchtower",
    baseName: "V99 Channel Rifle",
    type: "SNIPER_RIFLE" as const,
    slot: "SECONDARY" as const,
    ammoType: "VOLT_CELL" as const,
    rarity: "Unique",
    description:
      "A unique variant of the V99 Channel Rifle found in Cryo Archive. Has faster equip speed and scope-in rate.",
    firepower: 120.0,
    accuracy: 71.2,
    handling: 29,
    range: 175,
    zoom: 4.0,
    voltDrain: 29,
    // Unique bonuses: faster equip and scope (ADS) speed
    equipSpeed: 0.7,
    adsSpeed: 0.4,
  },
  {
    name: "DRRVISH",
    baseName: "BRRT SMG",
    type: "SMG" as const,
    slot: "PRIMARY" as const,
    ammoType: "LIGHT_ROUNDS" as const,
    rarity: "Unique",
    description:
      "A unique variant of the BRRT SMG found in Cryo Archive. Has an increased base magazine size of 45 rounds.",
    firepower: 16.1,
    damage: 11,
    precisionMultiplier: 1.4,
    rateOfFire: 1000,
    range: 16,
    accuracy: 60.5,
    hipfireSpread: 1.93,
    adsSpread: 1.16,
    crouchSpreadBonus: 85,
    movingInaccuracy: 17.7,
    handling: 35,
    equipSpeed: 0.9,
    adsSpeed: 0.35,
    reloadSpeed: 3.0,
    weight: 27.5,
    recoil: 143.6,
    aimAssist: 2.44,
    // Unique bonus: +10 magazine size (35 → 45)
    magazineSize: 45,
    zoom: 1.1,
  },
];

async function main() {
  console.log(`Seeding ${weapons.length} weapons...`);

  for (const weapon of weapons) {
    const slug = slugify(weapon.name);
    const imageUrl = `/weapons/${slug}.png`;
    await db.weapon.upsert({
      where: { name: weapon.name },
      update: { ...weapon, slug, imageUrl },
      create: { ...weapon, slug, imageUrl },
    });
    console.log(`  ✓ ${weapon.name}`);
  }

  console.log(`\nSeeded ${weapons.length} weapons.`);

  // === UNIQUE WEAPON VARIANTS ===
  console.log(`\nSeeding ${uniqueWeapons.length} unique weapon variants...`);

  for (const { baseName, ...uniqueWeapon } of uniqueWeapons) {
    const slug = slugify(uniqueWeapon.name);
    // Look up the base weapon to link and reuse its image
    const baseWeapon = await db.weapon.findUnique({ where: { name: baseName } });
    if (!baseWeapon) {
      console.warn(`  ⚠ Base weapon not found: "${baseName}" — skipping unique variant`);
      continue;
    }
    const imageUrl = baseWeapon.imageUrl ?? `/weapons/${slugify(baseName)}.png`;
    await db.weapon.upsert({
      where: { name: uniqueWeapon.name },
      update: { ...uniqueWeapon, slug, imageUrl, isUnique: true, baseWeaponId: baseWeapon.id },
      create: { ...uniqueWeapon, slug, imageUrl, isUnique: true, baseWeaponId: baseWeapon.id },
    });
    console.log(`  ✓ ${uniqueWeapon.name} (base: ${baseName})`);
  }

  console.log(`\nSeeded ${uniqueWeapons.length} unique weapon variants.`);

  // === MODS ===
  type StatUnit = "percent" | "flat" | "degrees" | "seconds" | "multiplier";
  type StatModifier = { stat: string; direction: "up" | "down"; label: string; value: number; unit: StatUnit };
  type WeaponStatModifier = StatModifier;

  const mods: {
    slug: string;
    name: string;
    type: "BARREL" | "GRIP" | "MAGAZINE" | "OPTIC" | "SHIELD" | "GENERATOR" | "CHIP";
    rarity: "PRESTIGE" | "SUPERIOR" | "DELUXE" | "ENHANCED" | "STANDARD";
    description?: string;
    price?: number;
    imageUrl?: string;
    isUniversal?: boolean;
    compatibleWeapons: string[];
    statModifiers?: StatModifier[];
    // Weapon-specific stat values — keyed by weapon name
    weaponStats?: Record<string, WeaponStatModifier[]>;
  }[] = [
    // --- BARREL (18) ---
    { slug: "flexhette-split-action", name: "Flechette Split Action", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A custom made mod for the BRRT SMG. Increases stability, handling, and accuracy when firing from the hip. Hypertemporal Shot — Fire all 5 rounds of a burst at once in a tight spread.", imageUrl: "https://mods.marathondb.gg/images/flexhette-split-action.webp", compatibleWeapons: ["BRRT SMG"], statModifiers: [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.08, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -39.2, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.08, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -39.2, unit: "percent" }] } },
    { slug: "sonar-shot", name: "Sonar Shot", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A custommate from the V66 Lookout. Greatly increases range and stability. Sonar Shot — Precision eliminations or downs trigger a sonar pulse, revealing nearby hostiles if present.", imageUrl: "https://mods.marathondb.gg/images/sonar-shot.webp?v=1773953634147", compatibleWeapons: ["V66 Lookout"], statModifiers: [{ stat: "range", direction: "up", label: "Range", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.8, unit: "percent" }], weaponStats: { "V66 Lookout": [{ stat: "range", direction: "up", label: "Range", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.8, unit: "percent" }] } },
    { slug: "overcharge-lens", name: "Overcharge Lens", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the V22 Volt Thrower. Increases range, accuracy when firing from the hip, and aim assist. Reactive Burst — Consecutive hits on target create an explosive burst on the target.", imageUrl: "https://mods.marathondb.gg/images/overcharge-lens.webp?v=1773393706568", compatibleWeapons: ["V22 Volt Thrower"], statModifiers: [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 1, unit: "degrees" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.16, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], weaponStats: { "V22 Volt Thrower": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 1, unit: "degrees" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.16, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }] } },
    { slug: "lockout-muzzle-brake", name: "Lockout Muzzle Brake", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A custom made mod for the BR33 Volley Rifle. Increases movement speed with this weapon. Lockout Muzzle Brake — While firing from the hip, this weapon has greatly increased accuracy, stability, and range.", imageUrl: "https://mods.marathondb.gg/images/lockout-muzzle-brake.webp", compatibleWeapons: ["B33 Volley Rifle"], statModifiers: [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.8, unit: "degrees" }, { stat: "weight", direction: "up", label: "Weight", value: -18, unit: "flat" }], weaponStats: { "B33 Volley Rifle": [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.8, unit: "degrees" }, { stat: "weight", direction: "up", label: "Weight", value: -18, unit: "flat" }] } },
    { slug: "outland-suppressor", name: "Outland Suppressor", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A unique mod for the Outland. Increases stability and range. Silent Shot — Shots fired from the weapon are suppressed.", imageUrl: "https://mods.marathondb.gg/images/outland-suppressor.webp?v=1773846631180", compatibleWeapons: ["Outland"], statModifiers: [{ stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -20, unit: "percent" }], weaponStats: { "Outland": [{ stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -20, unit: "percent" }] } },
    { slug: "triple-barrel", name: "Triple Barrel", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Copperhead RF. Increases movement speed with this weapon and accuracy when firing from the hip. Decreases damage per bullet. Triple Barrel — Fires three shots simultaneously in a fan pattern.", compatibleWeapons: ["Copperhead RF"] },
    { slug: "mips-slug-converter", name: "MIPS Slug Converter", type: "BARREL", rarity: "PRESTIGE", price: 1620, description: "A Customamde mode for the WSTR Combat Shotgun. Increases rate of fire, stability, aim assist, range, and reduces pellet spread. MIPS Slug Convertor — Cover shells to a high-power slug projectile.", imageUrl: "https://mods.marathondb.gg/images/mips-slug-converter.webp", compatibleWeapons: ["WSTR Combat Shotgun"], statModifiers: [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.5, unit: "degrees" }, { stat: "fireRate", direction: "up", label: "Fire Rate", value: 57, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 1, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }], weaponStats: { "WSTR Combat Shotgun": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.5, unit: "degrees" }, { stat: "fireRate", direction: "up", label: "Fire Rate", value: 57, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 1, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }] } },
    { slug: "ironhold-barrel-superior", name: "Ironhold Barrel (Superior)", type: "BARREL", rarity: "SUPERIOR", price: 540, description: "Greatly increases stability, ready speed, and accuracy while crouched.", imageUrl: "https://mods.marathondb.gg/images/ironhold-barrel-deluxe.webp?v=1773347994140", compatibleWeapons: ["BRRT SMG", "Bully SMG", "CE Tactical Sidearm", "Copperhead RF", "Magnum MC"], statModifiers: [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -20, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -10, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -42, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -15, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -10, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -87.6, unit: "percent" }], "Bully SMG": [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -20, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.1, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -42, unit: "percent" }], "CE Tactical Sidearm": [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -18, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.19, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -18, unit: "percent" }], "Copperhead RF": [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -15, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.18, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -65, unit: "percent" }], "Magnum MC": [{ stat: "crouchSpreadBonus", direction: "up", label: "Crouch Spread", value: -18, unit: "percent" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.19, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -82.8, unit: "percent" }] } },
    { slug: "weighted-barrel-superior", name: "Weighted Barrel (Superior)", type: "BARREL", rarity: "SUPERIOR", price: 540, description: "Greatly increases aim assist and accuracy while moving.", imageUrl: "https://mods.marathondb.gg/images/weighted-barrel-superior.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "CE Tactical Sidearm", "Copperhead RF", "Magnum MC"], statModifiers: [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.36, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -10.5, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -10.5, unit: "percent" }], "Bully SMG": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.36, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -10.5, unit: "percent" }], "CE Tactical Sidearm": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.25, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -50.9, unit: "percent" }], "Copperhead RF": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.5, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -72.7, unit: "percent" }], "Magnum MC": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.13, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -43.6, unit: "percent" }] } },
    { slug: "farshot-barrel-superior", name: "Farshot Barrel", type: "BARREL", rarity: "SUPERIOR", price: 540, description: "Greatly increases ADS accuracy and range.", imageUrl: "https://mods.marathondb.gg/images/farshot-barrel-superior.webp?v=1773347822847", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Outland", "Repeater HPR", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 32, unit: "flat" }], "Hardline PR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], "Longshot": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], "Outland": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], "Repeater HPR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], "Stryder M1T": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 45, unit: "flat" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.15, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 32, unit: "flat" }] } },
    { slug: "ironhold-barrel-deluxe", name: "Ironhold Barrel (Deluxe)", type: "BARREL", rarity: "DELUXE", price: 180, description: "Increases stability and ready speed.", imageUrl: "https://mods.marathondb.gg/images/ironhold-barrel-deluxe.webp?v=1773347994140", compatibleWeapons: ["BRRT SMG", "Bully SMG", "CE Tactical Sidearm", "Copperhead RF", "Magnum MC"], statModifiers: [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -68.4, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -68.4, unit: "percent" }], "Bully SMG": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -27.6, unit: "percent" }], "CE Tactical Sidearm": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.07, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12, unit: "percent" }], "Copperhead RF": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -42.5, unit: "percent" }], "Magnum MC": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.05, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -68.4, unit: "percent" }] } },
    { slug: "steady-barrel-deluxe", name: "Steady Barrel (Deluxe)", type: "BARREL", rarity: "DELUXE", price: 180, description: "Increases stability, ready speed, and accuracy while moving.", imageUrl: "https://mods.marathondb.gg/images/steady-barrel-enhanced.webp?v=1773349744619", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Outland", "Repeater HPR", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], "Hardline PR": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], "Longshot": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.1, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -25, unit: "percent" }], "Outland": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], "Repeater HPR": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], "Stryder M1T": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -45.4, unit: "percent" }], "Twin Tap HBR": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.09, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -15.6, unit: "percent" }] } },
    { slug: "impulse-brake-deluxe", name: "Impulse Brake", type: "BARREL", rarity: "DELUXE", price: 180, description: "Increases ADS accuracy and aim assist.", imageUrl: "https://mods.marathondb.gg/images/impulse-brake-deluxe.webp?v=1773348125753", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Outland", "Retaliator LMG", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], "Hardline PR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], "Longshot": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.08, unit: "degrees" }], "Outland": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], "Retaliator LMG": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], "Stryder M1T": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.22, unit: "degrees" }] } },
    { slug: "long-range-barrel", name: "Long-range Barrel", type: "BARREL", rarity: "DELUXE", price: 180, description: "Increases range and accuracy when firing from the hip.", imageUrl: "https://mods.marathondb.gg/images/long-range-barrel.webp", compatibleWeapons: ["Misriah 2442", "WSTR Combat Shotgun"], statModifiers: [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.63, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], weaponStats: { "Misriah 2442": [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.63, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], "WSTR Combat Shotgun": [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -0.63, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }] } },
    { slug: "steady-barrel-enhanced", name: "Steady Barrel (Enhanced)", type: "BARREL", rarity: "ENHANCED", price: 60, description: "Slightly increases stability, ready speed, and accuracy while moving.", imageUrl: "https://mods.marathondb.gg/images/steady-barrel-enhanced.webp?v=1773349744619", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Outland", "Retaliator LMG", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "recoil", direction: "up", label: "Recoil", value: -31.1, unit: "percent" }], "Hardline PR": [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }], "Longshot": [{ stat: "recoil", direction: "up", label: "Recoil", value: -15, unit: "percent" }], "Outland": [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }], "Retaliator LMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }], "Stryder M1T": [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }], "Twin Tap HBR": [{ stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }] } },
    { slug: "precision-barrel-enhanced", name: "Precision Barrel", type: "BARREL", rarity: "ENHANCED", price: 60, description: "Slightly increases ADS accuracy and range.", imageUrl: "https://mods.marathondb.gg/images/precision-barrel-enhanced.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "CE Tactical Sidearm", "Copperhead RF", "Magnum MC"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.14, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], weaponStats: { "BRRT SMG": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.14, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], "Bully SMG": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.04, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }], "CE Tactical Sidearm": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.17, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }], "Copperhead RF": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.09, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 4, unit: "flat" }], "Magnum MC": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.14, unit: "degrees" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }] } },
    { slug: "suppression-dampener", name: "Suppression Dampener", type: "BARREL", rarity: "ENHANCED", price: 621, description: "Greatly increases ADS accuracy and stability.", imageUrl: "https://mods.marathondb.gg/images/suppression-dampener.webp", compatibleWeapons: ["V11 Punch", "V22 Volt Thrower", "V75 Scar"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.02, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -15.8, unit: "percent" }], weaponStats: { "V11 Punch": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.02, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -15.8, unit: "percent" }], "V22 Volt Thrower": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.25, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -16, unit: "percent" }], "V75 Scar": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.16, unit: "degrees" }, { stat: "recoil", direction: "up", label: "Recoil", value: -40.5, unit: "percent" }] } },
    { slug: "weighted-barrel-enhanced", name: "Weighted Barrel (Enhanced)", type: "BARREL", rarity: "ENHANCED", price: 60, description: "Slightly increases aim assist.", imageUrl: "https://mods.marathondb.gg/images/weighted-barrel-superior.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "CE Tactical Sidearm", "Copperhead RF", "Magnum MC"], statModifiers: [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.1, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -19.1, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.1, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -19.1, unit: "percent" }], "Bully SMG": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.14, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -4.1, unit: "percent" }], "CE Tactical Sidearm": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.1, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -19.1, unit: "percent" }], "Copperhead RF": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.2, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -27.3, unit: "percent" }], "Magnum MC": [{ stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.05, unit: "degrees" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -16.4, unit: "percent" }] } },
    // --- GRIP (7) ---
    { slug: "full-auto-selector", name: "Full-Auto Selector", type: "GRIP", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Misriah 2442. Increases the rate of fire. Full-Auto Selector — The weapon fires full auto.", imageUrl: "https://mods.marathondb.gg/images/full-auto-selector.webp?v=1773873872471", compatibleWeapons: ["Misriah 2442"], statModifiers: [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.25, unit: "degrees" }, { stat: "rpm", direction: "up", label: "RPM", value: 92, unit: "flat" }], weaponStats: { "Misriah 2442": [{ stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.25, unit: "degrees" }, { stat: "rpm", direction: "up", label: "RPM", value: 92, unit: "flat" }] } },
    { slug: "vigilant-grip-superior", name: "Vigilant Grip", type: "GRIP", rarity: "SUPERIOR", price: 540, description: "Greatly increases the ready speed and stability.", imageUrl: "https://mods.marathondb.gg/images/vigilant-grip-superior.webp?v=1773348068585", compatibleWeapons: ["Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.39, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -29.5, unit: "percent" }], weaponStats: { "Impact HAR": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.39, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -29.5, unit: "percent" }], "M77 Assault Rifle": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.39, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -29.5, unit: "percent" }], "Overrun AR": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.39, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -29.5, unit: "percent" }] } },
    { slug: "speed-scout-grip-deluxe", name: "Speed Scout Grip", type: "GRIP", rarity: "DELUXE", price: 180, description: "Increases ADS speed and accuracy.", imageUrl: "https://mods.marathondb.gg/images/speed-scout-grip-deluxe.webp", compatibleWeapons: ["Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "adsSpeed", direction: "down", label: "ADS Speed", value: 0.12, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.04, unit: "degrees" }], weaponStats: { "Impact HAR": [{ stat: "adsSpeed", direction: "down", label: "ADS Speed", value: 0.12, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.04, unit: "degrees" }], "M77 Assault Rifle": [{ stat: "adsSpeed", direction: "down", label: "ADS Speed", value: 0.12, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.04, unit: "degrees" }], "Overrun AR": [{ stat: "adsSpeed", direction: "down", label: "ADS Speed", value: 0.12, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.04, unit: "degrees" }] } },
    { slug: "combat-grip-deluxe", name: "Combat Grip", type: "GRIP", rarity: "DELUXE", price: 180, description: "Increases ADS Speed and ready speed.", imageUrl: "https://mods.marathondb.gg/images/combat-grip-enhanced.webp", compatibleWeapons: ["Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.15, unit: "seconds" }, { stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.14, unit: "seconds" }], weaponStats: { "Impact HAR": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.15, unit: "seconds" }, { stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.14, unit: "seconds" }], "M77 Assault Rifle": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.15, unit: "seconds" }, { stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.14, unit: "seconds" }], "Overrun AR": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.15, unit: "seconds" }, { stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.14, unit: "seconds" }] } },
    { slug: "snapshot-grip-deluxe", name: "Snapshot Grip", type: "GRIP", rarity: "DELUXE", price: 180, description: "Increases accuracy while moving and ADS speed.", imageUrl: "https://mods.marathondb.gg/images/snapshot-grip-deluxe.webp", compatibleWeapons: ["Misriah 2442", "V85 Circuit Breaker", "WSTR Combat Shotgun"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.12, unit: "seconds" }], weaponStats: { "WSTR Combat Shotgun": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.12, unit: "seconds" }] } },
    { slug: "guarded-grip", name: "Guarded Grip", type: "GRIP", rarity: "DELUXE", price: 180, description: "Increases ready speed and stability", imageUrl: "https://mods.marathondb.gg/images/guarded-grip.webp", compatibleWeapons: ["Misriah 2442", "V85 Circuit Breaker", "WSTR Combat Shotgun"], statModifiers: [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.2, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }], weaponStats: { "Misriah 2442": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.2, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }], "V85 Circuit Breaker": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.2, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }], "WSTR Combat Shotgun": [{ stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.2, unit: "seconds" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9, unit: "percent" }] } },
    { slug: "sturdy-brace-grip", name: "Sturdy Brace Grip", type: "GRIP", rarity: "ENHANCED", price: 60, description: "Increases Stability.", imageUrl: "https://mods.marathondb.gg/images/sturdy-brace-grip.webp", compatibleWeapons: ["Impact HAR", "M77 Assault Rifle", "Overrun AR"], weaponStats: { "Impact HAR": [{ stat: "handling", direction: "up", label: "Handling", value: 3, unit: "flat" }, { stat: "handling", direction: "up", label: "Handling", value: 15, unit: "percent" }], "M77 Assault Rifle": [{ stat: "handling", direction: "up", label: "Handling", value: 4, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -18, unit: "percent" }], "Overrun AR": [{ stat: "handling", direction: "up", label: "Handling", value: 3, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -17.1, unit: "percent" }] } },
    // --- MAGAZINE (24) ---
    { slug: "interval-mag", name: "Interval Mag", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the M77 Assault Rifle. Increases range, magazine size, reload speed, aim assist, and accuracy when firing from the hip. Interval Link — Land precision hits with iron sights to build stacks. Alternative firing mode: Eqipe midrange scope, slowing rate of fire but increasing stability, range, and precision damage, draining stacks over time.", imageUrl: "https://mods.marathondb.gg/images/interval-mag.webp", compatibleWeapons: ["M77 Assault Rifle"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.05, unit: "degrees" }, { stat: "magazineSize", direction: "up", label: "Magazine Size", value: 18, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.5, unit: "seconds" }], weaponStats: { "M77 Assault Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "aimAssist", direction: "up", label: "Aim Assist", value: 0.05, unit: "degrees" }, { stat: "magazineSize", direction: "up", label: "Magazine Size", value: 18, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 2, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.5, unit: "seconds" }] } },
    { slug: "infinity-belt", name: "Infinity Belt", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Conquest LMG. Increases reload speed and magazine capacity. Infinity Mag — Eliminations grant ammo directly into the magazine and increase rate of fire for a short duration.", imageUrl: "https://mods.marathondb.gg/images/infinity-belt.webp?v=1773925825681", compatibleWeapons: ["Conquest LMG"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 90, unit: "flat" }, { stat: "reloadSpeed", direction: "down", label: "Reload Speed", value: 1.55, unit: "seconds" }], weaponStats: { "Conquest LMG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 90, unit: "flat" }, { stat: "reloadSpeed", direction: "down", label: "Reload Speed", value: 1.55, unit: "seconds" }] } },
    { slug: "impact-shockwave", name: "Impact Shockwave", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Ares RG. Increases range and magazine size. Impact Shockwave — Rounds from the weapon explode on impact, dealing splash damage and knocking targets back.", imageUrl: "https://mods.marathondb.gg/images/impact-shockwave.webp?v=1774025747628", compatibleWeapons: ["Ares RG"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 2, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }], weaponStats: { "Ares RG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 2, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }] } },
    { slug: "kingmaker-mag", name: "Kingmaker Mag", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A Unique mod for the Longshot. Increases reloadspeed and magazine size. Pure SKill — Headshots increase the rate of fire. Stacks up to three times.", imageUrl: "https://mods.marathondb.gg/images/kingmaker-mag.webp", compatibleWeapons: ["Longshot"], statModifiers: [{ stat: "ammoReserves", direction: "up", label: "Ammo Reserves", value: 11, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -1.3, unit: "seconds" }], weaponStats: { "Longshot": [{ stat: "ammoReserves", direction: "up", label: "Ammo Reserves", value: 11, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -1.3, unit: "seconds" }] } },
    { slug: "adrenal-feedback-rounds", name: "Adrenal Feedback Rounds", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A customamde mod for the Hardline PR. Increases Magazine size. Adrenal Feedback Rounds — Precision hits reduce your shell's heat and grant a stand of Micro adrenaline. Micro adrenaline stacks increase your shells' heat capacity and agility for a short duration.", imageUrl: "https://mods.marathondb.gg/images/adrenal-feedback-rounds.webp", compatibleWeapons: ["Hardline PR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 18, unit: "flat" }], weaponStats: { "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 18, unit: "flat" }] } },
    { slug: "overclocked-delimiter", name: "Overclocked Delimiter", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A Custom made mode for the V85 Circuit Breaker. Increases magazine size and reload speed. Delimited Charge — Adds a 3rd level of charge. When fully charged, the weapon has greatly reduced spread, increased damage, and the weapon's rounds pierce and ricochet.", imageUrl: "https://mods.marathondb.gg/images/overclocked-delimiter.webp", compatibleWeapons: ["V85 Circuit Breaker"], statModifiers: [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.74, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -3, unit: "percent" }], weaponStats: { "V85 Circuit Breaker": [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.74, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -3, unit: "percent" }] } },
    { slug: "adaptive-mag", name: "Adaptive Mag", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Overrun AR. Increases reload speed and magazine size. Adaptive Mag — Toggle burstfire mode. Body shots increase precision and aim assist for a short time.", imageUrl: "https://mods.marathondb.gg/images/adaptive-mag.webp?v=1773953199778", compatibleWeapons: ["Overrun AR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 30, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.24, unit: "seconds" }], weaponStats: { "Overrun AR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 30, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.24, unit: "seconds" }] } },
    { slug: "rodeo-mag", name: "Rodeo Mag", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Bully SMG. Increases rate of fire, stability, and magazine size. Rodeo Mag — The weapon's fire rate greatly increases over time.", imageUrl: "https://mods.marathondb.gg/images/rodeo-mag.webp", compatibleWeapons: ["Bully SMG"], statModifiers: [{ stat: "fireRate", direction: "up", label: "Fire Rate", value: 60, unit: "flat" }, { stat: "magazineSize", direction: "up", label: "Magazine Size", value: 49, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -13.2, unit: "percent" }], weaponStats: { "Bully SMG": [{ stat: "fireRate", direction: "up", label: "Fire Rate", value: 60, unit: "flat" }, { stat: "magazineSize", direction: "up", label: "Magazine Size", value: 49, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -13.2, unit: "percent" }] } },
    { slug: "stopping-mag", name: "Stopping Mag", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Impact HAR. Increases magazine size and reload speed. Hot Rounds — Fires charges rounds that generate heat on targets.", imageUrl: "https://mods.marathondb.gg/images/stopping-mag.webp", compatibleWeapons: ["Impact HAR"] },
    { slug: "thermal-surge-battery", name: "Thermal Surge Battery", type: "MAGAZINE", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the V11 Punch. Increases Reload speed and Magazine size. Thermal Surge Battery — Charged shots track towards and overheat hostiles.", imageUrl: "https://mods.marathondb.gg/images/thermal-surge-battery.webp", compatibleWeapons: ["V11 Punch"], statModifiers: [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.52, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -2, unit: "percent" }], weaponStats: { "V11 Punch": [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.52, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -2, unit: "percent" }] } },
    { slug: "combat-mag-superior", name: "Combat Mag (Superior)", type: "MAGAZINE", rarity: "SUPERIOR", price: 621, description: "Standard combat magazine for ballistic weapons.", imageUrl: "https://mods.marathondb.gg/images/combat-mag-standard.webp?v=1773347730996", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 6, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.65, unit: "seconds" }], weaponStats: { "B33 Volley Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 36, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 14, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.72, unit: "seconds" }], "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 6, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.65, unit: "seconds" }], "Longshot": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 6, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.65, unit: "seconds" }], "Stryder M1T": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 6, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 20, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.65, unit: "seconds" }], "Twin Tap HBR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 24, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 14, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }] } },
    { slug: "hi-speed-mag", name: "Hi-Speed Mag", type: "MAGAZINE", rarity: "SUPERIOR", price: 378, description: "Greatly increases reload speed and magazine size.", imageUrl: "https://mods.marathondb.gg/images/hi-speed-mag.webp", compatibleWeapons: ["CE Tactical Sidearm"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 3, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.52, unit: "seconds" }], weaponStats: { "CE Tactical Sidearm": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 3, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.52, unit: "seconds" }] } },
    { slug: "hi-cap-mag-superior", name: "Hi-cap Mag", type: "MAGAZINE", rarity: "SUPERIOR", price: 702, description: "Massively increases magazine size.", imageUrl: "https://mods.marathondb.gg/images/hi-cap-mag-superior.webp?v=1773347708950", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 9, unit: "flat" }], weaponStats: { "B33 Volley Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 54, unit: "flat" }], "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 9, unit: "flat" }], "Longshot": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 9, unit: "flat" }], "Stryder M1T": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 9, unit: "flat" }], "Twin Tap HBR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 36, unit: "flat" }] } },
    { slug: "reloader-mag-deluxe", name: "Reloader Mag", type: "MAGAZINE", rarity: "DELUXE", price: 207, description: "Increases reload speed and magazine size.", imageUrl: "https://mods.marathondb.gg/images/reloader-mag-deluxe.webp", compatibleWeapons: ["Bully SMG", "Copperhead RF", "Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 10, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }], weaponStats: { "Bully SMG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 17, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.51, unit: "seconds" }], "Copperhead RF": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 10, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }], "Impact HAR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 10, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }], "M77 Assault Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 10, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }], "Overrun AR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }] } },
    { slug: "stabilizing-mag", name: "Stabilizing Mag (Deluxe)", type: "MAGAZINE", rarity: "DELUXE", price: 207, description: "Increases magazine size.", imageUrl: "https://mods.marathondb.gg/images/stabilizing-mag-enhanced.webp?v=1773349729335", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 24, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -31.1, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 24, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -31.1, unit: "percent" }], "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 24, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -31.1, unit: "percent" }], "Longshot": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 4, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -15, unit: "percent" }], "Stryder M1T": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 24, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -31.1, unit: "percent" }], "Twin Tap HBR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 16, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -9.3, unit: "percent" }] } },
    { slug: "steady-rounds", name: "Steady Rounds", type: "MAGAZINE", rarity: "DELUXE", price: 207, description: "Increases stability and magazine size.", imageUrl: "https://mods.marathondb.gg/images/steady-rounds.webp", compatibleWeapons: ["Bully SMG", "Copperhead RF", "Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 15, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.5, unit: "percent" }], weaponStats: { "Bully SMG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 11, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -8.4, unit: "percent" }], "Copperhead RF": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 15, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.5, unit: "percent" }], "Impact HAR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 15, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.5, unit: "percent" }], "M77 Assault Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 15, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -12.5, unit: "percent" }], "Overrun AR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 8, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -11.4, unit: "percent" }] } },
    { slug: "hollow-case-rounds-deluxe", name: "Hollow-Case Rounds", type: "MAGAZINE", rarity: "DELUXE", price: 207, description: "Increase magazine size, reload speed, and range.", imageUrl: "https://mods.marathondb.gg/images/hollow-case-rounds-deluxe.webp", compatibleWeapons: ["Bully SMG", "Copperhead RF", "Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.12, unit: "seconds" }], weaponStats: { "Bully SMG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 17, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 4, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.21, unit: "seconds" }], "Copperhead RF": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 18, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 3, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.12, unit: "seconds" }], "Impact HAR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.12, unit: "seconds" }], "M77 Assault Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 14, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.12, unit: "seconds" }], "Overrun AR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.12, unit: "seconds" }] } },
    { slug: "drum-mag", name: "Drum Mag", type: "MAGAZINE", rarity: "DELUXE", price: 234, description: "Greatly increases magazine size.", imageUrl: "https://mods.marathondb.gg/images/drum-mag.webp?v=1773347604777", compatibleWeapons: ["Bully SMG", "Copperhead RF", "Impact HAR", "M77 Assault Rifle", "Overrun AR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 33, unit: "flat" }], weaponStats: { "Bully SMG": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 33, unit: "flat" }], "Copperhead RF": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 39, unit: "flat" }], "Impact HAR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 33, unit: "flat" }], "M77 Assault Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 33, unit: "flat" }], "Overrun AR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 25, unit: "flat" }] } },
    { slug: "feather-mag-deluxe", name: "Feather Mag", type: "MAGAZINE", rarity: "DELUXE", price: 207, description: "Increases magazine size and reload speed.", imageUrl: "https://mods.marathondb.gg/images/feather-mag-deluxe.webp?v=1773347721511", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.72, unit: "seconds" }], weaponStats: { "B33 Volley Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.72, unit: "seconds" }], "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 8, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }], "Longshot": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 2, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.65, unit: "seconds" }], "Stryder M1T": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.72, unit: "seconds" }], "Twin Tap HBR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 8, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.31, unit: "seconds" }] } },
    { slug: "combat-mag", name: "Combat Mag (Enhanced)", type: "MAGAZINE", rarity: "ENHANCED", price: 60, description: "Standard combat magazine for ballistic weapons.", imageUrl: "https://mods.marathondb.gg/images/combat-mag-standard.webp?v=1773347730996", compatibleWeapons: [] },
    { slug: "cloudfeather-chamber", name: "Cloudfeather Chamber", type: "MAGAZINE", rarity: "ENHANCED", price: 69, description: "Slightly increases magazine size and reload speed.", imageUrl: "https://mods.marathondb.gg/images/cloudfeather-chamber.webp", compatibleWeapons: ["V11 Punch", "V22 Volt Thrower", "V66 Lookout", "V75 Scar"], weaponStats: { "V11 Punch": [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.17, unit: "seconds" }, { stat: "voltdrain", direction: "down", label: "Volt Drain", value: 0.5, unit: "percent" }], "V22 Volt Thrower": [{ stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.1, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -0.1, unit: "percent" }], "V66 Lookout": [{ stat: "reloadSpeed", direction: "down", label: "Reload Speed", value: 0.18, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -0.9, unit: "percent" }], "V75 Scar": [{ stat: "handling", direction: "up", label: "Handling", value: 1, unit: "flat" }, { stat: "readySpeed", direction: "up", label: "Ready Speed", value: 0.22, unit: "seconds" }, { stat: "voltdrain", direction: "up", label: "Volt Drain", value: -0.3, unit: "percent" }] } },
    { slug: "stabilizing-mag-enhanced", name: "Stabilizing Mag (Enhanced)", type: "MAGAZINE", rarity: "ENHANCED", price: 60, description: "Slightly increases magazine size.", imageUrl: "https://mods.marathondb.gg/images/stabilizing-mag-enhanced.webp?v=1773349729335", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Longshot", "Stryder M1T", "Twin Tap HBR"], statModifiers: [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -11.6, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -11.6, unit: "percent" }], "Hardline PR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 8, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -3.1, unit: "percent" }], "Longshot": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 2, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -5, unit: "percent" }], "Stryder M1T": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -11.6, unit: "percent" }], "Twin Tap HBR": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 12, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -11.6, unit: "percent" }] } },
    { slug: "balanced-mag", name: "Balanced Mag", type: "MAGAZINE", rarity: "ENHANCED", price: 0, description: "Slightly increases magazine size and reload speed.", imageUrl: "https://mods.marathondb.gg/images/balanced-mag.webp", compatibleWeapons: ["CE Tactical Sidearm"], weaponStats: { "CE Tactical Sidearm": [{ stat: "magazineSize", direction: "up", label: "Magazine Size", value: 2, unit: "flat" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.07, unit: "seconds" }] } },
    { slug: "combat-mag-standard", name: "Combat Mag (Standard)", type: "MAGAZINE", rarity: "STANDARD", price: 30, description: "Standard combat magazine for ballistic weapons.", imageUrl: "https://mods.marathondb.gg/images/combat-mag-standard.webp?v=1773347730996", compatibleWeapons: [] },
    // --- OPTIC (16) ---
    { slug: "lever-focus", name: "Lever Focus", type: "OPTIC", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Repeater HPR. Increases reload speed and rounds reloaded at a time. Lever Focus — Shots on target increase fire rate. This degrades when a shot misses.", imageUrl: "https://mods.marathondb.gg/images/lever-focus.webp?v=1773934133948", compatibleWeapons: ["Repeater HPR"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.13, unit: "seconds" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.9, unit: "multiplier" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.27, unit: "degrees" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.16, unit: "seconds" }], weaponStats: { "Repeater HPR": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.13, unit: "seconds" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.9, unit: "multiplier" }, { stat: "hipfireSpread", direction: "up", label: "Hipfire Spread", value: -1.27, unit: "degrees" }, { stat: "reloadSpeed", direction: "up", label: "Reload Speed", value: -0.16, unit: "seconds" }] } },
    { slug: "q-tap-regen-optic", name: "Q-Tap Regen Optic", type: "OPTIC", rarity: "PRESTIGE", price: 1620, description: "A Custom made mod for thee Twin Tap HBR. Increases rounds per burst to four. Q-Tap Regen Optic — While health is very low, hit all rounds in a burst to start health regeneration.", imageUrl: "https://mods.marathondb.gg/images/q-tap-regen-optic.webp?v=1773319982556", compatibleWeapons: ["Repeater HPR"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.7, unit: "seconds" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.1, unit: "multiplier" }, { stat: "damage", direction: "down", label: "Damage", value: -3, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 10, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -6.3, unit: "percent" }], weaponStats: { "Repeater HPR": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.7, unit: "seconds" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.1, unit: "multiplier" }, { stat: "damage", direction: "down", label: "Damage", value: -3, unit: "flat" }, { stat: "range", direction: "up", label: "Range", value: 10, unit: "flat" }, { stat: "recoil", direction: "up", label: "Recoil", value: -6.3, unit: "percent" }] } },
    { slug: "vital-intel", name: "Vital Intel", type: "OPTIC", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Stryder M1T. Greatly increases handling and ADS speed. Threat Detector — Enables Proximity Sensor on Radar. When hostiles are nearby, this weapon has increased handling, aim assist, and equip speed.", imageUrl: "https://mods.marathondb.gg/images/vital-intel.webp?v=1774042632346", compatibleWeapons: ["Stryder M1T"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.14, unit: "seconds" }], weaponStats: { "Stryder M1T": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "equipSpeed", direction: "up", label: "Equip Speed", value: -0.14, unit: "seconds" }] } },
    { slug: "charge-coupled-optic", name: "Charge-Coupled Optic", type: "OPTIC", rarity: "PRESTIGE", price: 1620, description: " Photometric Amplifier — Charge rate is increased while aiming at a target.", imageUrl: "https://mods.marathondb.gg/images/charge-coupled-optic.webp", compatibleWeapons: ["V99 Channel Rifle"] },
    { slug: "far-reach-optic-superior", name: "Far Reach Optic (Superior)", type: "OPTIC", rarity: "SUPERIOR", price: 621, description: "Greatly increases zoom and ADS accuracy. Rangefinder — Uses laser pulses to measure distance to the target.", imageUrl: "https://mods.marathondb.gg/images/far-reach-optic-standard.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "Copperhead RF", "Impact HAR", "Overrun AR", "V75 Scar"], statModifiers: [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 11, unit: "flat" }], weaponStats: { "BRRT SMG": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 12, unit: "flat" }], "Bully SMG": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 17, unit: "flat" }], "Copperhead RF": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 12, unit: "flat" }], "Impact HAR": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 17, unit: "flat" }], "Overrun AR": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 11, unit: "flat" }], "V75 Scar": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 17, unit: "flat" }] } },
    { slug: "rangefinder-optic-superior", name: "Rangefinder Optic (Superior)", type: "OPTIC", rarity: "SUPERIOR", price: 0, description: "Greatly increases zoom, ADS accuracy, and accuracy while moving. Rangefinder — Uses laser pulses to measure distance to the target.", imageUrl: "https://mods.marathondb.gg/images/rangefinder-optic-deluxe.webp?v=1773348033913", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Repeater HPR", "Stryder M1T", "Twin Tap HBR", "V66 Lookout"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }], "Hardline PR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }], "Repeater HPR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }], "Stryder M1T": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.15, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -60.2, unit: "percent" }], "V66 Lookout": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.2, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -13.6, unit: "percent" }] } },
    { slug: "vigilant-lens-superior", name: "Vigilant Lens (Superior)", type: "OPTIC", rarity: "SUPERIOR", price: 459, description: "Greatly increases zoom, ADS Speed, and ADS accuracy.", imageUrl: "https://mods.marathondb.gg/images/vigilant-lens-superior.webp", compatibleWeapons: ["CE Tactical Sidearm", "Magnum MC", "V11 Punch"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.09, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.33, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.9, unit: "multiplier" }], weaponStats: { "CE Tactical Sidearm": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.1, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.39, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }], "Magnum MC": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.09, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.32, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "V11 Punch": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.1, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.51, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }] } },
    { slug: "hi-zoom-optic", name: "Hi-Zoom Optic", type: "OPTIC", rarity: "SUPERIOR", price: 621, description: "Greatly increases zoom, range, and ADS accuracy.", imageUrl: "https://mods.marathondb.gg/images/hi-zoom-optic.webp?v=1773347915117", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Repeater HPR", "Stryder M1T", "Twin Tap HBR", "V66 Lookout"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], "Hardline PR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], "Repeater HPR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], "Stryder M1T": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }], "V66 Lookout": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 1.6, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 18, unit: "flat" }] } },
    { slug: "shortwave-scout-optic", name: "Shortwave Scout Optic", type: "OPTIC", rarity: "DELUXE", price: 234, description: "Increases zoom and ADS accuracy. Thermal Sight — This sight highlights hostile heat signatures.", imageUrl: "https://mods.marathondb.gg/images/shortwave-scout-optic.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "Copperhead RF", "Impact HAR", "Overrun AR", "V75 Scar"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.06, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.1, unit: "multiplier" }], weaponStats: { "BRRT SMG": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.06, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.1, unit: "multiplier" }], "Bully SMG": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.05, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.3, unit: "multiplier" }], "Copperhead RF": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.12, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.3, unit: "multiplier" }], "Impact HAR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.06, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.1, unit: "multiplier" }], "Overrun AR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.06, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.1, unit: "multiplier" }], "V75 Scar": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.05, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.1, unit: "multiplier" }] } },
    { slug: "rangefinder-optic-deluxe", name: "Rangefinder Optic (Deluxe)", type: "OPTIC", rarity: "DELUXE", price: 207, description: "Increases zoom, ADS accuracy, and accuracy while moving. Rangefinder — Uses laser pulses to measure distance to the target.", imageUrl: "https://mods.marathondb.gg/images/rangefinder-optic-deluxe.webp?v=1773348033913", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Repeater HPR", "Stryder M1T", "Twin Tap HBR", "V66 Lookout"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }], "Hardline PR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }], "Repeater HPR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }], "Stryder M1T": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -45.5, unit: "percent" }], "V66 Lookout": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.6, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -9.1, unit: "percent" }] } },
    { slug: "midsight-optic-deluxe", name: "Midsight Optic", type: "OPTIC", rarity: "DELUXE", price: 180, description: "Increases zoom and ADS accuracy.", imageUrl: "https://mods.marathondb.gg/images/midsight-optic-deluxe.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "Copperhead RF", "Impact HAR", "Overrun AR", "V75 Scar"], statModifiers: [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -36.4, unit: "percent" }], weaponStats: { "BRRT SMG": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -36.4, unit: "percent" }], "Bully SMG": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.07, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -5.5, unit: "percent" }], "Copperhead RF": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.16, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -36.4, unit: "percent" }], "Impact HAR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -36.4, unit: "percent" }], "Overrun AR": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -36.4, unit: "percent" }], "V75 Scar": [{ stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.07, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }, { stat: "movingInaccuracy", direction: "up", label: "Moving Accuracy", value: -5.5, unit: "percent" }] } },
    { slug: "vigilant-lens", name: "Vigilant Lens (Deluxe)", type: "OPTIC", rarity: "DELUXE", price: 153, description: "Increases zoom, ADS Speed, and ADS accuracy.", imageUrl: "https://mods.marathondb.gg/images/vigilant-lens-superior.webp", compatibleWeapons: ["CE Tactical Sidearm", "Magnum MC", "V11 Punch"], statModifiers: [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.26, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }], weaponStats: { "CE Tactical Sidearm": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.26, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }], "Magnum MC": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.21, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "V11 Punch": [{ stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.07, unit: "seconds" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.4, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }] } },
    { slug: "sp-scope-ii", name: "SP Scope II", type: "OPTIC", rarity: "DELUXE", price: 204, description: "Increases zoom and ADS accuracy Thermal Sight — This sight highlights hostile heat signatures", imageUrl: "https://mods.marathondb.gg/images/sp-scope-ii.webp?v=1773349692125", compatibleWeapons: ["Longshot", "Outland", "V99 Channel Rifle"] },
    { slug: "thermal-optic", name: "Thermal Optic", type: "OPTIC", rarity: "DELUXE", price: 207, description: "Increases zoom and ADS accuracy. Thermal Sight — This sight highlights hostile heat signatures.", imageUrl: "https://mods.marathondb.gg/images/thermal-optic.webp?v=1773349777250", compatibleWeapons: ["B33 Volley Rifle", "Hardline PR", "Repeater HPR", "Stryder M1T", "Twin Tap HBR", "V66 Lookout"], statModifiers: [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], weaponStats: { "B33 Volley Rifle": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.08, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "Hardline PR": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "Repeater HPR": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "Stryder M1T": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "Twin Tap HBR": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }], "V66 Lookout": [{ stat: "adsSpread", direction: "down", label: "ADS Spread", value: 0.04, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.4, unit: "multiplier" }] } },
    { slug: "far-reach-optic", name: "Far Reach Optic (Enhanced)", type: "OPTIC", rarity: "ENHANCED", price: 69, description: "Slightly increases zoom and ADS accuracy. Rangefinder — Uses laser pulses to measure distance to the target.", imageUrl: "https://mods.marathondb.gg/images/far-reach-optic-standard.webp", compatibleWeapons: ["BRRT SMG", "Bully SMG", "Copperhead RF", "Impact HAR", "Overrun AR", "V75 Scar"], weaponStats: { "BRRT SMG": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }], "Bully SMG": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 8, unit: "flat" }], "Copperhead RF": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.7, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 5, unit: "flat" }], "Impact HAR": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 30, unit: "flat" }], "Overrun AR": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 8, unit: "flat" }], "V75 Scar": [{ stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }, { stat: "range", direction: "up", label: "Range", value: 7, unit: "flat" }] } },
    { slug: "rangefinder-lens", name: "Rangefinder Lens", type: "OPTIC", rarity: "ENHANCED", price: 51, description: "", imageUrl: "https://mods.marathondb.gg/images/rangefinder-lens.webp", compatibleWeapons: ["CE Tactical Sidearm", "Magnum MC", "V11 Punch"], weaponStats: { "CE Tactical Sidearm": [{ stat: "adsAccuracy", direction: "up", label: "ADS Accuracy", value: 1.6, unit: "flat" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.17, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }], "Magnum MC": [{ stat: "accuracyScore", direction: "up", label: "Accuracy Score", value: 1.3, unit: "flat" }, { stat: "adsSpeed", direction: "up", label: "ADS Speed", value: -0.14, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.2, unit: "multiplier" }], "V11 Punch": [{ stat: "accuracyScore", direction: "up", label: "Accuracy Score", value: 3, unit: "flat" }, { stat: "adsSpread", direction: "up", label: "ADS Spread", value: -0.28, unit: "degrees" }, { stat: "adsZoom", direction: "up", label: "ADS Zoom", value: 0.5, unit: "multiplier" }] } },
    // --- SHIELD (4) ---
    { slug: "overclocked-shield", name: "Overclocked Shield", type: "SHIELD", rarity: "PRESTIGE", price: 1620, description: "A custom-made mode for the Demolition HMG. Increases stability and movement speed with this weapon. Overclocked Shield — When this shield is active, aiming down sights grants an increased rate of fire.", imageUrl: "https://mods.marathondb.gg/images/overclocked-shield.webp?v=1773742573990", compatibleWeapons: ["Demolition HMG"], statModifiers: [{ stat: "recoil", direction: "up", label: "Recoil", value: -6.1, unit: "percent" }, { stat: "weight", direction: "up", label: "Weight", value: -4.5, unit: "percent" }], weaponStats: { "Demolition HMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -6.1, unit: "percent" }, { stat: "weight", direction: "up", label: "Weight", value: -4.5, unit: "percent" }] } },
    { slug: "circuit-shield", name: "Circuit Shield", type: "SHIELD", rarity: "PRESTIGE", price: 1620, description: "A custom-made mod for the Retaliator LMG. Increases the stability. Circuit Shield — Activate an energy shield that absorbs incoming damage. Damage absorbed by the shield refunds ammo back to the magazine.", imageUrl: "https://mods.marathondb.gg/images/circuit-shield.webp?v=1773926016257", compatibleWeapons: ["Retaliator LMG"], statModifiers: [{ stat: "recoil", direction: "up", label: "Recoil", value: -10, unit: "percent" }], weaponStats: { "Retaliator LMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -10, unit: "percent" }] } },
    { slug: "control-shield-enhanced", name: "Control Shield", type: "SHIELD", rarity: "ENHANCED", price: 69, description: "Slightly increases stability. Assault Shield — Press: Activate an energy shield that absorbs incoming damage.", imageUrl: "https://mods.marathondb.gg/images/control-shield-enhanced.webp?v=1773251669731", compatibleWeapons: ["Conquest LMG", "Demolition HMG", "Retaliator LMG"], statModifiers: [{ stat: "recoil", direction: "up", label: "Recoil", value: -10, unit: "percent" }], weaponStats: { "Conquest LMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -10, unit: "percent" }], "Demolition HMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -8.1, unit: "percent" }], "Retaliator LMG": [{ stat: "recoil", direction: "up", label: "Recoil", value: -10, unit: "percent" }] } },
    { slug: "balanced-shield", name: "Balanced Shield", type: "SHIELD", rarity: "ENHANCED", price: 69, description: "Slightly increases ready-up speed and movement with this weapon. Assault Shield — Activate an energy shield that absorbs incoming damage.", imageUrl: "https://mods.marathondb.gg/images/balanced-shield.webp?v=1773252031627", compatibleWeapons: ["Conquest LMG", "Demolition HMG", "Retaliator LMG"], statModifiers: [{ stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.2, unit: "seconds" }, { stat: "weight", direction: "up", label: "Weight", value: -3, unit: "percent" }], weaponStats: { "Conquest LMG": [{ stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.18, unit: "seconds" }, { stat: "weight", direction: "up", label: "Weight", value: -3, unit: "percent" }], "Demolition HMG": [{ stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.2, unit: "seconds" }, { stat: "weight", direction: "up", label: "Weight", value: -3, unit: "percent" }], "Retaliator LMG": [{ stat: "equipSpeed", direction: "down", label: "Equip Speed", value: 0.2, unit: "seconds" }, { stat: "weight", direction: "up", label: "Weight", value: -3, unit: "percent" }] } },
    // --- CHIP (69) ---
    { slug: "circuit-tracers", name: "Circuit Tracers (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Circuit Tracers — Eliminations with this weapon reload the magazine by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/circuit-tracers.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insomniac", name: "Insomniac (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Insomniac — While under the effects of Energy Amp, eliminating hostiles with this weapon extends its duration by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/insomniac-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "blue-blood", name: "Blue Blood", type: "CHIP", rarity: "SUPERIOR", price: 621, description: "Downing a hostile Runner restores health.", imageUrl: "https://mods.marathondb.gg/images/blue-blood.webp?v=1773844926249", isUniversal: true, compatibleWeapons: [] },
    { slug: "last-resort-strike", name: "Last Resort (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Last Resort — While you are Overheated non-precision damage is increased by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/last-resort-strike.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "punishment", name: "Punishment", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Punishment — This weapon deals significantly increased damage against Sph't combatants.", imageUrl: "https://mods.marathondb.gg/images/punishment.webp?v=1774047152022", isUniversal: true, compatibleWeapons: [] },
    { slug: "see-ya", name: "See Ya", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " See Ya — Reloading this weapon when the magazine is empty causes you to become briefly invisible.", imageUrl: "https://mods.marathondb.gg/images/see-ya.webp?v=1773254514216", isUniversal: true, compatibleWeapons: [] },
    { slug: "mini-jammer-superior", name: "Mini Jammer (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Mini Jammer — While aiming down sights for a very short duration, you gain the Signal Jammer effect.", imageUrl: "https://mods.marathondb.gg/images/mini-jammer-superior.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "reverse-card", name: "Reverse Card", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Reverse Card — While below half health, breaking the shield of a hostile Runner restores your shields.", imageUrl: "https://mods.marathondb.gg/images/reverse-card.webp?v=1773263141297", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurrection-superior", name: "Insurrection (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Insurrection — The weapon deals significantly increased damage against UESC forces.", imageUrl: "https://mods.marathondb.gg/images/insurrection-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "slip-protocol", name: "Slip Protocol (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: "While moving, this weapon's stability and accuracy increase by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/slip-protocol.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "testament", name: "Testament", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Testament — Aiming down sights for a short duration increases this weapon's range and aim assist by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/testament.webp?v=1774047098166", isUniversal: true, compatibleWeapons: [] },
    { slug: "torch-bug-superior", name: "Torch Bug (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: "Item slightly improves the reload time of all weapons. Challenger Class Asset — Eliminating a hostile causes them to explode.", imageUrl: "https://mods.marathondb.gg/images/torch-bug-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "rorschach-test-superior", name: "Rorschach Test (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Rorschach Test — While surrounded by hostiles, reloading overflows the magazine by a significant amount. Ballistic weapons overflow from reserves. Volt weapons generate a smaller portion of overflow.", imageUrl: "https://mods.marathondb.gg/images/rorschach-test-superior.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "rocket-start-superior", name: "Rocket Start (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Rocket Start — Eliminating a hostile shortly after sprinting grants you the effects of Cardio Kick for a long duration.", imageUrl: "https://mods.marathondb.gg/images/rocket-start-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "stack-overflow-superior", name: "Stack Overflow (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Stack Overflow — Reloading this weapon when the magazine is empty overflows the magazine by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/stack-overflow.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "swarm-directive-superior", name: "Swarm Directive (Superior)", type: "CHIP", rarity: "SUPERIOR", price: 621, description: " Swarm Directive — Precision eliminations with this weapon spawn a large amount of flechette seekers that heal you when damaging hostiles.", imageUrl: "https://mods.marathondb.gg/images/swarm-directive-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "stack-overflow", name: "Stack Overflow (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: " Stack Overflow — Reloading this weapon when the magazine is empty overflows the magazine by a small amount.", imageUrl: "https://mods.marathondb.gg/images/stack-overflow.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurance-plan-deluxe", name: "Insurance Plan (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: " Insurance Plan — While under the effects of a Mechanic's Kit or OS Debug, defeating a hostile significantly extends its duration.", imageUrl: "https://mods.marathondb.gg/images/insurance-plan-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "mini-jammer-deluxe", name: "Mini Jammer (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: " Mini Jammer — While aiming down sights for a brief duration, you gain the Signal Jammer effect.", imageUrl: "https://mods.marathondb.gg/images/mini-jammer-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurrection-deluxe", name: "Insurrection (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: "The weapon deals moderately increased damage against UESC forces.", imageUrl: "https://mods.marathondb.gg/images/insurrection-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "alternating-current-deluxe", name: "Alternating Current (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: " Alternating Current — Restore a significant amount of health or shields when damaging a target affected by EMP.", imageUrl: "https://mods.marathondb.gg/images/alternating-current-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "swarm-directive-deluxe", name: "Swarm Directive (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: " Swarm Directive — Precision eliminations with this weapon spawn a moderate amount of flechette seekers that heal you when damaging hostiles.", imageUrl: "https://mods.marathondb.gg/images/swarm-directive-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "torch-bug", name: "Torch Bug (Deluxe)", type: "CHIP", rarity: "DELUXE", price: 207, description: "Note: Item slightly increases the reload speed of all weapons. Torch Bug — Eliminating a hostile causes them to explode.", imageUrl: "https://mods.marathondb.gg/images/torch-bug-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "chaos-theory", name: "Chaos Theory (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Chaos Theory — Dealing a considerable amount of sustained damage causes hostiles to drop a random ammo.", imageUrl: "https://mods.marathondb.gg/images/chaos-theory.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "background-process-enhanced", name: "Background Process (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Background Process — When this weapon is stowed, it automatically reloads after a significant period of time.", imageUrl: "https://mods.marathondb.gg/images/background-process-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "afterburner", name: "Afterburner", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Afterburner — Sliding with this weapon reloads a portion of your magazine and increases stability and accuracy by a moderate amount. Ballistic weapons reload from reserves. Volt weapons reload a smaller portion.", imageUrl: "https://mods.marathondb.gg/images/afterburner.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "battle-runner-enhanced", name: "Battle Runner", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Battle Runner — Eliminations with this weapon grant increased sprint speed for a moderate duration.", imageUrl: "https://mods.marathondb.gg/images/battle-runner-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "bounty-hunter-enhanced", name: "Bounty Hunter (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Eliminating UESC pays you a small amount credits.", imageUrl: "https://mods.marathondb.gg/images/bounty-hunter.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "alternating-current", name: "Alternating Current (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Alternating Current — Restore a moderate amount of health or shields when damaging a target affected by EMP.", imageUrl: "https://mods.marathondb.gg/images/alternating-current.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "bits-per-second", name: "Bits Per Second", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Rapid precision hits temporarily increase stability and reload speed by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/bits-per-second.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "circuit-tracers-enhanced", name: "Circuit Tracers (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Circuit Tracers — Eliminations with this weapon reload the magazine by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/circuit-tracers.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurance-plan", name: "Insurance Plan (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Insurance Plan — While under the effects of a Mechanic's Kit, or OS Debug, defeating a hostile moderately extends its duration.", imageUrl: "https://mods.marathondb.gg/images/insurance-plan.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "eyes-on-fire-enhanced", name: "Eyes on Fire (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Quickly after deactivation of a tactical or trait ability, eliminating a hostile grants a moderate amount of tactical and trait ability energy.", imageUrl: "https://mods.marathondb.gg/images/eyes-on-fire.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "five-finger-discount-enhanced", name: "Five Finger Discount", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Five Finger Discount — Eliminating UESC or downing Runners with a melee or knife attack partially reloads this weapon by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/five-finger-discount-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "motionsense-chip", name: "Motionsense Chip", type: "CHIP", rarity: "ENHANCED", price: 60, description: "Motion detection chip that enhances target tracking and awareness.", imageUrl: "https://mods.marathondb.gg/images/motionsense-chip.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "optimal-prime", name: "Optimal Prime (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Optimal Prime — Dealing damage quickly after your prime ability ends grants you the effects of Energy Amp for a moderate duration.", imageUrl: "https://mods.marathondb.gg/images/optimal-prime.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insomniac-enhanced", name: "Insomniac (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Insomniac — While under the effects of Energy Amp, eliminating hostiles with this weapon extends its duration by a massive amount.", imageUrl: "https://mods.marathondb.gg/images/insomniac-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "last-resort", name: "Last Resort (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "While you are Overheated, non-precision damage is increased by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/last-resort.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "ornithologist-enhanced", name: "Ornithologist (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "", imageUrl: "https://mods.marathondb.gg/images/ornithologi-ststandard.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "slip-protocol-enhanced", name: "Slip Protocol (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Slip Protocol — While moving, this weapon's stability and accuracy increase by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/slip-protocol.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurrection-enhanced", name: "Insurrection (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "The weapon deals moderately increased damage against UESC forces.", imageUrl: "https://mods.marathondb.gg/images/insurrection-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "rorschach-test", name: "Rorschach Test (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Rorschach Test — While surrounded by hostiles, reloading overflows the magazine by a moderate amount. Ballistic weapons overflow reserves. Volt weapons generate a smaller portion to overflow.", imageUrl: "https://mods.marathondb.gg/images/rorschach-test.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "keyboard-warrior", name: "Keyboard Warrior", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Eliminations grant stacks of bonus accuracy and range for a moderate duration. Item slightly improves the reload speed of all weapons.", imageUrl: "https://mods.marathondb.gg/images/keyboard-warrior.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "mini-jammer", name: "Mini Jammer (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Mini Jammer — While aiming down sights for a moderate duration, you gain the Signal Jammer effect.", imageUrl: "https://mods.marathondb.gg/images/mini-jammer.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "rocket-start-deluxe", name: "Rocket Start (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 207, description: " Rocket Start — Eliminating a hostile shortly after sprinting grants you the effects of Cardio Kick for a significant duration.", imageUrl: "https://mods.marathondb.gg/images/rocket-start-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "cloudbornenhanced", name: "Cloudborn (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Cloudborn — While in smoke, reloading this weapon overflows the magazine by a moderate amount.", imageUrl: "https://mods.marathondb.gg/images/cloudbornenhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "swarm-directive-enhanced", name: "Swarm Directive (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Swarm Directive — Precision eliminations with this weapon spawn a few flechette seekers that heal you when damaging hostiles.", imageUrl: "https://mods.marathondb.gg/images/swarm-directive-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "background-process", name: "Background Process (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Background Process — When this weapon is stowed, it automatically reloads after a significant period of time.", isUniversal: true, compatibleWeapons: [] },
    { slug: "trigger-discipline-enhanced", name: "Trigger Discipline (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Grants a moderate amount of increased accuracy for the first few rounds of a trigger pull.", imageUrl: "https://mods.marathondb.gg/images/trigger-discipline-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "stack-overflow-enhanced", name: "Stack Overflow (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Stack Overflow — Reloading the weapon when the magazine is empty overflows the magazine by a moderate amount. Ballistic weapons overflow from reserves. Volt weapons generate a smaller portion of overflow.", imageUrl: "https://mods.marathondb.gg/images/stack-overflow.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "sucker-punch-enhanced", name: "Sucker Punch (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: " Sucker Punch — Moderately increases the damage of your next melee attack after dealing damage with this weapon.", imageUrl: "https://mods.marathondb.gg/images/sucker-punch-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "torch-bug-enhanced", name: "Torch Bug (Enhanced)", type: "CHIP", rarity: "ENHANCED", price: 69, description: "Eliminating a hostile causes them to explode. Slightly improves weapon reload time on all weapons.", imageUrl: "https://mods.marathondb.gg/images/torch-bug-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "ornithologi-ststandard", name: "Ornithologist (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: "", imageUrl: "https://mods.marathondb.gg/images/ornithologi-ststandard.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "optimal-prime-standard", name: "Optimal Prime (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Optimal Prime — Dealing damage quickly after your prime ability ends grants you the effects of Energy Amp for a moderate duration.", imageUrl: "https://mods.marathondb.gg/images/optimal-prime.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "swarm-directive", name: "Swarm Directive (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Strike Class Asset — Precision eliminations with this weapon spawn a moderate amount of flechette seekers that heal you when damaging hostiles.", isUniversal: true, compatibleWeapons: [] },
    { slug: "sucker-punch", name: "Sucker Punch (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Sucker Punch — Slightly increases the damage of your next melee attack after dealing damage with this weapon.", imageUrl: "https://mods.marathondb.gg/images/sucker-punch.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "rocket-start", name: "Rocket Start (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Rocket Start — Eliminating a hostile shortly after sprinting grants you the effects of Cardio Kick for a short duration.", imageUrl: "https://mods.marathondb.gg/images/rocket-start.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "cloudborn", name: "Cloudborn (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Cloudborn — While in smoke, reloading this weapon overflows the magazine by a small amount.", imageUrl: "https://mods.marathondb.gg/images/cloudborn.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurrection", name: "Insurrection (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Insurrection — This weapon deals slightly increased damage against UESC forces.", imageUrl: "https://mods.marathondb.gg/images/insurrection.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "insurance-plan-standard", name: "Insurance Plan (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Insurance Plan — While under the effects of a Mechanic's Kit or OS Debug, defeating a hostile significantly extends its duration.", imageUrl: "https://mods.marathondb.gg/images/insurance-plan-deluxe.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "bounty-hunter", name: "Bounty Hunter (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: "Eliminating UESC pays you a few credits.", imageUrl: "https://mods.marathondb.gg/images/bounty-hunter.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "stack-overflow-standard", name: "Stack Overflow (Standard)", type: "CHIP", rarity: "STANDARD", price: 35, description: " Stack Overflow — Reloading this weapon when the magazine is empty overflows the magazine by a small amount.", imageUrl: "https://mods.marathondb.gg/images/stack-overflow.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "opportunist", name: "Opportunist", type: "CHIP", rarity: "STANDARD", price: 23, description: " Opportunist — While shields are depleted, shots on hostile targets have a small chance to return ammo to the magazine.", imageUrl: "https://mods.marathondb.gg/images/opportunist.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "chaos-theory-standard", name: "Chaos Theory (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Chaos Theory — Dealing a significant amount of sustained damage causes hostiles to drop a random ammo.", imageUrl: "https://mods.marathondb.gg/images/chaos-theory.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "endless-runner", name: "Endless Runner", type: "CHIP", rarity: "STANDARD", price: 23, description: " Endless Runner — While under the effects of Cardio Kick, eliminating hostiles with this weapon extends its duration by a small amount.", imageUrl: "https://mods.marathondb.gg/images/endless-runner.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "eyes-on-fire", name: "Eyes on Fire (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: "Quickly after deactivation of a tactical or trait ability, eliminating a hostile grants a moderate amount of tactical and trait ability energy.", imageUrl: "https://mods.marathondb.gg/images/eyes-on-fire.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "heatsink", name: "Heatsink", type: "CHIP", rarity: "STANDARD", price: 23, description: " Heat Sink — Dealing sustained damage with this weapon reduces your generated heat by a small amount amount.", imageUrl: "https://mods.marathondb.gg/images/heatsink.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "torch-bug-standard", name: "Torch Bug (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: " Challenger Class Asset — Eliminating a hostile causes them to explode.", imageUrl: "https://mods.marathondb.gg/images/torch-bug-enhanced.webp", isUniversal: true, compatibleWeapons: [] },
    { slug: "trigger-discipline", name: "Trigger Discipline (Standard)", type: "CHIP", rarity: "STANDARD", price: 23, description: "Grants a small amount of increased accuracy for the first few rounds of a trigger pull.", imageUrl: "https://mods.marathondb.gg/images/trigger-discipline.webp", isUniversal: true, compatibleWeapons: [] },

  ];

  console.log(`\nSeeding ${mods.length} mods...`);

  // Clear existing mod data to avoid slug/name collisions with stale records
  await db.buildMod.deleteMany({});
  await db.weaponMod.deleteMany({});
  await db.mod.deleteMany({});
  console.log("  Cleared existing mods and weapon-mod links.");

  // Build weapon name → id lookup
  const allWeapons = await db.weapon.findMany({ select: { id: true, name: true } });
  const weaponMap = new Map(allWeapons.map((w) => [w.name, w.id]));

  for (const mod of mods) {
    const created = await db.mod.create({
      data: {
        slug: mod.slug,
        name: mod.name,
        type: mod.type,
        rarity: mod.rarity,
        description: mod.description ?? null,
        price: mod.price ?? null,
        imageUrl: mod.imageUrl ?? null,
        isUniversal: mod.isUniversal ?? false,
        statModifiers: mod.statModifiers ?? Prisma.JsonNull,
      },
    });

    // Create junction rows for non-universal mods (with optional weapon-specific stats)
    for (const weaponName of mod.compatibleWeapons) {
      const weaponId = weaponMap.get(weaponName);
      if (!weaponId) {
        console.warn(`  ⚠ Weapon not found: "${weaponName}" (mod: ${mod.name})`);
        continue;
      }
      const weaponSpecificStats = mod.weaponStats?.[weaponName] ?? null;
      await db.weaponMod.create({
        data: {
          weaponId,
          modId: created.id,
          statModifiers: weaponSpecificStats ?? Prisma.DbNull,
        },
      });
    }

    console.log(`  ✓ ${mod.name} (${mod.compatibleWeapons.length} weapons)`);
  }

  console.log(`\nSeeded ${mods.length} mods.`);

  // === TTK DATA ===
  const ttkData: {
    csvName: string;
    weaponName: string;
    damage: number;
    rpm: number;
    headshotMultiplier: number;
    headshotDamage: number;
    range: number;
    dps: number;
    shotsToKill: string;
    ttkWhite: number;
    ttkGreen: number;
    ttkBlue: number;
    ttkPurple: number;
    ttkHeadWhite: number;
    ttkHeadGreen: number;
    ttkHeadBlue: number;
    ttkHeadPurple: number;
  }[] = [
    { csvName: "V75 SCAR", weaponName: "V75 Scar", damage: 14.5, rpm: 385, headshotMultiplier: 1.4, headshotDamage: 20.3, range: 46, dps: 93.04, shotsToKill: "10B | 7C", ttkWhite: 1.403, ttkGreen: 1.714, ttkBlue: 1.87, ttkPurple: 2.026, ttkHeadWhite: 0.935, ttkHeadGreen: 1.091, ttkHeadBlue: 1.247, ttkHeadPurple: 1.403 },
    { csvName: "IMPACT H-AR", weaponName: "Impact HAR", damage: 18, rpm: 400, headshotMultiplier: 1.6, headshotDamage: 28.8, range: 60, dps: 120, shotsToKill: "8B | 5C", ttkWhite: 1.05, ttkGreen: 1.2, ttkBlue: 1.35, ttkPurple: 1.65, ttkHeadWhite: 0.6, ttkHeadGreen: 0.75, ttkHeadBlue: 0.9, ttkHeadPurple: 0.9 },
    { csvName: "M77 ASSAULT RIFLE", weaponName: "M77 Assault Rifle", damage: 16, rpm: 450, headshotMultiplier: 1.5, headshotDamage: 24, range: 46, dps: 120, shotsToKill: "9B | 6C", ttkWhite: 1.067, ttkGreen: 1.2, ttkBlue: 1.467, ttkPurple: 1.6, ttkHeadWhite: 0.667, ttkHeadGreen: 0.8, ttkHeadBlue: 0.933, ttkHeadPurple: 1.067 },
    { csvName: "OVERRUN AR", weaponName: "Overrun AR", damage: 10.5, rpm: 720, headshotMultiplier: 1.4, headshotDamage: 14.7, range: 27, dps: 126, shotsToKill: "14B | 10C", ttkWhite: 1.083, ttkGreen: 1.25, ttkBlue: 1.417, ttkPurple: 1.583, ttkHeadWhite: 0.75, ttkHeadGreen: 0.833, ttkHeadBlue: 1, ttkHeadPurple: 1.083 },
    { csvName: "REPEATER HPR", weaponName: "Repeater HPR", damage: 38, rpm: 86, headshotMultiplier: 2.1, headshotDamage: 79.8, range: 37, dps: 54.47, shotsToKill: "4B | 2C", ttkWhite: 2.093, ttkGreen: 2.791, ttkBlue: 2.791, ttkPurple: 3.488, ttkHeadWhite: 0.698, ttkHeadGreen: 1.395, ttkHeadBlue: 1.395, ttkHeadPurple: 1.395 },
    { csvName: "V66 LOOKOUT", weaponName: "V66 Lookout", damage: 26, rpm: 180, headshotMultiplier: 1.8, headshotDamage: 46.8, range: 88, dps: 78, shotsToKill: "6B | 3C", ttkWhite: 1.667, ttkGreen: 2, ttkBlue: 2, ttkPurple: 2.333, ttkHeadWhite: 0.667, ttkHeadGreen: 1, ttkHeadBlue: 1, ttkHeadPurple: 1.333 },
    { csvName: "STRYDER M1T", weaponName: "Stryder M1T", damage: 31, rpm: 200, headshotMultiplier: 1.5, headshotDamage: 46.5, range: 84, dps: 103.33, shotsToKill: "5B | 4C", ttkWhite: 1.2, ttkGreen: 1.5, ttkBlue: 1.5, ttkPurple: 1.8, ttkHeadWhite: 0.9, ttkHeadGreen: 0.9, ttkHeadBlue: 0.9, ttkHeadPurple: 1.2 },
    { csvName: "HARDLINE PR", weaponName: "Hardline PR", damage: 23, rpm: 275, headshotMultiplier: 1.6, headshotDamage: 36.8, range: 89, dps: 105.42, shotsToKill: "7B | 4C", ttkWhite: 1.309, ttkGreen: 1.309, ttkBlue: 1.527, ttkPurple: 1.745, ttkHeadWhite: 0.655, ttkHeadGreen: 0.873, ttkHeadBlue: 0.873, ttkHeadPurple: 1.091 },
    { csvName: "TWIN TAP HBR", weaponName: "Twin Tap HBR", damage: 17, rpm: 420, headshotMultiplier: 1.7, headshotDamage: 28.9, range: 48, dps: 119, shotsToKill: "9B | 5C", ttkWhite: 1.143, ttkGreen: 1.286, ttkBlue: 1.429, ttkPurple: 1.571, ttkHeadWhite: 0.571, ttkHeadGreen: 0.714, ttkHeadBlue: 0.857, ttkHeadPurple: 0.857 },
    { csvName: "BR33 VOLLEY RIFLE", weaponName: "B33 Volley Rifle", damage: 14.8, rpm: 481, headshotMultiplier: 1.4, headshotDamage: 20.72, range: 49, dps: 118.65, shotsToKill: "10B | 7C", ttkWhite: 1.123, ttkGreen: 1.247, ttkBlue: 1.497, ttkPurple: 1.622, ttkHeadWhite: 0.748, ttkHeadGreen: 0.873, ttkHeadBlue: 0.998, ttkHeadPurple: 1.123 },
    { csvName: "V22 VOLT THROWER", weaponName: "V22 Volt Thrower", damage: 18, rpm: 507, headshotMultiplier: 1, headshotDamage: 18, range: 21, dps: 152.1, shotsToKill: "8B | 8C", ttkWhite: 0.828, ttkGreen: 0.947, ttkBlue: 1.065, ttkPurple: 1.302, ttkHeadWhite: 0.828, ttkHeadGreen: 0.947, ttkHeadBlue: 1.065, ttkHeadPurple: 1.302 },
    { csvName: "BULLY SMG", weaponName: "Bully SMG", damage: 15, rpm: 540, headshotMultiplier: 1.5, headshotDamage: 22.5, range: 18, dps: 135, shotsToKill: "10B | 7C", ttkWhite: 1, ttkGreen: 1.111, ttkBlue: 1.222, ttkPurple: 1.444, ttkHeadWhite: 0.667, ttkHeadGreen: 0.778, ttkHeadBlue: 0.778, ttkHeadPurple: 0.889 },
    { csvName: "COPPERHEAD RF", weaponName: "Copperhead RF", damage: 12, rpm: 720, headshotMultiplier: 1.4, headshotDamage: 16.8, range: 15, dps: 144, shotsToKill: "12B | 9C", ttkWhite: 0.917, ttkGreen: 1.083, ttkBlue: 1.167, ttkPurple: 1.333, ttkHeadWhite: 0.667, ttkHeadGreen: 0.75, ttkHeadBlue: 0.833, ttkHeadPurple: 0.917 },
    { csvName: "BRRT SMG", weaponName: "BRRT SMG", damage: 11, rpm: 556, headshotMultiplier: 1.4, headshotDamage: 15.4, range: 27, dps: 101.93, shotsToKill: "13B | 10C", ttkWhite: 1.295, ttkGreen: 1.511, ttkBlue: 1.727, ttkPurple: 1.942, ttkHeadWhite: 0.971, ttkHeadGreen: 1.079, ttkHeadBlue: 1.187, ttkHeadPurple: 1.295 },
    { csvName: "MAGNUM MC", weaponName: "Magnum MC", damage: 33, rpm: 150, headshotMultiplier: 2, headshotDamage: 66, range: 21, dps: 82.5, shotsToKill: "5B | 3C", ttkWhite: 1.6, ttkGreen: 1.6, ttkBlue: 2, ttkPurple: 2.4, ttkHeadWhite: 0.8, ttkHeadGreen: 0.8, ttkHeadBlue: 0.8, ttkHeadPurple: 1.2 },
    { csvName: "CE TACTICAL SIDEARM", weaponName: "CE Tactical Sidearm", damage: 20, rpm: 300, headshotMultiplier: 1.8, headshotDamage: 36, range: 26, dps: 100, shotsToKill: "7B | 4C", ttkWhite: 1.2, ttkGreen: 1.4, ttkBlue: 1.6, ttkPurple: 1.8, ttkHeadWhite: 0.6, ttkHeadGreen: 0.8, ttkHeadBlue: 0.8, ttkHeadPurple: 1 },
    { csvName: "V11 PUNCH", weaponName: "V11 Punch", damage: 25, rpm: 257, headshotMultiplier: 1.5, headshotDamage: 37.5, range: 21, dps: 107.08, shotsToKill: "6B | 4C", ttkWhite: 1.167, ttkGreen: 1.401, ttkBlue: 1.634, ttkPurple: 1.634, ttkHeadWhite: 0.7, ttkHeadGreen: 0.934, ttkHeadBlue: 0.934, ttkHeadPurple: 1.167 },
    { csvName: "OUTLAND", weaponName: "Outland", damage: 120, rpm: 43, headshotMultiplier: 1.4, headshotDamage: 168, range: 200, dps: 86, shotsToKill: "2B | 1C", ttkWhite: 1.395, ttkGreen: 1.395, ttkBlue: 1.395, ttkPurple: 1.395, ttkHeadWhite: 0, ttkHeadGreen: 0, ttkHeadBlue: 1.395, ttkHeadPurple: 1.395 },
    { csvName: "LONGSHOT", weaponName: "Longshot", damage: 69.5, rpm: 120, headshotMultiplier: 2.15, headshotDamage: 149.425, range: 175, dps: 139, shotsToKill: "3B | 1C", ttkWhite: 1, ttkGreen: 1, ttkBlue: 1, ttkPurple: 1, ttkHeadWhite: 0, ttkHeadGreen: 0.5, ttkHeadBlue: 0.5, ttkHeadPurple: 0.5 },
    { csvName: "V 99 CHANNEL (3X CHARGE)", weaponName: "V99 Channel Rifle", damage: 60, rpm: 75, headshotMultiplier: 2, headshotDamage: 120, range: 175, dps: 75, shotsToKill: "3B | 2C", ttkWhite: 1.6, ttkGreen: 1.6, ttkBlue: 1.6, ttkPurple: 2.4, ttkHeadWhite: 0.8, ttkHeadGreen: 0.8, ttkHeadBlue: 0.8, ttkHeadPurple: 0.8 },
    { csvName: "ARES RG", weaponName: "Ares RG", damage: 123, rpm: 60, headshotMultiplier: 1.3, headshotDamage: 159.9, range: 75, dps: 123, shotsToKill: "2B | 1C", ttkWhite: 1, ttkGreen: 1, ttkBlue: 1, ttkPurple: 1, ttkHeadWhite: 0, ttkHeadGreen: 1, ttkHeadBlue: 1, ttkHeadPurple: 1 },
    { csvName: "V00 ZEUS RG", weaponName: "V00 Zeus RG", damage: 120, rpm: 90, headshotMultiplier: 1.6, headshotDamage: 192, range: 155, dps: 180, shotsToKill: "2B | 1C", ttkWhite: 0.667, ttkGreen: 0.667, ttkBlue: 0.667, ttkPurple: 0.667, ttkHeadWhite: 0, ttkHeadGreen: 0, ttkHeadBlue: 0, ttkHeadPurple: 0.667 },
    { csvName: "DEMOLITION HMG", weaponName: "Demolition HMG", damage: 30.5, rpm: 225, headshotMultiplier: 1.5, headshotDamage: 45.75, range: 65, dps: 114.38, shotsToKill: "5B | 4C", ttkWhite: 1.067, ttkGreen: 1.333, ttkBlue: 1.333, ttkPurple: 1.6, ttkHeadWhite: 0.8, ttkHeadGreen: 0.8, ttkHeadBlue: 0.8, ttkHeadPurple: 1.067 },
    { csvName: "RETALIATOR LMG", weaponName: "Retaliator LMG", damage: 11.8, rpm: 600, headshotMultiplier: 1.4, headshotDamage: 16.52, range: 51, dps: 118, shotsToKill: "12B | 9C", ttkWhite: 1.1, ttkGreen: 1.3, ttkBlue: 1.5, ttkPurple: 1.6, ttkHeadWhite: 0.8, ttkHeadGreen: 0.9, ttkHeadBlue: 1, ttkHeadPurple: 1.2 },
    { csvName: "CONQUEST LMG", weaponName: "Conquest LMG", damage: 16, rpm: 540, headshotMultiplier: 1.4, headshotDamage: 22.4, range: 60, dps: 144, shotsToKill: "9B | 7C", ttkWhite: 0.889, ttkGreen: 1, ttkBlue: 1.222, ttkPurple: 1.333, ttkHeadWhite: 0.667, ttkHeadGreen: 0.778, ttkHeadBlue: 0.889, ttkHeadPurple: 0.889 },
    { csvName: "MISRIAH 2442 (12 pellet)", weaponName: "Misriah 2442", damage: 140.1, rpm: 58, headshotMultiplier: 1.2, headshotDamage: 168.12, range: 9, dps: 135.43, shotsToKill: "1B | 1C", ttkWhite: 0, ttkGreen: 1.034, ttkBlue: 1.034, ttkPurple: 1.034, ttkHeadWhite: 0, ttkHeadGreen: 0, ttkHeadBlue: 1.034, ttkHeadPurple: 1.034 },
    { csvName: "WSTR COMBAT SHOTGUN (10 pellet)", weaponName: "WSTR Combat Shotgun", damage: 150, rpm: 194, headshotMultiplier: 1.15, headshotDamage: 172.5, range: 4, dps: 485, shotsToKill: "1B | 1C", ttkWhite: 0, ttkGreen: 0.309, ttkBlue: 0.309, ttkPurple: 0.309, ttkHeadWhite: 0, ttkHeadGreen: 0, ttkHeadBlue: 0.309, ttkHeadPurple: 0.309 },
    { csvName: "V85 CIRCUIT BREAKER (CHARGE)", weaponName: "V85 Circuit Breaker", damage: 18.3, rpm: 85, headshotMultiplier: 1.2, headshotDamage: 21.96, range: 11, dps: 25.93, shotsToKill: "8B | 7C", ttkWhite: 4.941, ttkGreen: 5.647, ttkBlue: 6.353, ttkPurple: 7.059, ttkHeadWhite: 4.235, ttkHeadGreen: 4.941, ttkHeadBlue: 5.647, ttkHeadPurple: 6.353 },
  ];

  console.log(`\nSeeding ${ttkData.length} TTK records...`);

  for (const ttk of ttkData) {
    const weaponId = weaponMap.get(ttk.weaponName);
    if (!weaponId) {
      console.warn(`  ⚠ Weapon not found for TTK: "${ttk.weaponName}" (CSV: ${ttk.csvName})`);
      continue;
    }

    const { csvName: _, weaponName: __, ...data } = ttk;
    await db.weaponTTK.upsert({
      where: { weaponId },
      update: data,
      create: { weaponId, ...data },
    });

    console.log(`  ✓ ${ttk.weaponName}`);
  }

  console.log(`\nSeeded ${ttkData.length} TTK records.`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
