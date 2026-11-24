/* Bridge to Capacitor's LocalNotifications plugin when running inside the Android app.
   In a normal browser these helpers do nothing. The plugin is accessed through the
   global Capacitor object injected by the native shell, so no extra web dependency is needed. */

interface LocalNotificationsPlugin {
  checkPermissions(): Promise<{ display: string }>;
  requestPermissions(): Promise<{ display: string }>;
  getPending(): Promise<{ notifications: { id: number }[] }>;
  cancel(opts: { notifications: { id: number }[] }): Promise<void>;
  schedule(opts: { notifications: { id: number; title: string; body: string; schedule: { at: Date; allowWhileIdle?: boolean } }[] }): Promise<unknown>;
}

interface CapacitorGlobal {
  isNativePlatform?: () => boolean;
  Plugins?: { LocalNotifications?: LocalNotificationsPlugin };
}

function cap(): CapacitorGlobal | undefined {
  return typeof window === "undefined" ? undefined : (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
}

export function isNativeApp(): boolean {
  const c = cap();
  return Boolean(c?.isNativePlatform?.() && c.Plugins?.LocalNotifications);
}

export interface ReminderInput {
  at: Date;
  title: string;
  body: string;
}

/** Replace all pending reminders with the given list. Returns false if permission was denied. */
export async function scheduleNativeReminders(reminders: ReminderInput[]): Promise<boolean> {
  const plugin = cap()?.Plugins?.LocalNotifications;
  if (!plugin) return false;
  let perm = await plugin.checkPermissions();
  if (perm.display !== "granted") perm = await plugin.requestPermissions();
  if (perm.display !== "granted") return false;

  const pending = await plugin.getPending();
  if (pending.notifications.length) await plugin.cancel({ notifications: pending.notifications });

  const future = reminders.filter(r => r.at.getTime() > Date.now()).slice(0, 60);
  if (!future.length) return true;
  await plugin.schedule({
    notifications: future.map((r, i) => ({
      id: 1000 + i,
      title: r.title,
      body: r.body,
      schedule: { at: r.at, allowWhileIdle: true },
    })),
  });
  return true;
}
