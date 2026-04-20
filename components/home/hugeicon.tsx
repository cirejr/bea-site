"use client"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  GroupIcon,
  BuildingIcon,
  EyeIcon,
  FlagIcon,
  BriefcaseIcon,
  SchoolIcon,
  FileBadgeIcon,
  CubeIcon,
  LightbulbOffIcon,
  ShieldIcon,
  UserIcon,
  ArrowUpRightIcon,
  RocketIcon,
  WalletIcon,
  AwardIcon,
  ArrowRightIcon,
  FilterEditIcon,
  SortDescendingIcon,
  DashboardSpeedIcon,
  Legal01Icon,
  BrainIcon,
  ChartBarLineIcon,
  Message02Icon,
  Login01Icon,
  Home03Icon,
  ChevronDown,
  MoreHorizontal,
  MapPinIcon,
  MailIcon,
  CallIcon,
} from "@hugeicons/core-free-icons"

export type BeaHugeiconProps = Readonly<{
  name: string
  className?: string
  filled?: boolean
}>

const iconMap = {
  groups: GroupIcon,
  account_balance: BuildingIcon,
  transform: ArrowUpRightIcon,
  visibility: EyeIcon,
  flag: FlagIcon,
  architecture: BuildingIcon,
  business: BriefcaseIcon,
  school: SchoolIcon,
  verified: FileBadgeIcon,
  hub: CubeIcon,
  lightbulb: LightbulbOffIcon,
  shield: ShieldIcon,
  person_pin: UserIcon,
  diversity_3: GroupIcon,
  north_east: ArrowUpRightIcon,
  rocket_launch: RocketIcon,
  account_balance_wallet: WalletIcon,
  badge: AwardIcon,
  arrow_forward: ArrowRightIcon,
  filter_list: FilterEditIcon,
  sort: SortDescendingIcon,
  leaderboard: DashboardSpeedIcon,
  gavel: Legal01Icon,
  psychology: BrainIcon,
  auto_graph: ChartBarLineIcon,
  forum: Message02Icon,
  enter_icon: Login01Icon,
  home: Home03Icon,
  arrow_right: ArrowRightIcon,
  arrow_drop_down: ChevronDown,
  more_horiz: MoreHorizontal,
  location_on: MapPinIcon,
  email: MailIcon,
  phone: CallIcon,
}

export function BeaHugeicon({ name, className }: BeaHugeiconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap]

  if (!IconComponent) {
    console.warn(`BeaHugeicon: icon "${name}" not found`)
    return null
  }

  return (
    <HugeiconsIcon
      icon={IconComponent}
      strokeWidth={2}
      className={cn(className)}
    />
  )
}