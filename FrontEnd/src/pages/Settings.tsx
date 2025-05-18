import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const FONT_MIN = 0.5;
const FONT_MAX = 2;
const FONT_STEP = 0.05;

const Settings: React.FC = () => {
  // Read persisted settings
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fontScale");
      return stored ? parseFloat(stored) : 1;
    }
    return 1;
  });
  // Track unsaved changes
  const [pendingDarkMode, setPendingDarkMode] = useState(darkMode);
  const [pendingFontScale, setPendingFontScale] = useState(fontScale);
  const [notifications, setNotifications] = useState(true);
  const [pendingNotifications, setPendingNotifications] = useState(notifications);

  // Only enable confirm if something changed
  const isChanged =
    pendingDarkMode !== darkMode ||
    pendingFontScale !== fontScale ||
    pendingNotifications !== notifications;

  // Apply settings only on confirm
  const handleConfirm = () => {
    setDarkMode(pendingDarkMode);
    setFontScale(pendingFontScale);
    setNotifications(pendingNotifications);
  };

  // Actually apply to DOM and persist when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale.toString());
    localStorage.setItem("fontScale", fontScale.toString());
  }, [fontScale]);

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto mt-8">
        <Card className="dark:bg-zinc-900">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4 dark:text-zinc-100">Settings</h1>
            <div className="mb-6">
              <Label htmlFor="font-size" className="dark:text-zinc-100">Overall Font Size</Label>
              <input
                id="font-size"
                type="range"
                min={FONT_MIN}
                max={FONT_MAX}
                step={FONT_STEP}
                value={pendingFontScale}
                onChange={e => setPendingFontScale(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div className="dark:text-zinc-100">Font scale: {(pendingFontScale * 100).toFixed(0)}%</div>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <Label htmlFor="dark-mode" className="dark:text-zinc-100">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={pendingDarkMode}
                onCheckedChange={setPendingDarkMode}
                className="dark:bg-zinc-700 dark:data-[state=checked]:bg-medical-600"
              />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <Label htmlFor="notifications" className="dark:text-zinc-100">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={pendingNotifications}
                onCheckedChange={setPendingNotifications}
                className="dark:bg-zinc-700 dark:data-[state=checked]:bg-medical-600"
              />
            </div>
            <Button
              onClick={handleConfirm}
              disabled={!isChanged}
              className="mt-2 w-full dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Confirm
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
