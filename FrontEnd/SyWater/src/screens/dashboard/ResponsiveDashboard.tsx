import React from "react";
import { useResponsive } from "@hooks/useResponsive";

import SidebarLayout from "@components/navigation/SidebarLayout";
import BottomTabsLayout from "@components/navigation/BottomTabsLayout";

export default function ResponsiveDashboard() {
  const { isMobile } = useResponsive();

  return isMobile ? <BottomTabsLayout /> : <SidebarLayout />;
}