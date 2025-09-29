"use client";

import Link from "next/link";
import { SidebarMenuButton } from "./ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface RestrictedSidebarLinkProps {
  item: MenuItem;
  pathname: string | null;
  disabled?: boolean;
  tooltipMessage?: string;
}

export function RestrictedSidebarLink({
  item,
  pathname,
  disabled = false,
  tooltipMessage,
}: RestrictedSidebarLinkProps) {
  const baseClasses = `flex flex-col items-center
    ${disabled ? "text-gray-400 cursor-not-allowed" : ""}
    hover:text-[var(--color-primary)]
    focus:text-[var(--color-primary)]
    ${pathname === item.url && !disabled ? "text-[var(--color-primary)]" : ""}`;

  const content = (
    <div className={baseClasses}>
      <item.icon size={20} />
      <span className="text-xs">{item.title}</span>
    </div>
  );

  const menuButton = (
    <SidebarMenuButton
      asChild
      isActive={pathname === item.url && !disabled}
      className="flex-col h-14 justify-center gap-0.5 px-2 py-1"
    >
      {disabled ? (
        <div className="w-full h-full">{content}</div>
      ) : (
        <Link href={item.url} className="flex flex-col items-center">
          {content}
        </Link>
      )}
    </SidebarMenuButton>
  );

  if (disabled && tooltipMessage) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full cursor-not-allowed">{menuButton}</div>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white text-sm">
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return menuButton;
}
